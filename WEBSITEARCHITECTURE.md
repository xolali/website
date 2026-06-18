# Dreamscape Systems — Website Architecture Document

**Prepared for:** Dreamscape Systems
**Document type:** Information Architecture & Website Strategy
**Version:** 1.0
**Date:** 18 June 2026
**Author:** Principal Product Designer / UX Architect / SaaS Marketing

---

## 0. Executive Summary

Dreamscape Systems is positioned as an **African Digital Infrastructure Company** with a mission to build digital infrastructure that enables Africans to participate fully in the global digital economy. The company ships one live product today (**AfroVPN**) and has a roadmap that includes **DreamPay** (payments) and **DreamAssets** (digital assets).

This document defines the complete information architecture (IA) for the new corporate website. The IA is engineered to satisfy six business goals simultaneously:

1. **Pass Paystack merchant review** — the highest-priority, gating requirement.
2. **Establish trust and credibility** — for users, partners, regulators.
3. **Support customer acquisition** — convert visitors into AfroVPN subscribers.
4. **Support future products** — a platform IA, not a single-product site.
5. **Be investor friendly** — communicate vision, traction, and governance.
6. **Be SEO optimized** — capture organic demand across markets.

The central design tension is between a **corporate/infrastructure narrative** (investors, partners, regulators, Paystack) and a **product/conversion narrative** (AfroVPN subscribers). The architecture resolves this with a **dual-track IA**: a corporate "house of brands" parent site (`dreamscapesystems.com`) plus product-dedicated sections, so each audience finds a coherent path without diluting the other.

> **Critical path note:** Goal #1 (Paystack) is a hard gate. Section 8 (Compliance) lists the exact pages Paystack reviewers expect to see. Build those first.

---

## 1. Audiences, Goals & Strategic Constraints

### 1.1 Primary Audiences

| Audience | What they need | Primary destination |
|---|---|---|
| **Prospective AfroVPN users** | Pricing, trust, speed, "is it legit?", how to pay | `/afrovpn` + `/pricing` |
| **Existing customers** | Account, billing, support, downloads | `/account`, `/help` |
| **Paystack / payment reviewers** | Legal entity, contact, refund, privacy, terms, real product | Footer legal cluster + `/contact` |
| **Investors** | Vision, market, traction, team, governance | `/company`, `/investors` |
| **Partners / B2B** | Infrastructure capability, APIs, partnership model | `/company`, `/dreampay` (future) |
| **Regulators / press** | Identity, compliance posture, leadership | `/company`, `/legal`, `/press` |
| **Talent** | Mission, culture, roles | `/careers` |

### 1.2 Strategic Constraints

- **Trust is the product.** A VPN and a future payments company both sell trust. Every IA decision should reduce perceived risk.
- **Paystack reviewers are a user persona.** They will look for a registered business, a reachable human, a clear description of what is being sold, and complete legal policies. The IA must make these findable in **≤2 clicks from the homepage**, primarily via the footer.
- **Don't over-build the future.** DreamPay and DreamAssets get "coming soon" / vision treatment now, with reserved URL space — not full product sections that look abandoned.

---

## 2. Complete Sitemap

The site is organized into seven top-level clusters. Indentation indicates hierarchy. `[future]` = reserved/coming-soon. `[gated]` = login required.

