# Contributing to Memi

Thank you for improving Memi. Contributions of code, design evidence, tests,
documentation, accessibility review, and reproducible integrations are welcome.

## First contribution

1. Choose an unassigned issue labeled `good first issue`, or open a focused bug
   with a reproduction.
2. Comment that you are working on it so effort is not duplicated.
3. Fork the repository, branch from `main`, and keep the change narrowly scoped.
4. Open a pull request with the exact validation commands and rendered evidence
   when visual behavior changes.

Advance permission is not required for an unassigned `good first issue`.

## Choose the right repository

- Core audits, CLI, MCP, GitHub Action, and focused skills: `memi`.
- Canonical design workflow catalog: `design-skills`.
- Native macOS companion: `memi-studio`.
- In-development local-first canvas: `memi-canvas`.
- Reproducible examples and integrations: the repository that owns that
  bounded proof.
- Bugs in a proof fork: report them in that fork and link the upstream source when relevant.

Start with an issue for broad behavior or architecture changes. Small documentation, fixture, and focused bug fixes may go directly to a pull request.

## Local workflow

Use the package manager and commands declared by the repository. Before opening
a pull request:

- run formatting, lint, typecheck, tests, and build checks that apply;
- add a regression test before fixing behavioral defects;
- include screenshots or recordings for rendered changes, including reduced
  motion or fallback behavior where relevant;
- update user-facing documentation when commands, schemas, or installation
  paths change.

## Contribution standard

- Add or update tests before implementation when behavior changes.
- Preserve read-only defaults and validate input at system boundaries.
- Cite the repository file, route, or rendered evidence behind a design finding.
- Retain licenses and attribution for adapted work.
- Keep generated mirrors synchronized with their declared source of truth.
- Keep product identity synchronized with
  [`brand/brand-manifest.v1.json`](brand/brand-manifest.v1.json).
- Use conventional commits such as `feat:`, `fix:`, `docs:`, `test:`, and `chore:`.

Each repository may define additional checks in its own contributing guide.

## Review and merge

- Pull requests are reviewed for correctness, security, accessibility,
  provenance, compatibility, and maintenance cost.
- Authors should resolve review threads or explain the tradeoff with evidence.
- Maintainers normally squash-merge into `main` and delete the source branch.
- A pull request may be closed when it is unsafe, out of scope, inactive after
  follow-up, or duplicates a supported direction.
- Substantive contributors are credited in release notes when their work ships.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
