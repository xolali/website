# Dreamscape Systems — Visual & Imagery Guidelines

**Document type:** Art Direction & Imagery Specification
**Version:** 1.0
**Date:** 19 June 2026
**Author:** Creative Director / UX Designer
**Basis:** Brand Design Guide (v1.0), UI Design Specification (v1.0)

---

## 0. Purpose

This document is the art-direction layer for the Dreamscape Systems website. It tells designers, photographers, illustrators, and anyone generating AI imagery exactly what to produce for each page — and, just as importantly, what never to produce.

Dreamscape sells trust in an infrastructure category. Imagery either reinforces that the company is real, modern, African, and globally credible — or it quietly undermines it. There is no neutral image.

---

## 1. The Core Visual Idea

> **Modern African builders, fused with the systems they're building on.**

Every image lives on a spectrum between two poles:

- **The human pole** — real African entrepreneurs, developers, and professionals at work, shot like a premium tech brand (Stripe, Wise), in modern urban African settings.
- **The infrastructure pole** — the abstract, geometric "NetworkMap" system from the Brand Guide: nodes, orbital arcs, data flow, device meshes, rendered in Midnight / Aurora / Helios.

The signature Dreamscape look is the **overlap** of the two: a developer's workspace with a network overlay drawn across it; a portrait dissolving into nodes at the edge; a Lagos skyline threaded with orbital connection lines. Human ambition, on top of real infrastructure.

---

## 2. Global Rules (apply to every page)

### 2.1 Do

