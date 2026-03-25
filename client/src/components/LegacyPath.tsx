/**
 * LegacyPath Component - THE LEGACY PATH
 * Design: Central gold vertical axis with alternating timeline nodes
 * Features: Hover to reveal photos/badges, dynamic medal wall at end
 * Brand Gold: #C9A227 - Enhanced text weight for readability
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";

interface TimelinePhase {
  id: number;
  years: string;
  title: string;
  keywords: string[];
  achievements: string[];
}

const timelineData: TimelinePhase[] = [
  {
    id: 1,
    years: "1998 – 2013",
    title: "Industrial Trade & Cross-Border Supply Chain Management",
    keywords: ["Supply Chain Management", "Technical Implementation", "Strategic Negotiation"],
    achievements: [
      "Eight consecutive Canton Fair sessions, mastering international trade fundamentals",
      "Managed £30M procurement portfolio for Home Products Ltd",
      "Achieved $100M+ printing machinery sales in China over five years",
      "Led Sino-European aviation joint venture negotiations",
      "Managed 60% of 2012 London Olympics mascot order contracts",
    ],
  },
  {
    id: 2,
    years: "2014 – 2017",
    title: "Primary Market Investment & Secondary Market Value Management",
    keywords: ["Capital Operations", "Post-investment Management", "Investor Relations"],
    achievements: [
      "CR Gas (HKG: 1193): Managed ¥4B cross-border treasury system",
      "Contributed to market cap growth to HK$65B within 18 months",
      "Reignwood Group: Assisted in managing £1B UK asset portfolio",
      "Deep involvement in Four Seasons Hotel Trinity Square, Wentworth Golf Club, and VOSS Water acquisitions",
    ],
  },
  {
    id: 3,
    years: "2017 – Present",
    title: "Cross-Border Dispute Resolution & Professional Services",
    keywords: ["Cross-border Restructuring", "Dispute Resolution", "Regulatory Compliance"],
    achievements: [
      "Grant Thornton UK: Led cross-border asset tracing; served 250+ Chinese enterprises",
      "Achieved 727% revenue growth in the practice",
      "Gateley Plc: Leveraged legal structures for cross-border arbitration and compliance",
      "Key projects: HNA restructuring, ABP Royal Docks liquidation, Huawei 5G reputation management, Dezhan Healthcare $300M M&A",
    ],
  },
  {
    id: 4,
    years: "Ongoing",
    title: "Industry Contributions, Social Roles & Professional Qualifications",
    keywords: ["Social Impact", "Intelligence Research", "Academic Authority"],
    achievements: [
      "Eight consecutive years editing and publishing the officially cited 'Tou Ying Tracker' report",
      "Founded 'Tou Ying Academy' to cultivate financial talent",
      "Bromley by Bow Centre recruitment ambassador",
      "Engage with China supporter",
    ],
  },
];

const qualifications = [
  { title: "PhD in Finance", institution: "University of Surrey" },
  { title: "MA in Accounting and Finance", institution: "University of Leeds" },
  { title: "CISI Level 4 Diploma", institution: "Investment Advice" },
];

export default function LegacyPath() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section
      id="architect"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      {/* Section Header */}
      <motion.div
        className="container mx-auto px-6 mb-16 md:mb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-cinzel text-3xl md:text-4xl text-center tracking-[0.2em] mb-4 font-bold" style={{ color: BRAND_GOLD }}>
          {t("legacy.title")}
        </h2>
      </motion.div>

      {/* Timeline Container */}
      <div className="container mx-auto px-6 relative">
        {/* Central Gold Axis - Desktop only */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: `linear-gradient(to bottom, transparent, rgba(201, 162, 39, 0.4), transparent)` }} />

        {/* Timeline Phases */}
        <div className="space-y-16 md:space-y-24">
          {timelineData.map((phase, index) => (
            <motion.div
              key={phase.id}
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredPhase(phase.id)}
              onMouseLeave={() => setHoveredPhase(null)}
            >
              {/* Content Block */}
              <div className="w-full md:w-5/12">
                <span className="font-cinzel text-xs tracking-[0.3em] font-bold" style={{ color: BRAND_GOLD }}>
                  {phase.years}
                </span>
                <h3 className="font-cormorant-garamond text-xl md:text-2xl mt-2 mb-3 font-bold" style={{ color: "#F5F5F5" }}>
                  {phase.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {phase.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="font-cormorant text-xs px-3 py-1 rounded-sm font-semibold"
                      style={{
                        border: `1px solid rgba(201, 162, 39, 0.3)`,
                        color: "rgba(201, 162, 39, 0.7)",
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2">
                  {phase.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="font-eb-garamond text-sm md:text-base leading-relaxed font-medium"
                      style={{ color: "rgba(245, 245, 245, 0.7)" }}
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Central Node */}
              <div className="hidden md:flex w-2/12 justify-center">
                <motion.div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: hoveredPhase === phase.id ? BRAND_GOLD : "rgba(201, 162, 39, 0.4)",
                    boxShadow: hoveredPhase === phase.id ? `0 0 20px ${BRAND_GOLD}` : "none",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Decorative Side - Empty for balance */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </div>

        {/* Qualifications Medal Wall */}
        <motion.div
          className="mt-24 md:mt-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="font-cinzel text-xl md:text-2xl text-center tracking-[0.15em] mb-12 font-bold" style={{ color: BRAND_GOLD }}>
            {t("legacy.qualifications")}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {qualifications.map((qual, index) => (
              <motion.div
                key={qual.title}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
              >
                <div 
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-all duration-300"
                  style={{ 
                    border: `2px solid rgba(201, 162, 39, 0.5)`,
                    backgroundColor: "rgba(19, 34, 56, 0.3)"
                  }}
                >
                  <span className="font-cinzel text-sm md:text-base text-center leading-tight mb-2 font-bold" style={{ color: BRAND_GOLD }}>
                    {qual.title}
                  </span>
                  <span className="font-cormorant text-xs md:text-sm text-center font-medium" style={{ color: "rgba(245, 245, 245, 0.6)" }}>
                    {qual.institution}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA to Insights */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.button
            onClick={() => {
              const el = document.getElementById('insights');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 font-cormorant tracking-[0.2em] transition-colors duration-300 font-semibold"
            style={{ color: `rgba(201, 162, 39, 0.8)` }}
            whileHover={{ y: -3 }}
          >
            <span>{t("legacy.viewInsights")}</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
