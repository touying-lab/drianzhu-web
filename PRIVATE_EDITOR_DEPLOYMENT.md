# Private Video Editor Deployment

This project now includes a hidden editor at `/insights/edit/007drianzhu` for changing public Video Library titles and descriptions. The public site can continue to run on GitHub Pages, but the editor save workflow requires a separate private Node backend because GitHub Pages cannot safely store passwords or GitHub tokens.

## Production URLs

| Component | URL | Purpose |
| --- | --- | --- |
| Public Video Library | `https://www.drianzhu.com/insights` | Public-facing video page. |
| Private Editor | `https://www.drianzhu.com/insights/edit/007drianzhu` | Hidden editor entry point with password gate. |
| Private Backend | Recommended: `https://api.drianzhu.com` | Receives login/save requests and commits metadata edits to GitHub. |

## Required backend environment variables

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `EDITOR_PASSWORD` | Yes | `use-a-long-private-password` | Password required to unlock the editor. |
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
2. Enter the editor password configured as `EDITOR_PASSWORD` on the backend.
3. Edit video titles or descriptions.
4. Press **Save Changes**.
5. The backend commits the edits to `client/src/data/videoEdits.json` in GitHub.
6. GitHub Pages rebuilds automatically.
7. The public page at `https://www.drianzhu.com/insights` reflects the changes after the deployment finishes.

## Security notes

The hidden URL is only an entry point; it is not the main security mechanism. The actual protection is the server-side password check and the fact that `GITHUB_PAT` is held only by the private backend. Do not place `GITHUB_PAT` in frontend environment variables, static files, or GitHub Pages settings.
