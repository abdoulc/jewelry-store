import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/products";

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-brandSerif text-3xl">Dashboard</h2>
          <p className="text-foreground/70 mt-2">
            Overview and quick actions for your store.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="inline-flex h-10 items-center rounded-md border px-4 text-sm"
          >
            Manage products
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-sm text-foreground/70">Total products</h3>
          <div className="mt-3 text-2xl font-medium">{PRODUCTS.length}</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-sm text-foreground/70">Categories</h3>
          <div className="mt-3 text-2xl font-medium">
            {new Set(PRODUCTS.map((p) => p.category)).size}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-sm text-foreground/70">Top product</h3>
          <div className="mt-3 text-2xl font-medium">
            {PRODUCTS[0]?.name ?? "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
