import * as React from "react";
import { SuperadminHeader } from "./layout/SuperadminHeader";
import { SuperadminMobileNavigation, SuperadminSidebar } from "./layout/SuperadminSidebar";
import { type SuperadminTabKey } from "./layout/navigation";
import { CategoriesPage } from "./pages/CategoriesPage";
import { DeliveryPage } from "./pages/DeliveryPage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { OverviewPage } from "./pages/OverviewPage";
import { PatientsPage } from "./pages/PatientsPage";
import { PharmaciesPage } from "./pages/PharmaciesPage";
import { ProductsPage } from "./pages/ProductsPage";

type TabKey = SuperadminTabKey;
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

export function SuperadminDashboard() {
  const [tab, setTab] = React.useState<TabKey>("overview");
  const [doctors, setDoctors] = React.useState(initialDoctors);
  const [pharmacies, setPharmacies] = React.useState(initialPharmacies);
  const [partners, setPartners] = React.useState(initialPartners);
  const [products, setProducts] = React.useState(initialProducts);
  const [patients, setPatients] = React.useState(initialPatients);
  const [query, setQuery] = React.useState("");

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
      <SuperadminHeader activeTab={tab} onTabChange={setTab} onQueryReset={() => setQuery("")} />

      <div className="superadmin-frame mx-auto flex max-w-[1536px] gap-0 px-4 lg:px-8">
        <SuperadminSidebar
          activeTab={tab}
          pendingDoctors={pendingDoctors}
          onTabChange={setTab}
          onQueryReset={() => setQuery("")}
        />
        <main className="min-w-0 flex-1 px-0 py-5 lg:px-9 lg:py-7">
          <SuperadminMobileNavigation
            activeTab={tab}
            onTabChange={setTab}
            onQueryReset={() => setQuery("")}
          />
          {tab === "overview" && (
            <OverviewPage
              pendingDoctors={pendingDoctors}
              pharmacies={pharmacies}
              partners={partners}
              products={products}
              onNavigate={setTab}
            />
          )}
          {tab === "categories" && <CategoriesPage query={query} setQuery={setQuery} />}
          {tab === "doctors" && (
            <DoctorsPage doctors={doctors} query={query} setQuery={setQuery} onUpdate={updateDoctor} />
          )}
          {tab === "pharmacies" && (
            <PharmaciesPage
              pharmacies={pharmacies}
              query={query}
              setQuery={setQuery}
              onToggle={(id) => toggleStatus(setPharmacies, id)}
            />
          )}
          {tab === "delivery" && (
            <DeliveryPage
              partners={partners}
              query={query}
              setQuery={setQuery}
              onToggle={(id) => toggleStatus(setPartners, id)}
            />
          )}
          {tab === "products" && (
            <ProductsPage
              products={products}
              query={query}
              setQuery={setQuery}
              onToggle={(id) => toggleStatus(setProducts, id)}
            />
          )}
          {tab === "patients" && (
            <PatientsPage
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

