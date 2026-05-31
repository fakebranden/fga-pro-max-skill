# Registry license audit — Phase 2

This document is the Phase 2 (task #66) license audit for every shadcn-
registry library FGA Pro Max pins. It is the authoritative record FGA
relies on to ship client end-products without infringing.

All assertions here were verified on **2026-05-31** against the live GitHub
repo metadata (`gh api repos/<owner>/<repo>` → `license.spdx_id`) and, for
proprietary licenses, against the library's own terms page. The pinned
commit SHAs in `registry/manifest.json` capture the exact source state
each assertion is true for.

Re-verify quarterly. License terms change; pinning a SHA does NOT pin the
license.

---

## cult-ui

- **SPDX:** MIT (verified via `gh api repos/nolly-studio/cult-ui` →
  `license.spdx_id = "MIT"`)
- **Attribution:** Standard MIT — include the copyright notice when
  redistributing source. Not required when the components ship inside an
  end-product binary (typical FGA case).
- **Commercial use:** Fully permitted. The free MIT-licensed core is what
  FGA pulls; the Cult Pro premium tier (129+ marketing blocks, 58+ extra
  components) is NOT depended on.
- **Caveats:** None.

## aceternity

- **SPDX:** None published. The source repo at `manuarora700/ui.aceternity`
  has no LICENSE file (GitHub API returns `license: null`). Terms live at
  `https://ui.aceternity.com/licence`.
- **Attribution:** Not required by the license terms.
- **Commercial use:** Explicitly permitted — "Create End Products: You can
  create unlimited end products for yourself or your clients" and "may be
  sold, licensed, sub-licensed, or freely distributed." This covers the
  FGA model exactly.
- **Caveats:** This is a **proprietary license**, NOT MIT. Cannot
  redistribute the Item as a stock image or its source files, regardless
  of modifications. Cannot sell derivative works on marketplaces. Critical
  for FGA: do NOT republish raw component source as a public registry of
  our own — installation into per-client end-product repos is the only
  permitted use pattern.

## skiper-ui

- **SPDX:** MIT (verified via `gh api repos/anshxs/legacy-skiper-ui` →
  `license.spdx_id = "MIT"`)
- **Attribution:** Standard MIT.
- **Commercial use:** Fully permitted for the free-tier numbered slugs
  (skiper1 through skiper24-ish).
- **Caveats:** The author (Gxuri / Gurvinder Singh) sells a premium tier
  of 54+ paid components. These are gated behind purchase and FGA does
  NOT install them via the default pipeline. The public source repo
  `anshxs/legacy-skiper-ui` is the only MIT-licensed mirror; the live
  registry at `skiper-ui.com/registry/` builds from a non-public fork
  that the author maintains. The SHA pinned in the manifest tracks the
  public mirror only — when a paid component would be installed by a
  recipe, the install script must refuse it.

## watermelon — **PHASE 2 EXIT-BLOCKER**

- **SPDX:** MIT (verified via
  `gh api repos/WatermelonCorp/watermellon-registry` →
  `license.spdx_id = "MIT"`). LICENSE file present in repo root.
- **Attribution:** Standard MIT.
- **Commercial use:** Fully permitted.
- **Caveats:** None. The library is open source per the project's own
  homepage and the GitHub-declared MIT license.

**EXIT-GATE VERDICT — PASSED.** Watermelon clears the Phase 2 license
audit unambiguously. It is the canonical fallback for cult-ui shortfalls
(testimonials, marquees, bento, hero variants) in the recipe table.

## styleui — **PHASE 2 EXIT-BLOCKER**

- **SPDX:** MIT (verified via `gh api repos/heyfabrika/styleui` →
  `license.spdx_id = "MIT"`).
- **Attribution:** Standard MIT.
- **Commercial use:** Fully permitted with no marketplace exclusion.
- **Caveats:** None. The repo footer explicitly states MIT and the
  Phase 1 manifest's "TBD-phase-2-audit-BLOCKER" flag is hereby cleared.

**EXIT-GATE VERDICT — PASSED.** StyleUI clears the Phase 2 license audit
unambiguously. It is the section-template default (notio + axis).

## componentry

- **SPDX:** MIT (verified via `gh api repos/harshjdhv/componentry` →
  `license.spdx_id = "MIT"`).
- **Attribution:** Standard MIT for Componentry code.
- **Commercial use:** Permitted for the Componentry layer.
- **Caveats:** Two components depend on GSAP and inherit GSAP's
  separate commercial-use restrictions: `image-trail` and `layered-stack`.
  Componentry's README pushes the GSAP compliance responsibility to the
  consumer. **The FGA default install script MUST NOT pull image-trail
  or layered-stack** without a separate GSAP commercial license review.
  Phase 5 install enforcement should hard-block these slugs.

## dotmatrix

- **SPDX:** NOASSERTION (verified via `gh api repos/zzzzshawn/matrix` →
  `license.spdx_id = "NOASSERTION"`). LICENSE file is a custom
  proprietary text.
- **Attribution:** Not required.
- **Commercial use:** Permitted — the license explicitly allows use in
  commercial and non-commercial products. Installation into per-client
  end-product repos is the intended pattern and matches FGA usage.
- **Caveats:** This is a **custom proprietary license**, NOT MIT. The
  license forbids:
  1. Publishing, distributing, or presenting any component as a standalone
     reusable component, or claiming it as part of another component
     library.
  2. Selling, sublicensing, renting, leasing, or otherwise commercializing
     any component on its own.
  FGA usage (install into client sites that we ship as a managed service)
  is allowed. Do NOT re-export dotmatrix loaders into any public FGA-owned
  registry.

---

## Phase 2 exit gate

The Phase 2 task description names two libraries as license-audit
exit-blockers:

| Library | Pre-audit flag | Post-audit verdict |
|---|---|---|
| `watermelon` | `TBD-phase-2-audit-BLOCKER` | **MIT — PASS** |
| `styleui` | `TBD-phase-2-audit-BLOCKER` | **MIT — PASS** |

Both blocker libraries cleared. Both are MIT-licensed via their respective
GitHub repos and confirmed by the `gh` API. There are no remaining
license-side blockers to Phase 2 sign-off.

## Re-audit cadence

Quarterly. Re-run:

```bash
for repo in nolly-studio/cult-ui manuarora700/ui.aceternity \
            anshxs/legacy-skiper-ui WatermelonCorp/watermellon-registry \
            heyfabrika/styleui harshjdhv/componentry zzzzshawn/matrix; do
  echo -n "$repo: "
  gh api repos/$repo --jq '.license.spdx_id // "NOASSERTION"'
done
```

Any change from the recorded SPDX above is a blocker for the next FGA
Pro Max release.
