---
niche: lounge
version: 0.1.0
matches: [lounge, hookah, cigar lounge, vip lounge, rooftop lounge, speakeasy]
typography_mood: Nocturnal premium. Quiet authority over loud "club" energy — serif display heads, low-light photography, restrained gold or amber accents.
key_effect: A dim, smoke-tinged hero with one sharp focal point (a pour, a hookah head, a velvet booth) and a reservation CTA pinned in the lower-third. The page reads "members welcome" before any copy is parsed.
examples: [Bronx Havana Room, Five Bucks Drinkery]
---

## Do

- Lead the hero with a dim, ambient-lit photograph of the *space* (booth, bar, lounge floor) — not a logo, not a drink on a white seamless.
- Put the reservation CTA visible above the fold and again at every section break. Reservations are the conversion event, not "Learn more."
- Surface hours prominently — late-night hours are a search hook. Render Th-Sat hours in larger type than weekday hours if they differ.
- Show a real bottle / hookah / cocktail menu (PDF or HTML). Without one, AEO crawlers and humans both bounce.
- Include a private-room / bottle-service section with capacity ranges ("up to 12 guests") and a separate "Book the room" CTA distinct from general reservations.
- Use age-gate copy ("21+") at the top of the page or in the footer — sets the register and is a legal hygiene baseline.
- Include a dress-code line if one exists. Lounges that enforce one convert better when they say so.
- Photograph the people *backs to camera* or at quarter-profile when possible. Anonymity reads as exclusivity.

## Never

- Bright daylight photography. Lounges are night businesses; daylight kills the register.
- "Family-friendly" or "kid-friendly" language anywhere on the page. Wrong audience signal.
- Confetti / party-emoji / EDM-festival imagery. Different niche.
- Generic "About Us" section opening with the founding story. Lounges sell vibe, not heritage. If there's a story, embed it in the bottle-service section or the press strip.
- Pricing tables for drinks. Either render the full menu or omit prices entirely — half-priced strips read cheap.
- Spinning gold typography or "luxury" rendered with shimmery gradients. Restraint is the move.

## Typography mood

Serif display headlines (Playfair Display, Cormorant Garamond, or Fraunces) paired with a quiet humanist sans for body (Inter, Söhne, or Geist). One display, one body, never more. The display weight should be regular or medium — never extra-bold, which reads sports-bar. Letter-spacing on display heads should be tight to neutral. Cross-reference the `eleven-madison-park` and `blue-bottle-coffee` seed tokens — both ship the restrained-serif register this niche needs.

## Key effect

A single hero image with crushed blacks and a warm-amber highlight on one focal element (the bartender's hand, a smoke wisp, the lip of a coupe). Behind it, the navigation sits in a near-transparent dark bar; in front, the brand mark sits in muted gold or off-white at 60-70% opacity. The reservation CTA is the only fully-saturated UI element on the page. This contrast — dim everywhere except one button — is the conversion engine.

## Copy patterns

- "{Neighborhood}'s late-night room for {audience descriptor}."
- "Reserve a booth before {weekend night} fills."
- "Private rooms for {N}-{M} guests, with bottle service from {price floor}."
- "Open until {late hour}, {nights}."
- "{Cuisine/drink program} after dark."
- "The {hookah/cigar/cocktail} menu is the menu."
- "Hidden on {street}, two doors down from {landmark}."
- "Dress sharp. Bring the crew."

## CTA patterns

- "Reserve a booth"
- "Book the private room"
- "Add bottle service"
- "See tonight's hours"
- "Get on the list"

## Anti-patterns (niche-specific)

- Auto-playing background video of generic city skyline or rain on a window. Use a still photograph of the actual room.
- Smoke-effect CSS animation on the hero. Reads as 2010s landing-page kitsch — show real smoke in the photograph instead.
- A "Menu" section that's just a Google Drive link with no preview. Embed at least the first page as an image.
- "Voted #1 Lounge" badges without a cited source and year. Worse than no badge.
- Social-feed embed in the hero. Pushes the reservation CTA below the fold and dates the page the moment a post stops syndicating.

## A2P sample-message variants

- "{legal_entity}: Your booth for {day} at {time} is confirmed. Reply STOP to opt out, HELP for help. You opted in by submitting our reservation form."
- "{legal_entity}: Reminder — your reservation is tonight at {time}. Dress code is {code}. Reply STOP to opt out, HELP for help. You opted in by submitting our form."
- "{legal_entity}: Thanks for visiting last night. Save this number — text us to reserve next weekend. Reply STOP to opt out, HELP for help. You opted in by submitting our form."

## Reference token affinity

- `eleven-madison-park` — restrained serif + cream/black palette translates directly to lounge register.
- `blue-bottle-coffee` — same minimalist-premium discipline, different palette anchor.
- `fga-canonical` — the electric-yellow accent works as the single-CTA pop against crushed-black photography.
