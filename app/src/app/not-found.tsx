import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Page not found", noIndex: true });

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-aurora">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-quartz">
        This page couldn&apos;t be found.
      </h1>
      <p className="mt-2 max-w-md text-slate-400">
        The page you&apos;re looking for may have moved or never existed. Let&apos;s get you
        back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button href="/support" variant="secondary">
          Visit Support
        </Button>
      </div>
    </Container>
  );
}
