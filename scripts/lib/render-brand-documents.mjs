const MANIFEST_PATH = "brand/brand-manifest.v1.json";

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function statusLabel(status) {
  return status === "development" ? "In development" : "Available";
}

function markdownLink(label, url) {
  return `[${escapeCell(label)}](${url})`;
}

function productLinks(product) {
  const labels = {
    repository: "Repository",
    documentation: "Docs",
    package: "npm",
    download: "Download",
    install: "Install",
  };

  return Object.entries(product.urls)
    .map(([kind, url]) => markdownLink(labels[kind] ?? kind, url))
    .join(" · ");
}

function renderProfile(manifest) {
  const productRows = manifest.products.map(
    (product) =>
      `| ${markdownLink(product.name, product.urls.repository)} | ${statusLabel(product.status)} | ${escapeCell(product.role)} | ${productLinks(product)} |`,
  );
  const canvas = manifest.products.find((product) => product.id === "canvas");

  return `<p align="center">
  <img src="https://raw.githubusercontent.com/memi-design/.github/main/brand/memi-brand-banner.png" alt="Memi — ${manifest.organization.tagline}" width="100%" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@memi-design/cli"><img src="https://img.shields.io/npm/v/@memi-design/cli?color=bd3f63&label=npm" alt="npm version"></a>
  <a href="https://github.com/memi-design/memi/stargazers"><img src="https://img.shields.io/github/stars/memi-design/memi?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/memi-design/memi/blob/main/LICENSE"><img src="https://img.shields.io/badge/CLI%20license-MIT-171718.svg" alt="Memi CLI MIT license"></a>
</p>

# ${manifest.organization.name}

${manifest.organization.tagline}

Memi gives coding agents file-anchored design evidence, governed design workflows, a supervised native workbench, and an emerging local-first canvas.

## Start with the CLI

Run a read-only audit in any frontend repository:

\`\`\`bash
npx -y @memi-design/cli@latest diagnose . --json --no-write --fail-on none
\`\`\`

No account, API key, Figma file, global install, or daemon is required for the first audit.

## Products

| Product | Status | Role | Public surfaces |
| --- | --- | --- | --- |
${productRows.join("\n")}

**Canvas boundary:** ${canvas.statusNote} Its current tests and deterministic demo evidence are engineering proof, not a claim of production readiness.

## Design workflows

Install only the workflow you need from Memi Design Skills:

\`\`\`bash
npx skills add memi-design/design-skills --skill better-ui
\`\`\`

Focused mirrors remain available for the audit, memory, and CI workflows. Their canonical definitions are governed in the Memi repositories and generated mirrors must declare their source of truth.

## How we build

- Read-only inspection is the default for the CLI.
- Findings include confidence, provenance, and file evidence.
- Deterministic checks rerun before a result is called verified.
- Existing design systems remain the source of truth.
- Public integrations must be runnable, attributed, and maintained.
- In-development surfaces are labeled before they are promoted.

[Website](${manifest.organization.urls.website}) · [Discussions](https://github.com/memi-design/memi/discussions) · [Organization architecture](https://github.com/memi-design/.github/blob/main/ORG_ARCHITECTURE.md) · [Brand manifest](https://github.com/memi-design/.github/blob/main/brand/brand-manifest.v1.json)

[Contribute](https://github.com/memi-design/.github/blob/main/CONTRIBUTING.md) · [Open-source model](https://github.com/memi-design/.github/blob/main/OPEN_SOURCE.md) · [Security](https://github.com/memi-design/.github/blob/main/SECURITY.md) · [Code of Conduct](https://github.com/memi-design/.github/blob/main/CODE_OF_CONDUCT.md)
`;
}

