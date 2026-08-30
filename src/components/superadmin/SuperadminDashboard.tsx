import * as React from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/superadmin-logo.png";
import {
  Activity,
  Bell,
  Ban,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  LayoutDashboard,
  KeyRound,
  LogOut,
  MapPin,
  Package,
  PanelLeft,
  Pencil,
  Plus,
  Search,
  Store,
  Trash2,
  Truck,
  UserRound,
  Users,
  X,
} from "lucide-react";

type TabKey = "overview" | "doctors" | "pharmacies" | "delivery" | "products" | "patients";
type DoctorStatus = "pending" | "approved" | "rejected";
type EntityStatus = "active" | "pending" | "suspended";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  license: string;
  submitted: string;
  status: DoctorStatus;
};

type Pharmacy = {
  id: string;
  name: string;
  owner: string;
  area: string;
  orders: number;
  status: EntityStatus;
};
type Partner = {
  id: string;
  name: string;
  phone: string;
  area: string;
  deliveries: number;
  status: EntityStatus;
};
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: EntityStatus;
};
type Patient = {
  id: string;
  name: string;
  area: string;
  joined: string;
  orders: number;
  status: EntityStatus;
};

type Tab = { key: TabKey; label: string; Icon: typeof LayoutDashboard };

const tabs: Tab[] = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "doctors", label: "Doctors", Icon: UserRound },
  { key: "pharmacies", label: "Pharmacies", Icon: Store },
  { key: "delivery", label: "Delivery partners", Icon: Truck },
  { key: "products", label: "Products & categories", Icon: Package },
  { key: "patients", label: "Patients", Icon: Users },
];

const initialDoctors: Doctor[] = [
  {
    id: "DR-2081",
    name: "Dr. Ananya Mehta",
    specialty: "General Physician",
    license: "GJ-MED-48291",
    submitted: "Today, 9:42 AM",
    status: "pending",
  },
  {
    id: "DR-2078",
    name: "Dr. Rohan Shah",
    specialty: "Dermatologist",
    license: "GJ-MED-47120",
    submitted: "Yesterday",
    status: "pending",
  },
  {
    id: "DR-2074",
    name: "Dr. Neel Iyer",
    specialty: "Cardiologist",
    license: "GJ-MED-46318",
    submitted: "18 Aug 2026",
    status: "approved",
  },
  {
    id: "DR-2069",
    name: "Dr. Kavya Rao",
    specialty: "Pediatrician",
    license: "GJ-MED-45108",
    submitted: "16 Aug 2026",
    status: "rejected",
  },
];

const initialPharmacies: Pharmacy[] = [
  {
    id: "PH-088",
    name: "Wellness Pharmacy",
    owner: "Nishit Patel",
    area: "Thaltej",
    orders: 284,
    status: "active",
  },
  {
    id: "PH-087",
    name: "CityCare Medicals",
    owner: "Harsh Shah",
    area: "Bodakdev",
    orders: 219,
    status: "active",
  },
  {
    id: "PH-086",
    name: "Apollo Corner",
    owner: "Mira Desai",
    area: "Vastrapur",
    orders: 0,
    status: "pending",
  },
  {
    id: "PH-082",
    name: "HealthFirst Store",
    owner: "Dev Joshi",
    area: "Makarba",
    orders: 142,
    status: "suspended",
  },
];

const initialPartners: Partner[] = [
  {
    id: "DP-1042",
    name: "Aarav Parmar",
    phone: "+91 98765 21042",
    area: "Thaltej",
    deliveries: 38,
    status: "active",
  },
  {
    id: "DP-1038",
    name: "Ishita Shah",
    phone: "+91 98254 78120",
    area: "Bodakdev",
    deliveries: 31,
    status: "active",
  },
  {
    id: "DP-1036",
    name: "Vivek Patel",
    phone: "+91 99041 53319",
    area: "Vastrapur",
    deliveries: 0,
    status: "pending",
  },
];

const initialProducts: Product[] = [
  {
    id: "PR-4102",
    name: "Vitamin C 1000mg Tablets",
    category: "Wellness",
    price: 349,
    stock: 126,
    status: "active",
  },
  {
    id: "PR-4098",
    name: "Digital BP Monitor",
    category: "Healthcare Devices",
    price: 1899,
    stock: 42,
    status: "active",
  },
  {
    id: "PR-4091",
    name: "Paracetamol 650mg",
    category: "Medicines",
    price: 32,
    stock: 8,
    status: "active",
  },
  {
    id: "PR-4087",
    name: "Gentle Daily Face Wash",
    category: "Personal Care",
    price: 199,
    stock: 0,
    status: "suspended",
  },
];

