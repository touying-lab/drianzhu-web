/**
 * Home Page - Dr. Ian Zhu Personal Brand Website
 * 
 * Design Philosophy: Renaissance Court Style
 * - Deep royal blue (#0D1B2A) as primary background
 * - Noble gold (#C9A227) for accents and highlights
 * - Gothic font for signatures (using image)
 * - Cormorant Garamond for elegant body text
 * - Non-symmetrical golden ratio layouts
 * - Breathing gold line as visual anchor
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LegacyPath from "@/components/LegacyPath";
import InsightsSection from "@/components/InsightsSection";
import SocialFabric from "@/components/SocialFabric";
import JournalSection from "@/components/JournalSection";
import AIAvatarSection from "@/components/AIPersonaSection";
import Footer from "@/components/Footer";

// Inline SplashScreen to ensure it works correctly
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#0D1B2A" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.img
        src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/pkDJyJokeELKRFrP.png"
        alt="Dr Ian Zhu"
        className="max-w-[80%] md:max-w-[60%] lg:max-w-[50%] h-auto"
        style={{ mixBlendMode: "lighten" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Preload splash image
  useEffect(() => {
    const img = new Image();
    img.src = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/pkDJyJokeELKRFrP.png";
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D1B2A" }}>
      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Navigation />
        <main>
          <HeroSection />
          <LegacyPath />
          <InsightsSection />
          <SocialFabric />
          <JournalSection />
          <AIAvatarSection />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
