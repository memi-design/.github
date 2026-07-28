# Memi Organization Architecture

This document defines which repositories belong in `memi-design`, how they are classified, and what proof is required before they are presented as official.

## Repository tiers

### Products

| Repository | Responsibility | Primary release |
| --- | --- | --- |
| `memi` | Audit engine, CLI, MCP, Action, focused skills | npm and GitHub Releases |
| `memi-studio` | Native macOS companion | GitHub Releases and Homebrew |
| `design-skills` | Canonical governed skill catalog | GitHub release and Agent Skills install |
| `design-sandbox` | Runnable web proof and design-engineering lab | Hosted preview and source |

### Distribution

| Repository | Responsibility |
| --- | --- |
| `homebrew-memi` | Formula and cask tap |
| `audit-frontend-design` | Focused directory and install surface |
| `remember-design-system` | Focused directory and install surface |
| `enforce-design-ci` | Focused directory and install surface |
| `memoire-web` | Website and public documentation deployment |

The focused skill repositories are generated mirrors. Their source of truth remains `memi`.

### Labs and proofs

Labs exist to demonstrate one integration or design-engineering capability. They are not separate product lines.

| Repository | Proof contract |
| --- | --- |
| `ripple-image-transitions` | SwiftUI and Metal audit integration with retained upstream attribution |
| `chatbot` | Real shadcn application with a pinned design-CI workflow |

## Repository contract

Every official public repository must have:

1. A one-sentence job and one first-run path.
2. An explicit license and retained third-party attribution.
3. A maintained README with current organization links.
4. CI appropriate to its runtime and a pinned dependency policy.
5. Security reporting through the organization policy.
6. Topics, description, homepage, and repository visibility set deliberately.
7. No copied upstream code or assets outside compatible license terms.
8. A clear source-of-truth declaration when the repository is generated.

## Release ownership

| Surface | Source of truth | Identity constraint |
| --- | --- | --- |
| npm `@memi-design/cli` | `memi/release-manifest.json` | Trusted Publisher must target `memi-design/memi` |
| GitHub Action | `memi/action.yml` | Consumers pin a full commit SHA |
| MCP Registry | `memi/server.json` | Existing server identity remains compatible during migration |
| GHCR | Core release workflow | New releases publish to `ghcr.io/memi-design/memi`; the personal namespace remains historical |
| Homebrew | `homebrew-memi` | Canonical tap is `memi-design/memi` |
| Website | `memoire-web` | Version and release copy are generated from the core manifest |

## Transfer gate

Before moving a repository:

- inventory releases, Actions, environments, Pages, packages, webhooks, deploy keys, and branch protections;
- identify hard-coded owner paths and external trusted-publisher subjects;
- preserve a redirect-compatible transition window;
- update the canonical local remote;
- rerun clean installs and public-link checks after the move.

Any repository with a live Pages environment moves only after its external identity is ready.

## Lifecycle

- **Official:** actively maintained and part of the supported product path.
- **Proof:** maintained integration with reproducible evidence.
- **Incubating:** incomplete experiment; not pinned or advertised as supported.
- **Archived:** read-only historical reference with a replacement or end-of-life notice.

Repository count is not a growth metric. A repository belongs in the organization only when it makes the product easier to understand, install, verify, or extend.
