import {
  LayoutDashboard,
  Package,
  Store,
  Tags,
  Truck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export type SuperadminTabKey =
  "overview" | "categories" | "doctors" | "pharmacies" | "delivery" | "products" | "patients";

export type SuperadminTab = {
  key: SuperadminTabKey;
  label: string;
  Icon: LucideIcon;
};

export const superadminTabs: SuperadminTab[] = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "categories", label: "Categories", Icon: Tags },
  { key: "doctors", label: "Doctors", Icon: UserRound },
  { key: "pharmacies", label: "Pharmacies", Icon: Store },
  { key: "delivery", label: "Delivery partners", Icon: Truck },
  { key: "products", label: "Products & categories", Icon: Package },
  { key: "patients", label: "Patients", Icon: Users },
];
