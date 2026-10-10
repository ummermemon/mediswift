import { Plus, Store } from "lucide-react";
import { PageHeading, Section, StatusBadge, Toolbar } from "./shared";

function EntityCard({
  icon: Icon,
  title,
  subtitle,
  meta,
  status,
  onToggle,
}: {
  icon: typeof Store;
  title: string;
  subtitle: string;
  meta: string;
  status: "active" | "pending" | "suspended";
  onToggle: () => void;
}) {
  return (
    <article className="rounded-lg border border-border p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[13px] font-semibold text-ink">{title}</h3>
              <p className="mt-0.5 text-[11px] text-ink-soft">{subtitle}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
            <span className="text-[11px] text-ink-soft">{meta}</span>
            <button onClick={onToggle} className="text-[11px] font-medium text-brand">
              {status === "active" ? "Suspend" : "Activate"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PharmaciesPage({
  pharmacies,
  query,
  setQuery,
  onToggle,
}: {
  pharmacies: Array<{
    id: string;
    name: string;
    owner: string;
    area: string;
    orders: number;
    status: "active" | "pending" | "suspended";
  }>;
  query: string;
  setQuery: (value: string) => void;
  onToggle: (id: string) => void;
}) {
  const filtered = pharmacies.filter((item) =>
    `${item.name} ${item.owner} ${item.area}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeading
        eyebrow="Marketplace"
        title="Manage pharmacies"
        subtitle="Review pharmacy partners and their marketplace access."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
            <Plus className="h-3.5 w-3.5" /> Add pharmacy
          </button>
        }
      />
      <Section title="Pharmacy partners" subtitle={`${pharmacies.length} registered pharmacies`}>
        <Toolbar
          query={query}
          setQuery={setQuery}
          placeholder="Search pharmacies, owners or areas"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {filtered.map((pharmacy) => (
            <EntityCard
              key={pharmacy.id}
              icon={Store}
              title={pharmacy.name}
              subtitle={`${pharmacy.owner} · ${pharmacy.area}`}
              meta={`${pharmacy.orders} orders this month`}
              status={pharmacy.status}
              onToggle={() => onToggle(pharmacy.id)}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
