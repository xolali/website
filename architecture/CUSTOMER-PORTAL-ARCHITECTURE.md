# AfroVPN — Customer Portal Architecture Document

**Document type:** Platform / Solution Architecture
**Version:** 1.0
**Date:** 19 June 2026
**Author:** SaaS Platform Architect
**Status:** Future-state design (forward-looking; not yet built)
**Context:** Dreamscape Systems · AfroVPN · Ghana-first (GHS, Paystack), expanding across West Africa

---

## 0. Executive Summary

This document designs the **AfroVPN Customer Portal** — the authenticated self-service application where customers register, subscribe, pay, manage devices, download VPN configurations, view invoices, and contact support.

It is the operational counterpart to the marketing site already built (`/`, `/afrovpn`, `/pricing`, `/checkout`). The portal lives behind authentication at `app.dreamscapesystems.com` (or `/account` initially) and sits between three planes:

```
   Customer ──► Portal (web/app)
                  │
        ┌─────────┼──────────────┬────────────────────┐
        ▼         ▼              ▼                    ▼
   Identity    Billing       VPN Control          Support
   (auth)      (Paystack)    Plane (provisioning) (helpdesk)
```

**First principle — the no-logs promise constrains the data model.** The portal stores *account, billing, and device-provisioning metadata* only. It must **never** store browsing history, connection logs, traffic content, or per-session destination data. This is both a brand commitment and a compliance position (Ghana Data Protection Act, 2012 / Act 843), and it shapes every table and API in this document.

---

## 1. Scope & Capabilities

| # | Capability | Portal area |
|---|---|---|
| 1 | Register (email + password, email verify) | `/auth` |
| 2 | Login (sessions, MFA optional) | `/auth` |
| 3 | Purchase subscriptions (Paystack, GHS) | `/account/billing` |
| 4 | View invoices / receipts | `/account/billing/invoices` |
| 5 | Manage devices (add, rename, revoke; enforce plan limit) | `/account/devices` |
| 6 | Download VPN configurations (WireGuard/OpenVPN) | `/account/devices/:id` |
| 7 | Contact support (tickets tied to account) | `/account/support` |

**Out of scope (this version):** team/multi-seat accounts, reseller portal, affiliate dashboard, admin/ops console (separate internal app). These are noted in §10 (Future Extensions).

---

## 2. Personas

- **New visitor** → converts on the marketing site, lands in the portal post-payment.
- **Active subscriber** → manages devices, downloads configs, checks billing.
- **Lapsed subscriber** → renews or reactivates; configs disabled until paid.
- **Support agent** (internal) → consumes the same APIs through an admin surface (out of scope here, but APIs are designed to support it).

---

## 3. User Journeys

### 3.1 Registration → First Connection (the critical path)

```
Marketing CTA ─► /checkout (email + plan)
   │
   ├─► Paystack hosted payment (GHS)
   │
   ▼
/checkout/callback (verify) ──► account auto-provisioned (passwordless invite OR set password)
   │
   ▼
/account (onboarding) ──► "Add your first device"
   │
   ▼
/account/devices/new ──► name device + pick platform
   │
   ▼
Portal requests config from VPN Control Plane ──► returns WireGuard config + QR
   │
   ▼
User installs app / imports config ──► CONNECTED ✓
```
**Design note:** payment can precede account creation (checkout collects email first). On successful `charge.success`, the system provisions the account and emails a "set your password / magic link" invite. This minimizes pre-purchase friction (mobile-first reality).

### 3.2 Login (returning user)
```
/auth/login ─► email + password (+ optional TOTP/MFA)
   │              └─ forgot password ─► email reset link ─► /auth/reset
   ▼
session issued (HTTP-only cookie) ─► /account (dashboard)
```

### 3.3 Purchase / Upgrade / Renew
```
/account/billing ─► choose plan/interval ─► Paystack ─► callback verify
   │                                                        │
   └─ upgrade/downgrade: prorate at next cycle              ▼
                                              subscription state updated
                                              (active | past_due | cancelled)
```

### 3.4 Manage Devices (with plan-limit enforcement)
```
/account/devices ─► list (status, last handshake*, platform)
   ├─ Add device ─► [limit check] ─► provision peer ─► config + QR
   ├─ Rename device ─► metadata update
   └─ Revoke device ─► control plane removes peer ─► config invalidated
* last handshake = coarse "active/idle" only; NOT a browsing log.
```

