import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Clapperboard,
  Landmark,
  Mic2,
  Presentation,
  Tv,
} from "lucide-react";

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
  videoCountLabel: string;
  icon: LucideIcon;
  videos: VideoItem[];
};

const thumbnailBase =
  "linear-gradient(135deg, rgba(13, 27, 42, 0.96), rgba(19, 34, 56, 0.92) 45%, rgba(201, 162, 39, 0.28))";

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
      <text x="640" y="420" text-anchor="middle" fill="#F5F5F5" fill-opacity="0.86" font-family="Cormorant Garamond, Georgia, serif" font-size="38">${title}</text>
    </svg>
  `)}`;

export const videoCollections: VideoCollection[] = [
  {
    slug: "video-library",
    title: "Video Library",
    description: "A curated collection of interviews, speeches and thought leadership content.",
    videoCountLabel: "0 videos",
    icon: Clapperboard,
    videos: [],
  },
  {
    slug: "chinese-investment",
    title: "Chinese Investment",
    description:
      "Video content and research relating to Chinese investment in the United Kingdom and Europe.",
    videoCountLabel: "0 videos",
    icon: Landmark,
    videos: [],
  },
  {
    slug: "cross-border-commerce",
    title: "Cross-Border Commerce",
    description: "Trade, regulation, investment and international business discussions.",
    videoCountLabel: "0 videos",
    icon: BriefcaseBusiness,
    videos: [],
  },
  {
    slug: "media-interviews",
    title: "Media Interviews",
    description: "Television appearances, interviews and media commentary.",
    videoCountLabel: "0 videos",
    icon: Tv,
    videos: [],
  },
  {
    slug: "public-speaking",
    title: "Public Speaking",
    description: "Conference presentations, keynote speeches and panel discussions.",
    videoCountLabel: "0 videos",
    icon: Mic2,
    videos: [],
  },
  {
    slug: "research-presentations",
    title: "Research Presentations",
    description: "Presentations supporting reports and published research.",
    videoCountLabel: "0 videos",
    icon: Presentation,
    videos: [],
  },
];

export const getVideoCollection = (slug: string | undefined) =>
  videoCollections.find((collection) => collection.slug === slug);

export const resolveVideoCountLabel = (collection: VideoCollection) => {
  if (collection.videos.length === 0) {
    return collection.videoCountLabel;
  }

  return `${collection.videos.length} ${collection.videos.length === 1 ? "video" : "videos"}`;
};

export const getThumbnail = (video: VideoItem) => video.thumbnail || createPremiumThumbnail(video.title);

export const thumbnailBackdrop = thumbnailBase;
