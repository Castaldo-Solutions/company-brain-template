---
name: capture
description: Record a fact, a decision, a correction or a lesson in the company brain, in the one file where it belongs. Use it when the user corrects an assistant's output and the correction should hold next time, says "remember that", "from now on", "that's not how we do it", "we decided", or when a new price, rule, client outcome or non-obvious choice comes up during the work. Requires an existing company brain (CORE.md and MANIFEST.yaml); if there is none, use the setup skill first.
---

# Capture into the company brain

Every correction made to an assistant's output is a fact missing from the brain. If the same thing gets corrected three times, the assistant is not the problem. This skill puts the fact in the right place, once.

Reply in the user's language.

## 1. Find the brain

Look for `CORE.md` and `MANIFEST.yaml` in the working directory, then in `brain/`. If there is no brain, say so and offer the `setup` skill. Do not create a stray file somewhere else.

## 2. Decide the genre

| What the user said | Genre | Where |
|---|---|---|
| Something true right now: a price, a client segment, a rule, a status | **fact** | a file in `company/` (or the folder the manifest names) |
| Why something was chosen, with the context of the moment | **decision** | a new file in `decisions/` |
| How something is actually done, already done at least twice | **playbook** | a file in `playbooks/` |
| A real artefact whose outcome is known | **example** | a file in `examples/` |

A single sentence often carries two genres: "we dropped the hourly rate because clients compared it with freelancers" is a fact (no hourly rate) and a decision (why). Write each in its own place and link them.

If you are not sure which genre, ask, with your best guess as the first option.

## 3. Find the one file

Read `MANIFEST.yaml` and pick the file whose `load_when` matches the topic. Then search the brain for the fact itself: it may already be written somewhere, maybe in a different form.

- **The fact already exists:** rewrite that line so it says what is true today. Do not add a dated note underneath: a fact file says what is true now, and the history lives in version control and in `decisions/`.
- **The fact contradicts another file:** stop and show both. One fact, one place: decide with the user which file owns it, and make the other one link to it.
- **No file fits:** propose a new one, and add it to `MANIFEST.yaml` with its ring and `load_when`. A new file earns ring 1 only if it will be needed more than once a month; otherwise ring 2.

## 4. Write it

**Facts**

- Update `verified_on` to today in the frontmatter of the file you touched.
- A number needs its source next to it: the document, the person, the date. No source, no number.
- No history and no procedure in a fact file.

**Decisions**

- New file `decisions/YYYY-MM-DD-title-in-kebab-case.md`, with context, decision, alternatives rejected, consequences. The title states the decision, not the topic.
- Never rewrite an existing decision. If it changes, write a new one that cites the old, and set the old one's `status` to `superseded`. That status line is the only edit an old decision ever gets.

**Playbooks**

- Only for a process run at least twice. Before that it is an intention, not a practice: record it as a decision or a note instead.

**Price, scope and contractual promises**

- These belong to whoever the brain's `CORE.md` names as the decider. Write them only when that person stated them, and say so in the file.

**Confidential content**

- If the fact concerns pricing, a client or a person, check that the target file is marked `confidential: true` in its frontmatter and in the manifest.
- Never write a credential. Write where it is kept.

## 5. Keep the map honest

Add a row to the map in `CORE.md` only if the new file is needed in most sessions, and keep the map under fifteen rows: to add one, merge or remove another. Most new files belong only in the manifest.

## 6. Show and save

Show the user the change as a short diff: file, old line, new line. If the brain is a git repository, commit with a message that says what changed and why, for example `pricing: no hourly rate, decided 2026-03-02`.
