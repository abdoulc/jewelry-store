import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-brandSerif text-4xl md:text-6xl leading-tight tracking-tight">
              Modern jewelry for luminous lives
            </h1>
            <p className="mt-4 text-base md:text-lg text-foreground/70 max-w-prose">
              Crafted in recycled gold and conflict‑free stones. Made to layer, love, and last.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/shop" className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground">Shop new in</Link>
              <Link to="/collections" className="inline-flex h-11 items-center rounded-md border px-5 text-sm">Explore collections</Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-2xl border">
              <img
                src="https://images.pexels.com/photos/33582778/pexels-photo-33582778.jpeg"
                alt="Editorial close-up of a model wearing a gold necklace"
                className="w-full h-[360px] md:h-[560px] object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
