import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock3,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
} from "lucide-react";
import * as React from "react";
import { CartProvider, useCart } from "@/components/site/CartProvider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getProduct } from "@/components/site/product-data";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { productId } = Route.useParams();
  const product = getProduct(productId);

  if (!product) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-page">
          <SiteHeader />
          <main className="mx-auto max-w-[1536px] px-4 py-14 text-center lg:px-8">
            <h1 className="text-[28px] font-semibold text-ink">Product not found</h1>
            <p className="mt-2 text-[13px] text-ink-soft">
              This product may no longer be available.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-brand"
            >
              <ArrowLeft className="h-4 w-4" /> Back to storefront
            </Link>
          </main>
          <SiteFooter />
        </div>
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-page">
        <SiteHeader />
        <main className="mx-auto max-w-[1536px] px-4 py-5 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brand hover:text-brand-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to storefront
          </Link>
          <ProductDetails product={product} />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  );
}

function ProductDetails({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [activeImage, setActiveImage] = React.useState(0);
  const [reviewRating, setReviewRating] = React.useState(0);
  const [reviewSubmitted, setReviewSubmitted] = React.useState(false);
  const savings = product.mrp - product.price;

  const addToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      addItem({
        name: product.name,
        pack: product.pack,
        price: product.price,
        mrp: product.mrp,
        img: product.img,
      });
    }
  };

  return (
    <>
      <section className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
          <div className="relative grid min-h-[300px] place-items-center rounded-lg bg-brand-soft/60 sm:min-h-[390px]">
            <span className="absolute left-4 top-4 rounded-full bg-chart-2/15 px-3 py-1 text-[11px] font-semibold text-chart-2">
              {product.off}
            </span>
            <button
              aria-label="Previous product image"
              onClick={() =>
                setActiveImage(
                  (image) => (image - 1 + product.images.length) % product.images.length,
                )
              }
              className="absolute left-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 text-ink shadow-soft hover:text-brand"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <img
              src={product.images[activeImage]}
              alt={`${product.name} image ${activeImage + 1}`}
              width={600}
              height={600}
              className="h-[220px] w-[220px] object-contain sm:h-[300px] sm:w-[300px]"
            />
            <button
              aria-label="Next product image"
              onClick={() => setActiveImage((image) => (image + 1) % product.images.length)}
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 text-ink shadow-soft hover:text-brand"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`View product image ${index + 1}`}
                aria-pressed={activeImage === index}
                onClick={() => setActiveImage(index)}
                className={`grid h-14 w-14 place-items-center rounded-md border bg-brand-soft/40 p-1.5 transition-colors sm:h-16 sm:w-16 ${activeImage === index ? "border-brand" : "border-border"}`}
              >
                <img src={image} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">
            {product.category}
          </p>
          <h1 className="mt-2 text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[28px]">
            {product.name}
          </h1>
          <p className="mt-2 text-[13px] text-ink-soft">{product.pack}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-chart-4/15 px-2 py-1 text-[12px] font-semibold text-ink">
              <Star className="h-3.5 w-3.5 fill-chart-4 text-chart-4" /> {product.rating}
            </span>
            <span className="text-[12px] text-ink-soft">Trusted customer rating</span>
          </div>
          <div className="mt-6 border-y border-border py-5">
            <div className="flex items-end gap-3">
              <span className="text-[25px] font-semibold tracking-tight text-ink">
                ₹{product.price}
              </span>
              <span className="pb-1 text-[14px] text-ink-soft line-through">₹{product.mrp}</span>
              <span className="pb-1 text-[12px] font-semibold text-chart-2">Save ₹{savings}</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-soft">Inclusive of all taxes</p>
          </div>
          <p className="mt-5 text-[14px] leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex h-11 items-center gap-4 rounded-lg border border-border px-3">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="text-ink-soft hover:text-brand"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-5 text-center text-[14px] font-semibold text-ink">
                {quantity}
              </span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
                className="text-ink-soft hover:text-brand"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={addToCart}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg gradient-brand px-5 text-[13px] font-semibold text-brand-foreground shadow-pill sm:flex-none"
            >
              <ShoppingCart className="h-4 w-4" /> Add to cart
            </button>
          </div>

          <div className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
            <div className="flex gap-2.5">
              <Clock3 className="h-4 w-4 shrink-0 text-brand" />
              <p className="text-[12px] leading-snug text-ink">
                <strong className="font-semibold">Delivery in 22 minutes</strong>
                <br />
                <span className="text-ink-soft">From a nearby pharmacy</span>
              </p>
            </div>
            <div className="flex gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
              <p className="text-[12px] leading-snug text-ink">
                <strong className="font-semibold">100% genuine</strong>
                <br />
                <span className="text-ink-soft">Quality checked products</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
        <h2 className="text-[17px] font-semibold tracking-tight text-ink">Product information</h2>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-ink-soft">
          {product.description} Review the product details below and follow the guidance on the
          packaging or from your healthcare professional.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {product.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-3 text-[12px] font-medium text-ink"
            >
              <Check className="h-4 w-4 shrink-0 text-chart-2" />
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">Customer reviews</h2>
            <p className="mt-1 text-[12px] text-ink-soft">
              Real experiences from MediSwift customers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[24px] font-semibold text-ink">{product.rating}</span>
            <div>
              <div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-chart-4 text-chart-4" />
                ))}
              </div>
              <p className="mt-1 text-[10px] text-ink-soft">Based on verified orders</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)]">
          <div className="space-y-4">
            {[
              ["Priya S.", "Good quality and arrived quickly. The packaging was neat.", 5],
              ["Rahul M.", "Just what I needed. Ordering was simple and delivery was fast.", 4],
            ].map(([name, comment, rating]) => (
              <article key={name} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[12px] font-semibold text-ink">{name}</p>
                  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`h-3 w-3 ${index < rating ? "fill-chart-4 text-chart-4" : "text-border"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">{comment}</p>
              </article>
            ))}
          </div>

          <form
            className="rounded-lg border border-border bg-brand-soft/40 p-4"
            onSubmit={(event) => {
              event.preventDefault();
              setReviewSubmitted(true);
            }}
          >
            <h3 className="text-[13px] font-semibold text-ink">Write a review</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[11px] text-ink-soft">Your rating</span>
              <div className="flex gap-1" role="group" aria-label="Choose a rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    onClick={() => setReviewRating(star)}
                    className="p-0.5"
                  >
                    <Star
                      className={`h-4 w-4 ${star <= reviewRating ? "fill-chart-4 text-chart-4" : "text-ink-soft"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              required
              aria-label="Your review"
              placeholder="Share your experience"
              className="mt-3 min-h-20 w-full resize-none rounded-md border border-border bg-card px-3 py-2 text-[12px] text-ink outline-none placeholder:text-ink-soft/70 focus:border-brand"
            />
            <button
              type="submit"
              disabled={reviewRating === 0}
              className="mt-3 w-full rounded-md gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit review
            </button>
            {reviewSubmitted && (
              <p className="mt-2 text-center text-[11px] text-chart-2">
                Thanks for sharing your experience.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
