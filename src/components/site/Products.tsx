import * as React from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Plus, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { useCart } from "@/components/site/CartProvider";
import { products } from "@/components/site/product-data";

export function ProductsSection() {
  const { addItem } = useCart();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!embla || paused) return;
    const id = window.setInterval(() => embla.scrollNext(), 2000);
    return () => window.clearInterval(id);
  }, [embla, paused]);

  return (
    <section className="mx-auto mt-4 max-w-[1536px] px-4 lg:px-8">
      <div className="rounded-xl bg-card px-4 py-5 shadow-card sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-[20px] font-semibold tracking-tight text-ink">Best Sellers</h2>
            <p className="mt-0.5 text-[12px] text-ink-soft">Most loved products by our customers</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              aria-label="Previous products"
              onClick={() => embla?.scrollPrev()}
              className="hidden h-8 w-8 place-items-center rounded-full border border-border text-ink sm:grid"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next products"
              onClick={() => embla?.scrollNext()}
              className="hidden h-8 w-8 place-items-center rounded-full border border-border text-ink sm:grid"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[12px] font-medium text-brand">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div
          className="mt-4 overflow-hidden"
          ref={emblaRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex gap-3">
            {products.map((p) => (
              <article
                key={p.name}
                className="group flex min-w-0 shrink-0 grow-0 basis-[calc(50%-6px)] flex-col overflow-hidden rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-card sm:basis-[calc(33.333%-8px)] lg:basis-[calc(20%-10px)]"
              >
                <div className="relative grid h-[110px] place-items-center rounded-md bg-brand-soft/60">
                  <Link to="/products/$productId" params={{ productId: p.id }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="h-[92px] w-[92px] object-contain transition-transform group-hover:scale-105"
                    />
                  </Link>
                  <span className="absolute left-2 top-2 rounded-full bg-chart-2/15 px-2 py-0.5 text-[10px] font-medium text-chart-2">
                    {p.off}
                  </span>
                </div>

                <h3 className="mt-3 line-clamp-2 text-[13px] font-medium leading-snug text-ink">
                  <Link
                    to="/products/$productId"
                    params={{ productId: p.id }}
                    className="hover:text-brand"
                  >
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-1 text-[11px] text-ink-soft">{p.pack}</p>

                <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-ink-soft">
                  <Star className="h-3 w-3 fill-chart-4 text-chart-4" />
                  {p.rating}
                </span>

                <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                  <div className="leading-tight">
                    <p className="text-[14px] font-semibold text-ink">₹{p.price}</p>
                    <p className="text-[11px] text-ink-soft line-through">₹{p.mrp}</p>
                  </div>
                  <button
                    aria-label={`Add ${p.name} to cart`}
                    onClick={() =>
                      addItem({
                        name: p.name,
                        pack: p.pack,
                        price: p.price,
                        mrp: p.mrp,
                        img: p.img,
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-lg gradient-brand px-2.5 py-1.5 text-[11px] font-medium text-brand-foreground shadow-pill"
                  >
                    <Plus className="h-3 w-3" /> Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
