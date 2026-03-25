/**
 * AI AVATAR Sub-page
 * Design: Modern tech-feel with horizontal scroll carousel for 6 personas
 * Features: Full-screen carousel, persona details, business logic sections
 * Brand Gold: #C9A227 | Deep Blue: #0D1B2A
 */

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, Sparkles, Brain, Globe, Zap, Target, Users } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";

const personas = [
  {
    name: "The Dealmaker",
    subtitle: "Work & Wealth",
    tagline: "Calm. Efficient. In Control.",
    description: "He navigates the complex, ever-changing business world with absolute rationality — embodying the modern aspiration for financial freedom and professional mastery.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/ySRLcwTWzAKRICTD.jpg",
    icon: Target,
    color: "#1a3a5c",
    accentColor: "#D4AF37",
  },
  {
    name: "The Athlete",
    subtitle: "Sport & Discipline",
    tagline: "Elegant. Strong. Disciplined.",
    description: "More than sport — it is the ultimate pursuit of physical mastery. He represents the elite image of health, vitality, and unwavering self-discipline.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/VdTdSRXBanFsNtcW.jpg",
    icon: Zap,
    color: "#2d5a27",
    accentColor: "#8BC34A",
  },
  {
    name: "The Healer",
    subtitle: "Wellness & Balance",
    tagline: "Grounded. Calm. Balanced.",
    description: "Blending Eastern wellness with Western health management, he offers inner peace and healing to the anxious urban soul — a sanctuary for mind and body.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/ddbUeGEUjLrqdeYE.jpg",
    icon: Sparkles,
    color: "#4a2d6b",
    accentColor: "#CE93D8",
  },
  {
    name: "The Gourmet",
    subtitle: "Taste & Pleasure",
    tagline: "Cultured. Refined. Discerning.",
    description: "Representing the highest form of material enjoyment — not merely a connoisseur of food and drink, but a man with a profound, unique understanding of the art of living.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/dKiSHZSYnbKHVDYa.jpg",
    icon: Globe,
    color: "#5c2a1a",
    accentColor: "#FFAB91",
  },
  {
    name: "The Voyager",
    subtitle: "Global View & Freedom",
    tagline: "Worldly. Visionary. Adventurous.",
    description: "Symbolising the freedom and experience that transcend borders — fulfilling the romantic imagination of being 'on the road', exploring the world with open eyes.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/PZnmHaMiRbURVWKE.jpg",
    icon: Globe,
    color: "#1a3a5c",
    accentColor: "#81D4FA",
  },
  {
    name: "The Charmer",
    subtitle: "Fun & Social",
    tagline: "Playful. Magnetic. The Life of the Party.",
    description: "Fighting boredom and loneliness — he embodies the spirit of entertainment, the joy of releasing pressure, and the art of living fully in the moment.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/palhOUKeUaTOSeLe.jpg",
    icon: Users,
    color: "#1a4a3a",
    accentColor: "#80CBC4",
  },
];

const painPoints = [
  { label: "Stress", solution: "Sport & Wellness", icon: "🏋️" },
  { label: "Boredom", solution: "Entertainment & Travel", icon: "✈️" },
  { label: "Anxiety", solution: "Work & Healing", icon: "🧘" },
  { label: "Loneliness", solution: "Gastronomy & Social", icon: "🍷" },
];

