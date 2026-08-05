# CORE: [COMPANY NAME]

> **How to use this file.** This is ring 0: the only file that is **always** in context, in every session of every agent. Every line here costs everyone, so defend it. Replace the placeholders in square brackets, delete what you do not need, and keep it under 100 lines. Everything else loads on demand, according to `MANIFEST.yaml`.
>
> If an answer needs a fact that is not here, **load it from the right file instead of reconstructing it from memory**.

## Who we are, in ten lines

[Legal name]. [Who runs it, and in what role]. [Where you are].
[What you do, in a sentence a client would use, not a consultant].
Target: [who actually buys, and who signs].
Promise: [the outcome a buyer gets, with a number and a timeframe].
Method: [how you work, if your way of working has a name].
[What you sell, by area].
[Certifications, partnerships and status, at the exact level. Never a tier you do not hold].
Commercial entry point: [how a new client comes in].

**Where we are going:** [the 24-month goal, in one line. Agents use it to tell what is consistent with the direction and what is not].

Detail → `company/identity.md` · `company/offering.md`

## Non-negotiable rules

> These are ours, kept as an example of how specific a rule has to be. Yours will differ. A rule only counts if it can be checked: "write well" is not a rule, "never use an em dash" is. When you add one, add it to `validators/rules.mjs` too, so it stops depending on goodwill.

1. **[Form of address].** Pick one and never switch.
2. **No em dashes.** Use a comma, a colon, parentheses or a full stop.
3. **No emoji** in content, documents or graphics. Icons are SVG, always.
4. **No conference-room jargon:** [list the words you never want to read].
5. **Every number has a source.** No figure, percentage or KPI without a verifiable origin. If there is no source, the number does not get written.
6. **Outcomes, not features.** You sell what changes, not what it does.
7. **[Brand asset rule]:** the logo is `[path]`. Never redrawn, never rebuilt.
8. **Price, scope and contractual promises are never generated autonomously.** A draft yes, a decision no: that belongs to [who decides].
9. **No client is named in public content** without permission recorded in `clients/<name>/consent.md`.
10. **A fact with an expired `verified_on` is a hypothesis**, not a truth. Verify it before using it.

## Map of the brain

> The map tells an agent where to look. Keep it under fifteen rows: to add one, remove one or merge two. When a family of files grows, point at its index instead of the individual files.

| Needed for | Load |
|---|---|
| Proposal, quote, negotiation | `company/pricing.md` · `playbooks/proposal.md` |
| How something gets done | `playbooks/README.md`, which is the index |
| What a good artefact looks like | `examples/README.md`, which is the index |
| Who counts as a client for us | `company/icp.md` |
| What we may cite, and about whom | `company/proof.md` |
| Why we decided this way | `decisions/` |
| [Add the rows you actually need] | |

## Confidentiality

`[confidential folders]` are **confidential**: they never reach public content or output meant for third parties. This brain holds no credentials: it describes where the secrets are kept, not what they are.

## How it stays current

Every correction [who decides] makes to an agent's output is a fact missing here. It gets captured immediately, in the right file, not "later".

Decisions are written in `decisions/` with a date and **are never rewritten**: if one changes, you write a new decision that supersedes it.

Before committing:

```bash
node validators/brand-lint.mjs <file...>   # how it is written
node validators/freshness.mjs              # what expired
```
