# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single Next.js 15 (App Router) portfolio site (`my-site`). No database, Docker, or separate backend services.

### Running the app

```bash
npm run dev    # http://localhost:3000
```

Optional: copy `.env.example` to `.env` for live Spotify/GitHub widget data. The site runs without these; Spotify returns empty track data and GitHub falls back to public profile scraping.

### Verification commands

| Command | Purpose |
|---------|---------|
| `npm run lint` | ESLint (matches CI) |
| `npm run build` | Production build + typecheck |
| `npm run dev` | Development server with HMR |

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint`, and `npm run build` on Node 20. Local Node 22 works; use Node 20 if you need exact CI parity.

### Routes to smoke-test

- `/` — home with animated hero and status widget
- `/about` — about page
- `/media` — 3D photo gallery (heavier; loads Three.js)
- `/notes/writings` and `/notes/writings/[slug]` — blog posts
- `/notes/readings` — reading list

### API routes (optional)

- `GET /api/github/contributions` — works without `GITHUB_TOKEN` (scrapes public profile)
- `GET /api/spotify/last-track` — returns empty track without Spotify env vars

### Gotchas

- No unit or e2e test suite is configured.
- Start long-running dev server in a tmux session (e.g. `next-dev-server`) so it persists across shell commands.
