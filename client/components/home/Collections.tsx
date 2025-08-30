import { Link } from "react-router-dom";
import { CATEGORIES } from "@/data/categories";

export function Collections() {
  const top = CATEGORIES.slice(0, 3);
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-brandSerif text-3xl md:text-4xl">Explore by category</h2>
          <Link to="/collections" className="text-sm text-foreground/60 hover:text-foreground">View all</Link>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {top.map((c) => (
            <Link key={c.id} to={`/shop?category=${c.id}`} className="group block overflow-hidden rounded-2xl border">
              <div className="aspect-[4/5]">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="text-lg">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
