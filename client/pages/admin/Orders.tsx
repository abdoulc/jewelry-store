import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/data/products";

const STORAGE_KEY = "admin-orders-v1";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  meta?: Record<string, any>;
};

type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: { name: string; email: string; address?: string };
};

function sampleOrders(): Order[] {
  const p1 = PRODUCTS[0];
  const p2 = PRODUCTS[1] ?? PRODUCTS[0];
  return [
    {
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      items: [
        { id: p1.id, name: p1.name, price: p1.price, qty: 1, image: p1.image },
        { id: p2.id, name: p2.name, price: p2.price, qty: 2, image: p2.image },
      ],
      customer: {
        name: "Ava Smith",
        email: "ava@example.com",
        address: "123 Rue de Paris",
      },
    },
    {
      id: `ord-${Date.now() - 1000000}`,
      createdAt: new Date(Date.now() - 1000000).toISOString(),
      status: "shipped",
      items: [
        { id: p2.id, name: p2.name, price: p2.price, qty: 1, image: p2.image },
      ],
      customer: {
        name: "Liam Johnson",
        email: "liam@example.com",
        address: "45 Avenue",
      },
    },
  ];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return sampleOrders();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    const byStatus =
      filter === "all"
        ? orders.slice()
        : orders.filter((o) => o.status === filter);
    const q = (search || "").trim().toLowerCase();
    if (!q) return byStatus;
    return byStatus.filter((o) => {
      if (o.id.toLowerCase().includes(q)) return true;
      if (o.customer?.name?.toLowerCase().includes(q)) return true;
      if (o.customer?.email?.toLowerCase().includes(q)) return true;
      if ((o.items || []).some((it: any) => it.name?.toLowerCase().includes(q)))
        return true;
      return false;
    });
  }, [orders, filter, search]);

  const totals = useMemo(
    () => ({
      count: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
    }),
    [orders],
  );

  const changeStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const remove = (id: string) => {
    if (!confirm("Delete order?")) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
    if (selected === id) setSelected(null);
  };

  const createFake = () => {
    const p = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const id = `ord-${Date.now()}`;
    const ord: Order = {
      id,
      createdAt: new Date().toISOString(),
      status: "pending",
      items: [
        { id: p.id, name: p.name, price: p.price, qty: 1, image: p.image },
      ],
      customer: { name: "New Customer", email: "new@example.com", address: "" },
    };
    setOrders((s) => [ord, ...s]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-brandSerif text-3xl">Orders</h2>
          <p className="text-foreground/70 mt-2">Manage customer orders.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={createFake}
            className="inline-flex h-10 items-center rounded-md border px-4 text-sm"
          >
            Create fake order
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3">
          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm text-foreground/70">Summary</h3>
            <div className="mt-3 text-2xl font-medium">
              {totals.count} orders
            </div>
            <div className="mt-3 text-sm text-foreground/70">
              <div>Pending: {totals.pending}</div>
              <div>Processing: {totals.processing}</div>
              <div>Shipped: {totals.shipped}</div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h4 className="text-sm text-foreground/70 mb-2">Filter</h4>
            <select
              className="w-full rounded-md border h-10 px-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2 grid gap-4">
          <div className="rounded-xl border bg-card p-4">
            <div className="mb-4">
              <input
                placeholder="Search orders by id, customer, email or item"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border px-3 h-10"
              />
            </div>
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-foreground/70">
                  No orders found
                </div>
              ) : (
                filtered.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-start justify-between gap-4 border-b pb-3 mb-3"
                  >
                    <div>
                      <div className="font-medium">
                        {o.customer.name} —{" "}
                        <span className="text-sm text-foreground/70">
                          {o.customer.email}
                        </span>
                      </div>
                      <div className="text-sm text-foreground/70">
                        {new Date(o.createdAt).toLocaleString()}
                      </div>
                      <div className="mt-2 text-sm">
                        {o.items.length}{" "}
                        {o.items.length === 1 ? "item" : "items"} — $
                        {o.items
                          .reduce((a, b) => a + b.price * b.qty, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`rounded-full px-3 py-1 text-xs ${o.status === "pending" ? "bg-yellow-200" : o.status === "shipped" ? "bg-green-200" : "bg-slate-200"}`}
                      >
                        {o.status}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelected(o.id)}
                          className="text-sm rounded-md border px-3 py-1"
                        >
                          View
                        </button>
                        <button
                          onClick={() => changeStatus(o.id, "processing")}
                          className="text-sm rounded-md border px-3 py-1"
                        >
                          Mark processing
                        </button>
                        <button
                          onClick={() => changeStatus(o.id, "shipped")}
                          className="text-sm rounded-md border px-3 py-1"
                        >
                          Mark shipped
                        </button>
                        <button
                          onClick={() => remove(o.id)}
                          className="text-sm rounded-md border px-3 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selected ? (
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Order {selected}</h4>
                <button
                  onClick={() => setSelected(null)}
                  className="text-sm rounded-md border px-3 py-1"
                >
                  Close
                </button>
              </div>
              <div className="mt-3">
                {(() => {
                  const o = orders.find((x) => x.id === selected);
                  if (!o) return <div>Order not found</div>;
                  return (
                    <div>
                      <div className="text-sm text-foreground/70">
                        {new Date(o.createdAt).toLocaleString()}
                      </div>
                      <div className="mt-3">
                        <h5 className="font-medium">Customer</h5>
                        <div className="text-sm text-foreground/70">
                          {o.customer.name}
                        </div>
                        <div className="text-sm text-foreground/70">
                          {o.customer.email}
                        </div>
                        <div className="text-sm text-foreground/70">
                          {o.customer.address}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-medium">Items</h5>
                        <div className="mt-2 space-y-2">
                          {o.items.map((it) => (
                            <div
                              key={it.id}
                              className="flex items-center gap-3"
                            >
                              <img
                                src={it.image ?? ""}
                                alt={it.name}
                                className="h-12 w-12 object-cover rounded-sm border"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{it.name}</div>
                                <div className="text-sm text-foreground/70">
                                  {it.qty} × ${it.price.toFixed(2)}
                                </div>
                              </div>
                              <div className="font-medium">
                                ${(it.qty * it.price).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 border-t pt-3 flex items-center justify-between">
                        <div className="text-sm text-foreground/70">Status</div>
                        <div className="flex items-center gap-2">
                          <select
                            value={o.status}
                            onChange={(e) =>
                              changeStatus(o.id, e.target.value as OrderStatus)
                            }
                            className="rounded-md border h-9 px-2"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <div className="font-medium">
                            $
                            {o.items
                              .reduce((a, b) => a + b.price * b.qty, 0)
                              .toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
