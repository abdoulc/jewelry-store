import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/40">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium"
            >
              ← Back to store
            </button>
            <h1 className="font-brandSerif text-xl">Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setOpen((s) => !s)}>
              Menu
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8 grid md:grid-cols-6 gap-8">
        <aside className="md:col-span-1 bg-card/30 rounded-xl p-4 border">
          <nav className="flex flex-col gap-2">
            <Link
              to="/admin"
              className="block rounded-md px-3 py-2 hover:bg-accent"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="block rounded-md px-3 py-2 hover:bg-accent"
            >
              Products
            </Link>
            <Link
              to="/admin/orders"
              className="block rounded-md px-3 py-2 hover:bg-accent"
            >
              Orders
            </Link>
            <Link
              to="/admin/customers"
              className="block rounded-md px-3 py-2 hover:bg-accent"
            >
              Customers
            </Link>
            <Link
              to="/admin/payments"
              className="block rounded-md px-3 py-2 hover:bg-accent"
            >
              Payments
            </Link>
          </nav>
        </aside>
        <main className="md:col-span-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
