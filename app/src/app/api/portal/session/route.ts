import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/portal/session";

export const runtime = "nodejs";

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Demo session establishment for the portal shell.
 *
 * Replace the body with a call to your VPN/account backend's auth endpoint:
 * exchange credentials for a real session token, then set it as an HTTP-only
 * cookie here. The cookie name/shape is the only thing the shell depends on.
 */
export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.email || !emailRe.test(body.email) || !body.password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 422 });
  }

  // TODO: authenticate against the backend and store the returned token.
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

/** Logout — clears the session cookie. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
