import { NextResponse } from "next/server";
import { getPlan } from "@/content/products";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const PAYSTACK_BASE = "https://api.paystack.co";
const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Initialize a Paystack transaction for an AfroVPN plan.
 * POST { planId, email } -> { authorization_url, reference }
 *
 * Requires PAYSTACK_SECRET_KEY (Ghana GHS-enabled account). If it isn't set,
 * we return 503 so the UI can show a clear "checkout not yet configured" state
 * instead of failing silently.
 */
export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Payments are not yet configured. Please contact support to subscribe." },
      { status: 503 },
    );
  }

  let body: { planId?: string; email?: string };
  try {
    body = (await request.json()) as { planId?: string; email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const plan = body.planId ? getPlan(body.planId) : undefined;
  if (!plan) {
    return NextResponse.json({ error: "Unknown plan selected." }, { status: 422 });
  }
  if (!body.email || !emailRe.test(body.email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 422 });
  }

  const callbackUrl = new URL("/checkout/callback", siteConfig.url).toString();

  try {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        amount: plan.amountMinor, // pesewas
        currency: plan.currency, // GHS
        callback_url: callbackUrl,
        metadata: {
          plan_id: plan.id,
          plan_name: plan.name,
          product: "AfroVPN",
        },
      }),
    });

    const json = (await res.json()) as {
      status: boolean;
      message: string;
      data?: { authorization_url: string; reference: string };
    };

    if (!res.ok || !json.status || !json.data) {
      return NextResponse.json(
        { error: json.message ?? "Could not start checkout. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      authorization_url: json.data.authorization_url,
      reference: json.data.reference,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the payment provider. Please try again." },
      { status: 502 },
    );
  }
}

/**
 * Verify a transaction after Paystack redirects back.
 * GET /api/checkout?reference=... -> { status, plan }
 */
export async function GET(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const reference = new URL(request.url).searchParams.get("reference");

  if (!secret) {
    return NextResponse.json({ error: "Payments are not configured." }, { status: 503 });
  }
  if (!reference) {
    return NextResponse.json({ error: "Missing transaction reference." }, { status: 400 });
  }

  try {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    const json = (await res.json()) as {
      status: boolean;
      data?: { status: string; metadata?: { plan_name?: string } };
    };

    if (!res.ok || !json.status || !json.data) {
      return NextResponse.json({ status: "failed" }, { status: 502 });
    }

    return NextResponse.json({
      status: json.data.status, // "success" | "failed" | "abandoned"
      plan: json.data.metadata?.plan_name ?? null,
    });
  } catch {
    return NextResponse.json({ status: "failed" }, { status: 502 });
  }
}
