import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Placeholder from "./pages/Placeholder";
import CollectionsPage from "./pages/Collections";
import CartPage from "./pages/Cart";
import ShopPage from "./pages/Shop";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import RootLayout from "@/components/layout/RootLayout";

const queryClient = new QueryClient();

import { CartProvider } from "@/state/cart";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Index />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="collections" element={<CollectionsPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="about" element={<Placeholder />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<Placeholder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
