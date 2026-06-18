# Dreamscape Systems — UI Design Specification

**Document type:** UI / UX Design Specification
**Version:** 1.0
**Date:** 18 June 2026
**Author:** Senior Product Designer
**Basis:** Approved Website Architecture (v1.0) + Brand Design Guide (v1.0)

---

## 0. How to Read This Document

This is the build-ready bridge between the Information Architecture and the front-end implementation. It is organized as:

1. **Foundations** (§1–§7) — the global system every page inherits: grid, breakpoints, design tokens, core components, accessibility, SEO, and performance budgets. **Read this first.** Page specs assume it.
2. **Page specifications** (§8–§15) — each page provides a wireframe, component hierarchy, section-by-section descriptions, user interactions, and visual guidance.

**Wireframe legend (used throughout):**
```
┌─┐  container / section boundary      [Button]   button
│ │  content block                     {Input}    form field
═══  primary divider / hero edge       ▸ / ▾      disclosure (collapsed / expanded)
░░░  media / illustration zone         ◉ ◯        active / inactive state
→    link or navigation                ★          trust signal / badge
```

Wireframes are drawn **mobile-first** (single column, ~375px) with a **desktop note** describing how the layout reflows at ≥1024px.

---

## 1. Design Principles

These five principles resolve every design decision. When in doubt, defer to them in order.

1. **Trust is the interface.** Every screen must make the company feel real, accountable, and safe. Visible legal entity, security cues, and plain language beat decoration.
2. **Mobile-first, always.** Africa is mobile-first. We design the 375px experience first and enhance upward — never the reverse.
3. **Clarity over cleverness.** One primary action per screen. Generous whitespace. No interaction the user has to learn.
4. **Premium through restraint.** Quality is signaled by typography, spacing, motion discipline, and consistency — not effects. Think Stripe, not a template.
5. **Fast is a feature.** Performance is a design constraint, not an afterthought. Every visual decision is weighed against its load cost.

---

## 2. Responsive Grid & Breakpoints

### 2.1 Breakpoints

| Token | Min width | Target devices | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| `xs` | 0px | Small phones | 4 | 16px | 16px |
| `sm` | 480px | Large phones | 4 | 16px | 24px |
| `md` | 768px | Tablets | 8 | 24px | 32px |
| `lg` | 1024px | Laptops | 12 | 24px | 48px |
| `xl` | 1280px | Desktops | 12 | 32px | auto (max 1200px content) |
| `2xl` | 1536px | Large displays | 12 | 32px | auto (max 1280px content) |

### 2.2 Layout rules

- **Max content width:** 1200px (1280px on `2xl`), centered. Full-bleed backgrounds permitted; content stays in the grid.
- **Spacing system:** 8pt grid. Use tokens `--space-1` (4px) through `--space-24` (96px) from the Brand Guide. Vertical section rhythm: 64px mobile, 96–128px desktop.
- **Touch targets:** minimum 44×44px (WCAG 2.5.5). Spacing between targets ≥ 8px.
- **Reading measure:** body text max ~70 characters per line (`max-width: 65ch`).

---

## 3. Design Tokens (inherited from Brand Guide)

Reference only — full definitions live in `BRAND-DESIGN-GUIDE.md` Appendix A.

```
COLOR        Midnight #0A0F1E · Aurora #FF6B35 · Helios #F5C842 · Quartz #F8F9FC
             Slate 100–900 neutral scale · semantic success/warning/error/info
TYPE         Display: Syne (700/800) · Body/UI: Inter (400/500/600) · Mono: JetBrains Mono
SCALE        Major Third (1.250) — Display-2XL 72px → Caption 12px
RADIUS       sm 4 · md 8 · lg 12 · xl 16 · full 9999
SHADOW       sm/md/lg (Midnight-tinted) · aurora-glow for accent emphasis
MODE         Dark mode is default. Light mode fully specified for legal/docs.
```

**Mode usage by page:**
- **Dark (default):** Home, AfroVPN, Product, Blog index, Contact hero.
- **Light:** Legal pages, FAQ body, Help/Support articles, Blog article body (better long-form readability).
- Every page respects `prefers-color-scheme` and offers a manual toggle persisted in `localStorage`.

---

## 4. Global Components

These components are shared across pages. Page specs reference them by name.

### 4.1 Top Navigation (`<SiteHeader>`)

```
MOBILE (<1024px)                          DESKTOP (≥1024px)
┌────────────────────────────┐           ┌──────────────────────────────────────────────┐
│ ◉ Dreamscape        [☰]    │           │ ◉ Dreamscape  Products▾ Pricing Company▾      │
└────────────────────────────┘           │              Resources▾      [Log in][Get AfroVPN]│
                                          └──────────────────────────────────────────────┘
```

**Hierarchy:**
```
SiteHeader
├── Logo (link → /)            [Orbit-D mark + wordmark; mark-only < 360px]
├── DesktopNav (≥1024px)
│   ├── NavDropdown "Products"  → mega-menu (AfroVPN/DreamPay/DreamAssets)
│   ├── NavLink "Pricing"
│   ├── NavDropdown "Company"
│   └── NavDropdown "Resources"
├── HeaderActions
│   ├── ThemeToggle
│   ├── TextLink "Log in"
│   └── Button (primary) "Get AfroVPN"
└── MobileMenu (<1024px)        [full-screen overlay drawer]
```

**Behavior & interactions:**
- **Sticky** on scroll; gains a 1px bottom border + subtle backdrop blur (`backdrop-filter`) and Midnight/90% background once scrolled > 8px.
- **Mega-menu (desktop):** opens on hover AND focus; closes on `Esc`, outside click, or blur. Animated open 200ms ease-out. Each product row shows status badge (Live / Coming soon).
- **Mobile drawer:** hamburger toggles a full-screen overlay; focus trapped inside; body scroll locked; `Esc` and overlay tap close it. Accordion sections for Products/Company/Resources. Primary CTA pinned at bottom.
- **Active state:** current section link shows Aurora underline.

