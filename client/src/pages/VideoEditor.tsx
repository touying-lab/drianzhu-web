import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, KeyRound, Languages, Save, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import siteTextData from "@/data/siteText.json";
import { getVideoEditId } from "@/data/videoEditIds";
import rawVideoEdits from "@/data/videoEdits.json";
import { getThumbnail, videoCollections, type VideoItem } from "@/data/videoCollections";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const GITHUB_OWNER = "touying-lab";
const GITHUB_REPO = "drianzhu-web";
const GITHUB_BRANCH = "main";
const VIDEO_EDITS_PATH = "client/src/data/videoEdits.json";
const SITE_TEXT_PATH = "client/src/data/siteText.json";

type EditableVideo = VideoItem & {
  id: string;
  city: string;
  collectionSlug: string;
};

type VideoEditOverride = {
  title?: string;
  description?: string;
};

type VideoEditFile = {
  version: number;
  updatedAt: string | null;
  updatedBy: string | null;
  edits: Record<string, VideoEditOverride>;
};

type TranslationEntry = {
  key: string;
  en: string;
  cn: string;
};

type SiteTextFile = {
  version: number;
  updatedAt: string | null;
  updatedBy: string | null;
  translations: Record<string, { en: string; cn: string }>;
};

type GitHubContentResponse = {
  sha?: string;
  content?: string;
  encoding?: string;
};

type GitHubCommitResponse = {
  commit?: {
    sha?: string;
    html_url?: string;
  };
  content?: {
    html_url?: string;
  };
};

const initialVideoEdits = rawVideoEdits as VideoEditFile;
const initialSiteText = siteTextData as SiteTextFile;

const flattenVideos = (): EditableVideo[] =>
  videoCollections.flatMap((collection) =>
    collection.videos.map((video) => ({
      ...video,
      id: getVideoEditId(video),
      city: collection.category,
      collectionSlug: collection.slug,
    })),
  );

const flattenSiteText = (): TranslationEntry[] =>
  Object.entries(initialSiteText.translations).map(([key, value]) => ({
    key,
    en: value.en,
    cn: value.cn,
  }));

const encodeBase64Utf8 = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

const decodeBase64Utf8 = (value: string) => {
  const normalized = value.replace(/\n/g, "");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new TextDecoder().decode(bytes);
};

const getFriendlyGithubError = async (response: Response) => {
  const data = (await response.json().catch(() => ({}))) as { message?: string; documentation_url?: string };

  if (response.status === 401 || response.status === 403) {
    return "GitHub rejected the token. Please use a fine-grained token with Contents read/write access to touying-lab/drianzhu-web.";
  }

  if (response.status === 404) {
    return "GitHub could not find the repository or file. Check that the token has access to touying-lab/drianzhu-web.";
  }

  if (response.status === 409) {
    return "GitHub reported a file conflict. Refresh the editor, re-apply your final edits, and save again.";
  }

  return data.message || "GitHub could not save the edits.";
};

const readJsonFileFromGitHub = async <T,>(token: string, path: string, fallback: T) => {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(await getFriendlyGithubError(response));
  }

  const data = (await response.json()) as GitHubContentResponse;
  const parsed = data.content ? (JSON.parse(decodeBase64Utf8(data.content)) as T) : fallback;

  return { sha: data.sha, file: parsed };
};

const commitJsonFileToGitHub = async ({
  token,
  path,
  sha,
  file,
  message,
}: {
  token: string;
  path: string;
  sha?: string;
  file: unknown;
  message: string;
}) => {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message,
      content: encodeBase64Utf8(`${JSON.stringify(file, null, 2)}\n`),
      branch: GITHUB_BRANCH,
      sha,
    }),
  });

  if (!response.ok) {
    throw new Error(await getFriendlyGithubError(response));
  }

  return (await response.json()) as GitHubCommitResponse;
};

const getTextGroup = (key: string) => key.split(".")[0] || "general";

