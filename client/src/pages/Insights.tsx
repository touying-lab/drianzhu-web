/**
 * INSIGHTS Sub-page
 * Design: Deep royal blue background with report library
 * Features: Tou Ying Tracker report covers, research categories, download links
 * Brand Gold: #C9A227 | Deep Blue: #0D1B2A
 */

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  ExternalLink,
  FileText,
  Globe,
  LibraryBig,
  Play,
  Scale,
  Search,
  TrendingUp,
  Video,
  Youtube,
} from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getFeaturedCollection,
  getPlatformLabel,
  resolveVideoCountLabel,
  videoCollections,
  type VideoCollection,
  type VideoPlatform,
} from "@/data/videoCollections";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";

const touYingReports = [
  {
    year: "2018",
    title: "Tou Ying Tracker 2018",
    subtitle: "The latest trends in Chinese investment in the UK",
    publisher: "Grant Thornton × China Daily",
    cover: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/IoJsFXoJTTtbZNvC.jpg",
    downloadUrl: "https://www.grantthornton.co.uk/globalassets/1.-member-firms/united-kingdom/pdf/documents/tou-ying-tracker-2018.pdf",
  },
  {
    year: "2017",
    title: "Tou Ying Tracker 2017",
    subtitle: "The latest trends in Chinese investment in the UK",
    publisher: "Grant Thornton × China Daily",
    cover: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/ZIOpyMlgZhkvrabL.jpg",
    downloadUrl: "https://www.grantthornton.co.uk/globalassets/1.-member-firms/united-kingdom/pdf/documents/tou-ying-tracker-2017-english-version.pdf",
  },
];

export default function Insights() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />
      
      {/* Hero */}
      <InsightsHero />

      {/* Featured Collections */}
      <FeaturedCollectionsSection />

      {/* Video Library */}
      <VideoLibrarySection />

      {/* Tou Ying Tracker Reports */}
      <TouYingSection />

      {/* Research Areas */}
      <ResearchAreasSection />

      {/* CTA */}
      <CTASection />

      <Footer />
    </div>
  );
}

function InsightsHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
      style={{ backgroundColor: DEEP_BLUE }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(201, 162, 39, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 70% 60%, rgba(201, 162, 39, 0.3) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] mb-6 font-bold" style={{ color: BRAND_GOLD }}>
            {t("insightsPage.hero.title")}
          </h1>
          <div className="w-20 h-0.5 mb-8 mx-auto" style={{ backgroundColor: BRAND_GOLD }} />
          <p className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            {t("insightsPage.hero.desc")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCollectionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [, setLocation] = useLocation();
  const featuredCollection = getFeaturedCollection();
  const supportingCollections = videoCollections.filter((collection) => collection.slug !== featuredCollection.slug);

  const handleOpenCollection = (collection: VideoCollection) => {
    setLocation(`/insights/videos/${collection.slug}`);
  };

  return (
    <section ref={ref} className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: DEEP_BLUE }}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="w-6 h-6" style={{ color: BRAND_GOLD }} />
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] font-bold" style={{ color: BRAND_GOLD }}>
              Featured Collections
            </h2>
          </div>
          <div className="w-20 h-0.5 mb-8 mx-auto" style={{ backgroundColor: BRAND_GOLD }} />
          <p className="font-cormorant-garamond text-lg md:text-xl font-semibold max-w-3xl mx-auto leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.72)" }}>
            A premium media and knowledge library for research, public commentary, interviews and international business thought leadership.
          </p>
        </motion.div>

        <motion.article
          className="group max-w-6xl mx-auto mb-10 overflow-hidden rounded-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.08 }}
          style={{
            border: `1px solid rgba(201, 162, 39, 0.24)`,
            background: "linear-gradient(135deg, rgba(19, 34, 56, 0.74), rgba(13, 27, 42, 0.96))",
            boxShadow: "0 34px 100px rgba(0, 0, 0, 0.24)",
          }}
        >
          <button onClick={() => handleOpenCollection(featuredCollection)} className="grid w-full grid-cols-1 text-left lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[320px] overflow-hidden">
              <img
                src={featuredCollection.coverImage}
                alt={`${featuredCollection.title} collection cover`}
                className="h-full min-h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0D1B2A]/30" />
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-sm px-4 py-2" style={{ border: `1px solid rgba(201, 162, 39, 0.45)`, backgroundColor: "rgba(13, 27, 42, 0.78)", color: BRAND_GOLD }}>
                <Play className="h-4 w-4" />
                <span className="font-cormorant text-xs font-bold uppercase tracking-[0.18em]">Featured</span>
              </div>
            </div>
            <div className="relative flex flex-col justify-center p-8 md:p-12">
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 100% 0%, rgba(201, 162, 39, 0.14), transparent 46%)" }} />
              <div className="relative z-10">
                <CollectionMeta collection={featuredCollection} />
                <h3 className="font-cinzel mb-5 text-2xl font-bold tracking-[0.08em] md:text-3xl" style={{ color: "#F5F5F5" }}>
                  {featuredCollection.title}
                </h3>
                <p className="font-eb-garamond mb-8 text-lg font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.76)" }}>
                  {featuredCollection.featureDescription}
                </p>
                <span className="inline-flex items-center gap-3 rounded-sm px-6 py-3 font-cormorant text-sm font-bold tracking-[0.14em] transition-all duration-300 group-hover:bg-white/5" style={{ border: `1px solid rgba(201, 162, 39, 0.48)`, color: BRAND_GOLD }}>
                  Explore Featured Collection
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </button>
        </motion.article>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {supportingCollections.map((collection, index) => (
            <PremiumCollectionCard
              key={collection.slug}
              collection={collection}
              index={index}
              isInView={isInView}
              onOpen={() => handleOpenCollection(collection)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoLibrarySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState<VideoPlatform | "all">("all");

  const categories = useMemo(() => ["All", ...Array.from(new Set(videoCollections.map((collection) => collection.category)))], []);

  const filteredCollections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return videoCollections.filter((collection) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [collection.title, collection.description, collection.featureDescription, collection.category, ...collection.keywords]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = categoryFilter === "All" || collection.category === categoryFilter;
      const matchesPlatform = platformFilter === "all" || collection.platformSources.includes(platformFilter);

      return matchesQuery && matchesCategory && matchesPlatform;
    });
  }, [categoryFilter, platformFilter, query]);

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: "#132238" }}>
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto mb-12 max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <LibraryBig className="h-6 w-6" style={{ color: BRAND_GOLD }} />
            <h2 className="font-cinzel text-2xl font-bold tracking-[0.15em] md:text-3xl" style={{ color: BRAND_GOLD }}>
              Video Library
            </h2>
          </div>
          <div className="mx-auto mb-8 h-0.5 w-20" style={{ backgroundColor: BRAND_GOLD }} />
          <p className="font-cormorant-garamond text-lg font-semibold leading-relaxed md:text-xl" style={{ color: "rgba(255, 255, 255, 0.74)" }}>
            Search by topic, browse by knowledge area, and identify where future Bilibili and YouTube content will be housed.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mb-10 max-w-6xl rounded-sm p-5 md:p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ border: `1px solid rgba(201, 162, 39, 0.18)`, backgroundColor: "rgba(13, 27, 42, 0.5)" }}
        >
          <label className="mb-5 flex items-center gap-3 rounded-sm px-4 py-3" style={{ border: `1px solid rgba(201, 162, 39, 0.2)`, backgroundColor: "rgba(7, 20, 33, 0.68)" }}>
            <Search className="h-5 w-5 flex-shrink-0" style={{ color: BRAND_GOLD }} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search videos, research topics or collections"
              className="w-full bg-transparent font-eb-garamond text-base outline-none placeholder:text-white/38"
              style={{ color: "rgba(245, 245, 245, 0.88)" }}
            />
          </label>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <p className="font-cormorant mb-3 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <FilterButton key={category} active={categoryFilter === category} onClick={() => setCategoryFilter(category)}>
                    {category}
                  </FilterButton>
                ))}
              </div>
            </div>
            <div>
              <p className="font-cormorant mb-3 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>Platform</p>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <FilterButton active={platformFilter === "all"} onClick={() => setPlatformFilter("all")}>All</FilterButton>
                <FilterButton active={platformFilter === "youtube"} onClick={() => setPlatformFilter("youtube")}>YouTube</FilterButton>
                <FilterButton active={platformFilter === "bilibili"} onClick={() => setPlatformFilter("bilibili")}>Bilibili</FilterButton>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredCollections.map((collection, index) => {
            const Icon = collection.icon;

            return (
              <motion.button
                key={collection.slug}
                onClick={() => setLocation(`/insights/videos/${collection.slug}`)}
                className="group grid w-full grid-cols-1 overflow-hidden rounded-sm text-left transition-all duration-500 hover:-translate-y-1 md:grid-cols-[180px_1fr]"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: index * 0.06 }}
                style={{ border: `1px solid rgba(201, 162, 39, 0.16)`, backgroundColor: "rgba(13, 27, 42, 0.44)", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)" }}
              >
                <div className="relative min-h-[180px] overflow-hidden">
                  <img src={collection.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#0D1B2A]/10" />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-sm" style={{ border: `1px solid rgba(201, 162, 39, 0.3)`, backgroundColor: "rgba(19, 34, 56, 0.6)" }}>
                        <Icon className="h-5 w-5" style={{ color: BRAND_GOLD }} />
                      </span>
                      <CollectionMeta collection={collection} compact />
                    </div>
                    <ArrowRight className="mt-2 h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1" style={{ color: BRAND_GOLD }} />
                  </div>
                  <h3 className="font-cinzel mb-2 text-lg font-bold" style={{ color: "#F5F5F5" }}>{collection.title}</h3>
                  <p className="font-eb-garamond text-base font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.72)" }}>{collection.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PremiumCollectionCard({
  collection,
  index,
  isInView,
  onOpen,
}: {
  collection: VideoCollection;
  index: number;
  isInView: boolean;
  onOpen: () => void;
}) {
  const Icon = collection.icon;

  return (
    <motion.article
      className="group h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <button
        onClick={onOpen}
        className="relative h-full w-full overflow-hidden rounded-sm text-left transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
        style={{ border: `1px solid rgba(201, 162, 39, 0.18)`, backgroundColor: "rgba(19, 34, 56, 0.36)", boxShadow: "0 24px 70px rgba(0, 0, 0, 0.14)" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={collection.coverImage} alt={`${collection.title} collection cover`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/18 to-transparent" />
          <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-sm" style={{ border: `1px solid rgba(201, 162, 39, 0.38)`, backgroundColor: "rgba(13, 27, 42, 0.78)" }}>
            <Icon className="h-6 w-6" style={{ color: BRAND_GOLD }} />
          </div>
        </div>
        <div className="relative p-7">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 84% 4%, rgba(201, 162, 39, 0.12), transparent 44%)" }} />
          <div className="relative z-10">
            <CollectionMeta collection={collection} />
            <h3 className="font-cinzel mb-4 text-xl font-bold" style={{ color: "#F5F5F5" }}>{collection.title}</h3>
            <p className="font-eb-garamond mb-7 text-base font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.74)" }}>{collection.description}</p>
            <span className="inline-flex items-center gap-3 rounded-sm px-5 py-3 font-cormorant text-sm font-bold tracking-[0.14em] transition-all duration-300" style={{ border: `1px solid rgba(201, 162, 39, 0.42)`, color: BRAND_GOLD }}>
              View Collection
              <Play className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function CollectionMeta({ collection, compact = false }: { collection: VideoCollection; compact?: boolean }) {
  return (
    <div className={compact ? "space-y-2" : "mb-5 space-y-4"}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-cormorant text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: `rgba(201, 162, 39, 0.74)` }}>
          {resolveVideoCountLabel(collection)}
        </span>
        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "rgba(201, 162, 39, 0.45)" }} />
        <span className="font-cormorant text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(245, 245, 245, 0.54)" }}>
          Updated {collection.lastUpdated}
        </span>
      </div>
      {!compact && <PlatformBadges platforms={collection.platformSources} />}
    </div>
  );
}

