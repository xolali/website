import { Container } from "@/components/ui/primitives";
import { PortalSidebar, PortalTabBar } from "@/components/portal/PortalNav";
import { requireSession } from "@/lib/portal/session";
import { getPortalClient } from "@/lib/portal/client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Account",
  description: "Manage your AfroVPN subscription, devices, billing, and support.",
  path: "/account",
  noIndex: true,
});

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession();
  const user = await getPortalClient().getUser();

  return (
    <div className="min-h-[70vh] border-b border-white/10 bg-gradient-to-b from-slate-900/40 to-midnight">
      <Container className="py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-6 hidden lg:block">
              <p className="text-xs uppercase tracking-wide text-slate-400">Signed in as</p>
              <p className="truncate font-medium text-quartz">{user.fullName ?? user.email}</p>
              <p className="truncate text-sm text-slate-400">{user.email}</p>
            </div>
            <PortalSidebar />
          </aside>
          <div className="pb-20 lg:pb-0">{children}</div>
        </div>
      </Container>
      <PortalTabBar />
    </div>
  );
}
