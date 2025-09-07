import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ORDERS_KEY } from "./Orders";
import { PRODUCTS } from "@/data/products";

const STORAGE_KEY = "admin-payments-v1";

type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

type Payment = {
  id: string;
  orderId?: string;
  amount: number;
  currency: string;
  method: string;
  status: PaymentStatus;
  createdAt: string;
  failureReason?: string;
  metadata?: Record<string, any>;
};

function samplePayments(): Payment[] {
  const now = Date.now();
  return [
    {
      id: `pay-${now}`,
      orderId: `ord-${now}`,
      amount: 1290,
      currency: "USD",
      method: "card_visa",
      status: "succeeded",
      createdAt: new Date().toISOString(),
    },
    {
      id: `pay-${now - 100000}`,
      orderId: `ord-${now - 100000}`,
      amount: 420,
      currency: "USD",
      method: "card_master",
      status: "failed",
      failureReason: "Insufficient funds",
      createdAt: new Date(now - 100000).toISOString(),
    },
  ];
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return samplePayments();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
    } catch {}
  }, [payments]);

  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return payments;
    return payments.filter((p) => p.status === filter);
  }, [payments, filter]);

  const changeStatus = (
    id: string,
    status: PaymentStatus,
    failureReason?: string,
  ) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status, failureReason: failureReason ?? p.failureReason }
          : p,
      ),
    );
  };

  const refund = (id: string) => {
    const p = payments.find((x) => x.id === id);
    if (!p) return;
    if (p.status === "refunded") return;
    if (!confirm(`Refund ${p.amount} ${p.currency} for payment ${id}?`)) return;
    // Mark refunded
    setPayments((prev) =>
      prev.map((x) => (x.id === id ? { ...x, status: "refunded" } : x)),
    );
  };

  const remove = (id: string) => {
    if (!confirm("Delete payment record?")) return;
    setPayments((prev) => prev.filter((p) => p.id !== id));
    if (selected === id) setSelected(null);
  };

  const createFake = () => {
    const p = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const id = `pay-${Date.now()}`;
    const pay: Payment = {
      id,
      orderId: `ord-${Date.now()}`,
      amount: p.price,
      currency: "USD",
      method: Math.random() > 0.5 ? "card_visa" : "card_master",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setPayments((s) => [pay, ...s]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-brandSerif text-3xl">Payments</h2>
          <p className="text-foreground/70 mt-2">
            Manage payment records, refunds and failures.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={createFake}
            className="inline-flex h-10 items-center rounded-md border px-4 text-sm"
          >
            Create fake payment
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3">
          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm text-foreground/70">Summary</h3>
            <div className="mt-3 text-2xl font-medium">
              {payments.length} payments
            </div>
            <div className="mt-3 text-sm text-foreground/70">
              <div>
                Pending: {payments.filter((p) => p.status === "pending").length}
              </div>
              <div>
                Succeeded:{" "}
                {payments.filter((p) => p.status === "succeeded").length}
              </div>
              <div>
                Failed: {payments.filter((p) => p.status === "failed").length}
              </div>
              <div>
                Refunded:{" "}
                {payments.filter((p) => p.status === "refunded").length}
              </div>
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
              <option value="succeeded">Succeeded</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2 grid gap-4">
          <div className="rounded-xl border bg-card p-4">
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-foreground/70">
                  No payments found
                </div>
              ) : (
                filtered.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start justify-between gap-4 border-b pb-3 mb-3"
                  >
                    <div>
                      <div className="font-medium">
                        {p.method} —{" "}
                        <span className="text-sm text-foreground/70">
                          {p.orderId ?? "no order"}
                        </span>
                      </div>
                      <div className="text-sm text-foreground/70">
                        {new Date(p.createdAt).toLocaleString()}
                      </div>
                      <div className="mt-2 text-sm">
                        {p.amount} {p.currency}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`rounded-full px-3 py-1 text-xs ${p.status === "pending" ? "bg-yellow-200" : p.status === "succeeded" ? "bg-green-200" : p.status === "failed" ? "bg-red-200" : "bg-slate-200"}`}
                      >
                        {p.status}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelected(p.id)}
                          className="text-sm rounded-md border px-3 py-1"
                        >
                          View
                        </button>
                        <button
                          onClick={() => changeStatus(p.id, "succeeded")}
                          className="text-sm rounded-md border px-3 py-1"
                        >
                          Mark succeeded
                        </button>
                        <button
                          onClick={() =>
                            changeStatus(p.id, "failed", "Manual mark")
                          }
                          className="text-sm rounded-md border px-3 py-1"
                        >
                          Mark failed
                        </button>
                        <button
                          onClick={() => refund(p.id)}
                          className="text-sm rounded-md border px-3 py-1"
                        >
                          Refund
                        </button>
                        <button
                          onClick={() => remove(p.id)}
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
                <h4 className="font-medium">Payment {selected}</h4>
                <button
                  onClick={() => setSelected(null)}
                  className="text-sm rounded-md border px-3 py-1"
                >
                  Close
                </button>
              </div>

              <div className="mt-3">
                {(() => {
                  const pay = payments.find((x) => x.id === selected);
                  if (!pay) return <div>Payment not found</div>;
                  return (
                    <div>
                      <div className="text-sm text-foreground/70">
                        {new Date(pay.createdAt).toLocaleString()}
                      </div>
                      <div className="mt-3">
                        <h5 className="font-medium">Details</h5>
                        <div className="text-sm text-foreground/70">
                          Method: {pay.method}
                        </div>
                        <div className="text-sm text-foreground/70">
                          Amount: {pay.amount} {pay.currency}
                        </div>
                        <div className="text-sm text-foreground/70">
                          Order: {pay.orderId ?? "—"}
                        </div>
                        <div className="text-sm text-foreground/70">
                          Status: {pay.status}
                        </div>
                        {pay.failureReason ? (
                          <div className="text-sm text-red-500">
                            Failure: {pay.failureReason}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => changeStatus(pay.id, "pending")}
                          className="inline-flex h-10 items-center rounded-md border px-4"
                        >
                          Mark pending
                        </button>
                        <button
                          onClick={() => changeStatus(pay.id, "succeeded")}
                          className="inline-flex h-10 items-center rounded-md border px-4"
                        >
                          Mark succeeded
                        </button>
                        <button
                          onClick={() =>
                            changeStatus(
                              pay.id,
                              "failed",
                              prompt("Failure reason") ?? "Manual fail",
                            )
                          }
                          className="inline-flex h-10 items-center rounded-md border px-4"
                        >
                          Mark failed
                        </button>
                        <button
                          onClick={() => refund(pay.id)}
                          className="inline-flex h-10 items-center rounded-md border px-4"
                        >
                          Refund
                        </button>
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
