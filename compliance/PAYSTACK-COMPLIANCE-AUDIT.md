# Dreamscape Systems — Paystack Merchant Compliance Audit

**Document type:** Merchant Review Compliance Report
**Version:** 1.0
**Date:** 19 June 2026
**Auditor role:** Paystack Merchant Compliance Specialist
**Scope:** Full website audit — code, content, and legal cluster on branch `claude/determined-goodall-ap9csb`
**Verdict:** ⛔ **Would NOT pass merchant review today.** Structurally strong, but blocked by 5 critical findings — all fixable in well under a day.

---

## 1. Executive Summary

Dreamscape Systems has built a website whose **structure and coverage are excellent** for Paystack merchant review — arguably in the top tier of applicant sites. The information architecture deliberately front-loads everything a reviewer checks: a clear product, visible pricing in NGN, a complete legal cluster, a trust-backbone footer on every page, and accessible support and contact paths.

However, an application is judged on the **live, public state** of the site — and in that state the site currently contains **placeholder business identity** and a **self-incriminating legal disclaimer rendered to the public**, plus the absence of a **working payment flow**. Any one of these is a decline trigger. A reviewer encountering them would reject the application or, at best, return it for information.

The good news: every blocker is a content/configuration fix, not an architectural one. The hard work is done. The site can move from *decline* to *approve* by closing the five critical items in Section 4.

**Approval readiness score: 62 / 100** — "Decline today, approvable within 1 day of remediation." (Scoring in Section 6.)

---

## 2. Compliance Report — Area by Area

Legend: ✅ Pass · ⚠️ Partial / needs work · ⛔ Fail (blocker)

### 2.1 Products ✅
- **Finding:** The product being sold is unambiguous. AfroVPN is described clearly as a subscription VPN service across `/` , `/afrovpn`, and the nav. DreamPay/DreamAssets are honestly marked "Coming soon" with no payment capture, which is correct — you must not appear to sell what you can't deliver.
- **Evidence:** `content/products.ts`, `app/afrovpn/page.tsx`. Product schema (`Product`/`AggregateOffer`) present.
- **Verdict:** Pass. The "what are you selling" test is satisfied.

### 2.2 Pricing ⚠️ → ⛔ (because no checkout)
- **Pass:** Prices are shown in clear currency with billing intervals (`₦4,500/mo`, `₦2,700/mo annual`, `₦2,000/mo biennial`) on `/pricing` and `/afrovpn#pricing`; "every plan includes" list and refund link present. `content/products.ts`.
- **Blocker:** The "Get started" CTA links to `/contact?plan=…` (`components/sections/PricingTable.tsx:61`). **There is no working Paystack checkout.** A reviewer cannot complete (or even see) a purchase. Paystack expects a functioning payment flow that uses Paystack to collect the displayed price. A contact form is not a purchase path.
- **Verdict:** Pricing *display* passes; **purchase flow fails** — this is a blocker (CRIT-3).

### 2.3 Support ✅
- **Finding:** Strong. `/support` provides self-service categories, a 4-step process, a transparent 6-stage ticket workflow, a working support form that issues a ticket reference, and a published support email with 24/7 coverage and a 24-hour response commitment.
- **Caveat (minor):** The form's API handler is a stub (`app/api/support/route.ts` — `// TODO: create a ticket…`). Submissions are validated and acknowledged but not yet delivered anywhere. Must be wired to a real inbox/helpdesk before launch (MED-1).
- **Verdict:** Pass on visible support; backend delivery must be live before go-live.

### 2.4 Contact ⚠️
- **Pass:** `/contact` exposes routed inboxes (support/general/partnerships/press/investors), a full contact form with consent, and a company-details block — exactly what a reviewer wants.
- **Blocker:** The company details are **placeholders**: `registrationNumber: "RC 0000000"`, `address: "Registered address — to be finalized"`, `phone: "+234 000 000 0000"` (`lib/site.ts:17–22`). These render in the footer **and** the contact page on every page of the live site. Fake/placeholder registration, address, and phone are a hard decline — they read as either incomplete or deceptive.
- **Verdict:** Structure passes; **placeholder identity fails** — blocker (CRIT-1).

