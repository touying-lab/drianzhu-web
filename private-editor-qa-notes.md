# Private Video Editor QA Notes

Date: 2026-06-07

## Local production build validation

The production build completed successfully with `pnpm build` after TypeScript validation passed with `pnpm check`. The built app was served locally with `EDITOR_PASSWORD=test-local-password NODE_ENV=production PORT=4173 pnpm start`.

## Route and login validation

The private editor route loaded successfully at `http://localhost:4173/insights/edit/007drianzhu`. Before authentication, the page showed the branded private editor header and a password-only unlock form. Submitting the local test password unlocked the editor and displayed the full editable video list.

## Editor behavior validation

After login, the editor displayed 41 videos with city filters for All, Peking, Hong Kong, Shangai, Nanjing, and Shenzen. A local test title edit was made to the first Peking video. The UI correctly changed from `0 unsaved edits` to `1 unsaved edit`, displayed an Edited badge on the modified video card, and enabled the Save Changes action. The Reset action restored the original title and returned the page to `0 unsaved edits`. No GitHub save was triggered during local QA.

## Production static route validation

After commit `0cd9af7158916ced1bd94e41b9357dcc8818d7cb` deployed successfully through GitHub Pages run `27098031114`, the production private editor URL loaded at `https://www.drianzhu.com/insights/edit/007drianzhu?editorCheck=1`. The deployed static page displayed the hidden editor login gate rather than a 404 page.

A fake password was submitted on production. The editor did not unlock. The page reported `Failed to fetch`, which is expected until the separate private backend is deployed and connected through the configured API base URL. This confirms the public static route is present, but saving/unlocking in production still requires backend deployment with private environment variables.

## Final production deployment validation

The follow-up documentation commit `30a85610fd839c533a474e11458c317fb54c1b6d` deployed successfully through GitHub Pages run `27098093164`. After that deployment, `https://www.drianzhu.com/insights/edit/007drianzhu?editorCheck=2` continued to load the hidden private editor login page on the production custom domain.

The public page `https://www.drianzhu.com/insights?editorDeployCheck=1` was also checked after the deployment. The Video Library still loaded normally, displayed the city and platform filters, rendered the first four video cards, and preserved the existing public user experience.

## Login issue follow-up: `007drianzhu`

The requested production editor password is `007drianzhu`, but the production editor cannot unlock yet because the private backend hostname `api.drianzhu.com` is not currently resolvable. Direct checks against `https://api.drianzhu.com/api/video-editor/health` and `https://api.drianzhu.com/api/video-editor/login` both failed with `Could not resolve host: api.drianzhu.com`. This means the login request never reaches a backend service where `EDITOR_PASSWORD=007drianzhu` could be checked.

The code is ready, but the private backend still needs to be deployed and connected to DNS before the editor password can work in production.

## Troubleshooting update deployment

Commit `0b32dd6` was pushed to `main` to improve the private editor's error message when the backend is unavailable and to add a non-secret troubleshooting section to `PRIVATE_EDITOR_DEPLOYMENT.md`. GitHub Pages deployment run `27098539886` completed successfully.

This update does not make `007drianzhu` work by itself, because the root cause is still the missing private backend/DNS at `api.drianzhu.com`. It makes the production page explain that the backend is unavailable instead of implying that the password itself is wrong.

## Hidden-link editor simplification verification

Local production-build verification on `http://localhost:4174/insights/edit/007drianzhu` confirmed that the password gate has been removed. The hidden editor route opens directly, shows the video title and description editing fields, reports 41 videos, and displays the explanatory note that anyone with the hidden URL can view the editor page. The save workflow still requires the private backend and server-side `GITHUB_PAT` to publish edits to GitHub.

## Production hidden-link editor deployment verification

Commit `bcc0911` deployed successfully through GitHub Pages run `27098725770`. Production verification at `https://www.drianzhu.com/insights/edit/007drianzhu?noPasswordCheck=1` confirmed that the route now opens the editor directly without a password prompt. The page displays the hidden-editor header, the note that the password screen has been removed, search and city filters, 41 editable videos, and editable title/description fields. Publishing through **Save Changes** still requires the separate backend at `https://api.drianzhu.com` with server-side `GITHUB_PAT`; the password variable is no longer required by the deployed code.

## Live editor cache diagnosis — 2026-06-07

