import * as React from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  Clock,
  IndianRupee,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionCard } from "./SectionCard";
import { Stat } from "./Stat";
import { initialOrders, inventoryChartData, orderStages, salesData } from "./pharmacist-data";
import type { OnlineProps, SalesRange, TabKey } from "./pharmacist-types";

export function Overview({
  online,
  setOnline,
  onNavigate,
}: OnlineProps & { onNavigate: (tab: TabKey) => void }) {
  const [salesRange, setSalesRange] = React.useState<SalesRange>("7d");

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Today's orders" value="38" hint="12 awaiting packing" Icon={ShoppingBag} />
        <Stat
          label="Pending approvals"
          value="2"
          hint="Approve or reject to release"
          Icon={Package}
          tone="warn"
        />
        <Stat
          label="Low / out of stock"
          value="3"
          hint="Reorder soon"
          Icon={AlertTriangle}
          tone="bad"
        />
        <Stat
          label="Today's revenue"
          value="₹42,180"
          hint="+12% vs yesterday"
          Icon={IndianRupee}
          tone="good"
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[1.4fr_1fr_1fr]">
        <SectionCard
          title="Live order queue"
          subtitle="Orders currently in your fulfilment pipeline"
          className="xl:row-span-2"
          action={
            <button
              onClick={() => onNavigate("orders")}
              className="rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-brand"
            >
              Manage orders
            </button>
          }
        >
          <ul className="space-y-2">
            {initialOrders.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border px-3 py-2.5"
              >
                <span className="text-[12.5px] font-medium text-ink">{order.id}</span>
                <span className="text-[12px] text-ink-soft">
                  {order.customer} · {order.area}
                </span>
                <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-ink-soft">
                  <Clock className="h-3 w-3 text-brand" /> {order.eta}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-medium ${order.status === "pending" ? "bg-chart-4/20 text-chart-5" : order.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-chart-2/15 text-chart-2"}`}
                >
                  {order.status === "pending"
                    ? "Pending approval"
                    : order.status === "rejected"
                      ? "Rejected"
                      : orderStages[order.stage]}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Inventory health"
          subtitle="Current SKU availability across your pharmacy"
          className="xl:col-start-2 xl:row-start-1"
          action={
            <button
              onClick={() => onNavigate("inventory")}
              className="rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-brand"
            >
              View inventory
            </button>
          }
        >
          <div className="flex flex-col items-center gap-4">
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={76}
                    paddingAngle={3}
                  >
                    {inventoryChartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid w-full gap-2 xl:grid-cols-1 sm:grid-cols-3">
              {inventoryChartData.map((entry) => (
                <div
                  key={entry.name}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
                >
                  <span className="flex items-center gap-2 text-[11px] text-ink-soft">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    {entry.name}
                  </span>
                  <span className="text-right">
                    <span className="text-[20px] font-semibold text-ink">{entry.value}</span>
                    <span className="ml-1 text-[10.5px] text-ink-soft">SKUs</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Sales"
          subtitle="Revenue generated from medicine orders"
          className="xl:col-start-3 xl:row-start-1"
          action={
            <div className="flex rounded-lg border border-border p-0.5">
              {(["7d", "30d", "90d"] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setSalesRange(range)}
                  className={`rounded-md px-2 py-1 text-[10.5px] font-medium ${salesRange === range ? "bg-brand-soft text-brand" : "text-ink-soft hover:text-brand"}`}
                >
                  {range}
                </button>
              ))}
            </div>
          }
        >
          <div className="h-[170px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData[salesRange]}
                margin={{ top: 8, right: 4, left: -18, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#e7edf3" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#718096" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#718096" }}
                  tickFormatter={(value) => `₹${Number(value) / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Sales"]}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#1683d8"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#1683d8", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Pharmacy status"
          subtitle="MediSwift Pharmacy — Thaltej"
          className="xl:col-span-2 xl:col-start-2 xl:row-start-2"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
              <div>
                <p className="text-[12.5px] font-medium text-ink">Accepting orders</p>
                <p className="text-[11px] text-ink-soft">
                  {online ? "Customers can order now" : "Storefront is paused"}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={online}
                aria-label="Toggle accepting orders"
                onClick={() => setOnline((value) => !value)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${online ? "bg-brand" : "bg-border"}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-soft transition-all ${online ? "left-[22px]" : "left-0.5"}`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
              <span className="inline-flex items-center gap-2 text-[12.5px] text-ink">
                <BadgeCheck className="h-4 w-4 text-brand" /> Drug licence
              </span>
              <span className="text-[11px] text-ink-soft">Valid till Dec 2027</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
              <span className="inline-flex items-center gap-2 text-[12.5px] text-ink">
                <Truck className="h-4 w-4 text-brand" /> Avg. delivery time
              </span>
              <span className="text-[11px] text-ink-soft">22 min</span>
            </div>
            <button
              onClick={() => onNavigate("pharmacy")}
              className="w-full rounded-lg gradient-brand px-4 py-2.5 text-[12.5px] font-medium text-brand-foreground shadow-pill"
            >
              Edit pharmacy details
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
