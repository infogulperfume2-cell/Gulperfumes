import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Loader2 } from "lucide-react";
import "./index.css";
import Perfume from "./perfume";
import Shop from "./Shop";
import Checkout from "./Checkout";

const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    const GA_ID = "G-XXXXXXXXXX"; // Replace with your Google Analytics Measurement ID

    if (!window.gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_ID);
    }

    window.gtag("config", GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 2000);
    const removeTimer = setTimeout(() => setLoading(false), 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, change) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          const newQuantity = (item.quantity || 1) + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }),
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <AnalyticsWrapper />
      <div className="bg-[#050505] min-h-screen">
        {loading && (
          <div
            className={`fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${
              isFading ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="animate-pulse mb-4">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            </div>
            <h1 className="text-3xl font-cinzel text-white tracking-[0.2em]">
              GUL PERFUME
            </h1>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Perfume />} />
          <Route
            path="/shop"
            element={
              <Shop
                addToCart={addToCart}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
