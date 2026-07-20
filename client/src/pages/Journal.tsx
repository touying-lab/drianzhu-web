/**
 * THE JOURNAL Sub-page
 * Design: Deep royal blue (#0D1B2A) + gold (#C9A227) brand palette
 * Features: Article list view with featured hero, article detail view
 * Content: Dr. Zhu's thought leadership articles and seasonal messages
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const SECTION_BG = "#132238";

interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content: ArticleSection[];
  source: string;
}

interface ArticleSection {
  type: "paragraph" | "heading" | "quote" | "list";
  text: string;
  items?: string[];
}

function useArticles() {
  const { t } = useLanguage();
  return [
  {
    id: "1",
    slug: "2026-new-year-message",
    title: t("journalPage.article1.title"),
    subtitle: t("journalPage.article1.subtitle"),
    date: t("journalPage.article1.date"),
    readTime: t("journalPage.article1.readTime"),
    category: t("journalPage.article1.category"),
    // keep excerpt in English as it is a direct quote from the article
    excerpt: t("journalPage.article1.excerpt"),
    coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
    source: "https://mp.weixin.qq.com/s/jJ8Va5-XbCApDl9SepR3Ow",
    content: [
      { type: "heading", text: t("journalPage.article1.c1") },
      { type: "paragraph", text: t("journalPage.article1.c2") },
      { type: "paragraph", text: t("journalPage.article1.c3") },
      { type: "paragraph", text: t("journalPage.article1.c4") },
      { type: "heading", text: t("journalPage.article1.c5") },
      { type: "paragraph", text: t("journalPage.article1.c6") },
      { type: "quote", text: t("journalPage.article1.c7") },
      { type: "paragraph", text: t("journalPage.article1.c8") },
      { type: "heading", text: t("journalPage.article1.c9") },
      { type: "paragraph", text: t("journalPage.article1.c10") },
      { type: "paragraph", text: t("journalPage.article1.c11") },
      { type: "heading", text: t("journalPage.article1.c12") },
      { type: "paragraph", text: t("journalPage.article1.c13") },
      { type: "paragraph", text: t("journalPage.article1.c14") },
      { type: "quote", text: t("journalPage.article1.c15") },
      { type: "paragraph", text: t("journalPage.article1.c16") },
    ] as ArticleSection[],
  },
  {
    id: "2",
    slug: "grant-thornton-gateley-appointment",
    title: t("journalPage.article2.title"),
    subtitle: t("journalPage.article2.subtitle"),
    date: t("journalPage.article2.date"),
    readTime: t("journalPage.article2.readTime"),
    category: t("journalPage.article2.category"),
    excerpt: t("journalPage.article2.excerpt"),
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    source: "https://mp.weixin.qq.com/s/tZvJ18VHOn-ibWh1Nf19_A",
    content: [
      { type: "paragraph", text: t("journalPage.article2.c1") },
      { type: "paragraph", text: t("journalPage.article2.c2") },
      { type: "heading", text: t("journalPage.article2.c3") },
      { type: "paragraph", text: t("journalPage.article2.c4") },
      { type: "paragraph", text: t("journalPage.article2.c5") },
      { type: "heading", text: t("journalPage.article2.c6") },
      { type: "paragraph", text: t("journalPage.article2.c7") },
      { type: "list", text: t("journalPage.article2.c8"), items: [
        t("journalPage.article2.c9"),
        t("journalPage.article2.c10"),
        t("journalPage.article2.c11"),
        t("journalPage.article2.c12"),
        t("journalPage.article2.c13"),
      ]},
      { type: "heading", text: t("journalPage.article2.c14") },
      { type: "paragraph", text: t("journalPage.article2.c15") },
      { type: "list", text: t("journalPage.article2.c16"), items: [
        t("journalPage.article2.c17"),
        t("journalPage.article2.c18"),
      ]},
      { type: "heading", text: t("journalPage.article2.c19") },
      { type: "paragraph", text: t("journalPage.article2.c20") },
      { type: "list", text: "", items: [
        t("journalPage.article2.c21"),
        t("journalPage.article2.c22"),
        t("journalPage.article2.c23"),
      ]},
    ] as ArticleSection[],
  },
  {
    id: "3",
    slug: "sino-european-summit-2025",
    title: t("journalPage.article3.title"),
    subtitle: t("journalPage.article3.subtitle"),
    date: t("journalPage.article3.date"),
    readTime: t("journalPage.article3.readTime"),
    category: t("journalPage.article3.category"),
    excerpt: t("journalPage.article3.excerpt"),
    coverImage: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&q=80",
    source: "https://mp.weixin.qq.com/s/R2yavsOl5QPe-4mpanD-Og",
    content: [
      { type: "paragraph", text: t("journalPage.article3.c1") },
      { type: "paragraph", text: t("journalPage.article3.c2") },
      { type: "heading", text: t("journalPage.article3.c3") },
      { type: "paragraph", text: t("journalPage.article3.c4") },
      { type: "paragraph", text: t("journalPage.article3.c5") },
      { type: "heading", text: t("journalPage.article3.c6") },
      { type: "quote", text: t("journalPage.article3.c7") },
      { type: "paragraph", text: t("journalPage.article3.c8") },
      { type: "list", text: t("journalPage.article3.c9"), items: [
        t("journalPage.article3.c10"),
        t("journalPage.article3.c11"),
        t("journalPage.article3.c12"),
      ]},
      { type: "heading", text: t("journalPage.article3.c13") },
      { type: "paragraph", text: t("journalPage.article3.c14") },
      { type: "list", text: "", items: [
        t("journalPage.article3.c15"),
        t("journalPage.article3.c16"),
        t("journalPage.article3.c17"),
        t("journalPage.article3.c18"),
        t("journalPage.article3.c19"),
        t("journalPage.article3.c20"),
        t("journalPage.article3.c21"),
      ]},
      { type: "heading", text: t("journalPage.article3.c22") },
      { type: "paragraph", text: t("journalPage.article3.c23") },
      { type: "quote", text: t("journalPage.article3.c24") },
    ] as ArticleSection[],
  },
];
}

// placeholder — real articles are built by useArticles() hook above
const articles: JournalArticle[] = [];

// ===== JOURNAL LIST PAGE =====
function JournalList() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const allArticles = useArticles();
  const featured = allArticles[0];
  const rest = allArticles.slice(1);

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />

      {/* Hero Header */}
      <section ref={headerRef} className="relative pt-36 pb-12 md:pt-44 md:pb-16" style={{ backgroundColor: DEEP_BLUE }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(201, 162, 39, 0.3) 0%, transparent 50%)`
          }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-cormorant text-xs tracking-[0.4em] mb-4 font-semibold" style={{ color: "rgba(201, 162, 39, 0.5)" }}>
              {t("journalPage.thoughtsLabel")}
            </p>
            <h1 className="font-cormorant-garamond text-5xl md:text-6xl lg:text-7xl tracking-[0.03em] font-light" style={{ color: BRAND_GOLD }}>
              {t("journalPage.hero.title")}
            </h1>
            <div className="w-20 h-0.5 mt-6" style={{ backgroundColor: `rgba(201, 162, 39, 0.3)` }} />
            <p className="font-eb-garamond text-base md:text-lg mt-6 leading-relaxed max-w-xl" style={{ color: "rgba(245, 245, 245, 0.55)" }}>
              {t("journalPage.hero.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="pb-16 md:pb-20" style={{ backgroundColor: DEEP_BLUE }}>
        <div className="container mx-auto px-6">
          <FeaturedCard article={featured} />
        </div>
      </section>

      {/* Article Grid */}
      <section className="pb-24 md:pb-32" style={{ backgroundColor: SECTION_BG }}>
        <div className="container mx-auto px-6 pt-16 md:pt-20">
          <motion.p
            className="font-cormorant text-xs tracking-[0.4em] mb-10 font-semibold"
            style={{ color: "rgba(201, 162, 39, 0.4)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("journalPage.recentLabel")}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {rest.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeaturedCard({ article }: { article: JournalArticle }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <motion.article
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm cursor-pointer group"
      style={{ border: "1px solid rgba(201, 162, 39, 0.12)", backgroundColor: SECTION_BG }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      onClick={() => { setLocation(`/journal/${article.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      whileHover={{ y: -3 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(19, 34, 56, 0.6) 100%)" }} />
        <div className="absolute top-4 left-4">
          <span className="font-cormorant text-[10px] tracking-[0.3em] px-3 py-1 font-semibold" style={{ color: BRAND_GOLD, backgroundColor: "rgba(13, 27, 42, 0.8)", border: "1px solid rgba(201, 162, 39, 0.25)" }}>
            {t("journalPage.featured")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-cormorant text-[10px] tracking-[0.3em] font-semibold" style={{ color: "rgba(201, 162, 39, 0.5)" }}>
            {article.category.toUpperCase()}
          </span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(201, 162, 39, 0.3)" }} />
          <span className="font-cormorant text-[10px] tracking-[0.2em] font-semibold flex items-center gap-1.5" style={{ color: "rgba(245, 245, 245, 0.35)" }}>
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
        </div>

        <h2 className="font-cormorant-garamond text-2xl md:text-3xl font-light leading-tight mb-2 transition-colors duration-300 group-hover:opacity-90" style={{ color: "rgba(245, 245, 245, 0.95)" }}>
          {article.title}
        </h2>
        <p className="font-cormorant text-base font-medium mb-5" style={{ color: BRAND_GOLD }}>
          {article.subtitle}
        </p>
        <p className="font-eb-garamond text-sm leading-relaxed mb-6" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 font-cormorant text-xs tracking-[0.2em] font-semibold transition-all duration-300 group-hover:gap-3" style={{ color: BRAND_GOLD }}>
          {t("journalPage.readArticle")} <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.article>
  );
}

function ArticleCard({ article, index }: { article: JournalArticle; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <motion.article
      ref={ref}
      className="overflow-hidden rounded-sm cursor-pointer group"
      style={{ border: "1px solid rgba(201, 162, 39, 0.1)", backgroundColor: "rgba(13, 27, 42, 0.6)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => { setLocation(`/journal/${article.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13, 27, 42, 0.7) 0%, transparent 50%)" }} />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="font-cormorant text-[10px] tracking-[0.3em] px-2 py-0.5 font-semibold" style={{ color: BRAND_GOLD, backgroundColor: "rgba(13, 27, 42, 0.7)" }}>
            {article.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 mb-3">
          <span className="font-cormorant text-[10px] tracking-[0.2em] font-semibold flex items-center gap-1.5" style={{ color: "rgba(245, 245, 245, 0.35)" }}>
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(201, 162, 39, 0.3)" }} />
          <span className="font-cormorant text-[10px] tracking-[0.2em] font-semibold flex items-center gap-1.5" style={{ color: "rgba(245, 245, 245, 0.35)" }}>
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>

        <h3 className="font-cormorant-garamond text-xl md:text-2xl font-light leading-tight mb-2 transition-colors duration-300 group-hover:opacity-90" style={{ color: "rgba(245, 245, 245, 0.95)" }}>
          {article.title}
        </h3>
        <p className="font-cormorant text-sm font-medium mb-4" style={{ color: BRAND_GOLD }}>
          {article.subtitle}
        </p>
        <p className="font-eb-garamond text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: "rgba(245, 245, 245, 0.45)" }}>
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 font-cormorant text-xs tracking-[0.2em] font-semibold transition-all duration-300 group-hover:gap-3" style={{ color: BRAND_GOLD }}>
          {t("journalPage.readMore")} <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.article>
  );
}

// ===== ARTICLE DETAIL PAGE =====
function ArticleDetail({ slug }: { slug: string }) {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const allArticles = useArticles();
  const article = allArticles.find((a) => a.slug === slug);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: DEEP_BLUE }}>
        <Navigation />
        <div className="text-center">
          <h1 className="font-cormorant-garamond text-3xl mb-4" style={{ color: BRAND_GOLD }}>{t("journalPage.notFound")}</h1>
          <button onClick={() => setLocation("/journal")} className="font-cormorant text-sm tracking-wider" style={{ color: BRAND_GOLD }}>
            ← {t("journalPage.back")}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Find next article
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const nextArticle = allArticles[(currentIndex + 1) % allArticles.length];

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />

      {/* Hero Cover */}
      <section ref={headerRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13, 27, 42, 1) 0%, rgba(13, 27, 42, 0.6) 40%, rgba(13, 27, 42, 0.3) 100%)" }} />

        {/* Back button */}
        <motion.button
          className="absolute top-28 left-6 z-30 flex items-center gap-2 font-cormorant text-sm tracking-wider font-semibold"
          style={{ color: "rgba(201, 162, 39, 0.6)" }}
          onClick={() => { setLocation("/journal"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          whileHover={{ x: -4, color: BRAND_GOLD }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("journalPage.allArticles")}
        </motion.button>

        {/* Article Header */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 pb-12 md:pb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-cormorant text-[10px] tracking-[0.3em] px-3 py-1 font-semibold" style={{ color: BRAND_GOLD, border: "1px solid rgba(201, 162, 39, 0.3)" }}>
                  {article.category.toUpperCase()}
                </span>
                <span className="font-cormorant text-[10px] tracking-[0.2em] font-semibold flex items-center gap-1.5" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
                  <Calendar className="w-3 h-3" />
                  {article.date}
                </span>
                <span className="font-cormorant text-[10px] tracking-[0.2em] font-semibold flex items-center gap-1.5" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
              <h1 className="font-cormorant-garamond text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-3" style={{ color: "rgba(245, 245, 245, 0.95)" }}>
                {article.title}
              </h1>
              <p className="font-cormorant text-lg md:text-xl font-medium" style={{ color: BRAND_GOLD }}>
                {article.subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Article Body */}
      <section className="py-16 md:py-24" style={{ backgroundColor: DEEP_BLUE }}>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            {article.content.map((section, idx) => (
              <ContentBlock key={idx} section={section} index={idx} />
            ))}

            {/* Source link */}
            <motion.div
              className="mt-16 pt-8"
              style={{ borderTop: "1px solid rgba(201, 162, 39, 0.15)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-cormorant text-xs tracking-[0.2em] font-semibold mb-2" style={{ color: "rgba(201, 162, 39, 0.4)" }}>
                {t("journalPage.originalSource")}
              </p>
              <a
                href={article.source}
                target="_blank"
                rel="noopener noreferrer"
                className="font-eb-garamond text-sm underline underline-offset-4 transition-colors duration-300 hover:opacity-80"
                style={{ color: "rgba(245, 245, 245, 0.5)" }}
              >
                {t("journalPage.readOnWechat")}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next Article */}
      {nextArticle && nextArticle.id !== article.id && (
        <section className="py-16 md:py-20" style={{ backgroundColor: SECTION_BG }}>
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <p className="font-cormorant text-xs tracking-[0.4em] mb-6 font-semibold" style={{ color: "rgba(201, 162, 39, 0.4)" }}>
                {t("journalPage.nextArticle")}
              </p>
              <motion.div
                className="cursor-pointer group"
                onClick={() => { setLocation(`/journal/${nextArticle.slug}`); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                whileHover={{ x: 8 }}
              >
                <h3 className="font-cormorant-garamond text-2xl md:text-3xl font-light leading-tight mb-2 transition-colors duration-300 group-hover:opacity-80" style={{ color: "rgba(245, 245, 245, 0.9)" }}>
                  {nextArticle.title}
                </h3>
                <p className="font-cormorant text-sm font-medium" style={{ color: BRAND_GOLD }}>
                  {nextArticle.subtitle}
                </p>
                <div className="flex items-center gap-2 mt-4 font-cormorant text-xs tracking-[0.2em] font-semibold transition-all duration-300 group-hover:gap-3" style={{ color: BRAND_GOLD }}>
                  {t("journalPage.readArticle")} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function ContentBlock({ section, index }: { section: ArticleSection; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (section.type === "heading") {
    return (
      <motion.h2
        ref={ref}
        className="font-cormorant-garamond text-2xl md:text-3xl font-light mt-12 mb-6"
        style={{ color: BRAND_GOLD }}
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {section.text}
      </motion.h2>
    );
  }

  if (section.type === "quote") {
    return (
      <motion.blockquote
        ref={ref}
        className="my-8 pl-6 py-4"
        style={{ borderLeft: `2px solid rgba(201, 162, 39, 0.4)` }}
        initial={{ opacity: 0, x: -15 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="font-cormorant-garamond italic text-lg md:text-xl leading-relaxed font-medium" style={{ color: "rgba(245, 245, 245, 0.85)" }}>
          {section.text}
        </p>
      </motion.blockquote>
    );
  }

  if (section.type === "list") {
    return (
      <motion.div
        ref={ref}
        className="my-6"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {section.text && (
          <p className="font-eb-garamond text-base leading-relaxed mb-3" style={{ color: "rgba(245, 245, 245, 0.7)" }}>
            {section.text}
          </p>
        )}
        <ul className="space-y-2 pl-4">
          {section.items?.map((item, i) => (
            <li key={i} className="font-eb-garamond text-base leading-relaxed flex items-start gap-3" style={{ color: "rgba(245, 245, 245, 0.6)" }}>
              <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "rgba(201, 162, 39, 0.5)" }} />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    );
  }

  // paragraph
  return (
    <motion.p
      ref={ref}
      className="font-eb-garamond text-base md:text-lg leading-[1.85] mb-5 whitespace-pre-line"
      style={{ color: "rgba(245, 245, 245, 0.7)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
    >
      {section.text}
    </motion.p>
  );
}

// ===== MAIN EXPORT =====
export default function Journal() {
  const [matchList] = useRoute("/journal");
  const [matchDetail, params] = useRoute("/journal/:slug");

  if (matchDetail && params?.slug) {
    return <ArticleDetail slug={params.slug} />;
  }

  return <JournalList />;
}
