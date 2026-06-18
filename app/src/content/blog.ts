export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO
  readingMinutes: number;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-africa-needs-sovereign-digital-infrastructure",
    title: "Why Africa needs sovereign digital infrastructure",
    excerpt:
      "Africa isn't behind — it's been building without the foundations the rest of the world takes for granted. Here's why that has to change.",
    category: "Infrastructure",
    author: "Dreamscape Systems",
    date: "2026-06-10",
    readingMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "The global digital economy runs on infrastructure most people never see — the networks that move data, the rails that move money, and the systems that store value. For most of the world, that infrastructure is assumed. For Africa, it has too often been an afterthought.",
      },
      { type: "heading", text: "The cost of borrowed foundations" },
      {
        type: "paragraph",
        text: "When builders rely on infrastructure designed for other markets, they inherit its assumptions: currencies that aren't theirs, latency that wasn't optimized for their networks, and policies that treat them as an edge case. The result is friction at every layer.",
      },
      {
        type: "quote",
        text: "Our products are the roads. The open internet is the destination.",
      },
      { type: "heading", text: "What sovereignty looks like" },
      {
        type: "paragraph",
        text: "Sovereign infrastructure doesn't mean closed or isolated. It means owned and operated for the people who depend on it, built to a global standard, and connected to the rest of the world on fair terms.",
      },
      {
        type: "list",
        items: [
          "Connectivity that is private and unrestricted by default.",
          "Payments that move across African borders without friction.",
          "Value that can be held and grown securely.",
        ],
      },
      {
        type: "paragraph",
        text: "That's the infrastructure we're building. AfroVPN is the first layer. DreamPay and DreamAssets are next.",
      },
    ],
  },
  {
    slug: "what-a-no-logs-vpn-actually-means",
    title: "What a no-logs VPN actually means",
    excerpt:
      "“No-logs” is one of the most overused phrases in privacy marketing. Here's what it should mean — and how we hold ourselves to it.",
    category: "Privacy",
    author: "Dreamscape Systems",
    date: "2026-06-03",
    readingMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "A VPN that logs your activity isn't protecting your privacy. It's collecting it. Yet “no-logs” is one of the most overused phrases in the industry. Here's what it should actually mean.",
      },
      { type: "heading", text: "What we never store" },
      {
        type: "list",
        items: [
          "Your browsing history or the sites you visit.",
          "The content of your network traffic.",
          "Your originating IP address linked to your activity.",
          "DNS queries tied to your identity.",
        ],
      },
      {
        type: "paragraph",
        text: "We cannot disclose what we do not collect. That's the point. Privacy that depends on a promise is weaker than privacy built into how the system works.",
      },
      { type: "heading", text: "What we do keep" },
      {
        type: "paragraph",
        text: "We keep the minimum information required to run your account and process your subscription — and we tell you exactly what that is in our Privacy Policy. Transparency is part of the product.",
      },
    ],
  },
  {
    slug: "building-payments-for-how-africa-actually-moves-money",
    title: "Building payments for how Africa actually moves money",
    excerpt:
      "A preview of the thinking behind DreamPay — and why cross-border payments across the continent are still harder than they should be.",
    category: "Payments",
    author: "Dreamscape Systems",
    date: "2026-05-22",
    readingMinutes: 7,
    body: [
      {
        type: "paragraph",
        text: "Sending money across an African border can still mean a chain of intermediaries, days of waiting, and a smaller amount arriving than was sent. DreamPay exists to change that.",
      },
      { type: "heading", text: "The friction is structural" },
      {
        type: "paragraph",
        text: "The problem isn't a lack of demand — it's that the underlying rails were never designed for intra-African movement. We're building those rails with compliance and trust as the foundation, not an afterthought.",
      },
      {
        type: "quote",
        text: "Money should move the way you do — quickly, fairly, and without asking permission.",
      },
      {
        type: "paragraph",
        text: "DreamPay is in development. Join the waitlist to help shape it before launch.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogCategories = Array.from(
  new Set(blogPosts.map((p) => p.category)),
);
