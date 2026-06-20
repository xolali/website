"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, SelectInput, TextArea, TextInput } from "./fields";

type Status = "idle" | "submitting" | "success" | "error";

const CATEGORIES = [
  "Getting started",
  "Account & login",
  "Billing & payments",
  "Connection & performance",
  "Privacy & security",
];

const PRIORITIES = ["Low", "Normal", "Urgent"];

export function SupportForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [ticket, setTicket] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const nextErrors: Record<string, string> = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email ?? "")))
      nextErrors.email = "Please enter a valid email address.";
    if (!String(data.subject ?? "").trim()) nextErrors.subject = "Please add a subject.";
    if (!String(data.description ?? "").trim())
      nextErrors.description = "Please describe your issue.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      const json = (await res.json()) as { ticket?: string };
      setTicket(json.ticket ?? null);
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
        <h3 className="text-lg font-semibold text-quartz">Support request received.</h3>
        {ticket && (
          <p className="text-sm text-slate-400">
            Your ticket reference is{" "}
            <span className="font-mono font-semibold text-quartz">{ticket}</span>. Keep it
            for tracking. We respond within 24 hours.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-live="polite">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your email" htmlFor="s-email" required error={errors.email}>
          <TextInput id="s-email" name="email" type="email" autoComplete="email" aria-describedby="s-email-error" />
        </Field>
        <Field label="Category" htmlFor="s-category">
          <SelectInput id="s-category" name="category" defaultValue="Getting started">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Subject" htmlFor="s-subject" required error={errors.subject}>
          <TextInput id="s-subject" name="subject" aria-describedby="s-subject-error" />
        </Field>
        <Field label="Priority" htmlFor="s-priority">
          <SelectInput id="s-priority" name="priority" defaultValue="Normal">
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>

      <Field
        label="Describe your issue"
        htmlFor="s-description"
        required
        error={errors.description}
      >
        <TextArea
          id="s-description"
          name="description"
          placeholder="Tell us what's happening and what you've already tried."
          aria-describedby="s-description-error"
        />
      </Field>

      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === "error" && (
        <p className="text-sm text-error" role="alert">
          Something went wrong. Please try again or email support@dreamscapesystems.com.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} aria-busy={status === "submitting"}>
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Submit request
      </Button>
    </form>
  );
}