**Visual:** Midnight background, Quartz text, Aurora primary button. Logo mark always full-color. 64px tall mobile, 72px desktop.

**Accessibility:** `<nav aria-label="Primary">`; dropdowns use `aria-expanded`, `aria-controls`, roving `Tab`/arrow keys; mobile drawer is `role="dialog" aria-modal="true"` with a labelled close button.

---

### 4.2 Footer (`<SiteFooter>`) — the trust backbone

```
┌─────────────────────────────────────────┐
│ PRODUCTS   COMPANY   RESOURCES   LEGAL    │  (4 cols desktop / stacked accordion mobile)
│ AfroVPN    About     Help        Terms    │
│ Pricing    Leadership Guides     Privacy  │
│ DreamPay   Careers   Blog        Refund   │
│ DreamAssets Press    Security    Cookies  │
│            Contact   Status      AUP      │
│            Investors                      │
├─────────────────────────────────────────┤
│ Dreamscape Systems Ltd · RC [number]      │
│ [Registered address] · [email] · [phone]  │
│ ★Paystack ★Visa ★Mastercard ★Verve ★SSL   │
│ © 2026 Dreamscape Systems  [☾ theme]      │
└─────────────────────────────────────────┘
```

**Hierarchy:** `SiteFooter → FooterColumns[4] → FooterLinkList → CompanyLegalBlock → PaymentBadges → BottomBar`.

**Behavior:** On mobile, the four columns become tappable accordions (collapsed by default) to save vertical space; the legal/credibility block stays always-visible below them.

**Visual:** Deep Midnight (`Slate-900`), Slate-400 links → Quartz on hover, Aurora focus ring. Payment badges in monochrome that gain color on hover.

**Why it matters:** This is the single most important component for Paystack approval and trust — registered name, RC number, address, email, phone, and policy links must be present on **every** page, visible without login.

---

### 4.3 Reusable building blocks

| Component | Purpose | Key states |
|---|---|---|
| `<Button>` | Primary (Aurora), Secondary (outline), Ghost, Destructive | default / hover / active / focus-visible / loading / disabled |
| `<Card>` | Feature, product, pricing, article surfaces | rest / hover-raise / focus-within |
| `<Badge>` | "Live", "Coming soon", "Best value" | static |
| `<Accordion>` | FAQ, mobile footer, mobile nav | collapsed / expanded |
| `<Input>` / `<Select>` / `<Textarea>` | Forms | default / focus / error / disabled / valid |
| `<Tabs>` | Pricing interval, doc categories | active / inactive |
| `<Toast>` | Form/async feedback | success / error / info |
| `<Breadcrumbs>` | Sub-page orientation + SEO | — |
| `<StatBlock>` | Trust metrics | count-up on scroll-in |
| `<NetworkMapMotif>` | Brand illustration (hero/section) | static / animated draw-on |
| `<CTASection>` | Repeated conversion band | — |

**Universal interaction rules:**
- **Focus-visible:** 2px Aurora ring, 2px offset, on every interactive element.
- **Hover (pointer devices only):** elevation +1 shadow tier and/or 150ms color transition. Disabled under `prefers-reduced-motion`.
- **Motion:** entrance reveals 300ms ease-out, staggered 50ms; all motion respects `prefers-reduced-motion: reduce` (collapses to instant).
- **Loading:** buttons show inline spinner + `aria-busy`; content areas use skeletons, never spinners-only.

---

## 5. Accessibility Standard (WCAG 2.1 AA)

Applied to every page; not repeated in page specs.

- **Contrast:** text ≥ 4.5:1, large text/UI ≥ 3:1. Aurora-on-Midnight verified 7.2:1. Never use color as the sole information carrier (badges pair color with text/icon).
- **Semantics:** one `<h1>` per page; logical heading order; landmarks (`header`, `nav`, `main`, `footer`); lists for grouped links.
- **Keyboard:** every interaction operable without a mouse; visible focus; logical tab order; skip-to-content link as first focusable element.
- **Forms:** programmatic `<label>` for every field; errors announced via `aria-live="polite"`, linked with `aria-describedby`; never rely on placeholder as label.
- **Media:** meaningful images have `alt`; decorative images `alt=""`; icons that convey meaning have accessible names; no autoplay audio.
- **Motion:** honor `prefers-reduced-motion`; no content flashing > 3×/sec.
- **Targets:** ≥ 44×44px, ≥ 8px apart.
- **Language:** `lang` attribute set; plain language in legal copy where possible.

---

## 6. SEO Specification

Applied globally.

- **One `<h1>` per page**, keyword-bearing; semantic `<h2>/<h3>` outline.
- **Metadata per page:** unique `<title>` (≤ 60 chars), `meta description` (≤ 155 chars), canonical URL, Open Graph + Twitter card with branded OG image template (1200×630).
- **Structured data (JSON-LD):** `Organization` (sitewide), `Product`+`Offer` (AfroVPN/pricing), `FAQPage` (FAQ), `BreadcrumbList` (sub-pages), `Article` (blog/help), `SoftwareApplication` (apps).
- **Semantic HTML5** throughout; descriptive link text (no "click here"); `alt` text doubles as keyword surface where honest.
- **Performance = ranking:** Core Web Vitals targets in §7.
- **Crawlability:** XML sitemap, robots.txt, clean URLs (per IA §10), internal links blog → product → pricing.
- **Rendering:** SSR/SSG (e.g., Next.js/Astro) so content is in the initial HTML, not JS-dependent.

---

## 7. Performance Budget

| Metric | Target | Technique |
|---|---|---|
| **LCP** | < 2.0s (mobile 4G) | SSG, hero text as real text (not image), preloaded fonts |
| **CLS** | < 0.1 | Reserved media dimensions, font-display swap with metric-matched fallback |
| **INP** | < 200ms | Minimal JS, hydrate islands only |
| **Total JS (initial)** | < 120KB gzipped | Island architecture, code-split routes |
| **Fonts** | 3 families, subset + `woff2`, `font-display: swap`, self-hosted | Preload Syne + Inter |
| **Images** | AVIF/WebP, responsive `srcset`, lazy-load below fold, explicit width/height | — |
| **Illustration** | Inline SVG (small) or Lottie (lazy, paused under reduced-motion) | — |

