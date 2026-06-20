"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({ product }: { product: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="inline-flex items-center gap-2 rounded-md bg-success/10 px-4 py-3 text-sm font-medium text-success" role="status">
        <CheckCircle2 className="h-5 w-5" aria-hidden />
        You&apos;re on the list. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`waitlist-${product}`} className="sr-only">
            Email address
          </label>
          <input
            id={`waitlist-${product}`}
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={!!error}
            aria-describedby={error ? `waitlist-${product}-error` : undefined}
            className={cn(
              "h-11 w-full rounded-md border bg-slate-800/60 px-3.5 text-sm text-quartz placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora",
              error ? "border-error" : "border-white/15 focus:border-aurora",
            )}
          />
        </div>
        <Button type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"}>
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          Join the waitlist
        </Button>
      </div>
      {error && (
        <p id={`waitlist-${product}-error`} className="mt-2 text-sm text-error" role="alert">
          {error}
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-error" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
      <p className="mt-2 text-xs text-slate-400">Be first to know. No spam, ever.</p>
    </form>
  );
}
