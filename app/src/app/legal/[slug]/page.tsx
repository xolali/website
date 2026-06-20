import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui/primitives";
import { JsonLd } from "@/components/JsonLd";
import { legalDocs, getLegalDoc } from "@/content/legal";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return buildMetadata({ title: "Not found", noIndex: true });
  return buildMetadata({
    title: doc.title,
    description: doc.intro,
    path: `/legal/${doc.slug}`,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  const siblings = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Legal", path: `/legal/${doc.slug}` },
          { name: doc.title, path: `/legal/${doc.slug}` },
        ])}
      />

      <header className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-midnight py-14 md:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-quartz">Home</Link></li>
              <li aria-hidden>›</li>
              <li className="text-quartz">{doc.title}</li>
            </ol>
          </nav>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-quartz md:text-display-lg">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Last updated: {formatDate(doc.updated)}
          </p>
        </Container>
      </header>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
            <div className="prose-ds">
              <p className="lead">{doc.intro}</p>
              {doc.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            {/* Sibling policies */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Other policies
              </h2>
              <ul className="mt-4 space-y-2">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/legal/${s.slug}`}
                      className="block rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-quartz"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
