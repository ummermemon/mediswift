import type { LucideIcon } from "lucide-react";

export function Stat({
  label,
  value,
  hint,
  Icon,
  tone = "brand",
}: {
  label: string;
  value: string;
  hint: string;
  Icon: LucideIcon;
  tone?: "brand" | "good" | "warn" | "bad";
}) {
  const tones = {
    brand: "bg-brand-soft text-brand",
    good: "bg-chart-2/15 text-chart-2",
    warn: "bg-chart-4/20 text-chart-5",
    bad: "bg-destructive/10 text-destructive",
  }[tone];

  return (
    <div className="rounded-xl bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] text-ink-soft">{label}</p>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${tones}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-[24px] font-semibold leading-none tracking-tight text-ink">{value}</p>
      <p className="mt-1.5 text-[11px] text-ink-soft">{hint}</p>
    </div>
  );
}