```
dreamscapesystems.com/
│
├── / .......................................... Home (corporate)
│
├── /afrovpn/ .................................. AfroVPN product home  ◄ primary conversion
│   ├── /afrovpn/features
│   ├── /afrovpn/servers ....................... Server locations / network
│   ├── /afrovpn/apps .......................... Downloads (Android, iOS, Windows, macOS, Linux, Ext)
│   ├── /afrovpn/use-cases/
│   │   ├── /afrovpn/use-cases/streaming
│   │   ├── /afrovpn/use-cases/privacy
│   │   ├── /afrovpn/use-cases/business
│   │   └── /afrovpn/use-cases/travel
│   ├── /afrovpn/no-log-policy ................. Privacy / no-logs commitment
│   └── /afrovpn/setup-guides/ ................. Per-platform install guides (SEO + support)
│
├── /pricing/ .................................. Plans, billing, money-back  ◄ conversion gate
│
├── /company/ .................................. About hub (corporate trust)
│   ├── /company/about ......................... Mission, story, positioning
│   ├── /company/leadership .................... Team & founders (faces + bios)
│   ├── /company/vision ........................ Infrastructure thesis (Afro→Pay→Assets)
│   ├── /company/careers
│   ├── /company/press ......................... Media kit, logos, coverage
│   └── /company/contact ....................... Address, email, phone, form  ◄ Paystack
│
├── /investors/ ................................ Investor relations  [optional public, can be gated]
│
├── /dreampay/ ................................. DreamPay vision / waitlist  [future]
├── /dreamassets/ .............................. DreamAssets vision / waitlist  [future]
│
├── /blog/ ..................................... Content marketing / SEO hub
│   ├── /blog/category/{slug}
│   └── /blog/{post-slug}
│
├── /help/ ..................................... Help Center / Support hub
│   ├── /help/getting-started
│   ├── /help/billing-and-payments ............. ◄ Paystack-relevant
│   ├── /help/account
│   ├── /help/troubleshooting
│   └── /help/{article-slug}
│
├── /account/ .................................. Customer dashboard  [gated]
│   ├── /account/billing
│   ├── /account/subscription
│   └── /account/downloads
│
├── /auth/
│   ├── /auth/login
│   ├── /auth/signup
│   └── /auth/reset-password
│
└── LEGAL & TRUST CLUSTER (footer-anchored)  ◄◄ Paystack critical
    ├── /legal/terms ........................... Terms of Service
    ├── /legal/privacy ......................... Privacy Policy
    ├── /legal/refund-policy ................... Refund / Cancellation Policy
    ├── /legal/acceptable-use .................. Acceptable Use Policy
    ├── /legal/cookies ......................... Cookie Policy
    ├── /legal/dpa ............................. Data Processing / GDPR-NDPR
    ├── /legal/aml-kyc ........................ AML/KYC statement  [for DreamPay readiness]
    ├── /security .............................. Security & trust center
    ├── /status ............................... System / uptime status
    └── /sitemap.xml + /robots.txt + /.well-known/security.txt
```

### 2.1 Sitemap Rationale

- **`/afrovpn/` is a section, not the homepage.** This is the key architectural decision. It keeps the corporate parent brand at the root (investor/partner/Paystack credibility) while giving the product its own conversion-optimized home. When DreamPay launches, it slots in symmetrically at `/dreampay/`.
- **Legal cluster is centralized under `/legal/`** and surfaced in the footer on every page — this is what Paystack reviewers scan for.
- **Help Center is separate from the Blog.** Help = support/retention + long-tail SEO; Blog = acquisition SEO + thought leadership.

---

## 3. Navigation Structure

### 3.1 Global Primary Navigation (Header)

Persistent, on every page. Optimized for the dominant journey (AfroVPN acquisition) while keeping corporate credibility one hover away.

```
[Dreamscape logo]   Products ▾    Pricing    Company ▾    Resources ▾        [Log in]  [Get AfroVPN ►]
```

**`Products ▾` (mega-menu)**
```
PRODUCTS                          INFRASTRUCTURE VISION
─────────                         ─────────────────────
● AfroVPN          (Live)         Our mission: digital infrastructure
  Private, fast    →/afrovpn      for the global digital economy.
  internet access                 → /company/vision
                                  
◐ DreamPay      (Coming soon)
  Payments         →/dreampay
                                  
◐ DreamAssets   (Coming soon)
  Digital assets   →/dreamassets
```
The status badges (Live / Coming soon) are deliberate: they signal a real, shipping company with a credible roadmap — strong for investors, honest for users.

**`Company ▾`**
```
About Dreamscape   → /company/about
Leadership         → /company/leadership
Vision & Mission   → /company/vision
Careers            → /company/careers
Press              → /company/press
Contact            → /company/contact
Investors          → /investors
```

**`Resources ▾`**
```
Help Center        → /help
Setup Guides       → /afrovpn/setup-guides
Blog               → /blog
Security           → /security
System Status      → /status
```

### 3.2 Primary CTA Strategy