Hero and above-the-fold content are never lazy-loaded. Everything below the fold is.

---

# PAGE SPECIFICATIONS

---

## 8. Homepage (`/`)

**Goal:** Establish the corporate infrastructure narrative AND funnel to AfroVPN. **Mode:** Dark. **Template:** Corporate/Marketing.

### 8.1 Wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │  ← sticky header
╞══════════════════════════════╡
│ ░░░ NetworkMap motif ░░░      │
│                               │
│ AFRICAN DIGITAL INFRASTRUCTURE│  ← eyebrow
│ The infrastructure for        │  ← H1 (Syne)
│ Africa's place in the         │
│ global economy.               │
│                               │
│ Dreamscape builds the digital │  ← subhead
│ foundations…                  │
│                               │
│ [ Get AfroVPN → ]             │  ← primary CTA
│ Explore our vision →          │  ← secondary
│                               │
│ ★40+ countries ★No-logs ★Secure│ ← trust strip
╞══════════════════════════════╡
│ WHY WE EXIST                  │
│ Africa isn't behind. It's     │  ← mission H2
│ been building without the     │
│ foundations.                  │
│ [body copy]                   │
│ "Our products are the roads…" │  ← pull quote
╞══════════════════════════════╡
│ WHAT SETS US APART            │
│ ┌──────────┐  (4 feature      │
│ │ ▣ Security│   cards stacked  │
│ │ by default│   on mobile,     │
│ └──────────┘   2×2 desktop)   │
│ ┌──────────┐                  │
│ │ ▣ African-│                  │
│ │ first…    │                  │
│ └──────────┘  …(×4)           │
╞══════════════════════════════╡
│ THE DREAMSCAPE PLATFORM       │
│ ┌──────────────────────────┐  │
│ │ AfroVPN        [Live]     │  │  ← product cards
│ │ Private, fast internet    │  │
│ │ Explore AfroVPN →         │  │
│ └──────────────────────────┘  │
│ ┌──────────────────────────┐  │
│ │ DreamPay   [Coming soon]  │  │
│ │ Join the waitlist →       │  │
│ └──────────────────────────┘  │
│ ┌──────────────────────────┐  │
│ │ DreamAssets [Coming soon] │  │
│ └──────────────────────────┘  │
╞══════════════════════════════╡
│ WHY PEOPLE TRUST DREAMSCAPE   │
│ [4 trust pillars, stacked]    │
│ ┌───┬───┬───┬───┐ StatBlock   │
│ │40+│256│ 0 │24/7│            │
│ └───┴───┴───┴───┘             │
╞══════════════════════════════╡
│ ░░ Start with private internet░│  ← final CTA band
│ [ Get AfroVPN ] [Talk to team]│
│ Cancel anytime · 7-day refund │
╞══════════════════════════════╡
│ FOOTER (trust backbone)       │
└──────────────────────────────┘
```

**Desktop reflow (≥1024px):** Hero becomes two-column (copy left ~6 cols, animated NetworkMap right ~6 cols). Feature cards → 2×2 then 4-across at `xl`. Platform product cards → 3-across. Trust pillars → 4-across with StatBlock as a full-width band.

### 8.2 Component hierarchy

```
HomePage
├── SiteHeader
├── main
│   ├── HeroSection
│   │   ├── Eyebrow · H1 · Subhead
│   │   ├── CTAGroup [Button primary, TextLink secondary]
│   │   ├── TrustStrip [Badge ×3]
│   │   └── NetworkMapMotif (animated, decorative)
│   ├── MissionSection [Eyebrow · H2 · Body · PullQuote]
│   ├── FeaturesSection → FeatureCard ×4 [Icon · H3 · Body]
│   ├── PlatformSection → ProductCard ×3 [Name · Badge · Desc · Link]
│   ├── TrustSection → TrustPillar ×4 + StatBlock ×4
│   └── CTASection (final) [H2 · Body · CTAGroup · ReassuranceLine]
└── SiteFooter
```

### 8.3 Section descriptions

- **Hero:** The single most important viewport. Real text H1 (for LCP + SEO), not an image. NetworkMap motif animates a "connection draw" once on load (skipped under reduced-motion). Primary CTA is the only Aurora element above the fold — it should be the eye's destination.
- **Mission:** Narrative anchor. Generous line height, max 65ch measure. Pull quote in Helios-accented Syne.
- **Features:** Four differentiators as scannable cards. Precision-line icons in Aurora. Equal-height cards.
- **Platform:** Demonstrates the multi-product thesis (investor signal). Status badges set honest expectations. AfroVPN card is visually emphasized (Aurora border accent); future products are calmer (Slate border).
- **Trust:** Converts skepticism. Pillars are concrete claims; StatBlock numbers count up on scroll-into-view.
- **Final CTA:** Last conversion push with risk-reversal microcopy.

### 8.4 User interactions

- Hero CTA → `/auth/signup` (or `/pricing`); secondary → `/company/vision`.
- NetworkMap: subtle parallax on scroll (pointer + motion-allowed only).
- Feature/product cards: hover raise (+shadow), entire card is a click target where it links.
- StatBlock: `IntersectionObserver` triggers count-up animation once; respects reduced-motion (shows final value instantly).
- All section reveals: fade-up 300ms, staggered, one-time.

### 8.5 Visual guidance

Midnight canvas with one Aurora focal point per section (CTA or icon accent). Whitespace-led; sections separated by rhythm, not heavy dividers. NetworkMap uses Aurora/Helios nodes at low opacity so it never competes with text. Premium feel comes from type scale contrast (72px Syne H1 against 16px Inter body) and disciplined spacing.

---

## 9. Product Page Template (Generic) + DreamPay / DreamAssets (`/dreampay`, `/dreamassets`)

**Goal:** Communicate vision for "Coming soon" products and capture waitlist emails (also an investor demand signal). **Mode:** Dark. **Template:** Coming-soon/Waitlist + Product.

### 9.1 Wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │
╞══════════════════════════════╡
│ DREAMPAY · COMING SOON  ★     │  ← status eyebrow + Badge
│ Money that moves the          │  ← H1
│ way you do.                   │
│ [value subhead]               │
│                               │
│ {Enter your email}  [Join →]  │  ← waitlist capture (primary)
│ Be first to know. No spam.    │  ← microcopy
│ ░░ NetworkMap (payments) ░░    │
╞══════════════════════════════╡
│ THE PROBLEM                   │
│ [3 problem statements w/icons]│
╞══════════════════════════════╡
│ OUR APPROACH                  │
│ [3–4 capability cards]        │
│ ▣ Cross-border  ▣ Low cost    │
│ ▣ Compliant     ▣ Secure      │
╞══════════════════════════════╡
│ BUILT ON TRUST                │
│ [compliance/security note +   │
│  link to security center]     │
╞══════════════════════════════╡
│ ░ Join the waitlist ░          │  ← repeat capture
│ {email} [Join the waitlist →] │
╞══════════════════════════════╡
│ FOOTER                        │
└──────────────────────────────┘
```

