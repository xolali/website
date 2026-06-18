import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Globe,
  Lock,
  Server,
  Route,
  Gauge,
  Smartphone,
  Zap,
  CreditCard,
  Wallet,
  ArrowRightLeft,
  Layers,
  TrendingUp,
  Hexagon,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const afrovpnFeatures: Feature[] = [
  {
    icon: Lock,
    title: "Bank-grade encryption",
    description:
      "Every connection is secured with AES-256 encryption — the same standard trusted by banks and governments.",
  },
  {
    icon: Route,
    title: "Strict no-logs policy",
    description:
      "We don't monitor, record, or store what you do online. Your browsing history is yours alone.",
  },
  {
    icon: Globe,
    title: "Global server network",
    description:
      "Connect through servers in 40+ countries with optimized routing that keeps speeds high and latency low.",
  },
  {
    icon: Smartphone,
    title: "Built for African networks",
    description:
      "Optimized for mobile data and real network conditions — so it works where other VPNs struggle.",
  },
  {
    icon: Server,
    title: "All your devices",
    description:
      "Android, iOS, Windows, macOS, and Linux. Protect multiple devices on a single subscription.",
  },
  {
    icon: ShieldCheck,
    title: "Kill switch protection",
    description:
      "If your VPN connection drops, the kill switch instantly blocks traffic so your data is never exposed.",
  },
  {
    icon: Zap,
    title: "One-tap connection",
    description:
      "Open the app, tap once, and you're protected. Security that gets out of your way.",
  },
  {
    icon: Gauge,
    title: "No bandwidth limits",
    description:
      "Stream, download, browse, and work without caps. Your connection, unrestricted.",
  },
];

export const afrovpnUseCases = [
  {
    title: "Stay private every day",
    description:
      "Keep your browsing, searches, and activity away from trackers and your internet provider.",
  },
  {
    title: "Work securely from anywhere",
    description:
      "Protect sensitive work and client data, and connect safely from any network.",
  },
  {
    title: "Stream and access content",
    description:
      "Reach streaming services, news, and platforms that may be restricted on your network.",
  },
  {
    title: "Travel with protection",
    description:
      "Keep your connection secure and your access consistent across borders and networks.",
  },
  {
    title: "Protect your finances",
    description:
      "Encrypt your connection when you bank, shop, or send money — especially on public Wi-Fi.",
  },
];

export type PricingPlan = {
  id: string;
  name: string;
  interval: "monthly" | "annual" | "biennial";
  price: string;
  cadence: string;
  note?: string;
  featured?: boolean;
  badge?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    interval: "monthly",
    price: "₦4,500",
    cadence: "per month",
  },
  {
    id: "annual",
    name: "Annual",
    interval: "annual",
    price: "₦2,700",
    cadence: "per month, billed yearly",
    note: "₦32,400 billed once a year",
    featured: true,
    badge: "Best value",
  },
  {
    id: "biennial",
    name: "2-Year",
    interval: "biennial",
    price: "₦2,000",
    cadence: "per month, billed every 2 years",
    note: "₦48,000 billed once every two years",
  },
];

export const pricingIncludes = [
  "Unlimited bandwidth",
  "Access to all 40+ country servers",
  "Protection for all your devices",
  "256-bit encryption & kill switch",
  "Strict no-logs policy",
  "24/7 customer support",
  "7-day money-back guarantee",
];

export type ProductSummary = {
  slug: string;
  name: string;
  status: "Live" | "Coming soon";
  tagline: string;
  description: string;
  icon: LucideIcon;
  href: string;
  cta: string;
};

export const products: ProductSummary[] = [
  {
    slug: "afrovpn",
    name: "AfroVPN",
    status: "Live",
    tagline: "Private, fast, unrestricted internet.",
    description:
      "Protect your connection, secure your data, and reach the open internet from anywhere. A no-logs VPN trusted across 40+ countries.",
    icon: ShieldCheck,
    href: "/afrovpn",
    cta: "Explore AfroVPN",
  },
  {
    slug: "dreampay",
    name: "DreamPay",
    status: "Coming soon",
    tagline: "Money that moves the way you do.",
    description:
      "Payments infrastructure built for Africa — send, receive, and accept money across borders without the friction, delay, or hidden cost.",
    icon: CreditCard,
    href: "/dreampay",
    cta: "Join the waitlist",
  },
  {
    slug: "dreamassets",
    name: "DreamAssets",
    status: "Coming soon",
    tagline: "Hold and grow value, securely.",
    description:
      "Infrastructure for digital assets, designed to be secure, transparent, and accessible. Participate without leaving your money exposed.",
    icon: Hexagon,
    href: "/dreamassets",
    cta: "Join the waitlist",
  },
];

export const dreampayCapabilities: Feature[] = [
  {
    icon: ArrowRightLeft,
    title: "Cross-border by design",
    description:
      "Move money across African borders as easily as sending a message — no chain of intermediaries.",
  },
  {
    icon: Wallet,
    title: "Lower cost",
    description:
      "Transparent, fair pricing that doesn't shrink your money in transit.",
  },
  {
    icon: ShieldCheck,
    title: "Compliant from day one",
    description:
      "Built to meet financial-services and data-protection standards before we have to, not after.",
  },
  {
    icon: Lock,
    title: "Secure by default",
    description:
      "Encrypted, access-controlled infrastructure protecting every transaction.",
  },
];

export const dreamassetsCapabilities: Feature[] = [
  {
    icon: Hexagon,
    title: "Hold value securely",
    description:
      "Custody designed to keep your assets protected, with security as the foundation.",
  },
  {
    icon: TrendingUp,
    title: "Grow with transparency",
    description:
      "Participate in the global digital economy with clear, honest information.",
  },
  {
    icon: Layers,
    title: "Accessible infrastructure",
    description:
      "Built so that participating in digital assets doesn't require leaving your money exposed.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-first",
    description:
      "Designed around clear risk disclosures and regulatory best practice.",
  },
];
