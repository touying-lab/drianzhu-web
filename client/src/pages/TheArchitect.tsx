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
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const IVORY = "#F5F0E8";

// Data is now generated inside the component to use the translation hook

export default function TheArchitect() {
  const { t } = useLanguage();

  const careerChapters = [
    {
      period: t("architectPage.career.1.period"),
      title: t("architectPage.career.1.title"),
      subtitle: t("architectPage.career.1.subtitle"),
      narrative: t("architectPage.career.1.narrative"),
      highlights: [
        t("architectPage.career.1.h1"),
        t("architectPage.career.1.h2"),
        t("architectPage.career.1.h3"),
        t("architectPage.career.1.h4"),
        t("architectPage.career.1.h5"),
      ],
    },
    {
      period: t("architectPage.career.2.period"),
      title: t("architectPage.career.2.title"),
      subtitle: t("architectPage.career.2.subtitle"),
      narrative: t("architectPage.career.2.narrative"),
      highlights: [
        t("architectPage.career.2.h1"),
        t("architectPage.career.2.h2"),
        t("architectPage.career.2.h3"),
        t("architectPage.career.2.h4"),
      ],
    },
    {
      period: t("architectPage.career.3.period"),
      title: t("architectPage.career.3.title"),
      subtitle: t("architectPage.career.3.subtitle"),
      narrative: t("architectPage.career.3.narrative"),
      highlights: [
        t("architectPage.career.3.h1"),
        t("architectPage.career.3.h2"),
        t("architectPage.career.3.h3"),
        t("architectPage.career.3.h4"),
      ],
    },
    {
      period: t("architectPage.career.4.period"),
      title: t("architectPage.career.4.title"),
      subtitle: t("architectPage.career.4.subtitle"),
      narrative: t("architectPage.career.4.narrative"),
      highlights: [
        t("architectPage.career.4.h1"),
        t("architectPage.career.4.h2"),
        t("architectPage.career.4.h3"),
        t("architectPage.career.4.h4"),
      ],
    },
  ];

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
  const { t } = useLanguage();

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
              {t("architectPage.hero.title")}
            </h1>
            <div className="w-20 h-0.5 mb-8 mx-auto lg:mx-0" style={{ backgroundColor: BRAND_GOLD }} />
            <p className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
              {t("architectPage.hero.intro")}
            </p>
            <p className="font-eb-garamond text-lg mt-6 leading-relaxed font-medium" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
              {t("architectPage.hero.career")}
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
  const { t } = useLanguage();

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
            {t("architectPage.quote")}
          </p>
          <div className="w-12 h-0.5 mx-auto mt-8" style={{ backgroundColor: BRAND_GOLD }} />
        </motion.div>
      </div>
    </section>
  );
}

function CareerChapter({ chapter, index }: { chapter: { period: string; title: string; subtitle: string; narrative: string; highlights: string[] }; index: number }) {
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
  const { t } = useLanguage();

  const qualifications = [
    { degree: t("legacy.qual1.title"), institution: t("legacy.qual1.institution"), detail: t("architectPage.qualifications.1.detail") },
    { degree: t("legacy.qual2.title"), institution: t("legacy.qual2.institution"), detail: t("architectPage.qualifications.2.detail") },
    { degree: t("legacy.qual3.title"), institution: t("legacy.qual3.institution"), detail: t("architectPage.qualifications.3.detail") },
  ];
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
          {t("architectPage.qualifications")}
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
  const { t } = useLanguage();

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
            {t("architectPage.philosophy.title")}
          </h2>
          <p className="font-cormorant-garamond text-2xl md:text-3xl leading-relaxed italic font-semibold" style={{ color: DEEP_BLUE }}>
            {t("architectPage.philosophy.quote")}
          </p>
          <p className="font-eb-garamond text-lg mt-8 leading-relaxed font-medium" style={{ color: "rgba(26, 47, 78, 0.7)" }}>
            {t("architectPage.philosophy.desc")}
          </p>
          <div className="w-12 h-0.5 mx-auto mt-8" style={{ backgroundColor: BRAND_GOLD }} />
        </motion.div>
      </div>
    </section>
  );
}
