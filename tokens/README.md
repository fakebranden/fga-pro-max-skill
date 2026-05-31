# Design Tokens

Refero.design-style named token palettes. Each seed file is a complete
design system (colors + typography + spacing + radii) extracted from a
world-class reference site OR FGA's own brand kit.

## Resolution order

When a brand kit requests a reference style, the skill resolves in this order:

1. **Named seed** — if the kit specifies `reference_style: "stripe"`, load
   `seeds/stripe.json` (pre-shipped, validated).
2. **URL extraction** — if the kit specifies `reference_style_url:
   "https://any.url"`, run `scripts/extract-tokens.mjs` against it via
   Playwright. Cache the result under `seeds/_cache/<url-hash>.json`.
3. **FGA canonical fallback** — `fga-canonical.json` (this directory).

## Pre-shipped seeds (8 total)

### SaaS / tech (5)

- [`seeds/stripe.json`](./seeds/stripe.json) — clean SaaS, gradient depth, narrow type
- [`seeds/apple.json`](./seeds/apple.json) — premium product, minimal type, generous space
- [`seeds/elevenlabs.json`](./seeds/elevenlabs.json) — audio creative, deep contrast, glow accents
- [`seeds/resend.json`](./seeds/resend.json) — dev tools, monospace accents, sharp grid
- [`seeds/linear.json`](./seeds/linear.json) — productivity, dark-first, geometric type

### Hospitality (3)

- [`seeds/sweetgreen.json`](./seeds/sweetgreen.json) — fast-casual food, warm earth + bright accent
- [`seeds/blue-bottle-coffee.json`](./seeds/blue-bottle-coffee.json) — craft coffee, navy + cream + minimal
- [`seeds/eleven-madison-park.json`](./seeds/eleven-madison-park.json) — fine dining, editorial typography, restraint

## Token naming convention

Adjective-noun pairs, semantic intent encoded in the name:

- `--color-{quality}-{role}` — `--color-jet-anchor`, `--color-paper-base`
- `--color-{material}-{role}` — `--color-graphite-body`, `--color-shadow-surface`
- `--color-{intensity}-{role}` — `--color-electric-canary`, `--color-blaze-alt`

Operators see `--color-electric-canary` in the generated CSS, not `#f6eb1e`.
The intent ("signature high-energy yellow") is encoded in the name. Claude
references intent in its prompts, not raw hex.

## Schema

Every token JSON must conform to `tokens.schema.json` (Phase 3 ships this
schema). Required top-level fields:

- `id` — slug (must match filename without extension)
- `name` — display name
- `description` — 1-2 sentence explanation
- `source` — URL or "manual-seed"
- `extractedAt` — ISO date
- `extractionMethod` — `manual-seed | playwright-scrape | refero-extract`
- `tokens.colors{}` — at least 5 colors, each with `value` + `role` +
  `context`
- `tokens.typography{}` — at least 1 display + 1 body font
- `tokens.spacing{}` — at least 3 step values
- `antiPatterns[]` — at least 1 banned use of these tokens

`scripts/validate-schema.mjs` enforces.

## Status (Phase 1)

- `fga-canonical.json` — **shipped** (real values from the FGA brand kit)
- `seeds/*.json` — **stubs** (filled in Phase 3, task #67)
- `tokens.schema.json` — **deferred to Phase 3** (schema ships with the
  extractor)

## Anti-patterns

- ❌ Never use `@latest` URLs in `source` — pin to commit/snapshot.
- ❌ Never copy a competitor's *exact* palette wholesale — extract the
  *system* (relationships, naming, hierarchy), substitute brand-appropriate
  hex.
- ❌ Never ship a seed without an `antiPatterns` array — the rules are as
  important as the values.