- Show **modern urban Africa**: Lagos, Nairobi, Accra, Kigali, Cape Town — co-working spaces, rooftops, apartments, studios, server rooms, busy streets at dusk.
- Show **real work**: people on laptops and **phones** (mobile-first — a phone appears in ~70% of human shots), writing code, in conversation, presenting, building.
- Show **range**: founders, engineers, designers, finance professionals; mixed gender; ages 22–45; varied skin tones and styles of modern dress.
- Apply the **brand grade**: warm shadows (pulled toward `#1F1A14`, never crushed black), lifted oranges, slightly desaturated blues, medium-high contrast. ~15–20% grade, not a heavy filter.
- Composite **infrastructure overlays** (NetworkMap, Aurora connection lines, subtle UI fragments) onto or beside human shots to create the signature fusion.
- Maintain **Aurora (#FF6B35)** as the single accent that ties photography, illustration, and UI together.

### 2.2 Never

- ❌ No safari, savanna, wildlife, sunsets over acacia trees.
- ❌ No tribal/traditional dress used as the *only* signal of "African." No masks, drums, mud huts, body paint as decoration.
- ❌ No poverty tropes, "voluntourism," or hands-reaching-for-help framing.
- ❌ No generic Western stock ("diverse team high-fiving at laptop," Getty-style).
- ❌ No literal globes-with-Africa, maps of Africa made of circuit boards, or Africa-shaped logos.
- ❌ No dark, low-light, low-quality images — underexposure reads as under-investment and kills trust.
- ❌ No glossy 3D blobs or default gradient-mesh backgrounds (overused, generic).
- ❌ No competitor logos or recognizable third-party UIs on screens.

### 2.3 Technical baseline

- **Formats:** AVIF/WebP with fallbacks; responsive `srcset`; explicit width/height (CLS).
- **Hero exports:** wide/cinematic 16:9 and 21:9; portrait 4:5 for mobile crops.
- **Color space:** sRGB. **Text overlays:** always over a Midnight tint at 40–60% opacity (never raw photo behind text).
- **Aspect ratios:** heroes 16:9 / 21:9 · cards 16:9 or 4:3 · portraits 4:5 · avatars 1:1.
- **AI generation:** generate at 2× target resolution, then grade to the brand palette in post. Always review hands, text, and screens — regenerate artefacts. Treat AI output as a *plate* to be color-graded, not a final asset.

### 2.4 Reusable prompt scaffold

Every prompt in this document assumes these shared modifiers. Append where noted:

```
STYLE SUFFIX (append to all prompts):
"...editorial tech photography, premium fintech brand aesthetic, modern
urban African setting, warm directional lighting, lifted warm shadows,
slightly desaturated cool tones with warm highlights, shallow depth of
field, high detail, shot on full-frame 35mm, color grade with burnt-orange
(#FF6B35) accent. No safari, no wildlife, no traditional tribal dress, no
poverty imagery, no text artefacts, no logos. 8k, photorealistic."

NEGATIVE PROMPT (use everywhere):
"safari, savanna, wildlife, animals, acacia trees, sunset cliché, tribal
masks, traditional dress as costume, poverty, slum, charity framing,
Western stock photo, high-five, globe with Africa, circuit-board map,
lowres, underexposed, muddy shadows, watermark, distorted hands,
gibberish text, brand logos."
```

---

## 3. Illustration System (shared)

The illustration language is defined in the Brand Guide (§8). This is its applied form for the web:

- **Style:** abstract geometric system diagrams — the **NetworkMap** motif. Nodes (circles), orbital arcs (from the logo), data-flow lines, isometric device meshes.
- **Construction:** 1.5–2px strokes, perfect circles/rectangles, 45° diagonals, no organic curves except the logo arc. Depth via tone/opacity layers, not gradients (Aurora 100%→30% glow halos permitted).
- **Palette:** Midnight, Slate-800/900, Aurora, Helios — nothing else.
- **African presence (without stereotype):** node concentrations cluster over African geographies (Lagos, Nairobi, Accra, Kigali, Johannesburg) — central and prominent, never peripheral; device meshes are phone-first.
- **Three illustration tiers:**
  1. **Hero-scale** — large animated NetworkMap (Lottie/SVG, "connection draw" on load).
  2. **Section-scale** — static topology fragments behind/beside content.
  3. **Spot-scale** — small node-and-arc motifs as dividers, list bullets, empty states.

**Master illustration prompt (vector):**
```
"Abstract geometric network topology illustration: connected circular nodes
linked by thin orbital arc lines and 45-degree data-flow paths, isometric
device mesh of smartphones and servers, node clusters concentrated over a
stylised West and East African geography, deep midnight-navy (#0A0F1E)
background, burnt-orange (#FF6B35) and warm-gold (#F5C842) nodes and lines,
subtle glow halos, precise 1.5px strokes, flat vector, technical infographic
aesthetic, no text, no map outlines of countries. Clean, premium, minimal."
```

---

## 4. Icon System (shared)

Per Brand Guide §7 — **precision line icons**, Lucide already wired into the build.

- **Style:** 1.5px stroke at 24px, square caps, miter joins, `currentColor` (themeable).
- **Color:** inherit text color by default; **Aurora only** to signal status/emphasis (e.g., a shield turning Aurora on "connected"; a feature icon as the one accent in a card).
- **Rule:** icons always pair with a text label (except in established nav patterns). Never decorative-only where meaning is required.
- **Per-domain sets** (already mapped in `content/products.ts`):
  - Connectivity/AfroVPN → `ShieldCheck`, `Globe`, `Lock`, `Server`, `Route`, `Gauge`, `Smartphone`, `Zap`
  - Payments/DreamPay → `CreditCard`, `Wallet`, `ArrowRightLeft`, `ShieldCheck`
  - Assets/DreamAssets → `Hexagon`, `Layers`, `TrendingUp`
  - UI → `Menu`, `X`, `ChevronDown`, `Search`, `Check`, `ArrowRight`
- **Consistency:** one icon family site-wide (Lucide). Do not mix in filled or duotone sets.

---

# PAGE-BY-PAGE DIRECTION

Each page: ① hero · ② supporting · ③ illustration · ④ icons · ⑤ AI prompts.

---

## 5. Homepage (`/`)

**Role:** establish the infrastructure narrative + funnel to AfroVPN. Highest visual stakes.

**① Hero image**
The signature fusion shot. A confident African founder/engineer (late 20s–30s) in a modern Lagos or Nairobi co-working space at golden hour, looking off-camera or at a laptop, mid-thought. A translucent **NetworkMap overlay** (Aurora nodes + orbital arcs) is composited across the right third of the frame, connecting out of their screen — human ambition wired into infrastructure. Right-side negative space (under a Midnight tint) holds the H1.
*Placement:* full-bleed background behind hero copy on the right; or split — copy left, graded portrait + overlay right.

**② Supporting images**
- **Features section:** keep icon-led (no photos) to stay clean; optional faint NetworkMap fragment behind the grid.
- **Platform section:** product-tinted spot illustrations per card (VPN shield-mesh, payment-flow nodes, asset-hexagon lattice).
- **Trust section:** a calm, real wide shot of a small diverse team collaborating in a bright modern African office — proof of a real company. Graded, phone visible.

**③ Illustration style**
Hero-scale animated NetworkMap as the connective tissue. "Connection draw" plays once on load (respects reduced-motion). Helios used sparingly for secondary nodes.

**④ Icon usage**
Four feature icons in Aurora (one accent each). Product cards lead with their domain icon + status badge. Trust stat band stays typographic (no icons competing with numbers).

**⑤ AI prompts**
```
HERO:
"Confident young Nigerian software founder in a modern Lagos co-working
space at golden hour, sitting at a laptop, looking thoughtfully off-camera,
wearing smart-casual modern clothing, large windows with warm city light,
other blurred professionals in background, a phone on the desk. Negative
space on the right for text. [STYLE SUFFIX]"

HERO OVERLAY (composite separately, multiply/screen):
"[MASTER ILLUSTRATION PROMPT], arranged as a vertical band emerging from a
laptop screen, transparent background."

TRUST / TEAM:
"A small diverse team of four African tech professionals collaborating
around a laptop in a bright modern Nairobi office, natural daylight, one
person holding a smartphone, genuine candid interaction, glass walls,
plants, premium startup workspace. [STYLE SUFFIX]"
```

---

## 6. AfroVPN Landing (`/afrovpn`)

**Role:** primary conversion. Visuals must read **secure, fast, personal**.

**① Hero image**
A person using their phone confidently in a real-world African context where privacy matters — a commuter on a modern Lagos rooftop / transit hub at dusk, or a freelancer in a café. Composite a subtle **encrypted-tunnel motif** (Aurora line flowing from the phone into a node mesh) and a small "connected" shield glyph. Feeling: protected, in control, everyday.

**② Supporting images**
- **Overview:** a clean isometric "tunnel" diagram (device → encrypted tunnel → open internet).
- **Features (8):** icon-led cards, no photos.
- **Benefits:** one graded lifestyle shot — securing finances on a phone on public Wi-Fi (café/airport).
- **Security section:** vault-like abstract — concentric Aurora rings / lock-node lattice on darker Slate-900. No photo.
- **Use cases:** small spot illustrations per case (stream, work, travel, finance, everyday).

**③ Illustration style**
Stronger reliance on the **encrypted-tunnel + shield-node** variants of the NetworkMap. Security section goes fully abstract and "darker/heavier" to feel like a vault.

**④ Icon usage**
Domain icons (shield, globe, lock, kill-switch toggle). Security DO-list uses `Check` in success-green; no-logs DON'T-list uses `X` in error-red — color paired with text, never color alone. "Connected" states use Aurora.

**⑤ AI prompts**
```
HERO:
"A young African professional standing on a modern rooftop terminal in Lagos
at blue-hour dusk, looking at their smartphone with a calm confident
expression, city lights bokeh behind, smart-casual outfit, sense of privacy
and control. Space on the left for text. [STYLE SUFFIX]"

ENCRYPTED TUNNEL (illustration):
"Isometric illustration of a smartphone connected through a glowing
burnt-orange encrypted tunnel of hexagonal nodes to an abstract open-internet
node cloud, midnight-navy background, warm-gold secondary accents, precise
thin strokes, flat vector, no text. Secure, premium, technical."

SECURITY / VAULT (illustration):
"Abstract security motif: concentric burnt-orange orbital rings around a
central locked node, fine 1.5px lines, deep midnight background, subtle glow,
vault-like, geometric, no text."
```

---

## 7. DreamPay (`/dreampay`) — Coming Soon

**Role:** vision + waitlist for payments. Trust and compliance must be visible.

**① Hero image**
An African entrepreneur/merchant in a modern setting completing a payment on a phone — a boutique owner, a market-adjacent modern storefront, a creative selling online from a studio. Composite a **payment-flow motif** (Aurora arrows/nodes moving value across a stylised border). Helios leads the palette here (the "Coming soon" signal color), differentiating it from AfroVPN's Aurora-forward hero.

**② Supporting images**
- **Problem section:** restrained spot illustrations of broken/long payment chains (fragmented dotted lines, delay clocks) — abstract, not literal.
- **Approach (capabilities):** icon-led cards.
- **Trust band:** a calm professional shot — a finance/ops professional reviewing figures on a laptop in a modern African office; signals compliance maturity.

**③ Illustration style**
**Payment-flow** variant of NetworkMap: directional arrows, value tokens moving node-to-node across a subtle border line; clocks/coins as geometric glyphs. Helios-forward, Aurora as action accent.

**④ Icon usage**
Payments set (`CreditCard`, `Wallet`, `ArrowRightLeft`) + `ShieldCheck` for compliance. "Coming soon" badge in Helios.

**⑤ AI prompts**
```
HERO:
"A young African entrepreneur in a modern Accra studio-storefront, smiling
slightly while completing a payment on a smartphone, contemporary creative
workspace, warm daylight, products or a laptop visible, professional and
aspirational. Space for text on the right. [STYLE SUFFIX]"

PAYMENT FLOW (illustration):
"Geometric illustration of value moving as glowing tokens along directional
arrows between circular nodes, crossing a subtle dashed border line, warm-gold
(#F5C842) and burnt-orange (#FF6B35) on deep midnight background, thin precise
strokes, flat vector, fintech infographic, no text, no currency symbols."

TRUST / COMPLIANCE:
"An African finance professional reviewing data on a laptop in a bright modern
Johannesburg office, focused and confident, glass-walled meeting room behind,
natural light, premium corporate-tech aesthetic. [STYLE SUFFIX]"
```

---

## 8. DreamAssets (`/dreamassets`) — Coming Soon

**Role:** vision + waitlist for digital assets. Must feel **secure, transparent, modern** — not crypto-hype.

**① Hero image**
A professional or young investor reviewing a portfolio/dashboard on a tablet or laptop in a calm, premium modern African interior (apartment or studio). Composite an **asset-lattice motif** (Helios/Aurora hexagonal nodes, growth lines). Deliberately understated and trustworthy — avoid neon "crypto" tropes, lambos, moon imagery.

**② Supporting images**
- **Problem:** abstract spots — exposed/unprotected node vs. secured node.
- **Capabilities:** icon-led cards.
- **Trust band:** reuse the calm professional/compliance register.

**③ Illustration style**
**Asset-lattice** variant: hexagonal node clusters (`Hexagon` icon echoed), layered "portfolio" stacks, upward growth lines. Transparent and orderly — clarity is the message.

**④ Icon usage**
Assets set (`Hexagon`, `Layers`, `TrendingUp`) + `ShieldCheck`. Helios "Coming soon" badge.

**⑤ AI prompts**
```
HERO:
"A composed young African professional reviewing a portfolio dashboard on a
tablet in a minimalist modern Kigali apartment, soft natural light, plants and
clean architecture, calm and premium, sense of quiet confidence — not flashy.
Space for text. [STYLE SUFFIX]"

ASSET LATTICE (illustration):
"Abstract geometric lattice of interconnected hexagonal nodes layered in
stacks with subtle upward growth lines, warm-gold and burnt-orange accents on
deep midnight background, transparent and orderly, thin precise strokes, flat
vector, no text, no currency or crypto symbols."
```

---

## 9. About (`/about`)

**Role:** humanize the company; prove it's real and mission-driven.

**① Hero image**
Wide, warm, human: a real (or realistic) **team/founder moment** in a modern African HQ — people building together, not posing. Authentic candid energy. Graded. This is the most "human pole" hero on the site.

**② Supporting images**
- **Story:** documentary-style candids — someone at a whiteboard, a pair debugging, a quiet focused portrait.
- **Mission/Vision cards:** spot NetworkMap motifs (kept light, since copy carries these).
- **Values grid:** typographic + optional tiny spot glyphs; no photos needed.
- **Company-facts block:** keep clean/typographic.

**③ Illustration style**
Light touch — humans lead here. Spot-scale motifs only, as accents.

**④ Icon usage**
Minimal. Values can use small line glyphs if desired, but restraint reads as confidence.

**⑤ AI prompts**
```
HERO:
"A candid wide shot of a diverse African tech team collaborating in a bright
modern headquarters, someone presenting at a glass whiteboard with sticky
notes, others engaged with laptops, genuine energy, large windows, plants,
warm natural light, premium startup culture. [STYLE SUFFIX]"

STORY CANDID:
"Documentary-style photo of two African developers pair-programming at a
desk, focused, one pointing at the screen, modern Lagos office, warm window
light, authentic and unposed. [STYLE SUFFIX]"
```

---

## 10. Pricing (`/pricing`)

**Role:** decision page. Visuals must **not distract** from plan comparison.

**① Hero image**
None / minimal. Optional faint NetworkMap fragment in the page-hero background under the Midnight tint. Keep it calm — clarity converts.

**② Supporting images**
- A single small reassurance row near checkout: payment/security badges (Paystack, Visa, Mastercard, Verve, SSL) as monochrome marks that gain color on hover (already in footer pattern).
- No lifestyle photography in the plan area.

**③ Illustration style**
Spot-scale only. A subtle node-divider between pricing and FAQ is enough.

**④ Icon usage**
`Check` (Aurora) for included features; `ShieldCheck`/lock near the payment reassurance line. Restraint is the directive.

**⑤ AI prompts**
```
BACKGROUND FRAGMENT (optional, very subtle):
"[MASTER ILLUSTRATION PROMPT], extremely subtle, low-opacity, confined to the
top-right corner, mostly empty midnight space."
```

---

## 11. FAQ (`/faq`)

**Role:** answer + deflect. Light mode body, readability first.

**① Hero image**
None. Page-hero is typographic on the dark gradient. Optional faint spot motif top-right.

**② Supporting images**
None in the list. Keep the accordion clean. An empty-search state can use a small spot illustration (a single node searching the mesh).

**③ Illustration style**
Spot-scale only — empty states and the optional hero corner.

**④ Icon usage**
`ChevronDown` (rotates on expand), `Search`, category indicators. Active category chip in Aurora.

**⑤ AI prompts**
```
EMPTY-STATE SPOT:
"Minimal geometric illustration of a single highlighted burnt-orange node
connected by thin lines to a faint cluster of grey nodes, deep midnight
background, lots of empty space, flat vector, no text. Calm, helpful."
```

---

## 12. Support (`/help` / Support) 

**Role:** reassure + route to help. Calm, organized, trustworthy.

**① Hero image**
Optional and understated: a friendly, real **support/ops professional** at a desk with a headset/laptop in a modern African office — or skip photography and stay typographic. If used, keep it warm and human, not call-center-stock.

**② Supporting images**
- **Category cards:** icon-led, no photos.
- **Ticket workflow:** the **"connection draw" motif as the connector line** between the 6 steps — on-brand way to visualize progress.
- **Status legend:** semantic color chips paired with text labels.

**③ Illustration style**
Section-scale connector motif for the workflow stepper; spot motifs elsewhere.

**④ Icon usage**
`Search`, `Send`, `SearchCheck`, `CheckCircle2` for the 4-step process; category icons (`Rocket`, `UserCog`, `CreditCard`, `Wifi`, `ShieldCheck`). Aurora accents.

**⑤ AI prompts**
```
HERO (optional):
"A friendly African customer-support specialist wearing a headset, smiling
naturally while working at a laptop in a bright modern office, warm light,
approachable and professional, not a generic call center. [STYLE SUFFIX]"

WORKFLOW CONNECTOR (illustration):
"A horizontal sequence of six circular nodes connected by a single glowing
burnt-orange line that 'draws' left to right, deep midnight background, thin
precise stroke, flat vector, no text. Progress, clarity."
```

---

## 13. Contact (`/contact`)

**Role:** prove reachability and legitimacy (Paystack-critical).

**① Hero image**
None / typographic. The credibility here comes from the **company-details block**, not a photo. Optional faint spot motif.

**② Supporting images**
- Optional: a single warm, real image of the team or HQ exterior/interior to reinforce "real company, real place."
- Optional lazy-loaded **map embed** of the registered address.
- Contact-route cards stay icon-led.

**③ Illustration style**
Spot-scale only.

**④ Icon usage**
Route icons (`LifeBuoy`, `Mail`, `Handshake`, `Newspaper`, `TrendingUp`) in Aurora. Form fields clean, no icon clutter.

**⑤ AI prompts**
```
OPTIONAL HQ / PLACE:
"A warm, inviting photo of a modern African tech office interior or building
entrance in daytime, glass and warm wood, plants, a few professionals walking,
premium and real, architectural photography style. [STYLE SUFFIX]"
```

---

## 14. Blog (`/blog` index + article)

**Role:** SEO + thought leadership. Visuals carry editorial credibility.

**① Hero image (article)**
Per-article cover at a consistent 16:9. Two acceptable modes:
1. **Editorial photo** graded to brand (preferred for human-interest pieces).
2. **Abstract NetworkMap composition** (preferred for infrastructure/privacy/payments topics) — use the per-topic illustration variants.
Index featured + cards currently use brand gradient placeholders; replace with these covers.

**② Supporting images**
- In-article figures: diagrams in the illustration system; graded photos where they add value, always with captions.
- Author avatar 1:1; related-post cards reuse the cover.

**③ Illustration style**
Topic-mapped:
- **Infrastructure** → full NetworkMap.
- **Privacy** → tunnel/shield-node.
- **Payments** → payment-flow.
- **Assets** → asset-lattice.
Consistent treatment so the blog feels like one publication.

**④ Icon usage**
`Clock` (read time), `ArrowRight` (read more), category as `Badge`. Reading-progress bar in Aurora (decorative, `aria-hidden`).

**⑤ AI prompts**
```
ARTICLE COVER — INFRASTRUCTURE:
"[MASTER ILLUSTRATION PROMPT], wide 16:9 composition, node clusters over
West and East Africa, dynamic but balanced, room for a title overlay."

ARTICLE COVER — PRIVACY (photo mode):
"Close-up of an African professional's hands using a smartphone in a dim warm
modern interior, screen glow on the face out of focus, sense of privacy and
security, cinematic, 16:9. [STYLE SUFFIX]"

ARTICLE COVER — PAYMENTS:
"[PAYMENT FLOW ILLUSTRATION], wide 16:9, value tokens crossing a subtle border,
warm-gold and burnt-orange on midnight, title-overlay space."
```

---

## 15. Legal Pages (`/legal/*`)

**Role:** complete, credible, readable. Light mode.

**① Hero image** — None. Typographic header with visible "Last updated" date.
**② Supporting images** — None. Whitespace and clear hierarchy are the design.
**③ Illustration style** — None (or an almost-invisible spot motif in the header corner). Restraint signals "nothing to hide."
**④ Icon usage** — Minimal: a small `AlertTriangle` on the review-note callout; sibling-policy links are text. No decorative icons in legal prose.
**⑤ AI prompts** — None required. Do not illustrate legal pages.

---

## 16. Imagery Production Checklist

Per asset, before it ships:

- [ ] Subject is modern, urban, African, professional — not a cliché or stereotype.
- [ ] Phone/laptop present where relevant (mobile-first reality).
- [ ] Graded to brand: warm lifted shadows, Aurora accent, no crushed blacks.
- [ ] Text only over a Midnight tint (40–60%); contrast AA verified.
- [ ] Hands, faces, screens, and any text reviewed (especially AI output) — artefacts removed.
- [ ] No safari, tribal-costume, poverty, Western-stock, or globe-of-Africa tropes.
- [ ] Correct aspect ratios exported; AVIF/WebP; width/height set; lazy-loaded below fold.
- [ ] Illustration uses only Midnight/Slate/Aurora/Helios and the geometric ruleset.
- [ ] Alt text written (honest, descriptive, keyword-aware where truthful).
- [ ] Licensing/model releases secured for any real photography.

---

## 17. Asset Manifest (maps to the codebase)

Drop graded, exported assets here; the build already references brand placeholders that these replace.

```
public/
├── og/
│   ├── default.png              1200×630  (home / fallback)
│   ├── afrovpn.png              1200×630
│   ├── dreampay.png             1200×630
│   └── dreamassets.png          1200×630
├── images/
│   ├── home-hero.avif           21:9 + 4:5 crop
│   ├── home-team.avif           16:9
│   ├── afrovpn-hero.avif        16:9
│   ├── about-hero.avif          16:9
│   ├── dreampay-hero.avif       16:9
│   └── dreamassets-hero.avif    16:9
├── illustrations/
│   ├── network-map-hero.svg     (Lottie: network-map-hero.json)
│   ├── tunnel.svg
│   ├── payment-flow.svg
│   ├── asset-lattice.svg
│   └── workflow-connector.svg
└── blog/
    └── <slug>-cover.avif        16:9 per article
```

**Integration note:** swap the gradient placeholder `<div aria-hidden>` blocks in `blog/page.tsx`, `blog/[slug]`, and the product heroes for graded `next/image` assets from this manifest. Keep explicit width/height, `priority` on above-the-fold heroes only, and descriptive `alt`.

---

*End of document — Dreamscape Systems Visual & Imagery Guidelines v1.0*
