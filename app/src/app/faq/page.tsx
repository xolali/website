import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/primitives";
import { Accordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { faqCategories, allFaqs } from "@/content/faq";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about Dreamscape Systems, AfroVPN, billing, privacy, and what's coming next. Can't find your answer? Contact our team.",
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <PageHero
        eyebrow="Help & FAQ"
        title="Questions, answered."
        description="Everything you need to know about Dreamscape Systems, AfroVPN, billing, privacy, and what's coming next."
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
            {/* Category nav */}
            <nav aria-label="FAQ categories" className="hidden lg:block">
              <ul className="sticky top-28 space-y-2">
                {faqCategories.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="block rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-quartz"
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-12">
              {faqCategories.map((category) => (
                <section key={category.id} id={category.id} className="scroll-mt-28">
                  <h2 className="mb-4 font-display text-xl font-bold text-quartz">
                    {category.title}
                  </h2>
                  <Accordion items={category.items} />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <CTASection
        title="Still have a question?"
        body="Our team is one message away and responds within 24 hours."
        primary={{ label: "Contact our team", href: "/contact" }}
        secondary={{ label: "Visit Support", href: "/support" }}
      />
    </>
  );
}
