import * as React from "react";
import {
  Accessibility,
  ArrowRight,
  Baby,
  CupSoda,
  ChevronRight,
  Grid2x2,
  Heart,
  Leaf,
  Package,
  RefreshCcw,
  Rocket,
  SprayCan,
  Stethoscope,
  Pill,
  Truck,
  Wallet,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import catWellness from "@/assets/cat-wellness.jpg";
import catPersonal from "@/assets/cat-personal.jpg";
import catDevices from "@/assets/cat-devices.jpg";
import catMedicines from "@/assets/cat-medicines.jpg";
import catElderly from "@/assets/cat-elderly.jpg";

const circles = [
  { label: "Medicines", Icon: Pill, tint: "bg-brand-soft", color: "text-brand" },
  { label: "Healthcare Devices", Icon: Stethoscope, tint: "bg-brand-soft", color: "text-brand" },
  { label: "Personal Care", Icon: SprayCan, tint: "bg-brand-soft", color: "text-brand-light" },
  { label: "Baby Care", Icon: Baby, tint: "bg-chart-4/15", color: "text-chart-4" },
  { label: "Health Drinks", Icon: CupSoda, tint: "bg-destructive/10", color: "text-destructive" },
  { label: "Wellness", Icon: Heart, tint: "bg-chart-2/15", color: "text-chart-2" },
  { label: "Ayurveda", Icon: Leaf, tint: "bg-chart-2/15", color: "text-chart-2" },
  { label: "Elderly Care", Icon: Accessibility, tint: "bg-brand-soft", color: "text-brand" },
];

const usps = [
  { Icon: Truck, title: "30 Min Delivery", sub: "Lightning fast delivery" },
  { Icon: Rocket, title: "Wide Range", sub: "10,000+ products" },
  { Icon: Package, title: "Genuine Products", sub: "100% authentic" },
  { Icon: Wallet, title: "Secure Payments", sub: "100% secure payments" },
  { Icon: RefreshCcw, title: "Easy Returns", sub: "Hassle free returns" },
];

const shopCards = [
  { title: "Wellness Essentials", sub: "Boost your daily well-being", img: catWellness },
  { title: "Personal Care", sub: "Skincare, haircare & daily essentials", img: catPersonal },
  { title: "Healthcare Devices", sub: "Monitors, machines & health devices", img: catDevices },
  { title: "Medicines", sub: "Allopathy, ayurveda & homeopathy", img: catMedicines },
  { title: "Elderly Care", sub: "Care & comfort for your loved ones", img: catElderly },
];

export function CategoryCircles() {
  return (
    <section className="mx-auto mt-4 max-w-[1536px] px-4 lg:px-8">
      <div className="rounded-xl bg-card px-4 py-4 shadow-card sm:px-6">
        <div className="grid grid-cols-3 gap-y-4 sm:grid-cols-5 lg:grid-cols-9">
          {circles.map(({ label, Icon, tint, color }) => (
            <a key={label} href="#" className="group flex flex-col items-center gap-2 px-1">
              <span
                className={`grid h-11 w-11 place-items-center rounded-full ${tint} transition-transform group-hover:-translate-y-1`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
              </span>
              <span className="text-center text-[11px] font-medium leading-tight text-ink">
                {label}
              </span>
            </a>
          ))}
          <a href="#" className="group flex flex-col items-center gap-2 px-1">
            <span className="grid h-11 w-11 place-items-center rounded-full gradient-brand shadow-pill transition-transform group-hover:-translate-y-1">
              <Grid2x2 className="h-5 w-5 text-brand-foreground" />
            </span>
            <span className="text-center text-[11px] font-semibold text-brand">View All</span>
          </a>
        </div>
      </div>
    </section>
  );
}
export function UspBar() {
  return (
    <section className="mx-auto mt-4 max-w-[1536px] px-4 lg:px-8">
      <div className="grid gap-y-4 rounded-xl bg-card px-4 py-4 shadow-card sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:divide-x lg:divide-border">
        {usps.map(({ Icon, title, sub }) => (
          <div key={title} className="flex items-center justify-center gap-2.5 px-3">
            <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.6} />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-medium text-ink">{title}</p>
              <p className="truncate text-[11px] text-ink-soft">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ShopByCategory() {
  return (
    <section className="mx-auto mt-4 max-w-[1536px] px-4 lg:px-8">
      <div className="rounded-xl bg-card px-4 py-5 shadow-card sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-[20px] font-semibold tracking-tight text-ink">Shop By Category</h2>
            <p className="mt-0.5 text-[12px] text-ink-soft">
              Explore our wide range of healthcare products
            </p>
          </div>
          <button className="inline-flex shrink-0 items-center gap-1.5 rounded-lg gradient-brand px-4 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
            View All Categories <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative mt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {shopCards.map(({ title, sub, img }) => (
              <article
                key={title}
                className="group relative flex min-h-[110px] items-stretch overflow-hidden rounded-lg border border-border bg-brand-soft/60 p-3 transition-shadow hover:shadow-card"
              >
                <div className="relative z-10 flex min-w-0 flex-1 flex-col">
                  <h3 className="text-[13px] font-semibold leading-tight text-ink">{title}</h3>
                  <p className="mt-1 max-w-[100px] text-[11px] leading-snug text-ink-soft">{sub}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-medium text-brand">
                    Shop Now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
                <img
                  src={img}
                  alt={title}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="pointer-events-none absolute bottom-0 right-0 h-[100px] w-[100px] object-contain transition-transform group-hover:scale-105"
                />
              </article>
            ))}
          </div>
          <button
            aria-label="Next categories"
            className="absolute -right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-card text-ink shadow-card lg:grid"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
