import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Clapperboard,
  Landmark,
  Mic2,
  Presentation,
  Tv,
} from "lucide-react";

export type VideoPlatform = "bilibili" | "youtube";

export type VideoItem = {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  category: string;
  bilibiliUrl?: string;
  youtubeUrl?: string;
};

export type VideoCollection = {
  slug: string;
  title: string;
  description: string;
  featureDescription: string;
  videoCountLabel: string;
  lastUpdated: string;
  platformSources: VideoPlatform[];
  category: string;
  coverImage: string;
  icon: LucideIcon;
  featured?: boolean;
  keywords: string[];
  videos: VideoItem[];
};

const thumbnailBase =
  "linear-gradient(135deg, rgba(13, 27, 42, 0.96), rgba(19, 34, 56, 0.92) 45%, rgba(201, 162, 39, 0.28))";

const svgText = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");

export const createPremiumThumbnail = (title: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0D1B2A"/>
          <stop offset="52%" stop-color="#132238"/>
          <stop offset="100%" stop-color="#2B2718"/>
        </linearGradient>
        <radialGradient id="glow" cx="72%" cy="30%" r="58%">
          <stop offset="0%" stop-color="#C9A227" stop-opacity="0.34"/>
          <stop offset="100%" stop-color="#C9A227" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <rect width="1280" height="720" fill="url(#glow)"/>
      <rect x="72" y="72" width="1136" height="576" fill="none" stroke="#C9A227" stroke-opacity="0.34" stroke-width="2"/>
      <rect x="104" y="104" width="1072" height="512" fill="none" stroke="#C9A227" stroke-opacity="0.16" stroke-width="1"/>
      <text x="640" y="322" text-anchor="middle" fill="#C9A227" font-family="Cinzel, Georgia, serif" font-size="42" letter-spacing="8">DR IAN ZHU</text>
      <line x1="520" y1="360" x2="760" y2="360" stroke="#C9A227" stroke-opacity="0.72" stroke-width="2"/>
      <text x="640" y="420" text-anchor="middle" fill="#F5F5F5" fill-opacity="0.86" font-family="Cormorant Garamond, Georgia, serif" font-size="38">${svgText(title)}</text>
    </svg>
  `)}`;

const createCollectionCover = ({
  title,
  subtitle,
  motif,
  accent = "#C9A227",
}: {
  title: string;
  subtitle: string;
  motif: string;
  accent?: string;
}) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
      <defs>
        <linearGradient id="coverBg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#071421"/>
          <stop offset="48%" stop-color="#0D1B2A"/>
          <stop offset="100%" stop-color="#182640"/>
        </linearGradient>
        <radialGradient id="goldGlow" cx="74%" cy="24%" r="56%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.42"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="${accent}" stroke-opacity="0.055" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="760" fill="url(#coverBg)"/>
      <rect width="1200" height="760" fill="url(#grid)"/>
      <rect width="1200" height="760" fill="url(#goldGlow)"/>
      <circle cx="928" cy="180" r="132" fill="none" stroke="${accent}" stroke-opacity="0.2" stroke-width="2"/>
      <circle cx="928" cy="180" r="92" fill="none" stroke="${accent}" stroke-opacity="0.12" stroke-width="1"/>
      <path d="M82 604 C258 520 376 670 548 584 S842 486 1118 560" fill="none" stroke="${accent}" stroke-opacity="0.22" stroke-width="2"/>
      <path d="M98 132 H1102 V628 H98 Z" fill="none" stroke="${accent}" stroke-opacity="0.32" stroke-width="2"/>
      <path d="M128 162 H1072 V598 H128 Z" fill="none" stroke="#F5F5F5" stroke-opacity="0.08" stroke-width="1"/>
      <text x="156" y="236" fill="${accent}" font-family="Cinzel, Georgia, serif" font-size="30" letter-spacing="7">DR IAN ZHU</text>
      <line x1="156" y1="276" x2="320" y2="276" stroke="${accent}" stroke-opacity="0.75" stroke-width="2"/>
      <text x="156" y="386" fill="#F5F5F5" font-family="Cinzel, Georgia, serif" font-size="50" letter-spacing="5">${svgText(title)}</text>
      <text x="156" y="452" fill="#F5F5F5" fill-opacity="0.74" font-family="Cormorant Garamond, Georgia, serif" font-size="30">${svgText(subtitle)}</text>
      <text x="156" y="544" fill="${accent}" fill-opacity="0.72" font-family="Cormorant Garamond, Georgia, serif" font-size="26" letter-spacing="2">${svgText(motif)}</text>
    </svg>
  `)}`;

export const videoCollections: VideoCollection[] = [
  {
    slug: "chinese-investment",
    title: "Chinese Investment",
    description:
      "Video content and research relating to Chinese investment in the United Kingdom and Europe.",
    featureDescription:
      "A flagship collection connecting Tou Ying Tracker research, policy context and cross-border investment commentary.",
    videoCountLabel: "0 videos",
    lastUpdated: "June 2026",
    platformSources: ["bilibili", "youtube"],
    category: "Investment Research",
    coverImage: createCollectionCover({
      title: "Chinese Investment",
      subtitle: "UK · Europe · Capital Flows",
      motif: "Investment intelligence · policy · markets",
    }),
    icon: Landmark,
    featured: true,
    keywords: ["china", "investment", "uk", "europe", "tou ying", "finance", "policy"],
    videos: [],
  },
  {
    slug: "cross-border-commerce",
    title: "Cross-Border Commerce",
    description: "Trade, regulation, investment and international business discussions.",
    featureDescription:
      "Trade, regulation and international business insights for companies operating between markets, cultures and legal systems.",
    videoCountLabel: "0 videos",
    lastUpdated: "June 2026",
    platformSources: ["youtube", "bilibili"],
    category: "International Business",
    coverImage: createCollectionCover({
      title: "Cross-Border Commerce",
      subtitle: "Trade · Regulation · Growth",
      motif: "International business strategy",
    }),
    icon: BriefcaseBusiness,
    keywords: ["commerce", "trade", "regulation", "business", "international", "market access"],
    videos: [],
  },
  {
    slug: "public-speaking",
    title: "Public Speaking",
    description: "Conference presentations, keynote speeches and panel discussions.",
    featureDescription:
      "Conference appearances, keynote speeches and panel contributions focused on finance, law and global trust.",
    videoCountLabel: "0 videos",
    lastUpdated: "June 2026",
    platformSources: ["youtube"],
    category: "Speaking Engagements",
    coverImage: createCollectionCover({
      title: "Public Speaking",
      subtitle: "Keynotes · Panels · Forums",
      motif: "Leadership on the international stage",
    }),
    icon: Mic2,
    keywords: ["conference", "keynote", "panel", "speaking", "leadership", "events"],
    videos: [],
  },
  {
    slug: "media-interviews",
    title: "Media Interviews",
    description: "Television appearances, interviews and media commentary.",
    featureDescription:
      "Selected media appearances and interview-led commentary on international business, investment and dispute resolution.",
    videoCountLabel: "0 videos",
    lastUpdated: "June 2026",
    platformSources: ["youtube", "bilibili"],
    category: "Media Commentary",
    coverImage: createCollectionCover({
      title: "Media Interviews",
      subtitle: "Broadcast · Interviews · Commentary",
      motif: "Trusted voice for global audiences",
    }),
    icon: Tv,
    keywords: ["media", "interviews", "television", "commentary", "broadcast", "press"],
    videos: [],
  },
  {
    slug: "research-presentations",
    title: "Research Presentations",
    description: "Presentations supporting reports and published research.",
    featureDescription:
      "Research-led briefings, report presentations and thought leadership connected to published analysis.",
    videoCountLabel: "0 videos",
    lastUpdated: "June 2026",
    platformSources: ["bilibili", "youtube"],
    category: "Research & Publications",
    coverImage: createCollectionCover({
      title: "Research Presentations",
      subtitle: "Reports · Briefings · Analysis",
      motif: "Academic depth with commercial relevance",
    }),
    icon: Presentation,
    keywords: ["research", "presentations", "reports", "publications", "analysis", "briefings"],
    videos: [],
  },
  {
    slug: "video-library",
    title: "Video Library",
    description: "A curated collection of interviews, speeches and thought leadership content.",
    featureDescription:
      "The complete archive for interviews, speeches, public appearances and research-led video content.",
    videoCountLabel: "0 videos",
    lastUpdated: "June 2026",
    platformSources: ["youtube", "bilibili"],
    category: "Full Archive",
    coverImage: createCollectionCover({
      title: "Video Library",
      subtitle: "Archive · Speeches · Interviews",
      motif: "Premium knowledge library",
    }),
    icon: Clapperboard,
    keywords: ["video", "archive", "library", "interviews", "speeches", "thought leadership"],
    videos: [],
  },
];

export const getVideoCollection = (slug: string | undefined) =>
  videoCollections.find((collection) => collection.slug === slug);

export const getFeaturedCollection = () =>
  videoCollections.find((collection) => collection.featured) ?? videoCollections[0];

export const resolveVideoCountLabel = (collection: VideoCollection) => {
  if (collection.videos.length === 0) {
    return collection.videoCountLabel;
  }

  return `${collection.videos.length} ${collection.videos.length === 1 ? "video" : "videos"}`;
};

export const getPlatformLabel = (platforms: VideoPlatform[]) => {
  if (platforms.includes("youtube") && platforms.includes("bilibili")) {
    return "YouTube + Bilibili";
  }

  if (platforms.includes("youtube")) {
    return "YouTube";
  }

  if (platforms.includes("bilibili")) {
    return "Bilibili";
  }

  return "Platform pending";
};

export const getVideoPlatforms = (video: VideoItem): VideoPlatform[] => {
  const platforms: VideoPlatform[] = [];

  if (video.bilibiliUrl) {
    platforms.push("bilibili");
  }

  if (video.youtubeUrl) {
    platforms.push("youtube");
  }

  return platforms;
};

export const getThumbnail = (video: VideoItem) => video.thumbnail || createPremiumThumbnail(video.title);

export const thumbnailBackdrop = thumbnailBase;
