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

const articles: JournalArticle[] = [
  {
    id: "1",
    slug: "2026-new-year-message",
    title: "To Every Person Who Lives with Purpose",
    subtitle: "2026 New Year Message",
    date: "December 31, 2025",
    readTime: "6 min read",
    category: "Reflections",
    coverImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
    excerpt: "A stroke to the left, a stroke to the right: The Making of 'Person' in Chinese. Not a coincidence of structure, but a deliberate choice of direction.",
    source: "https://mp.weixin.qq.com/s/jJ8Va5-XbCApDl9SepR3Ow",
    content: [
      { type: "heading", text: "A Stroke to the Left, a Stroke to the Right" },
      { type: "paragraph", text: "Not a coincidence of structure, but a deliberate choice of direction — A stroke to the left, rooted in reality; a stroke to the right, reaching toward the horizon." },
      { type: "paragraph", text: "Over the past year, we stood at a rare rupture in time. Technology advanced at breakneck speed, AI reshaped countless industries, and capital and order were reshuffled again and again. The world did not become simpler — only more complex, louder, and more demanding." },
      { type: "paragraph", text: "Some were pushed forward by the era's momentum; others quietly grew weary in the rush. Yet the more turbulent the times, the more we need to awaken the soul: Do not become mere cogs in a system — Remember, before anything else, you are a person." },
      { type: "heading", text: "Pressing Forward" },
      { type: "paragraph", text: "In 2025, I witnessed countless people pressing forward — professionals working late beneath office lights, entrepreneurs redrawing the future through uncertainty, and the backbone generation building dreams while carrying family, duty, and self. Often unseen, you quietly uphold the foundations of the world." },
      { type: "quote", text: "A person is not made by labels. A person shines through choices." },
      { type: "paragraph", text: "Choosing long-termism over short-term temptation, choosing rationality and expertise amid the noise, choosing to perfect the mundane even when misunderstood. These choices may not be dazzling, but they decide how far one can go." },
      { type: "heading", text: "What Truly Endures" },
      { type: "paragraph", text: "As a legal professional, a finance practitioner, and a long-time observer at the crossroads of East and West, I firmly believe: What is truly scarce is not clever technique, but steadfast judgment of values; What truly endures is not fleeting luck, but verifiable competence and character." },
      { type: "paragraph", text: "The world changes, but its core logic remains: Trust is built over time; Respect is earned through kept promises; Real influence never comes from clamor." },
      { type: "heading", text: "A Blessing for the New Year" },
      { type: "paragraph", text: "May you stay clear-eyed in a fast-paced world; Keep refining yourself amid uncertainty; Hold on to warmth and boundaries under pressure; And remember your original purpose as you climb." },
      { type: "paragraph", text: "No need to rush for validation. Let time work with you. Do the work — one solid step at a time. One person's strength may be limited, but when countless earnest, sincere, and professional people stand together, our era will be lifted toward steadiness." },
      { type: "quote", text: "What makes a person human is not speed, but direction. As the year begins, may you and I take up the brush, drawing our own strokes — steady, powerful, enduring." },
      { type: "paragraph", text: "Happy New Year!\n\nDr. Ian Zhu\nFounder, Tou Ying Ltd\n31.12.2025" },
    ],
  },
  {
    id: "2",
    slug: "grant-thornton-gateley-appointment",
    title: "Appointed Head of China Desk at Grant Thornton UK & Gateley Plc",
    subtitle: "English Law System Support for Chinese Enterprises",
    date: "November 26, 2025",
    readTime: "8 min read",
    category: "Professional",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    excerpt: "Providing comprehensive English law system support for Chinese enterprises in international competition, bridging the gap in cross-border dispute resolution.",
    source: "https://mp.weixin.qq.com/s/tZvJ18VHOn-ibWh1Nf19_A",
    content: [
      { type: "paragraph", text: "Dr. Ian Zhu is a cross-border dispute resolution expert, now appointed as Head of China Desk Consultant at both Grant Thornton UK — one of the world's largest insolvency practices under the English legal system — and Gateley Plc, a 200-year-old law firm listed on the London Stock Exchange." },
      { type: "paragraph", text: "He works closely with specialist partners at both institutions to provide comprehensive solutions for Chinese enterprises going global, and for Chinese lawyers handling complex cases requiring English law-based risk control and cross-border asset preservation." },
      { type: "heading", text: "The Scale of English Law" },
      { type: "paragraph", text: "UK legal services export nearly £10 billion annually worldwide. English law, UK arbitration and the common law judicial system have become the global standard for cross-border transactions, financial arrangements, asset structures, and dispute resolution." },
      { type: "paragraph", text: "In regions where Chinese enterprises are widely deployed — such as the Cayman Islands, BVI, Hong Kong, Singapore, Middle East common law zones (DIFC/ADGM), Saudi Arabia, Southeast Asia, Central Asia, and even Latin America and Africa — the vast majority of contracts, financing documents, and arbitration clauses adopt the English legal system." },
      { type: "heading", text: "Bridging the Gap" },
      { type: "paragraph", text: "For a long time, Chinese enterprises have generally lacked systematic support in compliance structure design, asset preservation, and cross-border dispute handling under English law, making them vulnerable to risks overseas." },
      { type: "list", text: "Key risk areas include:", items: [
        "English law contract structure design",
        "UK arbitration enforcement pathways",
        "Overseas asset preservation",
        "Complex cross-border governance disputes",
        "Application of common law enforcement mechanisms",
      ]},
      { type: "heading", text: "Proven Track Record" },
      { type: "paragraph", text: "The UK Insolvency Practitioner (IP) system is widely regarded as one of the world's strongest asset protection and debt restructuring frameworks. Its core value lies in court-granted compulsory investigation powers, cross-border asset freezing and recovery rights, and civil and criminal liability for non-cooperative directors." },
      { type: "list", text: "Notable achievements:", items: [
        "Gateley: $4 billion in assets preserved for clients",
        "Grant Thornton UK: $3 billion in cross-border restructuring assets preserved",
      ]},
      { type: "heading", text: "Three Core Capabilities" },
      { type: "paragraph", text: "The China Desk, led by Dr. Ian Zhu, distills the tools and mechanisms of the UK IP system into three core capabilities of greatest practical value for Chinese enterprises:" },
      { type: "list", text: "", items: [
        "Cross-Border Asset Preservation",
        "Recovering Corporate Control",
        "Rapid Stabilisation of High-Risk Projects",
      ]},
    ],
  },
  {
    id: "3",
    slug: "sino-european-summit-2025",
    title: "Finding Certainty in a Changing World",
    subtitle: "2025 Sino-European Entrepreneurs Summit Observations",
    date: "June 4, 2025",
    readTime: "10 min read",
    category: "Industry Insights",
    coverImage: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&q=80",
    excerpt: "On the 50th anniversary of China-EU diplomatic relations, exploring new opportunities for Chinese enterprises at the crossroads of global cooperation and transformation.",
    source: "https://mp.weixin.qq.com/s/R2yavsOl5QPe-4mpanD-Og",
    content: [
      { type: "paragraph", text: "In May 2025, the Sino-European Entrepreneurs Summit was held at IESE Business School in Spain. Coinciding with the 50th anniversary of China-EU diplomatic relations, the summit focused on 'Global Cooperation in Transformation,' bringing together heavyweight figures from Chinese and European political and business circles." },
      { type: "paragraph", text: "The summit was co-organized by the China-Foreign Entrepreneurs Association and IESE Business School, with support from the Chinese Embassy in Spain and multiple institutions. Spain's Minister of Industry and Tourism noted in his opening speech that China and Europe, as 'the world's two great powers, two great civilizations, and two great markets,' share broad common interests in multilateralism and green development." },
      { type: "heading", text: "50 Years of Transformation" },
      { type: "paragraph", text: "In 1975, China's share of global GDP was merely 1.6%, with the economy of the then-EEC-9 nations roughly 18 times that of China. By 2025, the world had been transformed beyond recognition: China's GDP had reached 120% of the EEC-9 economies, and bilateral trade exceeded $600 billion annually." },
      { type: "paragraph", text: "This signifies that China and the EU have evolved from a relationship of 'volume disparity' to one of 'reciprocal parity,' from 'distant strangers' to 'deeply interdependent.' This is not merely a numbers game — it means that a deep understanding of each other's systems, regulations, and strategies has become a new gateway for Chinese enterprises venturing abroad." },
      { type: "heading", text: "Globalization in Restructuring" },
      { type: "quote", text: "\"The rational response should be a coordinated move from the rest of the world against that single country that has started the war.\" — Miguel Sebastián, Spain's Minister of Industry and Tourism" },
      { type: "paragraph", text: "The current global landscape faces challenges from new Cold War thinking, geopolitical conflicts, supply chain fragmentation, data sovereignty disputes, and tariff wars. Today's trade barriers are more like policy frictions arising from multiple countries, reminiscent of the 'named tariff wars' of the 1930s." },
      { type: "list", text: "Future cooperation priorities:", items: [
        "Coordinating supply chain strategic deployment (semiconductors, pharmaceuticals, key raw materials)",
        "Rebuilding trust-based legal frameworks (digital compliance, ESG standards)",
        "Establishing third-party market mechanisms jointly (in Africa, Latin America, and other regions)",
      ]},
      { type: "heading", text: "Seven Opportunity Zones in Europe" },
      { type: "paragraph", text: "Over the past decade, Chinese investment in Europe has been shifting from traditional energy and real estate toward new energy, high-tech, and digital infrastructure. The summit identified key areas where China-EU cooperation should focus:" },
      { type: "list", text: "", items: [
        "Green Energy & Climate Technology",
        "Digital Economy & Innovative Manufacturing",
        "Healthcare & Biotechnology",
        "Logistics & Transportation Infrastructure",
        "New Energy Vehicles & Automotive Supply Chain",
        "Third-Place Cooperation: China-EU + Africa, Latin America, ASEAN",
        "Professional Services & Cross-Border Legal Support",
      ]},
      { type: "heading", text: "The Path Forward" },
      { type: "paragraph", text: "China-EU cooperation under the 'Belt and Road' and 'Global Gateway' strategies is highly complementary, particularly in Africa and other third-party markets — in infrastructure, healthcare, education, and digital interconnection — with shared potential for advancing high standards, green development, and inclusive growth." },
      { type: "quote", text: "\"What is truly scarce between China and Europe is not opportunity, but executable pathway design. Tou Ying is committed to providing professional, grounded solutions and execution support for Chinese enterprises in the UK and European markets.\"" },
    ],
  },
];

