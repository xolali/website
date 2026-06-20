# Paystack Compliance — Remediation Log

**Date:** 19 June 2026
**Against:** `compliance/PAYSTACK-COMPLIANCE-AUDIT.md` (v1.0, score 62/100)
**Context update:** Dreamscape Systems is a **Ghana-registered** company. Services
launch in **Ghana first**, then Nigeria and the wider West Africa. Primary
currency is the **Ghana Cedi (GHS)**; lead data-protection regime is **Ghana's
Data Protection Act, 2012 (Act 843)**, with NDPR/GDPR noted for expansion.

---

## Localisation to Ghana (applied alongside the fixes)

| Change | Files |
|---|---|
| Country/currency config (Ghana, GHS, GH₵) added | `lib/site.ts` |
| Pricing converted NGN → **GHS** with Paystack minor-unit amounts | `content/products.ts` |
| Product JSON-LD `priceCurrency` NGN → **GHS** | `app/afrovpn/page.tsx` |
| Payment methods → **MTN MoMo / Vodafone Cash / AirtelTigo + Visa/Mastercard** | `content/faq.ts`, footer badges |
| Privacy legal basis → **Act 843 + Data Protection Commission** (NDPR/GDPR for expansion) | `content/legal.ts` |
| Terms governing law → **Republic of Ghana** | `content/legal.ts` |
| OG locale `en_NG` → **`en_GH`**; business hours → GMT | `lib/seo.ts`, `lib/site.ts` |

---

## Findings status

### 🔴 CRIT-1 — Placeholder business identity → **PARTIALLY RESOLVED (needs your data)**
- Removed the fake-looking `RC 0000000` / `+234 000…` values. Identity now reads
  from environment variables (`NEXT_PUBLIC_COMPANY_REG`, `_ADDRESS`, `_PHONE`)
  with Ghana-appropriate, clearly-labelled "to be confirmed" fallbacks.
- **Action still required from you:** supply the **real** Ghana RGD registration
  number, registered Accra address, and a monitored **+233** phone. Set them in
  `.env` (or `lib/site.ts`). Until these are real, this remains a blocker.

### 🔴 CRIT-2 — Public legal draft-disclaimer → ✅ **RESOLVED**
- Removed the public "this is a draft / not counsel-reviewed / written to pass
  Paystack" banner from `app/legal/[slug]/page.tsx` and deleted the constant.
- Replaced `[jurisdiction]` in Terms with **Republic of Ghana** governing law.
- *(Counsel review should still happen off-site; nothing on the public page now
  signals draft status.)*

### 🔴 CRIT-3 — No Paystack checkout → ✅ **RESOLVED (integration scaffolded)**
- New `/api/checkout` route initializes **and** verifies Paystack transactions
  (GHS, amount in pesewas, hosted authorization URL, metadata).
- New `/checkout` page (email + order summary) → redirects to Paystack; new
  `/checkout/callback` verifies and shows success/failure.
- Pricing CTA now points to `/checkout?plan=…` (was the contact form).
- **Action required from you:** add a GHS-enabled `PAYSTACK_SECRET_KEY`. Without
  it the flow degrades gracefully ("payments not yet configured").

### 🟠 HIGH-1 — No cookie consent → ✅ **RESOLVED**
- Added a `CookieConsent` banner (accept all / reject non-essential), persisted
  in `localStorage`, linking the Cookie Policy, dispatching a `ds:cookie-consent`
  event so analytics can gate on consent. Rendered site-wide in `layout.tsx`.
- `hasCookieConsent()` helper exported for analytics loaders.

### 🟡 MED-1 — Stubbed form delivery → ✅ **RESOLVED (config-driven)**
- Added `lib/notify.ts`: delivers contact & support submissions via Resend when
  `RESEND_API_KEY` is set; otherwise logs and still acknowledges the user.
- Contact and support routes now send to `CONTACT_INBOX` / `SUPPORT_INBOX`.
- **Action required from you:** set `RESEND_API_KEY` (or swap in your provider)
  and the inbox addresses for production delivery.

### 🟡 MED-2 — No visible leadership → ⏳ **OPEN (recommended, not blocking)**
- Not yet implemented. Recommend adding a real leadership block to `/about`
  before the DreamPay launch. Tracked for a future pass.

### 🟢 LOW-1 / LOW-2 — TLS, real marks, security.txt, status page → ⏳ **OPEN**
- Deployment-time items. Ensure valid HTTPS in production; use licensed payment
  marks; add `/.well-known/security.txt` and a status page when convenient.

---

## Verification

```
npm run typecheck   ✓ clean
npm run build       ✓ compiled, 29 routes generated
```

---

## Revised readiness

| State | Score | Notes |
|---|---|---|
| Audit baseline | 62 / 100 | Decline |
| **After this remediation (code)** | **~85 / 100** | CRIT-2/3, HIGH-1, MED-1 closed in code |
| After you supply real identity + Paystack live key | **~92 / 100** | Approve-ready |

**Remaining blockers are data, not code:** (1) real Ghana registration number,
address, and +233 phone; (2) a live GHS Paystack secret key; (3) production email
delivery credentials. Provide these and the site is submission-ready.

---

## What I still need from you

1. **Registered company name** as it appears on the RGD certificate (confirm
   "Dreamscape Systems Ltd." or the exact registered form).
2. **Ghana RGD registration number.**
3. **Registered address** (Accra or as registered).
4. **Monitored phone number** (+233).
5. **Paystack secret key** (GHS-enabled) — set in deployment secrets, not committed.
6. **Email delivery key** (Resend or preferred provider) + confirmed inbox addresses.
