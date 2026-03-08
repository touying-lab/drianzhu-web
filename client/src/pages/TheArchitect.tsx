/**
 * THE ARCHITECT Sub-page
 * Design: Matte ivory/cream background (#F5F0E8) with flowing editorial layout
 * Reference: Beckham-style biographical storytelling
 * Features: Full portrait, narrative sections, professional timeline
 * Brand Gold: #C9A227 | Deep Blue: #0D1B2A
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const IVORY = "#F5F0E8";

const careerChapters = [
  {
    period: "1998 – 2013",
    title: "The Foundation",
    subtitle: "Industrial Trade & Cross-Border Supply Chain Management",
    narrative: `From the bustling halls of the Canton Fair to the boardrooms of London, Dr. Zhu's career began with the raw mechanics of international trade. Over fifteen years, he mastered the art of cross-border supply chain management — negotiating deals worth hundreds of millions, managing procurement portfolios for leading UK firms, and orchestrating complex Sino-European joint ventures.`,
    highlights: [
      "Eight consecutive Canton Fair sessions — mastering international trade from the ground up",
      "Managed £30M procurement portfolio for Home Products Ltd",
      "$100M+ printing machinery sales across China in five years",
      "Led Sino-European aviation joint venture negotiations",
      "Managed 60% of 2012 London Olympics mascot order contracts",
    ],
  },
  {
    period: "2014 – 2017",
    title: "The Ascent",
    subtitle: "Primary Market Investment & Secondary Market Value Management",
    narrative: `Transitioning from trade to finance, Dr. Zhu entered the world of capital markets with the same intensity that defined his earlier career. At CR Gas and Reignwood Group, he managed billions in cross-border treasury operations and contributed to transformative asset acquisitions that reshaped the UK-China investment landscape.`,
    highlights: [
      "CR Gas (HKG: 1193): Managed ¥4B cross-border treasury system",
      "Contributed to market cap growth to HK$65B within 18 months",
      "Reignwood Group: Assisted in managing £1B UK asset portfolio",
      "Deep involvement in Four Seasons Hotel Trinity Square, Wentworth Golf Club, and VOSS Water acquisitions",
    ],
  },
  {
    period: "2017 – Present",
    title: "The Authority",
    subtitle: "Cross-Border Dispute Resolution & Professional Services",
    narrative: `Today, Dr. Zhu stands at the intersection of law, finance, and international diplomacy. At Grant Thornton UK and Gateley Plc, he has led some of the most complex cross-border restructuring and dispute resolution cases in UK-China relations — from the HNA restructuring to Huawei's 5G reputation management.`,
    highlights: [
      "Grant Thornton UK: Led cross-border asset tracing; served 250+ Chinese enterprises",
      "Achieved 727% revenue growth in the practice",
      "Gateley Plc: Leveraged legal structures for cross-border arbitration and compliance",
      "Key projects: HNA restructuring, ABP Royal Docks liquidation, Huawei 5G reputation management, Dezhan Healthcare $300M M&A",
    ],
  },
  {
    period: "Ongoing",
    title: "The Legacy",
    subtitle: "Industry Contributions, Social Roles & Professional Qualifications",
    narrative: `Beyond the boardroom, Dr. Zhu has dedicated himself to building bridges between cultures and nurturing the next generation of cross-border professionals. His annual Tou Ying Tracker report has become the definitive guide to Chinese investment in the UK, officially cited by government bodies and industry leaders alike.`,
    highlights: [
      "Eight consecutive years editing and publishing the officially cited 'Tou Ying Tracker' report",
      "Founded 'Tou Ying Academy' to cultivate financial talent",
      "Bromley by Bow Centre recruitment ambassador",
      "Engage with China supporter",
    ],
  },
];

const qualifications = [
  { degree: "PhD in Finance", institution: "University of Surrey", detail: "Research focus on cross-border investment patterns" },
  { degree: "MA in Accounting and Finance", institution: "University of Leeds", detail: "Foundation in financial theory and practice" },
  { degree: "CISI Level 4 Diploma", institution: "Investment Advice", detail: "Chartered Institute for Securities & Investment" },
];

export default function TheArchitect() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: IVORY }}>
      <Navigation />
      
      {/* Hero Banner */}
      <ArchitectHero />

      {/* Narrative Intro */}
      <NarrativeIntro />

      {/* Career Chapters */}
      {careerChapters.map((chapter, index) => (
        <CareerChapter key={chapter.period} chapter={chapter} index={index} />
      ))}

      {/* Qualifications */}
      <QualificationsSection />

      {/* Philosophy Quote */}
      <PhilosophySection />

      <Footer />
    </div>
  );
}

function ArchitectHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      style={{ backgroundColor: DEEP_BLUE }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Portrait */}
          <motion.div
            className="w-full max-w-md lg:max-w-lg"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="relative">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/EoCVPcOjbVYsltLv.jpg"
                alt="Dr. Ian Zhu"
                className="w-full h-auto rounded-sm"
              />
              {/* Blend overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(to bottom, transparent 70%, ${DEEP_BLUE} 100%),
                    linear-gradient(to right, transparent 80%, ${DEEP_BLUE} 100%)
                  `,
                }}
              />
            </div>
          </motion.div>

          {/* Title & Intro */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] mb-6 font-bold" style={{ color: BRAND_GOLD }}>
              THE ARCHITECT
            </h1>
            <div className="w-20 h-0.5 mb-8 mx-auto lg:mx-0" style={{ backgroundColor: BRAND_GOLD }} />
            <p className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
              Dr. Ian Zhu — International Sales Expert, Cross-Border Dispute Resolution Specialist, 
              and a bridge between Eastern and Western business worlds.
            </p>
            <p className="font-eb-garamond text-lg mt-6 leading-relaxed font-medium" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              A career spanning three decades, three continents, and countless deals 
              that have shaped the landscape of UK-China business relations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NarrativeIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: IVORY }}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cormorant-garamond text-2xl md:text-3xl leading-relaxed font-semibold" style={{ color: DEEP_BLUE }}>
            "Every deal tells a story. Every negotiation reveals character. 
            Every bridge built between cultures creates lasting value."
          </p>
          <div className="w-12 h-0.5 mx-auto mt-8" style={{ backgroundColor: BRAND_GOLD }} />
        </motion.div>
      </div>
    </section>
  );
}

function CareerChapter({ chapter, index }: { chapter: typeof careerChapters[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="py-16 md:py-24"
      style={{ backgroundColor: isEven ? IVORY : "#EDE8DF" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Period & Title */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-cinzel text-sm tracking-[0.3em] font-bold" style={{ color: BRAND_GOLD }}>
              {chapter.period}
            </span>
            <h2 className="font-cinzel text-3xl md:text-4xl mt-3 mb-2 font-bold" style={{ color: DEEP_BLUE }}>
              {chapter.title}
            </h2>
            <p className="font-cormorant-garamond text-xl md:text-2xl italic font-semibold" style={{ color: "rgba(26, 47, 78, 0.7)" }}>
              {chapter.subtitle}
            </p>
          </motion.div>

          {/* Narrative */}
          <motion.p
            className="font-eb-garamond text-lg md:text-xl leading-[1.8] mb-10 font-medium"
            style={{ color: "rgba(26, 47, 78, 0.85)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {chapter.narrative}
          </motion.p>

          {/* Highlights */}
          <motion.div
            className="pl-6 space-y-4"
            style={{ borderLeft: `2px solid ${BRAND_GOLD}` }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {chapter.highlights.map((highlight, i) => (
              <motion.p
                key={i}
                className="font-eb-garamond text-base md:text-lg leading-relaxed font-medium"
                style={{ color: "rgba(26, 47, 78, 0.75)" }}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                {highlight}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QualificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: DEEP_BLUE }}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="font-cinzel text-3xl md:text-4xl text-center tracking-[0.15em] mb-16 font-bold"
          style={{ color: BRAND_GOLD }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          QUALIFICATIONS
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualifications.map((qual, index) => (
            <motion.div
              key={qual.degree}
              className="text-center p-8 rounded-sm"
              style={{ border: `1px solid rgba(201, 162, 39, 0.3)` }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="font-cinzel text-lg mb-2 font-bold" style={{ color: BRAND_GOLD }}>
                {qual.degree}
              </h3>
              <p className="font-cormorant-garamond text-base mb-3 font-semibold" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                {qual.institution}
              </p>
              <p className="font-eb-garamond text-sm font-medium" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                {qual.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: IVORY }}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] mb-8 font-bold" style={{ color: DEEP_BLUE }}>
            PHILOSOPHY
          </h2>
          <p className="font-cormorant-garamond text-2xl md:text-3xl leading-relaxed italic font-semibold" style={{ color: DEEP_BLUE }}>
            "Building Global Trust Through Finance, Law and Culture"
          </p>
          <p className="font-eb-garamond text-lg mt-8 leading-relaxed font-medium" style={{ color: "rgba(26, 47, 78, 0.7)" }}>
            In a world of increasing complexity, Dr. Zhu believes that genuine trust — built through 
            deep cultural understanding, professional excellence, and personal integrity — remains 
            the most valuable currency in international business.
          </p>
          <div className="w-12 h-0.5 mx-auto mt-8" style={{ backgroundColor: BRAND_GOLD }} />
        </motion.div>
      </div>
    </section>
  );
}
