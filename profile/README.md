<p align="center">
  <img src="https://raw.githubusercontent.com/memi-design/memi/main/assets/readme-hero.svg" alt="Memi audits an interface before a coding agent edits it." width="100%" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@memi-design/cli"><img src="https://img.shields.io/npm/v/@memi-design/cli?color=bd3f63&label=npm" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@memi-design/cli"><img src="https://img.shields.io/npm/dw/@memi-design/cli?color=171718&label=weekly%20downloads" alt="weekly npm downloads"></a>
  <a href="https://github.com/memi-design/memi/stargazers"><img src="https://img.shields.io/github/stars/memi-design/memi?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/memi-design/memi/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-171718.svg" alt="MIT license"></a>
</p>

# Memi

Read-only design engineering for coding agents.

Memi gives Codex, Claude Code, Cursor, Grok Build, and MCP clients file-anchored interface evidence before they edit UI.

```bash
npx -y @memi-design/cli@2.6.3 diagnose . --json --no-write --fail-on none
```

No account, API key, Figma file, global install, or daemon is required for the first audit.

## Start here

| Repository | Role |
| --- | --- |
| [`memi`](https://github.com/memi-design/memi) | Core CLI, MCP server, GitHub Action, focused Agent Skills, and audit engine |
| [`design-skills`](https://github.com/memi-design/design-skills) | Governed catalog of 94 design, research, craft, generation, and Figma skills |
| [`memi-studio`](https://github.com/memi-design/memi-studio) | Native macOS companion for supervised agent workflows |
| [`design-sandbox`](https://github.com/memi-design/design-sandbox) | Runnable Next.js proof environment for design audits and integrations |

## Focused Agent Skills

- [`audit-frontend-design`](https://github.com/memi-design/audit-frontend-design) — inspect interface risks before changing UI.
- [`remember-design-system`](https://github.com/memi-design/remember-design-system) — load compact product-system context.
- [`enforce-design-ci`](https://github.com/memi-design/enforce-design-ci) — gate pull requests with deterministic evidence.

Install the smallest workflow needed:

```bash
npx skills add memi-design/memi --skill audit-frontend-design
```

## Labs and integration proofs

- [`ripple-image-transitions`](https://github.com/memi-design/ripple-image-transitions) — SwiftUI and Metal evaluation fork.
- [`chatbot`](https://github.com/memi-design/chatbot) — shadcn chatbot integration proof with Memi design CI.

Proof forks preserve upstream attribution and do not imply partnership.

## How we build

- Read-only inspection is the default.
- Findings include confidence, provenance, and file evidence.
- Deterministic checks rerun before a result is called verified.
- Existing design systems remain the source of truth.
- New workflow contributions land in skills before compatibility shims.
- Public integrations must be runnable, attributed, and maintained.

[Documentation](https://memoire.cv) · [npm](https://www.npmjs.com/package/@memi-design/cli) · [Discussions](https://github.com/memi-design/memi/discussions) · [Organization architecture](https://github.com/memi-design/.github/blob/main/ORG_ARCHITECTURE.md)
