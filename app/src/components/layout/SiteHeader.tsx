"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/primitives";
import { primaryNav, isNavGroup, type NavItem, type NavGroup } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-white/10 bg-midnight/90 backdrop-blur-md"
          : "border-b border-transparent bg-midnight",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-aurora focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((entry) => (
            <li key={entry.label} className="relative">
              {isNavGroup(entry) ? (
                <DesktopDropdown
                  group={entry}
                  open={openDropdown === entry.label}
                  onOpen={() => setOpenDropdown(entry.label)}
                  onClose={() => setOpenDropdown(null)}
                />
              ) : (
                <Link
                  href={(entry as NavItem).href}
                  className="inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-slate-400 transition-colors hover:text-quartz focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
                >
                  {entry.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-quartz lg:inline-flex lg:h-10 lg:items-center lg:px-3"
          >
            Log in
          </Link>
          <Button href="/afrovpn" size="sm" className="hidden lg:inline-flex">
            Get AfroVPN
          </Button>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-quartz hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 bg-midnight lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Logo />
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-quartz hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <div className="flex h-[calc(100%-4rem)] flex-col overflow-y-auto px-4 pb-8">
              <ul className="flex flex-col gap-1">
                {primaryNav.map((entry) => (
                  <li key={entry.label}>
                    {isNavGroup(entry) ? (
                      <MobileGroup group={entry} onNavigate={() => setMobileOpen(false)} />
                    ) : (
                      <Link
                        href={(entry as NavItem).href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-3 py-3 text-base font-medium text-quartz hover:bg-white/5"
                      >
                        {entry.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Button href="/afrovpn" size="lg" onClick={() => setMobileOpen(false)}>
                  Get AfroVPN
                </Button>
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopDropdown({
  group,
  open,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div onMouseEnter={onOpen} onMouseLeave={onClose} onFocus={onOpen} onBlur={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium text-slate-400 transition-colors hover:text-quartz focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
      >
        {group.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full w-72 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-lg"
          >
            <ul>
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 hover:bg-white/5"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-quartz">
                      {item.label}
                      {item.badge && (
                        <Badge tone={item.badge === "Live" ? "live" : "soon"}>
                          {item.badge}
                        </Badge>
                      )}
                    </span>
                    {item.description && (
                      <span className="text-xs text-slate-400">{item.description}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileGroup({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium text-quartz hover:bg-white/5"
      >
        {group.label}
        <ChevronDown className={cn("h-5 w-5 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <ul className="ml-3 border-l border-white/10 pl-3">
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-slate-400 hover:text-quartz"
              >
                {item.label}
                {item.badge && (
                  <Badge tone={item.badge === "Live" ? "live" : "soon"}>{item.badge}</Badge>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
