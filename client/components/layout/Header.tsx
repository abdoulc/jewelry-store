import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useCart } from "@/state/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  const { count: cartCount } = useCart();

  const filteredNav = useMemo(() => nav, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        isHome ? "bg-transparent" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="group inline-flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-wide leading-none font-brandSerif">
              Auréole
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {filteredNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm transition-colors hover:text-foreground/80",
                    isActive ? "text-foreground" : "text-foreground/60",
                  )
                }
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <Input
                placeholder="Search jewelry"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 w-[240px]"
              />
            </div>
          </div>

          <Button variant="ghost" size="icon" aria-label="Open cart" onClick={() => navigate("/cart")}>
            <div className="relative">
              <ShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">
                  {cartCount}
                </span>
              )}
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
