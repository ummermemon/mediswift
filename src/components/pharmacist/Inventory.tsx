import * as React from "react";
import { Pencil, Plus, Search } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { initialInventory } from "./pharmacist-data";
import { stockTone } from "./pharmacist-utils";
import type { InventoryRow } from "./pharmacist-types";

const emptyMedicine: InventoryRow = {
  name: "",
  brand: "",
  batch: "",
  stock: 0,
  price: 0,
  expiry: "",
  rx: false,
};

export function Inventory() {
  const [rows, setRows] = React.useState(initialInventory);
  const [query, setQuery] = React.useState("");
  const [editing, setEditing] = React.useState<InventoryRow | null>(null);
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<InventoryRow>(emptyMedicine);
  const filtered = rows.filter((row) =>
    `${row.name} ${row.brand}`.toLowerCase().includes(query.toLowerCase()),
  );
  const adjust = (name: string, delta: number) =>
    setRows((prev) =>
      prev.map((row) =>
        row.name === name ? { ...row, stock: Math.max(0, row.stock + delta) } : row,
      ),
    );
  const openEditor = (row?: InventoryRow) => {
    setEditing(row ?? null);
    setDraft(row ?? emptyMedicine);
    setEditorOpen(true);
  };
  const saveMedicine = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.name.trim() || !draft.brand.trim()) return;
    setRows((prev) =>
      editing ? prev.map((row) => (row.name === editing.name ? draft : row)) : [draft, ...prev],
    );
    setEditing(null);
    setEditorOpen(false);
  };

  return (
    <SectionCard
      title="Medicine Inventory"
      subtitle={`${rows.length} SKUs · ${rows.filter((row) => row.stock <= 20).length} need attention`}
      action={
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-ink-soft" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search medicine"
              className="w-[150px] bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-soft/70"
            />
          </div>
          <button
            onClick={() => openEditor()}
            className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill"
          >
            <Plus className="h-3.5 w-3.5" /> Add medicine
          </button>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-ink-soft">
              {["Medicine", "Batch", "Expiry", "Price", "Stock", "Status", "Action"].map(
                (heading) => (
                  <th key={heading} className="pb-2 pr-3 font-medium">
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const tone = stockTone(row.stock);
              return (
                <tr key={row.name} className="border-t border-border">
                  <td className="py-3 pr-3">
                    <p className="text-[12.5px] font-medium text-ink">{row.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-soft">
                      {row.brand}{" "}
                      {row.rx && (
                        <span className="ml-1 rounded bg-brand-soft px-1.5 py-0.5 text-[10px] font-medium text-brand">
                          Rx
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="py-3 pr-3 text-[12px] text-ink-soft">{row.batch}</td>
                  <td className="py-3 pr-3 text-[12px] text-ink-soft">{row.expiry}</td>
                  <td className="py-3 pr-3 text-[12px] text-ink">₹{row.price}</td>
                  <td className="py-3 pr-3">
                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-border px-1.5 py-1">
                      <button
                        aria-label={`Decrease stock of ${row.name}`}
                        onClick={() => adjust(row.name, -1)}
                        className="grid h-5 w-5 place-items-center rounded text-ink-soft hover:bg-brand-soft hover:text-brand"
                      >
                        −
                      </button>
                      <span className="min-w-[28px] text-center text-[12px] font-medium text-ink">
                        {row.stock}
                      </span>
                      <button
                        aria-label={`Increase stock of ${row.name}`}
                        onClick={() => adjust(row.name, 1)}
                        className="grid h-5 w-5 place-items-center rounded text-ink-soft hover:bg-brand-soft hover:text-brand"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${tone.cls}`}
                    >
                      {tone.label}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => openEditor(row)}
                      className="inline-flex items-center gap-1 text-[12px] font-medium text-brand"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[12px] text-ink-soft">
                  No medicines match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editorOpen && (
        <div className="mt-4 rounded-lg border border-brand/20 bg-brand-soft/40 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-semibold text-ink">
                {editing ? "Edit medicine" : "Add medicine"}
              </h3>
              <p className="text-[11px] text-ink-soft">Keep catalogue and stock details current.</p>
            </div>
            <button
              type="button"
              onClick={() => setEditorOpen(false)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-ink-soft"
            >
              Cancel
            </button>
          </div>
          <form onSubmit={saveMedicine} className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {(["name", "brand", "batch", "expiry"] as const).map((field) => (
              <label key={field} className="text-[11px] text-ink-soft">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <input
                  required
                  value={draft[field]}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, [field]: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-[12px] text-ink outline-none focus:border-brand"
                />
              </label>
            ))}
            <label className="text-[11px] text-ink-soft">
              Stock
              <input
                type="number"
                min="0"
                value={draft.stock}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, stock: Number(event.target.value) }))
                }
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-[12px] text-ink outline-none focus:border-brand"
              />
            </label>
            <label className="text-[11px] text-ink-soft">
              Price (₹)
              <input
                type="number"
                min="0"
                value={draft.price}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, price: Number(event.target.value) }))
                }
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-[12px] text-ink outline-none focus:border-brand"
              />
            </label>
            <label className="flex items-end gap-2 pb-2 text-[11px] text-ink-soft">
              <input
                type="checkbox"
                checked={draft.rx}
                onChange={(event) => setDraft((prev) => ({ ...prev, rx: event.target.checked }))}
                className="h-3.5 w-3.5 accent-[var(--brand)]"
              />
              Prescription required
            </label>
            <button className="self-end rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
              Save medicine
            </button>
          </form>
        </div>
      )}
    </SectionCard>
  );
}
