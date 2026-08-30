import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ProductsSection } from "@/components/site/Products";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CartProvider } from "@/components/site/CartProvider";

const categoryDetails: Record<string, { title: string; description: string }> = {
  medicines: {
    title: "Medicines",
    description: "Everyday medicines and prescription essentials from trusted pharmacies.",
  },
  "healthcare-devices": {
    title: "Healthcare Devices",
    description: "Reliable monitors, thermometers and devices to help you stay informed.",
  },
  "personal-care": {
    title: "Personal Care",
    description: "Skin, hair and hygiene essentials for comfortable daily care.",
  },
  "baby-care": {
    title: "Baby Care",
    description: "Gentle, dependable care products for your little ones.",
  },
  "health-drinks": {
    title: "Health Drinks",
    description: "Nourishing drinks and nutrition essentials for the whole family.",
  },
  wellness: {
    title: "Wellness",
    description: "Vitamins, supplements and daily essentials for better wellbeing.",
  },
  ayurveda: {
    title: "Ayurveda",
    description: "Time-tested Ayurvedic care made easy to discover and order.",
  },
  "elderly-care": {
    title: "Elderly Care",
    description: "Thoughtful health and comfort essentials for older loved ones.",
  },
};

export const Route = createFileRoute("/category/$category")({
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const details = categoryDetails[category] ?? {
    title: "Healthcare",
    description: "Explore trusted healthcare products delivered to your doorstep.",
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-page">
        <SiteHeader />
        <main className="mx-auto max-w-[1536px] px-4 py-5 lg:px-8">
          <section className="rounded-xl bg-card px-5 py-6 shadow-card sm:px-8 sm:py-8">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brand hover:text-brand-dark"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to storefront
            </Link>
            <div className="mt-6 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">
                Category
              </p>
              <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-ink sm:text-[38px]">
                {details.title}
              </h1>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-soft">
                {details.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-brand">
                Fast delivery from nearby pharmacies <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </section>
          <ProductsSection />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  );
}
