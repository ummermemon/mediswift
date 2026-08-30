import * as React from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, Tags } from "lucide-react";
import heroWoman from "@/assets/hero-woman.png";
import heroWellness from "@/assets/hero-wellness.png";
import heroDevices from "@/assets/hero-devices.png";
import heroMedicines from "@/assets/hero-medicines.png";
import heroPersonal from "@/assets/hero-personal.png";

const trust = [
  { Icon: ShieldCheck, title: "100% Original", sub: "Genuine Products" },
  { Icon: Truck, title: "Express Delivery", sub: "In 30 Minutes" },
  { Icon: Tags, title: "Best Prices", sub: "Everyday" },
];

const slides = [
  {
    title: "Healthcare,",
    accent: "Swift",
    sub: "All your healthcare needs, delivered to your doorstep in minutes.",
    img: heroWoman,
    pos: "object-[70%_center]",
    alt: "Woman holding a phone with the MediSwift app open",
    offerTop: "Flat",
    offerBig: "20%",
    offerFor: "on all medicines",
    code: "HEALTH20",
  },
  {
    title: "Wellness,",
    accent: "Daily",
    sub: "Vitamins, supplements and immunity essentials curated by pharmacists.",
    img: heroWellness,
    pos: "object-[62%_center]",
    alt: "Woman with vitamins and supplements at home",
    offerTop: "Up to",
    offerBig: "30%",
    offerFor: "on wellness range",
    code: "WELL30",
  },
  {
    title: "Devices,",
    accent: "Precise",
    sub: "BP monitors, glucometers and thermometers from trusted brands.",
    img: heroDevices,
    pos: "object-[68%_center]",
    alt: "Man with a BP monitor, thermometer and glucometer",
    offerTop: "Flat",
    offerBig: "25%",
    offerFor: "on health devices",
    code: "CARE25",
  },
  {
    title: "Medicines,",
    accent: "Fast",
    sub: "Upload your prescription and get medicines delivered in 30 minutes.",
    img: heroMedicines,
    pos: "object-[62%_center]",
    alt: "MediSwift delivery partner handing a parcel to a customer",
    offerTop: "Extra",
    offerBig: "15%",
    offerFor: "on prescriptions",
    code: "RX15",
  },
  {
    title: "Personal Care,",
    accent: "Gentle",
    sub: "Skin, hair and hygiene essentials for the whole family.",
    img: heroPersonal,
    pos: "object-[60%_center]",
    alt: "Family with personal care products at home",
    offerTop: "Flat",
    offerBig: "18%",
    offerFor: "on personal care",
    code: "SKIN18",
  },
];

export function Hero() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="mx-auto max-w-[1536px] px-4 lg:px-8">
      <div
        className="relative overflow-hidden rounded-xl gradient-hero shadow-card"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.code} className="relative w-full shrink-0 gradient-hero">
              <img
                src={slide.img}
                alt={slide.alt}
                width={1600}
                height={848}
                className={`pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover opacity-95 lg:w-[72%] ${slide.pos}`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.95_0.02_240/0.96)_0%,oklch(0.95_0.02_240/0.85)_28%,oklch(0.95_0.02_240/0.25)_48%,transparent_62%)]" />

              <div className="relative grid gap-8 px-5 py-8 sm:px-8 lg:min-h-[380px] lg:grid-cols-[minmax(0,520px)_1fr] lg:items-center lg:px-14 lg:py-12">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-2 rounded-full bg-card/85 px-3 py-1 text-[11px] font-medium text-brand shadow-soft">
                    <span className="text-brand-light">✛</span> Your Health, Our Priority
                  </span>
                  <h1 className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[40px]">
                    {slide.title}
                    <br />
                    Now{" "}
                    <span className="italic text-brand-light">
                      {slide.accent}
                      <span className="ml-1 not-italic">≈</span>
                    </span>
                  </h1>
                  <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed text-ink-soft">
                    {slide.sub}
                  </p>
                  <button className="mt-6 inline-flex items-center gap-2 rounded-lg gradient-brand px-5 py-2.5 text-[14px] font-medium text-brand-foreground shadow-pill transition-transform hover:-translate-y-0.5">
                    Order Now <ArrowRight className="h-4 w-4" />
                  </button>

                  <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                    {trust.map(({ Icon, title, sub }) => (
                      <li key={title} className="flex items-center gap-2">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-card/85 shadow-soft">
                          <Icon className="h-4 w-4 text-brand" />
                        </span>
                        <span className="leading-tight">
                          <span className="block text-[11px] font-semibold text-ink">{title}</span>
                          <span className="block text-[10px] text-ink-soft">{sub}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Offer card */}
                <div className="lg:justify-self-end">
                  <div className="w-[160px] rounded-lg bg-card/90 p-4 shadow-card backdrop-blur-sm">
                    <p className="text-[12px] font-medium text-ink">{slide.offerTop}</p>
                    <p className="mt-1 text-[22px] font-semibold leading-none text-brand-light">
                      {slide.offerBig} <span className="text-[13px] font-medium text-ink">OFF</span>
                    </p>
                    <p className="mt-2 text-[12px] text-ink-soft">{slide.offerFor}</p>
                    <p className="mt-3 text-[11px] text-ink-soft">Use Code</p>
                    <p className="mt-1 rounded-md border border-border bg-card px-3 py-1.5 text-center text-[12px] font-semibold text-ink">
                      {slide.code}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          aria-label="Previous slide"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-ink shadow-soft sm:grid"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-ink shadow-soft sm:grid"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-card/80 px-3 py-1.5">
          {slides.map((s, i) => (
            <button
              key={s.code}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "h-1 w-5 rounded-full bg-brand"
                  : "h-1 w-3 rounded-full bg-border"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
