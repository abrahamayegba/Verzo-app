"use client";

import { getToken, refreshToken } from "@/lib/auth";
import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { WebSocket } from "ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_URL;
export const GRAPHQL_URL = `${EXPRESS_URL}/graphql`;

const uploadLink = createUploadLink({
  uri: GRAPHQL_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(
    process.env.NEXT_PUBLIC_WEBSOCKET_URL!,
    {
      reconnect: true,
    },
    WebSocket
  )
);

const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        wsLink,
        uploadLink
      )
    : uploadLink;

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, splitLink]),
  cache: new InMemoryCache(),
});
