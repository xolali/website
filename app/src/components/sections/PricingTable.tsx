"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/primitives";
import { pricingPlans, pricingIncludes } from "@/content/products";
import { cn } from "@/lib/utils";

export function PricingTable() {
  const [active, setActive] = useState<string>("annual");

  return (
    <div className="mt-12">
      {/* Interval tabs */}
      <div
        role="tablist"
        aria-label="Billing interval"
        className="mx-auto flex w-fit rounded-full border border-white/10 bg-slate-800/50 p-1"
      >
        {pricingPlans.map((plan) => (
          <button
            key={plan.id}
            role="tab"
            aria-selected={active === plan.id}
            onClick={() => setActive(plan.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora",
              active === plan.id ? "bg-aurora text-white" : "text-slate-400 hover:text-quartz",
            )}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            highlighted={plan.featured}
            className={cn(
              "flex flex-col",
              active === plan.id && "ring-1 ring-aurora/40",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-quartz">{plan.name}</h3>
              {plan.badge && <Badge tone="soon">{plan.badge}</Badge>}
            </div>
            <p className="mt-4">
              <span className="font-display text-4xl font-extrabold text-quartz">
                {plan.price}
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-400">{plan.cadence}</p>
            {plan.note && <p className="mt-1 text-xs text-slate-400">{plan.note}</p>}
            <Button
              href={`/checkout?plan=${plan.id}`}
              variant={plan.featured ? "primary" : "secondary"}
              className="mt-6 w-full"
            >
              Get started
            </Button>
          </Card>
        ))}
      </div>

      {/* Included */}
      <div className="mx-auto mt-12 max-w-2xl">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-400">
          Every plan includes
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {pricingIncludes.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
              <Check className="h-4 w-4 shrink-0 text-aurora" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-slate-400">
          Pay securely with card or your preferred local method, processed by Paystack. Not
          satisfied? Get a full refund within 7 days —{" "}
          <Link href="/legal/refund-policy" className="text-aurora hover:underline">
            see our Refund Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
