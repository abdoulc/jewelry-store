import { useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/state/cart";

function pickDailyDeal<T>(list: T[]) {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = Number(new Date()) - Number(start);
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const idx = day % list.length;
  return list[idx];
}

export function DealOfDay() {
  const deal = useMemo(() => pickDailyDeal(PRODUCTS), []);
  const { addItem } = useCart();

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-brandSerif text-3xl md:text-4xl">Deal of the day</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center rounded-2xl border p-4 md:p-6">
          <img src={deal.image} alt={deal.name} className="rounded-xl w-full h-[300px] md:h-[420px] object-cover" />
          <div>
            <h3 className="text-2xl md:text-3xl font-brandSerif">{deal.name}</h3>
            <p className="mt-2 text-foreground/70">Today only. Limited stock.</p>
            <p className="mt-3 text-lg">
              <span className="font-semibold">${deal.price.toFixed(2)}</span>
              <span className="ml-2 text-foreground/60 line-through">${(deal.price * 1.15).toFixed(2)}</span>
              <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs text-foreground">15% off</span>
            </p>
            <div className="mt-5 flex gap-3">
              <button
                className="h-11 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground"
                onClick={() => addItem({ id: deal.id, name: deal.name, price: deal.price, image: deal.image }, 1)}
              >
                Add to bag
              </button>
              <a href={`/shop?category=${deal.category}`} className="h-11 rounded-md border px-5 text-sm inline-flex items-center">See similar</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
