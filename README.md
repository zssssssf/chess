# Chess

A multiplayer chess app built as a monorepo.

## Structure

```
.
├── backend   # Node WebSocket server (game logic) + tRPC HTTP API
└── frontend  # React + Vite + Tailwind client
```

npm workspaces are used to manage both packages from the repository root.

## Getting started

```bash
npm install          # installs deps for all workspaces
npm run dev          # runs backend and frontend together
```

- Frontend: http://localhost:5173
- Backend (HTTP + tRPC + WebSocket): http://localhost:8080
- tRPC endpoint: http://localhost:8080/trpc

## Scripts (root)

| Script                | Description                            |
| --------------------- | -------------------------------------- |
| `npm run dev`         | Run backend and frontend concurrently  |
| `npm run dev:backend` | Run only the backend (tsx watch)       |
| `npm run dev:frontend`| Run only the frontend (vite)           |
| `npm run build`       | Build both packages                    |
| `npm run typecheck`   | Type-check both packages               |
