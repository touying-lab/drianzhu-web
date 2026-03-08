/**
 * Footer Component - v4 Update
 * Design: Deep royal blue with three-column layout
 * Features: Real social links, WeChat QR popup, legal page routes, Store route
 * Brand Gold: #C9A227
 */

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Linkedin, Instagram, MessageCircle, X } from "lucide-react";
import { useLocation } from "wouter";

const BRAND_GOLD = "#C9A227";

const quickLinks = [
  { label: "The Architect", href: "/the-architect", type: "route" },
  { label: "Insights", href: "/insights", type: "route" },
  { label: "The Journal", href: "/journal", type: "route" },
  { label: "Engagements", href: "/engagements", type: "route" },
  { label: "AI Avatar", href: "/ai-avatar", type: "route" },
  { label: "Store", href: "/store", type: "route" },
  { label: "Contact", href: "/contact", type: "route" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Settings", href: "/cookie-settings" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [location, setLocation] = useLocation();
  const [showWeChatQR, setShowWeChatQR] = useState(false);

  const handleNavClick = (item: typeof quickLinks[0]) => {
    if (item.type === "route") {
      setLocation(item.href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (location === "/") {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation("/");
      setTimeout(() => {
        const element = document.querySelector(item.href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <>
      <footer
        id="contact"
        ref={ref}
        className="relative pt-16 pb-8"
        style={{ backgroundColor: "#0A1628" }}
      >
        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: `rgba(201, 162, 39, 0.2)` }} />

        <div className="container mx-auto px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
            {/* Left: Logo & Credential */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* Official Badge Logo - Enlarged */}
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/kzpBiaChPeSxGKKS.png" 
                  alt="Dr Ian Zhu Logo" 
                  className="h-24 w-auto"
                  style={{
                    mixBlendMode: "lighten",
                    filter: "brightness(1.35) saturate(1.5) drop-shadow(0 0 12px rgba(201, 162, 39, 0.5)) drop-shadow(0 0 24px rgba(201, 162, 39, 0.25)) drop-shadow(0 0 6px rgba(220, 38, 38, 0.35))",
                  }}
                />
              </div>
              
              {/* Name & Title */}
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/pkDJyJokeELKRFrP.png" 
                alt="Dr Ian Zhu" 
                className="h-8 w-auto mb-3"
                style={{ mixBlendMode: "lighten" }}
              />
              <p className="font-cormorant text-sm leading-relaxed font-semibold" style={{ color: "rgba(245, 245, 245, 0.6)" }}>
                International Sales &<br />
                Cross-Border Dispute Resolution Expert
              </p>
            </motion.div>

            {/* Center: Quick Navigation */}
            <motion.div
              className="md:text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link)}
                    className="block font-cormorant text-sm transition-colors duration-300 tracking-wider font-semibold hover:opacity-80"
                    style={{ color: "rgba(245, 245, 245, 0.6)" }}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Social Icons */}
              <div className="flex justify-start md:justify-center gap-4 mt-6">
                {/* LinkedIn - real link */}
                <motion.a
                  href="https://www.linkedin.com/in/drianzhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300"
                  style={{ 
                    border: `1px solid rgba(201, 162, 39, 0.3)`,
                    color: "rgba(245, 245, 245, 0.6)"
                  }}
                  whileHover={{ scale: 1.1, borderColor: BRAND_GOLD }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
                {/* Instagram - real link */}
                <motion.a
                  href="https://www.instagram.com/drianzhu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300"
                  style={{ 
                    border: `1px solid rgba(201, 162, 39, 0.3)`,
                    color: "rgba(245, 245, 245, 0.6)"
                  }}
                  whileHover={{ scale: 1.1, borderColor: BRAND_GOLD }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
                {/* WeChat - show QR code */}
                <motion.button
                  onClick={() => setShowWeChatQR(true)}
                  className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300"
                  style={{ 
                    border: `1px solid rgba(201, 162, 39, 0.3)`,
                    color: "rgba(245, 245, 245, 0.6)"
                  }}
                  whileHover={{ scale: 1.1, borderColor: BRAND_GOLD }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right: Legal Links */}
            <motion.div
              className="md:text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <nav className="space-y-3">
                {legalLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => { setLocation(link.href); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="block md:ml-auto font-cormorant text-sm transition-colors duration-300 tracking-wider font-medium hover:opacity-80"
                    style={{ color: "rgba(245, 245, 245, 0.4)" }}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              
              {/* Copyright */}
              <p className="font-cormorant text-xs mt-6 tracking-wider font-semibold" style={{ color: "rgba(245, 245, 245, 0.4)" }}>
                © 2026 DR IAN ZHU.<br />
                ALL RIGHTS RESERVED.
              </p>
            </motion.div>
          </div>

          {/* Bottom Tagline */}
          <motion.div
            className="text-center pt-8"
            style={{ borderTop: `1px solid rgba(201, 162, 39, 0.1)` }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-cormorant-garamond italic text-sm tracking-[0.1em] font-medium" style={{ color: `rgba(201, 162, 39, 0.5)` }}>
              "Building Global Trust Through Finance, Law and Culture"
            </p>
          </motion.div>
        </div>
      </footer>

      {/* WeChat QR Code Modal */}
      <AnimatePresence>
        {showWeChatQR && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWeChatQR(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 p-8 rounded-sm max-w-sm mx-4"
              style={{ backgroundColor: "#0D1B2A", border: `1px solid rgba(201, 162, 39, 0.3)` }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowWeChatQR(false)}
                className="absolute top-3 right-3 transition-opacity hover:opacity-80"
                style={{ color: "rgba(245, 245, 245, 0.5)" }}
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-cormorant-garamond text-xl text-center mb-2 font-semibold" style={{ color: BRAND_GOLD }}>
                WeChat Official Account
              </h3>
              <p className="font-cormorant text-sm text-center mb-6" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
                Scan the QR code to follow
              </p>
              <div className="flex justify-center">
                <div className="bg-white p-3 rounded-sm">
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/heFnUCJSEQMsJKjU.jpg"
                    alt="WeChat QR Code"
                    className="w-56 h-56 object-contain"
                  />
                </div>
              </div>
              <p className="font-cormorant text-xs text-center mt-4 tracking-wider" style={{ color: "rgba(245, 245, 245, 0.35)" }}>
                投英 TOU YING
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
