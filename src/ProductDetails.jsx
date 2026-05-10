import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Heart,
  Star,
  ShoppingBag,
  Minus,
  Plus,
  MessageCircle,
  Truck,
  Award,
  Gift,
  Zap,
  ChevronRight,
} from "lucide-react";
import { products as productData, pourHomme, pourFemme } from "./data/products";
import { useNavigate, useParams } from "react-router-dom";
import logo from "./perfume.png";

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

const ProductDetails = ({
  cart,
  addToCart,
  updateQuantity,
  removeFromCart,
  allProducts,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toast, setToast] = useState(null);
  const [imageZoom, setImageZoom] = useState({ x: 0, y: 0 });

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get product data
  const product = useMemo(() => {
    // Using centralized product data
    const productList = productData;

    const productIndex = parseInt(id) - 1;
    if (productIndex < 0 || productIndex >= productList.length)
      return null;

    const item = productList[productIndex];
    let imageSrc = getImage(item.name);

    if (!imageSrc) {
      const unsplashIds = [
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
      ];
      imageSrc = `https://images.unsplash.com/photo-${
        unsplashIds[productIndex % unsplashIds.length]
      }?auto=format&fit=crop&q=80&w=600`;
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
      id: parseInt(id),
      name: item.name,
      price: item.price,
      oldPrice: item.price + 1000,
      category: category,
      image: imageSrc,
      rating: (4 + Math.random()).toFixed(1),
      reviews: Math.floor(Math.random() * 300) + 50,
    };
  }, [id]);

  // Get related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    if (!product) return [];

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
    ];

    return productData
      .map((item, index) => {
        let category;
        if (pourHomme.includes(item.name)) {
          category = "Male";
        } else if (pourFemme.includes(item.name)) {
          category = "Female";
        } else {
          category = "Unisex";
        }

        let imageSrc = getImage(item.name);
        if (!imageSrc) {
          const unsplashIds = [
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
          ];
          imageSrc = `https://images.unsplash.com/photo-${
            unsplashIds[index % unsplashIds.length]
          }?auto=format&fit=crop&q=80&w=600`;
        }

        return {
          id: index + 1,
          name: item.name,
          price: item.price,
          oldPrice: item.price + 1000,
          category: category,
          image: imageSrc,
          rating: (4 + Math.random()).toFixed(1),
        };
      })
      .filter(
        (p) =>
          p.category === product.category &&
          p.id !== product.id,
      )
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#e5e5e5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Product not found</h1>
          <button
            onClick={() => navigate("/shop")}
            className="text-amber-500 hover:underline"
          >
            Go back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
    navigate("/checkout");
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "923299509072";
    const message = `Hi! I'm interested in ordering:\n\n🛍️ ${product.name}\n📦 Size: ${selectedSize}\n🔢 Quantity: ${quantity}\n💰 Total: PKR ${product.price * quantity}\n\nPlease confirm availability and proceed with the order.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleImageHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setImageZoom({ x, y });
  };

  const isInCart = cart.some((item) => item.id === product.id);

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
              onClick={() => navigate("/shop")}
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
            <div className="relative cursor-pointer hover:text-amber-500 transition-colors">
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + (b.quantity || 1), 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="pt-28 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
          <button
            onClick={() => navigate("/")}
            className="hover:text-amber-500 transition-colors"
          >
            Home
          </button>
          <ChevronRight size={14} />
          <button
            onClick={() => navigate("/shop")}
            className="hover:text-amber-500 transition-colors"
          >
            Shop
          </button>
          <ChevronRight size={14} />
          <span className="text-amber-500">{product.name}</span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* LEFT SIDE - Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full">
              <div
                className="relative overflow-hidden rounded-[32px] bg-white/[0.03] backdrop-blur-xl border border-white/10 aspect-square group cursor-zoom-in"
                onMouseMove={handleImageHover}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                  style={{
                    transformOrigin: `${imageZoom.x}% ${imageZoom.y}%`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Wishlist Heart Icon */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-amber-500 hover:border-amber-500 transition-all group"
              >
                <Heart
                  size={24}
                  className={`transition-all ${
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-white group-hover:text-black"
                  }`}
                />
              </button>

              {/* Category Badge */}
              <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/20">
                <span className="text-sm font-bold text-amber-500">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Product Details */}
          <div className="flex flex-col justify-start space-y-6">
            {/* Product Name & Rating */}
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-white">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "fill-amber-500 text-amber-500"
                            : "text-stone-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-amber-500 font-bold">
                    {product.rating}
                  </span>
                </div>
                <span className="text-stone-500">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-serif text-amber-500">
                  PKR {product.price}
                </span>
                <span className="text-2xl text-stone-500 line-through">
                  PKR {product.oldPrice}
                </span>
                <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-sm font-bold border border-amber-500/40">
                  25% OFF
                </span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-stone-300 uppercase tracking-widest">
                Select Size
              </label>
              <div className="flex gap-3 flex-wrap">
                {["30ml", "50ml", "100ml"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs border transition-all ${
                      selectedSize === size
                        ? "bg-amber-500 text-black border-amber-500"
                        : "bg-white/[0.05] text-white border-white/10 hover:border-amber-500 hover:text-amber-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-stone-300 uppercase tracking-widest">
                Quantity
              </label>
              <div className="flex items-center gap-4 bg-white/[0.05] border border-white/10 w-fit rounded-full p-2">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-2 hover:bg-amber-500 hover:text-black rounded-full transition-all"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-bold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-amber-500 hover:text-black rounded-full transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all border text-lg flex items-center justify-center gap-2 ${
                  isInCart
                    ? "bg-amber-500/20 text-amber-500 border-amber-500/40 hover:bg-amber-500 hover:text-black"
                    : "bg-amber-500 text-black border-amber-500 hover:bg-amber-600"
                }`}
              >
                <ShoppingBag size={20} />
                {isInCart ? "Update Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all border text-lg flex items-center justify-center gap-2 bg-white/[0.05] text-white border-white/10 hover:bg-white/10 hover:border-white/20"
              >
                <Zap size={20} />
                Buy Now
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all border text-lg flex items-center justify-center gap-2 bg-green-500/10 text-green-400 border-green-500/40 hover:bg-green-500 hover:text-black hover:border-green-500"
              >
                <MessageCircle size={20} />
                WhatsApp Order
              </button>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20 pt-20 border-t border-white/10">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif mb-6">About This Fragrance</h2>
            <p className="text-stone-400 leading-relaxed mb-4">
              Discover the essence of luxury with {product.name}, a premium
              fragrance crafted for those who appreciate the finer things in
              life. This exquisite perfume combines the finest ingredients from
              around the world to create an unforgettable olfactory experience.
            </p>
            <p className="text-stone-400 leading-relaxed">
              Each spray releases layers of carefully selected notes that evolve
              throughout the day, ensuring you leave a lasting impression. The
              sophisticated blend is perfect for both day and evening wear,
              making it a versatile addition to any fragrance collection.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif mb-6">Key Features</h3>
            {[
              { icon: Award, text: "Long Lasting" },
              { icon: Gift, text: "Premium Quality" },
              { icon: Truck, text: "Luxury Packaging" },
              { icon: Zap, text: "Fast Delivery" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <feature.icon
                  size={20}
                  className="text-amber-500 flex-shrink-0"
                />
                <span className="text-stone-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-20 pt-20 border-t border-white/10">
          <h2 className="text-2xl font-serif mb-12">Fragrance Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Top Notes",
                description: "First impression, fresh and bright",
                examples: "Bergamot, Lemon, Pink Pepper",
              },
              {
                title: "Middle Notes",
                description: "Heart of the fragrance",
                examples: "Rose, Iris, Jasmine, Orchid",
              },
              {
                title: "Base Notes",
                description: "Long-lasting foundation",
                examples: "Sandalwood, Musk, Amber, Vanilla",
              },
            ].map((note, index) => (
              <div
                key={index}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-amber-500/40 transition-all duration-300"
              >
                <h3 className="text-lg font-serif text-amber-500 mb-2">
                  {note.title}
                </h3>
                <p className="text-sm text-stone-400 mb-3">
                  {note.description}
                </p>
                <p className="text-xs text-stone-500 italic">
                  {note.examples}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-20 border-t border-white/10">
            <div className="mb-12">
              <h2 className="text-2xl font-serif mb-2">Related Perfumes</h2>
              <p className="text-stone-400">
                Explore other fragrances from our collection
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[20px] md:rounded-[32px] overflow-hidden hover:bg-white/[0.05] hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-2 shadow-xl cursor-pointer"
                >
                  {/* Image */}
                  <div className="h-[160px] md:h-[280px] overflow-hidden relative">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/60 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold text-amber-500 border border-amber-500/20">
                      {relatedProduct.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-6 space-y-2 md:space-y-4">
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-sm md:text-xl font-serif text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 text-[10px] md:text-xs font-bold">
                        <Star
                          size={10}
                          className="md:w-3 md:h-3"
                          fill="currentColor"
                        />
                        {relatedProduct.rating}
                      </div>
                    </div>

                    <div className="flex flex-col items-start pt-2">
                      <span className="text-sm md:text-2xl font-serif text-amber-500">
                        PKR {relatedProduct.price}
                      </span>
                      <span className="text-xs text-stone-500 line-through">
                        PKR {relatedProduct.oldPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProductDetails;
