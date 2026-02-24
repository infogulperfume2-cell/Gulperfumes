import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Star,
  X,
  Eye,
  Heart,
  Search,
  Check,
  MessageCircle,
  Facebook,
  Instagram,
  Share2,
  Quote,
  Truck,
  ShieldCheck,
  Coins,
  Award,
  Gift,
  Send,
  Mail,
  Phone,
  MapPin,
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

const Perfume = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState({});
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [openFaq, setOpenFaq] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showFreeDelivery, setShowFreeDelivery] = useState(true);

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = contactForm;
    const mailtoLink = `mailto:info.gulperfume2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  const heroImage = useMemo(
    () =>
      getImage("Fantasticdream") ||
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=500",
    [],
  );
  const markhorImage = useMemo(
    () =>
      getImage("Sultanat") ||
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400",
    [],
  );
  const moonWalkImage = useMemo(
    () =>
      getImage("Dreamscent") ||
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400",
    [],
  );
  const danishImage = useMemo(
    () =>
      getImage("Danish") ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    [],
  );
  const farooqImage = useMemo(
    () =>
      getImage("farookkhan") ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    [],
  );

  // Typing Effect States
  const [heroTitle, setHeroTitle] = useState("");
  const [signatureTitle, setSignatureTitle] = useState("");
  const [timelineTitle, setTimelineTitle] = useState("");

  const heroFullText =
    "Crafting Memories in Every Bottle | The Art of Gul Perfume";
  const signatureFullText = "Experience the Essence of Gul Perfume";
  const timelineFullText = "Our Journey of Scent | A Legacy of Excellence";

  useEffect(() => {
    const type = (text, setter, delay = 50) => {
      let i = 0;
      const timer = setInterval(() => {
        setter(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(timer);
      }, delay);
      return timer;
    };

    const t1 = type(heroFullText, setHeroTitle);
    const t2 = setTimeout(
      () => type(signatureFullText, setSignatureTitle),
      2000,
    );
    const t3 = setTimeout(() => type(timelineFullText, setTimelineTitle), 4000);

    return () => {
      clearInterval(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLike = (id) => {
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleWhatsAppCheckout = (product) => {
    const phoneNumber = "923299509072"; // Replace with your WhatsApp number
    const message = `*New Order Request*
    
*Product:* ${product.name}
*Variant:* ${product.variant}
*Price:* PKR ${product.price}

