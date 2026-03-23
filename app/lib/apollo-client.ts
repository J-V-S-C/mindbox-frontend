import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

export function createApolloClient(token?: string) {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3333/query",
  });

  // Usando a API moderna do ApolloLink no lugar do obsoleto 'setContext'
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }));
    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
