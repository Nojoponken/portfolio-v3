import { backendPublic } from "./backend";

async function getAllProjects() {
  const { data } = await backendPublic.get("/projects");
  return data;
}

async function getSingleProject(projectId) {
  const { data } = await backendPublic.get(`/projects/${projectId}`);
  return data;
}

async function registerUser({ username, password }) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    username,
    password,
  };

  const { data } = await backendPublic.post("/users", body, { headers });
  return data;
}

async function signInUser({ username, password }) {
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
}

async function refreshAuth() {
  const { data } = await backendPublic.get("/auth/refresh", {
    withCredentials: true,
  });

  return data;
}

export default {
  getAllProjects,
  getSingleProject,
  registerUser,
  signInUser,
  refreshAuth,
};
