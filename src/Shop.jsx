import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ShoppingBag,
  Star,
  X,
  Plus,
  Minus,
  Trash2,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import logo from "./perfume.png";
import { useNavigate } from "react-router-dom";

// Load all images from assets folder
const localImages = import.meta.glob("./assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

const getImage = (name) => {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const path in localImages) {
    const fileName = path
      .split("/")
      .pop()
      .split(".")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    if (fileName === cleanName) {
      return localImages[path].default;
    }
  }
  return null;
};

const Shop = ({ cart, addToCart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOrder, setSortOrder] = useState("default");
  const [toast, setToast] = useState(null);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [searchQuery, selectedCategory, sortOrder]);

  const pourHomme = [
    "Sultanat",
    "Officer",
    "Shehensha",
    "Markhor",
    "Bluish Vally",
    "Fantasticdream",
    "just impress",
    "Daimond",
    "Black code",
    "Elegant man",
  ];

  const pourFemme = ["Sukoon", "Lilly Gold(s)", "moonwalk(w)"];

  const products = useMemo(() => {
    // Perfume Data List
    const productList = [
      { name: "Shehensha", price: 3000 },
      { name: "Fantasticdream", price: 3200 },
      { name: "Sultanat", price: 2900 },
      { name: "Dreamscent", price: 3500 },
      { name: "Sukoon", price: 2900 },
      { name: "Lilly Gold(s)", price: 2800 },
      { name: "Daimond", price: 3700 },
      { name: "Officer", price: 3200 },
      { name: "Black code", price: 3000 },
      { name: "Markhor", price: 2800 },
      { name: "Sta zargy", price: 3000 },
      { name: "moonwalk(w)", price: 2800 },
      { name: "Crown", price: 3000 },
      { name: "just impress", price: 2600 },
      { name: "Legend Person", price: 4000 },
      { name: "Wanted signature", price: 2700 },
      { name: "Bluish Vally", price: 2400 },
      { name: "Elegant man", price: 2650 },
    ];

    // Generating Product Objects
    return productList.map((item, index) => {
      // Try to find local image matching the name
      let imageSrc = getImage(item.name);

      // Fallback to Unsplash if no local image found
      if (!imageSrc) {
        imageSrc = `https://images.unsplash.com/photo-${
          [
            "1541643600914-78b084683601",
            "1594035910387-fea47794261f",
            "1523293182086-7651a899d37f",
            "1592945403244-b3fbafd7f539",
            "1615634260167-c8cdede054de",
            "1585120040315-2241b774ad0f",
            "1519669011258-57dd35aa9611",
            "1589820296156-2454dd33f7d0",
            "1595425970377-c09ef4d77cfe",
            "1605522466436-1925b1475539",
            "1557170330-23726311d6bc",
            "1587017531730-6eb7a6606d99",
            "1541643600914-78b084683601",
            "1594035910387-fea47794261f",
            "1523293182086-7651a899d37f",
            "1592945403244-b3fbafd7f539",
            "1615634260167-c8cdede054de",
            "1585120040315-2241b774ad0f",
          ][index % 18]
        }?auto=format&fit=crop&q=80&w=400`;
      }

      let category;
      if (pourHomme.includes(item.name)) {
        category = "Male";
      } else if (pourFemme.includes(item.name)) {
        category = "Female";
      } else {
        category = "Unisex";
      }

      return {
        id: index + 1,
        name: item.name,
        price: item.price,
        oldPrice: item.price + 1000,
        category: ["Pour Homme", "Pour Femme", "Unisex"][index % 3],
        category: category,
        image: imageSrc,
        rating: (4 + Math.random()).toFixed(1),
      };
    });
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery);
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  // Cart Functions
  const handleAddToCart = (product) => {
    addToCart(product);
    setCartOpen(true);
    setToast(`${product.name} Added to Cart`);
    setTimeout(() => setToast(null), 2000);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans selection:bg-amber-500/30 overflow-x-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-amber-500 text-black px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-in fade-in slide-in-from-bottom-4 duration-300">
          {toast}
        </div>
      )}

      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <img
                src={logo}
                alt="Gul Perfume"
                className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
              />
              <div>
                <span className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-amber-200 to-amber-600 bg-clip-text text-transparent">
                  Gul Perfume
                </span>
                <p className="text-[9px] text-stone-500 tracking-widest -mt-1">
                  By dr danishyounas
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <div
              className={`flex items-center rounded-full transition-all duration-300 ${
                isSearchOpen
                  ? "w-40 px-3 py-2 bg-white/5 border border-white/10"
                  : "w-10 h-10 justify-center bg-transparent border-transparent"
              } md:w-64 md:px-4 md:py-2 md:bg-white/5 md:border md:border-white/10 md:justify-start`}
            >
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (!isSearchOpen) {
                    setTimeout(() => searchInputRef.current?.focus(), 100);
                  }
                }}
              >
                <Search
                  size={isSearchOpen ? 16 : 20}
                  className="text-stone-400"
                />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className={`bg-transparent border-none outline-none text-xs ml-2 text-white placeholder-stone-500 w-full ${
                  isSearchOpen ? "block" : "hidden md:block"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearchOpen(false)}
              />
            </div>
            <div
              className="relative cursor-pointer hover:text-amber-500 transition-colors"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="pt-32 pb-12 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-serif mb-4">
          Exclusive <span className="text-amber-500">Shop</span>
        </h1>
        <p className="text-stone-400 max-w-xl mx-auto font-light">
          Discover the finest collection of fragrances, curated for elegance and
          style.
        </p>
      </div>

      {/* Filters & Sort */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Category Filters */}
        <div className="flex justify-center gap-4 flex-wrap">
          {["All", "Male", "Female", "Unisex"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                selectedCategory === category
                  ? "bg-amber-500 text-black border-amber-500"
                  : "bg-transparent text-stone-500 border-white/10 hover:border-amber-500 hover:text-amber-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-black border border-white/10 text-stone-400 px-6 py-2 pr-10 rounded-full text-xs font-bold uppercase tracking-widest focus:border-amber-500 outline-none cursor-pointer hover:border-amber-500 hover:text-amber-500 transition-all"
          >
            <option value="default">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
          {filteredProducts.slice(0, visibleCount).map((product) => {
            const isInCart = cart.some((item) => item.id === product.id);
            return (
              <div
                key={product.id}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[20px] md:rounded-[32px] overflow-hidden hover:bg-white/[0.05] hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-2 shadow-xl"
              >
                {/* Image */}
                <div className="h-[160px] md:h-[280px] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/60 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold text-amber-500 border border-amber-500/20">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-6 space-y-2 md:space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-1">
                    <h3 className="text-sm md:text-xl font-serif text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500 text-[10px] md:text-xs font-bold">
                      <Star
                        size={10}
                        className="md:w-3 md:h-3"
                        fill="currentColor"
                      />{" "}
                      {product.rating}
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center pt-2 gap-2">
                    <div className="flex flex-col items-start">
                      <span className="text-sm md:text-2xl font-serif text-amber-500">
                        PKR {product.price}
                      </span>
                      <span className="text-xs text-stone-500 line-through">
                        PKR {product.oldPrice}
                      </span>
                    </div>
                    {isInCart ? (
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 px-3 py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-red-500/20"
                      >
                        <Trash2 size={12} className="md:w-3.5 md:h-3.5" />{" "}
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white/10 hover:bg-amber-500 hover:text-black text-white px-3 py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={12} className="md:w-3.5 md:h-3.5" />{" "}
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3 rounded-full border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Shopping Cart Sidebar (Drawer) */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${cartOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${cartOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setCartOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl transform transition-transform duration-500 flex flex-col ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Cart Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
            <h2 className="text-2xl font-serif text-amber-500">Your Cart</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p>Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-amber-500 text-sm hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-lg">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 bg-black/50 rounded-full px-3 py-1 border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="hover:text-amber-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="hover:text-amber-500"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-amber-500 font-bold">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-black/50 border-t border-white/10 space-y-4">
              <div className="space-y-2 text-sm text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">PKR {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-serif text-amber-500 pt-4 border-t border-white/10">
                <span>Total</span>
                <span>PKR {cartTotal}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-amber-500 text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Gul Perfume"
                className="w-10 h-10 object-contain"
              />
              <span className="text-3xl font-serif font-bold text-amber-500">
                Gul Perfume
              </span>
            </div>
            <p className="text-stone-500 text-sm max-w-sm leading-relaxed font-light">
              Indulge in the essence of opulence where luxury meets allure. Our
              exquisite collections are designed to elevate your senses and
              create a lasting impression.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 bg-stone-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-stone-900/40 p-6 rounded-[24px] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <ShoppingBag size={80} />
              </div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-500 mb-2">
                Get Update
              </p>
              <h3 className="text-xl font-serif mb-4 leading-tight">
                Subscribe For Latest Update
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 relative z-10">
                <input
                  className="flex-1 bg-black border border-white/10 rounded-full px-4 py-3 text-xs outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your email address"
                />
                <button className="bg-amber-500 text-black px-6 py-3 rounded-full text-[10px] font-black uppercase hover:bg-amber-400 transition-all tracking-widest whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-stone-600 border-t border-white/5 mt-8 text-center md:text-left">
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <a href="/" className="hover:text-amber-500">
              Privacy Policy
            </a>
            <a href="/#foot" className="hover:text-amber-500">
              About Us
            </a>
            <a href="/#contact" className="hover:text-amber-500">
              Contact Us
            </a>
          </div>
          <p>Copyright @ 2026 - Developed with Haris khan</p>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
