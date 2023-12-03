import { EXPRESS_URL } from "@/src/apollo/ApolloClient";
import { useApolloClient } from "@apollo/client";
import { JwtPayload, jwtDecode } from "jwt-decode";
import storage from "local-storage-fallback";
import { useEffect, useState } from "react";

const TOKEN = "verzo-token"; //process.env.TOKEN!;
export const saveToken = (token: string) => storage.setItem(TOKEN, token);
export const getToken = (): string | null => storage.getItem(TOKEN);
export const clearToken = () => storage.removeItem(TOKEN);

const REFRESH_TOKEN = "verzo-refresh";
export const saveRefreshToken = (token: string) =>
  storage.setItem(REFRESH_TOKEN, token);
export const getRefreshToken = (): string | null =>
  storage.getItem(REFRESH_TOKEN);
export const clearRefreshToken = () => storage.removeItem(REFRESH_TOKEN);

export const isAuthenticated = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) {
    return false;
  }
  try {
    const { exp }: JwtPayload = jwtDecode(token);
    if (Date.now() >= exp! * 1000) {
      return false;
    }
    return true;
  } catch (error) {
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
