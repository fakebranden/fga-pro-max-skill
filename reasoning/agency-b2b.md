---
niche: agency-b2b
version: 0.1.0
matches: [agency, marketing agency, b2b services, consultancy, studio, creative agency, digital agency]
typography_mood: Confident editorial-modern. Anton or a heavy display sans on the headlines (per FGA brand kit), Poppins on the body. Black + white + one electric accent (FGA = #f6eb1e yellow). Reads like a magazine cover, not a SaaS landing.
key_effect: A hero with a single oversized headline ("We build the marketing system, then run it") set in Anton black, anchored against a stark black or white field, with one piece of work as the secondary visual. The work is the credential — case studies replace stock illustrations.
examples: [Flying Goat Agency]
---

## Do

- Lead with one outsized statement-headline in Anton (or the brand display) at 80-160px desktop. The headline IS the hero — no illustration competes with it.
- Show case studies above the services list. The work is the credential; services without proof read as a pitch deck.
- Render the services list as a short typographic strip — 4-6 services max, each in 2-4 words ("Marketing systems," "Content engines," "Site generation"). Not a feature grid with icons.
- Use a "Discovery call" CTA as the single primary action. NOT "Contact us." NOT "Get a quote." Discovery call is industry-standard and qualifies hotter leads.
- Surface client logos as a quiet trust strip — grayscale, single row, no rotation. Don't oversell the roster.
- Include a "How we work" or "Our process" section in 3-4 numbered steps. AEO crawlers extract these for "how does {agency} work" queries.
- Reference real metrics from real client outcomes — "+47% bookings in 90 days for {client}." Vague claims kill the page.
- Include one team headshot strip or founder photo. B2B services need a face attached to the brand.

## Never

- "We're a full-service agency that…" opener. Banned phrasing in the universal anti-patterns and triply bad here.
- A "Solutions" or "Capabilities" grid with 16 services + 16 icons. Reads as Fiverr, not as an authority.
- Stock illustrations of abstract gradients, geometric shapes, or "team members high-fiving." Use the actual work or actual people.
- A pricing page hidden behind "Contact us for pricing." Either show an anchor price ("Engagements start at $X/month") or omit the pricing concept entirely and lead with discovery call.
- "Schedule a free consultation" CTA — "free" cheapens the call. Just "Book a discovery call."

## Typography mood

This is FGA's own site — use the locked brand kit. Display: **Anton** (heavy, condensed, all-caps comfortable). Body: **Poppins** (clean, geometric, friendly at small sizes). Palette: **#252525 / #FFFFFF / #f6eb1e** (electric yellow accent ONLY for the primary CTA and one or two emphasis pulls — never for body or background). Cross-reference `reference_fga_brand_kit` for exact hex values. Headlines run flush-left, generous tracking on caps, no italic. Pair with `fga-canonical` (canonical), `linear` (for the disciplined-system register), or `stripe` (for the trust + clarity register on the services strip).

## Key effect

The single oversized headline against a stark field. No hero illustration, no SaaS-y product mockup, no animated gradient. The biggest object on the page is one sentence about what the agency does, in the agency's typeface, in the agency's accent color on the verb or noun that matters most. This is FGA's own move and the move every serious agency site should make. Secondary visual = the actual work, photographed honestly.

## Copy patterns

- "We build the marketing system, then run it."
- "Marketing for {industry} brands that need to ship, not pitch."
- "{N} client sites shipped this year. {M} on retainer."
- "From audit to ad spend, in {timeframe}."
- "Engagements start at {price_floor}/month."
- "Book a 30-minute call. We'll show you the system."
- "What we do for {industry vertical}."
- "How we ship a marketing site in {timeframe}."

## CTA patterns

- "Book a discovery call"
- "See the work"
- "Get the audit"
- "Start with the system"
- "Read the case study"

## Anti-patterns (niche-specific)

- A "Meet the team" page with 30 stock-style headshots. Cap at 4-6 real photos of real people.
- "Our values" section. Values are demonstrated by the work, not declared on the home page.
- An animated counter ("12,847 happy clients"). Specific, sourced metrics beat vanity counters.
- A blog index featuring 6 generic-titled posts ("5 ways to grow your business") with no dates. Either ship a real publication cadence or omit the blog.
- A "Awards / As seen in" strip without the linked source piece. Strip must link out or omit entirely.

## A2P sample-message variants

- "{legal_entity}: Your discovery call with {team_member} is confirmed for {date} at {time}. Calendar invite sent. Reply STOP to opt out, HELP for help. You opted in by submitting our form."
- "{legal_entity}: Reminder — your call with us is in 15 minutes. Join link: {url}. Reply STOP to opt out, HELP for help. You opted in via our form."
- "{legal_entity}: Thanks for the call earlier. Proposal landed in your inbox; let us know if you want to walk through it. Reply STOP to opt out, HELP for help. You opted in by submitting our form."

## Reference token affinity

- `fga-canonical` — this IS the FGA site. The canonical kit is the default.
- `linear` — disciplined system + restrained palette register transfers to any agency selling "we build systems."
- `stripe` — pairs well when the agency story is "trust + clarity" rather than "creative + bold."
