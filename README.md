# Finnexus CMS Dashboard

[cloudflarebutton]

A modern, full-stack CMS dashboard built on Cloudflare Workers with Durable Objects for stateful entities, React frontend, and Shadcn UI. Features real-time chat boards, user management, and scalable API endpoints. Production-ready with TypeScript, Tailwind CSS, and TanStack Query.

## ✨ Features

- **Durable Objects for Entities**: Per-user and per-chat Durable Object instances with automatic indexing for listing/pagination.
- **Full API Coverage**: CRUD operations for users, chats, and messages with pagination, batch deletes, and optimistic updates.
- **Modern React Frontend**: Vite + React 18, Router, TanStack Query, Shadcn UI components, Tailwind CSS with custom themes/animations.
- **Serverless Backend**: Hono routing, CORS, error handling, health checks, client error reporting.
- **Type-Safe Shared Types**: Shared TypeScript types between frontend and worker for seamless development.
- **Seed Data & Indexes**: Automatic seeding of mock users/chats/messages on first run.
- **Responsive Design**: Dark/light themes, mobile-friendly sidebar layout, glassmorphism effects.
- **Development Workflow**: Hot reload, type generation, linting, preview, one-click deploy.

## 🛠️ Tech Stack

- **Backend**: Cloudflare Workers, Durable Objects, Hono, TypeScript
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons, TanStack Query, React Router
- **Utilities**: Immer, Zod (validation ready), Framer Motion (animations), Sonner (toasts)
- **Dev Tools**: Bun, Wrangler, ESLint, Tailwind, PostCSS

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-update/) (`npm i -g wrangler`)
- Cloudflare account and API token with Workers/DO permissions

### Installation

1. Clone the repo
2. Run `bun install` to install dependencies

### Local Development

```bash
# Start dev server (frontend + worker proxy)
bun run dev

# In another terminal, for type generation
bun run cf-typegen
```

Open [http://localhost:3000](http://localhost:3000) – frontend proxies API calls to local worker.

### Build & Preview

```bash
# Production build
bun run build

# Preview production build
bun run preview
```

### Deployment

1. Configure `wrangler.jsonc` with your Cloudflare account ID and secrets
2. Deploy with one command:

```bash
bun run deploy
```

Or use the button below for instant deployment:

[cloudflarebutton]

**Pro Tip**: `wrangler deploy --dry-run` to validate before deploying. Assets are automatically bundled as SPA.

## 📖 Usage Examples

### API Endpoints

All endpoints under `/api/*`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/users`?cursor=&limit= | Paginated user list |
| POST | `/api/users` | Create user `{name: string}` |
| DELETE | `/api/users/:id` | Delete user |
| POST | `/api/users/deleteMany` | Batch delete `{ids: string[]}` |
| GET | `/api/chats`?cursor=&limit= | Paginated chat list |
| POST | `/api/chats` | Create chat `{title: string}` |
| GET | `/api/chats/:chatId/messages` | List chat messages |
| POST | `/api/chats/:chatId/messages` | Send message `{userId: string, text: string}` |

Responses: `{success: boolean, data?: T, error?: string}`

### Frontend Customization

- Edit `src/pages/HomePage.tsx` for main UI
- Use `AppLayout` for sidebar layout
- API calls via `src/lib/api-client.ts`
- Extend entities in `worker/entities.ts`
- Add routes in `worker/user-routes.ts`

**Example API Call** (from frontend):

```ts
import { api } from '@/lib/api-client';

const users = await api<User[]>('/api/users?limit=10');
```

## 🏗️ Project Structure

```
├── src/                 # React frontend
│   ├── components/      # Shadcn UI + custom (sidebar, layout)
│   ├── hooks/           # Custom hooks (theme, mobile)
│   ├── lib/             # Utils, API client, error reporting
│   └── pages/           # Router pages
├── worker/              # Cloudflare Worker backend
│   ├── core-utils.ts    # DO entity base classes + indexes
│   ├── entities.ts      # User/Chat entities
│   ├── index.ts         # Hono app entry
│   └── user-routes.ts   # Custom API routes
├── shared/              # Shared TS types + mocks
└── package.json         # Bun + Wrangler scripts
```

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. `bun run dev`
4. Submit PRs to `main`

Lint: `bun run lint`

## 📄 License

MIT – see [LICENSE](LICENSE) (add your own).