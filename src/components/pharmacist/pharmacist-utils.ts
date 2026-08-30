import type { Order, OrderStatus } from "./pharmacist-types";

export function stockTone(stock: number) {
  if (stock === 0) return { label: "Out of stock", cls: "bg-destructive/10 text-destructive" };
  if (stock <= 20) return { label: "Low stock", cls: "bg-chart-4/20 text-chart-5" };
  return { label: "In stock", cls: "bg-chart-2/15 text-chart-2" };
}

export function getOrderStatus(order: Order): OrderStatus {
  if (order.status === "pending") return "pending";
  if (order.status === "rejected") return "rejected";
  if (order.stage === 0) return "placed";
  if (order.stage === 1) return "packed";
  if (order.stage === 2) return "out_for_delivery";
  return "delivered";
}
