# zencodify

Monorepo scaffold for a SaaS project with:

- `frontend/`: Next.js (App Router + TypeScript + Tailwind CSS + ESLint)
- `backend/`: Fastify + TypeScript API
- `shared/`: shared Zod schemas/types (`@zencodify/shared`)

## Template Quick Start

```bash
npm install
npm run dev
```

Visit:

- `/templates/luxury-salon-centre`
- `/templates/modern-minimal-salon`
- `/templates/bold-trendy-salon`

## Recommended workspace flow

```bash
pnpm install
pnpm dev
```

## URLs

- Frontend: http://localhost:3000
- Backend health: http://localhost:4010/health

## Local Demo Mode

1. Copy env files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.local.example frontend/.env.local`
2. Add your OpenAI key in `backend/.env`:
   - `OPENAI_API_KEY=...`
   - Optional generation tuning:
     - `AI_MODEL=gpt-5`
     - `AI_TEMPERATURE=0.7`
     - `AI_MAX_OUTPUT_TOKENS=6000`
     - `AI_REASONING_EFFORT=minimal` (`minimal|low|medium|high`)
     - `AI_TEXT_VERBOSITY=medium` (`low|medium|high`)
   - Note: `temperature` is applied only for models that support it.
   - Optional PostgreSQL persistence:
     - `DATABASE_URL=postgres://admin:your_password@144.91.87.151:5432/whatsaweb`
   - Optional Redis cache:
     - `REDIS_URL=redis://:your_redis_password@144.91.87.151:6379/0`
     - `SPEC_CACHE_TTL_SECONDS=3600`
3. Install dependencies at workspace root:
   - `pnpm install`
4. Start both apps:
   - `pnpm dev`

Demo URLs:

- Frontend form: http://localhost:3000/demo
- Backend health: http://localhost:4010/health
- Backend `/health` response now includes `storage.postgres` and `storage.redis` status.

## Static Preview Build

Use this when you want pure static files from frontend (`frontend/out`):

1. Ensure frontend env points to backend for generation:
   - `frontend/.env.local` -> `NEXT_PUBLIC_API_URL=http://localhost:4010`
2. Build static export from workspace root:
   - `pnpm build:static`
3. Serve static output:
   - `pnpm serve:static`
4. Open:
   - `http://localhost:4173/demo/`
   - `http://localhost:4173/admin/`

Notes:
- Generated files are in `frontend/out`.
- `/demo/preview` and `/admin/preview` read from browser localStorage, so first generate a spec via `/demo` or `/admin`.
