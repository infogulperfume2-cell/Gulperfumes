import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  MessageCircle,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "./perfume.png";

const Checkout = ({ cart = [], removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [emailError, setEmailError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
    note: "",
  });

  // Calculate total (Price * Quantity)
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(""); // Clear error if valid

    if (cart.length === 0) return;

    setShowConfirmModal(true);
  };

  const confirmOrder = () => {
    setIsPlacingOrder(true);

    const phoneNumber = "923299509072"; // Your WhatsApp number

    let message = `📦 NEW ORDER RECEIVED\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `👤 CUSTOMER DETAILS\n`;
    message += `┣ Name: ${formData.name}\n`;
    message += `┣ Phone: ${formData.phone}\n`;
    message += `┣ Email: ${formData.email}\n`;
    message += `┗ City: ${formData.city} (${formData.postalCode})\n\n`;

    message += `📍 SHIPPING ADDRESS\n`;
    message += ` ${formData.address}\n`;
    message += `📝 Note: ${formData.note}\n\n`;

    message += `🛒 ORDER ITEMS\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.quantity || 1} × PKR ${item.price} = PKR ${item.price * (item.quantity || 1)}\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 TOTAL AMOUNT: PKR ${totalAmount}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `✅ Please confirm my order!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    // Clear cart and form after order is sent
    clearCart();
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      city: "",
      postalCode: "",
      note: "",
    });
    setIsPlacingOrder(false);
    setShowConfirmModal(false);
    setOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans selection:bg-amber-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}
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
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto relative z-10 pt-32 px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Form */}
          {orderSuccess ? (
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 h-fit flex flex-col items-center justify-center text-center">
              <CheckCircle className="text-green-500 w-24 h-24 mb-6" />
              <h2 className="text-3xl font-serif text-white mb-4">
                Thank You!
              </h2>
              <p className="text-stone-400 mb-8 max-w-sm">
                Your order has been successfully placed. We will contact you
                shortly to confirm the details.
              </p>
              <button
                onClick={() => {
                  setOrderSuccess(false);
                  navigate("/shop");
                }}
                className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-400 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-serif text-white mb-2">
                  Secure Checkout
                </h1>
                <p className="text-stone-500 text-sm uppercase tracking-widest">
                  Complete your purchase
                </p>
              </div>

              <form onSubmit={handleWhatsAppOrder} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-transparent border-b border-white/20 p-4 text-white focus:border-amber-500 outline-none transition-colors placeholder-stone-600"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    className={`w-full bg-transparent border-b p-4 text-white focus:border-amber-500 outline-none transition-colors placeholder-stone-600 ${
                      emailError ? "border-red-500" : "border-white/20"
                    }`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (emailError) setEmailError("");
                    }}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-transparent border-b border-white/20 p-4 text-white focus:border-amber-500 outline-none transition-colors placeholder-stone-600"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                      City
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-white/20 p-4 text-white focus:border-amber-500 outline-none transition-colors placeholder-stone-600"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/20 p-4 text-white focus:border-amber-500 outline-none transition-colors placeholder-stone-600"
                      placeholder="ZIP Code"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          postalCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Full Street Address
                  </label>
                  <textarea
                    required
                    rows="3"
                    className="w-full bg-transparent border-b border-white/20 p-4 text-white focus:border-amber-500 outline-none transition-colors resize-none placeholder-stone-600"
                    placeholder="Enter full street address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Order Note (Optional)
                  </label>
                  <textarea
                    rows="2"
                    className="w-full bg-transparent border-b border-white/20 p-4 text-white focus:border-amber-500 outline-none transition-colors resize-none placeholder-stone-600"
                    placeholder="Any special instructions..."
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-400 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle size={20} /> Confirm Order via WhatsApp
                </button>
              </form>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                <ShoppingBag className="text-amber-500" /> Order Summary
              </h2>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="flex items-center gap-2 text-xs text-red-500 hover:text-red-400 transition-colors font-bold uppercase tracking-wider"
                >
                  <Trash2 size={14} />
                  Clear Cart
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <p>Your cart is empty</p>
                <button
                  onClick={() => navigate("/shop")}
                  className="text-amber-500 text-sm font-bold mt-2 hover:underline"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-center bg-white/5 p-3 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-serif text-white">{item.name}</h4>
                        <p className="text-[10px] text-stone-400 uppercase tracking-wider">
                          {item.category || item.variant}{" "}
                          {item.quantity > 1 && `x${item.quantity}`}
                        </p>
                        <p className="text-amber-500 font-bold mt-1">
                          PKR {item.price * (item.quantity || 1)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id || index)}
                        className="p-2 text-stone-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 space-y-3">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal</span>
                    <span>PKR {totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Shipping</span>
                    <span className="text-amber-500">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif text-white pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-amber-500">PKR {totalAmount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div className="space-y-8">
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
          <div className="space-y-8">
            <div className="bg-stone-900/40 p-12 rounded-[48px] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <ShoppingBag size={120} />
              </div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-500 mb-4">
                Get Update
              </p>
              <h3 className="text-3xl font-serif mb-8 leading-tight">
                Subscribe For Latest Update
              </h3>
              <div className="flex gap-2 relative z-10">
                <input
                  className="flex-1 bg-black border border-white/10 rounded-full px-6 py-4 text-xs outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your email address"
                />
                <button className="bg-amber-500 text-black px-8 py-4 rounded-full text-[10px] font-black uppercase hover:bg-amber-400 transition-all tracking-widest">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-stone-600 border-t border-white/5 mt-20">
          <div className="flex gap-10 mb-6 md:mb-0">
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <h3 className="text-2xl font-serif text-white">Confirm Order?</h3>
            <p className="text-stone-400 text-sm">
              Are you sure you want to place this order via WhatsApp?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isPlacingOrder}
                className="px-6 py-3 rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white transition-all text-xs font-bold uppercase tracking-widest disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                disabled={isPlacingOrder}
                className="px-6 py-3 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center w-36 disabled:opacity-70"
              >
                {isPlacingOrder ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Yes, Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
