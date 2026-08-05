# Wiring the brain

A brain nobody reads is worth nothing. Here is how to connect it to the tools that should consume it.

## First: where it lives

Two options, and the choice depends on how many projects you have.

**A dedicated repository** (recommended). The brain owns its history, and working repos attach to it. A fact corrected once is correct everywhere.

```bash
# inside the brain folder
git init && git add . && git commit -m "init: company brain"
git remote add origin <url-of-your-private-repo>
git push -u origin main
```

> **Keep it private.** It holds pricing, margins and client information. This template is public, your brain is not.

**A folder inside one project**, if you only have one project and do not expect more. It works, but the day a second project needs the same facts you are back where you started: two copies drifting apart.

## Attaching it to a working repository

As a submodule, so the brain stays its own repository and each project pins the version it wants:

```bash
cd <working-repo>
git submodule add <url-of-your-brain> brain
git commit -m "chore: attach the company brain"

# for whoever clones the repo later:
git submodule update --init
```

Or as a symlink, if you prefer a single copy on disk and do not need to version the reference:

```bash
# Linux and macOS
ln -s ~/path/to/brain brain
# Windows, from an elevated PowerShell
New-Item -ItemType SymbolicLink -Path brain -Target C:\path\to\brain
```

Remember to exclude `brain/` from your deploys. It is knowledge, not code to publish.

## Claude Code

Claude Code reads the project's `CLAUDE.md` at the start of every session, so importing ring 0 from there is enough:

```markdown
# CLAUDE.md

## Company Brain
@brain/CORE.md

## Project architecture
[whatever is true only for this codebase]
```

One criterion keeps the two apart: **if something serves a single project it stays in `CLAUDE.md`, if it serves the company it goes into the brain.** That is what prevents divergent copies.

From then on every session starts knowing the company, and the other files load when needed according to `MANIFEST.yaml`.

## Other tools

The brain is markdown in a folder, so anything that can read files can consume it:

- **Assistants with filesystem or repository access**: point them at the folder and tell them to read `CORE.md` first, then `MANIFEST.yaml` to decide the rest.
- **Automations** (n8n, scripts, pipelines): a read-only clone, refreshed on every push, is the simplest arrangement.
- **People**: it doubles as the reasoned archive of the company. Someone new reads the brain instead of shadowing the founder for three months.

## Keeping it alive

Updating works when it happens inside the work, not next to it.

```bash
node validators/brand-lint.mjs <file...>   # how it is written
node validators/freshness.mjs              # what expired
```

The most effective way not to forget is to hook the linter to your commits, so violations never get in:

```bash
# .git/hooks/pre-commit
#!/bin/sh
git diff --cached -U0 | node validators/brand-lint.mjs --diff
```

The `--diff` mode looks only at added lines, so existing debt is never charged to whoever touches the file today.

And the rule that matters more than any tooling: **every correction you make to an agent's output is a fact missing from the brain**, and it gets recorded immediately.