export default function VideoEditor() {
  const [activePanel, setActivePanel] = useState<"videos" | "chinese">("chinese");
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [textQuery, setTextQuery] = useState("");
  const [textGroupFilter, setTextGroupFilter] = useState("All");
  const [videos, setVideos] = useState<EditableVideo[]>(() => flattenVideos());
  const [originalVideos, setOriginalVideos] = useState<EditableVideo[]>(() => flattenVideos());
  const [siteTextEntries, setSiteTextEntries] = useState<TranslationEntry[]>(() => flattenSiteText());
  const [originalSiteTextEntries, setOriginalSiteTextEntries] = useState<TranslationEntry[]>(() => flattenSiteText());
  const [githubToken, setGithubToken] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const cities = useMemo(() => ["All", ...Array.from(new Set(videos.map((video) => video.city)))], [videos]);
  const originalById = useMemo(() => new Map(originalVideos.map((video) => [video.id, video])), [originalVideos]);
  const originalTextByKey = useMemo(() => new Map(originalSiteTextEntries.map((entry) => [entry.key, entry])), [originalSiteTextEntries]);
  const textGroups = useMemo(() => ["All", ...Array.from(new Set(siteTextEntries.map((entry) => getTextGroup(entry.key))))], [siteTextEntries]);

  const changedVideos = useMemo(
    () =>
      videos.filter((video) => {
        const original = originalById.get(video.id);

        return original && (video.title !== original.title || video.description !== original.description);
      }),
    [originalById, videos],
  );

  const changedSiteTextEntries = useMemo(
    () =>
      siteTextEntries.filter((entry) => {
        const original = originalTextByKey.get(entry.key);

        return original && entry.cn !== original.cn;
      }),
    [originalTextByKey, siteTextEntries],
  );

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return videos.filter((video) => {
      const searchableText = [video.title, video.description, video.city, video.category, video.bilibiliUrl, video.youtubeUrl]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesCity = cityFilter === "All" || video.city === cityFilter;

      return matchesQuery && matchesCity;
    });
  }, [cityFilter, query, videos]);

  const filteredSiteTextEntries = useMemo(() => {
    const normalizedQuery = textQuery.trim().toLowerCase();

    return siteTextEntries.filter((entry) => {
      const searchableText = [entry.key, entry.en, entry.cn].join(" ").toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesGroup = textGroupFilter === "All" || getTextGroup(entry.key) === textGroupFilter;

      return matchesQuery && matchesGroup;
    });
  }, [siteTextEntries, textGroupFilter, textQuery]);

  const updateVideo = (id: string, field: "title" | "description", value: string) => {
    setVideos((currentVideos) =>
      currentVideos.map((video) => (video.id === id ? { ...video, [field]: value } : video)),
    );
  };

  const updateSiteText = (key: string, value: string) => {
    setSiteTextEntries((currentEntries) =>
      currentEntries.map((entry) => (entry.key === key ? { ...entry, cn: value } : entry)),
    );
  };

  const resetChanges = () => {
    setVideos(originalVideos.map((video) => ({ ...video })));
    setSiteTextEntries(originalSiteTextEntries.map((entry) => ({ ...entry })));
    toast.info("Unsaved edits have been reset.");
  };

  const saveChanges = async () => {
    const hasVideoChanges = changedVideos.length > 0;
    const hasTextChanges = changedSiteTextEntries.length > 0;

    if (!hasVideoChanges && !hasTextChanges) {
      toast.info("There are no edits to save.");
      return;
    }

    const token = githubToken.trim();
    if (!token) {
      toast.error("Paste a GitHub token before saving. It is required only when publishing the final edits.");
      return;
    }

    const invalidVideo = changedVideos.find((video) => !video.title.trim() || !video.description.trim());
    if (invalidVideo) {
      toast.error("Every edited video must keep both a title and a description.");
      return;
    }

    const invalidText = changedSiteTextEntries.find((entry) => !entry.cn.trim());
    if (invalidText) {
      toast.error(`Chinese website text cannot be blank. Please complete ${invalidText.key}.`);
      return;
    }

    setIsSaving(true);

    try {
      const commits: string[] = [];

      if (hasVideoChanges) {
        const latest = await readJsonFileFromGitHub<VideoEditFile>(token, VIDEO_EDITS_PATH, initialVideoEdits);
        const nextEdits: Record<string, VideoEditOverride> = { ...(latest.file.edits || {}) };

        changedVideos.forEach((video) => {
          nextEdits[video.id] = {
            title: video.title.trim(),
            description: video.description.trim(),
          };
        });

        const nextFile: VideoEditFile = {
          version: latest.file.version || 1,
          updatedAt: new Date().toISOString(),
          updatedBy: "private-content-editor",
          edits: nextEdits,
        };

        const commit = await commitJsonFileToGitHub({
          token,
          path: VIDEO_EDITS_PATH,
          sha: latest.sha,
          file: nextFile,
          message: "Update Insights video editor metadata",
        });

        if (commit.commit?.sha) {
          commits.push(commit.commit.sha.slice(0, 7));
        }
      }

      if (hasTextChanges) {
        const latest = await readJsonFileFromGitHub<SiteTextFile>(token, SITE_TEXT_PATH, initialSiteText);
        const nextTranslations: SiteTextFile["translations"] = { ...(latest.file.translations || {}) };

        changedSiteTextEntries.forEach((entry) => {
          nextTranslations[entry.key] = {
            en: nextTranslations[entry.key]?.en ?? entry.en,
            cn: entry.cn.trimEnd(),
          };
        });

        const nextFile: SiteTextFile = {
          version: latest.file.version || 1,
          updatedAt: new Date().toISOString(),
          updatedBy: "private-content-editor",
          translations: nextTranslations,
        };

        const commit = await commitJsonFileToGitHub({
          token,
          path: SITE_TEXT_PATH,
          sha: latest.sha,
          file: nextFile,
          message: "Update Chinese website copy",
        });

        if (commit.commit?.sha) {
          commits.push(commit.commit.sha.slice(0, 7));
        }
      }

      setOriginalVideos(videos.map((video) => ({ ...video })));
      setOriginalSiteTextEntries(siteTextEntries.map((entry) => ({ ...entry })));
      toast.success(
        commits.length > 0
          ? `Saved. GitHub commit${commits.length > 1 ? "s" : ""} ${commits.join(", ")} created; GitHub Pages should redeploy shortly.`
          : "Saved. GitHub Pages should redeploy shortly.",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save the edits to GitHub.");
    } finally {
      setIsSaving(false);
    }
  };

  const totalChanges = changedVideos.length + changedSiteTextEntries.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_BLUE }}>
      <Navigation />

      <main className="px-6 py-20 md:py-28">
        <motion.section
          className="container mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <ShieldCheck className="h-7 w-7" style={{ color: BRAND_GOLD }} />
              <p className="font-cormorant text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                Hidden Editor
              </p>
            </div>
            <h1 className="font-cinzel mb-5 text-3xl font-bold tracking-[0.14em] md:text-5xl" style={{ color: BRAND_GOLD }}>
              Website Copy & Video Library Editor
            </h1>
            <p className="font-eb-garamond text-lg font-medium leading-relaxed md:text-xl" style={{ color: "rgba(245, 245, 245, 0.76)" }}>
              Edit Chinese website text and Insights video metadata here, then use a GitHub token at the end to publish the final changes.
            </p>
          </div>

          <section>
            <div className="mb-6 rounded-sm p-5 md:p-6" style={{ border: "1px solid rgba(201, 162, 39, 0.18)", backgroundColor: "rgba(19, 34, 56, 0.62)" }}>
              <p className="font-eb-garamond text-base font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.74)" }}>
                Anyone with the hidden URL can view this editor page, so keep the URL private. To publish, paste a fine-grained GitHub token with <strong>Contents: Read and write</strong> access to <strong>touying-lab/drianzhu-web</strong>. The token is used only in this browser when you click Save Changes and is not committed to the website.
              </p>
            </div>

            <div className="mb-8 rounded-sm p-5 md:p-6" style={{ border: "1px solid rgba(201, 162, 39, 0.18)", backgroundColor: "rgba(19, 34, 56, 0.62)" }}>
              <label className="mb-6 block">
                <span className="mb-2 flex items-center gap-2 font-cormorant text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                  <KeyRound className="h-4 w-4" /> GitHub Token for Final Save
                </span>
                <input
                  value={githubToken}
                  onChange={(event) => setGithubToken(event.target.value)}
                  placeholder="Paste GitHub fine-grained token here before saving"
                  type="password"
                  autoComplete="off"
                  className="w-full rounded-sm px-4 py-3 font-eb-garamond text-base outline-none placeholder:text-white/35"
                  style={{ border: "1px solid rgba(201, 162, 39, 0.22)", color: "rgba(245, 245, 245, 0.88)", backgroundColor: "rgba(7, 20, 33, 0.68)" }}
                />
                <p className="mt-2 font-eb-garamond text-sm leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.55)" }}>
                  Recommended token scope: only the <strong>touying-lab/drianzhu-web</strong> repository, with <strong>Contents read/write</strong>. Keep the token private.
                </p>
              </label>

              <div className="mb-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => setActivePanel("chinese")} className="inline-flex items-center gap-2 px-5 py-3 font-cormorant text-sm font-bold uppercase tracking-[0.13em] transition-all duration-300" style={{ border: `1px solid rgba(201, 162, 39, ${activePanel === "chinese" ? 0.58 : 0.22})`, color: activePanel === "chinese" ? BRAND_GOLD : "rgba(245, 245, 245, 0.68)", backgroundColor: activePanel === "chinese" ? "rgba(201, 162, 39, 0.08)" : "transparent" }}>
                  <Languages className="h-4 w-4" /> Chinese Website Text ({changedSiteTextEntries.length})
                </button>
                <button type="button" onClick={() => setActivePanel("videos")} className="inline-flex items-center gap-2 px-5 py-3 font-cormorant text-sm font-bold uppercase tracking-[0.13em] transition-all duration-300" style={{ border: `1px solid rgba(201, 162, 39, ${activePanel === "videos" ? 0.58 : 0.22})`, color: activePanel === "videos" ? BRAND_GOLD : "rgba(245, 245, 245, 0.68)", backgroundColor: activePanel === "videos" ? "rgba(201, 162, 39, 0.08)" : "transparent" }}>
                  Video Titles & Descriptions ({changedVideos.length})
                </button>
              </div>

              <div className="flex flex-col gap-3 border-t pt-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(201, 162, 39, 0.14)" }}>
                <p className="font-eb-garamond text-base font-medium" style={{ color: "rgba(245, 245, 245, 0.72)" }}>
                  {changedSiteTextEntries.length} Chinese text edits and {changedVideos.length} video edits are waiting to be saved.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={resetChanges} disabled={totalChanges === 0 || isSaving} className="px-5 py-3 font-cormorant text-sm font-bold tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-45" style={{ border: "1px solid rgba(245, 245, 245, 0.2)", color: "rgba(245, 245, 245, 0.72)" }}>
                    Reset All
                  </button>
                  <button type="button" onClick={saveChanges} disabled={totalChanges === 0 || isSaving} className="inline-flex items-center gap-3 px-6 py-3 font-cinzel text-sm font-bold tracking-[0.16em] disabled:cursor-not-allowed disabled:opacity-45" style={{ border: "1px solid rgba(201, 162, 39, 0.52)", color: BRAND_GOLD, backgroundColor: "rgba(201, 162, 39, 0.08)" }}>
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving to GitHub..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>

            {activePanel === "chinese" && (
              <section>
                <div className="mb-8 rounded-sm p-5 md:p-6" style={{ border: "1px solid rgba(201, 162, 39, 0.18)", backgroundColor: "rgba(19, 34, 56, 0.62)" }}>
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                    <label className="block">
                      <span className="mb-2 block font-cormorant text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                        Search Chinese Text
                      </span>
                      <div className="flex items-center gap-3 rounded-sm px-4 py-3" style={{ border: "1px solid rgba(201, 162, 39, 0.22)", backgroundColor: "rgba(7, 20, 33, 0.68)" }}>
                        <Search className="h-5 w-5 flex-shrink-0" style={{ color: BRAND_GOLD }} />
                        <input
                          value={textQuery}
                          onChange={(event) => setTextQuery(event.target.value)}
                          placeholder="Search key, English reference or Chinese text"
                          className="w-full bg-transparent font-eb-garamond text-base outline-none placeholder:text-white/35"
                          style={{ color: "rgba(245, 245, 245, 0.88)" }}
                        />
                      </div>
                    </label>
                    <div>
                      <p className="mb-2 font-cormorant text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                        Section
                      </p>
                      <div className="flex max-w-3xl flex-wrap gap-2 lg:justify-end">
                        {textGroups.map((group) => (
                          <button
                            key={group}
                            type="button"
                            onClick={() => setTextGroupFilter(group)}
                            className="rounded-sm px-4 py-2 font-cormorant text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300"
                            style={{
                              border: `1px solid rgba(201, 162, 39, ${textGroupFilter === group ? 0.58 : 0.2})`,
                              color: textGroupFilter === group ? BRAND_GOLD : "rgba(245, 245, 245, 0.66)",
                              backgroundColor: textGroupFilter === group ? "rgba(201, 162, 39, 0.08)" : "transparent",
                            }}
                          >
                            {group}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 border-t pt-5 font-eb-garamond text-base font-medium" style={{ borderColor: "rgba(201, 162, 39, 0.14)", color: "rgba(245, 245, 245, 0.72)" }}>
                    Showing {filteredSiteTextEntries.length} editable Chinese text fields. English is shown as a reference; edit the Chinese field below it.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {filteredSiteTextEntries.map((entry) => {
                    const original = originalTextByKey.get(entry.key);
                    const changed = original && original.cn !== entry.cn;

                    return (
                      <article key={entry.key} className="rounded-sm p-5 md:p-6" style={{ border: `1px solid rgba(201, 162, 39, ${changed ? 0.42 : 0.16})`, backgroundColor: "rgba(13, 27, 42, 0.46)" }}>
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <span className="font-cormorant text-sm font-semibold tracking-[0.14em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                            {entry.key}
                          </span>
                          {changed && <span className="rounded-sm px-3 py-1 font-cormorant text-xs font-bold uppercase tracking-[0.14em]" style={{ color: DEEP_BLUE, backgroundColor: BRAND_GOLD }}>Edited</span>}
                        </div>

                        <label className="mb-4 block">
                          <span className="mb-2 block font-cormorant text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                            English Reference
                          </span>
                          <textarea
                            value={entry.en}
                            readOnly
                            rows={entry.en.length > 90 ? 3 : 2}
                            className="w-full resize-y rounded-sm px-4 py-3 font-eb-garamond text-base font-medium leading-relaxed outline-none"
                            style={{ border: "1px solid rgba(245, 245, 245, 0.14)", color: "rgba(245, 245, 245, 0.58)", backgroundColor: "rgba(7, 20, 33, 0.45)" }}
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block font-cormorant text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                            Chinese Text
                          </span>
                          <textarea
                            value={entry.cn}
                            onChange={(event) => updateSiteText(entry.key, event.target.value)}
                            rows={entry.cn.length > 90 ? 4 : 2}
                            className="w-full resize-y rounded-sm px-4 py-3 font-eb-garamond text-base font-medium leading-relaxed outline-none"
                            style={{ border: "1px solid rgba(201, 162, 39, 0.22)", color: "rgba(245, 245, 245, 0.9)", backgroundColor: "rgba(7, 20, 33, 0.68)" }}
                          />
                        </label>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {activePanel === "videos" && (
              <section>
                <div className="mb-8 rounded-sm p-5 md:p-6" style={{ border: "1px solid rgba(201, 162, 39, 0.18)", backgroundColor: "rgba(19, 34, 56, 0.62)" }}>
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                    <label className="block">
                      <span className="mb-2 block font-cormorant text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                        Search Videos
                      </span>
                      <div className="flex items-center gap-3 rounded-sm px-4 py-3" style={{ border: "1px solid rgba(201, 162, 39, 0.22)", backgroundColor: "rgba(7, 20, 33, 0.68)" }}>
                        <Search className="h-5 w-5 flex-shrink-0" style={{ color: BRAND_GOLD }} />
                        <input
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder="Search title, description, city or platform URL"
                          className="w-full bg-transparent font-eb-garamond text-base outline-none placeholder:text-white/35"
                          style={{ color: "rgba(245, 245, 245, 0.88)" }}
                        />
                      </div>
                    </label>
                    <div>
                      <p className="mb-2 font-cormorant text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                        City
                      </p>
                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {cities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => setCityFilter(city)}
                            className="rounded-sm px-4 py-2 font-cormorant text-sm font-bold tracking-[0.12em] transition-all duration-300"
                            style={{
                              border: `1px solid rgba(201, 162, 39, ${cityFilter === city ? 0.58 : 0.2})`,
                              color: cityFilter === city ? BRAND_GOLD : "rgba(245, 245, 245, 0.66)",
                              backgroundColor: cityFilter === city ? "rgba(201, 162, 39, 0.08)" : "transparent",
                            }}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 border-t pt-5 font-eb-garamond text-base font-medium" style={{ borderColor: "rgba(201, 162, 39, 0.14)", color: "rgba(245, 245, 245, 0.72)" }}>
                    Showing {filteredVideos.length} videos. {changedVideos.length} unsaved {changedVideos.length === 1 ? "edit" : "edits"}.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {filteredVideos.map((video) => {
                    const original = originalById.get(video.id);
                    const changed = original && (original.title !== video.title || original.description !== video.description);
                    const thumbnail = getThumbnail(video);

                    return (
                      <article key={video.id} className="grid grid-cols-1 overflow-hidden rounded-sm lg:grid-cols-[280px_1fr]" style={{ border: `1px solid rgba(201, 162, 39, ${changed ? 0.42 : 0.16})`, backgroundColor: "rgba(13, 27, 42, 0.46)" }}>
                        <div className="relative aspect-video lg:aspect-auto lg:min-h-full" style={{ backgroundColor: DEEP_BLUE }}>
                          <img src={thumbnail} alt={`Thumbnail for ${video.title}`} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                          <span className="absolute inset-0 bg-[#0D1B2A]/36" />
                          {changed && <span className="absolute left-4 top-4 rounded-sm px-3 py-1 font-cormorant text-xs font-bold uppercase tracking-[0.14em]" style={{ color: DEEP_BLUE, backgroundColor: BRAND_GOLD }}>Edited</span>}
                        </div>

                        <div className="p-5 md:p-6">
                          <div className="mb-4 flex flex-wrap items-center gap-2 font-cormorant text-sm font-semibold tracking-[0.12em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                            <Calendar className="h-4 w-4" />
                            <span>{video.date}</span>
                            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "rgba(201, 162, 39, 0.45)" }} />
                            <span>{video.city}</span>
                            {video.bilibiliUrl && (
                              <a href={video.bilibiliUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                                Bilibili <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>

                          <label className="mb-4 block">
                            <span className="mb-2 block font-cormorant text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                              Title
                            </span>
                            <input
                              value={video.title}
                              onChange={(event) => updateVideo(video.id, "title", event.target.value)}
                              className="w-full rounded-sm px-4 py-3 font-eb-garamond text-lg font-semibold outline-none"
                              style={{ border: "1px solid rgba(201, 162, 39, 0.22)", color: "rgba(245, 245, 245, 0.9)", backgroundColor: "rgba(7, 20, 33, 0.68)" }}
                            />
                          </label>

                          <label className="block">
                            <span className="mb-2 block font-cormorant text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                              Description
                            </span>
                            <textarea
                              value={video.description}
                              onChange={(event) => updateVideo(video.id, "description", event.target.value)}
                              rows={4}
                              className="w-full resize-y rounded-sm px-4 py-3 font-eb-garamond text-base font-medium leading-relaxed outline-none"
                              style={{ border: "1px solid rgba(201, 162, 39, 0.22)", color: "rgba(245, 245, 245, 0.86)", backgroundColor: "rgba(7, 20, 33, 0.68)" }}
                            />
                          </label>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </section>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
