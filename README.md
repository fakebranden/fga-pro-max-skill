# FGA Pro Max

> The site-generation taste layer for **Flying Goat Agency**.
> Niche-tuned. Brand-kit-locked. GHL + A2P + Vercel wired.

[![Version](https://img.shields.io/badge/version-0.1.0-yellow)](./version.json)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![Phase](https://img.shields.io/badge/phase-1%2F8-orange)](./docs/ROADMAP.md)

A Claude Code skill that turns Claude into a senior marketing-site designer
for FGA's managed-service client niches. Auto-activates on prompts about
marketing sites, landing pages, brand kits, or any work originating from the
FGA employee-hub.

## What this is

Three substrates on one shared shadcn-registry surface:

| Substrate | What | Where |
|---|---|---|
| **Components** | shadcn-registry deps per niche/recipe — cult-ui + aceternity default; 5 on-demand | [`registry/`](./registry) |
| **Design tokens** | 8 pre-shipped reference styles + Playwright extraction + FGA-canonical fallback | [`tokens/`](./tokens) |
| **Reasoning rules** | 9 niche `.md` files — do / never / typography mood / key effect / copy / CTA / anti-patterns / A2P variants | [`reasoning/`](./reasoning) |

## Installation

### Quick install (paste into Claude Code)

```
Install this skill: https://github.com/fakebranden/fga-pro-max-skill
```

Claude will fetch the SKILL.md and stage it at `~/.claude/skills/fga-pro-max/`.
Verify with `claude --list-skills`.

### CI / headless install

```bash
npm install -g @fga/fga-pro-max-cli
fga-pro-max --version
```

(Use this path for GitHub Actions in `fga-marketing-template`.)

## Quickstart

```
> Generate a landing page for Bronx Havana Room, design like Sweetgreen
```

The skill auto-activates, resolves `lounge` from the niche taxonomy,
loads `reasoning/lounge.md`, applies the `sweetgreen` design tokens, picks
sections per `recipes/sections.json`, and emits the site to the template.

## Niches (v1, hard cap 9)

`lounge` · `restaurant-bar` · `mobile-food-truck` · `appliance-retail` ·
`agency-b2b` · `med-spa-aesthetic` · `plumber-hvac` · `auto-detail-mobile` ·
`barber-salon`

Adding a 10th requires deleting or merging one existing — per the
no-rule-proliferation principle. See [`reasoning/README.md`](./reasoning).

## Reference styles (8 pre-shipped + dynamic + fallback)

| Category | Seeds |
|---|---|
| SaaS / tech | `stripe`, `apple`, `elevenlabs`, `resend`, `linear` |
| Hospitality | `sweetgreen`, `blue-bottle-coffee`, `eleven-madison-park` |
| Dynamic | `--reference-style https://any.url` → Playwright extraction |
| Fallback | `fga-canonical` (the FGA brand kit itself) |

See [`tokens/seeds/`](./tokens/seeds).

## Hard rules (build-blocking)

- **A2P enforcement** — every `<input type="tel">` MUST co-render
  `<SmsConsent />`. Build fails otherwise.
- **AEO baseline** — `seo.ts`, `sitemap.ts`, `robots.ts`, `llms.txt`,
  `llms-full.txt`, JSON-LD entity graph, FAQPage on home — required on every
  generated site.
- **Vendored ownership** — FAQ section + booking form NEVER delegated to an
  external library. AEO and A2P churn risk is too high.

## Architecture

```
   ┌──────────────────────────────────────────────┐
   │ skill.json (activation + metadata)           │
   └───────────┬──────────────────────────────────┘
               │
   ┌───────────▼──────────────────────────────────┐
   │ .claude/skills/fga-pro-max/SKILL.md          │
   │ (the actual skill instructions Claude reads) │
   └───────────┬──────────────────────────────────┘
               │
       ┌───────┼───────┬───────────┐
       │       │       │           │
       ▼       ▼       ▼           ▼
   registry/ tokens/ reasoning/ recipes/
   (Phase 2) (Phase 3) (Phase 4) (Phase 2)
```

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Roadmap

This is Phase 1 of 8. Each phase has explicit deliverables, success criteria,
and operator sign-off. See [`docs/ROADMAP.md`](./docs/ROADMAP.md).

## Contributing

Internal to FGA in v1. See [`CLAUDE.md`](./CLAUDE.md) for the patch protocol.

## License

[MIT](./LICENSE). Operator curation is the moat; the substrate is open source.

---

**Inspired by [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)** —
this is FGA's specialized fork-spirit for our managed-service niches + GHL/A2P/Vercel stack.
