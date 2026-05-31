---
version: 0.1.0
name: fga-pro-max
description: |
  Generate or edit FGA-quality marketing sites for managed-service clients.
  Auto-activates on prompts about: marketing sites, landing pages, client sites,
  brand kits, niche-specific site generation, "build a site for a {niche}",
  refero-style design tokens, or any work originating from FGA's employee-hub
  /sites or /harvest/clients UIs. Specializes in 9 niches (lounge, restaurant-bar,
  mobile-food-truck, appliance-retail, agency-b2b, med-spa-aesthetic,
  plumber-hvac, auto-detail-mobile, barber-salon). Wires GHL CRM, A2P SMS
  compliance, lead routing, SEO+AEO baseline, and the shadcn-registry component
  substrate (cult-ui + aceternity by default; skiper-ui / watermelon /
  styleui.dev / componentry / dotmatrix on demand). Pre-shipped reference
  design tokens for Stripe, Apple, ElevenLabs, Resend, Linear, Sweetgreen,
  Blue Bottle Coffee, Eleven Madison Park — operator picks "design like X"
  without supplying a URL. NOT for: proposal sites (use the legacy
  fga-client-template flow), generic UI work (use ui-ux-pro-max), or
  non-FGA-niche builds.
argument-hint: "<niche> [--reference-style <url-or-seed>] [--brand-kit <slug>]"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# FGA Pro Max

The site-generation taste layer for Flying Goat Agency. Run from inside the
fga-marketing-template repo (or the editor pipeline) to compose a niche-tuned,
brand-kit-locked, GHL+A2P-wired marketing site.

## What this skill owns

Three substrates, one shared registry surface:

1. **Component substrate** — `registry/manifest.json` declares which shadcn-
   registry libraries are installed. Default bundle = `cult-ui` (marketing
   blocks) + `aceternity` (animated set pieces). On-demand = `skiper-ui`,
   `watermelon`, `styleui.dev`, `componentry`, `dotmatrix`.
2. **Design taste substrate** — `tokens/seeds/*.json` ship 8 pre-extracted
   reference token sets (named palettes with semantic intent, refero.design-
   style). Brand kit picks one OR supplies a `reference_style_url` for live
   extraction. Fallback: `tokens/fga-canonical.json` (FGA's own brand kit).
3. **Reasoning substrate** — `reasoning/<niche>.md` files. Per-niche do/never/
   typography mood/key effect/copy patterns/CTA patterns/anti-patterns/A2P
   sample-message variants. 9 niches in v1, hard cap.

## How to use

Generation mode (cold-start a site):

```
fga-pro-max generate \
  --niche lounge \
  --brand-kit bronx-havana-room \
  --reference-style sweetgreen
```

The skill:
1. Resolves the niche via `reasoning/_taxonomy.json` matcher
2. Loads `reasoning/<niche>.md` (do/never/typography/effect/copy/CTA)
3. Resolves the reference style — seed JSON if name, scrape via
   Playwright if URL, FGA-canonical if neither
4. Emits `tokens.css` + a tokens-context block
5. Reads `recipes/sections.json` to pick which library wins per section
6. Composes the Claude system prompt = tokens + reasoning + recipe + the
   SEO+AEO baseline contract + the A2P enforcement rules
7. Runs the Agent SDK against the template repo
8. Pre-commit checker `scripts/enforce-a2p.mjs` fails the build if any
   `<input type="tel">` lacks the `<SmsConsent />` block

Edit mode (in-place via the existing AI site editor):

The editor pipeline at `/api/employee-hub/sites/[slug]/ai-edit` injects the
skill block (tokens + reasoning + recipe context) ahead of the file tree in
`planEdit` and `generateEdits` system prompts. The skill is prompt-layer
only — never touches commit/publish/undo.

## Hard rules (build-blocking)

- **A2P enforcement** — every phone-collecting form MUST co-render
  `<SmsConsent />` and POST to `/api/book` (audit-trail). `scripts/enforce-
  a2p.mjs` greps the generated tree pre-commit and fails on violations. No
  override flag.
- **AEO baseline** — `seo.ts` + `sitemap.ts` + `robots.ts` + `llms.txt` +
  `llms-full.txt` + JSON-LD entity graph (Organization + LocalBusiness w/
  niche subtype + WebSite) + FAQPage on home. The skill enforces this
  contract; never lets Claude skip it.
- **Vendored ownership** — FAQ section + booking form MUST be vendored,
  never delegated to an external library. AEO and A2P churn risk is too
  high.
- **Token budget** — tokens ≤2k tokens, reasoning ≤3k, recipe ≤1k in the
  Claude system prompt. The skill pre-trims; if a niche file exceeds, fail
  loudly.

## Niches in v1 (hard cap 9)

| Niche slug | Matcher keywords |
|---|---|
| `lounge` | lounge, hookah, cigar lounge, vip lounge |
| `restaurant-bar` | restaurant, bar, gastropub, brewpub, tavern |
| `mobile-food-truck` | food truck, coffee truck, drink truck, mobile vendor |
| `appliance-retail` | appliance, home goods, white-goods, retail store |
| `agency-b2b` | agency, marketing agency, b2b services, consultancy |
| `med-spa-aesthetic` | med spa, aesthetic clinic, botox, dermatology |
| `plumber-hvac` | plumber, hvac, ac repair, drain cleaning |
| `auto-detail-mobile` | mobile detailing, car wash, ceramic coating |
| `barber-salon` | barber, salon, hair, beauty bar |

Adding a 10th niche requires deleting or merging one existing — per the
no-rule-proliferation principle.

## Reference style seeds (8 pre-shipped + dynamic + fallback)

**SaaS/tech:** stripe, apple, elevenlabs, resend, linear
**Hospitality:** sweetgreen, blue-bottle-coffee, eleven-madison-park
**Dynamic:** `--reference-style https://any.url` → Playwright extraction
**Fallback:** `fga-canonical` (jet-anchor / paper-base / electric-canary /
graphite-body / blaze-alt / shadow-surface / divider-soft)

## Bootstrap

If this is the first run in this environment:

```bash
# Verify Node 20+ is installed
node --version
# Install CI CLI globally (optional — for headless GH Actions use)
npm install -g @fga/fga-pro-max-cli
# Verify
fga-pro-max --version
```

## Related FGA projects

- `fakebranden/fga-marketing-template` — the destination template
- `fakebranden/fga-ai-demo` — the hub at gisele.flyinggoatagency.com
  (employee-hub UI + AI site editor)
- `fakebranden/fga-client-template` — legacy proposal-site flow (NOT this
  skill's target — keep separate)
- n8n `WF-MARKETING-SITE-GEN` — the orchestrator for cold-start builds

## See also

- `docs/ARCHITECTURE.md` — the 3-substrate model in depth
- `docs/ROADMAP.md` — 8-phase plan + current phase status
- `CLAUDE.md` — contributor guide

## License

MIT. Operator curation is the moat; the substrate is open source.
