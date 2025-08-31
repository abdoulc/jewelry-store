import { ProductCard, type Product } from "@/components/shared/ProductCard";

const products: Product[] = [
  {
    id: "ring-sol",
    name: "Solitaire Diamond Ring",
    price: 1290,
    image:
      "https://images.pexels.com/photos/10799227/pexels-photo-10799227.jpeg",
    tag: "new",
  },
  {
    id: "ear-etoile",
    name: "Étoile Hoop Earrings",
    price: 420,
    image:
      "https://images.pexels.com/photos/20943477/pexels-photo-20943477.jpeg",
  },
  {
    id: "uuu",
    name: "Étoile Hoop Earrings",
    price: 420,
    image:
      "https://images.pexels.com/photos/29193428/pexels-photo-29193428.jpeg",
  },
  {
    id: "uuu",
    name: "Étoile Hoop Earrings",
    price: 420,
    image: "https://images.pexels.com/photos/6666403/pexels-photo-6666403.jpeg",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-brandSerif text-3xl md:text-4xl">
            Featured pieces
          </h2>
          <a
            href="/shop"
            className="text-sm text-foreground/60 hover:text-foreground"
          >
            Shop all
          </a>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
