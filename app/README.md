# Dreamscape Systems — Website

Production-ready corporate website for **Dreamscape Systems**, an African digital
infrastructure company (AfroVPN, DreamPay, DreamAssets).

Built with **Next.js 15 (App Router)**, **TypeScript**, **TailwindCSS**,
**Framer Motion**, and **Lucide Icons** — following the approved Information
Architecture, Brand Design Guide, and UI Design Specification in the repository root.

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL and inboxes
npm run dev                  # http://localhost:3000
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`.

## Project structure

```
src/
├── app/                          # App Router routes
│   ├── layout.tsx                # Root layout: fonts, theme, header/footer, Org JSON-LD
│   ├── globals.css               # Tailwind layers + prose + reduced-motion
│   ├── page.tsx                  # Home
│   ├── about/                    # About
│   ├── afrovpn/                  # AfroVPN landing (Product schema)
│   ├── dreampay/ dreamassets/    # Coming-soon products + waitlist
│   ├── pricing/                  # Pricing + pricing FAQ
│   ├── faq/                      # FAQ (FAQPage schema, category nav)
│   ├── support/                  # Support hub + ticket workflow + support form
│   ├── contact/                  # Contact routes + contact form + company details
│   ├── blog/                     # Blog index + [slug] article (Article schema)
│   ├── legal/[slug]/             # Terms, Privacy, Refund, Cookie, Acceptable Use
│   ├── api/                      # contact · support · waitlist route handlers
│   ├── sitemap.ts robots.ts      # SEO crawl files
│   └── not-found.tsx             # 404
├── components/
│   ├── layout/                   # SiteHeader, SiteFooter, Logo, Theme(Provider/Toggle)
│   ├── ui/                       # Button, Card, Accordion, primitives, fields
│   ├── sections/                 # PageHero, CTASection, PricingTable, ComingSoonProduct
│   ├── forms/                    # ContactForm, SupportForm, WaitlistForm
│   ├── motion/Reveal.tsx         # Scroll reveal (respects reduced motion)
│   └── JsonLd.tsx                # Structured-data helper
├── content/                      # Typed content: products, faq, blog, legal
└── lib/                          # site config, SEO/metadata helpers, utils
```

## Key features

- **SEO** — dynamic per-page metadata via `lib/seo.ts`, canonical URLs, Open Graph /
  Twitter cards, JSON-LD (`Organization`, `Product`, `FAQPage`, `Article`,
  `BreadcrumbList`), `sitemap.xml`, and `robots.txt`.
- **Dark mode** — dark by default (brand), with a persisted toggle that respects
  `prefers-color-scheme`. Light mode used for long-form legal/blog readability.
- **Accessibility** — semantic landmarks, skip link, focus-visible rings, labelled
  forms with `aria-live` errors, keyboard-operable nav/accordions, `prefers-reduced-motion`.
- **Responsive** — mobile-first, fluid grid, accessible mobile drawer nav.
- **Forms** — Contact, Support (with generated ticket reference), and product Waitlist,
  posting to App Router route handlers with validation + honeypot spam protection.
- **Blog & FAQ** — typed content sources, statically generated article pages, FAQ with
  category navigation and schema.

## Before launch

1. Replace placeholders in `src/lib/site.ts` (registration number, address, phone) and
   set `NEXT_PUBLIC_SITE_URL`.
2. Wire the API route handlers (`src/app/api/*`) to your email/CRM/helpdesk provider.
3. Have the legal content (`src/content/legal.ts`) reviewed by counsel.
4. Add real OG images under `public/og/` and product screenshots.
5. Integrate Paystack checkout on the pricing CTAs.
