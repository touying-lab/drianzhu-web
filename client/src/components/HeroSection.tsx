/**
 * HeroSection Component
 * Design: Full-screen royal blue background with portrait on left/right
 * Features: Typewriter welcome message, interactive CTA on portrait and signature
 * Animation: Breathing gold line at bottom
 * Brand Gold: #C9A227 - Enhanced text weight
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false);
  const [isHoveringSignature, setIsHoveringSignature] = useState(false);
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const welcomeLines = [
    t("hero.welcome1"),
    t("hero.welcome2"),
    t("hero.welcome3"),
    t("hero.welcome4"),
  ];

  const goToArchitect = () => {
    setLocation("/the-architect");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#132238] to-[#0D1B2A] opacity-50" />

      <div className="relative container mx-auto px-6 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 pt-28 pb-32">
        {/* Portrait Section - Left on desktop */}
        <motion.div
          className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg order-1 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div
            className="relative cursor-pointer group"
            onMouseEnter={() => setIsHoveringPortrait(true)}
            onMouseLeave={() => setIsHoveringPortrait(false)}
            onClick={goToArchitect}
          >
            {/* Portrait with seamless background blend using strong vignette */}
            <div className="relative overflow-hidden">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/neBpheatDmiDCeXM.jpg"
                  alt="Dr. Ian Zhu"
                  className="w-full h-auto object-cover"
                />
                {/* Strong vignette overlay to blend edges with royal blue background */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, #0D1B2A 85%),
                      linear-gradient(to top, #0D1B2A 0%, transparent 25%),
                      linear-gradient(to bottom, #0D1B2A 0%, transparent 15%),
                      linear-gradient(to left, #0D1B2A 0%, transparent 20%),
                      linear-gradient(to right, #0D1B2A 0%, transparent 20%)
                    `,
                  }}
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "rgba(13, 27, 42, 0.15)",
                    mixBlendMode: "multiply",
                  }}
                />
              </motion.div>
              
              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 flex items-end justify-center pb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHoveringPortrait ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-cormorant-garamond italic text-lg tracking-wider px-4 py-2 rounded font-semibold" style={{ color: BRAND_GOLD, backgroundColor: "rgba(13, 27, 42, 0.8)" }}>
                  {t("hero.explore")}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Welcome Message Section - Right on desktop */}
        <motion.div
          className="w-full max-w-lg xl:max-w-xl order-2 lg:order-2 text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {/* Welcome text with typewriter effect */}
          <div className="space-y-4 mb-8">
            {welcomeLines.map((line, index) => (
              <motion.p
                key={index}
                className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed font-semibold"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.3 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Love signature */}
          <motion.p
            className="font-cormorant-garamond italic text-xl mb-4 font-semibold"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.5 }}
          >
            {t("hero.love")}
          </motion.p>

          {/* Golden Gothic Signature - Using image for exact font match */}
          <motion.div
            className="inline-block cursor-pointer"
            onMouseEnter={() => setIsHoveringSignature(true)}
            onMouseLeave={() => setIsHoveringSignature(false)}
            onClick={goToArchitect}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.7 }}
          >
            <motion.img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/pkDJyJokeELKRFrP.png"
              alt="Dr Ian Zhu"
              className="h-10 md:h-12 w-auto"
              whileHover={{ scale: 1.02 }}
              style={{
                mixBlendMode: "lighten",
                filter: isHoveringSignature ? "brightness(1.2)" : "brightness(1)",
                transition: "filter 0.3s ease"
              }}
            />
            <motion.span
              className="block font-cormorant-garamond italic text-sm mt-2 tracking-wider font-semibold"
              style={{ color: BRAND_GOLD }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: isHoveringSignature ? 1 : 0, y: isHoveringSignature ? 0 : -5 }}
              transition={{ duration: 0.2 }}
            >
              {t("hero.clickExplore")}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Breathing Gold Line - Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 3.0 }}
      >
        <span className="font-cormorant text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
          {t("hero.scroll")}
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: `linear-gradient(to bottom, ${BRAND_GOLD}, transparent)` }}
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}
