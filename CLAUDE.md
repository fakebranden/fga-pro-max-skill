# FGA Pro Max — Contributor Guide

You are working on the **FGA Pro Max skill** — a Claude Code skill that owns
the site-generation taste layer for Flying Goat Agency.

## What this repo is

This is a **content + config** repo, not an application. The deliverable is
the SKILL.md, the manifest files, the reasoning rules, and the token JSONs.
No runtime code in this repo — execution happens in the consumer
(`fga-marketing-template`, the AI site editor, or the headless CLI).

## Hard rules

1. **Never break the SKILL.md activation contract.** The YAML frontmatter
   (`name`, `description`, `argument-hint`, `allowed-tools`) is the public
   API. Changes are semver-breaking.
2. **9 niche hard cap** — adding a 10th niche requires deleting or merging
   an existing one. Per the operator's no-rule-proliferation rule.
3. **Token budget** — tokens ≤2k, reasoning ≤3k, recipe ≤1k in the composed
   Claude system prompt. The skill pre-trims; if a niche file exceeds, ship
   a tighter version or fail loudly.
4. **Vendored ownership** — FAQ section + booking form NEVER delegated to an
   external library. Document this in every new recipe/reasoning rule that
   touches those sections.
5. **A2P + AEO contracts** — every generated site inherits these. The skill
   enforces; never lets Claude skip.
6. **Schema validation gates releases.** `scripts/validate-schema.mjs` runs
   in CI and blocks the release on any malformed JSON / missing required
   field / out-of-budget token count.

## File-level responsibilities

| Path | Owner | Notes |
|---|---|---|
| `.claude/skills/fga-pro-max/SKILL.md` | Skill maintainer | YAML frontmatter is the activation contract |
| `skill.json` | Skill maintainer | Mirror of frontmatter + metadata |
| `version.json` | Release script | Updated on every tag |
| `registry/manifest.json` | Phase 2 maintainer | Pinned SHAs only — never `@latest` |
| `tokens/seeds/*.json` | Phase 3 maintainer | One JSON per reference style |
| `tokens/fga-canonical.json` | Brand kit owner | Mirrors `reference_fga_brand_kit` |
| `reasoning/<niche>.md` | Niche owner (operator) | YAML frontmatter + do/never/typography/etc sections |
| `reasoning/_antipatterns.md` | Skill maintainer | Universal banned moves |
| `reasoning/_taxonomy.json` | Skill maintainer | Shared with harvest pipeline `harvest-niche-playbooks.ts` |
| `recipes/sections.json` | Phase 2 maintainer | Per-section recipe table |
| `scripts/validate-schema.mjs` | Skill maintainer | Release gate |
| `.github/workflows/release.yml` | Skill maintainer | semver-tag-driven |

## Branching + release

- `main` is always green (validation passes).
- Each phase = a release: `v0.1.0` (Phase 1), `v0.2.0` (Phase 2), …
- Tag a phase complete only after operator sign-off (see `docs/ROADMAP.md`).
- `git tag v0.X.0 && gh release create v0.X.0` runs validation + publishes.

## Activation testing

To verify the skill activates correctly:

```bash
# Install locally for testing
cp -r .claude/skills/fga-pro-max ~/.claude/skills/

# Verify Claude sees it
claude --list-skills | grep fga-pro-max

# Trigger test
claude "Generate a landing page for a coffee truck called Test Brew"
# → expect: SKILL.md content appears in the system prompt as a sentinel
```

## Cross-references

This skill DOES NOT live in isolation. Always cross-reference:

- `fga-marketing-template` — the destination repo; recipes must match its
  section component names
- `fga-ai-demo` — the AI site editor at
  `/employee-hub/sites/[slug]/editor` (existing pipeline this skill plugs into)
- `harvest-niche-playbooks.ts` in fga-ai-demo — share the taxonomy matcher
  (`reasoning/_taxonomy.json`)
- `harvest-style-presets.ts` in fga-ai-demo — mirror the seed pattern for
  reference tokens
- Vault memory `project_fga_pro_max_skill` — locked v1 spec, phase list

## Operator sign-off process

Each phase exits via operator sign-off, not auto-advance:

1. Maintainer ships deliverables to the repo
2. Maintainer files an issue: "Phase N ready for review"
3. Operator validates success criteria (per ROADMAP)
4. Operator approves → tag the release + close the phase
5. Operator opens the next phase task in the FGA task tracker

Skipping this gate is a hard rule break.
