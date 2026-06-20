import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, Badge } from "@/components/ui/primitives";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { BlogCover } from "@/components/illustrations/BlogCover";
import { blogPosts } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Blog & Insights",
  description:
    "Perspectives on African digital infrastructure, privacy, and payments from the team at Dreamscape Systems.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Blog / Insights"
        title="Building Africa's digital infrastructure, in the open."
        description="Perspectives on infrastructure, privacy, and payments from the team building Dreamscape Systems."
      />
      <Section>
        <Container>
          {/* Featured */}
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <Card interactive className="md:flex md:items-center md:gap-8">
                <div
                  aria-hidden
                  className="mb-6 overflow-hidden rounded-lg md:mb-0 md:w-1/2"
                >
                  <BlogCover category={featured.category} />
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Badge tone="neutral">{featured.category}</Badge>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> {featured.readingMinutes} min
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold text-quartz group-hover:text-aurora">
                    {featured.title}
                  </h2>
                  <p className="mt-2 text-slate-400">{featured.excerpt}</p>
                  <p className="mt-4 text-sm text-slate-400">
                    {featured.author} · {formatDate(featured.date)}
                  </p>
                </div>
              </Card>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <Card interactive className="flex h-full flex-col">
                    <div aria-hidden className="mb-5 overflow-hidden rounded-lg">
                      <BlogCover category={post.category} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <Badge tone="neutral">{post.category}</Badge>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden /> {post.readingMinutes} min
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-quartz group-hover:text-aurora">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-slate-400">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-aurora">
                      Read more <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