### 3.5 Download VPN Configuration
```
/account/devices/:id ─► "Download config"
   ├─ WireGuard: .conf file + QR (private key generated client-side OR
   │             server-issued once, never re-displayed)
   └─ OpenVPN: .ovpn bundle
Re-download policy: configs are regenerated/rotated, not stored in plaintext.
```

### 3.6 View Invoices
```
/account/billing/invoices ─► table (date, plan, amount GHS, status)
   └─ row ─► PDF receipt (generated) + Paystack reference
```

### 3.7 Contact Support
```
/account/support ─► new ticket (category, priority, message)
   │   (account + subscription context auto-attached — no need to re-verify identity)
   ▼
ticket created (reuses /api/support pattern) ─► helpdesk ─► email updates ─► thread in portal
```

---

## 4. Wireframes (mobile-first; desktop reflow noted)

### 4.1 Dashboard `/account`
```
┌────────────────────────────┐
│ ◉ Dreamscape    [acct ▾]   │
╞════════════════════════════╡
│ Welcome back, Ama          │
│ ┌────────────────────────┐ │
│ │ Plan: Annual  ● Active │ │  ← subscription status card
│ │ Renews 12 Jun 2027     │ │
│ │ [Manage billing]       │ │
│ └────────────────────────┘ │
│ ┌──────────┐ ┌──────────┐  │
│ │ Devices  │ │ Download │  │  ← quick actions
│ │ 2 of 5   │ │ config   │  │
│ └──────────┘ └──────────┘  │
│ Recent invoices      [all] │
│  • 12 Jun  GH₵504  Paid    │
│ Need help? [Contact support]│
╞════════════════════════════╡
│ Devices · Billing · Support│  ← bottom tab nav (mobile)
└────────────────────────────┘
```
*Desktop:* left sidebar nav (Dashboard/Devices/Billing/Support/Settings) + content.