const initialPatients: Patient[] = [
  {
    id: "P-1042",
    name: "Rhea Shah",
    area: "Thaltej, Ahmedabad",
    joined: "12 Aug 2026",
    orders: 4,
    status: "active",
  },
  {
    id: "P-1039",
    name: "Kunal Patel",
    area: "Bodakdev, Ahmedabad",
    joined: "08 Aug 2026",
    orders: 8,
    status: "active",
  },
  {
    id: "P-1035",
    name: "Meera Joshi",
    area: "Vastrapur, Ahmedabad",
    joined: "02 Aug 2026",
    orders: 12,
    status: "active",
  },
  {
    id: "P-1028",
    name: "Aditya Nair",
    area: "Makarba, Ahmedabad",
    joined: "28 Jul 2026",
    orders: 2,
    status: "suspended",
  },
];

function statusClass(status: string) {
  if (status === "approved" || status === "active") return "bg-chart-2/15 text-chart-2";
  if (status === "rejected" || status === "suspended") return "bg-destructive/10 text-destructive";
  return "bg-chart-4/15 text-ink";
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold capitalize ${statusClass(status)}`}
    >
      {status}
    </span>
  );
}

export function SuperadminDashboard() {
  const [tab, setTab] = React.useState<TabKey>("overview");
  const [doctors, setDoctors] = React.useState(initialDoctors);
  const [pharmacies, setPharmacies] = React.useState(initialPharmacies);
  const [partners, setPartners] = React.useState(initialPartners);
  const [products, setProducts] = React.useState(initialProducts);
  const [patients, setPatients] = React.useState(initialPatients);
  const [query, setQuery] = React.useState("");
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const notificationsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!profileRef.current?.contains(target)) setProfileOpen(false);
      if (!notificationsRef.current?.contains(target)) setNotificationsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const updateDoctor = (id: string, status: DoctorStatus) =>
    setDoctors((items) =>
      items.map((doctor) => (doctor.id === id ? { ...doctor, status } : doctor)),
    );
  const toggleStatus = <T extends { id: string; status: EntityStatus }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    id: string,
  ) =>
    setter((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "active" ? "suspended" : "active" }
          : item,
      ),
    );

  const pendingDoctors = doctors.filter((doctor) => doctor.status === "pending").length;

  return (
    <div className="superadmin-shell min-h-screen bg-page">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1536px] items-center gap-4 px-4 py-2 lg:px-8">
          <Link to="/" className="superadmin-logo-wrap flex shrink-0 items-center gap-2">
            <img
              src={logo}
              alt="MediSwift"
              className="superadmin-logo h-10 w-10 object-contain"
              width={64}
              height={64}
            />
          </Link>
          <nav className="hidden items-center gap-5 self-stretch lg:flex" aria-label="Workspace">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setTab(key);
                  setQuery("");
                }}
                className={`relative self-stretch px-0.5 text-[11px] font-medium ${tab === key ? "text-ink" : "text-ink-soft hover:text-ink"}`}
              >
                {label.replace(" & categories", "")}
                {tab === key && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand" />}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[11px] font-medium text-ink hover:border-brand hover:text-brand sm:flex"
            >
              <Store className="h-3.5 w-3.5" />
              Visit store
            </Link>
            <div ref={notificationsRef} className="relative">
              <button
                type="button"
                aria-expanded={notificationsOpen}
                aria-haspopup="menu"
                aria-label="Open notifications"
                onClick={() => {
                  setNotificationsOpen((open) => !open);
                  setProfileOpen(false);
                }}
                className="relative grid h-10 w-10 place-items-center rounded-lg border border-border text-ink-soft hover:bg-brand-soft hover:text-brand"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-destructive px-0.5 text-[9px] font-semibold text-destructive-foreground">
                  3
                </span>
              </button>
              {notificationsOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-40 mt-2 w-72 rounded-lg border border-border bg-card p-1.5 shadow-card"
                >
                  <div className="flex items-center justify-between px-3 py-2">
                    <p className="text-[12px] font-semibold text-ink">Notifications</p>
                    <span className="text-[10px] text-ink-soft">3 new</span>
                  </div>
                  {[
                    { title: "2 doctor registrations await review", time: "5 min ago" },
                    { title: "Apollo Corner submitted an application", time: "18 min ago" },
                    { title: "Paracetamol 650mg is low in stock", time: "32 min ago" },
                  ].map(({ title, time }) => (
                    <button
                      key={title}
                      type="button"
                      role="menuitem"
                      onClick={() => setNotificationsOpen(false)}
                      className="flex w-full items-start gap-2 rounded-md px-3 py-2 text-left hover:bg-brand-soft"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>
                        <span className="block text-[11.5px] text-ink">{title}</span>
                        <span className="mt-0.5 block text-[10px] text-ink-soft">{time}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div ref={profileRef} className="relative">
              <button
                type="button"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-label="Open profile menu"
                onClick={() => {
                  setProfileOpen((open) => !open);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-left hover:bg-brand-soft"
              >
                <img
                  src="https://i.pravatar.cc/96?img=12"
                  alt="Ummer Memon"
                  className="h-8 w-8 rounded-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <span className="hidden h-8 w-8 place-items-center rounded-full bg-brand-soft text-[11px] font-semibold text-brand">
                  UM
                </span>
                <div className="hidden leading-tight sm:block">
                  <p className="text-[12px] font-medium text-ink">Ummer Memon</p>
                  <p className="text-[10px] text-ink-soft">SUPERADMIN</p>
                </div>
                <ChevronDown
                  aria-hidden="true"
                  className={`hidden h-4 w-4 text-ink-soft transition-transform sm:block ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>
              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-40 mt-2 w-48 rounded-lg border border-border bg-card p-1.5 shadow-card"
                >
                  {[
                    { label: "Edit Profile", Icon: UserRound },
                    { label: "Change Password", Icon: KeyRound },
                    { label: "Logout", Icon: LogOut },
                  ].map(({ label, Icon }) => (
                    <button
                      key={label}
                      type="button"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[12px] text-ink hover:bg-brand-soft hover:text-brand"
                    >
                      <Icon aria-hidden="true" className="h-3.5 w-3.5" /> {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="superadmin-frame mx-auto flex max-w-[1536px] gap-0 px-4 lg:px-8">
        <aside
          className={`superadmin-rail hidden shrink-0 flex-col border-x border-border lg:flex ${sidebarExpanded ? "superadmin-rail-expanded w-[210px]" : "w-[52px] items-center"}`}
        >
          <div className="flex w-full items-center justify-between border-b border-border px-2 py-3">
            {sidebarExpanded && (
              <div className="pl-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                  Workspace
                </p>
                <p className="mt-0.5 text-[11px] text-ink-soft">MediSwift operations</p>
              </div>
            )}
            <button
              type="button"
              aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
              aria-expanded={sidebarExpanded}
              title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
              onClick={() => setSidebarExpanded((expanded) => !expanded)}
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-md text-ink-soft hover:bg-brand-soft hover:text-brand ${sidebarExpanded ? "ml-auto" : ""}`}
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </div>
          <div className={`flex w-full flex-col gap-1.5 py-4 ${sidebarExpanded ? "px-2" : "items-center"}`}>
            {tabs.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                title={label}
                aria-label={label}
                onClick={() => {
                  setTab(key);
                  setQuery("");
                }}
                className={`flex h-9 items-center rounded-md text-left ${sidebarExpanded ? "w-full gap-3 px-3" : "w-9 justify-center"} ${tab === key ? "bg-brand text-brand-foreground" : "text-ink-soft hover:bg-brand-soft hover:text-brand"}`}
              >
                <Icon className="h-4 w-4" />
                {sidebarExpanded && <span className="text-[11px] font-medium">{label}</span>}
                {sidebarExpanded && key === "doctors" && (
                  <span className="ml-auto rounded bg-chart-4/20 px-1.5 py-0.5 text-[9px] font-semibold text-ink">
                    {pendingDoctors}
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Create new item"
            className={`mt-auto mb-4 grid h-8 place-items-center rounded-md border border-border text-ink-soft hover:border-brand hover:text-brand ${sidebarExpanded ? "mx-2 w-[calc(100%-1rem)]" : "w-8"}`}
          >
            <Plus className="h-4 w-4" />
            {sidebarExpanded && <span className="ml-2 text-[11px] font-medium">Create workspace item</span>}
          </button>
        </aside>
        <main className="min-w-0 flex-1 px-0 py-5 lg:px-9 lg:py-7">
          <div className="mb-4 flex gap-1.5 overflow-x-auto lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setTab(key);
                  setQuery("");
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium ${tab === key ? "gradient-brand text-brand-foreground shadow-pill" : "bg-card text-ink-soft shadow-soft"}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
          {tab === "overview" && (
            <Overview
              pendingDoctors={pendingDoctors}
              doctors={doctors}
              pharmacies={pharmacies}
              partners={partners}
              products={products}
              onNavigate={setTab}
            />
          )}
          {tab === "doctors" && (
            <Doctors doctors={doctors} query={query} setQuery={setQuery} onUpdate={updateDoctor} />
          )}
          {tab === "pharmacies" && (
            <Pharmacies
              pharmacies={pharmacies}
              query={query}
              setQuery={setQuery}
              onToggle={(id) => toggleStatus(setPharmacies, id)}
            />
          )}
          {tab === "delivery" && (
            <Delivery
              partners={partners}
              query={query}
              setQuery={setQuery}
              onToggle={(id) => toggleStatus(setPartners, id)}
            />
          )}
          {tab === "products" && (
            <Products
              products={products}
              query={query}
              setQuery={setQuery}
              onToggle={(id) => toggleStatus(setProducts, id)}
            />
          )}
          {tab === "patients" && (
            <Patients
              patients={patients}
              query={query}
              setQuery={setQuery}
              onToggle={(id) => toggleStatus(setPatients, id)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function TabButton({
  active,
  label,
  Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  Icon: Tab["Icon"];
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[12px] font-medium ${active ? "gradient-brand text-brand-foreground shadow-pill" : "text-ink-soft hover:bg-brand-soft hover:text-brand"}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function PageHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>
        <h1 className="mt-1 text-[22px] font-semibold tracking-tight text-ink">{title}</h1>
        <p className="mt-1 text-[12px] text-ink-soft">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-card p-4 shadow-card sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
          {subtitle && <p className="mt-0.5 text-[11px] text-ink-soft">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Overview({
  pendingDoctors,
  doctors,
  pharmacies,
  partners,
  products,
  onNavigate,
}: {
  pendingDoctors: number;
  doctors: Doctor[];
  pharmacies: Pharmacy[];
  partners: Partner[];
  products: Product[];
  onNavigate: (tab: TabKey) => void;
}) {
  const stats = [
    {
      label: "Pending approvals",
      value: pendingDoctors,
      note: "Doctor registrations",
      Icon: ClipboardCheck,
      tab: "doctors" as TabKey,
    },
    {
      label: "Active pharmacies",
      value: pharmacies.filter((item) => item.status === "active").length,
      note: "Across Ahmedabad",
      Icon: Store,
      tab: "pharmacies" as TabKey,
    },
    {
      label: "Delivery partners",
      value: partners.filter((item) => item.status === "active").length,
      note: "Currently active",
      Icon: Truck,
      tab: "delivery" as TabKey,
    },
    {
      label: "Live products",
      value: products.filter((item) => item.status === "active").length,
      note: "In the catalogue",
      Icon: Package,
      tab: "products" as TabKey,
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
              <ChevronDown className="h-4 w-4 -rotate-90 text-ink-soft" />
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

function ActionRow({
  Icon,
  title,
  detail,
  action,
  onClick,
}: {
  Icon: Tab["Icon"];
  title: string;
  detail: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-soft text-brand">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[11px] text-ink-soft">{detail}</p>
      </div>
      <button
        onClick={onClick}
        className="shrink-0 text-[11px] font-medium text-brand hover:text-brand-dark"
      >
        {action}
      </button>
    </div>
  );
}
function ActivityLine({
  color,
  title,
  detail,
  time,
}: {
  color: string;
  title: string;
  detail: string;
  time: string;
}) {
  return (
    <div className="flex gap-3">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color}`} />
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[11px] text-ink-soft">{detail}</p>
      </div>
      <time className="shrink-0 text-[10px] text-ink-soft">{time}</time>
    </div>
  );
}

function Toolbar({
  query,
  setQuery,
  placeholder,
  action,
}: {
  query: string;
  setQuery: (value: string) => void;
  placeholder: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2 focus-within:border-brand">
        <Search className="h-3.5 w-3.5 text-ink-soft" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-soft/70"
        />
      </div>
      {action}
    </div>
  );
}

function Doctors({
  doctors,
  query,
  setQuery,
  onUpdate,
}: {
  doctors: Doctor[];
  query: string;
  setQuery: (value: string) => void;
  onUpdate: (id: string, status: DoctorStatus) => void;
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
                            onUpdate(
                              doctor.id,
                              doctor.status === "approved" ? "rejected" : "approved",
                            )
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

function Pharmacies({
  pharmacies,
  query,
  setQuery,
  onToggle,
}: {
  pharmacies: Pharmacy[];
  query: string;
  setQuery: (value: string) => void;
  onToggle: (id: string) => void;
}) {
  const filtered = pharmacies.filter((item) =>
    `${item.name} ${item.owner} ${item.area}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="Marketplace"
        title="Manage pharmacies"
        subtitle="Review pharmacy partners and their marketplace access."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
            <Plus className="h-3.5 w-3.5" /> Add pharmacy
          </button>
        }
      />
      <Section title="Pharmacy partners" subtitle={`${pharmacies.length} registered pharmacies`}>
        <Toolbar
          query={query}
          setQuery={setQuery}
          placeholder="Search pharmacies, owners or areas"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {filtered.map((pharmacy) => (
            <EntityCard
              key={pharmacy.id}
              icon={Store}
              title={pharmacy.name}
              subtitle={`${pharmacy.owner} · ${pharmacy.area}`}
              meta={`${pharmacy.orders} orders this month`}
              status={pharmacy.status}
              onToggle={() => onToggle(pharmacy.id)}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
function Delivery({
  partners,
  query,
  setQuery,
  onToggle,
}: {
  partners: Partner[];
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

function Products({
  products,
  query,
  setQuery,
  onToggle,
}: {
  products: Product[];
  query: string;
  setQuery: (value: string) => void;
  onToggle: (id: string) => void;
}) {
  const filtered = products.filter((item) =>
    `${item.name} ${item.category} ${item.id}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="Catalogue"
        title="Products & categories"
        subtitle="Control catalogue visibility, pricing and stock signals."
        action={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[12px] font-medium text-ink-soft hover:border-brand hover:text-brand">
              <Pencil className="h-3.5 w-3.5" /> Categories
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
              <Plus className="h-3.5 w-3.5" /> Add product
            </button>
          </div>
        }
      />
      <Section title="Product catalogue" subtitle={`${products.length} products · 8 categories`}>
        <Toolbar
          query={query}
          setQuery={setQuery}
          placeholder="Search products, categories or IDs"
        />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wide text-ink-soft">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Price</th>
                <th className="pb-2 font-medium">Stock</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <p className="text-[12px] font-medium text-ink">{product.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-soft">{product.id}</p>
                  </td>
                  <td className="py-3 text-[12px] text-ink-soft">{product.category}</td>
                  <td className="py-3 text-[12px] font-medium text-ink">₹{product.price}</td>
                  <td
                    className={`py-3 text-[12px] ${product.stock < 10 ? "font-semibold text-destructive" : "text-ink"}`}
                  >
                    {product.stock}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onToggle(product.id)}
                      className="text-[11px] font-medium text-brand"
                    >
                      {product.status === "active" ? "Hide" : "Publish"}
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

function Patients({
  patients,
  query,
  setQuery,
  onToggle,
}: {
  patients: Patient[];
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

function EntityCard({
  icon: Icon,
  title,
  subtitle,
  meta,
  status,
  onToggle,
}: {
  icon: typeof Store;
  title: string;
  subtitle: string;
  meta: string;
  status: EntityStatus;
  onToggle: () => void;
}) {
  return (
    <article className="rounded-lg border border-border p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[13px] font-semibold text-ink">{title}</h3>
              <p className="mt-0.5 text-[11px] text-ink-soft">{subtitle}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
            <span className="text-[11px] text-ink-soft">{meta}</span>
            <button onClick={onToggle} className="text-[11px] font-medium text-brand">
              {status === "active" ? "Suspend" : "Activate"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