- **Persistent dual CTA:** `[Log in]` (existing users) + `[Get AfroVPN]` (acquisition). The primary CTA is always product-specific and action-oriented, never a vague "Sign up."
- On product pages the CTA may shift to `[Start free trial]` or `[See plans]` depending on the offer.

### 3.3 Footer (the trust & compliance backbone)

The footer is the most important real estate for Goals #1 and #2. It appears on **every page**.

```
┌─ PRODUCTS ──────┬─ COMPANY ───────┬─ RESOURCES ──────┬─ LEGAL & TRUST ────────┐
│ AfroVPN         │ About           │ Help Center      │ Terms of Service       │
│ Pricing         │ Leadership      │ Setup Guides     │ Privacy Policy         │
│ DreamPay (soon) │ Careers         │ Blog             │ Refund Policy          │
│ DreamAssets(soon)│ Press          │ Security         │ Acceptable Use         │
│                 │ Contact         │ System Status    │ Cookie Policy          │
│                 │ Investors       │                  │ Data Processing (NDPR) │
└─────────────────┴─────────────────┴──────────────────┴────────────────────────┘

Dreamscape Systems Ltd. · [RC/Registration No.] · [Registered address]
[support@dreamscapesystems.com] · [+234 / phone] · © 2026 Dreamscape Systems. All rights reserved.
[Payment badges: Paystack · Visa · Mastercard · Verve]   [SSL/Secure badge]
```

> **Paystack reviewer checklist lives here:** legal entity name + registration number, physical address, working email, phone number, and direct links to Terms, Privacy, and Refund policies — all visible without logging in.

### 3.4 Breadcrumbs

Enabled on all sub-pages (Help, Blog, AfroVPN sub-pages, Legal) for SEO (BreadcrumbList schema) and orientation:
`Home › AfroVPN › Setup Guides › Android`

---

## 4. User Journeys

### 4.1 Journey A — Prospective AfroVPN Customer (primary)

```
Discovery          Evaluation              Decision           Conversion         Activation
─────────          ──────────              ────────           ──────────         ──────────
Google search  →   /afrovpn (features) →   /pricing       →   /auth/signup   →   /account/downloads
"VPN for Nigeria"  trust signals,          plan compare,      checkout via       install app,
Blog / Ad          speed, no-logs          money-back         Paystack           connect

Trust checkpoints injected along the way:
• Homepage/product: no-logs badge, server count, payment logos, testimonials
• Pricing: money-back guarantee, secure-payment badge, refund-policy link
• Checkout: Paystack-hosted, SSL, "you can cancel anytime"
```
**Emotional arc:** curiosity → skepticism ("is this safe / legit / will I get charged forever?") → reassurance → commitment. The IA must answer the skepticism explicitly at `/afrovpn/no-log-policy`, `/legal/refund-policy`, and `/help/billing-and-payments`.

### 4.2 Journey B — Paystack / Payment Reviewer (gating)

```
Land on Home → scan footer → /company/contact (verify entity, address, phone)
            → /legal/terms, /legal/privacy, /legal/refund-policy (verify policies)
            → /pricing (verify what is being sold + price)
            → /afrovpn (verify product is real and live)
Outcome: APPROVED — business is legitimate, product is clear, policies are complete.
```
This journey must be frictionless and require **no login**. Everything a reviewer needs is in the public footer + contact + pricing pages.

### 4.3 Journey C — Investor

```
Referral/press → / (positioning) → /company/vision (infrastructure thesis)
             → /company/leadership (team credibility)
             → /afrovpn + /pricing (proof of execution / live revenue product)
             → /investors (traction, deck request) → /company/contact (intro)
```
**Narrative:** "We are not a VPN company. We are building African digital infrastructure — AfroVPN is the first wedge; DreamPay and DreamAssets follow." The IA visibly demonstrates the platform thesis through the multi-product nav and `/company/vision`.

### 4.4 Journey D — Existing Customer (retention/support)

```
Need → /help (search) → article OR /help/billing-and-payments
    → /account (manage subscription / update card / cancel)
    → /company/contact or in-app support if unresolved
```
Self-service first (deflection + SEO), human contact always available (trust + Paystack requirement).

