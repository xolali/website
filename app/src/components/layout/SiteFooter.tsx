import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/primitives";
import { footerNav, siteConfig } from "@/lib/site";

const paymentBadges = ["Paystack", "Visa", "Mastercard", "MTN MoMo", "SSL"];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-900">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              {siteConfig.tagline}
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                {group.label}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition-colors hover:text-quartz focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora rounded-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Trust / legal block — required on every page for Paystack review */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <p className="font-medium text-quartz">{siteConfig.legalName}</p>
              <p>
                {siteConfig.company.registrationNumber} · {siteConfig.company.address}
              </p>
              <p>
                <a href={`mailto:${siteConfig.company.email}`} className="hover:text-quartz">
                  {siteConfig.company.email}
                </a>{" "}
                ·{" "}
                <a href={`tel:${siteConfig.company.phone.replace(/\s/g, "")}`} className="hover:text-quartz">
                  {siteConfig.company.phone}
                </a>
              </p>
            </div>
            <ul className="flex flex-wrap items-center gap-2" aria-label="Accepted payments and security">
              {paymentBadges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-400"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-xs text-slate-400">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
