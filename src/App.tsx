import { MotionConfig } from "motion/react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { CartProvider } from "./context/CartContext";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProductDetail } from "./pages/ProductDetail";
import { Quote } from "./pages/Quote";
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
            <Route path="cart" element={<Cart />} />
            <Route path="quote" element={<Quote />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </MotionConfig>
  );
}
