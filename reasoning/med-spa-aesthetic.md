---
niche: med-spa-aesthetic
version: 0.1.0
matches: [med spa, medical spa, aesthetic clinic, botox, dermatology, skin clinic, anti-aging, injectables]
typography_mood: Minimal clinical. Cream, off-white, soft champagne, the occasional gold rule. Serif display in a feminine register, generous whitespace, body type at editorial weight. The page should feel like a clinic, not a salon.
key_effect: A before/after gallery rendered with a draggable slider — single image, single drag handle, one labeled "Before" and one "After" — placed above the consultation form. The clinical proof is the page's center of gravity.
examples: []
---

## Do

- Build a real before/after gallery — at minimum 6 cases, each labeled by treatment ("Botox forehead," "Lip filler," "Microneedling"). Slider component preferred over side-by-side.
- Use minimal-clinical photography: bare skin, neutral backgrounds, even soft lighting. Not retouched glamour shots.
- Surface the consultation form as the primary conversion event — not a phone call, not "Contact us." Free consultation is the industry-standard CTA.
- Render every treatment with: what it is (1 sentence), what it treats, duration, how long it lasts, downtime. This 5-field treatment card answers every AEO query for the niche.
- Include provider credentials — MD, NP, RN with state licensure. Render in a "Meet the team" strip with real headshots in clinical attire.
- Render an FAQ with the three universal med-spa questions: "Does it hurt?" "How long does it last?" "What's the downtime?" These three drive most consultation conversions.
- Display HIPAA / privacy posture in the consultation form footer — one sentence noting consultation information stays confidential.
- Include pricing transparency where local regulations permit — even a starting anchor ("Botox from $12/unit") builds trust against the competitor who hides everything.

## Never

- Stock-photo "spa lady" with a towel and a cucumber over her eye. Universal trust collapse for this niche.
- Before/after images with model-release-violation tells (covered eyes with black bars, side-cropped faces). Either get a real release and show the full face, or use schematic illustrations.
- Mention specific drug brand names (Botox, Juvederm, Restylane) without the trademark glyph (®) — legal hygiene.
- "Reverse aging," "fountain of youth," "miracle" copy. Hard legal floor in many states. Use specific outcomes: "softens forehead lines for 3-4 months."
- A consultation form with insurance fields. Med spas are cash-pay; insurance fields scare off the buyer.
- "Limited-time pricing" countdown timers on treatments. Reads as discount-spa, not clinic.

## Typography mood

Display: a refined modern serif (Fraunces, Cormorant, Tenor Sans, or Spectral) at light or regular weight. Body: a soft humanist sans (Inter, DM Sans, or Manrope) at editorial line-height (1.6-1.7). Palette: cream / off-white / champagne / one gold or rose-gold accent — never high-contrast neon. Section heads in small-caps with wide tracking. Pair with `eleven-madison-park` for the restrained-luxury serif register or `apple` for the clinical-minimal product register.

## Key effect

The before/after slider, full-bleed or near-full-bleed, with a real grippable handle the visitor drags. The drag interaction itself is the trust signal — the visitor *participates* in seeing the result, and the result becomes credible by virtue of being controllable. Place this above the consultation form. No other treatment site element gets close to the conversion power of a working before/after slider.

## Copy patterns

- "{Treatment} in {neighborhood} — board-certified {credential} on staff."
- "Real results from real patients. Drag to see."
- "{Treatment} that {specific outcome} for {duration}."
- "Free consultation. No pressure, no obligation."
- "Most patients return to work the same day."
- "Performed by a licensed {MD/NP/RN}."
- "Pricing transparent on every treatment."
- "{Treatment_name} starting at ${price}/unit."

## CTA patterns

- "Book a consultation"
- "See before & after"
- "Reserve my treatment"
- "Schedule with a provider"
- "Ask the nurse a question"

## Anti-patterns (niche-specific)

- A blog post grid as social proof. Reviews and before/afters convert; blog posts don't.
- Testimonials without a first name and treatment label. "Anonymous, satisfied client" is worse than no testimonial.
- A "Day in the spa" video showing fluffy robes and infused water. Med spas are clinical environments — show the treatment room, not the lobby.
- Before/after presented as the SAME face at different angles. Same angle, same lighting, same expression — or the comparison fails.
- A "Become a member" section above the consultation CTA. Memberships are upsells; lead with the free consult.

## A2P sample-message variants

- "{legal_entity}: Your consultation with {provider} on {date} at {time} is confirmed. Address: {street}. Reply STOP to opt out, HELP for help. You opted in by submitting our consultation form."
- "{legal_entity}: Reminder — your {treatment} appointment is tomorrow at {time}. Please arrive with clean skin, no makeup. Reply STOP to opt out, HELP for help. You opted in via our form."
- "{legal_entity}: Hope your treatment went well today. Save this number for follow-up questions or your touch-up scheduling. Reply STOP to opt out, HELP for help. You opted in by submitting our form."

## Reference token affinity

- `eleven-madison-park` — restrained-luxury serif + cream palette is the clearest med-spa register match.
- `apple` — clean-clinical product photography register translates directly to med-spa treatment pages.
- `elevenlabs` — soft purple/cream accents work for newer med-spa brands wanting a less-traditional palette.