### 4.5 Journey E — Future Product Prospect (DreamPay/DreamAssets)

```
Nav "Products" → /dreampay (vision + problem + waitlist)
             → email capture (build launch list, signal demand to investors)
```

---

## 5. Conversion Funnels

### 5.1 Primary Funnel — AfroVPN Subscription

| Stage | Page(s) | Goal | Primary CTA | Key metric |
|---|---|---|---|---|
| **Acquire** | Home, /afrovpn, /blog, ads | Capture intent | Get AfroVPN | Sessions, source CTR |
| **Educate** | /afrovpn/features, /use-cases, /no-log-policy | Build desire + trust | See plans | Scroll depth, page→pricing rate |
| **Compare** | /pricing | Select plan | Choose plan | Pricing→signup rate |
| **Convert** | /auth/signup → Paystack checkout | Pay | Complete payment | Checkout completion rate |
| **Activate** | /account/downloads | First successful connection | Download app | Activation rate (connected) |
| **Retain** | /account, /help | Renewal | — | Churn, MRR retention |
| **Refer** | /account (referral) | Advocacy | Invite & earn | Referral coefficient |

**Funnel design principles**
- **One primary CTA per page.** Reduce decision fatigue.
- **Pricing is the hub.** Every product page routes to `/pricing`; pricing routes to checkout.
- **Money-back guarantee + refund-policy link at the decision point** to kill purchase anxiety (also satisfies Paystack).
- **Annual plan anchored** against monthly to lift LTV; show savings explicitly.
- **Checkout is Paystack-hosted** — display Paystack/card badges pre-click to set expectation and increase completion.

### 5.2 Secondary Funnel — Future Product Waitlist

```
Awareness (nav badge "Coming soon") → /dreampay vision page → Email capture → Nurture sequence → Launch
```
Doubles as **investor signal** (demand proof) and **launch list**.

### 5.3 Tertiary Funnel — Investor / Partner Lead

```
/company/vision or /investors → "Request deck" / "Contact" form → CRM → Founder follow-up
```

### 5.4 Micro-conversions (tracked)

Newsletter signup, app download, help-article helpfulness vote, setup-guide completion, waitlist join, deck request. These feed retargeting and lead scoring.

---

## 6. Page Hierarchy & Templates

### 6.1 Page Priority Tiers

| Tier | Pages | Why | Build order |
|---|---|---|---|
| **T0 — Gating** | /company/contact, /legal/terms, /legal/privacy, /legal/refund-policy, /pricing, /afrovpn | Required to pass Paystack | **Build first** |
| **T1 — Conversion** | Home, /afrovpn/features, /afrovpn/apps, /auth/signup, /account | Core revenue | Build second |
| **T2 — Trust & SEO** | /company/about, /leadership, /no-log-policy, /security, /help hub, /blog | Credibility + organic growth | Build third |
| **T3 — Future & IR** | /dreampay, /dreamassets, /investors, /careers, /press | Vision & funding | Build fourth |

### 6.2 Homepage Hierarchy (`/`)

The homepage serves corporate positioning **and** funnels to AfroVPN. Recommended section stack:

1. **Hero** — Positioning statement + primary AfroVPN CTA.
   *"Building the digital infrastructure for Africa's place in the global economy."* Sub-CTA: `Explore AfroVPN`.
2. **Trust bar** — payment logos, server/user counts, security badges.
3. **Featured product: AfroVPN** — value prop + `Get AfroVPN`.
4. **The Dreamscape platform** — three-product roadmap (AfroVPN live, DreamPay/DreamAssets soon) → reinforces infrastructure thesis (investors).
5. **Why trust us** — no-logs, registered company, real team, secure payments.
6. **Social proof** — testimonials / press / metrics.
7. **Mission band** — short mission statement → `/company/vision`.
8. **Final CTA** — `Get started with AfroVPN`.
9. **Footer** — full trust/legal/compliance cluster.

### 6.3 Core Page Templates (for design system)

