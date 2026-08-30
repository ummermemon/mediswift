import * as React from "react";
import { CheckCircle2, Clock, Package, Phone, X, XCircle } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { initialOrders, orderStages } from "./pharmacist-data";
import { getOrderStatus } from "./pharmacist-utils";
import type { Order, OrderStatus } from "./pharmacist-types";

const statusBadge: Record<OrderStatus, { label: string; cls: string }> = {
  pending: { label: "Pending approval", cls: "bg-chart-4/20 text-chart-5" },
  placed: { label: "Placed", cls: "bg-brand-soft text-brand" },
  packed: { label: "Packed", cls: "bg-chart-2/15 text-chart-2" },
  out_for_delivery: { label: "Out for delivery", cls: "bg-chart-2/15 text-chart-2" },
  delivered: { label: "Delivered", cls: "bg-chart-2/15 text-chart-2" },
  rejected: { label: "Rejected", cls: "bg-destructive/10 text-destructive" },
};

function OrderCard({
  order,
  status,
  onDecide,
  onAdvance,
}: {
  order: Order;
  status: OrderStatus;
  onDecide: (id: string, status: "approved" | "rejected") => void;
  onAdvance: (id: string) => void;
}) {
  return (
    <article className="rounded-lg border border-border p-3.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-brand-soft">
          <Package className="h-4 w-4 text-brand" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[13px] font-semibold text-ink">{order.id}</h3>
          <p className="text-[11.5px] text-ink-soft">
            {order.customer} · {order.area} · {order.items} items
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[13px] font-semibold text-ink">₹{order.amount}</span>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-medium ${statusBadge[status].cls}`}
          >
            {statusBadge[status].label}
          </span>
        </div>
      </div>
      {status === "pending" ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11.5px] text-ink-soft">
            Review the order before accepting it for fulfilment.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onDecide(order.id, "approved")}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Approve
            </button>
            <button
              onClick={() => onDecide(order.id, "rejected")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-2 text-[12px] font-medium text-destructive"
            >
              <XCircle className="h-3.5 w-3.5" /> Reject
            </button>
          </div>
        </div>
      ) : status === "rejected" ? (
        <p className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] text-ink-soft">
          <X className="h-3.5 w-3.5 text-destructive" />
          Order rejected — customer has been notified.
        </p>
      ) : (
        <>
          <ol className="mt-3 grid grid-cols-4 gap-1.5">
            {orderStages.map((stage, index) => (
              <li key={stage}>
                <span
                  className={`block h-1.5 rounded-full ${index <= order.stage ? "bg-brand" : "bg-border"}`}
                />
                <span
                  className={`mt-1.5 block truncate text-[10.5px] ${index <= order.stage ? "text-ink" : "text-ink-soft"}`}
                >
                  {stage}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11.5px] text-ink-soft">
              <Clock className="h-3.5 w-3.5 text-brand" /> ETA {order.eta}
            </span>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11.5px] font-medium text-ink-soft">
              <Phone className="h-3.5 w-3.5" /> Call customer
            </button>
            <button
              disabled={order.stage === orderStages.length - 1}
              onClick={() => onAdvance(order.id)}
              className="ml-auto rounded-lg gradient-brand px-3.5 py-2 text-[12px] font-medium text-brand-foreground shadow-pill disabled:opacity-50"
            >
              {order.stage === orderStages.length - 1
                ? "Completed"
                : `Mark as ${orderStages[order.stage + 1]}`}
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export function Orders() {
  const [rows, setRows] = React.useState<Order[]>(initialOrders);
  const [filter, setFilter] = React.useState<OrderStatus>("pending");
  const decide = (id: string, status: "approved" | "rejected") =>
    setRows((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  const advance = (id: string) =>
    setRows((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              stage: Math.min(orderStages.length - 1, order.stage + 1),
              eta: order.stage + 1 === orderStages.length - 1 ? "Delivered" : order.eta,
            }
          : order,
      ),
    );
  const counts = rows.reduce<Record<OrderStatus, number>>(
    (result, order) => {
      result[getOrderStatus(order)] += 1;
      return result;
    },
    { pending: 0, placed: 0, packed: 0, out_for_delivery: 0, delivered: 0, rejected: 0 },
  );
  const tabs: { key: OrderStatus; label: string }[] = [
    { key: "pending", label: "Pending approval" },
    { key: "placed", label: "Placed" },
    { key: "packed", label: "Packed" },
    { key: "out_for_delivery", label: "Out for delivery" },
    { key: "delivered", label: "Delivered" },
    { key: "rejected", label: "Rejected" },
  ];
  const filtered = rows.filter((order) => getOrderStatus(order) === filter);
  return (
    <SectionCard
      title="Orders"
      subtitle={`${counts.pending} pending approval · manage orders by status`}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium ${filter === key ? "gradient-brand text-brand-foreground shadow-pill" : "bg-card text-ink-soft shadow-soft hover:text-brand"}`}
          >
            {label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold ${filter === key ? "bg-white/20 text-white" : "bg-brand-soft text-brand"}`}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-lg border border-border py-8 text-center text-[12px] text-ink-soft">
            No orders right now.
          </div>
        )}
        {filtered.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            status={getOrderStatus(order)}
            onDecide={decide}
            onAdvance={advance}
          />
        ))}
      </div>
    </SectionCard>
  );
}
