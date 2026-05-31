#!/usr/bin/env node
/**
 * fga-pro-max CLI (Phase 1 — thin scaffold)
 *
 * Purpose: headless CI use (GitHub Actions in fga-marketing-template).
 * For interactive Claude Code use, install the skill via the GitHub URL
 * paste pattern instead — that path activates the SKILL.md directly.
 *
 * Phase 1 commands:
 *   fga-pro-max --version       — print version, verify install
 *   fga-pro-max validate         — run scripts/validate-schema.mjs
 *
 * Phase 5 will add:
 *   fga-pro-max generate <niche> --brand-kit <slug> [--reference-style <id>]
 *   fga-pro-max install-deps <niche>
 *   fga-pro-max extract-tokens <url>
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PKG = JSON.parse(readFileSync(join(HERE, "..", "package.json"), "utf-8"));

const [, , cmd, ...args] = process.argv;

function help() {
  console.log(`fga-pro-max v${PKG.version} — Phase 1 (scaffold)

Usage:
  fga-pro-max --version        Print version + verify install
  fga-pro-max validate          Run schema validation
  fga-pro-max --help            This message

Phase 5 will add generate / install-deps / extract-tokens commands.

Repo: https://github.com/fakebranden/fga-pro-max-skill
`);
}

switch (cmd) {
  case "--version":
  case "-v":
    console.log(PKG.version);
    process.exit(0);
    break;
  case "validate": {
    const validatePath = join(HERE, "..", "..", "scripts", "validate-schema.mjs");
    const { spawnSync } = await import("node:child_process");
    const r = spawnSync("node", [validatePath], { stdio: "inherit" });
    process.exit(r.status ?? 1);
  }
  case "--help":
  case "-h":
  case undefined:
    help();
    process.exit(0);
    break;
  default:
    console.error(`Unknown command: ${cmd}`);
    help();
    process.exit(1);
}
