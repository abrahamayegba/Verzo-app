// /apollo/ApolloProvider.js
"use client";

import { ApolloProvider as Provider } from "@apollo/client";
import { client } from "./ApolloClient";

interface ApolloProviderProps {
  children: React.ReactNode;
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => (
  <Provider client={client}>{children}</Provider>
);
