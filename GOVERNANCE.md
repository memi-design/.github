# Governance

Memi is currently maintainer-led. Sarvesh Chidambaram is the release owner and
final decision maker for organization-wide changes. Maintainers are listed in
the `memi-design/maintainers` team and own review of community policy, releases,
security response, and repository lifecycle.

## Roles

- **Contributor:** anyone making a substantive issue, review, design artifact,
  documentation improvement, or code contribution.
- **Reviewer:** a trusted contributor regularly reviewing a specific surface.
- **Maintainer:** a reviewer with merge responsibility for one or more
  repositories.
- **Release owner:** the maintainer responsible for signing off public release
  identity, provenance, and rollback readiness.

## How decisions are made

- Bugs, scoped improvements, and documentation changes are handled through the
  repository that owns the affected surface.
- Cross-repository architecture and release-contract changes require a public
  proposal in `memi-design/memi`.
- Security reports follow `SECURITY.md` and are never discussed in a public
  issue before remediation.
- A repository moves into the organization only after its ownership,
  licensing, release path, and maintenance status are documented.

When consensus is not reached, the affected maintainer records the decision,
alternatives, and reversal conditions in the issue or pull request. The release
owner resolves organization-wide deadlocks.

## Becoming a maintainer

Maintainers nominate reviewers who have demonstrated sustained, constructive
work; sound security and licensing judgment; and reliable follow-through.
Existing maintainers review the nomination in a public issue. Repository access
is granted at the least-privileged level needed and reviewed when responsibilities
change.

## Inactivity and succession

A maintainer may step down at any time. Access may be removed after prolonged
inactivity, unresolved conduct concerns, or security risk. Before a sole owner
steps away, release credentials, trusted-publisher subjects, recovery paths, and
repository ownership must be transferred to another maintainer.

## Policy changes

Changes to governance, conduct, security, or organization-wide contribution
policy require a pull request in this repository and review from the Maintainers
team.