**Desktop reflow:** Hero two-column (copy + inline waitlist form left, motif right). Problem/approach sections become 3–4 column grids.

### 9.2 Component hierarchy

```
ProductPage (waitlist variant)
├── SiteHeader
├── main
│   ├── ProductHero [Eyebrow+Badge · H1 · Subhead · WaitlistForm · Motif]
│   ├── ProblemSection → ProblemCard ×3
│   ├── ApproachSection → CapabilityCard ×4
│   ├── TrustNote [Body · Link → /security]
│   └── WaitlistCTASection → WaitlistForm
└── SiteFooter
```

### 9.3 Section descriptions

- **Hero:** Status is unmissable (eyebrow + badge) — honesty is the brand. Waitlist form is the primary action, inline above the fold.
- **Problem:** Names the real friction (cross-border cost, delays) the user feels — empathy before solution.
- **Approach:** What the product will do, framed as capabilities, not promises with dates.
- **Trust note:** Critical for a future payments product — signals compliance/security maturity, links to `/security`.
- **Repeat CTA:** Second capture for users who scrolled to the end.

### 9.4 User interactions

- **WaitlistForm:** single email field + button. Inline validation (valid email pattern) on blur. On submit: button → loading → success state (field replaced by "✓ You're on the list"). Errors via `aria-live`. Double-submit guarded.
- Smooth-scroll anchor from hero microcopy to bottom form optional.

### 9.5 Visual guidance

Same Midnight system. Because there's no live product UI to show, the **NetworkMap motif carries the visual weight** — themed per product (payment nodes for DreamPay, asset/hexagon nodes for DreamAssets). Calmer Aurora usage than the homepage; the waitlist button is the focal accent. "Coming soon" badge in Helios to differentiate from "Live" (Aurora/Success).

---

## 10. AfroVPN Landing Page (`/afrovpn`)

**Goal:** Primary conversion — turn visitors into subscribers. **Mode:** Dark. **Template:** Product.

