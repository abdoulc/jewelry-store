import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, type ProductWithMeta } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { useCart } from "@/state/cart";
import { toast } from "sonner";

function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border bg-card">
        <img
          src={images[active]}
          alt={alt}
          className="w-full h-full object-cover aspect-square"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={
                "relative overflow-hidden rounded-lg border aspect-square " +
                (i === active ? "ring-2 ring-primary" : "hover:opacity-90")
              }
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product: ProductWithMeta | undefined = useMemo(
    () => PRODUCTS.find((p) => p.id === id),
    [id],
  );

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch {
      // noop
    }
  }, [id]);

  const categoryTitle = useMemo(() => {
    if (!product) return "";
    return (
      CATEGORIES.find((c) => c.id === product.category)?.title ??
      product.category
    );
  }, [product]);

  const { addItem } = useCart();

  const sizeOptions = useMemo(() => {
    const map: Record<string, string[]> = {
      rings: ["5", "6", "7", "8", "9"],
      earrings: ["One Size"],
      necklaces: ['14"', '16"', '18"', '20"'],
      bracelets: ["S", "M", "L"],
      bangles: ["S", "M", "L"],
      pendants: ["One Size"],
      charms: ["One Size"],
      bridal: ["S", "M", "L"],
      mens: ["S", "M", "L"],
    };
    return map[product?.category ?? ""] ?? ["One Size"];
  }, [product?.category]);

  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (sizeOptions.length === 1) setSelectedSize(sizeOptions[0]);
    else setSelectedSize("");
  }, [sizeOptions]);

  if (!product) {
    return (
      <div className="container py-16">
        <div className="max-w-xl">
          <h1 className="font-brandSerif text-3xl md:text-4xl">
            Product not found
          </h1>
          <p className="mt-3 text-foreground/70">
            The item you are looking for does not exist or may have been moved.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/shop"
              className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              Browse shop
            </Link>
            <Link
              to="/"
              className="inline-flex h-11 items-center rounded-md border px-5 text-sm font-medium"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const related = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => p.category === product.category && p.id !== product.id,
      ).slice(0, 4),
    [product],
  );

  return (
    <div className="container py-10 md:py-16">
      <nav className="mb-6 text-sm text-foreground/70">
        <Link to="/shop" className="hover:underline">
          Shop
        </Link>
        <span> / </span>
        <span className="capitalize">{categoryTitle.toLowerCase()}</span>
        <span> / </span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery
          images={
            product.images && product.images.length
              ? product.images
              : [product.image]
          }
          alt={product.name}
        />
        <div>
          <h1 className="font-brandSerif text-3xl md:text-4xl leading-tight">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-xl">${product.price.toFixed(2)}</p>
            {product.tag ? (
              <span className="rounded-full border border-border/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-foreground/70">
                {product.tag}
              </span>
            ) : null}
          </div>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm">Size</Label>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
              >
                {sizeOptions.map((s) => {
                  const id = `size-${s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`;
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <RadioGroupItem id={id} value={s} />
                      <Label htmlFor={id} className="text-sm cursor-pointer">
                        {s}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            <Button
              className="w-full md:w-auto"
              onClick={() => {
                if (!selectedSize) {
                  toast.error("Please select a size");
                  return;
                }
                const nameWithSize = `${product.name} · Size ${selectedSize}`;
                addItem(
                  {
                    id: product.id,
                    name: nameWithSize,
                    price: product.price,
                    image: product.image,
                  },
                  1,
                );
                toast.success(`${product.name} added to bag`);
              }}
            >
              Add to bag
            </Button>

            <div className="pt-4 border-t text-sm text-foreground/70 space-y-2">
              <p>
                Category:{" "}
                <span className="text-foreground">{categoryTitle}</span>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Free shipping on orders over $150</li>
                <li>30-day returns</li>
                <li>Crafted with ethically sourced materials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-brandSerif text-2xl md:text-3xl mb-6">
            You may also like
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group overflow-hidden rounded-xl bg-card border border-border/60"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      ${p.price.toFixed(2)}
                    </p>
                  </div>
                  {p.tag ? (
                    <span className="rounded-full border border-border/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-foreground/70">
                      {p.tag}
                    </span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
