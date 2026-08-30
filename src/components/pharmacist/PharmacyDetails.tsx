import { SectionCard } from "./SectionCard";
import type { OnlineProps } from "./pharmacist-types";

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] text-ink-soft">
        {label}
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-[12.5px] text-ink outline-none focus:border-brand"
      />
    </div>
  );
}

export function PharmacyDetails({ online, setOnline }: OnlineProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
      <SectionCard title="Pharmacy Details" subtitle="Shown to customers on the storefront">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <Field label="Pharmacy name" defaultValue="MediSwift Pharmacy — Thaltej" />
          <Field label="Owner / pharmacist" defaultValue="Nishit Patel" />
          <Field label="Phone" defaultValue="+91 98250 41200" type="tel" />
          <Field label="Email" defaultValue="thaltej@mediswift.in" type="email" />
          <Field label="Drug licence no." defaultValue="GJ-AHM-20B-114872" />
          <Field label="GSTIN" defaultValue="24ABCDE1234F1Z5" />
          <div className="sm:col-span-2">
            <Field
              label="Address"
              defaultValue="Shop 4, Sunrise Complex, Thaltej, Ahmedabad 380059"
            />
          </div>
          <Field label="Opens at" defaultValue="08:00" type="time" />
          <Field label="Closes at" defaultValue="23:00" type="time" />
          <div className="sm:col-span-2">
            <button className="rounded-lg gradient-brand px-4 py-2.5 text-[12.5px] font-medium text-brand-foreground shadow-pill">
              Save changes
            </button>
          </div>
        </form>
      </SectionCard>
      <SectionCard title="Availability" subtitle="Control whether you receive new orders">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-3">
            <div>
              <p className="text-[12.5px] font-medium text-ink">Accepting orders</p>
              <p className="text-[11px] text-ink-soft">
                {online ? "Customers can order from you now" : "You are hidden from the storefront"}
              </p>
            </div>
            <button
              role="switch"
              aria-checked={online}
              aria-label="Toggle accepting orders"
              onClick={() => setOnline((value) => !value)}
              className={`relative h-6 w-11 shrink-0 rounded-full ${online ? "bg-brand" : "bg-border"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-soft ${online ? "left-[22px]" : "left-0.5"}`}
              />
            </button>
          </div>
          <div className="rounded-lg border border-border px-3 py-3">
            <p className="text-[12.5px] font-medium text-ink">Delivery radius</p>
            <p className="mt-0.5 text-[11px] text-ink-soft">6 km around Thaltej · avg. 22 min</p>
          </div>
          <div className="rounded-lg border border-border px-3 py-3">
            <p className="text-[12.5px] font-medium text-ink">Services offered</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Rx medicines", "OTC", "Devices", "Cold chain", "24x7 helpline"].map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-medium text-brand"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
