/**
 * Central site configuration. Single source of truth for brand metadata,
 * navigation, and company/legal details used across the site and in SEO.
 */

export const siteConfig = {
  name: "Dreamscape Systems",
  legalName: "Dreamscape Systems Ltd.",
  tagline: "Your internet. Your infrastructure.",
  description:
    "Dreamscape Systems is an African digital infrastructure company. We build the connectivity, payments, and asset infrastructure that lets Africans participate fully in the global digital economy. Start with AfroVPN.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dreamscapesystems.com",
  ogImage: "/og/default.png",
  locale: "en",
  // Company / legal — replace placeholders with finalized details before launch.
  company: {
    registrationNumber: "RC 0000000",
    address: "Registered address — to be finalized",
    email: "hello@dreamscapesystems.com",
    supportEmail: "support@dreamscapesystems.com",
    privacyEmail: "privacy@dreamscapesystems.com",
    phone: "+234 000 000 0000",
    hours: "Mon–Fri, 9:00–18:00 WAT",
  },
  social: {
    twitter: "@dreamscapehq",
    linkedin: "https://www.linkedin.com/company/dreamscape-systems",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  badge?: "Live" | "Coming soon";
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const productNav: NavItem[] = [
  {
    label: "AfroVPN",
    href: "/afrovpn",
    description: "Private, fast, unrestricted internet.",
    badge: "Live",
  },
  {
    label: "DreamPay",
    href: "/dreampay",
    description: "Money that moves the way you do.",
    badge: "Coming soon",
  },
  {
    label: "DreamAssets",
    href: "/dreamassets",
    description: "Hold and grow value, securely.",
    badge: "Coming soon",
  },
];

export const companyNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const resourcesNav: NavItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Support", href: "/support" },
];

export const primaryNav: (NavItem | NavGroup)[] = [
  { label: "Products", items: productNav },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", items: companyNav },
  { label: "Resources", items: resourcesNav },
];

export const footerNav: NavGroup[] = [
  {
    label: "Products",
    items: [
      { label: "AfroVPN", href: "/afrovpn" },
      { label: "Pricing", href: "/pricing" },
      { label: "DreamPay", href: "/dreampay" },
      { label: "DreamAssets", href: "/dreamassets" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Help & Support", href: "/support" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Refund Policy", href: "/legal/refund-policy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Acceptable Use", href: "/legal/acceptable-use" },
    ],
  },
];

export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return (item as NavGroup).items !== undefined;
}