function PlatformBadges({ platforms }: { platforms: VideoPlatform[] }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label={`Available platforms: ${getPlatformLabel(platforms)}`}>
      {platforms.includes("youtube") && (
        <span className="inline-flex items-center gap-2 rounded-sm px-3 py-1.5 font-cormorant text-xs font-bold tracking-[0.12em]" style={{ border: `1px solid rgba(201, 162, 39, 0.22)`, color: "rgba(245, 245, 245, 0.78)", backgroundColor: "rgba(13, 27, 42, 0.42)" }}>
          <Youtube className="h-3.5 w-3.5" style={{ color: BRAND_GOLD }} />
          YouTube
        </span>
      )}
      {platforms.includes("bilibili") && (
        <span className="inline-flex items-center gap-2 rounded-sm px-3 py-1.5 font-cormorant text-xs font-bold tracking-[0.12em]" style={{ border: `1px solid rgba(201, 162, 39, 0.22)`, color: "rgba(245, 245, 245, 0.78)", backgroundColor: "rgba(13, 27, 42, 0.42)" }}>
          <span className="font-cinzel text-[11px]" style={{ color: BRAND_GOLD }}>哔</span>
          Bilibili
        </span>
      )}
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-sm px-4 py-2 font-cormorant text-sm font-bold tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5"
      style={{
        border: `1px solid rgba(201, 162, 39, ${active ? 0.5 : 0.18})`,
        backgroundColor: active ? "rgba(201, 162, 39, 0.1)" : "rgba(13, 27, 42, 0.32)",
        color: active ? BRAND_GOLD : "rgba(245, 245, 245, 0.68)",
      }}
    >
      {children}
    </button>
  );
}

function TouYingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const handleDownload = (report: typeof touYingReports[0]) => {
    window.open(report.downloadUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: "#132238" }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-6 h-6" style={{ color: BRAND_GOLD }} />
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] font-bold" style={{ color: BRAND_GOLD }}>
              {t("insightsPage.reports.title")}
            </h2>
          </div>
          <p className="font-cormorant-garamond text-lg md:text-xl font-semibold" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            {t("insightsPage.reports.subtitle")}
          </p>
        </motion.div>

        {/* Report Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {touYingReports.map((report, index) => (
            <motion.div
              key={report.year}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onClick={() => handleDownload(report)}
            >
              <div 
                className="relative overflow-hidden rounded-sm transition-all duration-500 group-hover:shadow-2xl"
                style={{ border: `1px solid rgba(201, 162, 39, 0.2)` }}
              >
                {/* Report Cover Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <img
                    src={report.cover}
                    alt={report.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3 px-6 py-3 rounded-sm"
                      style={{ backgroundColor: "rgba(13, 27, 42, 0.9)", border: `1px solid ${BRAND_GOLD}` }}
                    >
                      <Download className="w-5 h-5" style={{ color: BRAND_GOLD }} />
                      <span className="font-cormorant tracking-wider font-bold" style={{ color: BRAND_GOLD }}>
                        {t("insightsPage.reports.download").toUpperCase()}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Report Info */}
                <div className="p-6" style={{ backgroundColor: "rgba(13, 27, 42, 0.8)" }}>
                  <h3 className="font-cinzel text-lg mb-1 font-bold" style={{ color: "#F5F5F5" }}>
                    {report.title}
                  </h3>
                  <p className="font-eb-garamond text-sm font-medium" style={{ color: "rgba(245, 245, 245, 0.6)" }}>
                    {report.subtitle}
                  </p>
                  <p className="font-cormorant text-xs mt-3 tracking-wider font-semibold" style={{ color: `rgba(201, 162, 39, 0.7)` }}>
                    {report.publisher}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchAreasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const researchAreas = [
    {
      icon: TrendingUp,
      title: t("insightsPage.research.mna"),
      description: t("insightsPage.research.mnaDesc"),
      topics: ["Deal Structuring", "Regulatory Compliance", "Due Diligence", "Post-Merger Integration"],
    },
    {
      icon: Globe,
      title: t("insightsPage.research.ukChina"),
      description: t("insightsPage.research.ukChinaDesc"),
      topics: ["Trade Policy", "Investment Trends", "Economic Diplomacy", "Market Access"],
    },
    {
      icon: Scale,
      title: t("insightsPage.research.dispute"),
      description: t("insightsPage.research.disputeDesc"),
      topics: ["Arbitration", "Insolvency", "Asset Recovery", "Regulatory Enforcement"],
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: DEEP_BLUE }}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="font-cinzel text-2xl md:text-3xl text-center tracking-[0.15em] mb-16 font-bold"
          style={{ color: BRAND_GOLD }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {t("insightsPage.research.title")}
        </motion.h2>

        <div className="max-w-5xl mx-auto space-y-12">
          {researchAreas.map((area, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row gap-8 p-8 rounded-sm"
              style={{ 
                border: `1px solid rgba(201, 162, 39, 0.15)`,
                backgroundColor: "rgba(19, 34, 56, 0.3)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div 
                  className="w-16 h-16 rounded-sm flex items-center justify-center"
                  style={{ border: `1px solid rgba(201, 162, 39, 0.3)` }}
                >
                  <area.icon className="w-8 h-8" style={{ color: BRAND_GOLD }} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-cinzel text-xl mb-3 font-bold" style={{ color: "#F5F5F5" }}>
                  {area.title}
                </h3>
                <p className="font-eb-garamond text-base md:text-lg leading-relaxed mb-5 font-medium" style={{ color: "rgba(245, 245, 245, 0.75)" }}>
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.topics.map((topic) => (
                    <span
                      key={topic}
                      className="font-cormorant text-sm tracking-wider px-3 py-1 rounded-sm font-semibold"
                      style={{ color: `rgba(201, 162, 39, 0.8)`, border: `1px solid rgba(201, 162, 39, 0.25)` }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const handleContact = () => {
    toast("Contact form coming soon", {
      description: "Please reach out via the contact section on the homepage.",
    });
  };

  return (
    <section ref={ref} className="py-16 md:py-20" style={{ backgroundColor: "#132238" }}>
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed mb-8 font-semibold" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            {t("insightsPage.cta.desc")}
          </p>
          <motion.button
            onClick={handleContact}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-sm font-cormorant tracking-[0.15em] font-bold transition-all duration-300"
            style={{ 
              border: `1px solid rgba(201, 162, 39, 0.5)`,
              color: BRAND_GOLD
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-5 h-5" />
            <span>{t("insightsPage.cta.button")}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
