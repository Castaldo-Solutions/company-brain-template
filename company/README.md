# company/: the facts

This is **what is true right now**: who you are, what you sell, to whom, on what terms, with what proof.

## Rules of the genre

1. **One fact, one place.** If something already exists in another file, link to it. Never duplicate: that is how divergent versions are born.
2. **Every file carries `verified_on`.** A fact without a verification date is an opinion wearing a suit.
3. **No history, no procedure.** The why belongs in `decisions/`, the how belongs in `playbooks/`. Mix them in here and this file becomes impossible to update.
4. **Every number has a source.** If you do not know where it came from, do not write it.

## Frontmatter

Every file of facts starts like this:

```yaml
---
owner: [who answers for this file]
verified_on: 2026-01-15      # when it was last verified
review_every: 90d            # how often it needs re-checking
status: current              # current | stale | draft
ring: 1                      # keep in sync with MANIFEST.yaml
confidential: false
---
```

`validators/freshness.mjs` reads these fields and tells you what expired. An expired file still marked `status: current` is a silent lie, and that is precisely what the validator looks for.

## The starting files

| File | What it holds | Where you get it from |
|---|---|---|
| `identity.md` | how you sound, what you are and what you are not | your site, your decks, how you describe yourself out loud |
| `offering.md` | what you actually sell, by area | your last ten proposals, not the theoretical catalogue |
| `icp.md` | who is a good client, and who is not | the clients you took and the ones you turned down |
| `pricing.md` | commercial terms | **confidential**, mark it in the MANIFEST |
| `proof.md` | numbers and cases you may cite, and with whose permission | closed projects with an outcome the client recognises |

You do not need to write them all today. You need the ones that exist to be true.