### 10.1 Wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │
╞══════════════════════════════╡
│ AFROVPN · AVAILABLE NOW       │
│ Your internet. Private,       │  ← H1
│ fast, and yours.              │
│ [subhead]                     │
│ [ Get AfroVPN → ] [See pricing]│
│ ★No-logs ★256-bit ★7-day refund│
│ ░░ App UI / device mockup ░░   │
╞══════════════════════════════╡
│ WHAT IS AFROVPN               │
│ [overview body + simple       │
│  tunnel diagram illustration] │
╞══════════════════════════════╡
│ FEATURES                      │
│ [8 features, icon+title+body, │
│  stacked → 2-col → 4-col]     │
╞══════════════════════════════╡
│ WHY IT MATTERS (BENEFITS)     │
│ [5 benefit rows, alternating  │
│  icon/text on desktop]        │
╞══════════════════════════════╡
│ WHO IT'S FOR (USE CASES)      │
│ [5 use-case cards, horizontal │
│  scroll on mobile / grid desktop]│
╞══════════════════════════════╡
│ SECURITY & PRIVACY            │
│ ┌─ How we protect you ─┐      │
│ │ • AES-256 • Kill switch│     │
│ │ • DNS leak protection │      │
│ └───────────────────────┘     │
│ ┌─ Our no-logs promise ─┐     │
│ │ ✗ No browsing history │      │
│ │ ✗ No IP logging …     │      │
│ └───────────────────────┘     │
│ "A VPN that logs isn't…" quote│
╞══════════════════════════════╡
│ PRICING                       │
│ [Monthly│Annual│2-Year] tabs  │
│ ┌──────────────────────────┐  │
│ │ Annual    ★Best value     │  │  ← featured plan
│ │ [price] /yr               │  │
│ │ ✓ all features…           │  │
│ │ [ Get started ]           │  │
│ └──────────────────────────┘  │
│ All plans include: […]        │
│ ★Paystack secure · refund link│
│ [pricing mini-FAQ accordion]  │
╞══════════════════════════════╡
│ ░ Take back your connection ░  │  ← final CTA
│ [ Get AfroVPN ] [Compare plans]│
╞══════════════════════════════╡
│ FOOTER                        │
└──────────────────────────────┘
```

**Desktop reflow:** Hero two-column (copy + device mockup). Features 4-across. Benefits alternate left/right image+text rows. Use cases 3-across grid. Security two-column (protect / no-logs). Pricing three plan cards side-by-side with the middle (Annual) elevated.

### 10.2 Component hierarchy

```
AfroVPNPage
├── SiteHeader
├── main
│   ├── ProductHero [Eyebrow+Badge · H1 · Subhead · CTAGroup · TrustStrip · DeviceMockup]
│   ├── OverviewSection [H2 · Body · TunnelDiagram]
│   ├── FeatureGrid → FeatureCard ×8
│   ├── BenefitsSection → BenefitRow ×5
│   ├── UseCaseSection → UseCaseCard ×5 (scroll-snap mobile)
│   ├── SecuritySection
│   │   ├── ProtectionList · NoLogsList · PullQuote
│   ├── PricingSection
│   │   ├── IntervalTabs [Monthly/Annual/2-Year]
│   │   ├── PricingCard ×3 (Annual featured)
│   │   ├── IncludedList · PaymentReassurance [★badges + refund link]
│   │   └── PricingMiniFAQ → Accordion ×3
│   └── CTASection (final)
└── SiteFooter
```

### 10.3 Section descriptions

- **Hero:** Conversion-optimized. Two Aurora actions allowed (Get / See pricing) but "Get AfroVPN" is visually dominant. Device mockup shows the real one-tap connected state — product as proof.
- **Overview:** Demystifies "what is a VPN" with a simple tunnel diagram (SEO value: targets informational intent).
- **Features (8):** Scannable grid, equal-height cards, Aurora precision icons.
- **Benefits (5):** Reframes features as outcomes; alternating layout on desktop adds rhythm.
- **Use cases (5):** Mobile uses horizontal scroll-snap carousel (thumb-friendly); desktop grid.
- **Security:** The trust crux for a VPN. Two explicit lists — what we DO (protect) and what we DON'T (log), the latter using ✗ marks for emphasis. Plain-language no-logs is a conversion driver.
- **Pricing:** Decision point. Interval tabs let users self-select; Annual pre-selected and badged "Best value" (anchoring). Payment badges + refund link kill purchase anxiety and serve Paystack review. Mini-FAQ pre-empts top objections (cancel, auto-renew, methods).
- **Final CTA:** Risk-reversal close.

### 10.4 User interactions

- **IntervalTabs:** toggles prices across the three cards instantly (no reload); selected tab Aurora-underlined; keyboard arrow-navigable (`role="tablist"`).
- **PricingCard CTA** → `/auth/signup?plan={id}&interval={interval}` carrying selection into checkout.
- **UseCase carousel (mobile):** scroll-snap, swipeable, pagination dots; arrow buttons on desktop.
- **Mini-FAQ accordions:** single-open, animated height, `aria-expanded`.
- **Sticky mobile CTA (optional):** a slim "Get AfroVPN — [price]" bar appears after hero scrolls out, hides near footer.

### 10.5 Visual guidance

Most conversion-dense page, so Aurora is used deliberately at each decision point (hero CTA, featured plan, final CTA) and restrained elsewhere. Featured Annual plan gets Aurora border + subtle aurora-glow shadow to draw the eye. Security section may shift to a slightly darker `Slate-900` panel to feel "vault-like." Device mockup and tunnel diagram follow Brand Guide illustration rules (geometric, Aurora/Helios only).

---

## 11. FAQ Page (`/faq`)

**Goal:** Answer objections, deflect support, win long-tail SEO (`FAQPage` schema). **Mode:** Light body on dark header. **Template:** Help/Doc.

### 11.1 Wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │
╞══════════════════════════════╡
│ HELP & FAQ                    │
│ Questions, answered.          │  ← H1
│ {🔍 Search questions…}        │  ← live filter
╞══════════════════════════════╡
│ Jump to: About · AfroVPN ·    │  ← category chips (sticky)
│ Privacy · Billing · …         │
╞══════════════════════════════╡
│ ABOUT DREAMSCAPE              │
│ ▸ What is Dreamscape Systems? │  ← Accordion items
│ ▸ Is it a registered company? │
│ …                             │
│ AFROVPN — GENERAL             │
│ ▸ What is AfroVPN?            │
│ ▾ How does a VPN work?        │  ← expanded
│   [answer body…]              │
│ …                             │
│ [category groups continue]    │
╞══════════════════════════════╡
│ Still have a question?        │  ← contact CTA band
│ [ Contact our team → ]        │
╞══════════════════════════════╡
│ FOOTER                        │
└──────────────────────────────┘
```

**Desktop reflow:** Two-column — sticky category nav (left ~3 cols) + accordion list (right ~9 cols). Search spans the top.

### 11.2 Component hierarchy

```
FAQPage
├── SiteHeader
├── main
│   ├── FAQHero [H1 · Subhead · SearchInput]
│   ├── CategoryNav (sticky) → CategoryChip / CategoryLink ×6
│   ├── FAQGroups → FAQGroup ×6 → FAQItem(Accordion) ×N
│   └── ContactCTASection
└── SiteFooter
```

### 11.3 Section descriptions

- **Search:** Client-side instant filter across question + answer text; highlights matches; shows "no results → contact us" empty state.
- **Category nav:** Anchors to groups; on desktop it's a sticky sidebar with scroll-spy highlighting the active group.
- **FAQ groups:** Mirror the 6 content categories (35 Q&As). Each item is an accordion; answers contain real internal links (to Privacy, Refund, Pricing) for SEO + navigation.
- **Contact CTA:** Catches the unanswered.

### 11.4 User interactions

- **Accordion:** click/`Enter`/`Space` toggles; animated height; multiple can be open; `aria-expanded` + `aria-controls`; first item of first group may be open by default.
- **Search:** debounced (150ms) filter; collapses empty groups; `aria-live` count ("12 results").
- **Deep-linking:** each FAQ item has an `id`; landing on `/faq#how-vpn-works` auto-expands and scrolls to it.
- **Scroll-spy:** updates active category chip as user scrolls.

### 11.5 Visual guidance

Light mode (Quartz bg, Midnight text) for long-form readability. Generous vertical spacing between items; chevron rotates 180° on expand. Active category chip in Aurora. Keep answers in comfortable 65ch measure. `FAQPage` JSON-LD emitted from the same data source.

---

## 12. Support Page (`/help` / Support Center)

**Goal:** Self-service first, clear path to human help, set response expectations. **Mode:** Light. **Template:** Help hub.

