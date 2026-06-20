import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/primitives";
import { SupportForm } from "@/components/forms/SupportForm";
import { getPortalClient } from "@/lib/portal/client";
import { formatDate } from "@/lib/utils";
import type { TicketStatus } from "@/lib/portal/types";

const statusTone: Record<TicketStatus, "live" | "soon" | "neutral"> = {
  open: "soon",
  in_progress: "soon",
  awaiting_reply: "soon",
  resolved: "live",
  closed: "neutral",
};

const statusLabel: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In progress",
  awaiting_reply: "Awaiting reply",
  resolved: "Resolved",
  closed: "Closed",
};

export default async function PortalSupportPage() {
  const tickets = await getPortalClient().getTickets();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-quartz">Support</h1>
        <p className="mt-1 text-slate-400">
          Your account and subscription details are attached automatically — no need to verify
          who you are.
        </p>
      </div>

      {/* Existing tickets */}
      <div>
        <h2 className="font-display text-lg font-bold text-quartz">Your tickets</h2>
        <ul className="mt-4 space-y-3">
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <Card className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{ticket.reference}</span>
                    <Badge tone={statusTone[ticket.status]}>{statusLabel[ticket.status]}</Badge>
                  </div>
                  <p className="mt-1 font-medium text-quartz">{ticket.subject}</p>
                  <p className="text-xs text-slate-400">
                    {ticket.category} · Updated {formatDate(ticket.updatedAt)}
                  </p>
                </div>
              </Card>
            </li>
          ))}
          {tickets.length === 0 && (
            <li>
              <Card className="text-center text-slate-400">No tickets yet.</Card>
            </li>
          )}
        </ul>
      </div>

      {/* New ticket */}
      <div className="rounded-xl border border-white/10 bg-slate-800/40 p-6">
        <h2 className="font-display text-lg font-bold text-quartz">Open a new ticket</h2>
        <p className="mt-1 text-sm text-slate-400">
          Tell us what&apos;s happening and we&apos;ll respond within 24 hours.
        </p>
        <div className="mt-6">
          <SupportForm />
        </div>
      </div>
    </div>
  );
}
