"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "ds-cookie-consent";

type Consent = "accepted" | "rejected";

/**
 * NDPR / Ghana Data Protection Act (Act 843) consent gate.
 * Non-essential cookies (analytics/marketing) must NOT load until the user
 * has accepted. Other code should check `hasCookieConsent()` before init.
 */
export function hasCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "accepted";
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== "accepted" && stored !== "rejected") {
      setVisible(true);
    }
  }, []);

  function choose(choice: Consent) {
    window.localStorage.setItem(STORAGE_KEY, choice);
    // Signal listeners (e.g. analytics loaders) that consent changed.
    window.dispatchEvent(new CustomEvent("ds:cookie-consent", { detail: choice }));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={reduce ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 24, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-content flex-col gap-4 rounded-xl border border-white/10 bg-slate-900 p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              We use essential cookies to run this site and, with your consent, analytics
              cookies to improve it. See our{" "}
              <Link href="/legal/cookies" className="text-aurora hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <Button variant="secondary" size="sm" onClick={() => choose("rejected")}>
                Reject non-essential
              </Button>
              <Button size="sm" onClick={() => choose("accepted")}>
                Accept all
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
