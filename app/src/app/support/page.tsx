import {
  Rocket,
  UserCog,
  CreditCard,
  Wifi,
  ShieldCheck,
  Search,
  Send,
  SearchCheck,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { SupportForm } from "@/components/forms/SupportForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Support",
  description:
    "Get help with AfroVPN, your account, and billing. Self-service guides plus 24/7 support that responds within 24 hours.",
  path: "/support",
});

const categories = [
  { icon: Rocket, title: "Getting started", body: "Installing AfroVPN, setting up your account, and connecting for the first time." },
  { icon: UserCog, title: "Account & login", body: "Managing your account, resetting your password, and updating details." },
  { icon: CreditCard, title: "Billing & payments", body: "Subscriptions, invoices, renewals, payment methods, and refunds." },
  { icon: Wifi, title: "Connection & performance", body: "Troubleshooting connection issues, slow speeds, and server selection." },
  { icon: ShieldCheck, title: "Privacy & security", body: "Questions about our no-logs policy, encryption, and how we protect you." },
];

const steps = [
  { icon: Search, title: "Search the Help Center", body: "Most issues are solved here in minutes." },
  { icon: Send, title: "Submit a request", body: "Tell us what's happening and what you've tried." },
  { icon: SearchCheck, title: "We investigate", body: "A specialist responds within 24 hours, usually sooner." },
  { icon: CheckCircle2, title: "We resolve", body: "We confirm with you before closing your ticket." },
];

const workflow = [
  ["Received & acknowledged", "You get a confirmation with a ticket reference number."],
  ["Triaged & prioritized", "We categorize and prioritize; urgent issues jump the queue."],
  ["Assigned to a specialist", "Routed to the right expertise; identity verified if needed."],
  ["Investigated & answered", "We work the issue and respond with a clear next step."],
  ["Resolved & confirmed", "We confirm with you before closing the ticket."],
  ["Closed — but reopenable", "Reply anytime and we pick up where we left off."],
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="We're here when you need us."
        description="Real help from real people, 24/7. Most questions are answered below — and when you need us directly, we respond within 24 hours."
      />

      <Section>
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>What do you need help with?</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz">Browse by topic.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.04}>
                <Card interactive className="h-full">
                  <c.icon className="h-6 w-6 text-aurora" aria-hidden />
                  <h3 className="mt-4 font-semibold text-quartz">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{c.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/10 bg-slate-900/30">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>How support works</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz">Getting help is simple.</h2>
          </Reveal>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-extrabold text-aurora">
                      {i + 1}
                    </span>
                    <s.icon className="h-5 w-5 text-slate-400" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-semibold text-quartz">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{s.body}</p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Workflow */}
            <Reveal>
              <Eyebrow>Ticket workflow</Eyebrow>
              <h2 className="font-display text-2xl font-bold text-quartz">
                Every request, tracked from start to finish.
              </h2>
              <ol className="mt-8 space-y-6">
                {workflow.map(([title, body], i) => (
                  <li key={title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-aurora/40 text-sm font-semibold text-aurora">
                        {i + 1}
                      </span>
                      {i < workflow.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-white/10" aria-hidden />
                      )}
                    </div>
                    <div className="pb-2">
                      <h3 className="font-semibold text-quartz">{title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Submit form */}
            <Reveal delay={0.05}>
              <div className="rounded-xl border border-white/10 bg-slate-800/40 p-6 md:p-8">
                <h2 className="font-display text-xl font-bold text-quartz">
                  Submit a support request
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Can&apos;t find your answer? Send us the details and we&apos;ll get back to
                  you within 24 hours.
                </p>
                <div className="mt-6">
                  <SupportForm />
                </div>
                <p className="mt-6 border-t border-white/10 pt-6 text-sm text-slate-400">
                  Prefer email? Reach us at{" "}
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="text-aurora hover:underline"
                  >
                    {siteConfig.company.supportEmail}
                  </a>
                  . Support coverage is 24/7.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
