# Memi Brand Assets and Manifest

This directory contains the canonical organization assets and the versioned product identity contract for Memi.

## Sources of truth

- [`brand-manifest.v1.json`](brand-manifest.v1.json) records brand revision **1** and the canonical product IDs, names, roles, statuses, URLs, licenses, icons, aliases, and legacy exceptions.
- [`brand-manifest.v1.schema.json`](brand-manifest.v1.schema.json) is the JSON Schema for manifest version 1.
- [Memi's public website](https://memoire.cv) is a current organization surface; its domain is not a legacy alias.
- `npm run brand:check` validates the schema, policy invariants, and synchronized documentation.
- `npm run brand:sync` regenerates the organization profile and architecture documents after an intentional manifest edit.

Consumers should reject unsupported `schemaVersion` values. Increment `brandRevision` for every identity change that downstream repositories must adopt.

## Product registry

| Product ID | Canonical name | Status | License | Accepted aliases | Primary icon |
| --- | --- | --- | --- | --- | --- |
| `cli` | [Memi CLI](https://github.com/memi-design/memi) | Available | [MIT](https://github.com/memi-design/memi/blob/main/LICENSE) | `Memi`, `Memi Engine`, `Mémoire`, `Mémoire CLI`, `Mémoire Engine` | [memi-mark](https://raw.githubusercontent.com/memi-design/.github/main/brand/memi-avatar.png) |
| `studio` | [Memi Studio](https://github.com/memi-design/memi-studio) | Available | [FSL-1.1-ALv2](https://github.com/memi-design/memi-studio/blob/main/LICENSE) | `Mémoire Studio` | [studio-app-icon](https://raw.githubusercontent.com/memi-design/memi-studio/main/docs/assets/memi-icon-dark.png) |
| `design-skills` | [Memi Design Skills](https://github.com/memi-design/design-skills) | Available | [MIT](https://github.com/memi-design/design-skills/blob/main/LICENSE) | `Design Skills`, `Memi Skills`, `Mémoire Design Skills` | [memi-mark](https://raw.githubusercontent.com/memi-design/.github/main/brand/memi-avatar.png) |
| `canvas` | [Memi Canvas](https://github.com/memi-design/memi-canvas) | In development | [Apache-2.0](https://github.com/memi-design/memi-canvas/blob/main/LICENSE) | `Mémoire Canvas` | [memi-mark](https://raw.githubusercontent.com/memi-design/.github/main/brand/memi-avatar.png) |

Aliases exist for search, migration, and compatibility. They do not replace the canonical name on current release, install, support, or documentation surfaces.

## Legacy and provenance allowlist

Legacy values are permitted only as **non-operational provenance**. They must never be used as a current source, install, download, support, package-publish, container-publish, or release destination. Exact machine-match values live only in the manifest so generated public documentation does not revive personal operational links.

| Allowlist ID | Historical identity | Kind | Permitted contexts | Reason |
| --- | --- | --- | --- | --- |
| `legacy-memoire-name` | Legacy Mémoire name | `name` | `historical-release`, `license-provenance` | Preserves accurate attribution for releases and source records created before this brand revision. |
| `legacy-personal-github` | Legacy personal GitHub namespace | `url-prefix` | `historical-release`, `license-provenance`, `immutable-archive` | May identify immutable historical artifacts or upstream provenance, but never a current install, support, source, or release route. |
| `legacy-personal-ghcr` | Legacy personal container namespace | `url-prefix` | `historical-release`, `immutable-archive` | May identify immutable historical container provenance, but never the target for a current release. |
| `legacy-memoire-package-scope` | Legacy Mémoire package scope | `package-prefix` | `historical-release`, `license-provenance` | Records historical package identities without presenting them as current installation targets. |
| `legacy-studio-asset-prefix` | Legacy Studio release asset prefix | `asset-prefix` | `historical-release`, `immutable-archive` | Existing signed release assets retain their published filenames for checksum and provenance continuity. |

Adding an entry requires a bounded context, a provenance reason, and `operational: false`. Prefer removing a legacy reference when immutable provenance does not require it.

## Assets

| Asset | Use | Size |
| --- | --- | --- |
| `memi-avatar.png` | GitHub organization avatar and square profile surfaces | 512 × 512 |
| `memi-social-preview.jpg` | GitHub social previews | 1280 × 640 |
| `memi-brand-banner.png` | Repository README, npm, and organization-profile banner | 1983 × 793 |

## Usage

- Keep the pixel-heart mark centered and uncropped.
- Use the avatar on black or near-black surfaces.
- Preserve the social preview's 2:1 composition.
- Preserve the supplied banner's 2.5:1 composition and centered wordmark; do not crop, overlay text, or substitute a product alias.
- Product-specific diagrams and screenshots may use their own visual language, but their product identity must match the manifest.

## Provenance

The source artwork was supplied by the project owner. The organization variants were produced for Memi by replacing or extending the original backgrounds with a near-black field while preserving the supplied pixel-mosaic forms. No third-party marks or assets are included.

Copyright in the supplied artwork is retained by the project owner. Refer to [`TRADEMARKS.md`](TRADEMARKS.md) before reusing the Memi name or brand assets.
