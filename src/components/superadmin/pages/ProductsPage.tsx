import { Pencil, Plus } from "lucide-react";
import { PageHeading, Section, StatusBadge, Toolbar } from "./shared";

export function ProductsPage({
  products,
  query,
  setQuery,
  onToggle,
}: {
  products: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "active" | "pending" | "suspended";
  }>;
  query: string;
  setQuery: (value: string) => void;
  onToggle: (id: string) => void;
}) {
  const filtered = products.filter((item) =>
    `${item.name} ${item.category} ${item.id}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeading
        eyebrow="Catalogue"
        title="Products & categories"
        subtitle="Control catalogue visibility, pricing and stock signals."
        action={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[12px] font-medium text-ink-soft hover:border-brand hover:text-brand">
              <Pencil className="h-3.5 w-3.5" /> Categories
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
              <Plus className="h-3.5 w-3.5" /> Add product
            </button>
          </div>
        }
      />
      <Section title="Product catalogue" subtitle={`${products.length} products · 8 categories`}>
        <Toolbar
          query={query}
          setQuery={setQuery}
          placeholder="Search products, categories or IDs"
        />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wide text-ink-soft">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Price</th>
                <th className="pb-2 font-medium">Stock</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <p className="text-[12px] font-medium text-ink">{product.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-soft">{product.id}</p>
                  </td>
                  <td className="py-3 text-[12px] text-ink-soft">{product.category}</td>
                  <td className="py-3 text-[12px] font-medium text-ink">₹{product.price}</td>
                  <td
                    className={`py-3 text-[12px] ${product.stock < 10 ? "font-semibold text-destructive" : "text-ink"}`}
                  >
                    {product.stock}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onToggle(product.id)}
                      className="text-[11px] font-medium text-brand"
                    >
                      {product.status === "active" ? "Hide" : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
