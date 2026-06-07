import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, KeyRound, Lock, Save, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { getVideoEditId } from "@/data/videoEditIds";
import { getThumbnail, videoCollections, type VideoItem } from "@/data/videoCollections";

const BRAND_GOLD = "#C9A227";
const DEEP_BLUE = "#0D1B2A";
const SESSION_STORAGE_KEY = "drianzhu-video-editor-token";

type EditableVideo = VideoItem & {
  id: string;
  city: string;
  collectionSlug: string;
};

type SaveResponse = {
  ok?: boolean;
  message?: string;
  commit?: {
    sha?: string;
    url?: string;
  };
};

const getEditorApiBase = () => {
  const configuredBase = import.meta.env.VITE_VIDEO_EDITOR_API_URL as string | undefined;

  if (configuredBase?.trim()) {
    return configuredBase.replace(/\/$/, "");
  }

  if (typeof window !== "undefined" && window.location.hostname.endsWith("drianzhu.com")) {
    return "https://api.drianzhu.com";
  }

  return "";
};

const editorApiUrl = (path: string) => `${getEditorApiBase()}${path}`;

const flattenVideos = (): EditableVideo[] =>
  videoCollections.flatMap((collection) =>
    collection.videos.map((video) => ({
      ...video,
      id: getVideoEditId(video),
      city: collection.category,
      collectionSlug: collection.slug,
    })),
  );

