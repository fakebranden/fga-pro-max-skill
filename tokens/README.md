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

## Token naming dictionary

The canonical adjective-noun pairs every seed JSON (and the
`extract-tokens.mjs` heuristic) must draw from. This is the contract
between the auto-extractor's HSL bucketing and the hand-curated seeds —
contributors should never invent a new noun without adding it here.

### Color naming buckets

| HSL bucket | L | S | Noun pool | Meaning |
|---|---|---|---|---|
| Light neutral | L ≥ 0.95 | S ≤ 0.05 | `paper-base`, `cloud-whisper`, `slate-dust`, `bone-cream`, `cream-base`, `paper-cream` | Primary light surface |
| Dark neutral | L ≤ 0.10 | any | `jet-anchor`, `midnight-void`, `obsidian-deep`, `midnight-ink`, `ink-anchor`, `bottle-anchor`, `emerald-anchor` | Primary dark anchor or signature dark brand color |
| Dark saturated | 0.10 < L < 0.40 | S ≥ 0.30 | `<hue>-anchor` (e.g. `cobalt-anchor`, `emerald-anchor`, `bottle-anchor`) | Brand-signature dark color |
| Bright saturated | L > 0.50 | S > 0.50 | `<hue>-spark` (e.g. `cobalt-spark`, `clover-spark`, `violet-spark`, `electric-canary`, `lagoon-glow`, `amber-spark`) | Signature accent — CTA, key links |
| Mid muted | 0.40 < L < 0.60 | S < 0.30 | `graphite-body`, `slate-body`, `ash-body`, `ink-body` | Body text, secondary copy |
| Light muted | L ≥ 0.60 | S ≥ 0.20 | `<hue>-muted` (e.g. `sage-muted`, `slate-muted`, `azure-link`) | Tertiary accent, link text, low-emphasis tag |
| Divider | L 0.85–0.95 | low | `fog-divider`, `cloud-divider`, `ash-divider`, `divider-soft` | Hairlines, low-emphasis borders |
| Elevated dark | 0.05 < L < 0.20 | low | `shadow-surface` | Second-tier dark surface (card on dark background) |
| Elevated light | 0.92–0.98 | low–med warm | `shadow-surface` (warm tint), `mist-surface` (cool tint) | Alternating light section |

### Hue → adjective map (used by `--color-<hue>-spark` and `<hue>-anchor`)

| Hue degree | Name |
|---|---|
| 0° red | `blaze` |
| 25° orange | `amber` |
| 55° yellow | `canary` |
| 105° green | `clover` |
| 165° cyan | `lagoon` |
| 215° blue | `cobalt` |
| 255° indigo | `indigo` |
| 285° violet | `violet` |
| 325° magenta | `fuchsia` |

### Typography naming

| Slot | Key prefix | Pool |
|---|---|---|
| Display headlines | `--font-display-` | `-anton`, `-sf`, `-sohne`, `-inter`, `-cardo`, `-instrument`, `-serif`, `-grotesk` |
| Body copy | `--font-body-` | `-poppins`, `-sf`, `-inter`, `-grotesk`, `-humanist`, `-sohne` |
| Monospace | `--font-mono-` | `-source`, `-geist`, `-jetbrains` |
| Accent / display secondary | `--font-accent-` | (open — name after the typeface) |

### Spacing + radii

| Slot | Pool |
|---|---|
| Spacing | `--space-tight`, `--space-base`, `--space-loose`, `--space-section` |
| Radii | `--radius-tight`, `--radius-card`, `--radius-pill`, `--radius-hero`, `--radius-product`, `--radius-photo`, `--radius-code-block`, `--radius-modal` |

### Rules

1. **One signature accent per seed.** Multiple `-spark` keys are allowed only if the brand explicitly pairs them (e.g. Stripe gradient: `cobalt-spark` + `lagoon-spark`).
2. **Never invent a noun for a hue already in the map.** If green ≠ `clover-spark`, add a dialect entry in this dictionary first.
3. **Reserved nouns** (`anchor`, `body`, `divider`, `spark`, `surface`, `muted`, `link`, `base`, `whisper`) carry semantic meaning. Don't reuse them for an unrelated role.
4. **The auto-extractor's heuristic is opinionated, not authoritative.** Operators should review `tokens/seeds/_cache/<slug>.json` and rename misclassified entries before promoting to a curated seed.

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
