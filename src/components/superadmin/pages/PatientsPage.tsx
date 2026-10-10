import { Users } from "lucide-react";
import { PageHeading, Section, StatusBadge, Toolbar } from "./shared";

export function PatientsPage({
  patients,
  query,
  setQuery,
  onToggle,
}: {
  patients: Array<{
    id: string;
    name: string;
    area: string;
    joined: string;
    orders: number;
    status: "active" | "pending" | "suspended";
  }>;
  query: string;
  setQuery: (value: string) => void;
  onToggle: (id: string) => void;
}) {
  const filtered = patients.filter((item) =>
    `${item.name} ${item.area} ${item.id}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeading
        eyebrow="People"
        title="Manage patients"
        subtitle="Review patient accounts and account access."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] text-ink-soft">
            <Users className="h-3.5 w-3.5" /> {patients.length} total accounts
          </span>
        }
      />
      <Section title="Patient accounts" subtitle="Account activity and access status">
        <Toolbar query={query} setQuery={setQuery} placeholder="Search by patient, ID or area" />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wide text-ink-soft">
                <th className="pb-2 font-medium">Patient</th>
                <th className="pb-2 font-medium">Location</th>
                <th className="pb-2 font-medium">Joined</th>
                <th className="pb-2 font-medium">Orders</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <p className="text-[12px] font-medium text-ink">{patient.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-soft">{patient.id}</p>
                  </td>
                  <td className="py-3 text-[12px] text-ink-soft">{patient.area}</td>
                  <td className="py-3 text-[11px] text-ink-soft">{patient.joined}</td>
                  <td className="py-3 text-[12px] text-ink">{patient.orders}</td>
                  <td className="py-3">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onToggle(patient.id)}
                      className="text-[11px] font-medium text-brand"
                    >
                      {patient.status === "active" ? "Suspend" : "Restore"}
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