1. **Corporate/Marketing** — hero, sections, CTA bands (Home, About, Vision).
2. **Product** — hero, feature grid, proof, pricing teaser, FAQ, CTA (AfroVPN).
3. **Pricing** — plan comparison, guarantee, payment badges, FAQ.
4. **Legal/Policy** — clean readable long-form, last-updated date, table of contents, contact block.
5. **Help/Doc Article** — breadcrumb, search, body, "was this helpful?", related.
6. **Blog Post** — author, date, body, share, related, CTA.
7. **Contact** — form + address/phone/email + map + response-time promise.
8. **App/Dashboard (gated)** — account management.
9. **Coming-soon/Waitlist** — vision + email capture.

---

## 7. Content Strategy

### 7.1 Content Pillars

| Pillar | Purpose | Lives in | Sample topics |
|---|---|---|---|
| **Digital access & privacy** | AfroVPN SEO + education | /blog, /afrovpn | "How a VPN protects you", "Best VPN for streaming in Nigeria" |
| **African digital economy** | Thought leadership, investor narrative | /blog, /company/vision | "Why Africa needs sovereign digital infrastructure" |
| **Product help** | Retention, deflection, long-tail SEO | /help, /setup-guides | "Set up AfroVPN on Android", "Fix slow connection" |
| **Trust & security** | Credibility | /security, /afrovpn/no-log-policy | "Our no-logs commitment explained" |
| **Company & culture** | Talent + press | /company, /careers | Team, hiring, milestones |

### 7.2 SEO Architecture

- **URL strategy:** short, lowercase, hyphenated, keyword-bearing, no IDs (see §9).
- **Keyword → page mapping:**
  - Transactional ("buy vpn nigeria", "vpn pricing") → `/pricing`, `/afrovpn`
  - Commercial ("best vpn for africa", "vpn for streaming") → `/afrovpn/use-cases/*`
  - Informational ("what is a vpn", "is vpn legal in nigeria") → `/blog/*`
  - Navigational ("afrovpn setup android") → `/afrovpn/setup-guides/*`
- **Programmatic SEO opportunities** (scalable templated pages, built carefully to avoid thin content):
  - Per-platform setup guides (`/afrovpn/setup-guides/{platform}`)
  - Per-location server pages where genuinely differentiated
  - Per-use-case landing pages
- **On-page essentials:** one H1/page, semantic headings, internal linking from blog → product → pricing, descriptive meta titles/descriptions, alt text.
- **Structured data (schema.org):** `Organization` (sitewide), `Product` + `Offer` (AfroVPN/pricing), `FAQPage` (FAQs), `BreadcrumbList`, `Article` (blog/help), `SoftwareApplication` (apps). These boost rich results and reinforce legitimacy.
- **Technical SEO:** XML sitemap, robots.txt, canonical tags, fast Core Web Vitals, mobile-first, HTTPS everywhere, hreflang if multi-region/language later.
- **Topic clusters:** pillar page (`/afrovpn`) ↔ cluster content (`/blog`, `/use-cases`, `/setup-guides`) with bidirectional internal links.

### 7.3 Content Governance

- Every legal/policy page carries a visible **"Last updated"** date and owner.
- Blog/help on a regular cadence; help articles tied to support-ticket themes (data-driven).
- Tone: **clear, confident, trustworthy, pan-African and globally credible** — avoid hype; investors and regulators read this too.

---

## 8. Trust-Building Strategy

Because Dreamscape sells trust (VPN today, payments/assets tomorrow), trust signals are an IA layer, not a page.

### 8.1 Sitewide trust signals

- **Footer credibility block:** registered company name + number, physical address, phone, email — on every page.
- **Payment & security badges:** Paystack, Visa/Mastercard/Verve, SSL — at the checkout decision point and footer.
- **HTTPS everywhere**, visible secure-padlock, `security.txt`.

### 8.2 Dedicated trust pages

| Page | Trust function |
|---|---|
| `/security` | Security & trust center: encryption, infra, vuln disclosure, certifications roadmap |
| `/afrovpn/no-log-policy` | Explicit, plain-language privacy commitment (top VPN purchase driver) |
| `/company/leadership` | Real faces, real names, LinkedIn — antidote to "faceless VPN" skepticism |
| `/company/about` | Registered entity, founding story, mission |
| `/status` | Public uptime/status — operational transparency |
| `/legal/*` | Complete, accessible policy suite |

