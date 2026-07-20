/**
 * Store Page - Old Money Luxury Style
 * Design: Deep royal blue + warm ivory accents, Ralph Lauren inspired
 * Products: Fine wines, whisky, premium Chinese tea, luxury leather goods, branded T-shirts
 * Brand Gold: #C9A227
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";

interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  category: string;
  image: string;
  badge?: string;
}

const categoryKeys = [
  { id: "all", key: "storePage.all" },
  { id: "wine", key: "storePage.wine" },
  { id: "whisky", key: "storePage.whisky" },
  { id: "tea", key: "storePage.tea" },
  { id: "leather", key: "storePage.leather" },
  { id: "apparel", key: "storePage.apparel" },
];

// Products are generated dynamically in the component

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useLanguage();

  const products: Product[] = [
    {
      id: 1,
      name: t("storePage.product.1.name"),
      subtitle: t("storePage.product.1.subtitle"),
      price: "£580",
      category: "wine",
      image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=800&fit=crop",
      badge: "Limited Edition",
    },
    {
      id: 2,
      name: t("storePage.product.2.name"),
      subtitle: t("storePage.product.2.subtitle"),
      price: "£1,850",
      category: "whisky",
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&h=800&fit=crop",
      badge: "Collector's Choice",
    },
    {
      id: 3,
      name: t("storePage.product.3.name"),
      subtitle: t("storePage.product.3.subtitle"),
      price: "£320",
      category: "tea",
      image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=600&h=800&fit=crop",
      badge: "New Arrival",
    },
    {
      id: 4,
      name: t("storePage.product.4.name"),
      subtitle: t("storePage.product.4.subtitle"),
      price: "£850",
      category: "leather",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
    },
    {
      id: 5,
      name: t("storePage.product.5.name"),
      subtitle: t("storePage.product.5.subtitle"),
      price: "£450",
      category: "wine",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=800&fit=crop",
    },
    {
      id: 6,
      name: t("storePage.product.6.name"),
      subtitle: t("storePage.product.6.subtitle"),
      price: "£85",
      category: "apparel",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    },
    {
      id: 7,
      name: t("storePage.product.7.name"),
      subtitle: t("storePage.product.7.subtitle"),
      price: "£180",
      category: "tea",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&h=800&fit=crop",
    },
    {
      id: 8,
      name: t("storePage.product.8.name"),
      subtitle: t("storePage.product.8.subtitle"),
      price: "£980",
      category: "whisky",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&h=800&fit=crop",
    },
    {
      id: 9,
      name: t("storePage.product.9.name"),
      subtitle: t("storePage.product.9.subtitle"),
      price: "£185",
      category: "leather",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop",
    },
    {
      id: 10,
      name: t("storePage.product.10.name"),
      subtitle: t("storePage.product.10.subtitle"),
      price: "£420",
      category: "wine",
      image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=800&fit=crop",
    },
    {
      id: 11,
      name: t("storePage.product.11.name"),
      subtitle: t("storePage.product.11.subtitle"),
      price: "£120",
      category: "apparel",
      image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop",
    },
    {
      id: 12,
      name: t("storePage.product.12.name"),
      subtitle: t("storePage.product.12.subtitle"),
      price: "£450",
      category: "tea",
      image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=600&h=800&fit=crop",
      badge: "Aged Reserve",
    },
  ];
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    toast(`${product.name} — ${t("storePage.comingSoon")}`, {
      description: t("storePage.comingSoonDesc"),
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D1B2A" }}>
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#0D1B2A" }}
      >
        {/* Background texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 50%, rgba(201, 162, 39, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 30%, rgba(139, 90, 43, 0.06) 0%, transparent 50%)
          `,
        }} />

        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px opacity-10" style={{ backgroundColor: BRAND_GOLD }} />
        <div className="absolute bottom-1/3 left-0 w-full h-px opacity-10" style={{ backgroundColor: BRAND_GOLD }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            {/* Decorative crest */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-20 h-px mx-auto mb-6" style={{ backgroundColor: `rgba(201, 162, 39, 0.4)` }} />
              <ShoppingBag className="w-8 h-8 mx-auto" style={{ color: `rgba(201, 162, 39, 0.5)` }} />
            </motion.div>

            <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl tracking-[0.25em] mb-6 font-bold" style={{ color: BRAND_GOLD }}>
              {t("storePage.hero.title")}
            </h1>
            
            <p className="font-cormorant-garamond italic text-xl md:text-2xl mb-4 font-medium" style={{ color: "rgba(245, 245, 245, 0.7)" }}>
              {t("storePage.hero.subtitle")}
            </p>
            
            <p className="font-eb-garamond text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
              {t("storePage.hero.desc")}
            </p>

            <div className="w-20 h-px mx-auto mt-8" style={{ backgroundColor: `rgba(201, 162, 39, 0.4)` }} />
          </motion.div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D1B2A] to-transparent" />
      </section>

      {/* Category Filter */}
      <section className="relative py-8" style={{ backgroundColor: "#0D1B2A" }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categoryKeys.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="font-cormorant text-sm tracking-[0.2em] transition-all duration-300 pb-1 font-semibold"
                style={{
                  color: activeCategory === cat.id ? BRAND_GOLD : "rgba(245, 245, 245, 0.4)",
                  borderBottom: activeCategory === cat.id ? `1px solid ${BRAND_GOLD}` : "1px solid transparent",
                }}
                whileHover={{ y: -2 }}
              >
                {t(cat.key)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section
        ref={gridRef}
        className="relative py-16 md:py-24"
        style={{ backgroundColor: "#0D1B2A" }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            layout
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="font-cormorant-garamond text-xl font-medium" style={{ color: "rgba(245, 245, 245, 0.4)" }}>
                {t("storePage.noProducts")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-24" style={{ backgroundColor: "#132238" }}>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.2em] mb-6 font-bold" style={{ color: BRAND_GOLD }}>
              {t("storePage.bespoke.title")}
            </h2>
            <p className="font-eb-garamond text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-medium" style={{ color: "rgba(245, 245, 245, 0.6)" }}>
              {t("storePage.bespoke.desc")}
            </p>
            <motion.button
              onClick={() => {
                window.location.href = "/contact";
              }}
              className="inline-flex items-center gap-3 font-cormorant tracking-[0.2em] text-sm px-10 py-3 rounded-sm font-semibold transition-all duration-300"
              style={{
                border: `1px solid ${BRAND_GOLD}`,
                color: BRAND_GOLD,
              }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(201, 162, 39, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t("storePage.concierge")}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      onClick={() => onAddToCart(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden mb-5" style={{ backgroundColor: "#132238" }}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ filter: "contrast(1.05) saturate(0.85)" }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(13, 27, 42, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center gap-2 font-cormorant tracking-[0.2em] text-sm font-semibold px-6 py-2 rounded-sm"
            style={{ border: `1px solid ${BRAND_GOLD}`, color: BRAND_GOLD }}
            initial={{ y: 10 }}
            animate={{ y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>COMING SOON</span>
          </motion.div>
        </motion.div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span
              className="font-cormorant text-xs tracking-wider px-3 py-1 font-semibold"
              style={{
                backgroundColor: "rgba(13, 27, 42, 0.85)",
                color: BRAND_GOLD,
                border: `1px solid rgba(201, 162, 39, 0.3)`,
              }}
            >
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="font-cormorant-garamond text-lg font-bold" style={{ color: "#F5F5F5" }}>
            {product.name}
          </h3>
          <span className="font-cinzel text-sm font-bold flex-shrink-0" style={{ color: BRAND_GOLD }}>
            {product.price}
          </span>
        </div>
        <p className="font-cormorant text-sm tracking-wider font-medium" style={{ color: "rgba(245, 245, 245, 0.45)" }}>
          {product.subtitle}
        </p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="mt-4 h-px"
        style={{ backgroundColor: `rgba(201, 162, 39, 0.2)` }}
        animate={{ scaleX: isHovered ? 1 : 0.3, originX: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
