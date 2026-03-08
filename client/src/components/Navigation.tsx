/**
 * Navigation Component - v4 Update
 * Design: Transparent background floating over hero section
 * Features: Enlarged official badge logo, noble gold menu items, EN/中 toggle with i18n
 * Brand Gold: #C9A227 (unified across site)
 * Menu: HOME · THE ARCHITECT · INSIGHTS · THE JOURNAL · ENGAGEMENTS · AI AVATAR · STORE · CONTACT
 * Fixed navigation for all pages (home + sub-pages)
 */

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";

const navItems = [
  { label: "HOME", labelCn: "首页", href: "/", type: "route" },
  { label: "THE ARCHITECT", labelCn: "建筑师", href: "/the-architect", type: "route" },
  { label: "INSIGHTS", labelCn: "洞察", href: "/insights", type: "route" },
  { label: "THE JOURNAL", labelCn: "日志", href: "/journal", type: "route" },
  { label: "ENGAGEMENTS", labelCn: "社交活动", href: "/engagements", type: "route" },
  { label: "AI AVATAR", labelCn: "AI 虚拟形象", href: "/ai-avatar", type: "route" },
  { label: "STORE", labelCn: "商店", href: "/store", type: "route" },
  { label: "CONTACT", labelCn: "联系", href: "/contact", type: "route" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);

    if (item.type === "route") {
      setLocation(item.href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // scroll type - if on home page, scroll to section
    if (location === "/") {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation("/");
      setTimeout(() => {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  const getLabel = (item: typeof navItems[0]) => {
    return language === "cn" ? item.labelCn : item.label;
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0D1B2A]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo - Enlarged Official Badge */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => { setLocation("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <div className="relative">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/kzpBiaChPeSxGKKS.png" 
                  alt="Dr Ian Zhu Logo" 
                  className="h-16 lg:h-20 w-auto"
                  style={{
                    mixBlendMode: "lighten",
                    filter: "brightness(1.35) saturate(1.5) drop-shadow(0 0 12px rgba(201, 162, 39, 0.5)) drop-shadow(0 0 24px rgba(201, 162, 39, 0.25)) drop-shadow(0 0 6px rgba(220, 38, 38, 0.35))",
                  }}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`font-cormorant text-[13px] tracking-[0.15em] transition-colors duration-300 font-semibold ${
                    item.label === "AI AVATAR" ? "font-bold" : ""
                  }`}
                  style={{ color: BRAND_GOLD }}
                  whileHover={{ y: -2, opacity: 0.8 }}
                >
                  {getLabel(item)}
                </motion.button>
              ))}
            </div>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setLanguage(language === "en" ? "cn" : "en")}
                className="font-cormorant text-sm tracking-wider transition-colors duration-300 border px-3 py-1 rounded-sm font-semibold"
                style={{ 
                  color: BRAND_GOLD,
                  borderColor: "rgba(201, 162, 39, 0.5)"
                }}
                whileHover={{ scale: 1.05, opacity: 0.8 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === "en" ? "EN / 中" : "中 / EN"}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className="xl:hidden transition-colors"
                style={{ color: BRAND_GOLD }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className={`fixed inset-0 z-30 backdrop-blur-lg xl:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(13, 27, 42, 0.98)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-7 pt-24">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`font-cormorant text-xl tracking-[0.2em] transition-colors duration-300 font-semibold ${
                item.label === "AI AVATAR" ? "font-bold" : ""
              }`}
              style={{ color: BRAND_GOLD }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              {getLabel(item)}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
