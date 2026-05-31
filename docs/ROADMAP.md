# Roadmap

8 phases. Operator-gated, no auto-advance.

## Phase 1 — Scaffolding ✅ SHIPPED v0.1.0 (2026-05-31)

**Goal:** Skill repo exists, activates in Claude Code, all substrate
directories are scaffolded with schemas + stubs.

- [x] `fakebranden/fga-pro-max-skill` GitHub repo (public)
- [x] `skill.json` + `.claude/skills/fga-pro-max/SKILL.md` activation
- [x] `reasoning/` — 9 niche stubs + `_taxonomy.json` + `_antipatterns.md`
- [x] `tokens/` — `fga-canonical.json` + 8 seed stubs + README
- [x] `recipes/sections.json` placeholder
- [x] `registry/manifest.json` catalog (pinning deferred to Phase 2)
- [x] Release pipeline (`.github/workflows/release.yml`)
- [x] Schema validation script
- [x] Contributor docs (CLAUDE.md, ARCHITECTURE.md, this file)

**Effort:** 6h. **Critical path:** ✅ on time.

---

## Phase 2 — Component substrate ✅ SHIPPED v0.2.0 — task #66

**Goal:** Pin all 7 libraries by SHA + license, build the install script,
seed the per-section recipe table.

- [x] `registry/manifest.json` — pinned commit SHAs for all 7 libraries
- [x] License audit complete for `watermelon` and `styleui` (Phase 2
      exit-blocker)
- [x] `recipes/sections.json` — per-section default + fallback resolved
- [x] `fga-marketing-template/scripts/install-registry-deps.mjs` — reads
      recipe table, runs shadcn add commands, idempotent
- [x] Weekly upstream-diff cron → PR
- [x] Conflict resolution rules in `recipes/README.md`

**Effort:** 8h. **Depends on:** Phase 1.

---

## Phase 3 — Design taste layer ✅ SHIPPED v0.2.0 — task #67

**Goal:** Build the refero-style token extractor, fill all 8 seed JSONs
with real values, wire brand-kit `reference_style_url` field.

- [x] `scripts/extract-tokens.mjs` — Playwright extraction + HSL→named
      adjective heuristic
- [x] Fill `tokens/seeds/*.json` for all 8 references with real values
- [x] `tokens.schema.json` — JSON schema + validator integration
- [ ] Brand kit schema extension in `fga-ai-demo` —
      `reference_style_url?: string` + `tokens?: TokenSet`
- [x] Pipeline: kit → tokens → CSS vars + prompt context

**Effort:** 10h. **Depends on:** Phase 1. **Parallel-OK with Phases 2, 4.**

---

## Phase 4 — Niche reasoning rules ✅ SHIPPED v0.2.0 — task #68

**Goal:** Fill all 9 niche `.md` files with real content. The biggest
single-phase effort, mostly writing.

- [x] `lounge.md` — Bronx Havana Room + Five Bucks reference
- [x] `restaurant-bar.md` — Bronx Havana Cafe reference
- [x] `mobile-food-truck.md` — Travelin' Tom's reference
- [x] `appliance-retail.md` — Appliance Plug reference
- [x] `agency-b2b.md` — FGA self-reference
- [x] `med-spa-aesthetic.md`
- [x] `plumber-hvac.md`
- [x] `auto-detail-mobile.md`
- [x] `barber-salon.md`
- [x] `_PROMOTE.md` — one-off rule promotion path (underscore prefix per validator skip-convention)
- [ ] Operator review pass on Bronx Havana Room regeneration (≥4/5
      fidelity score)

**Effort:** 16h. **Depends on:** Phase 1. **Parallel-OK with Phases 2, 3.**

---

## Phase 5 — Pipeline integration — task #69

**Goal:** Skill plugs into both editor flow + new Generate-Site button
cold-start flow. End-to-end button-press → 30 min → live Vercel URL.

- [ ] `useSkill` flag added to `ai-edit/route.ts` (defaults OFF for 48h)
- [ ] `/api/employee-hub/marketing-site/generate` + `[slug]` routes
- [ ] `src/lib/marketing-site-store.ts` (Redis backing)
- [ ] `WF-MARKETING-SITE-GEN` n8n workflow (clone of WF-CLIENT-SITE-GEN)
- [ ] `fga-marketing-template` repo seeded from Travelin' Tom's
- [ ] `generate-marketing.yml` GH Actions workflow
- [ ] `scripts/generate-pages.mjs` — Agent SDK driver

**Effort:** 24h. **Depends on:** Phases 1+2+3+4.

---

## Phase 6 — GHL + A2P + Vercel hardening — task #70

**Goal:** Build-blocking enforcement of compliance contracts. Vercel
provisioning automated end-to-end.

- [ ] `scripts/enforce-a2p.mjs` — build-blocking checker
- [ ] GHL pre-flight (location + tags + A2P brand/campaign verification)
- [ ] `scripts/provision-vercel-project.mjs` — SSO off + git-link + alias
- [ ] Optional custom-domain wiring + DNS instruction emission

**Effort:** 10h. **Depends on:** Phase 5.

---

## Phase 7 — Showcase + measurement — task #71

**Goal:** 5 demo sites shipped via the new pipeline. Metrics surfaced.

- [ ] Five Bucks Drinkery — lounge
- [ ] Bronx Havana Room — lounge (proves repeatability)
- [ ] Bronx Havana Cafe — restaurant-bar
- [ ] Appliance Plug — appliance-retail (non-hospitality)
- [ ] `tampa-mobile-detail` stub — net-new niche proof
- [ ] `/showcase?niche=` grouping tab
- [ ] Metrics: time-to-ship + fidelity score + 30-day conversion delta
- [ ] Auto-write ShowcaseSite queue + operator promotion

**Effort:** 14h. **Depends on:** Phase 6.

---

## Phase 8 — Content format (multi-part reel series) — task #72

**Goal:** FGA's social play — multi-part tutorial reels in the
nextlevelbuilder format.

- [ ] `harvest-recipes.ts` — `fga-pro-max-tip-series` recipe
- [ ] `harvest-style-presets.ts` — `Design · FGA Pro Max Tip Reel` preset
- [ ] 3 seed series produced:
  - "5 component libraries every site builder should know" (p1–5)
  - "5 GHL workflows every plumber needs" (p1–5)
  - "5 things every lounge website gets wrong" (p1–5)

**Effort:** 8h. **Depends on:** Phase 4 (consumes niche rules).
**Parallel-OK with Phases 5, 6, 7.**

---

## Critical path

```
Phase 1 (6h, DONE)
    │
    ├── Phase 2 (8h)  ─┐
    ├── Phase 3 (10h) ─┤  ← parallel
    └── Phase 4 (16h) ─┤
                       ▼
              Phase 5 (24h)
                       ▼
              Phase 6 (10h)
                       ▼
              Phase 7 (14h)
                       │
                       └─→ Phase 8 (8h)
```

**Critical path total:** 6 + 16 + 24 + 10 + 14 = **70h parallel.**
**Solo sequential total:** 6 + 8 + 10 + 16 + 24 + 10 + 14 + 8 = **96h.**

## Sign-off

Each phase exit requires:

1. All deliverables checked off above
2. Success criteria from task description satisfied
3. Vault memory updated (`project_fga_pro_max_skill`)
4. Effort tracked for re-calibration
5. Operator green-light on the next phase
