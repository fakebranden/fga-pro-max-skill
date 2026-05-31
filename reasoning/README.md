# Niche Reasoning Rules

One markdown file per niche. **9 niches in v1, hard cap.** Adding a 10th
requires deleting or merging an existing one.

## Schema (YAML frontmatter + sections)

```yaml
---
niche: <slug>            # MUST match _taxonomy.json
version: 0.1.0
matches: [...]           # Mirror of _taxonomy.json — single source of truth lives in _taxonomy.json
typography_mood: <string>
key_effect: <string>
---
```

## Required sections

Every niche file MUST have these sections, in this order:

1. `## Do` — 5-8 things every site in this niche should include
2. `## Never` — 4-6 things banned beyond the universal `_antipatterns.md`
3. `## Typography mood` — paragraph describing the aesthetic register
4. `## Key effect` — the one visual move that signals "this niche done right"
5. `## Copy patterns` — 5-10 reusable headline/CTA stems specific to the niche
6. `## CTA patterns` — 3-5 action-verb specific button labels
7. `## Anti-patterns (niche-specific)` — beyond the universal banned list
8. `## A2P sample-message variants` — 2-3 SMS message templates for this niche, used by carrier registration
9. `## Reference token affinity` — which seed style(s) typically pair well with this niche

## Token budget

Each file must stay under **3,000 tokens** in the composed Claude system
prompt. `scripts/validate-schema.mjs` counts and fails the release if any
file exceeds.

## File list (v1)

- [`lounge.md`](./lounge.md) — Bronx Havana Room, Five Bucks Drinkery
- [`restaurant-bar.md`](./restaurant-bar.md) — Bronx Havana Cafe
- [`mobile-food-truck.md`](./mobile-food-truck.md) — Travelin' Tom's Coffee
- [`appliance-retail.md`](./appliance-retail.md) — The Appliance Plug
- [`agency-b2b.md`](./agency-b2b.md) — Flying Goat Agency itself
- [`med-spa-aesthetic.md`](./med-spa-aesthetic.md)
- [`plumber-hvac.md`](./plumber-hvac.md)
- [`auto-detail-mobile.md`](./auto-detail-mobile.md)
- [`barber-salon.md`](./barber-salon.md)

Plus:

- [`_antipatterns.md`](./_antipatterns.md) — universal banned moves (always
  composed into the prompt)
- [`_taxonomy.json`](./_taxonomy.json) — matcher table, SHARED with
  `harvest-niche-playbooks.ts` in fga-ai-demo (edit both in lockstep)

## Promotion path

When a one-off site uses a rule that works, the operator marks it
`promote: true` on the brand-kit panel. On the next skill release, the rule
is lifted into the niche `.md`. Branden/Spencer review monthly.

## Status (Phase 1)

All niche files in this directory are **stubs** for Phase 1. Their content
is filled in **Phase 4** (estimated 16h, mostly writing). Phase 1 ships the
structure so Phases 2/3 can build against a stable substrate.
