import { NextResponse } from "next/server";
import { getPortalClient } from "@/lib/portal/client";
import { isAuthenticated } from "@/lib/portal/session";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  await getPortalClient().revokeDevice(id);
  return NextResponse.json({ ok: true });
}
