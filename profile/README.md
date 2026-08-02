<p align="center">
  <img src="https://raw.githubusercontent.com/memi-design/.github/main/brand/memi-brand-banner.png" alt="Memi — The design layer for agentic AI." width="100%" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@memi-design/cli"><img src="https://img.shields.io/npm/v/@memi-design/cli?color=bd3f63&label=npm" alt="npm version"></a>
  <a href="https://github.com/memi-design/memi/stargazers"><img src="https://img.shields.io/github/stars/memi-design/memi?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/memi-design/memi/blob/main/LICENSE"><img src="https://img.shields.io/badge/CLI%20license-MIT-171718.svg" alt="Memi CLI MIT license"></a>
</p>

# Memi

The design layer for agentic AI.

Memi gives coding agents file-anchored design evidence, governed design workflows, a supervised native workbench, and an emerging local-first canvas.

## Start with the CLI

Run a read-only audit in any frontend repository:

```bash
npx -y @memi-design/cli@latest diagnose . --json --no-write --fail-on none
```

No account, API key, Figma file, global install, or daemon is required for the first audit.

## Products

| Product | Status | Role | Public surfaces |
| --- | --- | --- | --- |
| [Memi CLI](https://github.com/memi-design/memi) | Available | Read-only design engineering audit and skill layer for coding agents. | [Repository](https://github.com/memi-design/memi) · [Docs](https://github.com/memi-design/memi/blob/main/docs/README.md) · [npm](https://www.npmjs.com/package/@memi-design/cli) |
| [Memi Studio](https://github.com/memi-design/memi-studio) | Available | Native macOS companion for supervised agent workflows and artifact review. | [Repository](https://github.com/memi-design/memi-studio) · [Docs](https://github.com/memi-design/memi-studio#readme) · [Download](https://github.com/memi-design/memi-studio/releases/latest) |
| [Memi Design Skills](https://github.com/memi-design/design-skills) | Available | Governed catalog of portable and capability-gated design workflows for coding agents. | [Repository](https://github.com/memi-design/design-skills) · [Docs](https://github.com/memi-design/design-skills#readme) · [Install](https://skills.sh/memi-design/design-skills) |
| [Memi Canvas](https://github.com/memi-design/memi-canvas) | In development | Local-first canvas workbench for understanding, creating, and verifying software interfaces. | [Repository](https://github.com/memi-design/memi-canvas) · [Docs](https://github.com/memi-design/memi-canvas#readme) |

**Canvas boundary:** Open-source M0 development snapshot; not yet a production importer or source editor. Its current tests and deterministic demo evidence are engineering proof, not a claim of production readiness.

## Design workflows

Install only the workflow you need from Memi Design Skills:

```bash
npx skills add memi-design/design-skills --skill better-ui
```

Focused mirrors remain available for the audit, memory, and CI workflows. Their canonical definitions are governed in the Memi repositories and generated mirrors must declare their source of truth.

## How we build

- Read-only inspection is the default for the CLI.
- Findings include confidence, provenance, and file evidence.
- Deterministic checks rerun before a result is called verified.
- Existing design systems remain the source of truth.
- Public integrations must be runnable, attributed, and maintained.
- In-development surfaces are labeled before they are promoted.

[Website](https://memoire.cv) · [Discussions](https://github.com/memi-design/memi/discussions) · [Organization architecture](https://github.com/memi-design/.github/blob/main/ORG_ARCHITECTURE.md) · [Brand manifest](https://github.com/memi-design/.github/blob/main/brand/brand-manifest.v1.json)

[Contribute](https://github.com/memi-design/.github/blob/main/CONTRIBUTING.md) · [Open-source model](https://github.com/memi-design/.github/blob/main/OPEN_SOURCE.md) · [Security](https://github.com/memi-design/.github/blob/main/SECURITY.md) · [Code of Conduct](https://github.com/memi-design/.github/blob/main/CODE_OF_CONDUCT.md)
