# Templates

Copy, then replace every placeholder in square brackets. Delete what does not apply rather than leaving it empty. The full skeleton, with worked examples, lives in the [company-brain-template](https://github.com/Castaldo-Solutions/company-brain-template) repository.

## CORE.md

Ring 0: the only file always in context. Every line costs every session, so keep it under 100 lines.

```markdown
# CORE: [COMPANY NAME]

If an answer needs a fact that is not here, load it from the right file instead of reconstructing it from memory.

## Who we are, in ten lines

[Legal name]. [Who runs it, and in what role]. [Where you are].
[What you do, in a sentence a client would use].
Target: [who actually buys, and who signs].
Promise: [the outcome a buyer gets, with a number, a timeframe and its source].
Method: [how you work, if it has a name].
[What you sell, by area].
[Certifications and partnerships at the exact level you hold. Never a tier you do not hold].
Commercial entry point: [how a new client comes in].

**Where we are going:** [the 24-month goal, in one line].

Detail: `company/identity.md`, `company/offering.md`

## Non-negotiable rules

1. [A rule that can be checked, for example: no em dashes.]
2. Every number has a source. If there is no source, the number does not get written.
3. Price, scope and contractual promises are never generated autonomously: a draft yes, a decision no. That belongs to [who decides].
4. No client is named in public content without recorded permission.
5. A fact with an expired `verified_on` is a hypothesis. Verify it before using it.

## Map of the brain

| Needed for | Load |
|---|---|
| Proposal, quote, negotiation | `company/pricing.md`, `playbooks/proposal.md` |
| How something gets done | `playbooks/README.md` |
| Who counts as a client for us | `company/icp.md` |
| What we may cite, and about whom | `company/proof.md` |
| Why we decided this way | `decisions/` |

## Confidentiality

`company/pricing.md` [and other confidential paths] never reach public content or output meant for third parties. This brain holds no credentials.

## How it stays current

Every correction made to an assistant's output is a fact missing here: it gets captured immediately, in the right file. Decisions are dated and never rewritten: a change is a new decision that supersedes the old one.
```

## MANIFEST.yaml

```yaml
version: 1
updated: [YYYY-MM-DD]

rings:
  0: always in context
  1: loaded on demand, based on the type of work
  2: never in context, searched or regenerated

files:
  - path: CORE.md
    ring: 0

  - path: company/identity.md
    ring: 1
    load_when: [content, copy, proposal, website, tone of voice]

  - path: company/offering.md
    ring: 1
    load_when: [proposal, service, commercial page, pitch]

  - path: company/icp.md
    ring: 1
    load_when: [proposal, qualification, campaign, targeting]

  - path: company/proof.md
    ring: 1
    load_when: [proposal, article, case study, reference]

  - path: company/pricing.md
    ring: 1
    confidential: true
    never_in: [public content, output to third parties]
    load_when: [proposal, quote, discount, negotiation]

  - path: decisions/**
    ring: 2
    append_only: true
    load_when: [why did we choose, history]

  - path: playbooks/README.md
    ring: 1
    load_when: [how do we, which playbook]
```

A file earns ring 1 only if it is needed more than once a month. Everything else stays in ring 2.

## Frontmatter of a fact file

```yaml
---
owner: [who answers for this file]
verified_on: [YYYY-MM-DD]
review_every: 90d
status: draft          # draft | current | stale
ring: 1
confidential: false
---
```

## A decision

One file per decision, named `decisions/YYYY-MM-DD-title-in-kebab-case.md`.

```markdown
---
owner: [who decided]
date: [YYYY-MM-DD]
status: accepted        # proposed | accepted | superseded
ring: 2
---

# [The title states the decision, not the topic]

## Context
[What was going on, and what you knew at that moment.]

## Decision
[What you decided, in a sentence that leaves no room.]

## Alternatives rejected
[What you considered and why you left it.]

## Consequences
[What changes now: files to update, things that stop being true.]
```

## A playbook

Only for a process run at least twice.

```markdown
---
owner: [who runs this process]
verified_on: [YYYY-MM-DD]
review_every: 180d
status: current
ring: 1
confidential: false
---

# [What this playbook covers]

## When it applies
[The trigger, and when it does not apply.]

## The steps
1. [Step, with who does it and what it produces]

## What to check before it goes out
[The list you actually run through.]

## What goes wrong
[Recurring failure modes, and the shortcut that avoids each.]
```

## An example

Only for an artefact whose outcome you know: signed, published, praised.

```markdown
---
owner: [who produced it]
verified_on: [YYYY-MM-DD]
status: current
ring: 2
confidential: false
---

# [What it is, and what happened]

## Outcome
[Signed, published, praised. With the date, and a number where there is one.]

## Why it worked
[Three or four points: the judgement an assistant can reuse.]

## What would not work again
[Context that has changed since.]
```
