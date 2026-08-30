import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SearchSection } from "@/components/site/SearchSection";
import { Hero } from "@/components/site/Hero";
import { CategoryCircles, UspBar, ShopByCategory } from "@/components/site/Sections";
import { ActivePharmacies } from "@/components/site/Pharmacies";
import { ProductsSection } from "@/components/site/Products";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CartProvider } from "@/components/site/CartProvider";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MediSwift — Medicines & Healthcare Delivered in 30 Minutes" },
      {
        name: "description",
        content:
          "Shop medicines, healthcare devices, personal care and wellness products on MediSwift. Flat 20% off on all medicines with code HEALTH20.",
      },
      { property: "og:title", content: "MediSwift — Healthcare, Now Swift" },
      {
        property: "og:description",
        content: "All your healthcare needs, delivered to your doorstep in minutes.",
      },
    ],
  }),
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-page">
        <SiteHeader />
        <main className="pt-1">
          <SearchSection />
          <Hero />
          <CategoryCircles />
          <ActivePharmacies />
          <UspBar />
          <ShopByCategory />
          <ProductsSection />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  );
}