### 2.5 Legal (cluster) ⛔
- **Pass (coverage):** All five required documents exist and are linked from the footer on every page: Terms, Privacy, Refund, Cookie, Acceptable Use (`content/legal.ts`, `app/legal/[slug]/page.tsx`). Each shows a "Last updated" date.
- **CRITICAL Blocker:** The legal pages **publicly render an internal disclaimer** (`app/legal/[slug]/page.tsx:71–72`):
  > *"This policy is written to satisfy Paystack merchant review and applicable data-protection law. Replace bracketed placeholders and have it reviewed by qualified counsel before launch."*
  This is shown to anyone — including the Paystack reviewer. It explicitly signals that the policies are **drafts, not finalized, and not legally reviewed**, and that they were written *to get through Paystack review*. This is close to a guaranteed decline. It must be removed from the public render immediately.
- **Blocker:** Terms still contains `"governed by the laws of [jurisdiction]"` (`content/legal.ts:70`) — an unfilled placeholder in a binding document.
- **Verdict:** Coverage passes; **public draft-disclaimer + placeholder fail** — blocker (CRIT-2).

### 2.6 Refunds ✅
- **Finding:** A dedicated, clear Refund Policy exists (`/legal/refund-policy`): 7-day money-back guarantee, how to request, processing method (Paystack, original method), timeframe (5–10 business days), renewal handling, and statutory-rights preservation. It is linked at the point of purchase and in the footer.
- **Verdict:** Pass. This is one of the strongest sections and a common reason applicants fail — here it's done well. (Once entity details are real, no further change needed.)

### 2.7 Privacy ⚠️
- **Pass:** Comprehensive Privacy Policy with NDPR + GDPR bases, data categories, sharing limits, retention, security, and data-subject rights, plus a dedicated `privacy@` contact.
- **Gap:** The site claims to use analytics/cookies and has a Cookie Policy, but there is **no cookie-consent mechanism** rendered (`app/layout.tsx` has none). Under NDPR/GDPR, non-essential cookies require consent. Also no explicit data-deletion/DSAR route beyond an email. (HIGH-1.)
- **Verdict:** Document passes; **missing consent UI** is a real compliance gap (and the public draft-disclaimer in 2.5 also taints Privacy).

### 2.8 Terms of Service ⚠️
- **Pass:** Covers agreement, eligibility, account, acceptable use, billing/renewals, refunds, disclaimers, liability, governing law structure.
- **Gap:** `[jurisdiction]` placeholder (CRIT-2); should also explicitly name Paystack as the payment processor and reaffirm auto-renewal disclosure (currently in Terms §5 — acceptable, keep).
- **Verdict:** Partial — passes once placeholder filled and public disclaimer removed.

### 2.9 Trust Signals ⚠️
- **Pass:** Footer credibility block on every page; payment badges (Paystack, Visa, Mastercard, Verve, SSL); no-logs commitment; honest product roadmap; Organization JSON-LD; professional design.
- **Gaps:**
  - Payment badges are **decorative text**, not verifiable marks, and the SSL/secure claim is asserted without the live HTTPS certificate being in evidence (depends on deployment) (LOW-1).
  - **Leadership is not shown.** The Brand/IA called for a `/company/leadership` page with real faces; it does not exist in the build. For a company that will later handle payments, named, visible leadership materially strengthens trust (MED-2).
  - Placeholder phone/address (CRIT-1) actively *undermine* trust signals.
- **Verdict:** Partial.

---

## 3. Risk Assessment

