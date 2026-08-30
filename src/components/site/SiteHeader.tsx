import * as React from "react";
import logo from "@/assets/logo-horizontal.png";
import { useCart } from "@/components/site/CartProvider";
import {
  Gift,
  Stethoscope as ConsultIcon,
  Menu,
  Package,
  Pill,
  MapPin,
  ShoppingCart,
  Stethoscope,
  SprayCan,
  Baby,
  CupSoda,
  Heart,
  Leaf,
  Accessibility,
  LockKeyhole,
  Mail,
  Search,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navCategories = [
  { label: "Medicines", Icon: Pill },
  { label: "Healthcare Devices", Icon: Stethoscope },
  { label: "Personal Care", Icon: SprayCan },
  { label: "Baby Care", Icon: Baby },
  { label: "Health Drinks", Icon: CupSoda },
  { label: "Wellness", Icon: Heart },
  { label: "Ayurveda", Icon: Leaf },
  { label: "Elderly Care", Icon: Accessibility },
];

const categoryPath = (label: string) =>
  label === "All Categories" ? "/" : `/category/${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

function Logo() {
  return (
    <a href="/" className="flex shrink-0 items-center">
      <img
        src={logo}
        alt="MediSwift — Where Healthcare Meets Technology"
        className="h-14 w-auto max-w-[260px] object-contain sm:h-16 lg:h-20"
        width={320}
        height={120}
      />
    </a>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.58a5.86 5.86 0 0 1 0-3.16V7.89H3.3a9.5 9.5 0 0 0 0 8.22l3.24-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.39c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.49 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
      />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 12.54c-.02-2.23 1.82-3.31 1.9-3.36a4.1 4.1 0 0 0-3.23-1.75c-1.36-.14-2.66.8-3.35.8-.7 0-1.77-.78-2.92-.76a4.3 4.3 0 0 0-3.63 2.21c-1.56 2.7-.4 6.67 1.1 8.85.74 1.07 1.6 2.27 2.75 2.23 1.1-.05 1.52-.7 2.86-.7 1.34 0 1.72.7 2.87.67 1.2-.02 1.94-1.08 2.66-2.16a8.8 8.8 0 0 0 1.21-2.5 3.88 3.88 0 0 1-2.22-3.53ZM14.86 6c.61-.74 1.02-1.77.91-2.8-.88.04-1.94.59-2.57 1.32-.56.65-1.05 1.7-.92 2.7.98.08 1.98-.5 2.58-1.22Z" />
    </svg>
  );
}

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const [authSubmitted, setAuthSubmitted] = React.useState(false);

  return (
    <header className="bg-card">
      <div className="mx-auto flex max-w-[1536px] flex-wrap items-center gap-3 px-4 py-2.5 lg:flex-nowrap lg:gap-5 lg:px-8 lg:py-3">
        <Logo />

        {/* Delivery / pincode */}
        <div className="order-3 flex w-full min-w-0 flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2 shadow-soft sm:gap-4 lg:order-none lg:w-auto lg:flex-1 lg:max-w-[420px]">
          <div className="flex min-w-0 items-center gap-1.5 border-border pr-3 sm:border-r">
            <MapPin className="h-4 w-4 shrink-0 text-brand" />
            <div className="min-w-0 leading-tight">
              <p className="text-[11px] text-ink-soft">Deliver to</p>
              <p className="truncate text-[12px] font-medium text-ink">Thaltej, Ahmedabad</p>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <label className="block text-[10px] text-ink-soft" htmlFor="pincode">
              Enter your pincode
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                id="pincode"
                placeholder="e.g. 380055"
                className="min-w-0 flex-1 rounded-md border border-border bg-card px-2.5 py-1.5 text-[12px] text-ink outline-none placeholder:text-ink-soft/70 focus:border-brand"
              />
              <button className="shrink-0 rounded-md bg-brand px-3 py-1.5 text-[12px] font-medium text-brand-foreground transition-colors hover:bg-brand-dark">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Utility links */}
        <nav className="ml-auto flex items-center gap-4 text-[12px] font-medium text-ink lg:gap-6">
          <a className="hidden items-center gap-1.5 hover:text-brand sm:flex" href="#">
            <Gift className="h-4 w-4 text-ink-soft" /> Offers
          </a>
          <a className="hidden items-center gap-1.5 hover:text-brand sm:flex" href="#">
            <Package className="h-4 w-4 text-ink-soft" /> Track Order
          </a>
          <a className="hidden items-center gap-1.5 hover:text-brand md:flex" href="#">
            <ConsultIcon className="h-4 w-4 text-ink-soft" /> Consult with Doctor
          </a>
          <Dialog open={authOpen} onOpenChange={setAuthOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 hover:text-brand">
                <User className="h-4 w-4 text-ink-soft" /> Login / Sign up
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[420px] gap-0 overflow-hidden border-border bg-card p-0">
              <DialogHeader className="border-b border-border px-5 pb-4 pt-5 pr-12">
                <DialogTitle className="text-[18px] font-semibold text-ink">
                  Welcome back
                </DialogTitle>
                <DialogDescription className="text-[12px] text-ink-soft">
                  Log in to track orders and manage your healthcare needs.
                </DialogDescription>
              </DialogHeader>

              <div className="p-5">
                <form
                  className="space-y-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setAuthSubmitted(true);
                  }}
                >
                  <label className="block">
                    <span className="text-[11px] font-medium text-ink">Email address</span>
                    <div className="mt-1 flex items-center gap-2 rounded-lg border border-border px-3 py-2 focus-within:border-brand">
                      <Mail className="h-4 w-4 text-ink-soft" />
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-soft/70"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-medium text-ink">Password</span>
                    <div className="mt-1 flex items-center gap-2 rounded-lg border border-border px-3 py-2 focus-within:border-brand">
                      <LockKeyhole className="h-4 w-4 text-ink-soft" />
                      <input
                        required
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-soft/70"
                      />
                    </div>
                  </label>
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-[11px] font-medium text-brand hover:text-brand-dark"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg gradient-brand px-4 py-2.5 text-[12px] font-medium text-brand-foreground shadow-pill"
                  >
                    Log in
                  </button>
                  {authSubmitted && (
                    <p className="text-center text-[11px] text-chart-2">
                      Thanks. Authentication will be connected here shortly.
                    </p>
                  )}
                </form>
                <div className="my-5 flex items-center gap-3 text-[10px] text-ink-soft">
                  <span className="h-px flex-1 bg-border" />
                  Or continue with
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="space-y-3">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border px-3 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-brand-soft"
                  >
                    <GoogleMark /> Continue with Google
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border px-3 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-brand-soft"
                  >
                    <AppleMark /> Continue with Apple
                  </button>
                </div>
                <p className="mt-5 text-center text-[11px] text-ink-soft">
                  New to MediSwift?{" "}
                  <a href="#" className="font-medium text-brand hover:text-brand-dark">
                    Sign up
                  </a>
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <button
            aria-label="Open cart"
            onClick={() => setOpen(true)}
            className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft"
          >
            <ShoppingCart className="h-4 w-4 text-brand" />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
              {count}
            </span>
          </button>
        </nav>
      </div>

      {/* Category bar */}
      <div className="mx-auto max-w-[1536px] px-4 pb-3 lg:px-8">
        <div className="flex items-stretch gap-2">
          <Sheet open={categoryOpen} onOpenChange={setCategoryOpen}>
            <SheetTrigger asChild>
              <button className="flex min-w-[148px] shrink-0 items-center gap-2 rounded-lg gradient-brand px-4 py-3 text-left text-[13px] font-medium text-brand-foreground shadow-pill">
                <Menu className="h-4 w-4 shrink-0" />
                <span className="truncate">All Categories</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex w-full flex-col gap-0 bg-card p-0 sm:max-w-[400px]"
            >
              <SheetHeader className="border-b border-border px-5 py-4 text-left">
                <SheetTitle className="text-[15px] font-semibold text-ink">
                  Shop by category
                </SheetTitle>
                <SheetDescription className="text-[12px] text-ink-soft">
                  Browse our healthcare essentials.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {[{ label: "All Categories", Icon: Menu }, ...navCategories].map(
                    ({ label, Icon }) => (
                      <a
                        key={label}
                        href={categoryPath(label)}
                        onClick={() => setCategoryOpen(false)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-ink transition-colors hover:bg-brand-soft hover:text-brand"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft">
                          <Icon className="h-4 w-4 text-brand" />
                        </span>
                        <span className="flex-1">{label}</span>
                      </a>
                    ),
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex min-w-0 flex-1 items-center rounded-lg bg-card shadow-soft">
            <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-2 py-2 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navCategories.map(({ label, Icon }) => (
                <a
                  key={label}
                  href={categoryPath(label)}
                  className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-[12px] font-medium text-ink transition-colors hover:bg-brand-soft hover:text-brand lg:min-w-0 lg:shrink"
                >
                  <Icon className="h-4 w-4 text-brand" />
                  <span className="truncate">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
