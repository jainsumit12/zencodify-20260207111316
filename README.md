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
- Backend health: http://localhost:4000/health

## Local Demo Mode

1. Copy env files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.local.example frontend/.env.local`
2. Add your OpenAI key in `backend/.env`:
   - `OPENAI_API_KEY=...`
3. Install dependencies at workspace root:
   - `pnpm install`
4. Start both apps:
   - `pnpm dev`

Demo URLs:

- Frontend form: http://localhost:3000/demo
- Backend health: http://localhost:4000/health