### 12.1 Wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │
╞══════════════════════════════╡
│ SUPPORT                       │
│ We're here when you need us.  │  ← H1
│ {🔍 Search the Help Center…}  │
│ [ Contact support → ]         │
╞══════════════════════════════╡
│ WHAT DO YOU NEED HELP WITH?   │
│ ┌────────┐ ┌────────┐         │
│ │▣Getting │ │▣Account │  (cat- │
│ │ started │ │ & login │  egory │
│ └────────┘ └────────┘  cards) │
│ ┌────────┐ ┌────────┐         │
│ │▣Billing │ │▣Connect.│        │
│ └────────┘ └────────┘         │
│ ┌────────┐                    │
│ │▣Privacy │                   │
│ └────────┘                    │
╞══════════════════════════════╡
│ HOW SUPPORT WORKS             │
│ ① Search → ② Submit →         │  ← 4-step process
│ ③ Investigate → ④ Resolve     │
╞══════════════════════════════╡
│ TICKET WORKFLOW               │
│ [6-stage vertical stepper]    │
│ Status legend: Open/In prog./ │
│ Awaiting/Resolved/Closed      │
╞══════════════════════════════╡
│ CONTACT & HOURS               │
│ [channel table + response time]│
│ ★ System Status → /status     │
╞══════════════════════════════╡
│ Still need a hand?  [Contact] │
╞══════════════════════════════╡
│ FOOTER                        │
└──────────────────────────────┘
```

**Desktop reflow:** Category cards 3-across; process steps horizontal; ticket workflow horizontal stepper or 2-column.

### 12.2 Component hierarchy

```
SupportPage
├── SiteHeader
├── main
│   ├── SupportHero [H1 · Subhead · SearchInput · Button "Contact support"]
│   ├── CategoryGrid → SupportCategoryCard ×5 [Icon · Title · Examples · Link]
│   ├── ProcessSection → ProcessStep ×4
│   ├── TicketWorkflowSection → WorkflowStep ×6 + StatusLegend
│   ├── ContactInfoSection [ChannelTable · ResponseTime · StatusLink]
│   └── ContactCTASection
└── SiteFooter
```

### 12.3 Section descriptions

- **Hero:** Search-first (most users want an answer, not a form), with a parallel "Contact support" for those who need a human.
- **Category grid:** Five routes from the content (getting started, account, billing, connection, privacy), each with example topics and a link into Help articles.
- **Process:** Sets expectations of how help works (4 steps).
- **Ticket workflow:** Transparency builder — a 6-stage stepper plus a status legend so users understand where their ticket sits. Reinforces "real company, real process."
- **Contact info:** Channels, hours, response-time promise, and a link to System Status (deflects "is it down?" tickets).

### 12.4 User interactions

- Search → filters/links to Help articles.
- Category cards: full-card click target; hover raise.
- Workflow stepper: static informational; on desktop may animate connect-line on scroll-in.
- "Contact support" → `/contact` (pre-filtered to Support topic).

### 12.5 Visual guidance

Light, calm, reassuring. Category cards use precision-line icons in Aurora. The 6-stage workflow uses the brand's "connection draw" motif as the connector line between steps — an on-brand way to visualize progress. Status legend uses semantic colors paired with text labels (never color alone).

---

## 13. Contact Page (`/company/contact`)

**Goal:** Make the company reachable and verifiably real (Paystack-critical). **Mode:** Dark hero → light form area acceptable. **Template:** Contact.

### 13.1 Wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │
╞══════════════════════════════╡
│ CONTACT                       │
│ Let's talk.                   │  ← H1
│ [subhead]                     │
╞══════════════════════════════╡
│ CHOOSE THE BEST WAY           │
│ ┌──────────────────────────┐  │
│ │ ▣ Customer support        │  │  ← contact-route cards
│ │ support@…  [Help Center→] │  │
│ └──────────────────────────┘  │
│ [General · Partnerships ·     │
│  Press · Investors cards]     │
╞══════════════════════════════╡
│ SEND US A MESSAGE             │
│ {Full name}                   │
│ {Email}                       │
│ {What's this about? ▾}        │
│ {Subject}                     │
│ {Message …}                   │
│ ☐ I agree to the Privacy Policy│
│ [ Send message ]              │
│ We respond within 24 hours.   │
╞══════════════════════════════╡
│ OUR DETAILS                   │
│ Dreamscape Systems Ltd.       │
│ RC [number] · [address]       │  ← ★ verifiable entity
│ [email] · [phone] · [hours]   │
│ ░ optional map embed ░         │
╞══════════════════════════════╡
│ Prefer self-help? [Help][FAQ] │
╞══════════════════════════════╡
│ FOOTER                        │
└──────────────────────────────┘
```

**Desktop reflow:** Two-column — form (left ~7 cols) + company details/contact cards (right ~5 cols). Contact-route cards in a 2–3 col grid above or beside.

### 13.2 Component hierarchy

```
ContactPage
├── SiteHeader
├── main
│   ├── ContactHero [Eyebrow · H1 · Subhead]
│   ├── ContactRoutes → ContactRouteCard ×5 [Icon · Title · Desc · Email/Link]
│   ├── ContactForm
│   │   ├── Input(name) · Input(email) · Select(topic)
│   │   ├── Input(subject) · Textarea(message)
│   │   ├── Checkbox(consent → Privacy Policy)
│   │   └── Button(submit) + status region
│   ├── CompanyDetails [EntityBlock · ChannelList · (MapEmbed)]
│   └── SelfHelpCTA [Help · FAQ links]
└── SiteFooter
```

### 13.3 Section descriptions

- **Contact routes:** Direct people to the right inbox (support/general/partnerships/press/investors) — reduces misrouted mail and signals an organized company.
- **Form:** Minimal required fields; topic dropdown routes server-side. Consent checkbox links Privacy Policy (NDPR/GDPR compliant).
- **Company details:** The Paystack-critical block — registered entity, RC number, physical address, email, phone, hours, optional map. This is what proves legitimacy.
- **Self-help CTA:** Deflects answerable questions.

### 13.4 User interactions

