import { MotionConfig } from "motion/react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { CartProvider } from "./context/CartContext";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Contact } from "./pages/Contact";
import { Exhibitions } from "./pages/Exhibitions";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { PackageDetail } from "./pages/PackageDetail";
import { Packages } from "./pages/Packages";
import { ProductDetail } from "./pages/ProductDetail";
import { Quote } from "./pages/Quote";
import { Planner } from "./pages/Planner";
import { Portfolio } from "./pages/Portfolio";
import { Products } from "./pages/Products";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:slug" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="packages" element={<Packages />} />
            <Route path="packages/:slug" element={<PackageDetail />} />
            <Route path="exhibitions" element={<Exhibitions />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="planner" element={<Planner />} />
            <Route path="cart" element={<Cart />} />
            <Route path="quote" element={<Quote />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </MotionConfig>
  );
}
