import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { getPortalClient } from "@/lib/portal/client";
import { formatDate } from "@/lib/utils";

export default async function BillingPage() {
  const client = getPortalClient();
  const [subscription, invoices] = await Promise.all([
    client.getSubscription(),
    client.getInvoices(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold text-quartz">Billing</h1>

      {/* Current plan */}
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-quartz">
                {subscription.planName}
              </h2>
              <Badge tone={subscription.status === "active" ? "live" : "soon"}>
                {subscription.status === "active" ? "Active" : subscription.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-400">{subscription.priceLabel}</p>
            <p className="mt-1 text-sm text-slate-400">
              {subscription.cancelAtPeriodEnd
                ? `Cancels on ${formatDate(subscription.currentPeriodEnd)}`
                : `Next charge ${formatDate(subscription.currentPeriodEnd)}`}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button href="/afrovpn#pricing" variant="secondary" size="sm">
              Change plan
            </Button>
            <Button href="/account/support" variant="ghost" size="sm">
              Cancel subscription
            </Button>
          </div>
        </div>
      </Card>

      {/* Invoices */}
      <div>
        <h2 className="font-display text-lg font-bold text-quartz">Invoices</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                <th scope="col" className="px-4 py-3 font-semibold">Amount</th>
                <th scope="col" className="px-4 py-3 font-semibold">Reference</th>
                <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                <th scope="col" className="px-4 py-3 font-semibold sr-only">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-4 py-3 text-slate-400">{formatDate(inv.issuedAt)}</td>
                  <td className="px-4 py-3 font-medium text-quartz">{inv.amountLabel}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">
                    {inv.paystackReference}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={inv.status === "paid" ? "live" : "neutral"}>{inv.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="text-aurora hover:underline disabled:opacity-40"
                      disabled
                      title="Receipt PDF — available once billing is live"
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Payments are processed securely by Paystack. Receipts download as PDF once billing is
          connected.
        </p>
      </div>
    </div>
  );
}
