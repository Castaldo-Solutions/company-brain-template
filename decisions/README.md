# decisions/: the decisions

This is **why you chose what you chose**, with the date and the context of the time.

## The rule that matters most

**A decision is never rewritten.** If it changes, you write a new one that supersedes the previous and cites it. This folder is append-only.

It sounds like a formality. It is not: the moment you rewrite an old decision you lose the only information that matters, which is what you knew when you made it. Six months later nobody needs to know that you chose X. They need to know you chose it **because back then Y did not exist yet**.

## Where this format comes from

[Architecture Decision Records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html), proposed by Michael Nygard in 2011 for technical decisions. Here the idea is the same, applied to company decisions: pricing, positioning, who to hire, what to stop doing.

## How to write one

One file per decision, named `YYYY-MM-DD-title-in-kebab-case.md`:

```markdown
---
owner: [who decided]
date: 2026-01-15
status: accepted        # proposed | accepted | superseded
ring: 2
---

# [The title states the decision, not the topic]

## Context
[What was going on, and what you knew at that moment. This is the part that
carries the value: without it, a year from now the decision will look
arbitrary.]

## Decision
[What you decided, in a sentence that leaves no room.]

## Alternatives rejected
[What you considered and why you left it. This is what stops you relitigating
the same question every six months.]

## Consequences
[What changes now: files to update, processes to adjust, things that stop
being true.]
```

## When to write one

When the answer to "why do we do it this way?" is longer than one line, or when a discussion was hard. If it was hard once it will be hard again: write it down and the second time takes five minutes.

See [`2026-01-15-example-decision.md`](2026-01-15-example-decision.md) as a model.
