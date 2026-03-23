"use client";

import { ApolloProvider } from "@apollo/client/react";
import { createApolloClient } from "../lib/apollo-client";
import { useMemo } from "react";

export default function ApolloWrapper({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const client = useMemo(() => createApolloClient(token), [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
