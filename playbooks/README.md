# playbooks/: how things get done

This is **how** something is actually done in your company: a proposal, a project kickoff, an incident, an onboarding.

This folder is the index the `CORE.md` points at. When the family grows, agents come here first and load only the playbook they need.

| Playbook | Use it when | Confidential |
|---|---|---|
| [`proposal.md`](proposal.md) | writing a proposal or a quote | no |
| [add yours] | | |

## What separates a playbook from documentation

A playbook describes what you **actually do**, including the parts nobody would write in an official procedure: when you skip a step, what you check before sending, what you never promise on a first call.

If a playbook reads like something written for an audit, it is useless. Write it as you would explain it to a new colleague on their first day, out loud.

## How to write one

Only write a playbook for a process you have executed at least twice. Before that you are documenting an intention, not a practice.

```markdown
---
owner: [who runs this process]
verified_on: 2026-01-15
review_every: 180d
status: current
ring: 1
confidential: false
---

# [What this playbook covers]

## When it applies
[The trigger. And when it does not apply, which matters just as much.]

## The steps
1. [Step, with who does it and what it produces]
2. [...]

## What to check before it goes out
[The list you actually run through. This is the part an agent can enforce.]

## What goes wrong
[Recurring failure modes, and the shortcut that avoids each. This section is
what people come back for.]

## Related
- Facts: `company/[file].md`
- A worked example: `examples/[file].md`
```

## Playbooks and examples travel together

A playbook says how, an example shows what a good result looks like. An agent producing an artefact should load both: the playbook alone gives correct structure with generic content, the example alone gives shape without method.
