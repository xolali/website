"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Loader2, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Field, SelectInput, TextInput } from "@/components/forms/fields";
import type { DeviceConfig } from "@/lib/portal/types";

const PLATFORMS = [
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "windows", label: "Windows" },
  { value: "macos", label: "macOS" },
  { value: "linux", label: "Linux" },
];

export default function NewDevicePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeviceConfig | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (!String(data.name ?? "").trim()) {
      setError("Please name your device.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/portal/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, protocol: "wireguard" }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Could not add device. Please try again.");
        setLoading(false);
        return;
      }
      setResult(json as DeviceConfig);
    } catch {
      setError("Could not add device. Please try again.");
      setLoading(false);
    }
  }

  function downloadConfig() {
    if (!result) return;
    const blob = new Blob([result.configText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `afrovpn-${result.device.name.replace(/\s+/g, "-").toLowerCase()}.conf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-xl space-y-6">
      <Link
        href="/account/devices"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-quartz"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Devices
      </Link>

      {!result ? (
        <Card>
          <h1 className="font-display text-xl font-bold text-quartz">Add a device</h1>
          <p className="mt-1 text-sm text-slate-400">
            Generate a WireGuard configuration for a new device.
          </p>
          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
            <Field label="Device name" htmlFor="name" required error={error ?? undefined}>
              <TextInput id="name" name="name" placeholder="e.g. Ama's Pixel" aria-describedby="name-error" />
            </Field>
            <Field label="Platform" htmlFor="platform">
              <SelectInput id="platform" name="platform" defaultValue="android">
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Button type="submit" size="lg" disabled={loading} aria-busy={loading} className="w-full">
              {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Generate configuration
            </Button>
          </form>
        </Card>
      ) : (
        <Card>
          <h1 className="font-display text-xl font-bold text-quartz">
            {result.device.name} is ready
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Tunnel address {result.assignedIp}. Import this configuration into the AfroVPN or
            WireGuard app.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-[160px_1fr]">
            {/* QR placeholder — wire a QR generator to result.configText */}
            <div
              aria-hidden
              className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 text-xs text-slate-400"
            >
              QR code
            </div>
            <pre className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900 p-4 font-mono text-xs text-slate-400">
              {result.configText}
            </pre>
          </div>

          <p className="mt-4 flex items-start gap-2 rounded-md border border-warning/30 bg-warning/10 p-3 text-sm text-slate-400">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />
            For your security this configuration is shown once. Download and store it safely.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button onClick={downloadConfig}>
              <Download className="h-4 w-4" aria-hidden />
              Download .conf
            </Button>
            <Button variant="secondary" onClick={() => router.push("/account/devices")}>
              Done
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