- **Form validation:** inline on blur (required, email format, message min-length); submit disabled until consent checked; errors linked via `aria-describedby` and announced `aria-live`.
- **Submit:** button → loading → success Toast + inline confirmation ("Thanks — we'll reply within 24 hours") and form reset; failure → error Toast with retry, preserving input.
- **Spam protection:** honeypot + (invisible) challenge; no impact on a11y.
- Email links use `mailto:`; phone uses `tel:`.

### 13.5 Visual guidance

Form area can switch to light for input legibility, or stay dark with Slate-800 fields — either way inputs have clear focus (Aurora ring) and visible labels (never placeholder-only). The company-details block is styled as a quiet, authoritative "card" — understated, factual, trustworthy. Map embed (if used) lazy-loaded.

---

## 14. Blog Page (`/blog` index + `/blog/{slug}` article)

**Goal:** SEO acquisition + thought leadership (infrastructure/privacy/African digital economy). **Mode:** Light. **Template:** Blog index + Blog post.

### 14.1 Index wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │
╞══════════════════════════════╡
│ BLOG / INSIGHTS               │
│ Building Africa's digital     │  ← H1
│ infrastructure, in the open.  │
╞══════════════════════════════╡
│ [All][Privacy][Payments][…]   │  ← category filter
╞══════════════════════════════╡
│ ┌──────────────────────────┐  │
│ │ ░ featured cover ░        │  │  ← featured post
│ │ PRIVACY · 6 min           │  │
│ │ Why Africa needs sovereign│  │
│ │ digital infrastructure    │  │
│ │ [excerpt] · author · date │  │
│ └──────────────────────────┘  │
│ ┌──────────┐ (post cards     │
│ │ ░ cover ░ │  stacked mobile,│
│ │ category  │  2–3 col desktop)│
│ │ Title     │                 │
│ │ excerpt   │                 │
│ │ author·date│                │
│ └──────────┘  …               │
│ [ Load more / pagination ]    │
╞══════════════════════════════╡
│ ░ Subscribe to updates ░       │  ← newsletter capture
│ {email} [ Subscribe ]         │
╞══════════════════════════════╡
│ FOOTER                        │
└──────────────────────────────┘
```

### 14.2 Article wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │
╞══════════════════════════════╡
│ Home › Blog › Privacy         │  ← breadcrumbs
│ PRIVACY · 6 min read          │
│ Why Africa needs sovereign    │  ← H1
│ digital infrastructure        │
│ ◉ Author · 18 Jun 2026        │
│ [share: 🔗 𝕏 in]              │
│ ░░ hero cover image ░░         │
╞══════════════════════════════╡
│ [reading-progress bar (top)]  │
│ Article body…                 │
│   ## Section heading          │
│   paragraph text (65ch)       │
│   > pull quote                │
│   - lists, code, images       │
│                               │
│ (desktop: sticky ToC + share  │
│  rail in left/right margin)   │
╞══════════════════════════════╡
│ ░ CTA: Get AfroVPN ░           │  ← in-content conversion
╞══════════════════════════════╡
│ RELATED ARTICLES [×3]         │
╞══════════════════════════════╡
│ Subscribe band                │
│ FOOTER                        │
└──────────────────────────────┘
```

**Desktop reflow:** Index → featured post full-width, then 3-col card grid. Article → centered 720px column with sticky table-of-contents + share rail in the left margin.

### 14.3 Component hierarchy

```
BlogIndexPage                          BlogArticlePage
├── SiteHeader                         ├── SiteHeader
├── main                               ├── main
│   ├── BlogHero [H1 · Subhead]        │   ├── Breadcrumbs
│   ├── CategoryFilter → Chip ×N       │   ├── ArticleHeader [Category·ReadTime·H1·
│   ├── FeaturedPost (PostCard lg)     │   │     AuthorMeta·ShareBar·CoverImage]
│   ├── PostGrid → PostCard ×N         │   ├── ReadingProgress
│   │     [Cover·Category·Title·       │   ├── TableOfContents (sticky, desktop)
│   │      Excerpt·AuthorMeta]         │   ├── ArticleBody (prose) [h2/h3·p·quote·
│   ├── Pagination / LoadMore          │   │     figure·code·callout]
│   └── NewsletterCTA                  │   ├── InContentCTA [Get AfroVPN]
└── SiteFooter                         │   ├── RelatedArticles → PostCard ×3
                                       │   └── NewsletterCTA
                                       └── SiteFooter
```

### 14.4 Section descriptions

- **Index hero + filter:** Sets editorial positioning; category chips filter the grid (client-side or routed `/blog/category/{slug}`).
- **Featured + grid:** One hero post, then a responsive card grid. Cards show category, read time, author, date — credibility signals.
- **Article header:** Breadcrumbs (SEO `BreadcrumbList`), category, read time, author with avatar, publish date, share bar. Cover image with explicit dimensions (CLS).
- **Article body:** Clean prose component — 720px measure, generous leading, styled h2/h3 (Syne), pull quotes (Helios), figures with captions, code in JetBrains Mono. `Article` JSON-LD.
- **Reading progress + ToC:** Orientation for long reads (desktop sticky ToC with scroll-spy).
- **In-content + related + newsletter:** Convert readers (to AfroVPN) and retain them (related posts, subscribe).

### 14.5 User interactions

- **Category filter:** updates grid; active chip Aurora; URL reflects filter for shareability/SEO.
- **PostCard:** full-card link; hover raises cover slightly (scale 1.02) + shadow.
- **ShareBar:** native Web Share API on mobile; copy-link with success Toast; X/LinkedIn intents on desktop.
- **ReadingProgress:** thin Aurora bar fills with scroll; `aria-hidden` (decorative).
- **ToC:** click scrolls to heading; scroll-spy highlights current section.
- **Newsletter:** same inline-form pattern as waitlist (validation → loading → success).

### 14.6 Visual guidance

Light, editorial, generous. Typography does the work: Syne headings, Inter body at 18px/1.75 for comfortable reading. Covers use a consistent aspect ratio (16:9) and the brand's geometric/NetworkMap art style where photography isn't available. Restrained Aurora — used for category accents, links, progress bar, and the in-content CTA only.

