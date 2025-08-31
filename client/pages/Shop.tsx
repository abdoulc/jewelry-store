import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS, type ProductWithMeta } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Most Popular" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const category = params.get("category") ?? "all";
  const sort = (params.get("sort") as SortId) ?? "featured";
  const min = Number(params.get("min") ?? "");
  const max = Number(params.get("max") ?? "");

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (q) next.set("q", q);
      else next.delete("q");
      setParams(next, { replace: true });
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  const filtered: ProductWithMeta[] = useMemo(() => {
    let list = PRODUCTS.slice();
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (!Number.isNaN(min) && min > 0)
      list = list.filter((p) => p.price >= min);
    if (!Number.isNaN(max) && max > 0)
      list = list.filter((p) => p.price <= max);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s));
    }
    switch (sort) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "popular":
        list.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }
    return list;
  }, [category, sort, q, min, max]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-brandSerif text-4xl md:text-5xl">Shop</h1>
          <p className="mt-2 text-foreground/70">
            Browse all pieces with filters, sorting, and quick add.
          </p>
        </div>
        <div className="w-full grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort</label>
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="h-10 rounded-md border bg-background px-3 text-sm w-full md:w-auto"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Min</label>
            <input
              type="number"
              className="h-10 w-full md:w-24 rounded-md border px-2 text-sm"
              value={Number.isNaN(min) ? "" : min}
              onChange={(e) => setParam("min", e.target.value)}
              placeholder="0"
            />
            <label className="text-sm">Max</label>
            <input
              type="number"
              className="h-10 w-full md:w-24 rounded-md border px-2 text-sm"
              value={Number.isNaN(max) ? "" : max}
              onChange={(e) => setParam("max", e.target.value)}
              placeholder="3000"
            />
          </div>
          <input
            placeholder="Search products"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm w-full md:min-w-[220px]"
          />
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setParam("category", "all")}
          className={cn(
            "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm flex-1 text-center sm:flex-none",
            category === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "hover:bg-accent",
          )}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setParam("category", c.id)}
            className={cn(
              "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm flex-1 text-center sm:flex-none",
              category === c.id
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-accent",
            )}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-foreground/70 mb-4">
        <span>
          Showing {filtered.length} {filtered.length === 1 ? "item" : "items"}
          {category !== "all"
            ? ` in ${CATEGORIES.find((c) => c.id === category)?.title}`
            : ""}
        </span>
        <button
          className="underline hover:no-underline"
          onClick={() => setParams(new URLSearchParams())}
        >
          Reset filters
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
