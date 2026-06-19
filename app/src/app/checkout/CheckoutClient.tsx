"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, TextInput } from "@/components/forms/fields";
import { getPlan, pricingPlans } from "@/content/products";

export function CheckoutClient() {
  const params = useSearchParams();
  const planId = params.get("plan") ?? "annual";
  const plan = getPlan(planId) ?? pricingPlans.find((p) => p.featured)!;

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, email }),
      });
      const json = (await res.json()) as { authorization_url?: string; error?: string };
      if (!res.ok || !json.authorization_url) {
        setError(json.error ?? "Could not start checkout. Please try again.");
        setLoading(false);
        return;
      }
      // Hand off to Paystack's secure hosted payment page.
      window.location.href = json.authorization_url;
    } catch {
      setError("Could not reach the payment provider. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-6 lg:grid-cols-[1fr_300px]">
      {/* Email + pay */}
      <Card>
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Field label="Email address" htmlFor="checkout-email" required error={error ?? undefined}>
            <TextInput
              id="checkout-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="checkout-email-error"
              placeholder="you@example.com"
            />
          </Field>
          <Button type="submit" size="lg" disabled={loading} aria-busy={loading} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}
            Pay {plan.price.replace("/mo", "")} with Paystack
          </Button>
          <p className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
            Secured by Paystack · PCI-DSS compliant · 7-day money-back guarantee
          </p>
        </form>
      </Card>

      {/* Order summary */}
      <Card className="h-fit">
        <h2 className="font-display text-lg font-bold text-quartz">Order summary</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-400">Product</dt>
            <dd className="text-quartz">AfroVPN</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400">Plan</dt>
            <dd className="text-quartz">{plan.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400">Billed</dt>
            <dd className="text-right text-quartz">{plan.note ?? plan.cadence}</dd>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3">
            <dt className="font-medium text-quartz">Total today</dt>
            <dd className="font-display text-lg font-bold text-aurora">
              {plan.note ? plan.note.split(" ")[0] : plan.price}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-slate-400">
          Cancel anytime. See our{" "}
          <Link href="/legal/refund-policy" className="text-aurora hover:underline">
            Refund Policy
          </Link>
          .
        </p>
      </Card>
    </div>
  );
}
