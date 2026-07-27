# Memi

Memi is the read-only design engineering audit and skill layer for coding agents.

Run a deterministic, file-anchored audit without an account, API key, or write access:

```bash
npx -y @memi-design/cli@2.6.2 diagnose . --json --no-write --fail-on none
```

- [Website and documentation](https://memoire.cv)
- [Core CLI, MCP server, GitHub Action, and focused skills](https://github.com/sarveshsea/memi)
- [npm package](https://www.npmjs.com/package/@memi-design/cli)

The core repository remains at `sarveshsea/memi` while public Action consumers are migrated without breaking existing workflows.
