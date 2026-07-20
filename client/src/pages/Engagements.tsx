/**
 * ENGAGEMENTS Sub-page
 * Design: Inspired by David Beckham's Stories page — clean, editorial, image-first
 * Color palette: Deep royal blue (#0D1B2A) background with gold (#C9A227) accents
 * Maintains brand consistency with the rest of the site
 * Content: THE SOCIAL FABRIC gallery items presented as chronological engagement stories
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const SECTION_BG = "#132238";

interface EngagementStory {
  id: number;
  date: string;
  month: string;
  image: string;
  caption: string;
  description: string;
}

// Stories data is generated inside the component

export default function Engagements() {
  const { t } = useLanguage();

  const stories: EngagementStory[] = [
    {
      id: 1,
      date: t("engagementsPage.story.1.date"),
      month: t("engagementsPage.story.1.month"),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/baosaDBiOjEiSvEY.jpg",
      caption: t("engagementsPage.story.1.caption"),
      description: t("engagementsPage.story.1.description"),
    },
    {
      id: 2,
      date: t("engagementsPage.story.2.date"),
      month: t("engagementsPage.story.2.month"),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/WqGhjNGNNiWyPbyE.jpg",
      caption: t("engagementsPage.story.2.caption"),
      description: t("engagementsPage.story.2.description"),
    },
    {
      id: 3,
      date: t("engagementsPage.story.3.date"),
      month: t("engagementsPage.story.3.month"),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/LgqWwEItvGqDXYtH.jpg",
      caption: t("engagementsPage.story.3.caption"),
      description: t("engagementsPage.story.3.description"),
    },
    {
      id: 4,
      date: t("engagementsPage.story.4.date"),
      month: t("engagementsPage.story.4.month"),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/sJkYnKnvWlqNqPjE.jpg",
      caption: t("engagementsPage.story.4.caption"),
      description: t("engagementsPage.story.4.description"),
    },
    {
      id: 5,
      date: t("engagementsPage.story.5.date"),
      month: t("engagementsPage.story.5.month"),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/yOXXfTqKzKqKzVnI.jpg",
      caption: t("engagementsPage.story.5.caption"),
      description: t("engagementsPage.story.5.description"),
    },
    {
      id: 6,
      date: t("engagementsPage.story.6.date"),
      month: t("engagementsPage.story.6.month"),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/yTfHnKnvWlqNqPjE.jpg",
      caption: t("engagementsPage.story.6.caption"),
      description: t("engagementsPage.story.6.description"),
    },
    {
      id: 7,
      date: t("engagementsPage.story.7.date"),
      month: t("engagementsPage.story.7.month"),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/yOXXfTqKzKqKzVnI.jpg",
      caption: t("engagementsPage.story.7.caption"),
      description: t("engagementsPage.story.7.description"),
    },
    {
      id: 8,
      date: t("engagementsPage.story.8.date"),
      month: t("engagementsPage.story.8.month"),
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/baosaDBiOjEiSvEY.jpg",
      caption: t("engagementsPage.story.8.caption"),
      description: t("engagementsPage.story.8.description"),
    },
  ];
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  // Group stories by month for section headers
  const monthsShown = new Set<string>();

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />

      {/* Hero Header */}
      <section
        ref={headerRef}
        className="relative pt-36 pb-16 md:pt-44 md:pb-24"
        style={{ backgroundColor: DEEP_BLUE }}
      >
        {/* Decorative background glow */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(201, 162, 39, 0.4) 0%, transparent 60%)`
          }} />
        </div>

        {/* Back button */}
        <motion.button
          className="absolute top-28 left-6 z-30 flex items-center gap-2 font-cormorant text-sm tracking-wider font-semibold"
          style={{ color: "rgba(201, 162, 39, 0.5)" }}
          onClick={() => { setLocation("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          whileHover={{ x: -4, color: BRAND_GOLD }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("engagementsPage.back")}
        </motion.button>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-cormorant-garamond text-5xl md:text-6xl lg:text-7xl tracking-[0.05em] font-light"
              style={{ color: BRAND_GOLD }}
            >
              {t("engagementsPage.hero.title")}
            </h1>
            <div className="w-20 h-0.5 mx-auto mt-6" style={{ backgroundColor: `rgba(201, 162, 39, 0.3)` }} />
          </motion.div>
        </div>
      </section>

      {/* Stories Feed */}
      <section className="pb-24 md:pb-32" style={{ backgroundColor: DEEP_BLUE }}>
        <div className="max-w-2xl mx-auto px-6">
          {stories.map((story, index) => {
            const showMonth = story.month && !monthsShown.has(story.month);
            if (story.month) monthsShown.add(story.month);

            return (
              <div key={story.id}>
                {/* Month divider */}
                {showMonth && index > 0 && (
                  <motion.div
                    className="text-center py-16 md:py-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex items-center gap-6 justify-center">
                      <div className="flex-1 h-px max-w-[80px]" style={{ backgroundColor: "rgba(201, 162, 39, 0.2)" }} />
                      <h2
                        className="font-cormorant-garamond text-3xl md:text-4xl font-light tracking-[0.05em]"
                        style={{ color: BRAND_GOLD }}
                      >
                        {story.month}
                      </h2>
                      <div className="flex-1 h-px max-w-[80px]" style={{ backgroundColor: "rgba(201, 162, 39, 0.2)" }} />
                    </div>
                  </motion.div>
                )}

                <StoryEntry story={story} index={index} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <BottomCTA />

      <Footer />
    </div>
  );
}

function StoryEntry({ story, index }: { story: EngagementStory; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      className="mb-16 md:mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Date */}
      <p
        className="text-center font-cormorant text-xs tracking-[0.35em] mb-6 font-semibold"
        style={{ color: "rgba(201, 162, 39, 0.45)" }}
      >
        {story.date}
      </p>

      {/* Image */}
      <motion.div
        className="relative overflow-hidden cursor-pointer group rounded-sm"
        style={{ border: "1px solid rgba(201, 162, 39, 0.1)" }}
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={story.image}
          alt={story.caption}
          className="w-full h-auto transition-all duration-700 group-hover:brightness-[1.05]"
          style={{ filter: "contrast(1.02) saturate(0.95)" }}
          loading="lazy"
        />
      </motion.div>

      {/* Caption */}
      <motion.p
        className="text-center font-cormorant-garamond text-base md:text-lg mt-5 leading-relaxed font-medium px-4"
        style={{ color: "rgba(245, 245, 245, 0.9)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {story.caption}
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-center font-eb-garamond text-sm md:text-base mt-3 leading-relaxed font-normal px-4"
        style={{ color: "rgba(245, 245, 245, 0.5)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {story.description}
      </motion.p>
    </motion.article>
  );
}

function BottomCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="py-20 md:py-28"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-cormorant-garamond italic text-xl md:text-2xl leading-relaxed mb-8 font-medium"
            style={{ color: "rgba(245, 245, 245, 0.85)" }}
          >
            {t("footer.tagline")}
          </p>
          <div
            className="w-16 h-px mx-auto mb-8"
            style={{ backgroundColor: `rgba(201, 162, 39, 0.4)` }}
          />
          <motion.button
            onClick={() => { setLocation("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-cormorant text-sm tracking-[0.25em] px-8 py-3 rounded-sm transition-all duration-300 font-semibold"
            style={{
              color: BRAND_GOLD,
              border: `1px solid rgba(201, 162, 39, 0.4)`,
            }}
            whileHover={{
              backgroundColor: "rgba(201, 162, 39, 0.1)",
              borderColor: "rgba(201, 162, 39, 0.7)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {t("insightsPage.cta.button")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
