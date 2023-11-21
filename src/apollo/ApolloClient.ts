"use client";

import { getToken, isAuthenticated, saveToken } from "@/lib/auth";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

export const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_URL;
export const GRAPHQL_URL = `${EXPRESS_URL}/graphql`;

const refreshLink = new TokenRefreshLink({
  accessTokenField: "access_token",
  isTokenValidOrUndefined: () => isAuthenticated(),
  fetchAccessToken: () => {
    return fetch(`${EXPRESS_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => saveToken(accessToken),
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

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

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});
