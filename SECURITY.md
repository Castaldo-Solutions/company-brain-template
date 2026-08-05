# Security

## The risk this repo actually carries

This template ships two small Node scripts and a set of markdown files, so the classic attack surface is thin. The real risk is different, and it is worth naming:

**A company brain is the highest-value document set in a company.** It holds pricing, margins, ideal client, client history, the reasons deals were lost. A brain that leaks is worse than a leaked codebase, because it needs no technical skill to be exploited by a competitor.

## Rules that come before any tooling

1. **Keep your brain private.** This template is public. Your filled-in copy is not. Check it before the first push, not after.
2. **No credentials, ever.** A brain describes where secrets are kept, never what they are. No API keys, no passwords, no tokens, not even "temporarily".
3. **Mark confidential files** in `MANIFEST.yaml` with `confidential: true` and `never_in`, so agents reading the brain know what must not surface in public output.
4. **Watch what leaves.** The point of a brain is that agents read it. Anything an agent reads can end up in something an agent writes. Confidential facts need to be marked, not just stored carefully.
5. **Client data.** If your brain holds information about named clients, that is personal or commercially sensitive data with the obligations attached. Keep derived knowledge, not source documents.

## Reporting a vulnerability

If you find a security issue in the scripts, email **info@castaldosolutions.it** with the details and how to reproduce it. Please do not open a public issue for something exploitable.

We will confirm receipt within five working days and tell you what we intend to do about it.

## Scope

In scope: the validator scripts, the installation instructions, anything in this repository that could cause a user to expose their own data.

Out of scope: what you put in your own brain, and how you protect the repository you keep it in. That part is yours, and rules 1 to 5 above are the whole advice we have.
