import type { Dispatch, SetStateAction } from "react";
import type { LucideIcon } from "lucide-react";

export type TabKey = "overview" | "inventory" | "orders" | "pharmacy";

export type DashboardTab = { key: TabKey; label: string; Icon: LucideIcon };

export type InventoryRow = {
  name: string;
  brand: string;
  batch: string;
  stock: number;
  price: number;
  expiry: string;
  rx: boolean;
};

export type SalesRange = "7d" | "30d" | "90d";

export type OrderApprovalStatus = "pending" | "approved" | "rejected";

export type Order = {
  id: string;
  customer: string;
  area: string;
  items: number;
  amount: number;
  stage: number;
  eta: string;
  status: OrderApprovalStatus;
};

export type OrderStatus =
  "pending" | "placed" | "packed" | "out_for_delivery" | "delivered" | "rejected";

export type OnlineProps = {
  online: boolean;
  setOnline: Dispatch<SetStateAction<boolean>>;
};
