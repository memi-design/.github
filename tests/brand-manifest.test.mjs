import assert from "node:assert/strict";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  MANIFEST_RELATIVE_PATH,
  SCHEMA_RELATIVE_PATH,
  checkRepository,
  renderManagedDocuments,
  validateBrandPolicy,
  validateManifestData,
} from "../scripts/validate-brand-manifest.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

async function readJson(relativePath) {
  return JSON.parse(
    await readFile(path.join(repositoryRoot, relativePath), "utf8"),
  );
}

test("canonical manifest satisfies its JSON Schema and brand policy", async () => {
  const [manifest, schema] = await Promise.all([
    readJson(MANIFEST_RELATIVE_PATH),
    readJson(SCHEMA_RELATIVE_PATH),
  ]);

  assert.deepEqual(validateManifestData(manifest, schema), []);
  assert.deepEqual(validateBrandPolicy(manifest), []);
});

test("manifest names the four canonical products and keeps Canvas in development", async () => {
  const manifest = await readJson(MANIFEST_RELATIVE_PATH);
  const statuses = Object.fromEntries(
    manifest.products.map(({ id, status }) => [id, status]),
  );

  assert.deepEqual(statuses, {
    cli: "available",
    studio: "available",
    "design-skills": "available",
    canvas: "development",
  });
  assert.equal(Number.isInteger(manifest.brandRevision), true);
  assert.equal(manifest.brandRevision > 0, true);
  assert.equal(manifest.organization.urls.website, "https://memoire.cv");
});

test("policy rejects missing, unexpected, and incorrectly staged products", async () => {
  const manifest = await readJson(MANIFEST_RELATIVE_PATH);
  const invalidManifest = structuredClone(manifest);
  invalidManifest.products[0].id = "unexpected-product";
  invalidManifest.products[1].status = "development";

  const errors = validateBrandPolicy(invalidManifest).join("\n");
  assert.match(errors, /Missing canonical product cli/);
  assert.match(errors, /Unexpected canonical product unexpected-product/);
  assert.match(errors, /Product studio must have status available/);
});

test("schema rejects a product without a license", async () => {
  const [manifest, schema] = await Promise.all([
    readJson(MANIFEST_RELATIVE_PATH),
    readJson(SCHEMA_RELATIVE_PATH),
  ]);
  const invalidManifest = structuredClone(manifest);
  delete invalidManifest.products[0].license;

  assert.match(
    validateManifestData(invalidManifest, schema).join("\n"),
    /license/,
  );
});

test("schema requires an honest status note for development products", async () => {
  const [manifest, schema] = await Promise.all([
    readJson(MANIFEST_RELATIVE_PATH),
    readJson(SCHEMA_RELATIVE_PATH),
  ]);
  const invalidManifest = structuredClone(manifest);
  const canvas = invalidManifest.products.find(({ id }) => id === "canvas");
  delete canvas.statusNote;

  assert.match(
    validateManifestData(invalidManifest, schema).join("\n"),
    /statusNote/,
  );
});

test("policy rejects aliases that collide across products", async () => {
  const manifest = await readJson(MANIFEST_RELATIVE_PATH);
  const invalidManifest = structuredClone(manifest);
  invalidManifest.products[3].aliases = [
    ...invalidManifest.products[3].aliases,
    "Memi",
  ];

  assert.match(
    validateBrandPolicy(invalidManifest).join("\n"),
    /alias .*Memi.*cli.*canvas/i,
  );
});

test("policy rejects personal namespaces in operational product URLs", async () => {
  const manifest = await readJson(MANIFEST_RELATIVE_PATH);
  const invalidManifest = structuredClone(manifest);
  invalidManifest.products[0].urls.documentation =
    "https://github.com/sarveshsea/memi";

  assert.match(
    validateBrandPolicy(invalidManifest).join("\n"),
    /personal or legacy URL/i,
  );
});

test("policy rejects personal namespaces in organization URLs", async () => {
  const manifest = await readJson(MANIFEST_RELATIVE_PATH);
  const invalidManifest = structuredClone(manifest);
  invalidManifest.organization.urls.github =
    "https://github.com/sarveshsea";

  assert.match(
    validateBrandPolicy(invalidManifest).join("\n"),
    /personal or legacy URL/i,
  );
});

test("policy rejects ambiguous or operational legacy exceptions", async () => {
  const manifest = await readJson(MANIFEST_RELATIVE_PATH);
  const invalidManifest = structuredClone(manifest);
  const duplicate = structuredClone(invalidManifest.legacyProvenanceAllowlist[0]);
  duplicate.operational = true;
  invalidManifest.legacyProvenanceAllowlist.push(duplicate);

  const errors = validateBrandPolicy(invalidManifest).join("\n");
  assert.match(errors, /allowlist id .* duplicated/i);
  assert.match(errors, /allowlist value .* duplicated/i);
  assert.match(errors, /must be non-operational/i);
});

test("managed documentation is synchronized with the manifest", async () => {
  const manifest = await readJson(MANIFEST_RELATIVE_PATH);
  const renderedDocuments = renderManagedDocuments(manifest);

  for (const [relativePath, expectedContent] of renderedDocuments) {
    const actualContent = await readFile(
      path.join(repositoryRoot, relativePath),
      "utf8",
    );
    assert.equal(actualContent, expectedContent, `${relativePath} has drifted`);
  }

  assert.deepEqual(await checkRepository(repositoryRoot), []);
});

test("repository check reports generated drift and personal URLs", async (context) => {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "memi-brand-test-"));
  context.after(() => rm(temporaryRoot, { recursive: true, force: true }));
  const copiedPaths = [
    MANIFEST_RELATIVE_PATH,
    SCHEMA_RELATIVE_PATH,
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

  for (const relativePath of copiedPaths) {
    const target = path.join(temporaryRoot, relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(path.join(repositoryRoot, relativePath), target);
  }

  const profilePath = path.join(temporaryRoot, "profile/README.md");
  await writeFile(
    profilePath,
    `${await readFile(profilePath, "utf8")}\nhttps://github.com/sarveshsea/legacy\n`,
  );

  const errors = (await checkRepository(temporaryRoot)).join("\n");
  assert.match(errors, /profile\/README\.md is not synchronized/);
  assert.match(errors, /profile\/README\.md contains a personal operational URL/);
});

test("checked-in docs avoid stale pins and personal operational URLs", async () => {
  const documentation = await Promise.all(
    [
      "profile/README.md",
      "ORG_ARCHITECTURE.md",
      "brand/README.md",
      "SECURITY.md",
      "SUPPORT.md",
    ].map(
      async (relativePath) =>
        readFile(path.join(repositoryRoot, relativePath), "utf8"),
    ),
  );
  const combined = documentation.join("\n");

  assert.doesNotMatch(combined, /@memi-design\/cli@\d+\.\d+\.\d+/);
  assert.doesNotMatch(combined, /https:\/\/github\.com\/sarveshsea\//);
  assert.match(combined, /non-operational provenance/i);
});

test("validation CLI succeeds in check mode", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/validate-brand-manifest.mjs", "--check"],
    { cwd: repositoryRoot, encoding: "utf8" },
  );

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Brand manifest is valid and synchronized/);
});
