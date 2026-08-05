# Contributing

Thanks for looking. This template is small on purpose, so the most valuable contributions are usually not code.

## The most useful thing you can do

**Tell us what happened when you used it.** Open an [issue](https://github.com/Castaldo-Solutions/company-brain-template/issues) and say what you kept, what you deleted, and where it fell apart. A report like "the three genres made no sense for a five-person agency, here is what I did instead" is worth more than a pull request.

The template comes from one company's practice. Every report from a different context is the only way it stops being one company's practice.

## What fits here

- **Structure**: a folder or a file that turned out to be necessary, with the reason it was.
- **Validators**: rules worth shipping by default, or a fix to the engine.
- **Documentation**: clearer wording, a corrected instruction, a translation.
- **Integrations**: how to wire the brain to a tool that is not Claude Code.

## What does not fit

- **Content.** No industry-specific templates, no filled-in examples. The value of this repo is the shape, and content is what each company brings.
- **Dependencies.** Two scripts, no `package.json`, no toolchain. If a change needs a dependency, it probably belongs in your own fork.
- **Automation of judgement.** A validator can check that a number carries a source. It cannot check that the number is true. Rules that pretend otherwise make people trust the linter more than the facts.

## Pull requests

1. Open an issue first if the change is more than a typo. It saves you from writing something we would have to refuse.
2. One change per pull request.
3. Run the validators on what you touched:
   ```bash
   node validators/brand-lint.mjs <files>
   node validators/freshness.mjs
   ```
4. Write the commit message so it explains **why**, not what. The diff already says what.

## Style

Everything in this repo is in English. Prose is written to be read by a person deciding whether to adopt this, not to be skimmed. Concrete over abstract, no filler, and no em dashes: the linter enforces that last one on itself.

## Code of conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
