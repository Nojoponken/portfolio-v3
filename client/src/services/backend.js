import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND;

const backendPublic = axios.create({
  baseURL: BASE_URL,
});

const backendPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { backendPublic, backendPrivate };
