import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export type CartItem = {
  name: string;
  pack: string;
  price: number;
  mrp: number;
  img: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: Omit<CartItem, "qty">) => void;
  setQty: (name: string, qty: number) => void;
  remove: (name: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "mediswift-cart";

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]") as CartItem[];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = React.useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const found = prev.find((i) => i.name === item.name);
      if (found) {
        return prev.map((i) => (i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = React.useCallback((name: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.name !== name)
        : prev.map((i) => (i.name === name ? { ...i, qty } : i)),
    );
  }, []);

  const remove = React.useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  const savings = items.reduce((s, i) => s + i.qty * (i.mrp - i.price), 0);

  return (
    <CartContext.Provider value={{ items, count, total, addItem, setQty, remove, open, setOpen }}>
      {children}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex w-full flex-col gap-0 bg-card p-0 sm:max-w-[400px]">
          <SheetHeader className="border-b border-border px-5 py-4 text-left">
            <SheetTitle className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <ShoppingCart className="h-4 w-4 text-brand" /> Your Cart
            </SheetTitle>
            <SheetDescription className="text-[12px] text-ink-soft">
              {count === 0
                ? "Your cart is empty"
                : `${count} item${count > 1 ? "s" : ""} · delivery in 22 min`}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <p className="mt-10 text-center text-[12px] text-ink-soft">
                Add products to get started.
              </p>
            ) : (
              <ul className="space-y-3">
                {items.map((i) => (
                  <li key={i.name} className="flex gap-3 rounded-lg border border-border p-2.5">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-brand-soft/60">
                      <img
                        src={i.img}
                        alt={i.name}
                        className="h-11 w-11 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[12px] font-medium text-ink">{i.name}</p>
                      <p className="mt-0.5 text-[11px] text-ink-soft">{i.pack}</p>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 rounded-md border border-border px-1.5 py-0.5">
                          <button
                            aria-label={`Decrease ${i.name}`}
                            onClick={() => setQty(i.name, i.qty - 1)}
                            className="text-ink-soft hover:text-brand"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-4 text-center text-[11px] font-medium text-ink">
                            {i.qty}
                          </span>
                          <button
                            aria-label={`Increase ${i.name}`}
                            onClick={() => setQty(i.name, i.qty + 1)}
                            className="text-ink-soft hover:text-brand"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-[13px] font-semibold text-ink">₹{i.price * i.qty}</p>
                        <button
                          aria-label={`Remove ${i.name}`}
                          onClick={() => remove(i.name)}
                          className="text-ink-soft hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-border px-5 py-4">
            <div className="flex items-center justify-between text-[12px] text-ink-soft">
              <span>You save</span>
              <span className="font-medium text-chart-2">₹{savings}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[14px] font-semibold text-ink">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              aria-disabled={items.length === 0}
              className={`mt-3 block w-full rounded-lg gradient-brand px-4 py-2.5 text-center text-[13px] font-medium text-brand-foreground shadow-pill ${items.length === 0 ? "pointer-events-none opacity-50" : ""}`}
            >
              Proceed to Checkout
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </CartContext.Provider>
  );
}
