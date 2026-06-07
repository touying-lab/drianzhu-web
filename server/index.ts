import crypto from "crypto";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEO_EDITS_PATH = "client/src/data/videoEdits.json";
const DEFAULT_REPOSITORY = "touying-lab/drianzhu-web";
const DEFAULT_BRANCH = "main";
const TOKEN_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  scope: "video-editor";
  exp: number;
};

type VideoEdit = {
  title: string;
  description: string;
};

type IncomingVideoUpdate = {
  id?: unknown;
  title?: unknown;
  description?: unknown;
};

type VideoEditFile = {
  version: number;
  updatedAt: string | null;
  updatedBy: string | null;
  edits: Record<string, VideoEdit>;
};

type GitHubContentResponse = {
  sha: string;
  content: string;
  encoding: string;
};

type GitHubUpdateResponse = {
  commit?: {
    sha?: string;
    html_url?: string;
  };
  content?: {
    html_url?: string;
  };
};

const base64UrlEncode = (value: string | Buffer) => Buffer.from(value).toString("base64url");

const base64UrlDecode = (value: string) => Buffer.from(value, "base64url").toString("utf8");

const getSessionSecret = () => {
  const secret = process.env.EDITOR_SESSION_SECRET || process.env.EDITOR_PASSWORD;

  if (!secret) {
    throw new Error("EDITOR_PASSWORD must be configured before using the private video editor API.");
  }

  return secret;
};

const signValue = (value: string) =>
  crypto.createHmac("sha256", getSessionSecret()).update(value).digest("base64url");

