import { Hero } from "@/components/home/Hero";
import { Collections } from "@/components/home/Collections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { DealOfDay } from "@/components/home/DealOfDay";

export default function Index() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Collections />
      <DealOfDay />
      <section className="py-16 md:py-24 bg-card/40 border-y">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-brandSerif text-3xl md:text-4xl">Crafted with conscience</h2>
            <p className="mt-3 text-foreground/70 max-w-prose">
              Our pieces are made from recycled 14k gold and ethically sourced diamonds. Designed in Paris, handcrafted by master jewelers, and meant to be treasured for years.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border">
            <img src="https://images.pexels.com/photos/28985978/pexels-photo-28985978.jpeg" alt="Gold bracelet close-up" className="h-[360px] w-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
