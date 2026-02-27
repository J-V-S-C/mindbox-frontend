import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { ApolloClient } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3333/query",
  }),
  cache: new InMemoryCache(),
});