| # | Risk | Likelihood of causing decline | Severity | Notes |
|---|---|---|---|---|
| CRIT-1 | Placeholder business identity (RC, address, phone) live on site | **Very High** | Critical | Reads as incomplete or deceptive; fails "verify the business" test |
| CRIT-2 | Public "not legally reviewed / replace placeholders" disclaimer + `[jurisdiction]` in Terms | **Very High** | Critical | Tells the reviewer the policies are drafts written to pass review |
| CRIT-3 | No working Paystack checkout (CTA → contact form) | **High** | Critical | No demonstrable purchase flow using Paystack |
| HIGH-1 | No cookie-consent mechanism despite Cookie Policy + analytics claim | Medium | High | NDPR/GDPR consent gap; inconsistency reviewers notice |
| MED-1 | Contact/Support/Waitlist API handlers are stubs (no delivery) | Medium | Medium | Forms appear to work but mail goes nowhere |
| MED-2 | No leadership/About-team visibility | Low–Medium | Medium | Weakens trust; important for payments roadmap |
| LOW-1 | Payment/SSL badges are decorative, not verified; HTTPS depends on deploy | Low | Low | Ensure real TLS + genuine marks at launch |
| LOW-2 | No published business email on a custom domain proof / no `security.txt`, status page | Low | Low | Nice-to-have hardening |

**Overall risk posture:** The site's *architecture* lowers risk significantly, but the *current live content* raises three independent critical-severity decline triggers. Net: **high risk of decline today, low risk after a short, well-scoped remediation.**

---

## 4. Required Fixes (prioritized & actionable)

### 🔴 CRITICAL — must fix before submitting (each is a standalone blocker)

**CRIT-1 — Replace all placeholder business identity.**
- File: `app/src/lib/site.ts` → `company` block.
- Set the **real** registered entity name, RC/registration number, full registered address, a **working monitored phone**, and confirm the support email is monitored.
- These flow automatically to the footer (`SiteFooter.tsx`) and `/contact`. Verify they appear correctly on every page.

**CRIT-2 — Finalize legal docs and remove the public draft disclaimer.**
- File: `app/src/app/legal/[slug]/page.tsx:70–73` → **delete the `legalReviewNote` callout** from the public render (keep the note only as a code comment or internal doc).
- File: `app/src/content/legal.ts:70` → replace `[jurisdiction]` with the real governing-law jurisdiction (e.g., "the Federal Republic of Nigeria").
- Have the finalized policies reviewed by counsel **off-site**; the public page must show finished, confident policy text — never a "this is a draft" banner.

**CRIT-3 — Ship a working Paystack checkout.**
- File: `app/src/components/sections/PricingTable.tsx:61` → change the CTA from `/contact?plan=` to a real signup → Paystack payment flow that charges the displayed NGN price.
- The reviewer must be able to reach a Paystack-hosted/initialized payment for the stated product and price. Ensure HTTPS end-to-end and that the success/refund paths match the Refund Policy.

### 🟠 HIGH — fix before launch (strongly recommended before submission)

**HIGH-1 — Add a cookie-consent banner.**
- Render a consent UI (accept/reject non-essential) in `app/src/app/layout.tsx`, gating any analytics/marketing cookies, consistent with the Cookie Policy and NDPR/GDPR. Add a "Manage cookies" link.

### 🟡 MEDIUM — fix before launch

**MED-1 — Wire the form handlers to real delivery.**
- Files: `app/src/app/api/{contact,support,waitlist}/route.ts` (currently `// TODO`). Connect to a real inbox/helpdesk/ESP so submissions are delivered and acknowledged. A support channel that silently drops mail is a post-approval liability.

**MED-2 — Add visible leadership / real "About the team".**
- Add a leadership section or `/about` team block with real names, roles, and photos. Materially strengthens trust now and is important for the DreamPay roadmap.

### 🟢 LOW — hardening (post-approval acceptable)

- **LOW-1** — Ensure genuine TLS in production; use real, current payment-network marks (with permission) rather than text chips.
- **LOW-2** — Add `/.well-known/security.txt`, a public status page, and confirm the business email is on the verified custom domain.

---

## 5. Merchant Approval Checklist

Use this as the go/no-go gate before clicking "Submit for review."

**Business identity & contact**
- [ ] Real registered business name displayed (footer + contact) — *CRIT-1*
- [ ] Real RC/registration number displayed — *CRIT-1*
- [ ] Real, verifiable physical/registered address displayed — *CRIT-1*
- [ ] Working, monitored phone number displayed — *CRIT-1*
- [ ] Working, monitored support email displayed
- [ ] No placeholder strings anywhere public (`RC 0000000`, "to be finalized", `+234 000…`)