export default function AIAvatar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % personas.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % personas.length);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + personas.length) % personas.length);
  }, [currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const current = personas[currentIndex];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D1B2A" }}>
      <Navigation />

      {/* ===== HERO: Full-Screen Carousel ===== */}
      <section
        ref={carouselRef}
        className="relative h-screen overflow-hidden"
        style={{ backgroundColor: "#050d18" }}
      >
        {/* Animated tech grid background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(201,162,39,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(201,162,39,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `rgba(201, 162, 39, ${0.1 + Math.random() * 0.2})`,
              }}
              animate={{
                y: [0, -40 - Math.random() * 40, 0],
                x: [0, (Math.random() - 0.5) * 20, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Scanning line animation */}
        <motion.div
          className="absolute left-0 right-0 h-px z-10"
          style={{ backgroundColor: `rgba(201, 162, 39, 0.15)` }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Main carousel content */}
        <div className="relative h-full flex items-center z-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Left: Image */}
              <div className="relative flex-shrink-0 w-full lg:w-[45%] flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {/* Glow behind image */}
                    <div
                      className="absolute inset-0 blur-3xl opacity-30 -z-10 scale-110"
                      style={{
                        background: `radial-gradient(circle, ${current.accentColor}40 0%, transparent 70%)`,
                      }}
                    />
                    {/* Hexagonal frame decoration */}
                    <div
                      className="absolute -inset-4 rounded-2xl opacity-30"
                      style={{
                        border: `1px solid ${current.accentColor}`,
                        boxShadow: `0 0 30px ${current.accentColor}20, inset 0 0 30px ${current.accentColor}10`,
                      }}
                    />
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-xl"
                      style={{
                        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${current.accentColor}15`,
                      }}
                    />
                    {/* Corner accents */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: current.accentColor }} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: current.accentColor }} />
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: current.accentColor }} />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: current.accentColor }} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Text */}
              <div className="flex-1 text-center lg:text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {/* Persona number */}
                    <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                      <span
                        className="font-mono text-xs tracking-[0.3em] px-3 py-1 rounded-sm"
                        style={{
                          color: current.accentColor,
                          border: `1px solid ${current.accentColor}40`,
                          backgroundColor: `${current.accentColor}10`,
                        }}
                      >
                        {t("aiPage.persona")} {String(currentIndex + 1).padStart(2, "0")} / {String(personas.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Name */}
                    <h1
                      className="font-cinzel text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] mb-3"
                      style={{ color: BRAND_GOLD }}
                    >
                      {current.name}
                    </h1>

                    {/* Subtitle */}
                    <p
                      className="font-cormorant text-lg md:text-xl tracking-[0.2em] mb-6 font-semibold"
                      style={{ color: `${current.accentColor}CC` }}
                    >
                      {current.subtitle}
                    </p>

                    {/* Tagline */}
                    <p
                      className="font-cormorant-garamond italic text-xl md:text-2xl mb-6 font-medium"
                      style={{ color: "rgba(245, 245, 245, 0.9)" }}
                    >
                      "{current.tagline}"
                    </p>

                    {/* Description */}
                    <p
                      className="font-eb-garamond text-base md:text-lg leading-relaxed max-w-xl font-medium"
                      style={{ color: "rgba(245, 245, 245, 0.65)" }}
                    >
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-1/2 translate-y-1/2 left-4 z-30">
          <motion.button
            onClick={goPrev}
            className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
            style={{
              border: `1px solid rgba(201, 162, 39, 0.3)`,
              backgroundColor: "rgba(13, 27, 42, 0.6)",
              color: BRAND_GOLD,
            }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(201, 162, 39, 0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        </div>
        <div className="absolute bottom-1/2 translate-y-1/2 right-4 z-30">
          <motion.button
            onClick={goNext}
            className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
            style={{
              border: `1px solid rgba(201, 162, 39, 0.3)`,
              backgroundColor: "rgba(13, 27, 42, 0.6)",
              color: BRAND_GOLD,
            }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(201, 162, 39, 0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Bottom: Thumbnail strip + dots */}
        <div className="absolute bottom-8 left-0 right-0 z-30">
          <div className="container mx-auto px-6">
            {/* Thumbnail strip */}
            <div className="flex justify-center gap-3 md:gap-4 mb-4">
              {personas.map((p, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative rounded-lg overflow-hidden transition-all"
                  style={{
                    width: i === currentIndex ? 72 : 56,
                    height: i === currentIndex ? 72 : 56,
                    border: i === currentIndex
                      ? `2px solid ${BRAND_GOLD}`
                      : "2px solid rgba(255,255,255,0.15)",
                    opacity: i === currentIndex ? 1 : 0.5,
                  }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  {i === currentIndex && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        boxShadow: `inset 0 0 15px ${BRAND_GOLD}30`,
                      }}
                      layoutId="activeThumbnail"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="flex justify-center">
              <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: BRAND_GOLD }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentIndex + 1) / personas.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Back to home button */}
        <motion.button
          className="absolute top-28 left-6 z-30 flex items-center gap-2 font-cormorant text-sm tracking-wider font-semibold"
          style={{ color: `rgba(201, 162, 39, 0.6)` }}
          onClick={() => { setLocation("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          whileHover={{ x: -4, color: BRAND_GOLD }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("engagementsPage.back")}
        </motion.button>
      </section>

      {/* ===== SECTION 2: Core Positioning ===== */}
      <CorePositioning />

      {/* ===== SECTION 3: The Six Personas Detail Grid ===== */}
      <PersonaGrid />

      {/* ===== SECTION 4: Business Logic ===== */}
      <BusinessLogic />

      {/* ===== SECTION 5: The Vision ===== */}
      <VisionSection />

      <Footer />
    </div>
  );
}

/* --- Core Positioning Section --- */
function CorePositioning() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,162,39,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <motion.span
            className="inline-block font-mono text-xs tracking-[0.4em] px-4 py-2 rounded-sm mb-8"
            style={{
              color: BRAND_GOLD,
              border: `1px solid rgba(201, 162, 39, 0.3)`,
              backgroundColor: "rgba(201, 162, 39, 0.05)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            COMPOUND ELITE LIFESTYLE IP
          </motion.span>

          <h2
            className="font-cinzel text-3xl md:text-4xl lg:text-5xl tracking-[0.1em] mb-8"
            style={{ color: BRAND_GOLD }}
          >
            The Emotional Projection Model
          </h2>

          <div
            className="w-24 h-px mx-auto mb-8"
            style={{ backgroundColor: `rgba(201, 162, 39, 0.4)` }}
          />

          <p
            className="font-eb-garamond text-lg md:text-xl leading-relaxed mb-8 font-medium"
            style={{ color: "rgba(245, 245, 245, 0.75)" }}
          >
            Dr. Ian Zhu transcends the conventional IP archetype. He is not a pet to be protected, 
            but an <span style={{ color: BRAND_GOLD }}>ideal self to be projected upon</span>. Through six 
            highly recognisable persona characters, he provides a comprehensive 
            "Emotional Shelter" for high-net-worth individuals pursuing excellence.
          </p>

          <motion.p
            className="font-cormorant-garamond italic text-2xl md:text-3xl font-medium"
            style={{ color: BRAND_GOLD }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            "See who I can become."
          </motion.p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-lg backdrop-blur-sm"
              style={{
                border: "1px solid rgba(201, 162, 39, 0.15)",
                backgroundColor: "rgba(201, 162, 39, 0.03)",
              }}
              whileHover={{
                borderColor: "rgba(201, 162, 39, 0.4)",
                backgroundColor: "rgba(201, 162, 39, 0.08)",
              }}
            >
              <span className="text-3xl mb-3 block">{point.icon}</span>
              <p className="font-cormorant text-sm tracking-wider font-semibold mb-1" style={{ color: "rgba(245,245,245,0.5)" }}>
                {point.label}
              </p>
              <div className="w-6 h-px mx-auto my-2" style={{ backgroundColor: `rgba(201, 162, 39, 0.3)` }} />
              <p className="font-cormorant text-sm tracking-wider font-bold" style={{ color: BRAND_GOLD }}>
                {point.solution}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --- Persona Detail Grid --- */
function PersonaGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#081422" }}
    >
      {/* Section header */}
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-cinzel text-3xl md:text-4xl tracking-[0.15em] mb-4"
            style={{ color: BRAND_GOLD }}
          >
            THE SIX PERSONAS
          </h2>
          <p className="font-cormorant text-lg tracking-wider font-semibold" style={{ color: "rgba(245,245,245,0.5)" }}>
            Six facets of the perfect life, six emotional shelters
          </p>
        </motion.div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {personas.map((persona, i) => (
            <motion.div
              key={i}
              className="group relative rounded-xl overflow-hidden"
              style={{
                border: "1px solid rgba(201, 162, 39, 0.12)",
                backgroundColor: "rgba(13, 27, 42, 0.6)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: "rgba(201, 162, 39, 0.35)" }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={persona.image}
                  alt={persona.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(5,13,24,0.95) 0%, rgba(5,13,24,0.3) 50%, transparent 100%)",
                  }}
                />
                {/* Persona icon */}
                <div
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
                  style={{
                    border: `1px solid ${persona.accentColor}50`,
                    backgroundColor: `${persona.accentColor}15`,
                  }}
                >
                  <persona.icon className="w-5 h-5" style={{ color: persona.accentColor }} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 -mt-12 relative z-10">
                <span
                  className="font-mono text-[10px] tracking-[0.3em] mb-2 block"
                  style={{ color: persona.accentColor }}
                >
                  {persona.subtitle.toUpperCase()}
                </span>
                <h3
                  className="font-cinzel text-xl tracking-[0.1em] mb-3"
                  style={{ color: BRAND_GOLD }}
                >
                  {persona.name}
                </h3>
                <p
                  className="font-cormorant-garamond italic text-base mb-3 font-medium"
                  style={{ color: "rgba(245,245,245,0.8)" }}
                >
                  "{persona.tagline}"
                </p>
                <p
                  className="font-eb-garamond text-sm leading-relaxed font-medium"
                  style={{ color: "rgba(245,245,245,0.55)" }}
                >
                  {persona.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Business Logic Section --- */
function BusinessLogic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const pillars = [
    {
      icon: Brain,
      title: "Emotional Demand Coverage",
      description: "This IP system precisely addresses six core pain points of the modern elite: stress, boredom, anxiety, and loneliness. Whatever emotional state a user is in, they can find their 'Emotional Shelter' within the Dr. Ian Zhu matrix.",
    },
    {
      icon: Globe,
      title: "Cross-Industry Extensibility",
      description: "Dr. Ian Zhu is not a single-track IP — he bridges six trillion-level industries. Each character is an independent brand collaboration portal: luxury goods, wellness, sports, gastronomy, travel, and entertainment.",
    },
    {
      icon: Target,
      title: "Differentiated Competitive Moat",
      description: "Unlike emotional toys such as Labubu, Dr. Ian Zhu is a 'Mentor-type' IP with a complete worldview and methodology. He is a dynamic, dependable friend and guide who outputs values and lifestyle philosophy.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(201,162,39,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-cinzel text-3xl md:text-4xl tracking-[0.15em] mb-4"
            style={{ color: BRAND_GOLD }}
          >
            COMMERCIAL VALUE
          </h2>
          <p className="font-cormorant text-lg tracking-wider font-semibold" style={{ color: "rgba(245,245,245,0.5)" }}>
            The business logic behind the Dr. Ian Zhu Virtual IP
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-lg text-center"
              style={{
                border: "1px solid rgba(201, 162, 39, 0.15)",
                backgroundColor: "rgba(201, 162, 39, 0.03)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{
                borderColor: "rgba(201, 162, 39, 0.4)",
                backgroundColor: "rgba(201, 162, 39, 0.06)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  border: `1px solid rgba(201, 162, 39, 0.3)`,
                  backgroundColor: "rgba(201, 162, 39, 0.08)",
                }}
              >
                <pillar.icon className="w-6 h-6" style={{ color: BRAND_GOLD }} />
              </div>
              <h3
                className="font-cinzel text-lg tracking-[0.1em] mb-4"
                style={{ color: BRAND_GOLD }}
              >
                {pillar.title}
              </h3>
              <p
                className="font-eb-garamond text-sm leading-relaxed font-medium"
                style={{ color: "rgba(245, 245, 245, 0.6)" }}
              >
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Vision / Summary Section --- */
function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#081422" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, rgba(201,162,39,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <Sparkles className="w-8 h-8 mx-auto mb-8" style={{ color: BRAND_GOLD }} />

          <h2
            className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] mb-8"
            style={{ color: BRAND_GOLD }}
          >
            THE VISION
          </h2>

          <p
            className="font-eb-garamond text-lg md:text-xl leading-relaxed mb-8 font-medium"
            style={{ color: "rgba(245, 245, 245, 0.7)" }}
          >
            Traditional collectible toys are like the teddy bear on your bedside table — offering comfort and companionship. 
            Dr. Ian Zhu is the <span style={{ color: BRAND_GOLD }}>perfectly tailored suit</span> in your wardrobe 
            and the <span style={{ color: BRAND_GOLD }}>encyclopaedia</span> on your bookshelf — 
            empowering you with strength, confidence, and the wisdom to navigate the world.
          </p>

          <div
            className="w-24 h-px mx-auto mb-8"
            style={{ backgroundColor: `rgba(201, 162, 39, 0.3)` }}
          />

          <motion.p
            className="font-cormorant-garamond italic text-xl md:text-2xl font-medium"
            style={{ color: `rgba(201, 162, 39, 0.7)` }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            "He stands in the spotlight, in six perfect forms, guiding and inspiring you to become 
            that more disciplined, more prosperous, more elegant version of yourself."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
