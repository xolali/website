"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

export function RevokeDeviceButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function revoke() {
    if (!window.confirm(`Revoke "${name}"? Its VPN configuration will stop working.`)) return;
    setBusy(true);
    try {
      await fetch(`/api/portal/devices/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={revoke}
      disabled={busy}
      aria-busy={busy}
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-slate-400 transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error disabled:opacity-50"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Trash2 className="h-4 w-4" aria-hidden />}
      Revoke
    </button>
  );
}
