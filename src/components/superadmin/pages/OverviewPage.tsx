import {
  Activity,
  CircleAlert,
  ClipboardCheck,
  Package,
  Store,
  Truck,
} from "lucide-react";
import { ActionRow, ActivityLine, PageHeading, Section } from "./shared";

export function OverviewPage({
  pendingDoctors,
  pharmacies,
  partners,
  products,
  onNavigate,
}: {
  pendingDoctors: number;
  pharmacies: Array<{ status: string; name: string; area: string }>;
  partners: Array<{ status: string }>;
  products: Array<{ status: string; stock: number; name: string }>;
  onNavigate: (tab: "overview" | "categories" | "doctors" | "pharmacies" | "delivery" | "products" | "patients") => void;
}) {
  const stats = [
    {
      label: "Pending approvals",
      value: pendingDoctors,
      note: "Doctor registrations",
      Icon: ClipboardCheck,
      tab: "doctors" as const,
    },
    {
      label: "Active pharmacies",
      value: pharmacies.filter((item) => item.status === "active").length,
      note: "Across Ahmedabad",
      Icon: Store,
      tab: "pharmacies" as const,
    },
    {
      label: "Delivery partners",
      value: partners.filter((item) => item.status === "active").length,
      note: "Currently active",
      Icon: Truck,
      tab: "delivery" as const,
    },
    {
      label: "Live products",
      value: products.filter((item) => item.status === "active").length,
      note: "In the catalogue",
      Icon: Package,
      tab: "products" as const,
    },
  ];

  return (
    <>
      <PageHeading
        eyebrow="Superadmin"
        title="Operations overview"
        subtitle="Keep the MediSwift marketplace healthy and moving."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[12px] font-medium text-ink-soft hover:border-brand hover:text-brand">
            <Activity className="h-3.5 w-3.5" /> Activity log
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, Icon, tab }) => (
          <button
            key={label}
            onClick={() => onNavigate(tab)}
            className="rounded-xl bg-card p-4 text-left shadow-card transition-shadow hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-soft text-brand">
                <Icon className="h-4 w-4" />
              </span>
              <span className="h-4 w-4 -rotate-90 text-ink-soft">›</span>
            </div>
            <p className="mt-4 text-[24px] font-semibold tracking-tight text-ink">{value}</p>
            <p className="mt-0.5 text-[12px] font-medium text-ink">{label}</p>
            <p className="mt-1 text-[11px] text-ink-soft">{note}</p>
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <Section title="Needs attention" subtitle="Items requiring an admin decision">
          <div className="space-y-2">
            {pendingDoctors > 0 && (
              <ActionRow
                Icon={ClipboardCheck}
                title={`${pendingDoctors} doctor registration${pendingDoctors > 1 ? "s" : ""} pending`}
                detail="Review credentials and approve access"
                action="Review doctors"
                onClick={() => onNavigate("doctors")}
              />
            )}
            {pharmacies.some((item) => item.status === "pending") && (
              <ActionRow
                Icon={Store}
                title="New pharmacy application received"
                detail="Apollo Corner · Vastrapur"
                action="Review pharmacies"
                onClick={() => onNavigate("pharmacies")}
              />
            )}
            {products.some((item) => item.stock < 10) && (
              <ActionRow
                Icon={CircleAlert}
                title="Low stock products need attention"
                detail="Paracetamol 650mg · 8 units left"
                action="View catalogue"
                onClick={() => onNavigate("products")}
              />
            )}
          </div>
        </Section>
        <Section title="Platform activity" subtitle="Today, 23 August 2026">
          <div className="space-y-4">
            <ActivityLine
              color="bg-chart-2"
              title="Doctor registration approved"
              detail="Dr. Neel Iyer can now consult patients"
              time="12 min ago"
            />
            <ActivityLine
              color="bg-brand"
              title="New pharmacy application"
              detail="Apollo Corner submitted its documents"
              time="38 min ago"
            />
            <ActivityLine
              color="bg-chart-4"
              title="Product stock updated"
              detail="Vitamin C 1000mg · 126 units"
              time="1 hr ago"
            />
          </div>
        </Section>
      </div>
    </>
  );
}
