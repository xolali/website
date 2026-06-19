"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type State = "verifying" | "success" | "failed";

export function CallbackClient() {
  const params = useSearchParams();
  const reference = params.get("reference") ?? params.get("trxref");
  const [state, setState] = useState<State>("verifying");
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setState("failed");
      return;
    }
    let active = true;
    (async () => {
      try {
        const res = await fetch(`/api/checkout?reference=${encodeURIComponent(reference)}`);
        const json = (await res.json()) as { status?: string; plan?: string | null };
        if (!active) return;
        if (res.ok && json.status === "success") {
          setPlan(json.plan ?? null);
          setState("success");
        } else {
          setState("failed");
        }
      } catch {
        if (active) setState("failed");
      }
    })();
    return () => {
      active = false;
    };
  }, [reference]);

  return (
    <Card className="mx-auto max-w-lg text-center">
      {state === "verifying" && (
        <div className="flex flex-col items-center gap-3 py-6" role="status">
          <Loader2 className="h-10 w-10 animate-spin text-aurora" aria-hidden />
          <p className="text-slate-400">Confirming your payment…</p>
        </div>
      )}

      {state === "success" && (
        <div className="flex flex-col items-center gap-3 py-6">
          <CheckCircle2 className="h-12 w-12 text-success" aria-hidden />
          <h2 className="font-display text-xl font-bold text-quartz">You&apos;re all set.</h2>
          <p className="text-slate-400">
            Your AfroVPN {plan ? `${plan} ` : ""}subscription is active. Download the app and
            connect in one tap. A receipt is on its way to your email.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="/afrovpn">Get the app</Button>
            <Button href="/support" variant="secondary">
              Visit Support
            </Button>
          </div>
        </div>
      )}

      {state === "failed" && (
        <div className="flex flex-col items-center gap-3 py-6">
          <XCircle className="h-12 w-12 text-error" aria-hidden />
          <h2 className="font-display text-xl font-bold text-quartz">
            We couldn&apos;t confirm your payment.
          </h2>
          <p className="text-slate-400">
            If you were charged, don&apos;t worry — contact us and we&apos;ll sort it out right
            away. No charge means you can simply try again.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="/afrovpn#pricing">Try again</Button>
            <Button href="/contact" variant="secondary">
              Contact support
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