function renderArchitecture(manifest) {
  const rows = manifest.products.map((product) => {
    const future = product.license.futureLicense
      ? `; ${product.license.futureLicense.spdx} on ${product.license.futureLicense.effectiveDate}`
      : "";
    return `| \`${product.id}\` | ${markdownLink(product.name, product.urls.repository)} | ${statusLabel(product.status)} | ${escapeCell(product.role)} | ${markdownLink(product.license.spdx, product.license.url)}${future} |`;
  });
  const canvas = manifest.products.find((product) => product.id === "canvas");

  return `# Memi Organization Architecture

This document defines the supported product surfaces in \`memi-design\`, their release boundaries, and the proof required before a repository is presented as official.

The canonical machine-readable source is [\`${MANIFEST_PATH}\`](${MANIFEST_PATH}). This page is generated from brand revision **${manifest.brandRevision}**; run \`npm run brand:sync\` after changing the manifest.

## Product surfaces

| Product ID | Product | Status | Responsibility | License |
| --- | --- | --- | --- | --- |
${rows.join("\n")}

### Canvas release boundary

${canvas.statusNote} Canvas must remain labeled **In development** until its repository's capture, provider, source-write, security, recovery, and release gates are satisfied.

## Distribution surfaces

- \`homebrew-memi\` owns the canonical Homebrew formula and cask tap.
- Focused skill repositories are install and discovery mirrors; they must identify their canonical source and remain synchronized.
- The organization profile and [public website](${manifest.organization.urls.website}) are projections of the brand and release manifests, not independent version authorities.

No personal namespace is an operational source, install, support, container, or release route.

## Labs and integration proofs

Labs demonstrate one bounded integration or design-engineering capability. They are not separate product lines and must preserve upstream attribution. A proof becomes official only when its README states the proof contract, the public path is runnable, and current verification evidence exists.

## Repository contract

Every official public repository must have:

1. A one-sentence job and one first-run path.
2. An explicit license and retained third-party attribution.
3. A maintained README whose product identity matches the brand manifest.
4. CI appropriate to its runtime and a pinned dependency policy.
5. Security reporting through the organization policy.
6. Topics, description, homepage, and repository visibility set deliberately.
7. No copied upstream code or assets outside compatible license terms.
8. A clear source-of-truth declaration when the repository is generated.

## Release ownership

| Surface | Source of truth | Identity constraint |
| --- | --- | --- |
| npm package | \`memi/release-manifest.json\` | Trusted Publisher targets \`memi-design/memi\` |
| GitHub Action | \`memi/action.yml\` | Consumers pin a full commit SHA |
| MCP Registry | \`memi/server.json\` | Current server identity remains compatible during migration |
| Container images | Core release workflow | New releases publish only to the organization namespace |
| Homebrew | \`homebrew-memi\` | The canonical tap is owned by \`memi-design\` |
| Product identity | \`${MANIFEST_PATH}\` | Names, statuses, URLs, licenses, icons, and aliases use one brand revision |

Release versions and public parity evidence stay in the core release manifest. A published artifact is not described as parity-verified until its independent verification gate passes.

## Transfer gate

Before moving a repository:

- inventory releases, Actions, environments, Pages, packages, webhooks, deploy keys, and branch protections;
- identify hard-coded owner paths and external trusted-publisher subjects;
- preserve a redirect-compatible transition window;
- update the canonical local remote;
- rerun clean installs and public-link checks after the move.

Any repository with a live release or Pages environment moves only after its external identity is ready. Historical personal namespaces may remain only inside the non-operational provenance allowlist.

## Lifecycle

- **Available:** supported now through at least one documented public route.
- **Development:** implementation is public, but required product or release proof remains incomplete.
- **Proof:** maintained integration with reproducible evidence.
- **Archived:** read-only historical reference with a replacement or end-of-life notice.

Repository count is not a growth metric. A repository belongs in the organization only when it makes a supported product easier to understand, install, verify, or extend.
`;
}

