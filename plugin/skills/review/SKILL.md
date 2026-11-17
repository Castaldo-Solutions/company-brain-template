---
name: review
description: Health check of a company brain. Finds facts whose verification date has expired, files missing from the routing manifest or present in it but not on disk, writing rules broken, numbers without a source, confidential files without the flag, and fact files that have started to mix in history or procedure. Use it once a month, before relying on the brain for a proposal, or when the user asks "is our brain up to date", "what has gone stale", "check the brain".
---

# Review the company brain

A brain is only useful while it is true. This skill reads it the way an auditor would and reports what is wrong, most serious first. It does not change anything unless the user asks.

Reply in the user's language. Take today's date from the environment.

## 1. Find the brain

Look for `CORE.md` and `MANIFEST.yaml` in the working directory, then in `brain/`. If there is none, offer the `setup` skill.

## 2. Freshness: the silent lies first

For every Markdown file with frontmatter, read `verified_on`, `review_every` (for example `90d`, `6m`, `1y`) and `status`. A file is **expired** when `verified_on` plus `review_every` is before today.

- **Expired and still `status: current`**: the most serious finding. An assistant will build a proposal on it as if it were true.
- **Expired and marked `stale` or `draft`**: honest, but list it.
- **A fact file without `verified_on`**: an opinion wearing a suit. List it.

Decisions are dated, not verified: they never expire. Skip `decisions/`, `README.md` files and `CORE.md` itself.

## 3. The routing contract

- Every `path` in `MANIFEST.yaml` exists on disk (globs like `decisions/**` match at least one file).
- Every Markdown file in `company/` and `playbooks/` is covered by a manifest entry.
- Every file marked `confidential: true` in its frontmatter is marked confidential in the manifest too, and the other way round.
- Every path in the map of `CORE.md` exists.

## 4. Ring 0 stays small

- `CORE.md` under 100 lines.
- The map in `CORE.md` under fifteen rows.
- No long lists or history in `CORE.md`: they belong in a ring 1 file the map points to.

## 5. The company's own writing rules

Read the non-negotiable rules in `CORE.md` and the words to avoid in `company/identity.md`, then check every file against them, line by line. The usual suspects:

- em dashes, if the rules ban them;
- emoji standing in for icons;
- the banned words the company listed;
- a figure, a percentage or a KPI with no source next to it;
- a tier, certification or partnership level stated without being in `company/proof.md` or `CORE.md`.

Report each with file and line.

## 6. Genres that started to mix

In `company/` files, look for paragraphs that tell a story ("in March we tried", "after the meeting with") or give steps ("first send, then call"). History belongs in `decisions/`, procedure in `playbooks/`. A fact file that mixes them stops being updated, because updating it means reopening everything else.

## 7. Report

One list, most serious first:

1. expired files still marked current;
2. broken routing (missing files, missing manifest entries, confidentiality mismatches);
3. rules broken, with file and line;
4. ring 0 over budget;
5. genres mixing.

For each finding, say what to do in one line. End with the three files worth re-verifying first, and offer to fix the mechanical ones (dates, manifest entries, flags). Facts themselves are re-verified with the person who owns them, not by you: never move a `verified_on` forward without that check.

If the brain is a git repository and the company wants this check on every commit, point them to the validators in the [company-brain-template](https://github.com/Castaldo-Solutions/company-brain-template) repository, which run the same rules from a script.
