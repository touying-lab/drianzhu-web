/**
 * Cookie Settings Page
 * Design: Deep royal blue background, elegant typography with toggle controls
 * Style: Inspired by Beckham official site legal pages
 */

import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BRAND_GOLD = "#C9A227";

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

export default function CookieSettings() {
  const [cookies, setCookies] = useState<CookieCategory[]>([
    {
      id: "essential",
      name: "Essential Cookies",
      description: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.",
      required: true,
      enabled: true,
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
      required: false,
      enabled: true,
    },
    {
      id: "functional",
      name: "Functional Cookies",
      description: "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages.",
      required: false,
      enabled: true,
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      description: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
      required: false,
      enabled: false,
    },
  ]);

  const toggleCookie = (id: string) => {
    setCookies(prev =>
      prev.map(c =>
        c.id === id && !c.required ? { ...c, enabled: !c.enabled } : c
      )
    );
  };

  const handleSave = () => {
    // In a real implementation, this would save preferences
    const saved = cookies.reduce((acc, c) => ({ ...acc, [c.id]: c.enabled }), {});
    localStorage.setItem("cookiePreferences", JSON.stringify(saved));
    window.history.back();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D1B2A" }}>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-cinzel text-3xl md:text-4xl tracking-[0.2em] mb-4 font-bold" style={{ color: BRAND_GOLD }}>
              COOKIE SETTINGS
            </h1>
            <div className="w-24 h-px mx-auto" style={{ backgroundColor: `rgba(201, 162, 39, 0.4)` }} />
            <p className="font-cormorant text-sm tracking-wider mt-4 font-semibold" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
              Manage Your Cookie Preferences
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-eb-garamond text-base leading-relaxed font-medium" style={{ color: "rgba(245, 245, 245, 0.75)" }}>
              We use cookies and similar technologies to help personalise content, tailor and measure ads, and provide a better experience. By clicking "Save Preferences" below, you agree to the use of the cookies you have selected. You can change your preferences at any time by returning to this page.
            </p>
          </motion.div>

          {/* Cookie Categories */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {cookies.map((cookie) => (
              <div
                key={cookie.id}
                className="p-6 rounded-sm"
                style={{
                  border: `1px solid rgba(201, 162, 39, ${cookie.enabled ? '0.3' : '0.15'})`,
                  backgroundColor: "rgba(13, 27, 42, 0.5)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-cormorant-garamond text-lg font-bold" style={{ color: "#F5F5F5" }}>
                    {cookie.name}
                  </h3>
                  
                  {/* Toggle */}
                  <button
                    onClick={() => toggleCookie(cookie.id)}
                    disabled={cookie.required}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      cookie.required ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    }`}
                    style={{
                      backgroundColor: cookie.enabled ? `rgba(201, 162, 39, 0.6)` : "rgba(245, 245, 245, 0.15)",
                    }}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 rounded-full"
                      style={{ backgroundColor: cookie.enabled ? BRAND_GOLD : "rgba(245, 245, 245, 0.5)" }}
                      animate={{ left: cookie.enabled ? "26px" : "2px" }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
                
                <p className="font-eb-garamond text-sm leading-relaxed font-medium" style={{ color: "rgba(245, 245, 245, 0.6)" }}>
                  {cookie.description}
                </p>
                
                {cookie.required && (
                  <span className="inline-block mt-2 font-cormorant text-xs tracking-wider font-semibold" style={{ color: `rgba(201, 162, 39, 0.5)` }}>
                    Always Active
                  </span>
                )}
              </div>
            ))}
          </motion.div>

          {/* Save Button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={handleSave}
              className="font-cormorant tracking-[0.2em] text-sm px-10 py-3 rounded-sm font-semibold transition-all duration-300"
              style={{
                border: `1px solid ${BRAND_GOLD}`,
                color: BRAND_GOLD,
                backgroundColor: "rgba(201, 162, 39, 0.1)",
              }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(201, 162, 39, 0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              SAVE PREFERENCES
            </motion.button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
