import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import apiService from "../services/apiService";

function useRegister() {
  return useMutation({
    mutationFn: apiService.registerUser,
  });
}

function useLogin() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: apiService.signInUser,
    onSuccess: (data) => {
      setAuth(data);
    },
  });
}

export { useRegister, useLogin };
