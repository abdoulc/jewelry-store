import { useEffect, useMemo, useState } from "react";
import {
  PRODUCTS as INITIAL_PRODUCTS,
  type ProductWithMeta,
} from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { Link } from "react-router-dom";

const STORAGE_KEY = "admin-products-v1";
const CAT_STORAGE = "admin-categories-v1";

function serializeImages(v: string[]) {
  return v.join(",");
}
function parseImages(v: string) {
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
function parseCsv(v: string) {
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function slugify(val: string) {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductWithMeta[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_PRODUCTS.slice();
  });

  const [categories, setCategories] = useState(() => {
    try {
      const raw = localStorage.getItem(CAT_STORAGE);
      if (raw) return JSON.parse(raw);
    } catch {}
    return CATEGORIES.slice();
  });
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CAT_STORAGE, JSON.stringify(categories));
    } catch {}
  }, [categories]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<ProductWithMeta>>({});

  useEffect(() => {
    if (editingId) {
      const p = products.find((x) => x.id === editingId);
      if (p) setForm({ ...p });
    } else {
      setForm({});
    }
  }, [editingId]);

  const startNew = () => {
    const id = `prod-${Date.now()}`;
    const newP: ProductWithMeta = {
      id,
      name: "New product",
      price: 0,
      image: "",
      images: [],
      category: categories[0]?.id ?? CATEGORIES[0]?.id ?? "",
      createdAt: new Date().toISOString().slice(0, 10),
      popularity: 0,
    } as ProductWithMeta;
    setProducts((s) => [newP, ...s]);
    setEditingId(id);
  };

  const save = () => {
    if (!form?.id) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === form.id
          ? {
              ...p,
              name: form.name ?? p.name,
              price: Number(form.price ?? p.price),
              image: form.image ?? p.image,
              images: (form.images as any) ?? p.images,
              category: form.category ?? p.category,
              popularity: Number(form.popularity ?? p.popularity ?? 0),
            }
          : p,
      ),
    );
    setEditingId(null);
  };

  const remove = (id: string) => {
    if (!confirm("Delete product? This cannot be undone.")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const setField = (k: keyof ProductWithMeta, v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-brandSerif text-3xl">Products</h2>
          <p className="text-foreground/70 mt-2">
            Create, edit, and manage your products.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={startNew}
            className="inline-flex h-10 items-center rounded-md border px-4 text-sm"
          >
            New product
          </button>
          <Link
            to="/admin"
            className="inline-flex h-10 items-center rounded-md border px-4 text-sm"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-14 w-14 object-cover rounded-md border"
                />
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-foreground/70">
                    {categories.find((c) => c.id === p.category)?.title ??
                      p.category}{" "}
                    • ${p.price}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingId(p.id)}
                  className="text-sm rounded-md border px-3 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="text-sm rounded-md border px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === p.id && (
              <div className="mt-4 grid gap-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm">Name</label>
                    <input
                      className="w-full rounded-md border px-2 h-10"
                      value={form.name ?? ""}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm">Price</label>
                    <input
                      type="number"
                      className="w-full rounded-md border px-2 h-10"
                      value={String(form.price ?? 0)}
                      onChange={(e) =>
                        setField("price", Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm">Category</label>
                    <div className="flex gap-2">
                      <select
                        className="flex-1 rounded-md border h-10 px-2"
                        value={form.category ?? ""}
                        onChange={(e) => setField("category", e.target.value)}
                      >
                        {categories.map((c: any) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                      <input
                        id="new-cat"
                        placeholder="New category"
                        className="w-44 rounded-md border px-2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(
                            "new-cat",
                          ) as HTMLInputElement | null;
                          if (!el) return;
                          const v = el.value.trim();
                          if (!v) return;
                          const id = slugify(v);
                          if (categories.some((c: any) => c.id === id)) {
                            // already exists
                            setField("category", id);
                            el.value = "";
                            return;
                          }
                          const next = [
                            ...categories,
                            { id, title: v, image: "" },
                          ];
                          setCategories(next);
                          setField("category", id);
                          el.value = "";
                        }}
                        className="inline-flex items-center rounded-md border px-3"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Stock</label>
                    <input
                      type="number"
                      className="w-full rounded-md border px-2 h-10"
                      value={String((form as any).stock ?? "")}
                      onChange={(e) =>
                        setField("stock", Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm">Main image URL</label>
                  <input
                    className="w-full rounded-md border px-2 h-10"
                    value={form.image ?? ""}
                    onChange={(e) => setField("image", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm">Images (comma separated)</label>
                  <input
                    className="w-full rounded-md border px-2 h-10"
                    value={
                      Array.isArray(form.images)
                        ? form.images.join(", ")
                        : (form.images ?? "").toString()
                    }
                    onChange={(e) =>
                      setField("images", parseImages(e.target.value))
                    }
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm">Colors (comma separated)</label>
                    <input
                      className="w-full rounded-md border px-2 h-10"
                      value={
                        Array.isArray((form as any).colors)
                          ? (form as any).colors.join(", ")
                          : ((form as any).colors ?? "").toString()
                      }
                      onChange={(e) =>
                        setField("colors", parseCsv(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm">Sizes (comma separated)</label>
                    <input
                      className="w-full rounded-md border px-2 h-10"
                      value={
                        Array.isArray((form as any).sizes)
                          ? (form as any).sizes.join(", ")
                          : ((form as any).sizes ?? "").toString()
                      }
                      onChange={(e) =>
                        setField("sizes", parseCsv(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={save}
                    className="inline-flex h-10 items-center rounded-md border px-4"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="inline-flex h-10 items-center rounded-md px-4"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