function renderBrandReadme(manifest) {
  const productRows = manifest.products.map((product) => {
    const aliases = product.aliases.map((alias) => `\`${escapeCell(alias)}\``).join(", ");
    const icon = product.icons[0];
    return `| \`${product.id}\` | ${markdownLink(product.name, product.urls.repository)} | ${statusLabel(product.status)} | ${markdownLink(product.license.spdx, product.license.url)} | ${aliases} | ${markdownLink(icon.id, icon.url)} |`;
  });
  const allowlistRows = manifest.legacyProvenanceAllowlist.map(
    (entry) =>
      `| \`${entry.id}\` | ${escapeCell(entry.label)} | \`${entry.kind}\` | ${entry.permittedContexts.map((context) => `\`${context}\``).join(", ")} | ${escapeCell(entry.reason)} |`,
  );

  return `# Memi Brand Assets and Manifest

This directory contains the canonical organization assets and the versioned product identity contract for Memi.

## Sources of truth

- [\`brand-manifest.v1.json\`](brand-manifest.v1.json) records brand revision **${manifest.brandRevision}** and the canonical product IDs, names, roles, statuses, URLs, licenses, icons, aliases, and legacy exceptions.
- [\`brand-manifest.v1.schema.json\`](brand-manifest.v1.schema.json) is the JSON Schema for manifest version 1.
- [Memi's public website](${manifest.organization.urls.website}) is a current organization surface; its domain is not a legacy alias.
- \`npm run brand:check\` validates the schema, policy invariants, and synchronized documentation.
- \`npm run brand:sync\` regenerates the organization profile and architecture documents after an intentional manifest edit.

Consumers should reject unsupported \`schemaVersion\` values. Increment \`brandRevision\` for every identity change that downstream repositories must adopt.

## Product registry

| Product ID | Canonical name | Status | License | Accepted aliases | Primary icon |
| --- | --- | --- | --- | --- | --- |
${productRows.join("\n")}

Aliases exist for search, migration, and compatibility. They do not replace the canonical name on current release, install, support, or documentation surfaces.

## Legacy and provenance allowlist

Legacy values are permitted only as **non-operational provenance**. They must never be used as a current source, install, download, support, package-publish, container-publish, or release destination. Exact machine-match values live only in the manifest so generated public documentation does not revive personal operational links.

| Allowlist ID | Historical identity | Kind | Permitted contexts | Reason |
| --- | --- | --- | --- | --- |
${allowlistRows.join("\n")}

Adding an entry requires a bounded context, a provenance reason, and \`operational: false\`. Prefer removing a legacy reference when immutable provenance does not require it.

## Assets

| Asset | Use | Size |
| --- | --- | --- |
| \`memi-avatar.png\` | GitHub organization avatar and square profile surfaces | 512 × 512 |
| \`memi-social-preview.jpg\` | GitHub social previews | 1280 × 640 |
| \`memi-brand-banner.png\` | Repository README, npm, and organization-profile banner | 1983 × 793 |

## Usage

- Keep the pixel-heart mark centered and uncropped.
- Use the avatar on black or near-black surfaces.
- Preserve the social preview's 2:1 composition.
- Preserve the supplied banner's 2.5:1 composition and centered wordmark; do not crop, overlay text, or substitute a product alias.
- Product-specific diagrams and screenshots may use their own visual language, but their product identity must match the manifest.

## Provenance

The source artwork was supplied by the project owner. The organization variants were produced for Memi by replacing or extending the original backgrounds with a near-black field while preserving the supplied pixel-mosaic forms. No third-party marks or assets are included.

Copyright in the supplied artwork is retained by the project owner. Refer to [\`TRADEMARKS.md\`](TRADEMARKS.md) before reusing the Memi name or brand assets.
`;
}

export function renderManagedDocuments(manifest) {
  return new Map([
    ["profile/README.md", renderProfile(manifest)],
    ["ORG_ARCHITECTURE.md", renderArchitecture(manifest)],
    ["brand/README.md", renderBrandReadme(manifest)],
  ]);
}
