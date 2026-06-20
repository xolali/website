"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AccordionEntry = {
  id: string;
  question: string;
  answer: string;
};

export function Accordion({
  items,
  className,
}: {
  items: AccordionEntry[];
  className?: string;
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const reduce = useReducedMotion();
  const groupId = useId();

  return (
    <div className={cn("divide-y divide-white/10 border-y border-white/10", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `${groupId}-${item.id}`;
        return (
          <div key={item.id} id={item.id} className="scroll-mt-28">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-quartz transition-colors hover:text-aurora focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora rounded-sm"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                    isOpen && "rotate-180 text-aurora",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-5 text-slate-400">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
