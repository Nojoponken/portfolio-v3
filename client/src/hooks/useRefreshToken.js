import { backendPublic } from "../services/backend";
import useAuth from "../hooks/useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const { data } = await backendPublic.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(prev);
      console.log(data.accessToken);
      return { ...prev, accessToken: data.accessToken };
    });
    return data.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
