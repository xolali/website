import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/content/blog";
import { legalDocs } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/afrovpn",
    "/dreampay",
    "/dreamassets",
    "/pricing",
    "/about",
    "/contact",
    "/faq",
    "/support",
    "/blog",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalRoutes = legalDocs.map((doc) => ({
    url: `${base}/legal/${doc.slug}`,
    lastModified: new Date(doc.updated),
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...blogRoutes, ...legalRoutes];
}
