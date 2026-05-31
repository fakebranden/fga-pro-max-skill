---
scope: process-doc
applies-to: all-niches
---

# Rule Promotion Path

How a one-off site-specific rule graduates into the niche reasoning files.

## Why this exists

Niche reasoning files (`reasoning/<niche>.md`) are the moat. They encode the
patterns we know work — observed across multiple real client builds, not
guessed. New patterns are discovered constantly at the client level, but
**not every clever one-off belongs in the niche file.** Premature promotion
is how rule sets bloat. This doc is the gate.

## The trigger format

In the brand-kit panel of `fga-ai-demo` (path:
`/employee-hub/sites/[slug]/brand-kit`), every operator-authored rule gets
a `promote` flag:

```json
{
  "id": "lounge-five-bucks-private-room-cta",
  "niche": "lounge",
  "appliesTo": "section:cta-strip",
  "rule": "Render a separate 'Book the room' CTA distinct from general reservations on lounges with private-room revenue.",
  "promote": true,
  "siteOfOrigin": "five-bucks-drinkery",
  "addedAt": "2026-05-15",
  "observedOnSites": ["five-bucks-drinkery", "bronx-havana-room"]
}
```

When `promote: true` AND `observedOnSites.length >= 2`, the rule becomes a
candidate for promotion.

## Review cadence

**Monthly.** Branden + Spencer review the promotion-candidate queue on the
first Monday of each month. The review meeting:

1. Pulls the candidate list from `/employee-hub/skill-promotions`.
2. Filters to candidates with `observedOnSites.length >= 2`.
3. Reads each rule against the existing niche `.md`. If it's already covered
   (semantic dupe), reject + add to a dupe-log so the brand-kit UI can warn
   next time.
4. If accepted, lift into the niche `.md` at the next minor release.

## The bar for promotion

A rule is promoted ONLY if **all three** are true:

1. **Worked on ≥2 sites in the same niche.** One-off success is not a
   pattern. Two sites = the pattern is starting to generalize.
2. **Decision-rule shape.** The rule has to read as "Claude should do X
   when Y." Vague aesthetic preferences ("make it feel warmer") don't
   promote — only observable, executable rules.
3. **Doesn't conflict with an existing niche or universal rule.** If it
   does, the review meeting either rejects it or rewrites the existing
   rule. Conflicting rules in the same file are how the moat erodes.

Rules that pass go into the corresponding `## Do` section of the niche `.md`
(or `## Never` / anti-patterns if they're prohibition rules). The
`scripts/validate-schema.mjs` token budget still applies — if a promotion
would push the file over 3000 tokens, an existing weaker rule must be
demoted to make room.

## The demotion path

Promotion isn't permanent. Rules that **stop working** get demoted.

A rule is a candidate for demotion if:

- It's been in the niche `.md` for ≥3 months AND
- In the last 5 sites generated for that niche, the rule was overridden by
  the operator (`reasoning_override` flag in the brand-kit) on ≥3 of them.

Demotion happens at the same monthly review. The rule is removed from the
niche `.md` and moved to `reasoning/demoted/<niche>-<date>.md` with a note
explaining why. This keeps the history without bloating the active rule
set.

## Promotion lifecycle (visual)

```
one-off rule (brand-kit, single site)
        │
        ▼ operator marks promote: true
        │
        ▼ rule observed working on ≥2 sites
        │
        ▼ monthly review meeting
        │
        ├─→ accepted → lifted into reasoning/<niche>.md → next minor release
        │
        └─→ rejected → flagged as dupe or low-signal in the brand-kit UI

post-promotion:
        │
        ▼ 3-month grace period
        │
        ▼ if overridden ≥3 of last 5 builds in niche
        │
        ▼ demoted → reasoning/demoted/<niche>-<date>.md
```

## Who owns this

- **Operator (Branden)** — flags `promote: true` at build time. Owns the
  monthly review meeting. Final approve/reject call.
- **Spencer** — flags candidates from any sites he runs. Co-reviews.
- **Skill maintainer** — applies accepted promotions to the niche `.md`,
  bumps the version, runs `validate-schema.mjs`, tags the release.

## What doesn't promote

To keep the moat sharp, the following NEVER promote regardless of how many
sites they've worked on:

- **Brand-specific copy.** "We bring the truck. You bring the guests."
  belongs to Travelin' Tom's, not to every mobile-food-truck site. Copy
  patterns in the niche `.md` are templates with `{placeholders}`, never
  literal phrases.
- **Token / palette specifics.** Color values, font choices for a specific
  brand belong in `tokens/` or the brand kit, not the reasoning rules.
- **Section-level component picks.** "Use cult-ui's marquee on the press
  strip" is a `recipes/sections.json` entry, not a reasoning rule.
- **One-off integrations.** "Embed this client's Square widget" is the
  brand kit's job.

Reasoning rules describe **decisions**, not artifacts. If it's not a
decision-rule, it doesn't promote.

---

