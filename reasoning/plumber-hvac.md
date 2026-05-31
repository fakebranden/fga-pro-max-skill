---
niche: plumber-hvac
version: 0.1.0
matches: [plumber, plumbing, hvac, ac repair, air conditioning, drain cleaning, water heater, heating cooling]
typography_mood: Workmanlike trust. Sans display in heavy weight (it should read as "competent, here-now, no fuss"). High-contrast palette — blue or red accent on white. Big phone number, big "24/7" if true. No design preciousness.
key_effect: A hero with the phone number as the largest text on the page, an "Available now" or "Open 24/7" pill below it, and a single emergency CTA. The page reads "we'll be there in an hour" before any service list appears.
examples: []
---

## Do

- Make the phone number the largest tappable element on mobile. CSS-styled, click-to-call, in the hero. This is the conversion. Forms are secondary.
- Render the service-area map or a clear "We serve {city + N miles}" line on the hero. Service area defines the lead.
- Surface 24/7 / after-hours availability prominently if true. If not true, render normal hours with the same prominence — never bury hours.
- Include the licensing line (state license #, bonded, insured) in the hero or directly below. Trust signal AND a search-engine entity field.
- Show a price floor or a price range for the top 3-5 services ("Drain clearing from $129"). Buyers are price-shopping; an anchor wins the call.
- Include reviews with first name + neighborhood ("Mike, Lutz") + service performed. Generic 5-star testimonials carry no weight in this niche.
- Render an "Emergency" path distinct from "Schedule" — the customer with a flooded basement should hit a different CTA than the one shopping for an annual tune-up.
- Surface "Years in business" as a single trust pill ("Family-owned in {city} since {year}"). Specific, verifiable, repeat-extractable by AEO.

## Never

- A booking form as the primary CTA. Plumbing emergencies = phone calls. Form-first kills 50%+ of leads in this niche.
- Stock photography of a smiling cartoon plumber holding a wrench. Use a real photo of the real truck and a real technician, even on a phone.
- "Get a quote" CTA on the hero. Emergencies don't want quotes — they want a technician. "Call now" is the move.
- A 30-service grid. Lead with the 4-6 most common service queries; depth pages handle the rest.
- "Why choose us" section with vague platitudes. Replace with a specific trust strip: license #, insurance carrier, BBB rating, years in business.
- Live-chat widget popping up over the hero. Tap-to-call beats chat every time in this niche.

## Typography mood

Display: a confident industrial sans at heavy weight (Roboto Condensed, Barlow Condensed, Oswald, or Anton). Body: a clean utility sans (Inter, Roboto, IBM Plex Sans). High-contrast color: dark navy / black + white + one accent (red for emergency, blue for HVAC, green for eco-services). Mobile-first sizing — phone number should hit 32-48px on mobile, larger than the H1 if necessary. Pair with `linear` for the disciplined-system register or `stripe` for the trust+clarity register.

## Key effect

Phone number as the page's largest element. On mobile: full-width tap-to-call button styled with the phone number rendered in display weight, with "Tap to call" or "Available 24/7" as a subtitle. On desktop: phone number sits in the hero in display weight, with the click-to-call link styled as a button below. The single signal "you can reach a person in 30 seconds" outconverts every other design choice on the page.

## Copy patterns

- "{Service} in {city}. Same-day. Licensed. Insured."
- "Call {phone}. We answer 24/7."
- "Flooded? Frozen? Backed up? Tap here."
- "Drain clearing from $129. Free estimate on installs."
- "Family-owned in {city} since {year}."
- "License #{number}. Bonded. Insured."
- "{N}-minute average response time in {neighborhood}."
- "No after-hours surcharge for emergencies."

## CTA patterns

- "Call now"
- "Request emergency service"
- "Get a free estimate"
- "Schedule a tune-up"
- "Tap to call {phone}"

## Anti-patterns (niche-specific)

- Hero photo of pipes / boilers / units instead of trucks-and-people. Show the team and the truck. Equipment photos belong on service detail pages.
- Service icons in a 12-up grid (toilet icon, faucet icon, pipe icon, etc.) — reads as a 2008 plumber site. Replace with a 4-6 service strip and real photos.
- "Coupons" or "$25 off" pop-ups. Reads as discount-handyman, not licensed plumber.
- "We're like family" copy. Family-owned is fine and good; "we're like family" is empty.
- A long "About the company history" section above the services. History goes in the about page, not the home hero.

## A2P sample-message variants

- "{legal_entity}: Your service appointment is confirmed for {date} between {window}. Tech: {name}. Reply STOP to opt out, HELP for help. You opted in by submitting our service-request form."
- "{legal_entity}: Your tech is 20 minutes out. Reply 1 to confirm you're home, 2 to reschedule. Reply STOP to opt out, HELP for help. You opted in via our form."
- "{legal_entity}: Job complete. Thanks for choosing {legal_entity}. Save this number — we're available 24/7. Reply STOP to opt out, HELP for help. You opted in by submitting our form."

## Reference token affinity

- `linear` — disciplined system + restrained palette adapts to the workmanlike-trust register.
- `stripe` — trust + clarity transfers directly to "licensed, bonded, insured" positioning.
- `fga-canonical` — yellow accent works as the high-contrast emergency-CTA pop on white.