### 4.2 Devices `/account/devices`
```
┌────────────────────────────┐
│ Devices            2 of 5  │
│ [ + Add device ]           │
│ ┌────────────────────────┐ │
│ │ 📱 Ama's Pixel         │ │
│ │ Android · ● Active     │ │
│ │ Last handshake: 2h ago │ │
│ │ [Config] [Rename] [⋯]  │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ 💻 Work Laptop         │ │
│ │ Windows · ○ Idle       │ │
│ │ [Config] [Rename] [⋯]  │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

### 4.3 Add / Config Device `/account/devices/new`
```
┌────────────────────────────┐
│ Add a device               │
│ Name {Ama's Pixel       }  │
│ Platform [Android ▾]       │
│ Protocol (•)WireGuard ( )OVPN│
│ [ Generate configuration ] │
│ ─────────────────────────  │
│ ░ QR CODE ░   scan in app  │
│ [ Download .conf ]         │
│ ⚠ Shown once. Keep it safe.│
└────────────────────────────┘
```

### 4.4 Billing `/account/billing`
```
┌────────────────────────────┐
│ Billing                    │
│ Current: Annual GH₵504/yr  │
│ Status ● Active            │
│ Next charge 12 Jun 2027    │
│ [Change plan][Cancel]      │
│ Payment method ···· 4242   │
│ [Update payment method]    │
│ ── Invoices ─────────────  │
│ 12 Jun 2026 GH₵504 Paid →  │
│ 12 Jun 2025 GH₵504 Paid →  │
└────────────────────────────┘
```

### 4.5 Support `/account/support`
```
┌────────────────────────────┐
│ Support                    │
│ [ + New ticket ]           │
│ #DS-4F2A1 Billing  ● Open  │
│ #DS-3C7B9 Setup  ✓Resolved │
│ ── New ticket ──────────── │
│ Category [Connection ▾]    │
│ Priority [Normal ▾]        │
│ Message {…}                │
│ [ Submit ]                 │
└────────────────────────────┘
```

---

## 5. Database Model

**Engine:** PostgreSQL. **Conventions:** UUID v7 PKs, `created_at`/`updated_at` (UTC), soft-delete where useful (`deleted_at`), row-level encryption for secrets. **No-logs rule enforced at schema level — there is deliberately no `connection_logs`/`traffic` table.**

### 5.1 Entity-relationship overview
```
users ──1:1── auth_credentials
  │
  ├──1:N── sessions
  ├──1:N── subscriptions ──1:N── invoices
  │                         └──1:1── (Paystack subscription ref)
  ├──1:N── devices ──1:1── vpn_peers   (peers live logically in control plane)
  ├──1:N── support_tickets ──1:N── ticket_messages
  └──1:N── audit_events   (security/account actions only)
plans (reference) ◄── subscriptions
```

### 5.2 Tables

**users**
| column | type | notes |
|---|---|---|
| id | uuid (PK) | |
| email | citext UNIQUE | login identifier |
| email_verified_at | timestamptz null | |
| full_name | text null | |
| country | text | default 'GH' |
| status | enum(active, suspended, deleted) | |
| mfa_enabled | bool | default false |
| created_at / updated_at | timestamptz | |

**auth_credentials**
| column | type | notes |
|---|---|---|
| user_id | uuid (PK, FK→users) | |
| password_hash | text | Argon2id |
| totp_secret_enc | bytea null | encrypted; MFA |
| password_updated_at | timestamptz | |

**sessions**
| column | type | notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| refresh_token_hash | text | rotating |
| user_agent / ip_hash | text | **ip hashed**, for security only, short TTL |
| expires_at | timestamptz | |
| revoked_at | timestamptz null | |

**plans** (reference data)
| column | type | notes |
|---|---|---|
| id | text (PK) | 'monthly' \| 'annual' \| 'biennial' |
| name | text | |
| amount_minor | int | pesewas (GHS×100) |
| currency | text | 'GHS' |
| interval | enum(month, year, biennial) | |
| device_limit | int | e.g. 5 |
| active | bool | |

**subscriptions**
| column | type | notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| plan_id | text (FK→plans) | |
| status | enum(trialing, active, past_due, cancelled, expired) | |
| paystack_customer_code | text | |
| paystack_subscription_code | text null | |
| current_period_start / _end | timestamptz | drives access |
| cancel_at_period_end | bool | |
| created_at / updated_at | timestamptz | |

**invoices**
| column | type | notes |
|---|---|---|
| id | uuid (PK) | |
| subscription_id | uuid (FK) | |
| user_id | uuid (FK) | denormalized for fast listing |
| amount_minor | int | |
| currency | text | 'GHS' |
| status | enum(paid, failed, refunded, pending) | |
| paystack_reference | text UNIQUE | reconciliation key |
| issued_at | timestamptz | |
| receipt_url | text null | generated PDF location |

**devices**
| column | type | notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| name | text | user-chosen |
| platform | enum(android, ios, windows, macos, linux) | |
| protocol | enum(wireguard, openvpn) | |
| public_key | text | WG peer public key (private key NOT stored) |
| assigned_ip | inet | tunnel IP within peer subnet |
| status | enum(active, revoked) | |
| last_handshake_at | timestamptz null | **coarse liveness only**, not a log |
| created_at | timestamptz | |
| revoked_at | timestamptz null | |

> **Privacy guardrail:** `devices` holds provisioning metadata + a *single* coarse `last_handshake_at` (for "active/idle" UX). It must **not** accumulate historical connection records, destinations, or byte-level usage tied to browsing.

**support_tickets** / **ticket_messages** — mirror the existing site support model, now FK'd to `user_id`, carrying subscription context. (`status`: open, in_progress, awaiting_reply, resolved, closed.)

**audit_events** (security & account actions only — login, password change, device revoke, plan change; never browsing.)
| column | type | notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK) | |
| type | text | e.g. 'login.success', 'device.revoked' |
| ip_hash | text | hashed, retention-limited |
| created_at | timestamptz | |

---

## 6. API Requirements

**Style:** REST/JSON over HTTPS, versioned `/api/v1`. **Auth:** short-lived access token (JWT, ~15 min) + rotating refresh token in HTTP-only Secure SameSite cookie. **All mutations** require CSRF protection + re-auth for sensitive actions. **Rate-limited** per IP+account.

### 6.1 Auth
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | create account (email, password) → send verify email |
| POST | `/auth/verify-email` | confirm token |
| POST | `/auth/login` | issue session (+ MFA challenge if enabled) |
| POST | `/auth/mfa/verify` | submit TOTP |
| POST | `/auth/refresh` | rotate access token |
| POST | `/auth/logout` | revoke session |
| POST | `/auth/password/forgot` · `/auth/password/reset` | reset flow |

### 6.2 Account & Billing
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/me` | profile + subscription summary |
| PATCH | `/me` | update name, preferences |
| GET | `/subscriptions/current` | current plan + period + status |
| POST | `/checkout/session` | start Paystack init for a plan (GHS) |
| POST | `/subscriptions/change` | upgrade/downgrade (proration) |
| POST | `/subscriptions/cancel` | cancel at period end |
| GET | `/invoices` | list invoices |
| GET | `/invoices/:id/receipt` | PDF receipt |
| POST | `/webhooks/paystack` | **signed** event sink (see §7) |

### 6.3 Devices & Configs
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/devices` | list user devices + status |
| POST | `/devices` | add device → **provision peer** (limit-checked) |
| PATCH | `/devices/:id` | rename |
| DELETE | `/devices/:id` | revoke → control plane removes peer |
| GET | `/devices/:id/config` | issue WG `.conf` / OVPN bundle (+ QR), one-time secret |
| POST | `/devices/:id/config/rotate` | rotate keys, invalidate old config |

### 6.4 Support
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/support/tickets` · `/support/tickets/:id` | list / detail |
| POST | `/support/tickets` | create (account context auto-attached) |
| POST | `/support/tickets/:id/messages` | reply |

**Cross-cutting requirements:** idempotency keys on POST checkout/device-provision; pagination on list endpoints; consistent error envelope `{ error: { code, message } }`; OpenAPI 3.1 spec as the contract; structured audit logging of mutations (account actions only).

---

## 7. Integration Points

### 7.1 Identity / Auth
- Self-managed (Argon2id, rotating refresh tokens) **or** a managed IdP (e.g., Clerk/Auth0/Ory) if speed is prioritized. Recommendation: start managed for MFA/email flows, keep the user record locally as the source of truth via webhook sync.

### 7.2 Billing — Paystack (already partially integrated on the marketing site)
- **Initialize/verify** transactions (reuse the existing `/api/checkout` pattern; currency **GHS**, amounts in pesewas).
- **Subscriptions/Plans API** for recurring billing; store `paystack_subscription_code`.
- **Webhooks** (`/webhooks/paystack`, signature-verified with `x-paystack-signature` HMAC-SHA512):
  - `charge.success` → mark invoice paid, (re)activate subscription, provision/unlock devices, send receipt.
  - `invoice.update` / `invoice.payment_failed` → set `past_due`, start dunning, **disable VPN peers** after grace period.
  - `subscription.disable` → set `cancelled/expired`, revoke peers at period end.
- **Reconciliation:** `paystack_reference` is the idempotent key; nightly job reconciles Paystack vs `invoices`.

### 7.3 VPN Control Plane (the core integration)
The portal is a **billing/identity front-end to a provisioning API**; it does not move packets. Interaction is provisioning-only.

```
Portal ──(internal service-to-service, mTLS)──► VPN Control Plane API
                                                  │
                                                  ├─ create_peer(user, device, region)
                                                  │     → { assigned_ip, server_pubkey, endpoints }
                                                  ├─ revoke_peer(peer_id)
                                                  ├─ rotate_peer(peer_id)
                                                  └─ peer_status(peer_id) → { last_handshake } (coarse)
                                                  │
                                                  ▼
                                       Edge VPN nodes (WireGuard / OpenVPN)
                                       across 40+ country PoPs
```

**Control-plane contract (provisioning API the portal depends on):**
| Operation | Input | Output | Used by |
|---|---|---|---|
| `POST /peers` | user_id, device_id, public_key, region pref | assigned_ip, server public key, allowed_ips, endpoint(s), DNS | Add device |
| `DELETE /peers/:id` | peer_id | ack | Revoke device, cancellation |
| `POST /peers/:id/rotate` | peer_id | new server params | Config rotate |
| `GET /peers/:id` | peer_id | status, last_handshake (coarse) | Device list UX |
| `POST /peers/bulk-disable` | user_id | ack | Past-due / cancellation |

**Key management & no-logs alignment:**
- **WireGuard keypairs:** prefer **client-side private-key generation** — the device app generates the private key; only the **public key** is sent to the portal/control plane. The private key never touches Dreamscape servers. (Fallback for browser download: server generates, displays once, never persists in plaintext.)
- **Config delivery:** the `.conf`/`.ovpn` is assembled on demand and streamed once; secrets are not stored at rest in the portal DB.
- **Region/PoP selection:** the control plane returns the best endpoint(s); the portal stores only the assignment metadata.
- **Liveness only:** `peer_status` returns a coarse `last_handshake` timestamp for "active/idle" UX — **never** destinations, bandwidth-by-site, or session history. The control plane is configured for the no-logs posture; the portal cannot request what isn't kept.

### 7.4 Support / Helpdesk
- Reuse the site's support pattern; sync tickets to the helpdesk (e.g., via API or email pipe). Account + subscription context attached automatically so agents needn't re-verify the customer.

### 7.5 Notifications
- Transactional email (receipts, password resets, dunning, device alerts) via the existing `lib/notify` provider (Resend or equivalent). Optional SMS/WhatsApp for West-Africa-friendly reminders later.

---

## 8. Security & Compliance

- **Data minimization (Act 843 / NDPR-ready):** store only account, billing, and provisioning metadata. No browsing/traffic logs — architecturally absent.
- **Secrets:** Argon2id password hashing; private keys never stored (client-gen); secrets at rest encrypted (KMS-backed); mTLS for portal↔control-plane.
- **Sessions:** HTTP-only Secure SameSite cookies; short access-token TTL; refresh rotation; device/session revocation.
- **Payments:** never store full PAN; rely on Paystack tokenization; verify webhook signatures.
- **Access control:** per-user row isolation; sensitive actions (cancel, device revoke, payment change) require re-auth / step-up.
- **Auditability:** account-action audit trail (not browsing) with retention limits and hashed IPs.
- **DSAR support:** account export + delete flows honoring data-subject rights; deletion cascades to peers (control-plane revoke).

---

## 9. Suggested Tech Stack (continuity with the existing build)

| Layer | Choice | Rationale |
|---|---|---|
| Web app | Next.js 15 App Router (extends current repo under `/account`) | reuse design system, components, tokens |
| API | Next.js Route Handlers or a dedicated Node/Nest service | start in-repo, extract later |
| DB | PostgreSQL (+ Prisma/Drizzle) | relational integrity, migrations |
| Auth | Managed IdP or Lucia/Ory | MFA + email flows |
| Billing | Paystack (GHS) | already integrated |
| Control plane | Internal service (WireGuard `wg`/`wg-quick`, or netmaker/headscale-style) over mTLS | provisioning API |
| Infra | Containerized; regional PoPs for edge nodes | latency for African networks |

---

## 10. Phased Delivery & Future Extensions

**Phase 1 (MVP portal):** register/login, post-checkout provisioning, single-region devices, WireGuard config download, invoices list, support tickets.
**Phase 2:** MFA, plan change/proration, device limits + rotation, dunning/grace handling, PDF receipts.
**Phase 3:** OpenVPN parity, region selection UI, referral credits, WhatsApp/SMS notifications.
**Future:** team/multi-seat accounts, reseller portal, admin/ops console, and shared identity/billing for **DreamPay** and **DreamAssets** (the portal becomes the Dreamscape account layer, not just AfroVPN).

---

## 11. Open Questions / Decisions Needed

1. **Auth build vs. buy** — managed IdP (faster, MFA built-in) vs. self-hosted (full control, no per-MAU cost)?
2. **Account-before-pay vs. pay-first** — confirm the pay-first + magic-link provisioning flow (recommended for mobile conversion).
3. **WireGuard key generation** — mandate client-side generation in the apps (best privacy) — confirms native app roadmap.
4. **Control-plane ownership** — build in-house vs. adopt an open-source mesh (headscale/netmaker) — affects the provisioning API contract.
5. **Device-limit policy** — fixed per plan, or add-on device packs?

---

*End of document — AfroVPN Customer Portal Architecture v1.0*
