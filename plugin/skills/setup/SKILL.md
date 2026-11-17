---
name: setup
description: Set up a company brain, the single source of company knowledge that AI assistants read before producing anything (who you are, what you sell, to whom, on what terms, under which rules). Use it when someone wants their assistant to stop answering with the average of the internet, says "set up a company brain", "give Claude our company context", "where do I put our pricing, ICP and rules so every session knows them", or starts a knowledge base for a small company. It extracts the first files from documents the company already has instead of asking for an essay.
---

# Set up a company brain

A company brain is a folder of plain Markdown that an assistant reads before it writes a proposal, an email or a page. One file is always in context (`CORE.md`), a routing contract (`MANIFEST.yaml`) decides what else loads and when, and three genres are kept apart: facts, decisions, playbooks.

Your job here is to produce a small brain that is **true**, not a big one that is complete. Five honest files beat twenty full of placeholders.

Reply in the user's language. The file names and the frontmatter keys stay in English, so other tools can read them.

## 0. Check what is already there

Look for `CORE.md` and `MANIFEST.yaml` in the working directory and in a `brain/` folder. If a brain already exists, do not create a second one: say so, and offer the `capture` skill for new facts and the `review` skill for a health check.

## 1. Decide where it lives

Ask once, with the recommended option first:

1. **A dedicated private repository** (recommended), attached to each working project as `brain/`. A fact corrected once is correct everywhere.
2. **A folder inside the current project**, if the company has one project and expects no more.

The brain will hold prices, margins and client information. If the target is a public repository, stop and say so before writing anything.

## 2. Extract, do not write

Ask for the documents the company already has, not for descriptions. In this order:

1. the best proposal they ever **won**;
2. their standard terms or contract;
3. the last ten emails sent to a client in an active negotiation, or their website and a recent deck if emails are not available.

Read them. They show who the company actually sells to, what buyers ask for, what gets turned down and how the company really sounds. Six months of proposals say more about the ideal client than any workshop.

## 3. Ask only what the documents do not answer

At most six questions, **one at a time**, each with a suggested answer taken from the documents when there is one:

1. Who signs the contract, and who uses the result?
2. What does a buyer get, with a number and a timeframe, and where does that number come from? No source, no number.
3. What is the company **not**, that people mistake it for?
4. Which writing rules are never up for debate? Only rules that can be checked ("never use an em dash"), not wishes ("write well").
5. Who decides price, scope and contractual promises? An assistant drafts, a person decides.
6. Which areas are confidential (pricing, clients, people)?

## 4. Write the files

Use the templates in `references/templates.md`. Create only the files you have real content for:

| File | Ring | From |
|---|---|---|
| `CORE.md` | 0 | the answers above. Under 100 lines, map under 15 rows |
| `MANIFEST.yaml` | n/a | one entry per file you create |
| `company/identity.md` | 1 | how they sound, with two or three real passages pasted from their documents |
| `company/offering.md` | 1 | what the won proposals actually sold, not the theoretical catalogue |
| `company/icp.md` | 1 | who they sold to, and who they turned down |
| `company/proof.md` | 1 | numbers and cases they may cite, and with whose permission |
| `company/pricing.md` | 1, confidential | only if the user provides terms. Mark `confidential: true` here and in the manifest |

Rules while writing:

- **Never invent a fact.** If something is missing, write `[to confirm]` and list it in the final report.
- **Every number has a source** next to it: the document and the date.
- **One fact, one place.** If it belongs in another file, link to it.
- **No history and no procedure in fact files.** The why goes in `decisions/`, the how in `playbooks/`.
- Frontmatter on every fact file, with today's date in `verified_on`. Use `status: draft` until the user has read the file, then `current`.
- **No credentials, ever.** The brain says where secrets are kept, not what they are.

Create `decisions/` with its README. Write a first decision only if one came up during the interview (a price set, a market dropped, a rule adopted). Create `playbooks/` with its README, and a playbook only for a process the company has run at least twice.

## 5. Wire it to the tools

For Claude Code, one line in the project's `CLAUDE.md`:

```markdown
## Company Brain
@brain/CORE.md
```

The rule that keeps the two apart: if something serves one project it stays in `CLAUDE.md`, if it serves the company it goes into the brain. If the brain is a separate repository, attach it as a git submodule or a symlink named `brain`, and exclude `brain/` from any deploy.

## 6. Report

End with:

- the files created, and the ones you chose not to create and why;
- every `[to confirm]` left, with the question that would close it;
- the next three facts worth adding, taken from what the documents hinted at;
- the habit that keeps it alive: every correction made to an assistant's output is a fact missing from the brain. The `capture` skill records it in the right place.
