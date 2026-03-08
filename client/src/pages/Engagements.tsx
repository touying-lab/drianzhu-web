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

const stories: EngagementStory[] = [
  {
    id: 1,
    date: "15TH NOVEMBER 2024",
    month: "November 2024",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/baosaDBiOjEiSvEY.jpg",
    caption: "ADFW 2024 — where global finance converges.",
    description: "Attending the Abu Dhabi Finance Week 2024, engaging with global leaders in finance, investment, and economic policy. A pivotal gathering at the crossroads of East and West.",
  },
  {
    id: 2,
    date: "8TH NOVEMBER 2024",
    month: "",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/WqGhjNGNNiWyPbyE.jpg",
    caption: "At the crossroads of global capital — Abu Dhabi Finance Week.",
    description: "Exploring the evolving landscape of sovereign wealth, private capital, and cross-border investment strategies with fellow delegates from across the globe.",
  },
  {
    id: 3,
    date: "22ND OCTOBER 2024",
    month: "October 2024",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/BkFxCMSNeMaJWckD.jpg",
    caption: "Exploring the frontier of AI and knowledge management.",
    description: "Participating in a forward-looking forum on artificial intelligence and its transformative impact on professional services, legal tech, and cross-border commerce.",
  },
  {
    id: 4,
    date: "10TH SEPTEMBER 2024",
    month: "September 2024",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/iJcOwMmmiPvaTrqL.jpg",
    caption: "Bridging continents at the China-African Entrepreneurs Forum.",
    description: "Keynote engagement at the China-African Entrepreneurs Forum, fostering dialogue on trade, investment, and sustainable development across emerging markets.",
  },
  {
    id: 5,
    date: "28TH AUGUST 2024",
    month: "August 2024",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/iIAraYRLornXxDLE.jpg",
    caption: "Sharing insights on UK financial regulation and risk management.",
    description: "Delivering a presentation on the intricacies of UK financial regulation, compliance frameworks, and risk management strategies for international enterprises.",
  },
  {
    id: 6,
    date: "15TH JULY 2024",
    month: "July 2024",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/AzBYwOkizmicxQfJ.jpg",
    caption: "The art of connection — building bridges one conversation at a time.",
    description: "An intimate networking reception bringing together senior professionals from finance, law, and diplomacy to explore new avenues of cross-border collaboration.",
  },
  {
    id: 7,
    date: "3RD JUNE 2024",
    month: "June 2024",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/exJHvESCBAwbYPlG.jpg",
    caption: "Where East meets West — London's financial heartbeat.",
    description: "Engaging with the City of London's financial community, discussing bilateral investment opportunities and the evolving UK-China economic corridor.",
  },
  {
    id: 8,
    date: "18TH MAY 2024",
    month: "May 2024",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/doytHqneoMTcPWBw.jpg",
    caption: "Life in the fast lane — embracing precision and performance.",
    description: "A moment of personal passion — exploring the intersection of engineering excellence, luxury craftsmanship, and the pursuit of perfection beyond the boardroom.",
  },
];

export default function Engagements() {
  const [, setLocation] = useLocation();
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
          BACK
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
              All Engagements
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
            "Building Global Trust Through Finance, Law and Culture"
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
            GET IN TOUCH
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
