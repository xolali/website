"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthCard } from "@/components/portal/AuthCard";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/forms/fields";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (String(data.password ?? "").length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // In production this calls your backend's register endpoint, then a
      // session is established. The shell reuses the demo session route.
      const res = await fetch("/api/portal/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Could not create your account. Please try again.");
        setLoading(false);
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("Could not create your account. Please try again.");
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start protecting your connection with AfroVPN."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-aurora hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5" aria-live="polite">
        <Field label="Full name" htmlFor="name">
          <TextInput id="name" name="name" autoComplete="name" />
        </Field>
        <Field label="Email address" htmlFor="email" required>
          <TextInput id="email" name="email" type="email" autoComplete="email" />
        </Field>
        <Field label="Password" htmlFor="password" required>
          <TextInput
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
        </Field>
        {error && (
          <p className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={loading} aria-busy={loading} className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          Create account
        </Button>
        <p className="text-xs text-slate-400">
          By creating an account you agree to our{" "}
          <Link href="/legal/terms" className="text-aurora hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="text-aurora hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthCard>
  );
}
