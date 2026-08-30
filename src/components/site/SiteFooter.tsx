import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import logo from "@/assets/logo-horizontal.png";

const columns = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog", "Contact Us"],
  },
  {
    title: "Shop",
    links: ["Medicines", "Healthcare Devices", "Personal Care", "Wellness", "Elderly Care"],
  },
  {
    title: "Support",
    links: ["Help Center", "Track Order", "Returns & Refunds", "Upload Prescription", "FAQs"],
  },
  {
    title: "Policies",
    links: ["Privacy Policy", "Terms of Use", "Shipping Policy", "Editorial Policy"],
  },
];

const socials = [Facebook, Instagram, Twitter, Linkedin];

export function SiteFooter() {
  return (
    <footer className="mt-4 border-t border-border bg-card">
      <div className="mx-auto max-w-[1536px] px-4 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr]">
          <div className="min-w-0">
            <img
              src={logo}
              alt="MediSwift"
              width={1774}
              height={887}
              className="h-10 w-auto"
            />
            <p className="mt-3 max-w-[260px] text-[12px] leading-relaxed text-ink-soft">
              Genuine medicines, healthcare devices and wellness essentials delivered to your door
              in 30 minutes.
            </p>
            <ul className="mt-4 space-y-2 text-[12px] text-ink-soft">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                Makarba, Ahmedabad, Gujarat 380051
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-brand" /> +91 98000 12345
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-brand" /> care@mediswift.in
              </li>
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <h3 className="text-[12px] font-semibold uppercase tracking-wide text-ink">
                  {col.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[12px] text-ink-soft transition-colors hover:text-brand"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-ink-soft">
            © {new Date().getFullYear()} MediSwift. All rights reserved.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map((Icon, i) => (
              <li key={i}>
                <a
                  href="#"
                  aria-label="Social link"
                  className="grid h-8 w-8 place-items-center rounded-full bg-brand-soft text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
