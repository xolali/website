import Link from "next/link";
import { ArrowRight, Smartphone, Download } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { getPortalClient } from "@/lib/portal/client";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const client = getPortalClient();
  const [user, subscription, devices, invoices] = await Promise.all([
    client.getUser(),
    client.getSubscription(),
    client.getDevices(),
    client.getInvoices(),
  ]);

  const firstName = user.fullName?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-quartz">
          Welcome back, {firstName}.
        </h1>
        <p className="mt-1 text-slate-400">Here&apos;s the state of your AfroVPN account.</p>
      </div>

      {/* Subscription */}
      <Card highlighted>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-quartz">
                {subscription.planName} plan
              </h2>
              <Badge tone={subscription.status === "active" ? "live" : "soon"}>
                {subscription.status === "active" ? "Active" : subscription.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              {subscription.priceLabel} · Renews {formatDate(subscription.currentPeriodEnd)}
            </p>
          </div>
          <Button href="/account/billing" variant="secondary" size="sm">
            Manage billing
          </Button>
        </div>
      </Card>

      {/* Quick actions */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Card interactive>
          <Link href="/account/devices" className="block">
            <Smartphone className="h-6 w-6 text-aurora" aria-hidden />
            <h3 className="mt-3 font-semibold text-quartz">Devices</h3>
            <p className="mt-1 text-sm text-slate-400">
              {devices.length} of {subscription.deviceLimit} in use
            </p>
          </Link>
        </Card>
        <Card interactive>
          <Link href="/account/devices/new" className="block">
            <Download className="h-6 w-6 text-aurora" aria-hidden />
            <h3 className="mt-3 font-semibold text-quartz">Add a device</h3>
            <p className="mt-1 text-sm text-slate-400">Generate a new VPN configuration</p>
          </Link>
        </Card>
      </div>

      {/* Recent invoices */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-quartz">Recent invoices</h2>
          <Link href="/account/billing" className="inline-flex items-center gap-1 text-sm text-aurora hover:gap-2 transition-all">
            View all <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {invoices.slice(0, 3).map((inv) => (
            <li key={inv.id} className="flex items-center justify-between py-3 text-sm">
              <span className="text-slate-400">{formatDate(inv.issuedAt)}</span>
              <span className="font-medium text-quartz">{inv.amountLabel}</span>
              <Badge tone={inv.status === "paid" ? "live" : "neutral"}>{inv.status}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">Need a hand with anything?</p>
          <Button href="/account/support" variant="secondary" size="sm">
            Contact support
          </Button>
        </div>
      </Card>
    </div>
  );
}
