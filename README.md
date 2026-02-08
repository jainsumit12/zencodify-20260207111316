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
3. Install dependencies at workspace root:
   - `pnpm install`
4. Start both apps:
   - `pnpm dev`

Demo URLs:

- Frontend form: http://localhost:3000/demo
- Backend health: http://localhost:4010/health
