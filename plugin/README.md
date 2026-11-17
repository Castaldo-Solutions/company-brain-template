# Company Brain, the Claude plugin

Three skills to build and keep a **company brain**: the facts, decisions and playbooks your AI assistants read before producing anything, so every session starts from your company instead of from the average of the internet.

| Skill | What it does | When |
|---|---|---|
| `/cbrain:setup` | Creates the brain from documents you already have: your best won proposal, your terms, recent client emails. Asks only what those documents do not answer, then writes `CORE.md`, `MANIFEST.yaml` and the first fact files | once, at the start |
| `/cbrain:capture` | Puts a fact, a decision or a correction in the one file where it belongs, updates its verification date, keeps the routing manifest in sync | every time you correct an assistant |
| `/cbrain:review` | Finds what has gone stale, broken routing, writing rules broken, numbers without a source, confidential files without the flag | once a month, or before a proposal |

The skills also trigger on their own when the conversation calls for them, for example when you say "remember that" or "what has gone stale".

## How the brain is built

The method, the folder structure and the reasoning behind it are in the [company-brain-template](https://github.com/Castaldo-Solutions/company-brain-template) repository, of which this plugin is a part. In short:

- **`CORE.md`** is the only file always in context: who you are, the rules, a map. Under 100 lines.
- **`MANIFEST.yaml`** is the routing contract: which file loads, and when.
- **Three genres never mix:** facts (`company/`, what is true now), decisions (`decisions/`, why, dated and never rewritten), playbooks (`playbooks/`, how it gets done).
- **Every fact carries a verification date.** Once it expires, it is a hypothesis to check, not a truth to build a proposal on.

Background: [Company brain: the memory your AI assistants need](https://www.castaldosolutions.it/articles/en/blog/company-brain-memoria-aziendale-ai).

## What it runs and what it sends

Nothing. The plugin is Markdown instructions only: no scripts, no hooks, no MCP servers, no network calls. The skills read and write files in the folder you point them at, with your usual Claude Code permissions.

Your brain will hold prices, margins and client information: keep it in a **private** repository. The skills never write credentials, only where they are kept.

## Try it locally

From a copy of the [company-brain-template](https://github.com/Castaldo-Solutions/company-brain-template) repository, start Claude Code with `--plugin-dir` pointing at this `plugin` folder. Then, in a new or existing project folder, run `/cbrain:setup`.

## Language

The instructions are in English and the skills reply in the language you write in. File names and frontmatter keys stay in English so that other tools can read them.

## License

[MIT](LICENSE). Made by [Castaldo Solutions](https://www.castaldosolutions.it). If something breaks, [open an issue](https://github.com/Castaldo-Solutions/company-brain-template/issues).
