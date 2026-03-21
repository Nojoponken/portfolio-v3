import useAuth from "../hooks/useAuth";
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
    console.log(body);
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

export { useRegister, useLogin };