### 8.3 Social proof & validation

- Customer testimonials/reviews (with schema), user/server counts, press logos, partner logos, third-party trust badges/awards as earned.
- Money-back guarantee prominently at the point of purchase.

### 8.4 Trust for the future (payments) — built in now

DreamPay will require far higher trust. Establishing the **registered entity, leadership transparency, security center, and AML/KYC posture** now means the brand's trust foundation pre-dates the payments launch — a major advantage in financial-services credibility and licensing.

---

## 9. Compliance Requirements

> This section is the **Paystack merchant-review playbook** plus broader regulatory readiness.

### 9.1 Paystack Merchant Review — Required Pages & Elements

Paystack (and card schemes generally) approve merchants whose websites clearly establish *who you are, what you sell, how much it costs, and how disputes are handled.* Provide all of the following, publicly (no login):

| Requirement | Where it lives | Status to confirm |
|---|---|---|
| **Clear description of product/service** | `/afrovpn`, Home | Must be unambiguous: "subscription VPN service" |
| **Pricing displayed in clear currency** | `/pricing` | Show NGN (and/or USD) + billing interval |
| **Business name & registration** | Footer + `/company/about` | Use exact registered entity name + RC number |
| **Physical business address** | Footer + `/company/contact` | Real, verifiable address |
| **Working contact: email + phone** | Footer + `/company/contact` | Monitored channels |
| **Terms of Service / Terms & Conditions** | `/legal/terms` | Complete, dated |
| **Privacy Policy** | `/legal/privacy` | Data collection/use; cookie disclosure |
| **Refund / Cancellation Policy** | `/legal/refund-policy` | Explicit refund terms & timelines |
| **Acceptable Use / fair-use** | `/legal/acceptable-use` | Especially important for a VPN |
| **Secure checkout (HTTPS)** | Sitewide + checkout | Valid SSL, Paystack-hosted payment |
| **Customer support pathway** | `/help` + `/company/contact` | Self-service + human |
| **Delivery/fulfillment clarity** | `/help/getting-started` | How the digital service is delivered |

**Action:** Stand up the T0 pages (see §6.1) before submitting for Paystack review. Use the exact legal entity name and registration number consistently across footer, contact, and Terms.

### 9.2 Data Protection & Privacy

- **NDPR** (Nigeria Data Protection Regulation / Act) compliance — privacy notice, lawful basis, data-subject rights, contact for data requests → `/legal/privacy`, `/legal/dpa`.
- **GDPR** alignment if serving EU users (likely, for a VPN) — consent, DPA, data-transfer disclosures.
- **Cookie consent** banner + `/legal/cookies`.
- For a VPN specifically: a credible, specific **no-logs policy** (`/afrovpn/no-log-policy`) — both a trust and a compliance artifact.

### 9.3 Financial-Services Readiness (DreamPay — forward-looking)

Reserve and pre-draft, even if "coming soon":
- **AML/KYC policy** (`/legal/aml-kyc`) — establishes compliance maturity early.
- CBN/payment-licensing considerations for DreamPay (PSSP/PSP categories) — noted in vision page disclaimers ("DreamPay is in development; not yet a licensed service").
- DreamAssets: clear **risk disclosures** and avoidance of premature financial-product claims.

### 9.4 Accessibility & Legal Hygiene

- **WCAG 2.1 AA** target (also aids SEO).
- Copyright notice, IP/trademark statements.
- "Last updated" dates on all policies.
- Vulnerability disclosure via `/.well-known/security.txt`.

---

## 10. Recommended URL Structure

**Conventions:** lowercase · hyphen-separated · no trailing slash enforced consistently · no query-string IDs for indexable content · keyword-bearing · stable (avoid dates in URLs to keep evergreen).

### 10.1 Marketing & Corporate
```
/                                   Home
/afrovpn                            AfroVPN product home
/afrovpn/features
/afrovpn/servers
/afrovpn/apps
/afrovpn/no-log-policy
/afrovpn/use-cases/streaming
/afrovpn/use-cases/privacy
/afrovpn/use-cases/business
/afrovpn/use-cases/travel
/afrovpn/setup-guides/android
/afrovpn/setup-guides/ios
/afrovpn/setup-guides/windows
/afrovpn/setup-guides/macos
/pricing
```

