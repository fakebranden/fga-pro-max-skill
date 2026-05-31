# shadcn-Registry Dependency Manifest

The component substrate. Seven libraries — 2 default-bundled + 5 on-demand —
all installed via the shadcn registry CLI.

## Tier 1: Default bundle (always installed)

- **cult-ui** — Marketing UI blocks. The marketing-template's primary
  section vocabulary.
- **aceternity** — Animated set pieces. The motion layer.

## Tier 2: On-demand (per-recipe opt-in)

- **skiper-ui** — Uncommon components (smoke hero, KAINT-style displays)
- **watermelon** — Production-ready set (adaptive sliders, card swipe)
- **styleui** — Whole-section templates (Notio, Axis)
- **componentry** — Free interaction effects (magnet lines, scroll velocity)
- **dotmatrix** — Loaders for AI-processing states

## Install mechanism

Every library publishes a JSON manifest. One CLI command installs the
component + adds the import + drops the source into `components/ui/`:

```bash
pnpm dlx shadcn@latest add https://<library>/r/<component>.json
```

`scripts/install-registry-deps.mjs` (Phase 2) reads `sections.json` recipes
for the chosen niche, runs the install commands, commits the result. Runs
in `fga-marketing-template/.github/workflows/generate-marketing.yml` BEFORE
the Claude generation step.

## Pinning

**NEVER use `@latest` in CI.** Every library is pinned to a commit SHA:

```json
"cult-ui": {
  "pinnedSha": "a1b2c3d4...",
  "lastVerified": "2026-05-31"
}
```

A weekly cron diffs upstream → opens a PR for review. Operator approves the
SHA bump before it merges.

## License audit (Phase 2 exit gate)

`watermelon` and `styleui` have license fields marked
`TBD-phase-2-audit-BLOCKER`. Phase 2 cannot exit until both are confirmed
as MIT or equivalent permissive.

If either is not MIT-compatible:
- **Option A** — drop the library from the manifest.
- **Option B** — reach out to the maintainer for an FGA-specific license.
- **Option C** — vendor only the specific components we want, attributing
  in `LICENSES.md`.

Block the Phase 2 release on either MIT confirmation or operator override.

## Status (Phase 1)

All `pinnedSha` values are `phase2:tbd`. Phase 1 ships the schema + catalog
only.
