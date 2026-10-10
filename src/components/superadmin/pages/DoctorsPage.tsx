import { Check, Plus, X } from "lucide-react";
import { PageHeading, Section, StatusBadge, Toolbar } from "./shared";

export function DoctorsPage({
  doctors,
  query,
  setQuery,
  onUpdate,
}: {
  doctors: Array<{
    id: string;
    name: string;
    specialty: string;
    license: string;
    submitted: string;
    status: "pending" | "approved" | "rejected";
  }>;
  query: string;
  setQuery: (value: string) => void;
  onUpdate: (id: string, status: "pending" | "approved" | "rejected") => void;
}) {
  const filtered = doctors.filter((item) =>
    `${item.name} ${item.specialty} ${item.id}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeading
        eyebrow="People"
        title="Manage doctors"
        subtitle="Review registrations and control consultation access."
        action={
          <span className="rounded-full bg-chart-4/15 px-2.5 py-1 text-[11px] font-semibold text-ink">
            {doctors.filter((item) => item.status === "pending").length} pending
          </span>
        }
      />
      <Section
        title="Doctor registrations"
        subtitle="Verify medical credentials before approving a doctor"
      >
        <Toolbar
          query={query}
          setQuery={setQuery}
          placeholder="Search by doctor, specialty or ID"
          action={
            <button className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
              <Plus className="h-3.5 w-3.5" /> Add doctor
            </button>
          }
        />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wide text-ink-soft">
                <th className="pb-2 font-medium">Doctor</th>
                <th className="pb-2 font-medium">License</th>
                <th className="pb-2 font-medium">Submitted</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doctor) => (
                <tr key={doctor.id} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <p className="text-[12px] font-medium text-ink">{doctor.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-soft">
                      {doctor.specialty} · {doctor.id}
                    </p>
                  </td>
                  <td className="py-3 text-[12px] text-ink-soft">{doctor.license}</td>
                  <td className="py-3 text-[11px] text-ink-soft">{doctor.submitted}</td>
                  <td className="py-3">
                    <StatusBadge status={doctor.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      {doctor.status === "pending" ? (
                        <>
                          <button
                            onClick={() => onUpdate(doctor.id, "approved")}
                            className="inline-flex items-center gap-1 rounded-md bg-chart-2/15 px-2.5 py-1.5 text-[11px] font-medium text-chart-2 hover:bg-chart-2/25"
                          >
                            <Check className="h-3 w-3" /> Approve
                          </button>
                          <button
                            onClick={() => onUpdate(doctor.id, "rejected")}
                            className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2.5 py-1.5 text-[11px] font-medium text-destructive hover:bg-destructive/15"
                          >
                            <X className="h-3 w-3" /> Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            onUpdate(doctor.id, doctor.status === "approved" ? "rejected" : "approved")
                          }
                          className="text-[11px] font-medium text-brand"
                        >
                          Change status
                        </button>
                      )}
                    </div>
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
