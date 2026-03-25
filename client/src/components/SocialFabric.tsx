/**
 * SocialFabric Component - THE SOCIAL FABRIC
 * Design: Ivory/cream background with masonry photo gallery
 * Features: Photo grid with captions, link to Engagements page
 * Brand Gold: #C9A227
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

interface GalleryItem {
  id: number;
  image: string;
  caption: string;
  size: "large" | "medium" | "small";
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/neBpheatDmiDCeXM.jpg",
    caption: "Bridging worlds — a moment of cultural exchange at the highest level.",
    size: "large",
  },
  {
    id: 2,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/EoCVPcOjbVYsltLv.jpg",
    caption: "The art of negotiation — where trust meets strategy.",
    size: "medium",
  },
  {
    id: 3,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/IoJsFXoJTTtbZNvC.jpg",
    caption: "Tou Ying Tracker launch — shaping the narrative of UK-China investment.",
    size: "medium",
  },
  {
    id: 4,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/ZIOpyMlgZhkvrabL.jpg",
    caption: "Knowledge shared is power multiplied — at the podium.",
    size: "large",
  },
  {
    id: 5,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/TxzTnnzmPiPAIYPg.png",
    caption: "The digital frontier — where AI meets human expertise.",
    size: "small",
  },
  {
    id: 6,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/pkDJyJokeELKRFrP.png",
    caption: "A signature built on decades of trust and excellence.",
    size: "small",
  },
  {
    id: 7,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/neBpheatDmiDCeXM.jpg",
    caption: "Global connections forged through genuine relationships.",
    size: "medium",
  },
  {
    id: 8,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/doytHqneoMTcPWBw.jpg",
    caption: "Life in the fast lane — embracing precision and performance.",
    size: "medium",
  },
];

export default function SocialFabric() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <section
      id="engagements"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Section Header */}
      <motion.div
        className="container mx-auto px-6 mb-16 md:mb-24 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 
          className="font-cinzel text-3xl md:text-4xl text-center tracking-[0.2em] mb-4 font-bold cursor-pointer transition-opacity duration-300 hover:opacity-80" 
          style={{ color: "#1A2F4E" }}
          onClick={() => { setLocation('/engagements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          {t("social.title")}
        </h2>
      </motion.div>

      {/* Gallery Grid - Simple Masonry-like Layout */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <GalleryCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA to Engagements */}
      <motion.div
        className="container mx-auto px-6 mt-16 md:mt-24 text-right relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <motion.button
          onClick={() => { setLocation('/engagements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="inline-flex items-center gap-3 font-cormorant tracking-[0.2em] transition-colors duration-300 font-semibold"
          style={{ color: "#1A2F4E", opacity: 0.7 }}
          whileHover={{ opacity: 1, x: 5 }}
        >
          <span>{t("social.explore")}</span>
          <span>→</span>
        </motion.button>
      </motion.div>
    </section>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-sm shadow-lg cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image container - natural aspect ratio */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.caption}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "contrast(1.05) saturate(0.9)" }}
          loading="lazy"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Caption overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        initial={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
      >
        <p className="font-cormorant-garamond italic text-base md:text-lg text-white font-semibold">
          "{item.caption}"
        </p>
      </motion.div>
    </motion.div>
  );
}
