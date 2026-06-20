import { NextResponse } from "next/server";

export const runtime = "nodejs";

type WaitlistPayload = {
  email?: string;
  product?: string;
};

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let data: WaitlistPayload;
  try {
    data = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!data.email || !emailRe.test(data.email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 422 });
  }

  // TODO: persist to your waitlist store / ESP audience.
  console.info("[waitlist] new signup", { product: data.product ?? "unknown" });

  return NextResponse.json({ ok: true });
}