export default function VideoEditor() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_STORAGE_KEY) || "");
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [videos, setVideos] = useState<EditableVideo[]>(() => flattenVideos());
  const [originalVideos, setOriginalVideos] = useState<EditableVideo[]>(() => flattenVideos());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const cities = useMemo(() => ["All", ...Array.from(new Set(videos.map((video) => video.city)))], [videos]);
  const originalById = useMemo(() => new Map(originalVideos.map((video) => [video.id, video])), [originalVideos]);

  const changedVideos = useMemo(
    () =>
      videos.filter((video) => {
        const original = originalById.get(video.id);

        return original && (video.title !== original.title || video.description !== original.description);
      }),
    [originalById, videos],
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

  const authenticate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password.trim()) {
      toast.error("Please enter the editor password.");
      return;
    }

    setIsAuthenticating(true);

    try {
      const response = await fetch(editorApiUrl("/api/video-editor/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.token) {
        throw new Error(data.message || "The password was not accepted.");
      }

      sessionStorage.setItem(SESSION_STORAGE_KEY, data.token);
      setToken(data.token);
      setPassword("");
      toast.success("Editor unlocked.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to unlock the editor.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const updateVideo = (id: string, field: "title" | "description", value: string) => {
    setVideos((currentVideos) =>
      currentVideos.map((video) => (video.id === id ? { ...video, [field]: value } : video)),
    );
  };

  const resetChanges = () => {
    setVideos(originalVideos);
    toast.info("Unsaved edits have been reset.");
  };

  const saveChanges = async () => {
    if (changedVideos.length === 0) {
      toast.info("There are no edits to save.");
      return;
    }

    const invalidVideo = changedVideos.find((video) => !video.title.trim() || !video.description.trim());
    if (invalidVideo) {
      toast.error("Every edited video must keep both a title and a description.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(editorApiUrl("/api/video-editor/videos"), {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updates: changedVideos.map((video) => ({
            id: video.id,
            title: video.title.trim(),
            description: video.description.trim(),
          })),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as SaveResponse;

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "The edits could not be saved.");
      }

      setOriginalVideos(videos.map((video) => ({ ...video })));
      toast.success(data.commit?.sha ? `Saved. GitHub commit ${data.commit.sha.slice(0, 7)} created.` : "Saved. GitHub deployment should start shortly.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save the edits.");
    } finally {
      setIsSaving(false);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setToken("");
    toast.info("Editor locked.");
  };

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
                Private Editor
              </p>
            </div>
            <h1 className="font-cinzel mb-5 text-3xl font-bold tracking-[0.14em] md:text-5xl" style={{ color: BRAND_GOLD }}>
              Video Library Titles & Descriptions
            </h1>
            <p className="font-eb-garamond text-lg font-medium leading-relaxed md:text-xl" style={{ color: "rgba(245, 245, 245, 0.76)" }}>
              Edit the public video metadata, save it through the secure backend, and let the GitHub Pages deployment publish the update.
            </p>
          </div>

          {!token ? (
            <form
              onSubmit={authenticate}
              className="mx-auto max-w-xl rounded-sm p-6 md:p-8"
              style={{ border: "1px solid rgba(201, 162, 39, 0.22)", backgroundColor: "rgba(19, 34, 56, 0.72)" }}
            >
              <div className="mb-6 flex items-start gap-4">
                <span className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full" style={{ border: "1px solid rgba(201, 162, 39, 0.35)", color: BRAND_GOLD }}>
                  <Lock className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-cinzel mb-2 text-xl font-bold tracking-[0.12em]" style={{ color: "#F5F5F5" }}>
                    Unlock Editor
                  </h2>
                  <p className="font-eb-garamond text-base font-medium leading-relaxed" style={{ color: "rgba(245, 245, 245, 0.68)" }}>
                    This route is intentionally hidden, but saving is still protected by a server-side password check.
                  </p>
                </div>
              </div>
              <label className="mb-5 block">
                <span className="mb-2 block font-cormorant text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(201, 162, 39, 0.72)" }}>
                  Editor Password
                </span>
                <div className="flex items-center gap-3 rounded-sm px-4 py-3" style={{ border: "1px solid rgba(201, 162, 39, 0.24)", backgroundColor: "rgba(7, 20, 33, 0.7)" }}>
                  <KeyRound className="h-5 w-5 flex-shrink-0" style={{ color: BRAND_GOLD }} />
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    autoComplete="current-password"
                    className="w-full bg-transparent font-eb-garamond text-base outline-none placeholder:text-white/35"
                    style={{ color: "rgba(245, 245, 245, 0.88)" }}
                    placeholder="Enter editor password"
                  />
                </div>
              </label>
              <button
                type="submit"
                disabled={isAuthenticating}
                className="inline-flex w-full items-center justify-center gap-3 px-6 py-4 font-cinzel text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ border: "1px solid rgba(201, 162, 39, 0.52)", color: BRAND_GOLD, backgroundColor: "rgba(201, 162, 39, 0.08)" }}
              >
                {isAuthenticating ? "Checking..." : "Unlock Editor"}
              </button>
            </form>
          ) : (
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

                <div className="mt-6 flex flex-col gap-3 border-t pt-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: "rgba(201, 162, 39, 0.14)" }}>
                  <p className="font-eb-garamond text-base font-medium" style={{ color: "rgba(245, 245, 245, 0.72)" }}>
                    Showing {filteredVideos.length} videos. {changedVideos.length} unsaved {changedVideos.length === 1 ? "edit" : "edits"}.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={signOut} className="px-5 py-3 font-cormorant text-sm font-bold tracking-[0.12em]" style={{ border: "1px solid rgba(245, 245, 245, 0.2)", color: "rgba(245, 245, 245, 0.72)" }}>
                      Lock Editor
                    </button>
                    <button type="button" onClick={resetChanges} disabled={changedVideos.length === 0 || isSaving} className="px-5 py-3 font-cormorant text-sm font-bold tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-45" style={{ border: "1px solid rgba(245, 245, 245, 0.2)", color: "rgba(245, 245, 245, 0.72)" }}>
                      Reset
                    </button>
                    <button type="button" onClick={saveChanges} disabled={changedVideos.length === 0 || isSaving} className="inline-flex items-center gap-3 px-6 py-3 font-cinzel text-sm font-bold tracking-[0.16em] disabled:cursor-not-allowed disabled:opacity-45" style={{ border: "1px solid rgba(201, 162, 39, 0.52)", color: BRAND_GOLD, backgroundColor: "rgba(201, 162, 39, 0.08)" }}>
                      <Save className="h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
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
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
