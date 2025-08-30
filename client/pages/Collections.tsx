import { useMemo } from "react";
import { PRODUCTS, type ProductWithMeta } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { useCart } from "@/state/cart";

function pickDailyDeal(list: ProductWithMeta[]) {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = Number(new Date()) - Number(start);
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const idx = day % list.length;
  return list[idx];
}

export default function CollectionsPage() {
  const topPopular = useMemo(
    () => [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, 8),
    [],
  );
  const newest = useMemo(
    () => [...PRODUCTS].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 8),
    [],
  );
  const bestSellers = useMemo(
    () => [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, 8),
    [],
  );
  const deal = useMemo(() => pickDailyDeal(PRODUCTS), []);
  const { addItem } = useCart();

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-6 md:mb-8">
        <h1 className="font-brandSerif text-4xl md:text-5xl">Discover</h1>
        <p className="mt-2 text-foreground/70">Trends, new arrivals, best sellers, and today’s special deal.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="#trends" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">Trends</a>
          <a href="#new" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">New arrivals</a>
          <a href="#best" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">Best sellers</a>
        </div>
      </div>

      <section id="trends" className="mb-12 md:mb-16 scroll-mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-brandSerif">Trends</h2>
          <a className="text-sm text-foreground/60 hover:text-foreground" href="/shop?sort=popular">View all</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topPopular.map((p) => (
            <ProductCard key={p.id} product={{ ...p, tag: "trend" }} />
          ))}
        </div>
      </section>

      <section id="new" className="mb-12 md:mb-16 scroll-mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-brandSerif">New arrivals</h2>
          <a className="text-sm text-foreground/60 hover:text-foreground" href="/shop?sort=newest">View all</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {newest.map((p) => (
            <ProductCard key={p.id} product={{ ...p, tag: "new" }} />
          ))}
        </div>
      </section>

      <section id="best" className="mb-12 md:mb-16 scroll-mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-brandSerif">Best sellers</h2>
          <a className="text-sm text-foreground/60 hover:text-foreground" href="/shop?sort=popular">View all</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={{ ...p, tag: "best" }} />
          ))}
        </div>
      </section>

      <section className="scroll-mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-brandSerif">Deal of the day</h2>
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
      </section>
    </div>
  );
}
