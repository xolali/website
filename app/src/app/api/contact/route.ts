import { NextResponse } from "next/server";
import { deliverNotification } from "@/lib/notify";

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

  const inbox = process.env.CONTACT_INBOX ?? "hello@dreamscapesystems.com";
  await deliverNotification({
    to: inbox,
    replyTo: data.email,
    subject: `[Contact] ${data.topic ?? "General enquiry"}: ${data.subject ?? "(no subject)"}`,
    text: `From: ${data.name} <${data.email}>\nTopic: ${data.topic ?? "General enquiry"}\n\n${data.message}`,
  });

  return NextResponse.json({ ok: true });
}
