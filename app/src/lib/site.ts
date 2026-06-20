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
  // Dreamscape Systems is a Ghana-registered company. Services launch in Ghana,
  // then Nigeria and the wider West Africa. Primary currency is the Ghana Cedi.
  country: "Ghana",
  countryCode: "GH",
  currency: "GHS",
  currencySymbol: "GH₵",
  // Company / legal details.
  // NOTE: The three identity values below are templated placeholders. Replace
  // them with Dreamscape's real Registrar General's Department registration
  // number, registered Accra address, and a monitored +233 phone line BEFORE
  // submitting for Paystack review. They can also be supplied at deploy time
  // via the COMPANY_* environment variables without changing code.
  company: {
    registrationNumber:
      process.env.NEXT_PUBLIC_COMPANY_REG ?? "CS-0000000000 (Ghana RGD — to be confirmed)",
    address:
      process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "Accra, Ghana — registered address to be confirmed",
    email: "hello@dreamscapesystems.com",
    supportEmail: "support@dreamscapesystems.com",
    privacyEmail: "privacy@dreamscapesystems.com",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+233 00 000 0000",
    hours: "Mon–Fri, 9:00–17:00 GMT",
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
