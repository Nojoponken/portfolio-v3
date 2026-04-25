import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backendPublic } from "../services/backend";
import useBackendPrivate from "../hooks/useBackendPrivate";

function useProject({ projectId }) {
  const queryFn = async () => {
    const { data } = await backendPublic.get(`/projects/${projectId}`);
    return data;
  };

  return useQuery({
    queryKey: [`project-${projectId}`],
    queryFn,
  });
}

function useAllProjects() {
  const queryFn = async () => {
    const { data } = await backendPublic.get("/projects");
    return data;
  };

  return useQuery({
    queryKey: ["projects"],
    queryFn,
  });
}

function useCreateProject() {
  const queryClient = useQueryClient();
  const backendPrivate = useBackendPrivate();

  const mutationFn = async ({
    title,
    description,
    repo,
    thumbnail,
    tags,
    startDate,
    endDate,
  }) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      title,
      description,
      repo,
      thumbnail,
      tags,
      startDate,
      endDate,
    };

    const { data } = await backendPrivate.post("/projects", body, { headers });
    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

function useEditProject() {
  const queryClient = useQueryClient();
  const backendPrivate = useBackendPrivate();

  const mutationFn = async ({
    id,
    title,
    description,
    repo,
    thumbnail,
    tags,
    startDate,
    endDate,
  }) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      id,
      title,
      description,
      repo,
      thumbnail,
      tags,
      startDate,
      endDate,
    };

    const { data } = await backendPrivate.patch("/projects", body, { headers });
    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export { useProject, useAllProjects, useCreateProject, useEditProject };
