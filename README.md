<<<<<<< HEAD
# RepRush — Your AI Training Partner

RepRush is a free, no-login AI gym trainer: it builds your workout split,
coaches your form in plain language, tracks your progress, and gives you a
searchable exercise library — all in the browser.

## What's inside

- **Plan Generator** — a 5-question quiz builds a full training split (goal,
  experience, equipment, days/week, session length) using a rule-based
  workout engine (`lib/trainerEngine.ts`).
- **AI Coach** — a chat interface for form cues, nutrition, and recovery
  questions. Works instantly with **zero setup** using a built-in local
  coaching engine. If you add an `ANTHROPIC_API_KEY`, it automatically
  upgrades to real Claude-powered responses (see `app/api/chat/route.ts`).
- **Exercise Library** — 35+ movements with cues, searchable and filterable.
- **Progress Tracker** — logs sets to `localStorage` (private, per-device)
  and graphs volume over time.

Nothing requires a backend, database, or paid API key. It runs entirely for
free on Vercel's free tier.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel (free)

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables
   are required to deploy — the AI Coach works out of the box using its
   local engine.
4. Click **Deploy**. You'll have a live URL in about a minute.

### Optional: upgrade the AI Coach to real Claude responses

1. Get an API key at https://console.anthropic.com
2. In your Vercel project → **Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key
3. Redeploy. The `/api/chat` route will automatically start using Claude
   instead of the local engine — no code changes needed.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom design tokens — see `tailwind.config.ts`)
- lucide-react icons
- No database — progress is stored client-side in `localStorage`

## Project structure

```
app/
  page.tsx           – tab-based single page app
  api/chat/route.ts  – Coach endpoint (local engine + optional Claude)
components/          – Navbar, Hero, PlanGenerator, TrainerChat,
                        ExerciseLibrary, ProgressTracker, Footer
lib/
  exercises.ts        – exercise database
  trainerEngine.ts     – plan-generation + local coaching logic
  types.ts
```

## Customize

- **Colors/fonts**: `tailwind.config.ts` and `app/layout.tsx`.
- **Add exercises**: append to `lib/exercises.ts`.
- **Coach knowledge**: add rules to the `RULES` array in
  `lib/trainerEngine.ts`.
=======
# reprush
>>>>>>> 366dfaa3fd09c88b58cd46dd6ab2c13e73c6b3df
