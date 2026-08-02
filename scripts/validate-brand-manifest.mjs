import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";

import { renderManagedDocuments } from "./lib/render-brand-documents.mjs";

export const MANIFEST_RELATIVE_PATH = "brand/brand-manifest.v1.json";
export const SCHEMA_RELATIVE_PATH = "brand/brand-manifest.v1.schema.json";

const EXPECTED_PRODUCT_STATUSES = new Map([
  ["cli", "available"],
  ["studio", "available"],
  ["design-skills", "available"],
  ["canvas", "development"],
]);

const PERSONAL_OR_LEGACY_URL_PATTERNS = [
  /https:\/\/github\.com\/sarveshsea(?:\/|$)/i,
  /https:\/\/raw\.githubusercontent\.com\/sarveshsea(?:\/|$)/i,
  /https:\/\/ghcr\.io\/sarveshsea(?:\/|$)/i,
];

const DOCUMENTATION_PATHS = [
  "profile/README.md",
  "ORG_ARCHITECTURE.md",
  "brand/README.md",
  "OPEN_SOURCE.md",
  "CONTRIBUTING.md",
  "GOVERNANCE.md",
  "SECURITY.md",
  "SUPPORT.md",
  "CODE_OF_CONDUCT.md",
];

function formatAjvError(error) {
  const location = error.instancePath || "/";
  return `${location} ${error.message ?? "is invalid"}`;
}

export function validateManifestData(manifest, schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const validate = ajv.compile(schema);

  return validate(manifest)
    ? []
    : (validate.errors ?? []).map(formatAjvError);
}

function validateProductContract(products) {
  const errors = [];
  const productsById = new Map(products.map((product) => [product.id, product]));

  for (const [id, status] of EXPECTED_PRODUCT_STATUSES) {
    const product = productsById.get(id);
    if (!product) {
      errors.push(`Missing canonical product ${id}.`);
    } else if (product.status !== status) {
      errors.push(`Product ${id} must have status ${status}.`);
    }
  }

  for (const product of products) {
    if (!EXPECTED_PRODUCT_STATUSES.has(product.id)) {
      errors.push(`Unexpected canonical product ${product.id}.`);
    }
  }

  return errors;
}

function validateAliases(products) {
  const errors = [];
  const aliases = new Map();

  for (const product of products) {
    for (const alias of product.aliases ?? []) {
      const normalizedAlias = alias.normalize("NFKC").toLocaleLowerCase("en-US");
      const owner = aliases.get(normalizedAlias);
      if (owner && owner !== product.id) {
        errors.push(`Alias ${alias} collides between ${owner} and ${product.id}.`);
      } else {
        aliases.set(normalizedAlias, product.id);
      }
    }
  }

  return errors;
}

function operationalUrls(product) {
  return [
    ...Object.values(product.urls ?? {}),
    product.license?.url,
    product.license?.futureLicense?.url,
    ...(product.icons ?? []).map((icon) => icon.url),
  ].filter(Boolean);
}

function validateOperationalUrls(products, organization) {
  const errors = [];
  const surfaces = [
    {
      label: "Organization",
      urls: Object.values(organization?.urls ?? {}),
    },
    ...products.map((product) => ({
      label: `Product ${product.id}`,
      urls: operationalUrls(product),
    })),
  ];

  for (const surface of surfaces) {
    for (const url of surface.urls) {
      if (PERSONAL_OR_LEGACY_URL_PATTERNS.some((pattern) => pattern.test(url))) {
        errors.push(`${surface.label} uses personal or legacy URL ${url}.`);
      }
    }
  }

  return errors;
}

function validateAllowlist(entries) {
  const errors = [];
  const ids = new Set();
  const values = new Set();

  for (const entry of entries) {
    if (ids.has(entry.id)) {
      errors.push(`Legacy allowlist id ${entry.id} is duplicated.`);
    }
    if (values.has(entry.value)) {
      errors.push(`Legacy allowlist value ${entry.value} is duplicated.`);
    }
    if (entry.operational !== false) {
      errors.push(`Legacy allowlist entry ${entry.id} must be non-operational.`);
    }
    ids.add(entry.id);
    values.add(entry.value);
  }

  return errors;
}

export function validateBrandPolicy(manifest) {
  const products = Array.isArray(manifest.products) ? manifest.products : [];
  const allowlist = Array.isArray(manifest.legacyProvenanceAllowlist)
    ? manifest.legacyProvenanceAllowlist
    : [];

  return [
    ...validateProductContract(products),
    ...validateAliases(products),
    ...validateOperationalUrls(products, manifest.organization),
    ...validateAllowlist(allowlist),
  ];
}

export { renderManagedDocuments };

async function readJson(repositoryRoot, relativePath) {
  return JSON.parse(
    await readFile(path.join(repositoryRoot, relativePath), "utf8"),
  );
}

async function validateDocumentationUrls(repositoryRoot) {
  const errors = [];

  for (const relativePath of DOCUMENTATION_PATHS) {
    const content = await readFile(path.join(repositoryRoot, relativePath), "utf8");
    if (PERSONAL_OR_LEGACY_URL_PATTERNS.some((pattern) => pattern.test(content))) {
      errors.push(`${relativePath} contains a personal operational URL.`);
    }
  }

  return errors;
}

export async function checkRepository(repositoryRoot) {
  const [manifest, schema] = await Promise.all([
    readJson(repositoryRoot, MANIFEST_RELATIVE_PATH),
    readJson(repositoryRoot, SCHEMA_RELATIVE_PATH),
  ]);
  const errors = [
    ...validateManifestData(manifest, schema),
    ...validateBrandPolicy(manifest),
  ];

  for (const [relativePath, expectedContent] of renderManagedDocuments(manifest)) {
    const actualContent = await readFile(path.join(repositoryRoot, relativePath), "utf8");
    if (actualContent !== expectedContent) {
      errors.push(`${relativePath} is not synchronized; run npm run brand:sync.`);
    }
  }

  errors.push(...(await validateDocumentationUrls(repositoryRoot)));
  return errors;
}

async function synchronizeDocuments(repositoryRoot, manifest) {
  for (const [relativePath, content] of renderManagedDocuments(manifest)) {
    await writeFile(path.join(repositoryRoot, relativePath), content, "utf8");
  }
}

function repositoryRootFromScript() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

async function runCli() {
  const repositoryRoot = repositoryRootFromScript();
  const argument = process.argv[2] ?? "--check";

  if (!["--check", "--write"].includes(argument) || process.argv.length > 3) {
    console.error("Usage: node scripts/validate-brand-manifest.mjs [--check|--write]");
    process.exitCode = 2;
    return;
  }

  if (argument === "--write") {
    const [manifest, schema] = await Promise.all([
      readJson(repositoryRoot, MANIFEST_RELATIVE_PATH),
      readJson(repositoryRoot, SCHEMA_RELATIVE_PATH),
    ]);
    const errors = [
      ...validateManifestData(manifest, schema),
      ...validateBrandPolicy(manifest),
    ];
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
    await synchronizeDocuments(repositoryRoot, manifest);
  }

  const errors = await checkRepository(repositoryRoot);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  console.log("Brand manifest is valid and synchronized.");
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  runCli().catch((error) => {
    console.error(`Brand manifest validation failed:\n${error.message}`);
    process.exitCode = 1;
  });
}