const createSessionToken = () => {
  const payload: SessionPayload = {
    scope: "video-editor",
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

const verifySessionToken = (token: string | undefined) => {
  if (!token || !token.includes(".")) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");
  const expectedSignature = signValue(encodedPayload);

  if (signature.length !== expectedSignature.length) {
    return false;
  }

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;

    return payload.scope === "video-editor" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

const isPasswordValid = (candidate: string) => {
  const configuredPassword = process.env.EDITOR_PASSWORD;

  if (!configuredPassword) {
    throw new Error("EDITOR_PASSWORD must be configured before using the private video editor API.");
  }

  const candidateBuffer = Buffer.from(candidate);
  const passwordBuffer = Buffer.from(configuredPassword);

  return candidateBuffer.length === passwordBuffer.length && crypto.timingSafeEqual(candidateBuffer, passwordBuffer);
};

const getAllowedOrigins = () => {
  const configuredOrigins = process.env.EDITOR_ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [];

  return new Set([
    "https://www.drianzhu.com",
    "https://drianzhu.com",
    "http://localhost:3000",
    "http://localhost:5173",
    ...configuredOrigins,
  ]);
};

const normalizeGitHubToken = () => {
  const token = process.env.GITHUB_PAT;

  if (!token) {
    throw new Error("GITHUB_PAT must be configured on the private backend before saving video edits.");
  }

  return token;
};

const githubRequest = async <T>(url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${normalizeGitHubToken()}`,
      "Content-Type": "application/json",
      "User-Agent": "drianzhu-video-editor",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers ?? {}),
    },
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof payload?.message === "string" ? payload.message : "GitHub API request failed.";
    throw new Error(message);
  }

  return payload as T;
};

const readVideoEditFile = async () => {
  const repository = process.env.GITHUB_REPOSITORY_NAME || DEFAULT_REPOSITORY;
  const branch = process.env.GITHUB_BRANCH || DEFAULT_BRANCH;
  const contentUrl = `https://api.github.com/repos/${repository}/contents/${VIDEO_EDITS_PATH}?ref=${encodeURIComponent(branch)}`;
  const content = await githubRequest<GitHubContentResponse>(contentUrl);

  if (content.encoding !== "base64") {
    throw new Error("Unexpected encoding for videoEdits.json from GitHub.");
  }

  const decoded = Buffer.from(content.content, "base64").toString("utf8");
  const parsed = JSON.parse(decoded) as VideoEditFile;

  return { repository, branch, sha: content.sha, parsed };
};

const saveVideoEditFile = async (params: {
  repository: string;
  branch: string;
  sha: string;
  nextFile: VideoEditFile;
  updateCount: number;
}) => {
  const contentUrl = `https://api.github.com/repos/${params.repository}/contents/${VIDEO_EDITS_PATH}`;
  const formattedContent = `${JSON.stringify(params.nextFile, null, 2)}\n`;

  return githubRequest<GitHubUpdateResponse>(contentUrl, {
    method: "PUT",
    body: JSON.stringify({
      message: `Update video library metadata (${params.updateCount} ${params.updateCount === 1 ? "edit" : "edits"})`,
      content: Buffer.from(formattedContent, "utf8").toString("base64"),
      sha: params.sha,
      branch: params.branch,
    }),
  });
};

const requireEditorToken: express.RequestHandler = (req, res, next) => {
  const header = req.header("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!verifySessionToken(token)) {
    res.status(401).json({ ok: false, message: "The editor session has expired. Please unlock the editor again." });
    return;
  }

  next();
};

async function startServer() {
  const app = express();
  const server = createServer(app);
  const allowedOrigins = getAllowedOrigins();

  app.use((req, res, next) => {
    const origin = req.header("Origin");

    if (origin && allowedOrigins.has(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Vary", "Origin");
    }

    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  });

  app.use("/api", express.json({ limit: "256kb" }));

  app.get("/api/video-editor/health", (_req, res) => {
    res.json({ ok: true, service: "drianzhu-video-editor" });
  });

  app.post("/api/video-editor/login", (req, res) => {
    try {
      const password = typeof req.body?.password === "string" ? req.body.password : "";

      if (!isPasswordValid(password)) {
        res.status(401).json({ ok: false, message: "Invalid editor password." });
        return;
      }

      res.json({ ok: true, token: createSessionToken(), expiresIn: TOKEN_TTL_SECONDS });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Editor login failed.";
      res.status(500).json({ ok: false, message });
    }
  });

  app.get("/api/video-editor/videos", requireEditorToken, async (_req, res) => {
    try {
      const { parsed } = await readVideoEditFile();
      res.json({ ok: true, edits: parsed.edits ?? {}, updatedAt: parsed.updatedAt ?? null });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to read video edit data.";
      res.status(500).json({ ok: false, message });
    }
  });

  app.put("/api/video-editor/videos", requireEditorToken, async (req, res) => {
    try {
      const updates: IncomingVideoUpdate[] = Array.isArray(req.body?.updates) ? req.body.updates : [];

      if (updates.length === 0) {
        res.status(400).json({ ok: false, message: "No video edits were submitted." });
        return;
      }

      if (updates.length > 100) {
        res.status(400).json({ ok: false, message: "Too many edits were submitted in one request." });
        return;
      }

      const sanitizedUpdates = updates.map((update) => ({
        id: typeof update?.id === "string" ? update.id.trim() : "",
        title: typeof update?.title === "string" ? update.title.trim() : "",
        description: typeof update?.description === "string" ? update.description.trim() : "",
      }));

      const invalidUpdate = sanitizedUpdates.find(
        (update) =>
          !/^[a-z0-9\u4e00-\u9fa5-]{6,120}$/i.test(update.id) ||
          update.title.length < 1 ||
          update.title.length > 240 ||
          update.description.length < 1 ||
          update.description.length > 1200,
      );

      if (invalidUpdate) {
        res.status(400).json({ ok: false, message: "Each edit must include a valid ID, title, and description." });
        return;
      }

      const { repository, branch, sha, parsed } = await readVideoEditFile();
      const nextFile: VideoEditFile = {
        version: parsed.version || 1,
        updatedAt: new Date().toISOString(),
        updatedBy: "private-video-editor",
        edits: { ...(parsed.edits ?? {}) },
      };

      for (const update of sanitizedUpdates) {
        nextFile.edits[update.id] = {
          title: update.title,
          description: update.description,
        };
      }

      const githubResult = await saveVideoEditFile({ repository, branch, sha, nextFile, updateCount: sanitizedUpdates.length });

      res.json({
        ok: true,
        message: "Video edits were committed to GitHub. GitHub Pages should redeploy shortly.",
        commit: {
          sha: githubResult.commit?.sha,
          url: githubResult.commit?.html_url || githubResult.content?.html_url,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save video edits.";
      res.status(500).json({ ok: false, message });
    }
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
