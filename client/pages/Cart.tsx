import { useCart } from "@/state/cart";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-brandSerif text-4xl md:text-5xl">Your bag is empty</h1>
        <p className="mt-3 text-foreground/70">Explore our collections and find something you love.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/shop" className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground">Shop now</Link>
          <Link to="/collections" className="inline-flex h-11 items-center rounded-md border px-5 text-sm">Browse collections</Link>
        </div>
      </div>
    );
  }

  const inCart = new Set(items.map((i) => i.id));
  const activeCategories = new Set(
    PRODUCTS.filter((p) => inCart.has(p.id)).map((p) => p.category),
  );
  const recommendations = (
    activeCategories.size
      ? PRODUCTS.filter((p) => activeCategories.has(p.category))
      : PRODUCTS
  )
    .filter((p) => !inCart.has(p.id))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-brandSerif text-4xl md:text-5xl mb-8">Your bag</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border rounded-xl overflow-hidden">
              <img src={item.image} alt={item.name} className="h-28 w-28 object-cover" />
              <div className="flex-1 py-3 pr-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-foreground/70">${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-sm text-foreground/60 hover:text-foreground">Remove</button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-sm text-foreground/60">Qty</span>
                  <div className="inline-flex items-center overflow-hidden rounded-md border">
                    <button
                      className="h-8 w-8 text-lg leading-none disabled:opacity-40"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-3 text-sm min-w-8 text-center select-none">{item.qty}</span>
                    <button
                      className="h-8 w-8 text-lg leading-none"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-lg font-medium">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-foreground/60"><span>Shipping</span><span>Calculated at checkout</span></div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <button className="h-11 rounded-md bg-primary text-primary-foreground text-sm">Checkout</button>
            <button onClick={clear} className="h-11 rounded-md border text-sm">Clear bag</button>
          </div>
          <p className="mt-3 text-xs text-foreground/60">Taxes and shipping are calculated at checkout.</p>
        </div>
      </div>

      {recommendations.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-brandSerif">You may also like</h2>
            <Link to="/shop?sort=popular" className="text-sm text-foreground/60 hover:text-foreground">Shop all</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
