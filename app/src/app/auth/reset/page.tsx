"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthCard } from "@/components/portal/AuthCard";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/forms/fields";

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setLoading(true);
    // In production this triggers your backend's password-reset email.
    // We always show success to avoid leaking which emails are registered.
    await new Promise((r) => setTimeout(r, 400));
    setSent(true);
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle={sent ? undefined : "We'll email you a link to set a new password."}
      footer={
        <Link href="/auth/login" className="text-aurora hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center" role="status">
          <CheckCircle2 className="h-10 w-10 text-success" aria-hidden />
          <p className="text-sm text-slate-400">
            If an account exists for that email, a password-reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Field label="Email address" htmlFor="email" required error={error ?? undefined}>
            <TextInput id="email" name="email" type="email" autoComplete="email" />
          </Field>
          <Button type="submit" size="lg" disabled={loading} aria-busy={loading} className="w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            Send reset link
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
