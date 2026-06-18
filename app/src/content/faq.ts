export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "company",
    title: "About Dreamscape Systems",
    items: [
      {
        id: "what-is-dreamscape",
        question: "What is Dreamscape Systems?",
        answer:
          "Dreamscape Systems is an African digital infrastructure company. We build the foundational systems — connectivity, payments, and digital assets — that enable Africans to participate fully in the global digital economy. Our first product, AfroVPN, is live today. DreamPay and DreamAssets are in development.",
      },
      {
        id: "registered-company",
        question: "Is Dreamscape Systems a real, registered company?",
        answer:
          "Yes. Dreamscape Systems is a legally registered business with a verifiable address, a published leadership team, and accountable contact channels. Our registration details are published in the footer of every page.",
      },
      {
        id: "contact-dreamscape",
        question: "How do I contact Dreamscape Systems?",
        answer:
          "Email hello@dreamscapesystems.com for general enquiries or support@dreamscapesystems.com for support. Full contact details are on our Contact page.",
      },
    ],
  },
  {
    id: "afrovpn",
    title: "AfroVPN — General",
    items: [
      {
        id: "what-is-afrovpn",
        question: "What is AfroVPN?",
        answer:
          "AfroVPN is a virtual private network. It creates an encrypted connection between your device and the internet, keeping your activity private, securing your data, and giving you unrestricted access to the open web.",
      },
      {
        id: "how-vpn-works",
        question: "How does a VPN work?",
        answer:
          "When you connect to AfroVPN, your internet traffic is routed through an encrypted tunnel to one of our secure servers before reaching the wider internet. This hides your activity from your provider and others on your network and protects your data.",
      },
      {
        id: "is-vpn-legal",
        question: "Is using a VPN legal?",
        answer:
          "Using a VPN is legal in most countries, including across most of Africa. You are responsible for ensuring your use complies with the laws of your country and our Acceptable Use Policy. AfroVPN should never be used for illegal activity.",
      },
      {
        id: "which-devices",
        question: "Which devices does AfroVPN work on?",
        answer:
          "AfroVPN works on Android, iOS, Windows, macOS, and Linux. A single subscription protects multiple devices.",
      },
      {
        id: "slow-internet",
        question: "Will AfroVPN slow down my internet?",
        answer:
          "A small reduction in speed is normal with any VPN. AfroVPN is optimized for African networks and uses high-performance protocols to keep that impact minimal. For best speeds, connect to a server close to you.",
      },
      {
        id: "money-back",
        question: "Do you offer a money-back guarantee?",
        answer:
          "Yes. We offer a 7-day money-back guarantee on all plans. If AfroVPN isn't right for you, request a full refund within 7 days of purchase. See our Refund Policy for details.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    items: [
      {
        id: "keep-logs",
        question: "Does AfroVPN keep logs of my activity?",
        answer:
          "No. AfroVPN operates a strict no-logs policy. We do not monitor, record, or store your browsing history, the sites you visit, or your real IP address alongside your activity. We keep only the minimum needed to run your account.",
      },
      {
        id: "encryption",
        question: "What encryption does AfroVPN use?",
        answer:
          "AfroVPN secures every connection with AES-256 encryption — the same standard trusted by banks worldwide. We use modern, secure protocols including WireGuard and OpenVPN.",
      },
      {
        id: "kill-switch",
        question: "What is a kill switch, and does AfroVPN have one?",
        answer:
          "A kill switch protects you if your VPN connection drops by instantly blocking your traffic, ensuring your real IP and data are never exposed. Yes, AfroVPN includes one.",
      },
      {
        id: "public-wifi",
        question: "Does AfroVPN protect me on public Wi-Fi?",
        answer:
          "Yes. AfroVPN encrypts your entire connection, so your passwords, messages, and financial details stay protected even on untrusted public networks.",
      },
      {
        id: "sell-data",
        question: "Do you sell my data?",
        answer:
          "Never. We do not sell, rent, or share your personal data with advertisers or any third party for marketing. Our business model is your subscription — not your data.",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Payments",
    items: [
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer:
          "We accept major debit and credit cards (Visa, Mastercard, and Verve) and supported local payment methods, all processed securely through Paystack.",
      },
      {
        id: "safe-to-pay",
        question: "Is it safe to pay on your website?",
        answer:
          "Yes. All payments are processed over encrypted, PCI-DSS-compliant infrastructure by Paystack. We never see or store your full card details.",
      },
      {
        id: "cancel",
        question: "Can I cancel my subscription?",
        answer:
          "Yes, you can cancel anytime from your account dashboard. Your protection remains active until the end of your current billing period, and you won't be charged again after cancelling.",
      },
      {
        id: "auto-renew",
        question: "How do I turn off automatic renewal?",
        answer:
          "You can disable auto-renewal anytime in your account settings. Your subscription will then expire at the end of your current period rather than renewing.",
      },
      {
        id: "hidden-fees",
        question: "Do you charge any hidden fees?",
        answer:
          "No. The price you see is the price you pay. There are no setup fees, hidden charges, or surprise costs.",
      },
    ],
  },
  {
    id: "future",
    title: "DreamPay & DreamAssets",
    items: [
      {
        id: "what-is-dreampay",
        question: "What is DreamPay?",
        answer:
          "DreamPay is our forthcoming payments infrastructure, designed to let people and businesses send, receive, and accept money across Africa and beyond. It is currently in development and not yet available.",
      },
      {
        id: "what-is-dreamassets",
        question: "What is DreamAssets?",
        answer:
          "DreamAssets is our forthcoming infrastructure for holding and growing digital value securely and transparently. It is currently in development and not yet available.",
      },
      {
        id: "launch-when",
        question: "When will DreamPay and DreamAssets launch?",
        answer:
          "Both are in active development. We don't announce launch dates until we're confident we can meet our standard for security and reliability. Join the waitlist to be the first to know.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    items: [
      {
        id: "get-help",
        question: "How do I get help if I have a problem?",
        answer:
          "Visit our Support page for guides, or contact support@dreamscapesystems.com. We offer 24/7 support coverage and respond to most enquiries within 24 hours.",
      },
      {
        id: "response-time",
        question: "How quickly will I get a response?",
        answer:
          "We aim to respond to all support requests within 24 hours, and usually much sooner. Urgent account or billing issues are prioritized.",
      },
    ],
  },
];

export const allFaqs = faqCategories.flatMap((c) => c.items);