// ===== JOURNAL LIST PAGE =====
function JournalList() {
  const [, setLocation] = useLocation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const featured = articles[0];
  const rest = articles.slice(1);

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
              THOUGHTS & OBSERVATIONS
            </p>
            <h1 className="font-cormorant-garamond text-5xl md:text-6xl lg:text-7xl tracking-[0.03em] font-light" style={{ color: BRAND_GOLD }}>
              The Journal
            </h1>
            <div className="w-20 h-0.5 mt-6" style={{ backgroundColor: `rgba(201, 162, 39, 0.3)` }} />
            <p className="font-eb-garamond text-base md:text-lg mt-6 leading-relaxed max-w-xl" style={{ color: "rgba(245, 245, 245, 0.55)" }}>
              Reflections on cross-border commerce, legal practice, and the art of building trust across cultures.
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
            RECENT ARTICLES
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
            FEATURED
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
          READ ARTICLE <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.article>
  );
}

function ArticleCard({ article, index }: { article: JournalArticle; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [, setLocation] = useLocation();

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
          READ MORE <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.article>
  );
}

// ===== ARTICLE DETAIL PAGE =====
function ArticleDetail({ slug }: { slug: string }) {
  const [, setLocation] = useLocation();
  const article = articles.find((a) => a.slug === slug);
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
          <h1 className="font-cormorant-garamond text-3xl mb-4" style={{ color: BRAND_GOLD }}>Article Not Found</h1>
          <button onClick={() => setLocation("/journal")} className="font-cormorant text-sm tracking-wider" style={{ color: BRAND_GOLD }}>
            ← Back to Journal
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Find next article
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[(currentIndex + 1) % articles.length];

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
          ALL ARTICLES
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
                ORIGINAL SOURCE
              </p>
              <a
                href={article.source}
                target="_blank"
                rel="noopener noreferrer"
                className="font-eb-garamond text-sm underline underline-offset-4 transition-colors duration-300 hover:opacity-80"
                style={{ color: "rgba(245, 245, 245, 0.5)" }}
              >
                Read on WeChat →
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
                NEXT ARTICLE
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
                  READ ARTICLE <ArrowRight className="w-3.5 h-3.5" />
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
