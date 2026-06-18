import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  topic?: string;
  subject?: string;
  message?: string;
  consent?: string;
  company_website?: string; // honeypot
};

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: silently accept to avoid signalling bots, but do nothing.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  if (!data.name?.trim() || !data.email || !emailRe.test(data.email) || !data.message?.trim()) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 422 });
  }
  if (!data.consent) {
    return NextResponse.json({ error: "Consent is required." }, { status: 422 });
  }

  // TODO: deliver to CONTACT_INBOX via your email/CRM provider.
  // Intentionally avoids logging PII to server logs.
  console.info("[contact] new enquiry", { topic: data.topic ?? "General enquiry" });

  return NextResponse.json({ ok: true });
}
