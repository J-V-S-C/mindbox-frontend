# MindBox Frontend

The frontend application for MindBox, providing a responsive interface for managing learning roadmaps, categories, and tasks. Built with Next.js, Apollo Client, and Tailwind CSS.

## Tech Stack

- Framework: Next.js (App Router)
- UI Library: React
- Language: TypeScript
- Data Fetching: Apollo Client
- API Protocol: GraphQL
- Code Generation: GraphQL Code Generator
- Styling: Tailwind CSS

## Project Structure

````text
app/
├── components/
│   ├── ApolloProvider.tsx
│   ├── categories/
│   │   ├── CategoryCard.tsx
│   │   ├── CategoryHeader.tsx
│   │   └── CategoryModal.tsx
│   ├── roadmaps/
│   │   ├── CreateRoadmalModal.tsx
│   │   ├── EditRoadmapModal.tsx
│   │   ├── RoadmapCard.tsx
│   │   └── ShowRoadmaps.tsx
│   ├── tasks/
│   │   ├── TaskEmptyState.tsx
│   │   ├── TaskFilterTabs.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskModal.tsx
│   └── ui/
│       ├── ConfirmDialog.tsx
│       ├── EmptyState.tsx
│       ├── search.tsx
│       └── skeletons/
│           ├── category-page-skeleton.tsx
│           ├── category-skeleton.tsx
│           └── roadmap-skeleton.tsx
├── globals.css
├── layout.tsx
├── lib/
│   ├── apollo-client.ts
│   ├── gql/
│   ├── queries/
│   │   ├── category-queries.ts
│   │   ├── roadmap-queries.ts
│   │   └── task-queries.ts
│   └── utils/
│       ├── category-utils.ts
│       └── task-utils.ts
├── mindbox/
│   ├── roadmaps/
│   │   ├── [id]/
│   │   │   ├── [categoryId]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   └── tasks/
│       └── page.tsx
└── page.tsx
````


## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (used as the package manager)

### Installation

1. Install the dependencies:

```bash
pnpm install
````


2. Configure environment variables. Create a `.env.local` file in the root directory and set the GraphQL API endpoint:

```env
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:8080/query
```

3. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## GraphQL Code Generation

This project uses `@graphql-codegen` to automatically generate TypeScript types from your GraphQL queries and schema.

Whenever you update the queries in `app/lib/queries/` or the backend schema changes, run the code generator to update the types in `app/lib/gql/`:

```bash
pnpm run codegen
```
