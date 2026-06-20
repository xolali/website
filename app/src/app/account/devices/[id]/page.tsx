import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { RevokeDeviceButton } from "@/components/portal/RevokeDeviceButton";
import { getPortalClient } from "@/lib/portal/client";
import { formatDate } from "@/lib/utils";

export default async function DeviceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const device = await getPortalClient().getDevice(id);
  if (!device || device.status === "revoked") notFound();

  return (
    <div className="max-w-xl space-y-6">
      <Link
        href="/account/devices"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-quartz"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Devices
      </Link>

      <Card>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-quartz">{device.name}</h1>
          <Badge tone={device.lastHandshakeAt ? "live" : "neutral"}>
            {device.lastHandshakeAt ? "Active" : "Idle"}
          </Badge>
        </div>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-400">Platform</dt>
            <dd className="capitalize text-quartz">{device.platform}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400">Protocol</dt>
            <dd className="uppercase text-quartz">{device.protocol}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400">Added</dt>
            <dd className="text-quartz">{formatDate(device.createdAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400">Last handshake</dt>
            <dd className="text-quartz">
              {device.lastHandshakeAt ? formatDate(device.lastHandshakeAt) : "Never"}
            </dd>
          </div>
        </dl>

        <p className="mt-5 text-sm text-slate-400">
          For your privacy, we don&apos;t keep a history of what this device connects to — only
          a coarse &quot;last seen&quot; signal so you can tell it&apos;s working.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
          <Button href="/account/devices/new" variant="secondary" size="sm">
            <RefreshCw className="h-4 w-4" aria-hidden />
            Re-issue configuration
          </Button>
          <RevokeDeviceButton id={device.id} name={device.name} />
        </div>
      </Card>
    </div>
  );
}
