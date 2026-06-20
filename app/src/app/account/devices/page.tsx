import Link from "next/link";
import { Plus, Smartphone, Laptop, Monitor } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { RevokeDeviceButton } from "@/components/portal/RevokeDeviceButton";
import { getPortalClient } from "@/lib/portal/client";
import { formatDate } from "@/lib/utils";
import type { DevicePlatform } from "@/lib/portal/types";

const platformIcon: Record<DevicePlatform, typeof Smartphone> = {
  android: Smartphone,
  ios: Smartphone,
  windows: Monitor,
  macos: Laptop,
  linux: Monitor,
};

function lastSeen(iso: string | null): string {
  if (!iso) return "Never connected";
  return `Last handshake ${formatDate(iso)}`;
}

export default async function DevicesPage() {
  const client = getPortalClient();
  const [devices, subscription] = await Promise.all([
    client.getDevices(),
    client.getSubscription(),
  ]);
  const atLimit = devices.length >= subscription.deviceLimit;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-quartz">Devices</h1>
          <p className="mt-1 text-sm text-slate-400">
            {devices.length} of {subscription.deviceLimit} devices in use
          </p>
        </div>
        <Button href="/account/devices/new" size="sm" aria-disabled={atLimit}>
          <Plus className="h-4 w-4" aria-hidden />
          Add device
        </Button>
      </div>

      {atLimit && (
        <p className="rounded-md border border-warning/30 bg-warning/10 p-3 text-sm text-slate-400">
          You&apos;ve reached your plan&apos;s device limit. Revoke a device or upgrade your plan
          to add more.
        </p>
      )}

      <ul className="space-y-4">
        {devices.map((device) => {
          const Icon = platformIcon[device.platform];
          return (
            <li key={device.id}>
              <Card className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5">
                    <Icon className="h-5 w-5 text-aurora" aria-hidden />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-quartz">{device.name}</p>
                      <Badge tone={device.lastHandshakeAt ? "live" : "neutral"}>
                        {device.lastHandshakeAt ? "Active" : "Idle"}
                      </Badge>
                    </div>
                    <p className="text-xs capitalize text-slate-400">
                      {device.platform} · {device.protocol} · {lastSeen(device.lastHandshakeAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/account/devices/${device.id}`}
                    className="rounded-md px-2.5 py-1.5 text-sm text-aurora hover:bg-aurora/10"
                  >
                    Config
                  </Link>
                  <RevokeDeviceButton id={device.id} name={device.name} />
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      {devices.length === 0 && (
        <Card className="text-center">
          <p className="text-slate-400">No devices yet. Add one to get connected.</p>
          <div className="mt-4 flex justify-center">
            <Button href="/account/devices/new" size="sm">
              <Plus className="h-4 w-4" aria-hidden />
              Add your first device
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
