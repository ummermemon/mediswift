import * as React from "react";
import { Search, Camera, Upload, TrendingUp } from "lucide-react";
import { PrescriptionModal } from "./PrescriptionModal";

const popular = [
  "Paracetamol",
  "Vitamin D3",
  "BP Monitor",
  "Face Wash",
  "Protein Powder",
  "Thermometer",
];

export function SearchSection() {
  const [rxOpen, setRxOpen] = React.useState(false);
  return (
    <section className="mx-auto max-w-[1536px] px-4 pb-2 lg:px-8">
      <div className="rounded-xl bg-card px-4 py-4 shadow-card sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-page px-3 py-2 focus-within:border-brand">
            <Search className="h-4 w-4 shrink-0 text-brand" />
            <input
              aria-label="Search for medicines, health products and more"
              placeholder="Search for medicines, wellness, devices…"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-soft/70"
            />
            <button
              aria-label="Search by image"
              className="hidden shrink-0 rounded-md p-1.5 text-ink-soft hover:bg-brand-soft hover:text-brand sm:block"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-4 py-2.5 text-[12px] font-medium text-brand-foreground shadow-pill">
              <Search className="h-3.5 w-3.5" /> Search
            </button>
            <button onClick={() => setRxOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2.5 text-[12px] font-medium text-brand">
              <Upload className="h-3.5 w-3.5" /> Upload Prescription
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-ink-soft">
            <TrendingUp className="h-3.5 w-3.5 text-chart-2" /> Trending:
          </span>
          {popular.map((p) => (
            <button
              key={p}
              className="shrink-0 rounded-full border border-border px-3 py-1 text-[11px] text-ink transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <PrescriptionModal open={rxOpen} onOpenChange={setRxOpen} />
    </section>
  );
}
