---
niche: restaurant-bar
version: 0.1.0
matches: [restaurant, bar, gastropub, brewpub, tavern, eatery, kitchen, dining]
typography_mood: Warm editorial. Reads like a neighborhood magazine spread — a confident serif on the headlines, generous line-height in the body, food and people both photographed in available light.
key_effect: A hero photo of a hands-and-plates moment (server delivering, diner cutting, a pour mid-arc) with the reservation form anchored as a sticky right-rail. Menu and hours both render within one scroll without a click.
examples: [Bronx Havana Cafe]
---

## Do

- Show food photographed honestly in restaurant light — overhead flat-lays or three-quarter at the table. Not the agency-glossy comp shot.
- Surface the full menu on the page (HTML or embedded PDF). One click to a menu PDF is a conversion drop; embed it.
- Put hours on the hero. Render today's hours dynamically if possible ("Open until 10pm tonight"). AEO crawlers grab this verbatim.
- Pin a reservation CTA top-right in the nav AND in the hero. Repeat at every section break — at minimum hero, post-menu, and footer.
- Include a "Happy hour" or "Daily specials" strip with day-of-week breakdown. Happy hour is one of the top three search queries for this niche.
- Photograph the room — both empty (architecture, lighting) and occupied (people enjoying themselves at quarter-profile). Two-image diptych works well.
- Surface dietary tags inline in the menu: vegetarian, gluten-free, vegan. Don't bury them in a footnote.
- Include a "Private events / book the room" line item for buyouts. Even if it's just a contact form, it captures a high-value lead segment.

## Never

- Stock food photography. Diners can spot it instantly and the trust hit is immediate.
- "Welcome to {restaurant}" as the headline — universal anti-pattern, doubly bad here because guests are looking for hours and menu, not a greeting.
- A reservation flow that requires a phone call. Embed OpenTable / Tock / Resy widget directly or use a single-form on-page submit.
- Hidden hours behind a Google Maps embed. Render hours in plain HTML text so AEO and screen readers both find them.
- Animated food (CSS bubbles, steam loops). Static food in good light wins every time.

## Typography mood

Editorial serif for display (Tiempos, Source Serif, Cormorant) plus a humanist sans for body (Inter, Söhne). Menu items use the body sans at the body size — never a separate fancy script font. Section heads run flush-left, generous tracking on small caps for "MENU" / "HOURS" / "RESERVE." Pair with `sweetgreen` seed for the warm-cream palette or `eleven-madison-park` for the editorial-restrained register.

## Key effect

The reservation widget is the only persistent UI element on the page — sticky in the right rail on desktop, sticky bottom bar on mobile. Everything else scrolls. The combination of (a) embedded menu + (b) always-visible reserve = the lowest-friction restaurant page on the strip. Hero photo behind the widget should crop tight enough that the food is identifiable in a 320-wide mobile viewport.

## Copy patterns

- "Reserve a table at {restaurant} in {neighborhood}."
- "Open for {dinner|brunch|happy hour} until {time}, {nights}."
- "{Cuisine} from {chef name}, served {hours}."
- "Happy hour {weekday}–{weekday}, {start}–{end}."
- "Walk-ins welcome at the bar."
- "Private dining for {N}+ — get the room."
- "Tonight's special: {dish}."
- "Family-style platters for {N}-{M}."

## CTA patterns

- "Reserve a table"
- "See tonight's menu"
- "Book a private dinner"
- "Order takeout"
- "Check tonight's hours"

## Anti-patterns (niche-specific)

- A hero carousel rotating through six dishes. Pick one signature dish and let it carry the page.
- Long-form "Our Story" section above the menu. Story goes below the menu, never before.
- Yelp / Google review embed as the primary social proof. Pull two quotes manually into the page; link to Yelp/Google in the footer.
- Background music auto-play. Even on click, restaurants rarely benefit from audio — kill it.
- A "Chef's Table" upsell rendered as a modal popup. Make it a section, not an interruption.

## A2P sample-message variants

- "{legal_entity}: Your reservation for {party_size} on {date} at {time} is confirmed. Reply STOP to opt out, HELP for help. You opted in by submitting our reservation form."
- "{legal_entity}: Reminder — your table is held for {time} today. Running late? Reply with new ETA. Reply STOP to opt out, HELP for help. You opted in via our form."
- "{legal_entity}: Thanks for dining with us. Tonight's special is {dish}, available until close. Reply STOP to opt out, HELP for help. You opted in by submitting our form."

## Reference token affinity

- `sweetgreen` — warm cream + green register fits restaurants where the food is the hero.
- `eleven-madison-park` — for higher-end / chef-driven dining rooms, restrained serif palette transfers directly.
- `blue-bottle-coffee` — for cafés and casual all-day spots where the menu is short and the room is the draw.
