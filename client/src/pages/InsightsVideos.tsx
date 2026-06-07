import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, Calendar, ExternalLink, Play, Video } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  getThumbnail,
  getVideoCollection,
  resolveVideoCountLabel,
  videoCollections,
  type VideoCollection,
  type VideoItem,
} from "@/data/videoCollections";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const SECTION_BG = "#132238";

type Platform = "bilibili" | "youtube";

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />
      <section ref={ref} className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden" style={{ backgroundColor: DEEP_BLUE }}>
        <DecorativeBackdrop />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Video className="w-6 h-6" style={{ color: BRAND_GOLD }} />
              <h1 className="font-cinzel text-3xl md:text-5xl tracking-[0.15em] font-bold" style={{ color: BRAND_GOLD }}>
                Featured Collections
              </h1>
            </div>
            <div className="w-20 h-0.5 mb-8 mx-auto" style={{ backgroundColor: BRAND_GOLD }} />
            <p className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: "rgba(255, 255, 255, 0.82)" }}>
              A premium video archive for interviews, public appearances, research presentations and cross-border thought leadership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoCollections.map((collection, index) => (
              <CollectionCard
                key={collection.slug}
                collection={collection}
                index={index}
                isInView={isInView}
                onOpen={() => setLocation(`/insights/videos/${collection.slug}`)}
              />
            ))}
          </div>
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />
      <section ref={ref} className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden" style={{ backgroundColor: DEEP_BLUE }}>
        <DecorativeBackdrop />
        <div className="container mx-auto px-6 relative z-10">
          <motion.button
            onClick={() => setLocation("/insights/videos")}
            className="inline-flex items-center gap-3 mb-10 px-5 py-3 rounded-sm font-cormorant tracking-[0.12em] font-bold transition-all duration-300"
            style={{ border: `1px solid rgba(201, 162, 39, 0.35)`, color: BRAND_GOLD }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(201, 162, 39, 0.08)" }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            All Collections
          </motion.button>

          <motion.div
            className="max-w-4xl mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-sm flex items-center justify-center" style={{ border: `1px solid rgba(201, 162, 39, 0.35)`, backgroundColor: "rgba(19, 34, 56, 0.48)" }}>
                <Icon className="w-8 h-8" style={{ color: BRAND_GOLD }} />
              </div>
              <span className="font-cormorant text-sm tracking-[0.18em] uppercase font-semibold" style={{ color: `rgba(201, 162, 39, 0.75)` }}>
                {resolveVideoCountLabel(collection)}
              </span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl tracking-[0.14em] mb-6 font-bold" style={{ color: BRAND_GOLD }}>
              {collection.title}
            </h1>
            <div className="w-20 h-0.5 mb-8" style={{ backgroundColor: BRAND_GOLD }} />
            <p className="font-cormorant-garamond text-xl md:text-2xl leading-relaxed font-semibold" style={{ color: "rgba(255, 255, 255, 0.82)" }}>
              {collection.description}
            </p>
          </motion.div>

          {collection.videos.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
        className="relative h-full w-full text-left overflow-hidden rounded-sm p-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
        style={{
          border: `1px solid rgba(201, 162, 39, 0.18)`,
          backgroundColor: "rgba(19, 34, 56, 0.42)",
          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.16)",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 80% 0%, rgba(201, 162, 39, 0.16), transparent 42%)" }} />
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-sm flex items-center justify-center mb-7 transition-all duration-500 group-hover:scale-105" style={{ border: `1px solid rgba(201, 162, 39, 0.35)`, backgroundColor: "rgba(13, 27, 42, 0.72)" }}>
            <Icon className="w-7 h-7" style={{ color: BRAND_GOLD }} />
          </div>
          <p className="font-cormorant text-xs tracking-[0.18em] uppercase mb-4 font-semibold" style={{ color: `rgba(201, 162, 39, 0.72)` }}>
            {resolveVideoCountLabel(collection)}
          </p>
          <h3 className="font-cinzel text-xl mb-4 font-bold" style={{ color: "#F5F5F5" }}>
            {collection.title}
          </h3>
          <p className="font-eb-garamond text-base leading-relaxed mb-8 font-medium" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
            {collection.description}
          </p>
          <span className="inline-flex items-center gap-3 px-5 py-3 rounded-sm font-cormorant tracking-[0.14em] text-sm font-bold transition-all duration-300" style={{ border: `1px solid rgba(201, 162, 39, 0.42)`, color: BRAND_GOLD }}>
            View Collection
            <Play className="w-4 h-4" />
          </span>
        </div>
      </button>
    </motion.article>
  );
}

function VideoCard({ video, index, isInView }: { video: VideoItem; index: number; isInView: boolean }) {
  const defaultPlatform: Platform = video.bilibiliUrl ? "bilibili" : "youtube";
  const [activePlatform, setActivePlatform] = useState<Platform>(defaultPlatform);
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
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <img src={getThumbnail(video)} alt={video.title} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="p-7">
        {hasBothPlatforms && (
          <div className="flex gap-3 mb-5">
            {(["bilibili", "youtube"] as Platform[]).map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className="px-4 py-2 rounded-sm font-cormorant tracking-[0.12em] text-sm font-bold transition-all duration-300"
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

        <div className="flex items-center gap-2 mb-3 font-cormorant text-sm tracking-[0.12em] font-semibold" style={{ color: `rgba(201, 162, 39, 0.72)` }}>
          <Calendar className="w-4 h-4" />
          {video.date}
        </div>
        <h2 className="font-cinzel text-xl mb-3 font-bold" style={{ color: "#F5F5F5" }}>
          {video.title}
        </h2>
        <p className="font-cormorant text-sm tracking-[0.14em] uppercase mb-4 font-semibold" style={{ color: `rgba(201, 162, 39, 0.66)` }}>
          {video.category}
        </p>
        <p className="font-eb-garamond text-base leading-relaxed mb-6 font-medium" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
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
      className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-cormorant tracking-[0.12em] text-sm font-bold transition-all duration-300 hover:bg-white/5"
      style={{ border: `1px solid rgba(201, 162, 39, 0.36)`, color: BRAND_GOLD }}
    >
      {label}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}

function EmptyCollectionState({ collection }: { collection: VideoCollection }) {
  return (
    <motion.div
      className="max-w-3xl rounded-sm p-10 text-center mx-auto"
      style={{ border: `1px solid rgba(201, 162, 39, 0.16)`, backgroundColor: "rgba(19, 34, 56, 0.36)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <p className="font-cinzel text-xl mb-4 font-bold" style={{ color: BRAND_GOLD }}>
        {collection.title} Archive
      </p>
      <p className="font-eb-garamond text-lg leading-relaxed font-medium" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
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
          <h1 className="font-cinzel text-3xl md:text-5xl tracking-[0.15em] mb-6 font-bold" style={{ color: BRAND_GOLD }}>
            Collection Not Found
          </h1>
          <p className="font-cormorant-garamond text-xl mb-8 font-semibold" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            The requested video collection could not be found.
          </p>
          <button
            onClick={() => setLocation("/insights/videos")}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-sm font-cormorant tracking-[0.15em] font-bold transition-all duration-300"
            style={{ border: `1px solid rgba(201, 162, 39, 0.5)`, color: BRAND_GOLD }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Collections
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function DecorativeBackdrop() {
  return (
    <div className="absolute inset-0 opacity-5">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(201, 162, 39, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 70% 60%, rgba(201, 162, 39, 0.3) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}
