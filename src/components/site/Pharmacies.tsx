import { MapPin, Clock, Star, Navigation, ArrowRight } from "lucide-react";

const pharmacies = [
  {
    name: "MediSwift Pharmacy — Thaltej",
    area: "Thaltej, SG Highway",
    distance: "1.2 km",
    eta: "18 min",
    rating: 4.7,
    open: true,
    hours: "Open till 11:00 PM",
  },
  {
    name: "LifeCare Chemist",
    area: "Bodakdev",
    distance: "2.4 km",
    eta: "24 min",
    rating: 4.5,
    open: true,
    hours: "Open 24 hours",
  },
  {
    name: "Wellness Medico Store",
    area: "Vastrapur Lake Road",
    distance: "3.1 km",
    eta: "29 min",
    rating: 4.4,
    open: true,
    hours: "Open till 10:30 PM",
  },
  {
    name: "Shree Medical & General",
    area: "Makarba",
    distance: "4.6 km",
    eta: "35 min",
    rating: 4.2,
    open: false,
    hours: "Opens at 8:00 AM",
  },
];

export function ActivePharmacies() {
  const activeCount = pharmacies.filter((p) => p.open).length;

  return (
    <section className="mx-auto mt-4 max-w-[1536px] px-4 lg:px-8">
      <div className="rounded-xl bg-card px-4 py-5 shadow-card sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-[20px] font-semibold tracking-tight text-ink">
              Pharmacies Active Now
            </h2>
            <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-ink-soft">
              <span className="inline-flex items-center gap-1">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-chart-2/60" />
                  <span className="h-2 w-2 rounded-full bg-chart-2" />
                </span>
                {activeCount} pharmacies delivering
              </span>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3 text-brand" /> Thaltej, Ahmedabad
              </span>
            </p>
          </div>
          <button className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-brand">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pharmacies.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-ink">
                  {p.name}
                </h3>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    p.open
                      ? "bg-chart-2/15 text-chart-2"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {p.open ? "Open" : "Closed"}
                </span>
              </div>

              <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-ink-soft">
                <MapPin className="h-3 w-3" /> {p.area}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-soft">
                <span className="inline-flex items-center gap-1">
                  <Navigation className="h-3 w-3 text-brand" /> {p.distance}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 text-brand" /> {p.eta}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-chart-4 text-chart-4" /> {p.rating}
                </span>
              </div>

              <p className="mt-2 text-[11px] text-ink-soft">{p.hours}</p>

              <button
                disabled={!p.open}
                className="mt-3 w-full rounded-lg gradient-brand px-3 py-2 text-[11px] font-medium text-brand-foreground shadow-pill disabled:opacity-50"
              >
                {p.open ? "Order from here" : "Currently unavailable"}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
