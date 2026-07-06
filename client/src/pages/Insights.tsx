/**
 * INSIGHTS Sub-page
 * Design: Deep royal blue background with report library
 * Features: Tou Ying Tracker report covers, research categories, download links
 * Brand Gold: #C9A227 | Deep Blue: #0D1B2A
 */

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Globe,
  LibraryBig,
  Scale,
  Search,
  TrendingUp,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getPlatformLabel,
  getThumbnail,
  getVideoPlatforms,
  videoCollections,
  type VideoItem,
  type VideoPlatform,
} from "@/data/videoCollections";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const INITIAL_VIDEO_LIMIT = 4;

function useTouYingReports() {
  const { t } = useLanguage();
  return [
    {
      year: "2018",
      title: t("insightsPage.reports.report1.title"),
      subtitle: t("insightsPage.reports.report1.subtitle"),
      publisher: t("insightsPage.reports.report1.publisher"),
      cover: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/IoJsFXoJTTtbZNvC.jpg",
      downloadUrl: "https://www.grantthornton.co.uk/globalassets/1.-member-firms/united-kingdom/pdf/documents/tou-ying-tracker-2018.pdf",
    },
    {
      year: "2017",
      title: t("insightsPage.reports.report2.title"),
      subtitle: t("insightsPage.reports.report2.subtitle"),
      publisher: t("insightsPage.reports.report2.publisher"),
      cover: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292252689/ZIOpyMlgZhkvrabL.jpg",
      downloadUrl: "https://www.grantthornton.co.uk/globalassets/1.-member-firms/united-kingdom/pdf/documents/tou-ying-tracker-2017-english-version.pdf",
    },
  ];
}

export default function Insights() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />
      
      {/* Hero */}
      <InsightsHero />

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


function VideoLibrarySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState<VideoPlatform | "all">("all");
  const [showAllVideos, setShowAllVideos] = useState(false);

  const categories = useMemo(() => ["All", ...Array.from(new Set(videoCollections.map((collection) => collection.category)))], []);
  const allVideos = useMemo<VideoWithCity[]>(() => (
    videoCollections.flatMap((collection) => (
      collection.videos.map((video) => ({ ...video, city: collection.category }))
    ))
  ), []);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allVideos.filter((video) => {
      const platforms = getVideoPlatforms(video);
      const searchableText = [video.title, video.description, video.category, video.city, ...platforms]
        .join(" ")
        .toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      const matchesCategory = categoryFilter === "All" || video.city === categoryFilter;
      const matchesPlatform = platformFilter === "all" || platforms.includes(platformFilter);

      return matchesQuery && matchesCategory && matchesPlatform;
    });
  }, [allVideos, categoryFilter, platformFilter, query]);

  const activeCategoryLabel = categoryFilter === "All" ? "all city categories" : categoryFilter;
  const visibleVideos = showAllVideos ? filteredVideos : filteredVideos.slice(0, INITIAL_VIDEO_LIMIT);
  const hasMoreVideos = filteredVideos.length > visibleVideos.length;

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
              {t("insightsPage.videoLibrary.title")}
            </h2>
          </div>
          <div className="mx-auto mb-8 h-0.5 w-20" style={{ backgroundColor: BRAND_GOLD }} />
          <p className="font-cormorant-garamond text-lg font-semibold leading-relaxed md:text-xl" style={{ color: "rgba(255, 255, 255, 0.74)" }}>
            {t("insightsPage.videoLibrary.desc")}
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
              onChange={(event) => {
                setQuery(event.target.value);
                setShowAllVideos(false);
              }}
              placeholder={t("insightsPage.videoLibrary.searchPlaceholder")}
              className="w-full bg-transparent font-eb-garamond text-base outline-none placeholder:text-white/38"
              style={{ color: "rgba(245, 245, 245, 0.88)" }}
            />
          </label>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <p className="font-cormorant mb-3 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>{t("insightsPage.videoLibrary.categoryLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <FilterButton
                    key={category}
                    active={categoryFilter === category}
                    onClick={() => {
                      setCategoryFilter(category);
                      setShowAllVideos(false);
                    }}
                  >
                    {category}
                  </FilterButton>
                ))}
              </div>
            </div>
            <div>
              <p className="font-cormorant mb-3 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>{t("insightsPage.videoLibrary.platformLabel")}</p>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <FilterButton active={platformFilter === "all"} onClick={() => { setPlatformFilter("all"); setShowAllVideos(false); }}>All</FilterButton>
                <FilterButton active={platformFilter === "youtube"} onClick={() => { setPlatformFilter("youtube"); setShowAllVideos(false); }}>YouTube</FilterButton>
                <FilterButton active={platformFilter === "bilibili"} onClick={() => { setPlatformFilter("bilibili"); setShowAllVideos(false); }}>Bilibili</FilterButton>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.header
          className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.16 }}
        >
          <div>
            <p className="mb-3 font-cormorant text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
              {t("insightsPage.videoLibrary.subheading")}
            </p>
            <h3 className="font-cinzel text-2xl font-bold tracking-[0.12em] md:text-3xl" style={{ color: BRAND_GOLD }}>
              {categoryFilter === "All" ? t("insightsPage.videoLibrary.allVideos") : `${categoryFilter} Videos`}
            </h3>
          </div>
          <p className="font-eb-garamond text-lg font-medium leading-relaxed md:text-right" style={{ color: "rgba(245, 245, 245, 0.72)" }}>
            Showing {visibleVideos.length} of {filteredVideos.length} matching videos under {activeCategoryLabel}.
          </p>
        </motion.header>

        {filteredVideos.length > 0 ? (
          <>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
              {visibleVideos.map((video, index) => (
                <InlineVideoCard key={`${video.city}-${video.title}-${video.date}`} video={video} index={index} isInView={isInView} />
              ))}
            </div>

            {hasMoreVideos && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllVideos(true)}
                  className="group inline-flex items-center gap-3 px-8 py-4 font-cinzel text-sm font-bold tracking-[0.18em] transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: `1px solid rgba(201, 162, 39, 0.48)`,
                    color: BRAND_GOLD,
                    backgroundColor: "rgba(13, 27, 42, 0.46)",
                    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.18)",
                  }}
                >
                  {t("insightsPage.videoLibrary.showMore")}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <NoVideosFound />
        )}
      </div>
    </section>
  );
}

