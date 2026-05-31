# Recipes

Per-section recipe tables — which component library wins for which section.
Phase 1 ships the schema only; Phase 2 (task #66) fills in the actual
recipes.

## Section vocabulary

Standard section identifiers used across the entire FGA marketing-template
ecosystem. Adding a new section type requires updating:

1. `sections.json` (this directory) — pick default + fallback library
2. `fga-marketing-template/components/sections/<name>.tsx` — vendored version
3. The reasoning rule docs for any niche that uses the section

Standard sections (v1):

- `hero-video` — full-bleed autoplay video, overlay text, primary CTA
- `hero-animated` — non-video hero with motion (Framer Motion / CSS)
- `features-grid` — 2-4 column feature cards w/ icons
- `testimonials` — quote cards or marquee carousel
- `faq` — `<details>/<summary>` collapsible, JSON-LD coupled
- `section-template` — whole-section blocks from styleui.dev or equivalent
- `loader` — page-load / form-submit loading states
- `booking-form` — phone+email+date form w/ SmsConsent + GHL POST

## Conflict resolution

When two libraries name the same component, the recipe table wins. When the
recipe table doesn't specify (rare), apply lexicographic library order:

`aceternity < componentry < cult-ui < dotmatrix < skiper-ui < styleui < watermelon`

The earlier-named library wins.

## Vendored-must-own

Three sections are **vendored** and never delegated:

| Section | Reason | Where |
|---|---|---|
| `hero-video` | Full LCP control + autoplay+muted+playsInline guarantees | `fga-marketing-template/components/sections/hero-video.tsx` |
| `faq` | AEO-critical — JSON-LD must couple with visible Q&A | `fga-marketing-template/components/sections/faq-accordion.tsx` |
| `booking-form` | A2P + GHL contract — SmsConsent + audit POST + tag convention | `fga-marketing-template/components/sections/booking-form.tsx` |

Build fails if these are replaced with library versions.

## Status (Phase 1)

`sections.json` ships with **placeholders** for everything that's not
vendored. Phase 2 (task #66) replaces `phase2:tbd` with actual library
references after the registry manifest is locked.

## Conflict resolution table

When the recipe table is silent — two libraries both expose a component
matching the same logical section name and no `default` / `fallback`
entry pins one — apply the **lexicographic library order**. The
earlier-named library wins.

| Rank | Library     | Tier            |
|------|-------------|-----------------|
| 1    | aceternity  | default-bundle  |
| 2    | componentry | on-demand       |
| 3    | cult-ui     | default-bundle  |
| 4    | dotmatrix   | on-demand       |
| 5    | skiper-ui   | on-demand       |
| 6    | styleui     | on-demand       |
| 7    | watermelon  | on-demand       |

Rule of thumb: alphabetical, no exceptions, no override knob. Pinning a
preference belongs in `sections.json` — not in the tiebreaker.

Where this rule fires:

1. Two libraries name the same component (e.g. both `aceternity` and
   `cult-ui` ship `marquee`) AND the recipe is silent.
2. Phase 5 / Phase 6 helper code resolves a free-form Claude prompt to a
   library token without a section context.

Where this rule does NOT fire:

- When the recipe table specifies `default` or `fallback` — the recipe
  wins unconditionally.
- When the section is vendored — `vendored:<name>` always wins, by
  design (see "Vendored-must-own" above).

The lexicographic order is canonical and lives in two places that MUST
stay in sync: this table and
`sections.json` → `conflictResolution.tiebreaker`. Schema validation
enforces the recipe-table version; this README is the human-readable
contract.
