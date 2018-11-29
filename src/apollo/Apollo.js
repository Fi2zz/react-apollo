import React from "react";
import { ApolloClient, InMemoryCache } from "apollo-boost";

import { withClientState } from "apollo-link-state";
import { ApolloProvider } from "react-apollo";

import { resolvers, defaults } from "./resolvers";
import typeDefs from "./type";

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: withClientState({
    resolvers,
    defaults,
    cache,
    typeDefs
  }),
  cache
});
export { client, ApolloProvider };

export const Apollo = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
