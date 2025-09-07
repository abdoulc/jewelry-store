import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/products";

const ORDERS_KEY = "admin-orders-v1";
const CUST_KEY = "admin-customers-v1";

type Customer = {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
};

type Order = any;

function sampleCustomersFromOrders(orders: Order[]): Customer[] {
  const map = new Map<string, Customer>();
  orders.forEach((o) => {
    const em = o.customer?.email ?? `unknown-${o.id}`;
    if (!map.has(em)) {
      map.set(em, {
        id: `cust-${map.size + 1}`,
        name: o.customer?.name ?? em,
        email: em,
        address: o.customer?.address ?? "",
      });
    }
  });
  return Array.from(map.values());
}

export default function AdminCustomers() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const raw = localStorage.getItem(CUST_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    // derive from orders if none saved
    return sampleCustomersFromOrders(JSON.parse(JSON.stringify(orders)));
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(CUST_KEY, JSON.stringify(customers));
    } catch {}
  }, [customers]);

  useEffect(() => {
    // if no customers saved but orders exist, derive
    const raw = localStorage.getItem(CUST_KEY);
    if (!raw) {
      const derived = sampleCustomersFromOrders(orders);
      if (derived.length) setCustomers(derived);
    }
  }, []);

  const stats = useMemo(() => {
    const byEmail = new Map<string, { count: number; total: number }>();
    orders.forEach((o) => {
      const em = o.customer?.email ?? "";
      const total = (o.items ?? []).reduce(
        (a: number, b: any) => a + (b.price || 0) * (b.qty || 1),
        0,
      );
      const cur = byEmail.get(em) ?? { count: 0, total: 0 };
      cur.count += 1;
      cur.total += total;
      byEmail.set(em, cur);
    });
    return byEmail;
  }, [orders]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Customer>>({});
  const [search, setSearch] = useState<string>("");

  const filteredCustomers = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => {
      if (c.name?.toLowerCase().includes(q)) return true;
      if (c.email?.toLowerCase().includes(q)) return true;
      const stat = stats.get(c.email ?? "");
      if (stat && String(stat.total).toLowerCase().includes(q)) return true;
      return false;
    });
  }, [customers, search, stats]);

  const startNew = () => {
    const id = `cust-${Date.now()}`;
    setCustomers((s) => [
      { id, name: "New customer", email: `new+${Date.now()}@example.com` },
      ...s,
    ]);
    setEditingId(id);
  };

  const save = () => {
    if (!form?.id) return;
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === form.id
          ? {
              ...c,
              name: form.name ?? c.name,
              email: form.email ?? c.email,
              address: form.address ?? c.address,
              phone: form.phone ?? c.phone,
            }
          : c,
      ),
    );
    setEditingId(null);
  };

  const remove = (id: string) => {
    if (!confirm("Delete customer?")) return;
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const createFakeOrderFor = (customer: Customer) => {
    const p = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const ord = {
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      items: [
        { id: p.id, name: p.name, price: p.price, qty: 1, image: p.image },
      ],
      customer: {
        name: customer.name,
        email: customer.email,
        address: customer.address,
      },
    };
    setOrders((s) => [ord, ...s]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-brandSerif text-3xl">Customers</h2>
          <p className="text-foreground/70 mt-2">
            Manage customers and see their orders summary.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={startNew}
            className="inline-flex h-10 items-center rounded-md border px-4 text-sm"
          >
            New customer
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3">
          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm text-foreground/70">Summary</h3>
            <div className="mt-3 text-2xl font-medium">
              {customers.length} customers
            </div>
            <div className="mt-3 text-sm text-foreground/70">
              <div>Orders: {orders.length}</div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h4 className="text-sm text-foreground/70 mb-2">Quick actions</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  // derive customers from orders
                  const derived = sampleCustomersFromOrders(orders);
                  setCustomers(derived);
                }}
                className="rounded-md border px-3 py-2 text-sm"
              >
                Derive from orders
              </button>
              <button
                onClick={() => {
                  // clear customers
                  if (!confirm("Clear customers?")) return;
                  setCustomers([]);
                }}
                className="rounded-md border px-3 py-2 text-sm"
              >
                Clear customers
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 grid gap-4">
          <div className="mb-3">
            <input
              placeholder="Search customers by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border px-3 h-10"
            />
          </div>
          {filteredCustomers.map((c) => (
            <div key={c.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-foreground/70">{c.email}</div>
                  <div className="text-sm text-foreground/70">{c.address}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm">
                    Orders: {stats.get(c.email)?.count ?? 0}
                  </div>
                  <div className="text-sm">
                    Spent: ${(stats.get(c.email)?.total ?? 0).toFixed(2)}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingId(c.id)}
                      className="text-sm rounded-md border px-3 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(c.id)}
                      className="text-sm rounded-md border px-3 py-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => createFakeOrderFor(c)}
                      className="text-sm rounded-md border px-3 py-1"
                    >
                      Create order
                    </button>
                    <Link
                      to="/admin/orders"
                      className="text-sm rounded-md border px-3 py-1"
                    >
                      View orders
                    </Link>
                  </div>
                </div>
              </div>

              {editingId === c.id && (
                <div className="mt-4 grid gap-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm">Name</label>
                      <input
                        className="w-full rounded-md border px-2 h-10"
                        value={form.name ?? c.name}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            id: c.id,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm">Email</label>
                      <input
                        className="w-full rounded-md border px-2 h-10"
                        value={form.email ?? c.email}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            id: c.id,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm">Address</label>
                    <input
                      className="w-full rounded-md border px-2 h-10"
                      value={form.address ?? c.address}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          id: c.id,
                          address: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm">Phone</label>
                    <input
                      className="w-full rounded-md border px-2 h-10"
                      value={form.phone ?? c.phone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          id: c.id,
                          phone: e.target.value,
                        }))
                      }
                    />
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
    </div>
  );
}