Please confirm my order.`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const products = useMemo(() => {
    const items = [
      {
        name: "Shehen sha",
        variant: "Royal Essence",
        price: 3000,
        oldPrice: 4000,
        discount: "25% OFF",
      },
      {
        name: "Fantasticdream",
        variant: "Floral Fantasy",
        price: 3200,
        oldPrice: 4200,
        discount: "24% OFF",
      },
      {
        name: "Sultanat",
        variant: "Imperial Oud",
        price: 2900,
        oldPrice: 3900,
        discount: "26% OFF",
      },
      {
        name: "Dreamscent",
        variant: "Mystic Musk",
        price: 3500,
        oldPrice: 4500,
        discount: "22% OFF",
      },
    ];

    return items.map((item, index) => {
      const imageSrc =
        getImage(item.name) ||
        `https://images.unsplash.com/photo-${
          [
            "1541643600914-78b084683601",
            "1594035910387-fea47794261f",
            "1523293182086-7651a899d37f",
            "1592945403244-b3fbafd7f539",
          ][index]
        }?auto=format&fit=crop&q=80&w=400`;

      return {
        id: index + 1,
        ...item,
        rating: 5.0,
        image: imageSrc,
      };
    });
  }, []);

  const faqs = [
    {
      question: "What makes Gul Perfume unique?",
      answer:
        "Our perfumes are crafted with the rarest and most exquisite ingredients from around the world. Each scent is a masterpiece of olfactory art, designed to provide a unique and lasting impression of luxury and elegance.",
    },
    {
      question: "How long does the fragrance last?",
      answer:
        "Gul Perfumes are known for their longevity. Our Eau de Parfum concentrations typically last for 8-10 hours, while our exclusive Extrait de Parfum can last well over 12 hours, depending on skin type and environmental factors.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "We primarily offer express shipping nationwide across Pakistan. For international orders, please contact our support team to discuss availability.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Your satisfaction is our priority. We accept returns for unopened products within 14 days of delivery. Please visit our 'Returns' page for detailed instructions and to initiate a return.",
    },
    {
      question: "Are your products cruelty-free?",
      answer:
        "Absolutely. We are committed to ethical practices. None of our products or the ingredients we use are tested on animals. We believe in beauty without compromise.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-sans selection:bg-amber-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <img
              src={logo}
              alt="Gul Perfume"
              className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
            />
            <div>
              <span className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-amber-200 to-amber-600 bg-clip-text text-transparent">
                Gul Perfume
              </span>
              <p className="text-[9px] text-stone-500 tracking-widest -mt-1 font-bold tracking-tight bg-gradient-to-r from-amber-200 to-amber-600 bg-clip-text text-transparent">
                By dr danishyounas
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400">
            <a
              href="#"
              className="hover:text-amber-500 transition-colors border-b border-amber-500/0 hover:border-amber-500/100 pb-1"
            >
              Home
            </a>
            <a href="#sign" className="hover:text-amber-500 transition-colors">
              Signature Collection
            </a>
            <a href="#time" className="hover:text-amber-500 transition-colors">
              Limited Edition
            </a>
            <a href="#foot" className="hover:text-amber-500 transition-colors">
              About Us
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Search
              size={20}
              className="text-stone-400 cursor-pointer hover:text-amber-500 transition-colors"
            />
            <button
              onClick={() => navigate("/shop")}
              className="hidden md:flex items-center gap-2 border border-white/10 hover:border-amber-500 px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer"
            >
              Shopping
            </button>
            <ShoppingBag
              size={20}
              className="text-stone-400 cursor-pointer hover:text-amber-500 transition-colors"
            />
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-0 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div className="space-y-6 md:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-[1.15] text-white">
                {heroTitle}
                <span className="text-amber-500 animate-pulse">|</span>
              </h1>
              <p className="text-stone-400 text-sm md:text-lg max-w-lg leading-relaxed font-light">
                Discover the essence of luxury at our exclusive outlet. Where
                tradition meets modern elegance, elevating your presence with
                every spray.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <button
                onClick={() => navigate("/shop")}
                className="group bg-amber-500 text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-bold flex items-center gap-3 hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] text-xs md:text-base"
              >
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <ArrowRight
                    size={12}
                    className="text-amber-500 group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
                View All Products
              </button>
              <div className="flex items-center gap-2 text-stone-500">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-black bg-stone-800"
                    ></div>
                  ))}
                </div>
                <span className="text-[10px] font-bold tracking-tighter uppercase tracking-widest">
                  Expert Fragrance Consultants
                </span>
              </div>
            </div>

            <div className="flex gap-4 md:gap-8 pt-2 md:pt-4">
              {[
                { label: "Happy Customers", val: "50k+" },
                { label: "Bottles Sold", val: "20k+" },
                { label: "Years of Excellence", val: "5+" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xl md:text-2xl font-serif text-amber-500">
                    {stat.val}
                  </p>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-stone-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center items-center mt-8 md:mt-0">
            {/* Rotating Golden Circle Backdrop */}
            <div className="absolute w-[110%] h-[110%] border-2 border-amber-500/20 rounded-full animate-[spin_20s_linear_infinite] border-dashed"></div>
            <div className="absolute w-[95%] h-[95%] border border-amber-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full animate-pulse-slow"></div>

            <img
              src={heroImage}
              className="w-[240px] md:w-[300px] lg:w-[480px] object-cover rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-float border border-white/10 relative z-10"
              alt="Hero Bottle"
            />
            {/* Explore Luxury Label at bottom of bottle */}
            <div className="absolute bottom-[-40px] flex items-center gap-4 text-stone-500">
              <div className="w-20 h-[1px] bg-stone-800"></div>
              <span className="text-[10px] uppercase tracking-[0.4em]">
                Explore Luxury Scents
              </span>
              <div className="w-20 h-[1px] bg-stone-800"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE COLLECTION SECTION */}
      <section className="py-32 relative bg-black/50" id="sign">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8 border-b border-stone-900 pb-12">
            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif mb-2 leading-tight">
                {signatureTitle}
                <span className="text-amber-500 animate-pulse">|</span>
              </h2>
            </div>
            <div className="flex-1 max-w-sm space-y-6">
              <p className="text-stone-500 text-sm font-light leading-relaxed">
                Step into a world of refined fragrances. Our Signature
                Collection defines sophistication and lasting allure.
              </p>
              <button
                className="flex items-center gap-3 text-amber-500 text-[10px] font-bold tracking-[0.3em] uppercase group"
                onClick={() => navigate("/shop")}
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <ArrowRight size={14} />
                </div>
                Explore More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[20px] md:rounded-[40px] overflow-hidden hover:bg-white/[0.05] hover:border-amber-500/40 transition-all duration-700 p-3 md:p-5 shadow-2xl"
              >
                {/* Discount Tag */}
                <div className="absolute top-3 left-3 md:top-8 md:left-8 z-10 bg-amber-500/20 backdrop-blur-md text-amber-500 text-[8px] md:text-[9px] font-black px-2 py-1 md:px-4 md:py-1.5 rounded-full border border-amber-500/30 uppercase tracking-tighter">
                  {p.discount}
                </div>

                {/* Image Container */}
                <div className="h-[180px] md:h-[340px] rounded-[15px] md:rounded-[32px] overflow-hidden mb-3 md:mb-6 relative bg-black/40">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                  />

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 md:gap-5">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="p-2 md:p-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-amber-500 hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0"
                    >
                      <Eye size={16} className="md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={() => toggleLike(p.id)}
                      className={`p-2 md:p-4 backdrop-blur-md rounded-full transition-all transform translate-y-4 group-hover:translate-y-0 ${likedProducts[p.id] ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-red-500"}`}
                    >
                      <Heart
                        size={16}
                        className="md:w-5 md:h-5"
                        fill={likedProducts[p.id] ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                </div>

                {/* Text Details */}
                <div className="px-1 md:px-3 space-y-2 md:space-y-3">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-1">
                    <div>
                      <h4 className="font-serif text-sm md:text-xl text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-stone-500 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-medium line-clamp-1">
                        {p.variant}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star
                        size={10}
                        className="md:w-3 md:h-3"
                        fill="currentColor"
                      />
                      <span className="text-[8px] md:text-[10px] font-bold text-stone-300">
                        {p.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center pt-2 md:pt-4 border-t border-white/5 gap-2 md:gap-0">
                    <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2 md:gap-0">
                      <span className="text-lg md:text-2xl font-serif text-amber-500 leading-none">
                        PKR {p.price}
                      </span>
                      <span className="text-[8px] md:text-[10px] text-stone-600 line-through mt-0 md:mt-1 tracking-widest">
                        PKR {p.oldPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate("/shop")}
                      className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 rounded-full border border-amber-500/30 text-[8px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-black hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-4xl rounded-[24px] md:rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 p-2 bg-black/50 text-white rounded-full border border-white/10 hover:border-amber-500 transition-all"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 h-[200px] md:h-auto bg-stone-900 shrink-0">
              <img
                src={selectedProduct.image}
                className="w-full h-full object-cover"
                alt={selectedProduct.name}
              />
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-12 space-y-4 md:space-y-8 flex flex-col justify-center">
              <div className="space-y-1 md:space-y-2">
                <span className="text-amber-500 text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase">
                  {selectedProduct.variant}
                </span>
                <h2 className="text-2xl md:text-4xl font-serif text-white">
                  {selectedProduct.name}
                </h2>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl font-serif text-amber-500">
                  PKR {selectedProduct.price}
                </span>
                <span className="text-sm md:text-lg text-stone-600 line-through">
                  PKR {selectedProduct.oldPrice}
                </span>
              </div>

              <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-light">
                Crafted for the elite, this fragrance defines the pinnacle of
                artisanal luxury. Every note is curated from rare ingredients to
                ensure an unforgettable presence.
              </p>

              <div className="space-y-2 md:space-y-4">
                <div className="flex items-center gap-3 text-[8px] md:text-[10px] text-stone-300 uppercase tracking-widest font-bold">
                  <Check
                    size={12}
                    className="text-amber-500 md:w-3.5 md:h-3.5"
                  />{" "}
                  Free Worldwide Shipping
                </div>
                <div className="flex items-center gap-3 text-[8px] md:text-[10px] text-stone-300 uppercase tracking-widest font-bold">
                  <Check
                    size={12}
                    className="text-amber-500 md:w-3.5 md:h-3.5"
                  />{" "}
                  Exclusive Velvet Packaging
                </div>
              </div>

              <button
                onClick={() => handleWhatsAppCheckout(selectedProduct)}
                className="w-full bg-amber-500 text-black py-3 md:py-5 rounded-full font-bold uppercase tracking-widest hover:bg-amber-400 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2 text-xs md:text-base"
              >
                <MessageCircle size={16} className="md:w-5 md:h-5" />
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TIMELINE SECTION */}
      <section className="py-16 md:py-32 bg-black/30" id="time">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif leading-tight">
                {timelineTitle}
                <span className="text-amber-500 animate-pulse">|</span>
              </h2>
              <p className="text-stone-500 text-sm md:text-lg font-light leading-relaxed">
                From humble beginnings to a renowned perfume outlet, explore how
                Gul Perfume became a symbol of quality and trust.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              <button
                className="bg-amber-500 text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-bold flex items-center gap-3 text-xs md:text-base"
                onClick={() => navigate("/shop")}
              >
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <ArrowRight size={12} className="text-amber-500" />
                </div>
                View Full Details
              </button>
              <div className="space-y-1 text-left">
                <div className="flex gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  5.0{" "}
                  <span className="text-stone-500 font-normal ml-2">
                    2990 Verified Reviews
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-[4/3] bg-gradient-to-br from-stone-900 to-black rounded-[24px] md:rounded-[48px] overflow-hidden border border-white/5 flex items-center justify-center p-6 md:p-12">
              <img
                src={markhorImage}
                className="w-[60%] animate-float shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRADITION & INNOVATION SECTION */}
      <section className="py-16 md:py-32 relative bg-black overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-24 gap-6 md:gap-8">
            <h2 className="text-3xl md:text-5xl font-serif">
              Tradition & Modernity <br /> Blended to Perfection.
            </h2>
            <div className="max-w-xs space-y-4">
              <p className="text-[10px] md:text-xs text-stone-500 leading-relaxed uppercase tracking-widest">
                Unveiling the Artistry Behind Our Scents, Where Heritage Meets
                Contemporary Style.
              </p>
              <button
                className="flex items-center gap-2 text-amber-500 text-[10px] font-bold tracking-widest group"
                onClick={() => navigate("/shop")}
              >
                <div className="p-2 bg-amber-500/10 rounded-full group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <ArrowRight size={14} />
                </div>{" "}
                VIEW FULL DETAILS
              </button>
            </div>
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
            {/* Left Features */}
            <div className="w-full lg:w-1/3 space-y-8 md:space-y-24 z-10 order-2 lg:order-1">
              <div className="text-left lg:text-right group cursor-default relative pl-8 lg:pl-0 lg:pr-12">
                <div className="absolute top-2 left-0 lg:left-auto lg:right-0 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b]"></div>
                <h4 className="text-amber-500 font-serif text-xl md:text-2xl mb-2 md:mb-3">
                  Unmatched Exclusivity
                </h4>
                <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed max-w-none lg:max-w-[260px] ml-0 lg:ml-auto">
                  From the first note to the lasting trail, Gul Perfume
                  redefines what it means to wear true luxury.
                </p>
              </div>

              <div className="text-left lg:text-right group cursor-default relative pl-8 lg:pl-0 lg:pr-12">
                <div className="absolute top-2 left-0 lg:left-auto lg:right-0 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b]"></div>
                <h4 className="text-amber-500 font-serif text-xl md:text-2xl mb-2 md:mb-3">
                  Curated for You
                </h4>
                <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed max-w-none lg:max-w-[260px] ml-0 lg:ml-auto">
                  Our scents unfold like a symphony, with top notes dancing in
                  harmony with heart notes to create a lasting impression.
                </p>
              </div>

              <div className="text-left lg:text-right group cursor-default relative pl-8 lg:pl-0 lg:pr-12">
                <div className="absolute top-2 left-0 lg:left-auto lg:right-0 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b]"></div>
                <h4 className="text-amber-500 font-serif text-xl md:text-2xl mb-2 md:mb-3">
                  Timeless Traditions
                </h4>
                <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed max-w-none lg:max-w-[260px] ml-0 lg:ml-auto">
                  Quality is the hallmark of Gul Perfume. Produced in limited
                  batches to ensure the highest standard of excellence.
                </p>
              </div>
            </div>

            {/* Central Bottle Display */}
            <div className="relative w-full lg:w-1/3 flex justify-center px-4 order-1 lg:order-2 mb-12 lg:mb-0">
              <div className="hidden lg:block absolute inset-0 -z-10 scale-125">
                <svg className="w-full h-full stroke-stone-800" fill="none">
                  <path d="M 50,130 L 150,130" strokeDasharray="6 6" />
                  <path d="M 50,285 L 150,285" strokeDasharray="6 6" />
                  <path d="M 50,440 L 150,440" strokeDasharray="6 6" />
                  <path d="M 350,130 L 450,130" strokeDasharray="6 6" />
                  <path d="M 350,285 L 450,285" strokeDasharray="6 6" />
                  <path d="M 350,440 L 450,440" strokeDasharray="6 6" />
                </svg>
              </div>

              <div className="relative p-4 md:p-6 border border-white/5 rounded-[30px] md:rounded-[40px] bg-gradient-to-b from-stone-900/50 to-transparent shadow-inner">
                <img
                  src={moonWalkImage}
                  className="w-[200px] md:w-[280px] rounded-3xl"
                  alt="Craftsmanship"
                />
                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-center">
                  <button className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[8px] md:text-[9px] font-bold tracking-[0.4em] uppercase hover:border-amber-500 transition-all flex items-center gap-2 whitespace-nowrap">
                    <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></span>
                    Explore Luxury
                  </button>
                </div>
              </div>
            </div>

            {/* Right Features */}
            <div className="w-full lg:w-1/3 space-y-8 md:space-y-24 z-10 order-3">
              <div className="text-left group cursor-default relative pl-8 lg:pl-12">
                <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b]"></div>
                <h4 className="text-amber-500 font-serif text-xl md:text-2xl mb-2 md:mb-3">
                  Masterful Blending
                </h4>
                <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed max-w-none lg:max-w-[260px]">
                  The creation of every Gul Perfume bottle transcends the
                  ordinary, embodying the passion of our master perfumers.
                </p>
              </div>

              <div className="text-left group cursor-default relative pl-8 lg:pl-12">
                <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b]"></div>
                <h4 className="text-amber-500 font-serif text-xl md:text-2xl mb-2 md:mb-3">
                  Premium Ingredients
                </h4>
                <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed max-w-none lg:max-w-[260px]">
                  We source the finest ingredients to ensure every drop of Gul
                  Perfume offers a rich and exquisite experience.
                </p>
              </div>

              <div className="text-left group cursor-default relative pl-8 lg:pl-12">
                <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b]"></div>
                <h4 className="text-amber-500 font-serif text-xl md:text-2xl mb-2 md:mb-3">
                  Lasting Impressions
                </h4>
                <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed max-w-none lg:max-w-[260px]">
                  Our formulations are designed to linger, leaving a memorable
                  trail that defines your presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AWARD SECTION */}
      <section className="py-16 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-stone-900/20 to-black pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/10 aspect-[4/5] md:aspect-square shadow-2xl">
                <div
                  className="w-full h-[115%] -mt-[7.5%]"
                  style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                >
                  <img
                    src={danishImage}
                    alt="Dr. Danish Younas Award"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
                  <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-500 text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase mb-2 md:mb-3">
                    Moment of Pride
                  </div>
                  <h3 className="text-xl md:text-3xl font-serif text-white">
                    Dr. Danish Younas
                  </h3>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 space-y-6 md:space-y-10 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                  Honored by the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                    Governor of Peshawar
                  </span>
                </h2>
                <div className="w-16 h-1 bg-amber-500 mx-auto md:mx-0 rounded-full"></div>
              </div>

              <p className="text-stone-400 text-xs md:text-base leading-relaxed font-light">
                A testament to excellence and dedication. We are proud to
                announce that{" "}
                <strong className="text-white">Dr. Danish Younas</strong> was
                recognized for his outstanding contribution to the art of
                perfumery. This prestigious award symbolizes the passion,
                craftsmanship, and heritage poured into every bottle of Gul
                Perfume.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-6 pt-2">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Award className="text-amber-500 w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-serif text-base md:text-lg">
                      Excellence Award
                    </p>
                    <p className="text-stone-500 text-[10px] uppercase tracking-wider">
                      Governor House Peshawar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAROOQ KHAN SECTION */}
      <section className="py-16 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-stone-900/20 to-black pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/10 aspect-[4/5] md:aspect-square shadow-2xl">
                <div
                  className="w-full h-[115%] -mt-[7.5%]"
                  style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                >
                  <img
                    src={farooqImage}
                    alt="Farooq Khan with Governor"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
                  <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-500 text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase mb-2 md:mb-3">
                    Royal Gifting
                  </div>
                  <h3 className="text-xl md:text-3xl font-serif text-white">
                    Farooq Khan
                  </h3>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 space-y-6 md:space-y-10 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                  A Gift of Elegance to the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                    Governor
                  </span>
                </h2>
                <div className="w-16 h-1 bg-amber-500 mx-auto md:mx-0 rounded-full"></div>
              </div>

              <p className="text-stone-400 text-xs md:text-base leading-relaxed font-light">
                Sharing the essence of luxury.{" "}
                <strong className="text-white">Farooq Khan</strong> presented
                the exquisite Gul Perfume to the Governor, marking a moment of
                appreciation for fine craftsmanship. This gesture highlights the
                prestige and timeless appeal of our signature scents, chosen for
                dignitaries and connoisseurs alike.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-6 pt-2">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Gift className="text-amber-500 w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-serif text-base md:text-lg">
                      Royal Gesture
                    </p>
                    <p className="text-stone-500 text-[10px] uppercase tracking-wider">
                      Symbol of Respect
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-amber-500"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full border border-amber-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber-500 text-[10px] font-bold tracking-[0.4em] uppercase">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Khan",
                role: "Verified Buyer",
                text: "The fragrance is absolutely mesmerizing. It lasts all day and I get so many compliments!",
                rating: 5,
              },
              {
                name: "Ahmed Ali",
                role: "Perfume Enthusiast",
                text: "Packaging is top-notch luxury. The scent profile of 'Sultanat' is unlike anything else.",
                rating: 5,
              },
              {
                name: "Zainab R.",
                role: "Verified Buyer",
                text: "Fast delivery and excellent customer service. The 'Dreamscent' is my new signature scent.",
                rating: 5,
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/5 p-8 rounded-[32px] relative group hover:border-amber-500/30 transition-all hover:-translate-y-2"
              >
                <Quote
                  size={40}
                  className="text-amber-500/20 absolute top-8 right-8"
                />
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-stone-400 text-sm leading-relaxed mb-8 font-light">
                  "{review.text}"
                </p>
                <div>
                  <h4 className="text-white font-serif text-lg">
                    {review.name}
                  </h4>
                  <p className="text-amber-500 text-[10px] uppercase tracking-widest mt-1">
                    {review.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES / DELIVERY INFO SECTION */}
      <section className="py-16 md:py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Fast Delivery */}
            <div className="p-6 md:p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-stone-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-amber-500/30">
                <Truck className="w-6 h-6 md:w-8 md:h-8 text-stone-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-serif text-white mb-3">
                Fast Delivery
              </h3>
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                Your time is precious. We ensure your Gul Perfume reaches you
                swiftly and safely, anywhere in the country.
              </p>
            </div>

            {/* Free Shipping */}
            <div className="p-6 md:p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-stone-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-amber-500/30">
                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-stone-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-serif text-white mb-3">
                Free Shipping
              </h3>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                Indulge without limits. We offer free shipping on all orders,
                bringing the essence of luxury directly to your door.
              </p>
            </div>

            {/* Cash on Delivery */}
            <div className="p-6 md:p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-stone-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-amber-500/30">
                <Coins className="w-6 h-6 md:w-8 md:h-8 text-stone-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <h3 className="text-lg md:text-xl font-serif text-white mb-3">
                Cash on Delivery
              </h3>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                Experience seamless shopping. Pay with ease and confidence upon
                delivery, ensuring your complete satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-serif text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto text-sm md:text-base">
              Have questions? We have answers. If you can't find what you're
              looking for, feel free to contact us.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(
                      openFaq.includes(index)
                        ? openFaq.filter((i) => i !== index)
                        : [...openFaq, index],
                    )
                  }
                  className="w-full flex justify-between items-center text-left p-4 md:p-6"
                >
                  <span className="font-serif text-base md:text-lg text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-amber-500 transition-transform duration-300 ${
                      openFaq.includes(index) ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    openFaq.includes(index)
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-stone-400 text-xs md:text-sm leading-relaxed px-4 md:px-6 pb-4 md:pb-6 font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        className="py-16 md:py-24 relative border-t border-white/5"
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-amber-500 text-[10px] font-bold tracking-[0.4em] uppercase">
                  Contact Us
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                  Let's Discuss Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                    Signature Scent
                  </span>
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed max-w-md font-light">
                  Have questions about our collections or need a personalized
                  recommendation? Our fragrance experts are here to assist you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                    <MapPin
                      className="text-stone-400 group-hover:text-amber-500 transition-colors"
                      size={20}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-lg mb-1">
                      Visit Our Boutique
                    </h4>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Dalazak+Road+near+Tory+kabab+house+Peshawar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 text-sm font-light hover:text-amber-500 transition-colors"
                    >
                      Dalazak Road near Tory kabab house Peshawar
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                    <Mail
                      className="text-stone-400 group-hover:text-amber-500 transition-colors"
                      size={20}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-lg mb-1">
                      Email Us
                    </h4>
                    <p className="text-stone-500 text-sm font-light">
                      info.gulperfume2@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                    <Phone
                      className="text-stone-400 group-hover:text-amber-500 transition-colors"
                      size={20}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-lg mb-1">
                      Call Us
                    </h4>
                    <p className="text-stone-500 text-sm font-light">
                      +92 329 9509072
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-[32px] backdrop-blur-sm">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors placeholder-stone-700"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors placeholder-stone-700"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors placeholder-stone-700"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 focus:outline-none transition-colors resize-none placeholder-stone-700"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
                <button className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-2 group">
                  Send Message
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 md:py-24 bg-black border-t border-white/5"
        id="foot"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-20">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Gul Perfume"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
              <span className="text-2xl md:text-3xl font-serif font-bold text-amber-500">
                Gul Perfume
              </span>
            </div>
            <p className="text-stone-500 text-xs md:text-sm max-w-sm leading-relaxed font-light">
              Indulge in the essence of opulence where luxury meets allure. Our
              exquisite collections are designed to elevate your senses and
              create a lasting impression.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-500 transition-colors cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 bg-stone-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-stone-900/40 p-4 md:p-12 rounded-[24px] md:rounded-[48px] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <ShoppingBag className="w-20 h-20 md:w-[120px] md:h-[120px]" />
              </div>
              <p className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-amber-500 mb-2 md:mb-4">
                Get Update
              </p>
              <h3 className="text-xl md:text-3xl font-serif mb-4 md:mb-8 leading-tight">
                Subscribe For Latest Update
              </h3>
              <div className="flex flex-col md:flex-row gap-2 relative z-10">
                <input
                  className="flex-1 bg-black border border-white/10 rounded-full px-4 py-3 md:px-6 md:py-4 text-xs outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your email address"
                />
                <button className="bg-amber-500 text-black px-6 py-3 md:px-8 md:py-4 rounded-full text-[10px] font-black uppercase hover:bg-amber-400 transition-all tracking-widest whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-20 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-stone-600 border-t border-white/5 mt-10 md:mt-20 gap-4 md:gap-0 text-center md:text-left">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-2 md:mb-0">
            <a href="#" className="hover:text-amber-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-500">
              About Us
            </a>
            <a href="#contact" className="hover:text-amber-500">
              Contact Us
            </a>
          </div>
          <p>Copyright @ 2024 - Developed with Luxury</p>
        </div>
      </footer>

      {/* Free Delivery Floating Label */}
      {showFreeDelivery && (
        <div
          className="fixed left-4 bottom-4 md:left-8 md:bottom-8 z-40 animate-in"
          style={{
            animationDelay: "1s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <div className="relative group cursor-default">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative pl-4 pr-10 py-2 md:pl-6 md:pr-12 md:py-3 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center gap-3 md:gap-4 shadow-2xl">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <Truck size={16} className="md:w-5 md:h-5" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                  Special Offer
                </p>
                <p className="text-white font-serif text-xs md:text-sm whitespace-nowrap">
                  Free Home Delivery
                </p>
              </div>
              <button
                onClick={() => setShowFreeDelivery(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Floating Action Button */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4">
        <div
          className={`flex flex-col gap-3 transition-all duration-300 ${isSocialOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        >
          <a
            href="https://wa.me/923299509072"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.536 0 1.52 1.115 2.988 1.264 3.186.149.198 2.19 3.361 5.27 4.693 2.151.928 2.985.94 4.1.88.84-.046 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/share/17Fvi8s93C/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/gul_perfume2?igsh=amNvdHQwd3hhejhj&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#E4405F] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@gulperfume?_r=1&_t=ZS-94A1DuYKymn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-black border border-white/20 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
        </div>
        {/* WhatsApp Direct Contact Button */}
        <div className="relative group">
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
            Chat with us
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-white"></span>
          </span>
          <a
            href="https://wa.me/923299509072"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.536 0 1.52 1.115 2.988 1.264 3.186.149.198 2.19 3.361 5.27 4.693 2.151.928 2.985.94 4.1.88.84-.046 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </a>
        </div>
        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-amber-400 transition-all"
        >
          {isSocialOpen ? <X size={24} /> : <Share2 size={24} />}
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        
        /* Modal Animation */
        .animate-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `,
        }}
      />
    </div>
  );
};

export default Perfume;
