# Memi Organization Architecture

This document defines the supported product surfaces in `memi-design`, their release boundaries, and the proof required before a repository is presented as official.

The canonical machine-readable source is [`brand/brand-manifest.v1.json`](brand/brand-manifest.v1.json). This page is generated from brand revision **2**; run `npm run brand:sync` after changing the manifest.

## Product surfaces

| Product ID | Product | Status | Responsibility | License |
| --- | --- | --- | --- | --- |
| `cli` | [memi CLI](https://github.com/memi-design/memi) | Available | Read-only design engineering audit and skill layer for coding agents. | [MIT](https://github.com/memi-design/memi/blob/main/LICENSE) |
| `studio` | [memi Studio](https://github.com/memi-design/memi-studio) | Available | Native macOS companion for supervised agent workflows and artifact review. | [FSL-1.1-ALv2](https://github.com/memi-design/memi-studio/blob/main/LICENSE); Apache-2.0 on 2028-05-09 |
| `design-skills` | [memi Design Skills](https://github.com/memi-design/design-skills) | Available | Governed catalog of portable and capability-gated design workflows for coding agents. | [MIT](https://github.com/memi-design/design-skills/blob/main/LICENSE) |
| `canvas` | [memi Canvas](https://github.com/memi-design/memi-canvas) | In development | Local-first canvas workbench for understanding, creating, and verifying software interfaces. | [Apache-2.0](https://github.com/memi-design/memi-canvas/blob/main/LICENSE) |

### Canvas release boundary

Open-source M0 development snapshot; not yet a production importer or source editor. Canvas must remain labeled **In development** until its repository's capture, provider, source-write, security, recovery, and release gates are satisfied.

## Distribution surfaces

- `homebrew-memi` owns the canonical Homebrew formula and cask tap.
- Focused skill repositories are install and discovery mirrors; they must identify their canonical source and remain synchronized.
- The organization profile and [public website](https://memoire.cv) are projections of the brand and release manifests, not independent version authorities.

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
| npm package | `memi/release-manifest.json` | Trusted Publisher targets `memi-design/memi` |
| GitHub Action | `memi/action.yml` | Consumers pin a full commit SHA |
| MCP Registry | `memi/server.json` | Current server identity remains compatible during migration |
| Container images | Core release workflow | New releases publish only to the organization namespace |
| Homebrew | `homebrew-memi` | The canonical tap is owned by `memi-design` |
| Product identity | `brand/brand-manifest.v1.json` | Names, statuses, URLs, licenses, icons, and aliases use one brand revision |

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