### 14.7 SEO note (Blog is the SEO engine)

Each article: unique title/description, canonical, OG image, `Article` schema (author, datePublished, image), semantic headings, descriptive alt text, internal links to `/afrovpn` and `/pricing`. Index paginated with crawlable links. Targets informational intent that funnels to product (per IA §7.2).

---

## 15. Legal Pages (`/legal/*`)

**Goal:** Complete, credible, readable policies (Paystack-critical + compliance). Covers Terms, Privacy, Cookie, Refund, Acceptable Use. **Mode:** Light. **Template:** Legal/Policy.

### 15.1 Wireframe (mobile)

```
┌──────────────────────────────┐
│ ◉ Dreamscape          [☰]    │
╞══════════════════════════════╡
│ Home › Legal › Privacy        │  ← breadcrumbs
│ Privacy Policy                │  ← H1
│ Last updated: 18 Jun 2026     │  ← ★ visible date
│ Effective: 18 Jun 2026        │
╞══════════════════════════════╡
│ [On this page ▾]              │  ← collapsible ToC (mobile)
│  1. Introduction              │
│  2. Who we are                │
│  …                            │
╞══════════════════════════════╡
│ ## 1. Introduction            │
│ body text (65ch, light)…      │
│ ## 2. Who We Are              │
│ Dreamscape Systems Ltd.       │
│ RC [number] · [address]       │  ← ★ entity details
│ …                             │
│ [Other policies:]             │
│ Terms · Cookie · Refund · AUP │  ← cross-links
╞══════════════════════════════╡
│ Questions? privacy@…  [Contact]│
╞══════════════════════════════╡
│ FOOTER                        │
└──────────────────────────────┘
```

**Desktop reflow:** Two-column — sticky ToC (left ~3 cols, scroll-spy) + policy body (right ~9 cols, max 720px measure).

### 15.2 Component hierarchy

```
LegalPage
├── SiteHeader
├── main
│   ├── Breadcrumbs
│   ├── LegalHeader [H1 · LastUpdated · EffectiveDate]
│   ├── TableOfContents (sticky desktop / Accordion mobile)
│   ├── PolicyBody (prose) [h2/h3 numbered · p · lists · tables]
│   ├── RelatedPolicies [cross-links to sibling legal docs]
│   └── PolicyContactBlock [relevant email · Contact link]
└── SiteFooter
```

### 15.3 Section descriptions

- **Header:** H1 + **visible "Last updated" and "Effective" dates** (trust + compliance requirement). Breadcrumbs for orientation/SEO.
- **Table of contents:** Numbered, anchor-linked; sticky on desktop with scroll-spy, collapsible accordion on mobile.
- **Policy body:** Numbered `<h2>` sections matching the content docs; plain-language prose; tables where helpful (e.g., cookie categories); entity details rendered prominently in the relevant section.
- **Related policies:** Cross-links between Terms/Privacy/Cookie/Refund/AUP so reviewers and users move easily across the cluster.
- **Contact block:** The relevant inbox (privacy@, support@) + link to Contact.

### 15.4 User interactions

- **ToC anchors:** smooth-scroll to section; URL updates with hash for deep-linking; scroll-spy highlights active section.
- **Mobile ToC:** collapsed accordion to avoid pushing content down.
- **Print:** print stylesheet (clean, ToC + chrome hidden) so policies can be saved/printed as records.
- All cross-links keyboard-accessible with clear focus.

### 15.5 Visual guidance

Light mode, maximum readability: Quartz background, Midnight text, Inter (not Syne) for section headings to keep legal prose calm and authoritative. Comfortable 65ch measure, 1.7 line-height, clear hierarchy. No marketing accents beyond Aurora links. Dense but never cramped — whitespace signals that we have nothing to hide. This restraint is itself a trust signal and directly supports Paystack review.

---

## 16. Cross-Page Component Reuse Matrix

| Component | Home | Product | AfroVPN | FAQ | Support | Contact | Blog | Legal |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| SiteHeader / Footer | ● | ● | ● | ● | ● | ● | ● | ● |
| CTASection | ● | ● | ● | ● | ● | ● | ● | – |
| NetworkMapMotif | ● | ● | ● | – | – | – | ○ | – |
| Card (feature/product) | ● | ● | ● | – | ● | ● | ● | – |
| Accordion | – | – | ● | ● | – | – | – | ● |
| Inline form (email) | – | ● | – | – | – | ● | ● | – |
| Full form | – | – | – | – | – | ● | – | – |
| Breadcrumbs | – | – | – | – | – | – | ● | ● |
| Sticky ToC / scroll-spy | – | – | ○ | ● | – | – | ● | ● |
| StatBlock | ● | – | ○ | – | – | – | – | – |
| Tabs | – | – | ● | – | – | – | – | – |

● primary use · ○ optional/variant · – not used

---

## 17. Implementation Notes & Handoff

- **Stack recommendation:** SSG/SSR framework (Next.js or Astro) for SEO + performance; island/partial hydration for interactive components (nav, accordions, tabs, forms, carousels). Content sourced from the `content/` markdown already in this repo.
- **Design tokens:** ship as CSS custom properties (Brand Guide Appendix A) + a Tailwind/− config mirror so design and code share one source of truth.
- **Component library:** build the §4 globals first (Header, Footer, Button, Card, Accordion, Form fields, CTASection) — they cover ~80% of every page.
- **Build order (matches IA priority tiers):** (1) Header/Footer + Legal + Contact + Pricing/AfroVPN essentials → **Paystack submission**; (2) Home + signup flow; (3) FAQ/Support/Blog; (4) DreamPay/DreamAssets waitlists.
- **QA gates per page:** Lighthouse ≥ 95 (Perf/A11y/Best-Practices/SEO), axe-core zero criticals, keyboard-only pass, reduced-motion pass, 375px + 1440px visual review.

---

*End of document — Dreamscape Systems UI Design Specification v1.0*
