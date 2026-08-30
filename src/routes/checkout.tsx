import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import * as React from "react";
import { CartProvider, useCart } from "@/components/site/CartProvider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-page">
        <SiteHeader />
        <CheckoutContent />
        <SiteFooter />
      </div>
    </CartProvider>
  );
}

function CheckoutContent() {
  const { items, total } = useCart();
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const deliveryFee = items.length > 0 ? 0 : 0;
  const grandTotal = total + deliveryFee;

  if (orderPlaced) {
    return (
      <main className="mx-auto flex max-w-[1536px] justify-center px-4 py-16 lg:px-8">
        <section className="w-full max-w-lg rounded-xl border border-border bg-card px-6 py-10 text-center shadow-card">
          <CheckCircle2 className="mx-auto h-12 w-12 text-chart-2" />
          <h1 className="mt-4 text-[24px] font-semibold tracking-tight text-ink">
            Order confirmed
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-ink-soft">
            Your order is being prepared. It will arrive at your doorstep in about 22 minutes.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg gradient-brand px-4 py-2.5 text-[12px] font-medium text-brand-foreground shadow-pill"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-5 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brand hover:text-brand-dark"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to storefront
      </Link>
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setOrderPlaced(true);
          }}
        >
          <section className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand" />
              <h1 className="text-[17px] font-semibold text-ink">Delivery details</h1>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="text-[11px] font-medium text-ink">Full name</span>
                <input
                  required
                  name="name"
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-[12px] text-ink outline-none focus:border-brand"
                  placeholder="Enter your full name"
                />
              </label>
              <label>
                <span className="text-[11px] font-medium text-ink">Phone number</span>
                <input
                  required
                  name="phone"
                  type="tel"
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-[12px] text-ink outline-none focus:border-brand"
                  placeholder="10-digit mobile number"
                />
              </label>
              <label>
                <span className="text-[11px] font-medium text-ink">Pincode</span>
                <input
                  required
                  name="pincode"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-border px-3 py-2 text-[12px] text-ink outline-none focus:border-brand"
                  placeholder="e.g. 380055"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="text-[11px] font-medium text-ink">Address</span>
                <textarea
                  required
                  name="address"
                  className="mt-1 min-h-20 w-full resize-none rounded-md border border-border px-3 py-2 text-[12px] text-ink outline-none focus:border-brand"
                  placeholder="House number, street and locality"
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-brand" />
              <h2 className="text-[17px] font-semibold text-ink">Payment method</h2>
            </div>
            <div className="mt-4 space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-brand bg-brand-soft/40 px-3 py-3">
                <input
                  required
                  type="radio"
                  name="payment"
                  value="cod"
                  defaultChecked
                  className="accent-[var(--brand)]"
                />
                <span className="text-[12px] font-medium text-ink">Cash on delivery</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-3">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  className="accent-[var(--brand)]"
                />
                <span className="text-[12px] font-medium text-ink">Pay online</span>
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={items.length === 0}
            className="w-full rounded-lg gradient-brand px-4 py-3 text-[13px] font-semibold text-brand-foreground shadow-pill disabled:cursor-not-allowed disabled:opacity-50"
          >
            Place order · ₹{grandTotal}
          </button>
        </form>

        <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
          <h2 className="text-[17px] font-semibold text-ink">Order summary</h2>
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-[12px] text-ink-soft">Your cart is empty.</p>
              <Link to="/" className="mt-3 inline-block text-[12px] font-medium text-brand">
                Browse products
              </Link>
            </div>
          ) : (
            <>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.name} className="flex gap-3 border-b border-border pb-3">
                    <img
                      src={item.img}
                      alt=""
                      className="h-12 w-12 rounded-md bg-brand-soft/60 object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[12px] font-medium text-ink">{item.name}</p>
                      <p className="mt-0.5 text-[11px] text-ink-soft">
                        {item.qty} × ₹{item.price}
                      </p>
                    </div>
                    <span className="text-[12px] font-semibold text-ink">
                      ₹{item.qty * item.price}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2 text-[12px]">
                <div className="flex justify-between text-ink-soft">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>Delivery</span>
                  <span className="text-chart-2">Free</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-[15px] font-semibold text-ink">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
              <div className="mt-5 flex gap-2 border-t border-border pt-4">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
                <p className="text-[11px] leading-relaxed text-ink-soft">
                  Secure checkout with genuine products and fast local delivery.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}
