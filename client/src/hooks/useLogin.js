import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { backendPublic } from "../services/backend";

function useRegister() {
  const mutationFn = async ({ username, password }) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      username,
      password,
    };

    const { data } = await backendPublic.post("/users", body, { headers });
    return data;
  };

  return useMutation({
    mutationFn,
  });
}

function useLogin() {
  const { setAuth } = useAuth();

  const mutationFn = async ({ username, password }) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = {
      username,
      password,
    };

    const { data } = await backendPublic.post("/auth", body, {
      headers,
      withCredentials: true,
    });

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      setAuth(data);
    },
  });
}

function useLogout() {
  const { setAuth } = useAuth();

  const mutationFn = async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const { data } = await backendPublic.post(
      "/auth/logout",
      {},
      {
        headers,
        withCredentials: true,
      },
    );

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      console.log(JSON.stringify(data));
      setAuth({});
    },
  });
}

export { useRegister, useLogin, useLogout };
