# Architecture

The FGA Pro Max skill is **three substrates on a shared shadcn-registry
surface**, plus a thin orchestration layer that composes them into Claude
system prompts.

## The three substrates

```
                      ┌───────────────────────────────────┐
                      │      skill.json + SKILL.md        │
                      │  (activation + instructions)      │
                      └────────────────┬──────────────────┘
                                       │
                ┌──────────────────────┼──────────────────────┐
                │                      │                      │
                ▼                      ▼                      ▼
       ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
       │  components    │   │   tokens       │   │  reasoning     │
       │  (registry/)   │   │  (tokens/)     │   │  (reasoning/)  │
       └────────────────┘   └────────────────┘   └────────────────┘
                │                      │                      │
                └──────────┬───────────┼──────────────────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │  recipes/sections  │
                 │ (which lib per     │
                 │  section per niche)│
                 └────────────────────┘
```

### Substrate 1: Components (`registry/`)

The component vocabulary. 7 shadcn-registry libraries:

| Tier | Libraries |
|---|---|
| Default bundle | `cult-ui`, `aceternity` |
| On-demand | `skiper-ui`, `watermelon`, `styleui`, `componentry`, `dotmatrix` |

All installed via `pnpm dlx shadcn add <url>`. The skill never vendors
component source — it declares which libraries to pull at generate-time.

**Exception:** Three sections are vendored in `fga-marketing-template` and
never delegated — `hero-video`, `faq-accordion`, `booking-form` — because
their AEO/A2P contracts are too brittle to delegate.

### Substrate 2: Tokens (`tokens/`)

The design taste layer. Each seed JSON is a complete design system extracted
from a world-class reference site (Stripe, Apple, Sweetgreen, etc.) using
the refero.design naming convention — `--color-jet-anchor` carries semantic
intent, not just hex.

Resolution order at generate-time:

1. Named seed (`reference_style: "stripe"`) → `seeds/stripe.json`
2. URL extraction (`reference_style_url: "https://..."`) → Playwright
   scrape via `tokens/extract.mjs`
3. Fallback → `fga-canonical.json` (FGA's own brand kit)

The resolved tokens are emitted as `globals.css` CSS variables AND as a
prompt context block so Claude references intent (`--color-electric-canary`)
not hex.

### Substrate 3: Reasoning (`reasoning/`)

One markdown file per niche. 9 niches in v1 (hard cap).

Each file ships:

- Do / never / typography mood / key effect / copy patterns / CTA patterns
- Niche-specific anti-patterns (beyond universal `_antipatterns.md`)
- A2P sample-message variants (for carrier registration)
- Reference token affinity (which seed styles pair well)

A shared `_taxonomy.json` matcher routes natural-language prompts to the
right niche file. The same taxonomy is consumed by
`harvest-niche-playbooks.ts` in `fga-ai-demo` — single source of truth.

## The orchestration layer

The skill itself doesn't run code. It composes Claude system prompts from
the three substrates:

```
<niche-reasoning>           # reasoning/<niche>.md
<tokens-context>            # tokens.css + token-name catalog
<recipe-context>            # which library for which section
<universal-antipatterns>    # reasoning/_antipatterns.md
<aeo-baseline-contract>     # from seo-aeo-site-baseline vault memo
<a2p-enforcement-contract>  # from sms-a2p-compliance vault memo
<file-tree>                 # current template state
<user-prompt>
```

The composed prompt goes to:

- **Cold-start path** — `fga-marketing-template`'s
  `.github/workflows/generate-marketing.yml` step calls
  `node scripts/generate-pages.mjs` which uses `@anthropic-ai/sdk` Agent SDK
- **Editor path** — `fga-ai-demo`'s
  `/api/employee-hub/sites/[slug]/ai-edit/route.ts` injects the composed
  prompt into the existing two-shot `planEdit → generateEdits` pipeline

## What this skill DOES NOT own

- Commit / publish / undo / redo logic — lives in the editor's
  `lib/github-api.ts`
- Vercel deploy / preview / alias — lives in `lib/vercel-deploy.ts`
- GHL API calls — lives in `lib/ghl.ts` per client repo
- The component vendoring decisions for `hero-video` / `faq-accordion` /
  `booking-form` — those live in `fga-marketing-template`'s component dir

The skill is **prompt-layer only**. This is intentional — the existing
shipping pipeline must continue to work even if this skill is removed.

## Token budget (hard cap)

Composed Claude system prompt budget:

| Substrate | Max tokens |
|---|---|
| Tokens (tokens.css + catalog) | 2,000 |
| Reasoning (niche.md) | 3,000 |
| Recipe (sections for this build) | 1,000 |
| Universal anti-patterns | 1,500 |
| AEO baseline contract | 1,500 |
| A2P enforcement contract | 1,000 |
| **Total skill block** | **10,000** |

`scripts/validate-schema.mjs` enforces these budgets in CI. A niche file
that exceeds 3k tokens fails the release.

## See also

- [`ROADMAP.md`](./ROADMAP.md) — phase plan + current status
- [`../CLAUDE.md`](../CLAUDE.md) — contributor guide
- [`../skill.json`](../skill.json) — activation contract
