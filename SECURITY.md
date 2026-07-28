# Security Policy

## Reporting

Please use GitHub private vulnerability reporting on the affected repository when available. Do not open a public issue for credentials, arbitrary file access, archive traversal, command execution, SSRF, publisher compromise, or supply-chain vulnerabilities.

If private reporting is unavailable, contact the maintainer through the security contact listed at [memoire.cv](https://memoire.cv) and include the repository, affected version, reproduction, impact, and suggested mitigation.

## Supported releases

Security fixes target the latest public release. Older releases may receive a compatibility notice when a safe upgrade path is required.

## Scope priorities

High-priority reports include:

- writes outside an approved workspace;
- unsafe archive extraction or registry path traversal;
- access to non-public network targets;
- unauthorized shell or browser execution;
- compromised npm, GitHub Action, MCP, Homebrew, or binary provenance;
- secret exposure through logs, reports, or generated artifacts.

Please allow a reasonable remediation window before public disclosure.

