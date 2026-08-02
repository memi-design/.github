import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
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

test("checked-in docs avoid stale pins and personal operational URLs", async () => {
  const documentation = await Promise.all(
    ["profile/README.md", "ORG_ARCHITECTURE.md", "brand/README.md"].map(
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