type PlatformSelection = VideoPlatform;
type VideoWithCity = VideoItem & { city: string };

const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return undefined;

  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0&autoplay=0` : url;
};

const getBilibiliEmbedUrl = (url?: string) => {
  if (!url) return undefined;

  const bvid = url.match(/(BV[A-Za-z0-9]+)/)?.[1];
  if (bvid) {
    return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&autoplay=0`;
  }

  const aid = url.match(/(?:av|aid=)(\d+)/)?.[1];
  if (aid) {
    return `https://player.bilibili.com/player.html?aid=${aid}&page=1&high_quality=1&autoplay=0`;
  }

  return url;
};

function InlineVideoCard({ video, index, isInView }: { video: VideoWithCity; index: number; isInView: boolean }) {
  const availablePlatforms = getVideoPlatforms(video);
  const defaultPlatform: PlatformSelection = availablePlatforms[0] ?? "youtube";
  const [activePlatform, setActivePlatform] = useState<PlatformSelection>(defaultPlatform);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);
  const hasBothPlatforms = Boolean(video.bilibiliUrl && video.youtubeUrl);
  const embedUrl = activePlatform === "bilibili" ? getBilibiliEmbedUrl(video.bilibiliUrl) : getYouTubeEmbedUrl(video.youtubeUrl);
  const thumbnail = getThumbnail(video);

  return (
    <motion.article
      className="overflow-hidden rounded-sm"
      style={{ border: `1px solid rgba(201, 162, 39, 0.18)`, backgroundColor: "rgba(13, 27, 42, 0.44)", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.06 }}
    >
      <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: DEEP_BLUE }}>
        {embedUrl && isPlayerLoaded ? (
          <iframe
            src={embedUrl}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => embedUrl && setIsPlayerLoaded(true)}
            className="group absolute inset-0 h-full w-full overflow-hidden text-left"
            aria-label={`Play ${video.title}`}
            disabled={!embedUrl}
          >
            <img
              src={thumbnail}
              alt={`Thumbnail for ${video.title}`}
              referrerPolicy="no-referrer"
              loading={index < INITIAL_VIDEO_LIMIT ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-[#0D1B2A]/42 transition-colors duration-300 group-hover:bg-[#0D1B2A]/28" />
            {embedUrl && (
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110" style={{ border: `1px solid rgba(201, 162, 39, 0.62)`, backgroundColor: "rgba(13, 27, 42, 0.78)", boxShadow: "0 14px 35px rgba(0, 0, 0, 0.35)" }}>
                <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[17px] border-y-transparent" style={{ borderLeftColor: BRAND_GOLD }} />
              </span>
            )}
          </button>
        )}
      </div>

      <div className="p-6">
        {hasBothPlatforms && (
          <div className="mb-5 flex gap-3">
            {(["bilibili", "youtube"] as PlatformSelection[]).map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => { setActivePlatform(platform); setIsPlayerLoaded(false); }}
                className="rounded-sm px-4 py-2 font-cormorant text-sm font-bold tracking-[0.12em] transition-all duration-300"
                style={{
                  border: `1px solid rgba(201, 162, 39, ${activePlatform === platform ? 0.58 : 0.22})`,
                  color: activePlatform === platform ? BRAND_GOLD : "rgba(245, 245, 245, 0.62)",
                  backgroundColor: activePlatform === platform ? "rgba(201, 162, 39, 0.08)" : "transparent",
                }}
              >
                {platform === "bilibili" ? "Bilibili" : "YouTube"}
              </button>
            ))}
          </div>
        )}

        <div className="mb-3 flex flex-wrap items-center gap-2 font-cormorant text-sm font-semibold tracking-[0.12em]" style={{ color: `rgba(201, 162, 39, 0.72)` }}>
          <Calendar className="h-4 w-4" />
          <span>{video.date}</span>
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "rgba(201, 162, 39, 0.45)" }} />
          <span>{video.city}</span>
        </div>
        <h3 className="font-cinzel mb-3 text-lg font-bold leading-snug" style={{ color: "#F5F5F5" }}>
          {video.title}
        </h3>
        <p className="mb-4 font-cormorant text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(201, 162, 39, 0.66)` }}>
          {video.category}
        </p>
        <p className="font-eb-garamond mb-6 text-base font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
          {video.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <PlatformBadges platforms={availablePlatforms} />
          {video.bilibiliUrl && <WatchButton href={video.bilibiliUrl} label="Watch on Bilibili" />}
          {video.youtubeUrl && <WatchButton href={video.youtubeUrl} label="Watch on YouTube" />}
        </div>
      </div>
    </motion.article>
  );
}

function WatchButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-sm px-4 py-2 font-cormorant text-sm font-bold tracking-[0.12em] transition-all duration-300 hover:bg-white/5"
      style={{ border: `1px solid rgba(201, 162, 39, 0.36)`, color: BRAND_GOLD }}
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}

function NoVideosFound() {
  return (
    <div className="mx-auto max-w-2xl rounded-sm p-10 text-center" style={{ border: `1px solid rgba(201, 162, 39, 0.16)`, backgroundColor: "rgba(13, 27, 42, 0.44)" }}>
      <p className="font-cinzel mb-4 text-xl font-bold" style={{ color: BRAND_GOLD }}>No Matching Videos</p>
      <p className="font-eb-garamond text-lg font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
        Adjust the search term, city category or platform filter to continue browsing the video library.
      </p>
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


function TouYingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const touYingReports = useTouYingReports();

  const handleDownload = (report: ReturnType<typeof useTouYingReports>[0]) => {
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
      topics: [t("insightsPage.research.mna.topic1"), t("insightsPage.research.mna.topic2"), t("insightsPage.research.mna.topic3"), t("insightsPage.research.mna.topic4")],
    },
    {
      icon: Globe,
      title: t("insightsPage.research.ukChina"),
      description: t("insightsPage.research.ukChinaDesc"),
      topics: [t("insightsPage.research.ukChina.topic1"), t("insightsPage.research.ukChina.topic2"), t("insightsPage.research.ukChina.topic3"), t("insightsPage.research.ukChina.topic4")],
    },
    {
      icon: Scale,
      title: t("insightsPage.research.dispute"),
      description: t("insightsPage.research.disputeDesc"),
      topics: [t("insightsPage.research.dispute.topic1"), t("insightsPage.research.dispute.topic2"), t("insightsPage.research.dispute.topic3"), t("insightsPage.research.dispute.topic4")],
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
