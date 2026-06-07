# Private Video Editor Deployment

This project now includes a hidden editor at `/insights/edit/007drianzhu` for changing public Video Library titles and descriptions. The public site can continue to run on GitHub Pages, but the editor save workflow requires a separate private Node backend because GitHub Pages cannot safely store GitHub tokens.

## Production URLs

| Component | URL | Purpose |
| --- | --- | --- |
| Public Video Library | `https://www.drianzhu.com/insights` | Public-facing video page. |
| Private Editor | `https://www.drianzhu.com/insights/edit/007drianzhu` | Hidden editor entry point. The password gate has been removed. |
| Private Backend | Recommended: `https://api.drianzhu.com` | Receives save requests and commits metadata edits to GitHub. |

## Required backend environment variables

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `GITHUB_PAT` | Yes | `github_pat_...` | Server-side GitHub token used to update `client/src/data/videoEdits.json`. Never expose this in browser code. |
| `GITHUB_REPOSITORY_NAME` | Optional | `touying-lab/drianzhu-web` | Defaults to `touying-lab/drianzhu-web`. |
| `GITHUB_BRANCH` | Optional | `main` | Defaults to `main`. |
| `EDITOR_ALLOWED_ORIGINS` | Optional | `https://www.drianzhu.com,https://drianzhu.com` | Additional allowed browser origins, comma-separated. |
| `PORT` | Platform-provided | `4173` | Port used by the Node backend. Most hosts set this automatically. |

## GitHub token requirements

Create a fine-grained GitHub personal access token for `touying-lab/drianzhu-web` with repository contents write access. The backend uses this token only on the server side to read and update `client/src/data/videoEdits.json` through GitHub’s Contents API. The token should be stored only as the private backend secret `GITHUB_PAT`.

## Backend deployment commands

Use a Node-capable host such as Render, Railway, Fly.io, or another private server. The deployment should point at this repository and use the following commands.

| Setting | Value |
| --- | --- |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Start command | `pnpm start` |
| Node version | Node 22 or newer recommended |

After deployment, map the service to `https://api.drianzhu.com`, or set `VITE_VIDEO_EDITOR_API_URL` and rebuild the static site if using a different backend URL.

## Editor operating workflow

1. Open `https://www.drianzhu.com/insights/edit/007drianzhu`.
2. Edit video titles or descriptions.
3. Press **Save Changes**.
4. The backend commits the edits to `client/src/data/videoEdits.json` in GitHub.
5. GitHub Pages rebuilds automatically.
6. The public page at `https://www.drianzhu.com/insights` reflects the changes after the deployment finishes.

## Security notes

The hidden URL is now the access gate for the editor page, so keep the URL private and do not link to it from public navigation. The GitHub token remains protected because `GITHUB_PAT` is held only by the private backend. Do not place `GITHUB_PAT` in frontend environment variables, static files, or GitHub Pages settings.

## Troubleshooting: Save Changes cannot publish edits

If the editor page shows an error such as `Failed to fetch`, it means the browser cannot reach the private backend API. The current frontend defaults to `https://api.drianzhu.com` on production, so that hostname must resolve to the deployed backend service.

Configure the private backend with a valid private GitHub token:

```bash
GITHUB_PAT=your_private_github_token
```

A quick verification after deployment is:

```bash
curl https://api.drianzhu.com/api/video-editor/health
```

The health request should return `{"ok":true,"service":"drianzhu-video-editor"}`. If `api.drianzhu.com` cannot be resolved, the DNS record or backend custom-domain mapping is not complete yet.
