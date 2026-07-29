# Daniel Mwihoti — Portfolio

Personal portfolio at [danieled-portfolio.vercel.app](https://danieled-portfolio.vercel.app).

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**. Includes an AI chatbot (Groq / LLaMA 3.3 via a server route), a Cal.com booking embed, an EmailJS contact form, and a `/writing` page.

## Getting started

```bash
npm install
cp .env.example .env   # then add your Groq API key
npm run dev            # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `GROQ_API_KEY` | Server-only key for the chatbot route (`app/api/chat/route.js`). Get one at [console.groq.com](https://console.groq.com). Never use a `NEXT_PUBLIC_` prefix — that would expose it to browsers. |

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next/core-web-vitals`)

## Structure

- `app/` — routes (`/`, `/writing`), API route (`/api/chat`), metadata, sitemap/robots
- `src/components/` — page sections (hero, about, experience, skills, projects, bots, contact…)
- `src/data/site.js` — single source of truth for site URL, contact details, and stats
- `public/` — static assets (resume, video, images)

Deployed on Vercel (zero-config). Set `GROQ_API_KEY` in the Vercel project environment variables.
