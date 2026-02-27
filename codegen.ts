import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3333/query",
  documents: ["app/**/*.tsx", "app/**/*.ts"],
  generates: {
    "./app/lib/gql/": {
      preset: "client",
    },
  },
};

export default config;
