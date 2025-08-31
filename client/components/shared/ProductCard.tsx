import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCart } from "@/state/cart";
import { Link } from "react-router-dom";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
};

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl bg-card border border-border/60",
        className,
      )}
    >
      <Link
        to={`/products/${product.id}`}
        className="aspect-[4/5] md:aspect-square overflow-hidden block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-medium leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-foreground/60">
              ${product.price.toFixed(2)}
            </p>
          </div>
          {product.tag ? (
            <span className="rounded-full border border-border/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-foreground/70">
              {product.tag}
            </span>
          ) : null}
        </div>
        <div className="mt-3">
          <Button
            className="w-full"
            onClick={() => {
              addItem(
                {
                  id: product.id,
                  name: product.name,
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
        </div>
      </div>
    </div>
  );
}
