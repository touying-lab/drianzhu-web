/**
 * InsightsSection Component - INSIGHTS (Home page preview)
 * Design: Deep royal blue background with featured research highlights
 * Brand Gold: #C9A227 - Enhanced text weight
 * Links to /insights sub-page for full content
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, TrendingUp, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";

export default function InsightsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const insights = [
    {
      icon: FileText,
      title: t("insights.touYing"),
      description: t("insights.touYingDesc"),
      years: t("insights.touYingYears"),
    },
    {
      icon: TrendingUp,
      title: t("insights.mna"),
      description: t("insights.mnaDesc"),
      years: t("insights.mnaYears"),
    },
    {
      icon: Globe,
      title: t("insights.ukChina"),
      description: t("insights.ukChinaDesc"),
      years: t("insights.ukChinaYears"),
    },
  ];

  const handleClick = () => {
    setLocation("/insights");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="insights"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#132238" }}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201, 162, 39, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(201, 162, 39, 0.2) 0%, transparent 50%)`
        }} />
      </div>

      {/* Section Header */}
      <motion.div
        className="container mx-auto px-6 mb-16 md:mb-24 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-cinzel text-3xl md:text-4xl text-center tracking-[0.2em] mb-4 font-bold" style={{ color: BRAND_GOLD }}>
          {t("insights.title")}
        </h2>
      </motion.div>

      {/* Insights Grid */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              className="group relative p-8 rounded-sm backdrop-blur-sm transition-all duration-500 cursor-pointer"
              style={{ 
                border: `1px solid rgba(201, 162, 39, 0.2)`,
                backgroundColor: "rgba(13, 27, 42, 0.5)"
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              onClick={handleClick}
            >
              {/* Icon */}
              <div className="mb-6">
                <insight.icon className="w-10 h-10 transition-colors duration-300" style={{ color: `rgba(201, 162, 39, 0.7)` }} />
              </div>

              {/* Content */}
              <h3 className="font-cinzel text-xl mb-3 tracking-wider font-bold" style={{ color: "#F5F5F5" }}>
                {insight.title}
              </h3>
              <p className="font-eb-garamond text-base leading-relaxed mb-4 font-medium" style={{ color: "rgba(245, 245, 245, 0.8)" }}>
                {insight.description}
              </p>
              <span className="font-cormorant text-sm tracking-wider font-semibold" style={{ color: `rgba(201, 162, 39, 0.7)` }}>
                {insight.years}
              </span>

              {/* Hover accent */}
              <div 
                className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, rgba(201, 162, 39, 0.3), transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            onClick={handleClick}
            className="font-cormorant tracking-[0.2em] text-sm font-semibold transition-colors duration-300"
            style={{ color: `rgba(201, 162, 39, 0.7)` }}
            whileHover={{ y: -2 }}
          >
            {t("insights.viewAll")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