Rechecked `https://www.drianzhu.com/insights/edit/007drianzhu` directly in the browser after the password-removal deployment. The production page renders the hidden editor immediately and does not show the old password gate. The page displays search, city filters, editable title/description fields, and the notice that the password screen has been removed.

A direct shell request to the deep route returns the expected GitHub Pages SPA fallback `404.html`, which redirects the browser to the root app with the encoded route. The root app currently serves the latest asset bundle `assets/index-CUriOkib.js`, matching the local production build. The root HTML is served by GitHub Pages with `cache-control: max-age=600`, so a device that loaded the editor shortly before deployment may continue to see the old password bundle briefly or until a hard refresh/clear cache is performed.

Recommended user-side fix: hard refresh the editor page or open `https://www.drianzhu.com/insights/edit/007drianzhu?v=bcc0911` once to force a fresh app load.

## GitHub-token save deployment verification — 2026-06-07

Commit `bc88b53` replaced the blocked Vercel/backend save path with a browser-based GitHub token save workflow. GitHub Pages deployment run `27099690337` completed successfully.

Production verification at `https://www.drianzhu.com/insights/edit/007drianzhu?githubTokenSave=bc88b53` confirmed that the hidden editor now loads with the GitHub token save instructions. The page states that a fine-grained GitHub token with `Contents: Read and write` access to `touying-lab/drianzhu-web` is needed only when clicking **Save Changes**, and it no longer points users to the unavailable Vercel/API backend.

Public library verification at `https://www.drianzhu.com/insights?githubTokenSave=bc88b53` confirmed that the public Insights page still loads normally. The Video Library displays 41 videos, the category filters remain visible, and the first four Peking videos render with Bilibili watch links.

## Chinese Website Text Editor Deployment Verification — 2026-06-09

Commit `778806f` (`Add Chinese website copy editor`) was pushed to `main`, and GitHub Pages workflow run `27226847753` completed successfully. Production verification at `https://www.drianzhu.com/insights/edit/007drianzhu?githubTokenSave=778806f` confirmed that the hidden editor now displays `Website Copy & Video Library Editor` with two editing modes: `Chinese Website Text` and `Video Titles & Descriptions`.

The Chinese text editor reports 144 editable Chinese text fields. The editable fields cover navigation, hero text, homepage sections, page headings, forms, footer, privacy, terms, and cookie text keys. The editor keeps English text as a reference and allows the Chinese text to be edited and saved through the same GitHub-token workflow.

The public homepage was verified in English and then switched to Chinese using the language toggle. Chinese navigation labels, homepage hero text, section headings, CTA labels, and footer legal links rendered correctly from the shared editable text data.

The save workflow remains GitHub-token based. A final save from the hidden editor commits `client/src/data/siteText.json` and/or `client/src/data/videoEdits.json` directly to the repository, after which GitHub Pages redeploys the website.

Note: video collection titles in `client/src/data/videoCollections.ts` remain part of the separate video metadata dataset and continue to be handled by the existing video editor mode.

## 2026-06-15 — Hidden editor conflict-handling verification

Commit `2c67cc4` (`Improve hidden editor GitHub save conflict handling`) was pushed to `main`, and GitHub Pages workflow run `27572529878` completed successfully. Production verification at `https://www.drianzhu.com/insights/edit/007drianzhu?githubTokenSave=2c67cc4` confirmed that the hidden editor loads correctly as the Website Copy & Video Library Editor.

The deployed page displays the GitHub token field, the Chinese Website Text tab, the Video Titles & Descriptions tab, and 144 editable Chinese text fields. The deployed save workflow now re-reads the latest GitHub file before saving, skips no-op saves, and retries once when GitHub reports a file SHA conflict.

## 2026-06-15 — Runtime GitHub data-load verification

Commit `99d1552` (`Load editor data from GitHub at runtime`) was pushed to `main`, and GitHub Pages workflow run `27573610091` completed successfully.

Production verification at `https://www.drianzhu.com/insights/edit/007drianzhu?githubTokenSave=99d1552` confirmed that the hidden editor now displays the runtime source message `Latest GitHub data loaded at 8:17:10 PM.` after page load. The `nav.home` Chinese textarea shows `首页`, and the stale value `首页AA` is no longer present in the visible editor content.

The save controls returned to the normal `Save Changes` state after the runtime fetch completed, confirming that the editor is no longer relying only on the bundled JSON copy when loading editable content.