### 10.2 Company & Investors
```
/company/about
/company/leadership
/company/vision
/company/careers
/company/careers/{role-slug}
/company/press
/company/contact
/investors
```

### 10.3 Future Products
```
/dreampay
/dreamassets
```

### 10.4 Content & Support
```
/blog
/blog/category/{category-slug}
/blog/{post-slug}
/help
/help/getting-started
/help/billing-and-payments
/help/account
/help/troubleshooting
/help/{article-slug}
```

### 10.5 Legal & Trust
```
/legal/terms
/legal/privacy
/legal/refund-policy
/legal/acceptable-use
/legal/cookies
/legal/dpa
/legal/aml-kyc
/security
/status
```

### 10.6 Account & Auth (gated)
```
/auth/login
/auth/signup
/auth/reset-password
/account
/account/billing
/account/subscription
/account/downloads
```

### 10.7 Technical
```
/sitemap.xml
/robots.txt
/.well-known/security.txt
```

### 10.8 Domain & Subdomain Strategy

- **Primary:** `dreamscapesystems.com` (corporate root + all marketing).
- **App:** `app.dreamscapesystems.com` for the gated dashboard (clean separation of marketing vs. application), or keep `/account` on root early-stage for simplicity.
- **Reserved for future:** `dreampay.com` / `dreamassets.com` can be acquired and later 301-bridged or kept as standalone product brands; near-term, run them as sections under the parent for SEO consolidation and to demonstrate the platform.
- **Avoid** putting AfroVPN on a wholly separate domain early — it would forfeit the corporate-trust and SEO equity the parent brand needs for Paystack and investors.

---

## 11. Implementation Roadmap (suggested)

| Phase | Scope | Outcome |
|---|---|---|
| **Phase 1 — Pass the gate** | T0 pages: Home (minimal), /afrovpn, /pricing, /company/contact, full /legal suite, footer trust block, HTTPS | **Submit to Paystack** |
| **Phase 2 — Convert** | Signup→Paystack checkout, /account, /afrovpn/apps + setup-guides, /help core | Live revenue funnel |
| **Phase 3 — Trust & SEO** | /company/about + leadership + vision, /security, /no-log-policy, /blog engine, schema, sitemap | Organic growth + credibility |
| **Phase 4 — Future & investors** | /dreampay, /dreamassets waitlists, /investors, /press, /careers | Vision & funding narrative |

---

## 12. Measurement Framework

| Goal | KPIs |
|---|---|
| Pass Paystack | Merchant approval (binary); time-to-approval |
| Trust & credibility | Bounce rate on trust pages, branded search volume, return-visitor rate |
| Customer acquisition | Pricing→signup rate, checkout completion, CAC, activation rate |
| Future products | Waitlist signups, demand-by-product |
| Investor friendly | Deck requests, /investors + /vision engagement, inbound investor contacts |
| SEO | Organic sessions, indexed pages, keyword rankings, rich-result coverage, Core Web Vitals |

---

## Appendix A — Top-Level Nav at a Glance

```
Products ▾  |  Pricing  |  Company ▾  |  Resources ▾            Log in   Get AfroVPN ►
```

## Appendix B — Paystack Pre-Submission Checklist

- [ ] Exact registered business name + registration number in footer
- [ ] Physical address in footer + /company/contact
- [ ] Working email + phone, monitored
- [ ] /pricing shows clear price + currency + billing interval
- [ ] /afrovpn clearly describes the service being sold
- [ ] /legal/terms published & dated
- [ ] /legal/privacy published & dated
- [ ] /legal/refund-policy published & dated
- [ ] /legal/acceptable-use published
- [ ] HTTPS valid sitewide; checkout via Paystack
- [ ] Support pathway (/help + contact) live
- [ ] No "coming soon" placeholders on any page a reviewer must verify (T0 pages complete)

---

*End of document — Dreamscape Systems Website Architecture v1.0*
