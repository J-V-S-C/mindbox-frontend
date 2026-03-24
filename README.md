# MindBox Frontend

The frontend application for MindBox, providing a responsive interface for managing learning roadmaps, categories, and tasks.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Data Fetching | Apollo Client 4 (GraphQL) |
| Auth | JWT via `httpOnly` cookies + Server Actions |
| Styling | Tailwind CSS 4 |
| Code Generation | GraphQL Code Generator |
| Testing | Vitest + Testing Library |

## Authentication Flow

1. The login form calls the `authenticate` Server Action.
2. The action `POST /users/login` on the Go API and receives an `access_token` (HS256 JWT).
3. The token is stored in a secure `httpOnly` cookie (`auth_token`).
4. `app/layout.tsx` reads the cookie server-side and injects the token into the Apollo Client factory.
5. Every GraphQL request automatically carries the `Authorization: Bearer <token>` header.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3333/query
NEXT_PUBLIC_API_URL=http://localhost:3333
JWT_SECRET=your_jwt_secret_matching_the_api
```

> The `JWT_SECRET` must match the one configured in the Go API. It is used server-side only to validate and decode the token inside Next.js Route Handlers.

### Development

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.

## GraphQL Code Generation

Whenever you update queries in `app/lib/queries/` or the backend schema changes, regenerate the TypeScript types:

```bash
pnpm run codegen
```

This outputs updated types into `app/lib/gql/`.
