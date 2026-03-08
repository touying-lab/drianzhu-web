/**
 * JournalSection Component - THE JOURNAL
 * Design: Elegant blog preview section with featured posts
 * Brand Gold: #C9A227 - Enhanced text weight
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

const BRAND_GOLD = "#C9A227";

const journalPosts = [
  {
    id: 1,
    title: "Reflections on Cross-Border Finance",
    excerpt: "Navigating the complexities of international capital flows in an ever-changing regulatory landscape...",
    date: "January 2026",
    category: "Finance",
  },
  {
    id: 2,
    title: "The Art of Negotiation",
    excerpt: "Lessons learned from decades of bridging Eastern and Western business cultures...",
    date: "December 2025",
    category: "Business",
  },
  {
    id: 3,
    title: "Building Trust Across Borders",
    excerpt: "How authentic relationships form the foundation of successful international partnerships...",
    date: "November 2025",
    category: "Leadership",
  },
];

export default function JournalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation('/journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="journal"
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
        <h2 
          className="font-cinzel text-3xl md:text-4xl text-center tracking-[0.2em] mb-4 font-bold cursor-pointer transition-opacity duration-300 hover:opacity-80" 
          style={{ color: BRAND_GOLD }}
          onClick={handleClick}
        >
          THE JOURNAL
        </h2>
      </motion.div>

      {/* Journal Posts */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onClick={handleClick}
            >
              {/* Category & Date */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-cormorant text-xs tracking-[0.2em] uppercase font-bold" style={{ color: `rgba(201, 162, 39, 0.8)` }}>
                  {post.category}
                </span>
                <span className="w-8 h-px" style={{ backgroundColor: `rgba(201, 162, 39, 0.3)` }} />
                <span className="font-cormorant text-xs flex items-center gap-1 font-semibold" style={{ color: "rgba(245, 245, 245, 0.6)" }}>
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-cormorant-garamond text-xl md:text-2xl mb-3 transition-colors duration-300 font-bold" style={{ color: "#F5F5F5" }}>
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="font-eb-garamond text-base leading-relaxed mb-4 font-medium" style={{ color: "rgba(245, 245, 245, 0.75)" }}>
                {post.excerpt}
              </p>

              {/* Read More */}
              <motion.div
                className="flex items-center gap-2 font-cormorant text-sm transition-colors duration-300 font-semibold"
                style={{ color: `rgba(201, 162, 39, 0.8)` }}
                whileHover={{ x: 5 }}
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>

              {/* Divider */}
              <div className="mt-6 w-full h-px" style={{ background: `linear-gradient(to right, rgba(201, 162, 39, 0.2), transparent)` }} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
