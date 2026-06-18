import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SupportPayload = {
  email?: string;
  category?: string;
  subject?: string;
  priority?: string;
  description?: string;
  company_website?: string; // honeypot
};

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function generateTicketRef() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `DS-${stamp}${rand}`;
}

export async function POST(request: Request) {
  let data: SupportPayload;
  try {
    data = (await request.json()) as SupportPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (data.company_website) {
    return NextResponse.json({ ok: true, ticket: generateTicketRef() });
  }

  if (
    !data.email ||
    !emailRe.test(data.email) ||
    !data.subject?.trim() ||
    !data.description?.trim()
  ) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 422 });
  }

  const ticket = generateTicketRef();

  // TODO: create a ticket in your helpdesk (e.g. via API) and email confirmation.
  console.info("[support] new ticket", {
    ticket,
    category: data.category,
    priority: data.priority,
  });

  return NextResponse.json({ ok: true, ticket });
}
