/**
 * AIAvatarSection Component - AI AVATAR (formerly AI PERSONA)
 * Design: Futuristic yet elegant section for AI assistant feature
 * Features: The Dealmaker virtual character as the AI avatar
 * Brand Gold: #C9A227
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";

export default function AIAvatarSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const handleClick = () => {
    setLocation('/ai-avatar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="ai-avatar"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#132238" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(201, 162, 39, 0.2)`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="font-cinzel text-3xl md:text-4xl tracking-[0.2em] font-bold cursor-pointer transition-opacity duration-300 hover:opacity-80" 
              style={{ color: BRAND_GOLD }}
              onClick={handleClick}
            >
              {t("ai.title")}
            </h2>
          </motion.div>

          {/* Main Content - Two Column Layout */}
          <motion.div
            className="relative p-8 md:p-12 rounded-sm backdrop-blur-sm cursor-pointer group"
            style={{ 
              border: `1px solid rgba(201, 162, 39, 0.3)`,
              backgroundColor: "rgba(13, 27, 42, 0.5)"
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={handleClick}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Virtual Character Image */}
              <motion.div
                className="flex-shrink-0"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative">
                  <img 
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/TxzTnnzmPiPAIYPg.png" 
                    alt="The Dealmaker - AI Avatar"
                    className="w-48 h-48 md:w-56 md:h-56 object-contain"
                  />
                  <Sparkles 
                    className="absolute -top-2 -right-2 w-8 h-8 animate-pulse" 
                    style={{ color: BRAND_GOLD }} 
                  />
                  <div 
                    className="absolute inset-0 -z-10 blur-2xl opacity-30"
                    style={{ 
                      background: `radial-gradient(circle, rgba(201, 162, 39, 0.5) 0%, transparent 70%)` 
                    }}
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-cormorant-garamond text-2xl md:text-3xl font-bold mb-4" style={{ color: "#F5F5F5" }}>
                  {t("ai.subtitle")}
                </h3>
                <p className="font-eb-garamond text-lg leading-relaxed mb-8 font-medium" style={{ color: "rgba(245, 245, 245, 0.75)" }}>
                  {t("ai.description")}
                </p>

                {/* CTA Button */}
                <motion.div
                  className="inline-flex items-center gap-3 px-8 py-3 rounded-sm font-cormorant tracking-[0.15em] font-semibold transition-all duration-300"
                  style={{ 
                    border: `1px solid rgba(201, 162, 39, 0.5)`,
                    color: BRAND_GOLD
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{t("ai.cta")}</span>
                </motion.div>
              </div>
            </div>

            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4">
              <span 
                className="font-cormorant text-xs tracking-wider px-3 py-1 rounded-sm font-semibold"
                style={{ 
                  color: `rgba(201, 162, 39, 0.5)`,
                  border: `1px solid rgba(201, 162, 39, 0.3)`
                }}
              >
                {t("ai.comingSoon")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
