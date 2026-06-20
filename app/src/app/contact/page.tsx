import { Mail, Handshake, Newspaper, TrendingUp, LifeBuoy } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { NetworkMap } from "@/components/illustrations/NetworkMap";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Dreamscape Systems for support, partnerships, press, or investment. A real team behind a registered company — we respond within 24 hours.",
  path: "/contact",
});

const routes = [
  { icon: LifeBuoy, title: "Customer support", desc: "Help with AfroVPN, your account, or billing.", email: siteConfig.company.supportEmail },
  { icon: Mail, title: "General enquiries", desc: "Questions about Dreamscape Systems.", email: siteConfig.company.email },
  { icon: Handshake, title: "Partnerships", desc: "Build or integrate with us.", email: "partnerships@dreamscapesystems.com" },
  { icon: Newspaper, title: "Press & media", desc: "Interviews and media kit.", email: "press@dreamscapesystems.com" },
  { icon: TrendingUp, title: "Investors", desc: "Where we're headed and why.", email: "investors@dreamscapesystems.com" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Whether you need support, want to partner with us, have a press enquiry, or just want to learn more about what we're building — we'd like to hear from you."
        visual={<NetworkMap className="mx-auto max-w-[440px]" />}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            {/* Form */}
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-quartz">
                Send us a message
              </h2>
              <p className="mt-2 text-slate-400">
                We&apos;ll route your message to the right team and reply within 24 hours.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            {/* Sidebar */}
            <div className="space-y-8">
              <Reveal>
                <div>
                  <Eyebrow>Choose the best way</Eyebrow>
                  <ul className="space-y-3">
                    {routes.map((r) => (
                      <li key={r.title}>
                        <a
                          href={`mailto:${r.email}`}
                          className="flex gap-3 rounded-lg border border-white/10 bg-slate-800/40 p-4 transition-colors hover:border-white/20"
                        >
                          <r.icon className="h-5 w-5 shrink-0 text-aurora" aria-hidden />
                          <span>
                            <span className="block text-sm font-medium text-quartz">
                              {r.title}
                            </span>
                            <span className="block text-xs text-slate-400">{r.desc}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <Card>
                  <h2 className="font-display text-lg font-bold text-quartz">
                    {siteConfig.legalName}
                  </h2>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-slate-400">Registration</dt>
                      <dd className="text-quartz">{siteConfig.company.registrationNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Address</dt>
                      <dd className="text-quartz">{siteConfig.company.address}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Email</dt>
                      <dd>
                        <a href={`mailto:${siteConfig.company.email}`} className="text-aurora hover:underline">
                          {siteConfig.company.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Phone</dt>
                      <dd className="text-quartz">{siteConfig.company.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Hours</dt>
                      <dd className="text-quartz">{siteConfig.company.hours}</dd>
                    </div>
                  </dl>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
