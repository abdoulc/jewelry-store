import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold font-['Cormorant_Garamond',serif]">
            Obiang-Bijoux
          </h3>
          <p className="text-sm text-foreground/70 max-w-xs">
            Elevating everyday moments with timeless pieces crafted in precious
            metals and ethically sourced stones.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-medium">Shop</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>
              <Link to="/shop" className="hover:text-foreground">
                All Jewelry
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-foreground">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-foreground">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-medium">About</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>
              <Link to="/about" className="hover:text-foreground">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                Sustainability
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-medium">Newsletter</h4>
          <p className="text-sm text-foreground/70 mb-3">
            Join for early access to new drops and private events.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm"
            >
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container py-6 text-xs text-foreground/60 flex items-center justify-between">
          <p>
            © {new Date().getFullYear()} Obiang-Bijoux. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
