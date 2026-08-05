![Company Brain Template: the knowledge your AI assistants read before producing anything. CORE.md is always in context, MANIFEST.yaml decides what loads and when, validators hold the rules.](.github/social-preview.png)

# Company Brain Template

**Your company's memory, written in a format AI assistants read before producing anything.**

[Why it matters](https://www.castaldosolutions.it/articles/en/blog/company-brain-memoria-aziendale-ai) · [Install](INSTALL.md) · [MIT License](LICENSE)

---

## The problem

Every session with an AI assistant starts from zero. The model does not know who you sell to, at what price, under which rules, what you already tried and why it failed. So it answers with the average of the internet: plausible, tidy, unusable.

That knowledge already exists. It lives in the founder's head, in email threads, and in scattered files nobody has opened in months. As long as it stays there, no agent can see it, and every session restarts from the world's average instead of your company.

A company brain is the single source of that knowledge, written to be read before every output, by whoever is doing the work: a person or an agent.

It is not a wiki. A wiki gets read when somebody remembers it exists.

## What this repo gives you

The skeleton, not the content. Folder structure, the always-in-context file, the routing contract, the separation of genres, and validators that make your writing rules executable. The content is yours to add.

```
CORE.md            the only file always in context: who you are, the rules, the map
MANIFEST.yaml      the routing contract: which file loads, and when
company/           facts: what you sell, to whom, on what terms
decisions/         decisions: why you chose this way, dated, never rewritten
playbooks/         models: how something actually gets done
examples/          real artefacts that worked, and why they did
validators/        your writing rules, made executable
```

## The three ideas that make it work

### 1. Three genres that never mix

| Genre | Answers | Life cycle |
|---|---|---|
| **Facts** (`company/`) | what is true right now | mutable, must be kept fresh |
| **Decisions** (`decisions/`) | why we chose this way | append-only, never rewritten |
| **Playbooks** (`playbooks/`) | how it gets done | evolves slowly |

Mixing them is how a knowledge base rots. If your pricing file also holds the story of how you got there and half a sales procedure, nobody will ever update it again, because updating it means reopening everything else.

### 2. Rings, because context is finite and expensive

Loading all your knowledge into every session is not just impossible, it is counterproductive: model performance drops as input length grows, even on simple tasks, and the drop starts well before the model's stated limit ([Context Rot, Chroma Research, July 2025](https://trychroma.com/research/context-rot)).

- **Ring 0**: one file, always in context. A few lines, defended like expensive real estate.
- **Ring 1**: loaded on demand, based on the type of work in progress.
- **Ring 2**: never in context, searched or regenerated when needed.

`MANIFEST.yaml` declares the ring for every file and the words that trigger it. An agent decides what to read by consulting that contract, not by grepping around.

### 3. Every fact carries an expiry date

Files of facts carry `verified_on` and `review_every` in their frontmatter. Once that date passes, the content is a hypothesis to verify, not a truth to build a proposal on. `validators/freshness.mjs` tells you which ones expired. A stale file still marked `status: current` is a silent lie, and that is exactly what the validator hunts for.

## Getting started

Not with a knowledge management project: with three artefacts you already have.

**1. Make it yours**

Press **Use this template** at the top of this page. You get a new repository with no history of ours attached, which is what you want: a brain should start from your first commit, not from someone else's.

Make it **private**. It will hold pricing, margins and client information.

If you would rather not go through GitHub:

```bash
git clone https://github.com/Castaldo-Solutions/company-brain-template.git brain
cd brain && rm -rf .git && git init
```

**2. Fill in `CORE.md`**

Who you are, what you sell, to whom, and the rules that are never up for debate. Keep it under 100 lines: every line here costs every agent in every session.

**3. Extract, do not write**

Take the best proposal you ever won, your standard contract, and the last ten emails you sent to a client in an active negotiation. The first files in `company/` come out of those. Six months of proposals tell you more about your ideal client than any workshop: they show who you actually sold to, what they asked for, and what you turned down.

**4. Wire it to your tooling**

See [INSTALL.md](INSTALL.md). For Claude Code it is one line in your `CLAUDE.md`:

```markdown
## Company Brain
@brain/CORE.md
```

**5. Add one fact at a time**

When it comes up, and not before. Every correction you make to an agent's output is a fact missing here. If you correct the same thing three times, the agent is not the problem.

## Validators

Rules that live only in a document are wishes. These make them executable.

```bash
node validators/brand-lint.mjs company/identity.md      # how it is written
node validators/freshness.mjs                           # what expired
git diff --cached -U0 | node validators/brand-lint.mjs --diff   # only added lines
```

Writing rules live in [`validators/rules.mjs`](validators/rules.mjs) and are **meant to be replaced**. The bundled ones are a starting point (no em dashes, no emoji standing in for icons, no vague promises without a source), plus a commented block showing the language-specific rules we run ourselves. Yours will be different. The engine stays the same.

The `--diff` mode is the one that matters at commit time: it looks only at added lines, so existing debt is never charged to whoever touches the file today.

## Confidentiality

A brain holds pricing, margins and client information. Two rules that come before all others:

- **Mark confidential files** in `MANIFEST.yaml` with `confidential: true`, and never let them reach public content or documents that leave the company.
- **No credentials, ever.** A brain describes where the secrets are kept, not what they are.

Keep your own brain in a **private** repository. This template is the public skeleton; your content is not.

## Where this comes from

We did not invent much. A company brain is a composition of patterns that have been around for years:

| Part of the model | Where it comes from |
|---|---|
| Getting knowledge out of people's heads | Nonaka and Takeuchi, *The Knowledge-Creating Company*, 1995 |
| Dated decisions, never rewritten | [Architecture Decision Records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html), Michael Nygard, 2011 |
| One fact, one place | the DRY principle, Hunt and Thomas, *The Pragmatic Programmer*, 1999 |
| Genres kept apart | [Diátaxis](https://diataxis.fr/), Daniele Procida, 2020 |
| Versioned knowledge, validated in CI | docs-as-code |
| Giving the model your knowledge instead of retraining it | [RAG](https://arxiv.org/abs/2005.11401), Lewis et al., NeurIPS 2020 |
| Loading only what is needed | measured limits of long context |

The original contribution is applying all of it to the **commercial** knowledge of a small company (pricing, ideal client, sales objections, reasons a job was turned down) rather than to the technical documentation of a software product.

## Status

Early. This is the skeleton of what we run every day at [Castaldo Solutions](https://www.castaldosolutions.it), stripped of our data. It works for a small team and on client projects. We do not yet know how it holds up in a thirty-person company with five departments, and we will say so here when we do.

If you use it, [open an issue](https://github.com/Castaldo-Solutions/company-brain-template/issues) and tell us what broke. That is the most useful contribution there is.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Use it, change it, build a consulting practice on top of it.
