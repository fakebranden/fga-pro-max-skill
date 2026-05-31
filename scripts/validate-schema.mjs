#!/usr/bin/env node
/**
 * validate-schema.mjs — release-gate JSON + markdown schema check
 *
 * Run before every git tag. Fails with non-zero exit code on any:
 *  - Malformed JSON
 *  - Missing required field in skill.json / token JSONs / recipes / registry
 *  - Niche markdown missing a required section
 *  - Token budget exceeded (per docs/ARCHITECTURE.md)
 *  - Taxonomy entry without a corresponding reasoning/<slug>.md file
 *
 * Phase 1: ships the validator skeleton + the checks that apply to v0.1.0
 * scaffolding. Stub files explicitly opt out of the value-filled checks
 * via the `"status": "stub"` flag — those will be enforced once Phases
 * 2/3/4 fill them in.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch (e) {
    err(`Malformed JSON in ${path}: ${e.message}`);
    return null;
  }
}

// ─── skill.json ───────────────────────────────────────────────────────
const skillJson = readJson(join(ROOT, "skill.json"));
if (skillJson) {
  for (const k of ["name", "version", "skill"]) {
    if (!skillJson[k]) err(`skill.json missing required field: ${k}`);
  }
  if (skillJson.name !== "fga-pro-max") {
    err(`skill.json.name must be "fga-pro-max", got "${skillJson.name}"`);
  }
  if (skillJson.skill?.entryPoint !== ".claude/skills/fga-pro-max/SKILL.md") {
    err(`skill.json.skill.entryPoint mismatch`);
  }
  if (!existsSync(join(ROOT, skillJson.skill?.entryPoint || ""))) {
    err(`skill.json.skill.entryPoint file missing on disk`);
  }
}

// ─── version.json ─────────────────────────────────────────────────────
const versionJson = readJson(join(ROOT, "version.json"));
if (versionJson) {
  if (versionJson.version !== skillJson?.version) {
    err(`version.json (${versionJson.version}) != skill.json (${skillJson?.version})`);
  }
  if (typeof versionJson.phase !== "number") {
    err(`version.json missing numeric phase`);
  }
}

// ─── reasoning/_taxonomy.json ─────────────────────────────────────────
const taxonomy = readJson(join(ROOT, "reasoning/_taxonomy.json"));
if (taxonomy?.niches) {
  if (taxonomy.niches.length !== 9) {
    err(`taxonomy must have exactly 9 niches (hard cap), got ${taxonomy.niches.length}`);
  }
  // Every taxonomy slug must have a reasoning/<slug>.md
  for (const n of taxonomy.niches) {
    const expected = join(ROOT, "reasoning", `${n.slug}.md`);
    if (!existsSync(expected)) {
      err(`taxonomy slug "${n.slug}" has no reasoning/${n.slug}.md file`);
    }
    for (const k of ["slug", "matches", "localBusinessSubtype"]) {
      if (!n[k]) err(`taxonomy niche entry missing ${k}: ${JSON.stringify(n)}`);
    }
  }
}

// ─── reasoning/<niche>.md required sections (stubs OK in Phase 1) ─────
const REQUIRED_SECTIONS = [
  "## Do",
  "## Never",
  "## Typography mood",
  "## Key effect",
  "## Copy patterns",
  "## CTA patterns",
  "## Anti-patterns",
  "## A2P sample-message variants",
  "## Reference token affinity",
];
const reasoningDir = join(ROOT, "reasoning");
for (const f of readdirSync(reasoningDir)) {
  if (!f.endsWith(".md")) continue;
  if (f.startsWith("_") || f === "README.md") continue;
  const content = readFileSync(join(reasoningDir, f), "utf-8");
  for (const section of REQUIRED_SECTIONS) {
    if (!content.includes(section)) {
      err(`reasoning/${f} missing required section: ${section}`);
    }
  }
  // YAML frontmatter sanity
  if (!content.startsWith("---")) {
    err(`reasoning/${f} missing YAML frontmatter`);
  }
}

// ─── tokens/fga-canonical.json + seeds ────────────────────────────────
const canonical = readJson(join(ROOT, "tokens/fga-canonical.json"));
if (canonical) {
  for (const k of ["id", "name", "tokens", "antiPatterns"]) {
    if (!canonical[k]) err(`tokens/fga-canonical.json missing ${k}`);
  }
  if (canonical.id !== "fga-canonical") {
    err(`tokens/fga-canonical.json id mismatch`);
  }
}

const seedsDir = join(ROOT, "tokens/seeds");
const EXPECTED_SEEDS = [
  "stripe", "apple", "elevenlabs", "resend", "linear",
  "sweetgreen", "blue-bottle-coffee", "eleven-madison-park",
];
for (const id of EXPECTED_SEEDS) {
  const path = join(seedsDir, `${id}.json`);
  if (!existsSync(path)) {
    err(`tokens/seeds/${id}.json missing`);
    continue;
  }
  const seed = readJson(path);
  if (seed?.id !== id) err(`tokens/seeds/${id}.json id mismatch`);
  // Phase 1: stubs are OK; Phase 3 onward must have real tokens
  if (seed?.status !== "stub" && Object.keys(seed?.tokens?.colors || {}).length < 5) {
    err(`tokens/seeds/${id}.json must have at least 5 colors (non-stub)`);
  }
}

// ─── recipes/sections.json ────────────────────────────────────────────
const recipes = readJson(join(ROOT, "recipes/sections.json"));
if (recipes) {
  if (!recipes.sections) err(`recipes/sections.json missing sections{}`);
  const vendored = ["hero-video", "faq", "booking-form"];
  for (const v of vendored) {
    if (recipes.sections[v]?.default !== `vendored:${v.replace("faq", "faq-accordion")}` &&
        recipes.sections[v]?.default !== `vendored:${v}`) {
      warn(`recipes/sections.json: ${v} should be vendored — currently "${recipes.sections[v]?.default}"`);
    }
  }
}

// ─── registry/manifest.json ───────────────────────────────────────────
const registry = readJson(join(ROOT, "registry/manifest.json"));
if (registry) {
  const REQUIRED_LIBS = [
    "cult-ui", "aceternity", "skiper-ui", "watermelon",
    "styleui", "componentry", "dotmatrix",
  ];
  for (const lib of REQUIRED_LIBS) {
    if (!registry.libraries?.[lib]) {
      err(`registry/manifest.json missing library: ${lib}`);
    }
  }
}

// ─── Report ──────────────────────────────────────────────────────────
console.log(`\nFGA Pro Max — schema validation\n${"─".repeat(40)}`);
console.log(`Skill: ${skillJson?.name || "?"} v${skillJson?.version || "?"}`);
console.log(`Phase: ${versionJson?.phase || "?"} (${versionJson?.phaseName || "?"})`);
console.log(`Errors:   ${errors.length}`);
console.log(`Warnings: ${warnings.length}\n`);

for (const w of warnings) console.log(`⚠ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);

if (errors.length > 0) {
  console.error(`\n✖ Schema validation FAILED — fix ${errors.length} error(s) before release.`);
  process.exit(1);
}

console.log(`✓ Schema validation passed.`);
