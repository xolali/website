export type LegalSection = {
  heading: string;
  body: string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  updated: string; // ISO
  intro: string;
  sections: LegalSection[];
};


export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "2026-06-18",
    intro:
      "These Terms govern your access to and use of the Dreamscape Systems website, AfroVPN, and related services. By using our services, you agree to these Terms.",
    sections: [
      {
        heading: "1. Agreement to Terms",
        body: [
          "These Terms of Service form a binding agreement between you and Dreamscape Systems Ltd. governing your use of our website, AfroVPN, and related services (the “Services”). By creating an account, purchasing a subscription, or using our Services, you agree to these Terms. If you do not agree, do not use the Services.",
        ],
      },
      {
        heading: "2. Eligibility",
        body: [
          "You must be at least 18 years old and capable of forming a binding contract to use the Services. You represent that the information you provide is accurate and complete.",
        ],
      },
      {
        heading: "3. Your Account",
        body: [
          "You are responsible for keeping your credentials confidential and for all activity under your account. Notify us immediately at support@dreamscapesystems.com if you suspect unauthorized use.",
        ],
      },
      {
        heading: "4. Acceptable Use",
        body: [
          "You agree to use the Services lawfully and in accordance with our Acceptable Use Policy. You must not use the Services for illegal activity, to harm others, to infringe intellectual property, or to disrupt our systems. We may suspend or terminate access for violations.",
        ],
      },
      {
        heading: "5. Subscriptions, Billing & Renewals",
        body: [
          "Subscription options and prices are shown on our Pricing page. Payments are processed securely by Paystack. Subscriptions renew automatically at the end of each billing period so your protection does not lapse; we notify you before each renewal, and you may turn off automatic renewal at any time.",
        ],
      },
      {
        heading: "6. Refunds & Cancellation",
        body: [
          "Our refund terms, including our 7-day money-back guarantee, are described in our Refund Policy. You may cancel anytime; access continues until the end of your current billing period.",
        ],
      },
      {
        heading: "7. Disclaimers & Limitation of Liability",
        body: [
          "The Services are provided “as is” and “as available.” A VPN enhances your privacy and security but does not make you completely anonymous. To the fullest extent permitted by law, our total liability for any claim will not exceed the amount you paid us in the twelve months preceding the claim.",
        ],
      },
      {
        heading: "8. Governing Law",
        body: [
          "These Terms are governed by the laws of the Republic of Ghana, and the courts of Ghana have jurisdiction, without prejudice to any mandatory consumer-protection rights you have in your country of residence as we expand across West Africa. Questions? Contact hello@dreamscapesystems.com.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "2026-06-18",
    intro:
      "We collect only what we need, are transparent about how we use it, and never sell your personal data. This policy explains what we collect and the rights you have.",
    sections: [
      {
        heading: "1. Who We Are",
        body: [
          "The data controller is Dreamscape Systems Ltd. For any questions about this policy or your data, contact privacy@dreamscapesystems.com.",
        ],
      },
      {
        heading: "2. Information We Collect",
        body: [
          "Account information you provide (name, email, password); payment information processed by our PCI-DSS-compliant provider (we do not store full card details); and aggregated, non-identifying diagnostic data needed to operate the Service.",
          "Consistent with our no-logs commitment, when you use AfroVPN we do not log your browsing history, the sites you visit, the content of your traffic, or your IP address linked to your activity.",
        ],
      },
      {
        heading: "3. How We Use Your Information",
        body: [
          "To create and manage your account, provide and improve the Services, process payments, provide support, send essential service communications, prevent fraud and abuse, and comply with our legal obligations.",
        ],
      },
      {
        heading: "4. Legal Bases",
        body: [
          "Where required (including under Ghana's Data Protection Act, 2012 (Act 843), and — as we expand into Nigeria and West Africa — the Nigeria Data Protection Act / NDPR and the GDPR where applicable), we rely on performance of a contract, consent, legitimate interests, and legal obligation.",
        ],
      },
      {
        heading: "5. How We Share Information",
        body: [
          "We do not sell, rent, or trade your personal data. We share only with trusted service providers (such as payment processing and hosting) under confidentiality obligations, or where required by valid law.",
        ],
      },
      {
        heading: "6. Your Rights",
        body: [
          "Subject to applicable law, you may access, correct, delete, object to or restrict processing of your data, withdraw consent, request portability, and lodge a complaint with your data protection authority — in Ghana, the Data Protection Commission. To exercise these rights, email privacy@dreamscapesystems.com.",
        ],
      },
      {
        heading: "7. Data Security & Retention",
        body: [
          "We use encryption, access controls, and hardened infrastructure to protect your data, and keep personal data only as long as necessary. Because of our no-logs policy, we do not retain records of your online activity.",
        ],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    updated: "2026-06-18",
    intro:
      "We want you to be confident in your purchase. This policy explains when and how you can get a refund for AfroVPN subscriptions.",
    sections: [
      {
        heading: "1. 7-Day Money-Back Guarantee",
        body: [
          "We offer a 7-day money-back guarantee on new AfroVPN subscriptions. If you're not satisfied for any reason, request a full refund within 7 days of your initial purchase. The guarantee applies to your first purchase of a subscription plan.",
        ],
      },
      {
        heading: "2. How to Request a Refund",
        body: [
          "Email support@dreamscapesystems.com from the address associated with your account, including your order or transaction reference. We'll confirm receipt and process eligible requests promptly.",
        ],
      },
      {
        heading: "3. How Refunds Are Processed",
        body: [
          "Approved refunds are issued to your original payment method via Paystack, typically within 5–10 business days. The time for funds to appear depends on your bank or payment provider.",
        ],
      },
      {
        heading: "4. Renewals",
        body: [
          "The guarantee applies to initial purchases, not automatic renewals. Turn off auto-renewal or cancel before your renewal date to avoid being charged. If you were charged for a renewal in error, contact us and we'll review it fairly.",
        ],
      },
      {
        heading: "5. Your Statutory Rights",
        body: [
          "This policy is in addition to, and does not limit, any rights you may have under applicable consumer protection law.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    updated: "2026-06-18",
    intro:
      "This policy explains how we use cookies and similar technologies on our website. Read it alongside our Privacy Policy.",
    sections: [
      {
        heading: "1. What Are Cookies?",
        body: [
          "Cookies are small text files placed on your device when you visit a website. They help the site function, remember preferences, and understand usage.",
        ],
      },
      {
        heading: "2. Types We Use",
        body: [
          "Strictly necessary cookies (required for login, sessions, and checkout); functional cookies (remember your preferences); performance and analytics cookies (help us improve the site); and, where applicable, marketing cookies. We do not sell your data to advertisers.",
        ],
      },
      {
        heading: "3. Managing Your Preferences",
        body: [
          "You can accept or reject non-essential cookies via our cookie settings, and block or delete cookies in your browser. Blocking strictly necessary cookies may prevent parts of the site from working.",
        ],
      },
    ],
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    updated: "2026-06-18",
    intro:
      "This policy sets out the rules for using AfroVPN and our services. It exists to protect our users, our infrastructure, and the wider internet.",
    sections: [
      {
        heading: "1. Prohibited Activities",
        body: [
          "You must not use the Services to engage in illegal activity; distribute illegal material; harass, threaten, or harm others; distribute malware or conduct fraud; gain unauthorized access to any system; infringe intellectual property; or resell the Services without authorization.",
        ],
      },
      {
        heading: "2. Privacy and Enforcement",
        body: [
          "Because of our strict no-logs policy, we do not monitor your activity. Where we receive a valid, lawful complaint of abuse, we will investigate and act within the limits of the data we hold. Violations may result in suspension or termination.",
        ],
      },
      {
        heading: "3. Reporting Abuse",
        body: [
          "If you become aware of misuse of our Services, report it to abuse@dreamscapesystems.com. We take every report seriously.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}
