"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, SelectInput, TextArea, TextInput } from "./fields";

type Status = "idle" | "submitting" | "success" | "error";

const TOPICS = ["Support", "General enquiry", "Partnership", "Press", "Investment", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const nextErrors: Record<string, string> = {};
    if (!String(data.name ?? "").trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email ?? "")))
      nextErrors.email = "Please enter a valid email address.";
    if (!String(data.message ?? "").trim()) nextErrors.message = "Please enter a message.";
    if (!data.consent) nextErrors.consent = "Please accept the Privacy Policy to continue.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-8 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden />
        <h3 className="text-lg font-semibold text-quartz">Thanks — message received.</h3>
        <p className="text-sm text-slate-400">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-live="polite">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name}>
          <TextInput id="name" name="name" autoComplete="name" aria-describedby="name-error" />
        </Field>
        <Field label="Email address" htmlFor="email" required error={errors.email}>
          <TextInput id="email" name="email" type="email" autoComplete="email" aria-describedby="email-error" />
        </Field>
      </div>

      <Field label="What's this about?" htmlFor="topic">
        <SelectInput id="topic" name="topic" defaultValue="General enquiry">
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectInput>
      </Field>

      <Field label="Subject" htmlFor="subject">
        <TextInput id="subject" name="subject" />
      </Field>

      <Field label="Message" htmlFor="message" required error={errors.message}>
        <TextArea id="message" name="message" aria-describedby="message-error" />
      </Field>

      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="space-y-1.5">
        <label className="flex items-start gap-2.5 text-sm text-slate-400">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-slate-800 text-aurora focus-visible:ring-2 focus-visible:ring-aurora"
          />
          <span>
            I agree to the{" "}
            <Link href="/legal/privacy" className="text-aurora hover:underline">
              Privacy Policy
            </Link>{" "}
            and consent to being contacted about my enquiry.
          </span>
        </label>
        {errors.consent && (
          <p className="text-sm text-error" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-error" role="alert">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} aria-busy={status === "submitting"}>
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Send message
      </Button>
      <p className="text-sm text-slate-400">We typically respond within 24 hours.</p>
    </form>
  );
}
