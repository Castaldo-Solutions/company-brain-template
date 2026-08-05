# validators/: rules that actually run

A rule written in a document is a wish. A rule that blocks a commit is a rule.

Two scripts, no dependencies, plain Node (18 or later).

## brand-lint

Checks how things are written.

```bash
node validators/brand-lint.mjs company/identity.md        # one file
node validators/brand-lint.mjs company/                   # a folder
git diff --cached -U0 | node validators/brand-lint.mjs --diff   # only added lines
```

The rules live in [`rules.mjs`](rules.mjs), and that is the only file you should need to edit. The ones shipped here are a starting point: no em dashes, no emoji standing in for icons, no conference-room jargon, no vague promises without a source. Delete what you disagree with and add what matters to you.

**Two design choices worth knowing:**

- **`--diff` only looks at added lines.** Existing debt is never charged to whoever touches a file today. It is what makes the linter adoptable on a repository that already has thousands of lines in it.
- **Context decides, not the glyph.** A checkmark character in prose is typography and passes. The same character in HTML or SVG is an icon drawn with text, and gets blocked. That distinction is the difference between a linter people keep and one they disable.

**Escape hatch:** put `brand-lint:ignore` on a line and it is skipped. Use it for lines that necessarily contain a banned term, such as the rule definitions themselves, or a technical term that only looks like jargon. Fenced code blocks are skipped automatically.

## freshness

Checks what has gone stale.

```bash
node validators/freshness.mjs
```

Reads `verified_on` and `review_every` from the frontmatter of every file of facts and reports what is past due. Exits 1 when an expired file is still marked `status: current`: a stale fact presented as current is worse than a missing one, because nobody thinks to question it.

Decisions are skipped: they are append-only and never expire by design.

## Wiring them to your commits

```bash
# .git/hooks/pre-commit
#!/bin/sh
git diff --cached -U0 | node validators/brand-lint.mjs --diff
```

In CI, run `brand-lint` on the changed files and `freshness` on a schedule rather than on every push: a fact going stale is not a reason to fail a build, it is a reason to send someone a reminder.
