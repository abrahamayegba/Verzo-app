import {
  ApolloClient,
  InMemoryCache,
  gql,
  useApolloClient,
} from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import storage from "local-storage-fallback";
import { useEffect, useState } from "react";

const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken {
    refreshToken {
      access_token
      refresh_token
    }
  }
`;

const GET_BUSINESSES_BY_USER_ID_QUERY = gql`
  query GetBusinessesByUserId {
    getBusinessesByUserId {
      businesses {
        id
      }
    }
  }
`;

const TOKEN = "verzo-token";
export const saveToken = (token: string) => storage.setItem(TOKEN, token);
export const getToken = (): string | null => storage.getItem(TOKEN);
export const clearToken = () => storage.removeItem(TOKEN);

export const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_URL;
export const GRAPHQL_URL = `${EXPRESS_URL}/graphql`;

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const REFRESH_TOKEN = "verzo-refresh";
export const saveRefreshToken = (token: string) =>
  storage.setItem(REFRESH_TOKEN, token);
export const getRefreshToken = (): string | null =>
  storage.getItem(REFRESH_TOKEN);
export const clearRefreshToken = () => storage.removeItem(REFRESH_TOKEN);

export const refreshToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }
  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      refetchQueries: [{ query: GET_BUSINESSES_BY_USER_ID_QUERY }],
    });
    if (data?.refreshToken?.access_token) {
      saveToken(data.refreshToken.access_token);
      saveRefreshToken(data.refreshToken.refresh_token);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) {
    return false;
  }
  try {
    const { exp }: { exp: number } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      const success = await refreshToken();
      if (success === true) {
        console.log("token has been refreshed");
        return true;
      } else {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return false;
  }
};

export const usePrepareApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { resetStore } = useApolloClient();

  useEffect(() => {
    fetch(`${EXPRESS_URL}/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.access_token) {
          saveToken(data?.access_token);
          setIsLoading(false);
        } else {
          clearToken();
          resetStore();
          setIsLoading(false);
        }
      });
  }, [resetStore]);

  return { isLoading };
};
