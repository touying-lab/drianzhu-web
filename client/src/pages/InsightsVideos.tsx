import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  Calendar,
  ExternalLink,
  Filter,
  LibraryBig,
  Search,
  Youtube,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
const SECTION_BG = "#132238";

type PlatformSelection = VideoPlatform;
type VideoWithCity = VideoItem & { city: string };

const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return undefined;

  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const getBilibiliEmbedUrl = (url?: string) => {
  if (!url) return undefined;

  const bvid = url.match(/(BV[A-Za-z0-9]+)/)?.[1];
  if (bvid) {
    return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1`;
  }

  const aid = url.match(/(?:av|aid=)(\d+)/)?.[1];
  if (aid) {
    return `https://player.bilibili.com/player.html?aid=${aid}&page=1&high_quality=1`;
  }

  return url;
};

export default function InsightsVideos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState<VideoPlatform | "all">("all");

  const categories = useMemo(() => ["All", ...videoCollections.map((collection) => collection.category)], []);

  const allVideos = useMemo<VideoWithCity[]>(() => (
    videoCollections.flatMap((collection) => (
      collection.videos.map((video) => ({ ...video, city: collection.category }))
    ))
  ), []);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allVideos.filter((video) => {
      const platforms = getVideoPlatforms(video);
      const searchableText = [
        video.title,
        video.description,
        video.category,
        video.city,
        ...platforms,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      const matchesCategory = categoryFilter === "All" || video.city === categoryFilter;
      const matchesPlatform = platformFilter === "all" || platforms.includes(platformFilter);

      return matchesQuery && matchesCategory && matchesPlatform;
    });
  }, [allVideos, categoryFilter, platformFilter, query]);

  const totalVideos = allVideos.length;
  const platformCount = new Set(allVideos.flatMap((video) => getVideoPlatforms(video))).size;
  const activeCategoryLabel = categoryFilter === "All" ? "all city categories" : categoryFilter;

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />
      <section ref={ref} className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: DEEP_BLUE }}>
        <DecorativeBackdrop />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            className="mx-auto mb-14 max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <LibraryBig className="h-7 w-7" style={{ color: BRAND_GOLD }} />
              <h1 className="font-cinzel text-3xl font-bold tracking-[0.15em] md:text-5xl" style={{ color: BRAND_GOLD }}>
                Video Knowledge Library
              </h1>
            </div>
            <div className="mx-auto mb-8 h-0.5 w-20" style={{ backgroundColor: BRAND_GOLD }} />
            <p className="font-cormorant-garamond text-xl font-semibold leading-relaxed md:text-2xl" style={{ color: "rgba(255, 255, 255, 0.82)" }}>
              A premium video archive for interviews, public appearances, research presentations and cross-border thought leadership.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <MetricCard value={videoCollections.length} label="City Categories" />
            <MetricCard value={totalVideos} label="Published Videos" />
            <MetricCard value={platformCount} label="Supported Platforms" />
          </motion.div>

          <motion.div
            className="mx-auto mb-12 max-w-6xl rounded-sm p-5 md:p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12 }}
            style={{ border: `1px solid rgba(201, 162, 39, 0.18)`, backgroundColor: "rgba(19, 34, 56, 0.48)" }}
          >
            <label className="mb-5 flex items-center gap-3 rounded-sm px-4 py-3" style={{ border: `1px solid rgba(201, 162, 39, 0.2)`, backgroundColor: "rgba(7, 20, 33, 0.68)" }}>
              <Search className="h-5 w-5 flex-shrink-0" style={{ color: BRAND_GOLD }} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search videos, city categories or platforms"
                className="w-full bg-transparent font-eb-garamond text-base outline-none placeholder:text-white/38"
                style={{ color: "rgba(245, 245, 245, 0.88)" }}
              />
            </label>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4" style={{ color: BRAND_GOLD }} />
                  <p className="font-cormorant text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>City Category</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <FilterButton key={category} active={categoryFilter === category} onClick={() => setCategoryFilter(category)}>
                      {category}
                    </FilterButton>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-cormorant text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>Platform</p>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <FilterButton active={platformFilter === "all"} onClick={() => setPlatformFilter("all")}>All</FilterButton>
                  <FilterButton active={platformFilter === "youtube"} onClick={() => setPlatformFilter("youtube")}>YouTube</FilterButton>
                  <FilterButton active={platformFilter === "bilibili"} onClick={() => setPlatformFilter("bilibili")}>Bilibili</FilterButton>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.header
            className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16 }}
          >
            <div>
              <p className="mb-3 font-cormorant text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                Video Library
              </p>
              <h2 className="font-cinzel text-2xl font-bold tracking-[0.12em] md:text-3xl" style={{ color: BRAND_GOLD }}>
                {categoryFilter === "All" ? "All Videos" : `${categoryFilter} Videos`}
              </h2>
            </div>
            <p className="font-eb-garamond text-lg font-medium leading-relaxed md:text-right" style={{ color: "rgba(245, 245, 245, 0.72)" }}>
              Showing {filteredVideos.length} of {totalVideos} videos under {activeCategoryLabel}.
            </p>
          </motion.header>

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {filteredVideos.map((video, index) => (
                <VideoCard key={`${video.city}-${video.title}-${video.date}`} video={video} index={index} isInView={isInView} />
              ))}
            </div>
          ) : (
            <NoResultsState />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function VideoCard({ video, index, isInView }: { video: VideoWithCity; index: number; isInView: boolean }) {
  const availablePlatforms = getVideoPlatforms(video);
  const defaultPlatform: PlatformSelection = availablePlatforms[0] ?? "youtube";
  const [activePlatform, setActivePlatform] = useState<PlatformSelection>(defaultPlatform);
  const hasBothPlatforms = Boolean(video.bilibiliUrl && video.youtubeUrl);
  const embedUrl = activePlatform === "bilibili" ? getBilibiliEmbedUrl(video.bilibiliUrl) : getYouTubeEmbedUrl(video.youtubeUrl);

  return (
    <motion.article
      className="overflow-hidden rounded-sm"
      style={{ border: `1px solid rgba(201, 162, 39, 0.18)`, backgroundColor: "rgba(19, 34, 56, 0.42)" }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08 }}
    >
      <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: SECTION_BG }}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <img src={getThumbnail(video)} alt={video.title} className="h-full w-full object-cover" />
        )}
      </div>

      <div className="p-7">
        {hasBothPlatforms && (
          <div className="mb-5 flex gap-3">
            {(["bilibili", "youtube"] as PlatformSelection[]).map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
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
        <h2 className="font-cinzel mb-3 text-xl font-bold" style={{ color: "#F5F5F5" }}>
          {video.title}
        </h2>
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

function MetricCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-sm p-6 text-center" style={{ border: `1px solid rgba(201, 162, 39, 0.16)`, backgroundColor: "rgba(19, 34, 56, 0.42)" }}>
      <p className="font-cinzel mb-2 text-3xl font-bold" style={{ color: BRAND_GOLD }}>{value}</p>
      <p className="font-cormorant text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(245, 245, 245, 0.62)" }}>{label}</p>
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

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
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

function NoResultsState() {
  return (
    <div className="mx-auto max-w-2xl rounded-sm p-10 text-center" style={{ border: `1px solid rgba(201, 162, 39, 0.16)`, backgroundColor: "rgba(19, 34, 56, 0.36)" }}>
      <p className="font-cinzel mb-4 text-xl font-bold" style={{ color: BRAND_GOLD }}>No Matching Videos</p>
      <p className="font-eb-garamond text-lg font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
        Adjust the search term, city category or platform filter to continue browsing the video library.
      </p>
    </div>
  );
}

function DecorativeBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: BRAND_GOLD }} />
      <div className="absolute bottom-24 left-10 w-72 h-72 rounded-full blur-3xl opacity-8" style={{ backgroundColor: BRAND_GOLD }} />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(201, 162, 39, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 162, 39, 0.35) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
