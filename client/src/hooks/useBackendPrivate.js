import { backendPrivate } from "../services/backend";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

function useBackendPrivate() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = backendPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = backendPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return backendPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      backendPrivate.interceptors.request.eject(requestInterceptor);
      backendPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return backendPrivate;
}

export default useBackendPrivate;
