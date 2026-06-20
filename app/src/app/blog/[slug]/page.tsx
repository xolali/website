import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Container, Section, Badge } from "@/components/ui/primitives";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { BlogCover } from "@/components/illustrations/BlogCover";
import { blogPosts, getPostBySlug, type BlogBlock } from "@/content/blog";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Article not found", noIndex: true });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  };

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article>
        <header className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-midnight py-14 md:py-20">
          <Container>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-quartz">Home</Link></li>
                <li aria-hidden>›</li>
                <li><Link href="/blog" className="hover:text-quartz">Blog</Link></li>
                <li aria-hidden>›</li>
                <li className="text-quartz">{post.category}</li>
              </ol>
            </nav>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Badge tone="neutral">{post.category}</Badge>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden /> {post.readingMinutes} min read
                </span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-quartz md:text-display-lg">
                {post.title}
              </h1>
              <p className="mt-4 text-slate-400">
                {post.author} · {formatDate(post.date)}
              </p>
            </div>
            <div aria-hidden className="mt-10 overflow-hidden rounded-xl border border-white/10">
              <BlogCover category={post.category} />
            </div>
          </Container>
        </header>

        <Section>
          <Container>
            <div className="prose-ds mx-auto">
              {post.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </Container>
        </Section>
      </article>

      {related.length > 0 && (
        <Section className="border-t border-white/10">
          <Container>
            <h2 className="font-display text-2xl font-bold text-quartz">Related articles</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <div className="rounded-xl border border-white/10 bg-slate-800/40 p-5 transition-colors hover:border-white/20">
                    <Badge tone="neutral">{p.category}</Badge>
                    <h3 className="mt-3 font-semibold text-quartz group-hover:text-aurora">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTASection
        title="Take back your connection."
        body="AfroVPN gives you private, fast, unrestricted internet — backed by a 7-day money-back guarantee."
        primary={{ label: "Get AfroVPN", href: "/afrovpn" }}
        secondary={{ label: "Read more articles", href: "/blog" }}
      />
    </>
  );
}
