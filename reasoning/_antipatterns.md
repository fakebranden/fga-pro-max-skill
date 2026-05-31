---
scope: universal
applies-to: all-niches
---

# Universal Anti-Patterns

These apply across every niche in this skill. Any generated site must avoid
all of them. The skill's pre-commit linter flags occurrences.

## Imagery

- ❌ **AI-generated stock photography of generic people** — uncanny smiles,
  inhuman teeth, melted hands. Always.
- ❌ Stock photos with watermarks visible (Shutterstock/iStock bars).
- ❌ Hero image that is just a logo on a colored background. The hero should
  show the *thing* (the product, the space, the work).
- ❌ Floating people with no environmental context. Hero subjects need a
  setting that reads in 200ms.

## Typography

- ❌ More than 2 display fonts on a page. One display + one body is the rule.
- ❌ Body copy under 14px on desktop. AEO crawlers + accessibility floor.
- ❌ Justified body alignment in long paragraphs. Creates rivers, hurts
  readability.
- ❌ Display headlines in script/handwriting fonts. Save those for accents.

## Copy

- ❌ "Welcome to [Brand]." — banned opener. Engages no problem, signals no
  authority, gives AI engines nothing to cite.
- ❌ Marketing-speak section headings ("Our Solutions," "Why Choose Us").
  Use conversational question form ("What can the truck cater?") — AEO
  prefers it.
- ❌ Lorem ipsum or unfilled placeholders shipping to production. Fail the
  build loudly.

## Layout

- ❌ Above-the-fold without a CTA. Every hero needs one primary action.
- ❌ Five+ section CTAs competing for attention. Cap at 3 distinct CTA
  targets per page; repetition of the same target is fine.
- ❌ Carousels for primary content. Users don't swipe; content past slide 1
  is invisible. Use grids or scroll-stacks.
- ❌ Modal that auto-opens on page load. Banned without explicit operator
  opt-in.

## Forms

- ❌ Phone input without `<SmsConsent />` block AND unchecked checkbox.
  Build-blocking — see `enforce-a2p.mjs`.
- ❌ Multi-step forms with no progress indicator.
- ❌ Required fields not visually marked (asterisk or label).
- ❌ "Send" buttons. Always action-verb specific: "Book the truck," "Get my
  audit," "Start my consultation."

## SEO / AEO

- ❌ Hero `<h1>` that's the company name. Use the value proposition.
- ❌ Image elements without `alt` attributes. Build-blocking.
- ❌ Schema markup with placeholder `@id` or missing `address`.
- ❌ `robots.txt` allowing `/api/` or `/thanks` paths to be indexed.

## Motion

- ❌ Parallax that scrolls horizontally on mobile. Breaks the page.
- ❌ Auto-playing video with sound on page load. Always muted, always
  `playsInline`.
- ❌ Hover-only interactions on mobile-only pages.
- ❌ Cursor-follow effects on mobile. Disable below 768px.

## Accessibility

- ❌ Color contrast below WCAG AA (4.5:1 for body, 3:1 for large text).
- ❌ Focus styles removed without replacement.
- ❌ ARIA labels that lie about content ("Decorative" on a CTA).

## Anti-Marketing-Speak

The following phrases are banned in body copy without operator override:

- "We pride ourselves on..."
- "Quality is our top priority"
- "Customer satisfaction is our goal"
- "We're not just a [X], we're a [Y]"
- "Welcome to..."
- "Founded on the principle of..."
- "Synergy" (in any context)
- "Best-in-class" (vague, cite a specific source)

If the brand kit's `voice` field demands a phrase from this list, override
must be explicit in `niche.md` for that niche.
