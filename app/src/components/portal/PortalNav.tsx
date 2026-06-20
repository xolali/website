"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Smartphone,
  CreditCard,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/devices", label: "Devices", icon: Smartphone },
  { href: "/account/billing", label: "Billing", icon: CreditCard },
  { href: "/account/support", label: "Support", icon: LifeBuoy },
];

function useIsActive() {
  const pathname = usePathname();
  return (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function PortalSidebar() {
  const isActive = useIsActive();
  return (
    <nav aria-label="Account" className="hidden lg:block">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item.href, item.exact) ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href, item.exact)
                  ? "bg-aurora/10 text-aurora"
                  : "text-slate-400 hover:bg-white/5 hover:text-quartz",
              )}
            >
              <item.icon className="h-5 w-5" aria-hidden />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-white/10 pt-4">
        <LogoutButton />
      </div>
    </nav>
  );
}

export function PortalTabBar() {
  const isActive = useIsActive();
  return (
    <nav
      aria-label="Account"
      className="sticky bottom-0 z-30 grid grid-cols-4 border-t border-white/10 bg-midnight lg:hidden"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href, item.exact) ? "page" : undefined}
          className={cn(
            "flex flex-col items-center gap-1 py-2.5 text-xs font-medium",
            isActive(item.href, item.exact) ? "text-aurora" : "text-slate-400",
          )}
        >
          <item.icon className="h-5 w-5" aria-hidden />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/portal/session", { method: "DELETE" });
    router.push("/auth/login");
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={logout}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-quartz"
    >
      <LogOut className="h-5 w-5" aria-hidden />
      Log out
    </button>
  );
}
