import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Filter,
  LibraryBig,
  Play,
  Search,
  Video,
  Youtube,
} from "lucide-react";
import { useLocation, useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  getPlatformLabel,
  getThumbnail,
  getVideoCollection,
  getVideoPlatforms,
  resolveVideoCountLabel,
  videoCollections,
  type VideoCollection,
  type VideoItem,
  type VideoPlatform,
} from "@/data/videoCollections";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const SECTION_BG = "#132238";

type PlatformSelection = VideoPlatform;

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
  const [, params] = useRoute("/insights/videos/:collectionSlug");
  const collection = getVideoCollection(params?.collectionSlug);

  if (params?.collectionSlug && !collection) {
    return <CollectionNotFound />;
  }

  return collection ? <CollectionDetail collection={collection} /> : <CollectionsIndex />;
}

function CollectionsIndex() {
  const [, setLocation] = useLocation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState<VideoPlatform | "all">("all");

  const categories = useMemo(() => ["All", ...Array.from(new Set(videoCollections.map((collection) => collection.category)))], []);

  const filteredCollections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return videoCollections.filter((collection) => {
      const searchableText = [
        collection.title,
        collection.description,
        collection.featureDescription,
        collection.category,
        ...collection.keywords,
        ...collection.videos.flatMap((video) => [video.title, video.description, video.category]),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      const matchesCategory = categoryFilter === "All" || collection.category === categoryFilter;
      const matchesPlatform = platformFilter === "all" || collection.platformSources.includes(platformFilter);

      return matchesQuery && matchesCategory && matchesPlatform;
    });
  }, [categoryFilter, platformFilter, query]);

  const totalVideos = videoCollections.reduce((total, collection) => total + collection.videos.length, 0);
  const platformCount = new Set(videoCollections.flatMap((collection) => collection.platformSources)).size;

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
            <MetricCard value={videoCollections.length} label="Curated Collections" />
            <MetricCard value={totalVideos} label="Published Videos" suffix={totalVideos === 0 ? " placeholder" : ""} />
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
                placeholder="Search collections, topics, platforms or future video titles"
                className="w-full bg-transparent font-eb-garamond text-base outline-none placeholder:text-white/38"
                style={{ color: "rgba(245, 245, 245, 0.88)" }}
              />
            </label>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4" style={{ color: BRAND_GOLD }} />
                  <p className="font-cormorant text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>Knowledge Area</p>
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

          {filteredCollections.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCollections.map((collection, index) => (
                <CollectionCard
                  key={collection.slug}
                  collection={collection}
                  index={index}
                  isInView={isInView}
                  onOpen={() => setLocation(`/insights/videos/${collection.slug}`)}
                />
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

function CollectionDetail({ collection }: { collection: VideoCollection }) {
  const [, setLocation] = useLocation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = collection.icon;
  const totalVideos = collection.videos.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />
      <section ref={ref} className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: DEEP_BLUE }}>
        <DecorativeBackdrop />
        <div className="container relative z-10 mx-auto px-6">
          <motion.button
            onClick={() => setLocation("/insights/videos")}
            className="mb-10 inline-flex items-center gap-3 rounded-sm px-5 py-3 font-cormorant font-bold tracking-[0.12em] transition-all duration-300"
            style={{ border: `1px solid rgba(201, 162, 39, 0.35)`, color: BRAND_GOLD }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(201, 162, 39, 0.08)" }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="h-4 w-4" />
            All Collections
          </motion.button>

          <motion.article
            className="mb-14 overflow-hidden rounded-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ border: `1px solid rgba(201, 162, 39, 0.22)`, background: "linear-gradient(135deg, rgba(19, 34, 56, 0.72), rgba(13, 27, 42, 0.96))" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[320px] overflow-hidden">
                <img src={collection.coverImage} alt={`${collection.title} collection cover`} className="h-full min-h-[320px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/56 via-transparent to-transparent" />
              </div>
              <div className="relative p-8 md:p-12">
                <div className="absolute inset-0 opacity-80" style={{ background: "radial-gradient(circle at 95% 2%, rgba(201, 162, 39, 0.13), transparent 44%)" }} />
                <div className="relative z-10">
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-sm" style={{ border: `1px solid rgba(201, 162, 39, 0.35)`, backgroundColor: "rgba(19, 34, 56, 0.48)" }}>
                      <Icon className="h-8 w-8" style={{ color: BRAND_GOLD }} />
                    </div>
                    <div>
                      <p className="font-cormorant text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: `rgba(201, 162, 39, 0.75)` }}>
                        {collection.category}
                      </p>
                      <p className="font-eb-garamond text-base font-medium" style={{ color: "rgba(245, 245, 245, 0.64)" }}>
                        {resolveVideoCountLabel(collection)} · Updated {collection.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <h1 className="font-cinzel mb-6 text-4xl font-bold tracking-[0.14em] md:text-5xl" style={{ color: BRAND_GOLD }}>
                    {collection.title}
                  </h1>
                  <div className="mb-8 h-0.5 w-20" style={{ backgroundColor: BRAND_GOLD }} />
                  <p className="font-cormorant-garamond mb-8 text-xl font-semibold leading-relaxed md:text-2xl" style={{ color: "rgba(255, 255, 255, 0.82)" }}>
                    {collection.featureDescription}
                  </p>
                  <PlatformBadges platforms={collection.platformSources} />
                </div>
              </div>
            </div>
          </motion.article>

          <motion.div
            className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <MetricCard value={totalVideos} label="Videos in Collection" suffix={totalVideos === 0 ? " placeholder" : ""} />
            <MetricCard value={collection.platformSources.length} label="Platform Sources" />
            <MetricCard value={collection.keywords.length} label="Indexed Topics" />
          </motion.div>

          <header className="mb-10">
            <h2 className="font-cinzel mb-4 text-2xl font-bold tracking-[0.12em]" style={{ color: BRAND_GOLD }}>
              {collection.title} Videos
            </h2>
            <p className="font-eb-garamond max-w-3xl text-lg font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.72)" }}>
              Browse videos, embeds and external platform links for this collection. When Bilibili and YouTube versions are both available, visitors can switch platforms directly within the card.
            </p>
          </header>

          {collection.videos.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {collection.videos.map((video, index) => (
                <VideoCard key={`${video.title}-${video.date}`} video={video} index={index} isInView={isInView} />
              ))}
            </div>
          ) : (
            <EmptyCollectionState collection={collection} />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function CollectionCard({
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
        style={{ border: `1px solid rgba(201, 162, 39, 0.18)`, backgroundColor: "rgba(19, 34, 56, 0.42)", boxShadow: "0 24px 70px rgba(0, 0, 0, 0.16)" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={collection.coverImage} alt={`${collection.title} collection cover`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/20 to-transparent" />
          <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-sm" style={{ border: `1px solid rgba(201, 162, 39, 0.38)`, backgroundColor: "rgba(13, 27, 42, 0.78)" }}>
            <Icon className="h-6 w-6" style={{ color: BRAND_GOLD }} />
          </div>
        </div>
        <div className="relative p-7">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 80% 0%, rgba(201, 162, 39, 0.14), transparent 42%)" }} />
          <div className="relative z-10">
            <div className="mb-5 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-cormorant text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: `rgba(201, 162, 39, 0.72)` }}>
                  {resolveVideoCountLabel(collection)}
                </span>
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "rgba(201, 162, 39, 0.45)" }} />
                <span className="font-cormorant text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(245, 245, 245, 0.54)" }}>
                  {collection.category}
                </span>
              </div>
              <PlatformBadges platforms={collection.platformSources} />
            </div>
            <h3 className="font-cinzel mb-4 text-xl font-bold" style={{ color: "#F5F5F5" }}>{collection.title}</h3>
            <p className="font-eb-garamond mb-8 text-base font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.74)" }}>{collection.description}</p>
            <span className="inline-flex items-center gap-3 rounded-sm px-5 py-3 font-cormorant text-sm font-bold tracking-[0.14em] transition-all duration-300" style={{ border: `1px solid rgba(201, 162, 39, 0.42)`, color: BRAND_GOLD }}>
              View Collection
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function VideoCard({ video, index, isInView }: { video: VideoItem; index: number; isInView: boolean }) {
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
      transition={{ duration: 0.8, delay: index * 0.12 }}
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

        <div className="mb-3 flex items-center gap-2 font-cormorant text-sm font-semibold tracking-[0.12em]" style={{ color: `rgba(201, 162, 39, 0.72)` }}>
          <Calendar className="h-4 w-4" />
          {video.date}
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
        <div className="flex flex-wrap gap-3">
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

function EmptyCollectionState({ collection }: { collection: VideoCollection }) {
  return (
    <motion.div
      className="mx-auto max-w-3xl rounded-sm p-10 text-center"
      style={{ border: `1px solid rgba(201, 162, 39, 0.16)`, backgroundColor: "rgba(19, 34, 56, 0.36)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Video className="mx-auto mb-5 h-9 w-9" style={{ color: BRAND_GOLD }} />
      <p className="font-cinzel mb-4 text-xl font-bold" style={{ color: BRAND_GOLD }}>
        {collection.title} Archive
      </p>
      <p className="font-eb-garamond text-lg font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
        Video entries for this collection will appear here as Bilibili and YouTube links are added to the reusable video collection data structure.
      </p>
    </motion.div>
  );
}

function CollectionNotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-cinzel mb-6 text-3xl font-bold tracking-[0.15em] md:text-5xl" style={{ color: BRAND_GOLD }}>
            Collection Not Found
          </h1>
          <p className="font-cormorant-garamond mb-8 text-xl font-semibold" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            The requested video collection could not be found.
          </p>
          <button
            onClick={() => setLocation("/insights/videos")}
            className="inline-flex items-center gap-3 rounded-sm px-8 py-3 font-cormorant font-bold tracking-[0.15em] transition-all duration-300"
            style={{ border: `1px solid rgba(201, 162, 39, 0.5)`, color: BRAND_GOLD }}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Collections
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function MetricCard({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="rounded-sm p-6 text-center" style={{ border: `1px solid rgba(201, 162, 39, 0.16)`, backgroundColor: "rgba(19, 34, 56, 0.42)" }}>
      <p className="font-cinzel mb-2 text-3xl font-bold" style={{ color: BRAND_GOLD }}>{value}{suffix}</p>
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
      <p className="font-cinzel mb-4 text-xl font-bold" style={{ color: BRAND_GOLD }}>No Matching Collections</p>
      <p className="font-eb-garamond text-lg font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
        Adjust the search term, knowledge area or platform filter to continue browsing the video library.
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
