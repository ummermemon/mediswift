import { Plus } from "lucide-react";
import { PageHeading, Section, StatusBadge, Toolbar } from "./shared";

export function DeliveryPage({
  partners,
  query,
  setQuery,
  onToggle,
}: {
  partners: Array<{
    id: string;
    name: string;
    phone: string;
    area: string;
    deliveries: number;
    status: "active" | "pending" | "suspended";
  }>;
  query: string;
  setQuery: (value: string) => void;
  onToggle: (id: string) => void;
}) {
  const filtered = partners.filter((item) =>
    `${item.name} ${item.area} ${item.id}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeading
        eyebrow="Logistics"
        title="Manage delivery partners"
        subtitle="Monitor partner availability and delivery performance."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
            <Plus className="h-3.5 w-3.5" /> Add partner
          </button>
        }
      />
      <Section title="Delivery network" subtitle="Partner status and recent activity">
        <Toolbar query={query} setQuery={setQuery} placeholder="Search partners, IDs or areas" />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wide text-ink-soft">
                <th className="pb-2 font-medium">Partner</th>
                <th className="pb-2 font-medium">Coverage</th>
                <th className="pb-2 font-medium">Deliveries today</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((partner) => (
                <tr key={partner.id} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <p className="text-[12px] font-medium text-ink">{partner.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-soft">
                      {partner.id} · {partner.phone}
                    </p>
                  </td>
                  <td className="py-3 text-[12px] text-ink-soft">{partner.area}</td>
                  <td className="py-3 text-[12px] text-ink">{partner.deliveries}</td>
                  <td className="py-3">
                    <StatusBadge status={partner.status} />
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onToggle(partner.id)}
                      className="text-[11px] font-medium text-brand"
                    >
                      {partner.status === "active" ? "Suspend" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
