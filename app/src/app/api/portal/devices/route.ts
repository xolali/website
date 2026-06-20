import { NextResponse } from "next/server";
import { getPortalClient } from "@/lib/portal/client";
import { isAuthenticated } from "@/lib/portal/session";
import type { DevicePlatform, VpnProtocol } from "@/lib/portal/types";

export const runtime = "nodejs";

const PLATFORMS: DevicePlatform[] = ["android", "ios", "windows", "macos", "linux"];
const PROTOCOLS: VpnProtocol[] = ["wireguard", "openvpn"];

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const devices = await getPortalClient().getDevices();
  return NextResponse.json({ devices });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { name?: string; platform?: string; protocol?: string; publicKey?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const platform = PLATFORMS.includes(body.platform as DevicePlatform)
    ? (body.platform as DevicePlatform)
    : null;
  const protocol = PROTOCOLS.includes(body.protocol as VpnProtocol)
    ? (body.protocol as VpnProtocol)
    : "wireguard";

  if (!body.name?.trim() || !platform) {
    return NextResponse.json({ error: "Device name and platform are required." }, { status: 422 });
  }

  // Enforce the plan's device limit (control plane is the source of truth in prod).
  const client = getPortalClient();
  const [devices, subscription] = await Promise.all([
    client.getDevices(),
    client.getSubscription(),
  ]);
  if (devices.length >= subscription.deviceLimit) {
    return NextResponse.json(
      { error: `You've reached your plan's device limit (${subscription.deviceLimit}).` },
      { status: 409 },
    );
  }

  const config = await client.addDevice({
    name: body.name.trim(),
    platform,
    protocol,
    publicKey: body.publicKey,
  });
  return NextResponse.json(config, { status: 201 });
}
