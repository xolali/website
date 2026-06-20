"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthCard } from "@/components/portal/AuthCard";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/forms/fields";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/portal/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Could not sign in. Please try again.");
        setLoading(false);
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("Could not sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to manage your AfroVPN account."
      footer={
        <>
          New to AfroVPN?{" "}
          <Link href="/auth/register" className="text-aurora hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5" aria-live="polite">
        <Field label="Email address" htmlFor="email" required>
          <TextInput id="email" name="email" type="email" autoComplete="email" />
        </Field>
        <Field label="Password" htmlFor="password" required>
          <TextInput id="password" name="password" type="password" autoComplete="current-password" />
        </Field>
        <div className="flex justify-end">
          <Link href="/auth/reset" className="text-sm text-aurora hover:underline">
            Forgot password?
          </Link>
        </div>
        {error && (
          <p className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={loading} aria-busy={loading} className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}
