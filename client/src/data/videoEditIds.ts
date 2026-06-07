import type { VideoItem } from "./videoCollections";

const normalizeForId = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

export const getVideoEditId = (video: Pick<VideoItem, "bilibiliUrl" | "youtubeUrl" | "category" | "date" | "title">) => {
  const stableSource = video.bilibiliUrl || video.youtubeUrl || `${video.category}-${video.date}-${video.title}`;
  const normalized = normalizeForId(stableSource);

  return normalized || normalizeForId(`${video.category}-${video.date}-${video.title}`);
};
