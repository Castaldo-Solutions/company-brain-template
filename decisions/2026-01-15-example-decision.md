---
owner: [who decided]
date: 2026-01-15
status: accepted
ring: 2
---

# Company knowledge leaves the product repository

> This is a real decision from our own brain, kept as a worked example. Replace it with your first one and delete this note.

## Context

The website repository was also holding the knowledge of the company: brand identity, product context, editorial strategy, infrastructure documentation for four different projects. Three problems:

1. That knowledge was also needed by three other repositories and by our automation agents, none of which could see it.
2. The brand identity had been copied into four places and was drifting apart. Nobody duplicated it on purpose: it was copied once for convenience, then corrected only where it mattered at the time.
3. The root of that repository is the web root of the site, so every file in there is a file to explicitly exclude from deploys.

## Decision

Company knowledge moves into a dedicated repository, attached as a submodule under `brain/`. Only what is specific to that codebase stays behind.

The criterion, which is the only rule worth remembering: **if something serves a single project it stays there, if it serves the company it goes into the brain.**

## Alternatives rejected

- **Keep the copies and synchronise them.** That is what was already happening without anyone deciding it, and it is exactly how four diverging versions were born.
- **Move the operational artefacts too** (scripts, compose files). They are run from that repository and some paths are relative. Worth revisiting separately, possibly with a dedicated infrastructure repository.

## Consequences

- The project's `CLAUDE.md` imports from the brain instead of from local files.
- One published article shows the old structure as an example: it became a historical snapshot, to update when that piece is next revised.
- The deploy script must exclude `brain/` both as a prefix and as an exact name: a submodule appears as a gitlink with no trailing slash, and the prefix alone did not catch it.
