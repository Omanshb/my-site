# my-site

Personal website scaffold — Next.js (App Router), TypeScript, and Tailwind CSS. Ready to deploy on [Vercel](https://vercel.com).

## Develop

Install dependencies (once):

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repo to GitHub (or GitLab / Bitbucket).
2. In the [Vercel dashboard](https://vercel.com/new), **Import** the repository.
3. Vercel detects **Next.js** — use the default build settings and deploy.

You can also use the CLI: `npx vercel` from the project root (install the [Vercel CLI](https://vercel.com/docs/cli) if needed).

## Project layout

- `src/app/` — routes (`/`, `/about`, `/projects`)
- `src/components/` — `SiteHeader`, `SiteFooter`

Replace placeholder copy (e.g. “Your Name”, links, tagline) with your own content.
