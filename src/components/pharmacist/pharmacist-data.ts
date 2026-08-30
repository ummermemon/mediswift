import { Boxes, Building2, LayoutDashboard, ShoppingBag } from "lucide-react";
import type { DashboardTab, InventoryRow, Order, SalesRange } from "./pharmacist-types";

export const tabs: DashboardTab[] = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "inventory", label: "Medicine Inventory", Icon: Boxes },
  { key: "orders", label: "Orders", Icon: ShoppingBag },
  { key: "pharmacy", label: "Pharmacy Details", Icon: Building2 },
];

export const initialInventory: InventoryRow[] = [
  {
    name: "Dolo 650 Tablet",
    brand: "Micro Labs",
    batch: "DL2291",
    stock: 240,
    price: 32,
    expiry: "Mar 2027",
    rx: false,
  },
  {
    name: "Azithral 500 Tablet",
    brand: "Alembic",
    batch: "AZ1188",
    stock: 18,
    price: 118,
    expiry: "Nov 2026",
    rx: true,
  },
  {
    name: "Pan D Capsule",
    brand: "Alkem",
    batch: "PD7741",
    stock: 96,
    price: 205,
    expiry: "Aug 2027",
    rx: true,
  },
  {
    name: "Volini Pain Relief Gel",
    brand: "Sun Pharma",
    batch: "VL5510",
    stock: 0,
    price: 165,
    expiry: "Jan 2027",
    rx: false,
  },
  {
    name: "Accu-Chek Test Strips",
    brand: "Roche",
    batch: "AC3320",
    stock: 42,
    price: 940,
    expiry: "Jun 2027",
    rx: false,
  },
  {
    name: "Shelcal 500 Tablet",
    brand: "Torrent",
    batch: "SC9021",
    stock: 7,
    price: 148,
    expiry: "Feb 2027",
    rx: false,
  },
];

export const orderStages = ["Placed", "Packed", "Out for delivery", "Delivered"] as const;

export const initialOrders: Order[] = [
  {
    id: "MS-90341",
    customer: "Rhea Shah",
    area: "Thaltej",
    items: 4,
    amount: 612,
    stage: 0,
    eta: "22 min",
    status: "pending",
  },
  {
    id: "MS-90338",
    customer: "Kunal Patel",
    area: "Bodakdev",
    items: 2,
    amount: 348,
    stage: 0,
    eta: "18 min",
    status: "pending",
  },
  {
    id: "MS-90335",
    customer: "Meera Joshi",
    area: "Vastrapur",
    items: 6,
    amount: 1240,
    stage: 2,
    eta: "9 min",
    status: "approved",
  },
  {
    id: "MS-90329",
    customer: "Aditya Nair",
    area: "Makarba",
    items: 1,
    amount: 165,
    stage: 3,
    eta: "Delivered",
    status: "approved",
  },
  {
    id: "MS-90324",
    customer: "Priya Verma",
    area: "Satellite",
    items: 3,
    amount: 520,
    stage: 0,
    eta: "—",
    status: "rejected",
  },
];

export const inventoryChartData = [
  { name: "In stock", value: 3, color: "#1683d8" },
  { name: "Low stock", value: 2, color: "#e7a51d" },
  { name: "Out of stock", value: 1, color: "#e05252" },
];

export const salesData: Record<SalesRange, { day: string; sales: number }[]> = {
  "7d": [
    { day: "Mon", sales: 5240 },
    { day: "Tue", sales: 6810 },
    { day: "Wed", sales: 5920 },
    { day: "Thu", sales: 7340 },
    { day: "Fri", sales: 8120 },
    { day: "Sat", sales: 9150 },
    { day: "Sun", sales: 7420 },
  ],
  "30d": [
    { day: "W1", sales: 42180 },
    { day: "W2", sales: 48320 },
    { day: "W3", sales: 45640 },
    { day: "W4", sales: 52780 },
  ],
  "90d": [
    { day: "Apr", sales: 158400 },
    { day: "May", sales: 174200 },
    { day: "Jun", sales: 192640 },
  ],
};
