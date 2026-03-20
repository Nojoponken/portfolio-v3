import axios from "axios";

const BASE_URL = "http://localhost:3500";

const backendPublic = axios.create({
  baseURL: BASE_URL,
});

const backendPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { backendPublic, backendPrivate };
