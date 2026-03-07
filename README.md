# DevTrailer

AI-powered video production for software developers. Turn your project docs and live site into a cinematic promo video in about a minute.

## Getting started

This project uses **Bun** as the package manager.

```bash
# Install dependencies
bun install

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
bun run build    # Production build
bun run start    # Start production server
bun run lint     # Run ESLint
bun run format   # Format with Prettier
```

## Environment

Copy `env.example` to `.env.local` and fill in:

- **GEMINI_API_KEY** – required for AI script and scene generation
- **ELEVENLABS_API_KEY** – required for voiceover
- **NEXT_PUBLIC_SUPABASE_URL** and **NEXT_PUBLIC_SUPABASE_ANON_KEY** – optional; enables **auth** and **persistent projects** (saved trailer data so opening or reloading a project does not regenerate the video)

For Supabase setup (table schema, RLS, storage), see **[docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)**.

## Tech

- [Next.js](https://nextjs.org) (App Router)
- [Remotion](https://www.remotion.dev/) for video composition
- [Supabase](https://supabase.com) for optional auth and storage
- [Tailwind CSS](https://tailwindcss.com)

## Deploy

You can deploy on [Vercel](https://vercel.com/new). Set the same env vars in the project settings.
