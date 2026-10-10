import * as React from "react";
import { Pencil, Plus, Tags, Trash2 } from "lucide-react";
import { PageHeading, Section, Toolbar } from "./shared";

type CategoryItem = {
  id?: number | string;
  name?: string;
  image?: string | null;
  [key: string]: unknown;
};

function getCategoryImageUrl(image: string | null | undefined, baseUrl: string) {
  if (!image) return null;
  if (/^https?:\/\//i.test(image)) return image;

  const normalizedImage = image.replace(/^\/+/, "");
  const origin = baseUrl.replace(/\/api$/, "");

  if (normalizedImage.startsWith("storage/")) {
    return `${origin}/${normalizedImage}`;
  }

  return `${origin}/storage/${normalizedImage}`;
}

export function CategoriesPage({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) {
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [editingCategory, setEditingCategory] = React.useState<CategoryItem | null>(null);
  const [updateName, setUpdateName] = React.useState("");
  const [updateImage, setUpdateImage] = React.useState<File | null>(null);
  const [updateError, setUpdateError] = React.useState("");
  const [updating, setUpdating] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [deleteError, setDeleteError] = React.useState("");

  const baseUrl = import.meta.env["VITE_BASE_URL"]?.replace(/\/$/, "") ?? "";

  const loadCategories = React.useCallback(async () => {
    try {
      if (!baseUrl) {
        throw new Error("The API URL is not configured.");
      }

      const response = await fetch(`${baseUrl}/superadmin/category/list`);
      const result = (await response.json().catch(() => null)) as
        | { categories?: CategoryItem[]; message?: string }
        | CategoryItem[]
        | null;

      if (!response.ok) {
        throw new Error(
          result && typeof result === "object" && "message" in result && typeof result.message === "string"
            ? result.message
            : "Unable to load categories.",
        );
      }

      const items = Array.isArray(result)
        ? result
        : Array.isArray(result?.categories)
          ? result.categories
          : [];

      setCategories(items);
      setError("");
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load categories right now.",
      );
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  React.useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const filtered = categories.filter((category) =>
    String(category.name ?? "").toLowerCase().includes(query.toLowerCase()),
  );

  const handleUpdateCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingCategory?.id) {
      return;
    }

    try {
      setUpdating(true);
      setUpdateError("");

      const payload = new FormData();
      const nextName = updateName.trim();
      if (nextName) payload.append("name", nextName);
      if (updateImage) payload.append("image", updateImage);

      const response = await fetch(`${baseUrl}/superadmin/category/update/${editingCategory.id}`, {
        method: "POST",
        body: payload,
      });

      const result = (await response.json().catch(() => null)) as
        | { category?: CategoryItem; message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result && typeof result === "object" && "message" in result && typeof result.message === "string"
            ? result.message
            : "Unable to update category.",
        );
      }

      const updatedCategory = result?.category ?? {
        ...editingCategory,
        ...(nextName ? { name: nextName } : {}),
      };

      const handleDeleteCategory = async (category: CategoryItem) => {
        if (!category.id || !window.confirm(`Delete "${category.name ?? "this category"}"?`)) {
          return;
        }

        try {
          setDeletingId(String(category.id));
          setDeleteError("");

          const response = await fetch(`${baseUrl}/superadmin/category/delete/${category.id}`, {
            method: "DELETE",
          });
          const result = (await response.json().catch(() => null)) as { message?: string } | null;

          if (!response.ok) {
            throw new Error(
              result && typeof result.message === "string"
                ? result.message
                : "Unable to delete category.",
            );
          }

          setCategories((items) => items.filter((item) => String(item.id) !== String(category.id)));
        } catch (deleteError) {
          setDeleteError(
            deleteError instanceof Error ? deleteError.message : "Unable to delete category.",
          );
        } finally {
          setDeletingId(null);
        }
      };

      setCategories((items) =>
        items.map((item) =>
          String(item.id) === String(editingCategory.id) ? { ...item, ...updatedCategory } : item,
        ),
      );
      setEditingCategory(null);
      setUpdateName("");
      setUpdateImage(null);
    } catch (updateError) {
      setUpdateError(
        updateError instanceof Error ? updateError.message : "Unable to update category.",
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <PageHeading
        eyebrow="Catalog"
        title="Categories"
        subtitle="Organize and maintain the product taxonomy."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg gradient-brand px-3 py-2 text-[12px] font-medium text-brand-foreground shadow-pill">
            <Plus className="h-3.5 w-3.5" /> Add category
          </button>
        }
      />
      <Section title="Category overview" subtitle={`${categories.length} categories in the marketplace`}>
        <Toolbar query={query} setQuery={setQuery} placeholder="Search categories" />

        {loading && <p className="mt-4 text-[12px] text-ink-soft">Loading categories...</p>}

        {!loading && error && <p className="mt-4 text-[12px] text-destructive">{error}</p>}

        {deleteError && <p className="mt-4 text-[12px] text-destructive">{deleteError}</p>}

        {!loading && !error && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((category) => {
                const imageUrl = getCategoryImageUrl(category.image ?? null, baseUrl);

                return (
                  <article
                    key={String(category.id ?? category.name ?? "category")}
                    className="rounded-lg border border-border p-4"
                  >
                    <div className="mb-3 overflow-hidden rounded-md border border-border bg-gray-50">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={category.name ?? "Category image"}
                          className="h-24 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-24 w-full items-center justify-center bg-brand-soft text-brand">
                          <Tags className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-[13px] font-semibold text-ink">
                          {category.name ?? "Unnamed category"}
                        </h3>
                        <p className="text-[11px] text-ink-soft">
                          {category.id ? `ID: ${category.id}` : "Category"}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(category);
                            setUpdateName(String(category.name ?? ""));
                            setUpdateImage(null);
                            setUpdateError("");
                          }}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] font-medium text-ink-soft hover:border-brand hover:text-brand"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${category.name ?? "category"}`}
                          disabled={deletingId === String(category.id)}
                          onClick={() => void handleDeleteCategory(category)}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] font-medium text-destructive hover:border-destructive disabled:opacity-60"
                        >
                          <Trash2 className="h-3 w-3" />
                          {deletingId === String(category.id) ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="text-[12px] text-ink-soft">No categories match your search.</p>
            )}
          </div>
        )}
      </Section>

      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-xl bg-card p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand">Update</p>
                <h3 className="mt-1 text-[18px] font-semibold text-ink">Edit category</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingCategory(null);
                  setUpdateName("");
                  setUpdateImage(null);
                  setUpdateError("");
                }}
                className="text-[12px] text-ink-soft hover:text-ink"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-ink">Category name</label>
                <input
                  value={updateName}
                  onChange={(event) => setUpdateName(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[12px] text-ink outline-none focus:border-brand"
                  placeholder="Category name"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-ink">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setUpdateImage(event.target.files?.[0] ?? null)}
                  className="mt-1.5 block w-full text-[12px] text-ink file:mr-3 file:rounded-md file:border-0 file:bg-brand-soft file:px-3 file:py-2 file:text-[11px] file:font-medium file:text-brand"
                />
              </div>

              {updateError && <p className="text-[11px] text-destructive">{updateError}</p>}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory(null);
                    setUpdateName("");
                    setUpdateImage(null);
                    setUpdateError("");
                  }}
                  className="rounded-lg border border-border px-3 py-2 text-[12px] font-medium text-ink-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="rounded-lg bg-brand px-3 py-2 text-[12px] font-medium text-brand-foreground disabled:opacity-60"
                >
                  {updating ? "Updating..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
