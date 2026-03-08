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

The project follows a modular, feature-based architecture within the Next.js `app` directory:

```text
app/
├── components/          # Reusable UI components grouped by domain
│   ├── categories/      # Category cards, headers, and modals
│   ├── roadmaps/        # Roadmap lists and forms
│   ├── tasks/           # Task items, lists, and filters
│   └── ui/              # Generic components (dialogs, skeletons, empty states)
├── lib/                 # Core logic, clients, and utilities
│   ├── apollo-client.ts # Apollo Client configuration
│   ├── gql/             # Auto-generated GraphQL types and hooks
│   ├── queries/         # GraphQL query and mutation definitions
│   └── utils/           # Helper functions for categories and tasks
├── mindbox/             # Main application routes
│   └── roadmaps/        # Routing hierarchy for roadmaps, categories, and tasks
└── globals.css          # Global styles and CSS variables
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (used as the package manager)

### Installation

1. Install the dependencies:

```bash
pnpm install
```

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