**Product & pricing**
- [ ] Product/service clearly described (AfroVPN = subscription VPN) ✅ already
- [ ] Prices shown in NGN with billing intervals ✅ already
- [ ] "Coming soon" products take no payment ✅ already
- [ ] Working Paystack checkout charges the displayed price — *CRIT-3*
- [ ] Fulfilment/delivery of the digital service explained (Getting Started) ✅ already

**Legal cluster (public, finalized, dated)**
- [ ] Public legal pages contain NO draft/disclaimer banner — *CRIT-2*
- [ ] Terms of Service — finalized, `[jurisdiction]` filled — *CRIT-2*
- [ ] Privacy Policy — finalized
- [ ] Refund Policy — finalized & linked at checkout ✅ already
- [ ] Cookie Policy — finalized ✅ already
- [ ] Acceptable Use Policy — finalized ✅ already
- [ ] All policies reviewed by counsel (off-site)
- [ ] "Last updated" dates present ✅ already

**Privacy & data protection**
- [ ] Cookie-consent mechanism live, gating non-essential cookies — *HIGH-1*
- [ ] DSAR / data-deletion route stated (email acceptable) — *HIGH-1*
- [ ] NDPR/GDPR bases stated ✅ already

**Support & trust**
- [ ] Support path live and form delivers to a real inbox — *MED-1*
- [ ] Contact form delivers to a real inbox — *MED-1*
- [ ] Footer trust block on every page ✅ already
- [ ] Visible leadership / real team — *MED-2*
- [ ] HTTPS valid sitewide in production — *LOW-1*
- [ ] Genuine payment-network marks ✅ structure / verify at launch

**Final gate**
- [ ] All CRITICAL items closed
- [ ] All HIGH items closed
- [ ] Smoke-tested the full purchase + refund-request journey end to end
- [ ] Re-read every public page as if you were the reviewer — nothing says "draft," "placeholder," or "TODO"

---

## 6. Approval Readiness Score

| Dimension | Weight | Score (0–100) | Weighted | Comment |
|---|---:|---:|---:|---|
| Product clarity | 15% | 95 | 14.3 | Excellent, unambiguous |
| Pricing transparency | 10% | 80 | 8.0 | Clear display; no live checkout |
| Payment flow (Paystack) | 15% | 25 | 3.8 | CTA → contact form, not checkout |
| Legal completeness | 20% | 55 | 11.0 | All docs exist; public draft disclaimer + placeholder |
| Privacy/data protection | 10% | 65 | 6.5 | Strong policy; no consent UI |
| Refund policy | 10% | 95 | 9.5 | Clear, well-placed |
| Business identity/contact | 10% | 20 | 2.0 | Placeholder RC/address/phone |
| Trust signals | 10% | 70 | 7.0 | Good; no leadership; placeholder identity drags it |
| **Total** | **100%** | — | **≈ 62** | **Decline today** |

**Interpretation:**
- **0–59:** Not ready — multiple structural gaps.
- **60–74:** ⟵ **You are here (62).** Strong foundation; blocked by a small set of critical content/config items. **Not submittable yet**, but a short remediation gets you to approval.
- **75–89:** Submittable; likely approve with minor follow-ups.
- **90–100:** Approve-ready.

**Projected score after CRIT + HIGH fixes:** **≈ 90 / 100** (approve-ready). The remediation is almost entirely filling real details, removing one public banner, and wiring a checkout — no redesign required.

---

## 7. Bottom Line

Dreamscape Systems has done the structurally hard part better than most applicants: the IA, legal coverage, refund policy, and trust footer are genuinely strong. It would nonetheless be **declined today** for three reasons a reviewer cannot overlook — **placeholder business identity, a public "this is a draft" legal disclaimer, and no working Paystack payment flow** — plus a cookie-consent gap.

Close the five CRITICAL/HIGH items in Section 4, re-run the Section 5 checklist, and the site moves from a 62 ("decline") to roughly a 90 ("approve-ready"). None of the fixes require rebuilding anything.

---

*End of document — Paystack Merchant Compliance Audit v1.0*
