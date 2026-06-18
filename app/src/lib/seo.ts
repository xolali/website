import type { Metadata } from "next";
import { siteConfig } from "./site";

type SeoParams = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

/**
 * Builds consistent, SEO-complete metadata for any page.
 * Use in each route's `generateMetadata` or exported `metadata`.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  ogImage = siteConfig.ogImage,
  noIndex = false,
  type = "website",
}: SeoParams = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title
    ? `${title} · ${siteConfig.name}`
    : `${siteConfig.name} — African Digital Infrastructure`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "en_NG",
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: siteConfig.social.twitter,
      images: [ogImage],
    },
  };
}

/** JSON-LD: Organization (sitewide). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.company.email,
    telephone: siteConfig.company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.company.address,
    },
    sameAs: [siteConfig.social.linkedin],
  };
}

/** JSON-LD: breadcrumb trail for sub-pages. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
