import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useBackendPrivate from "../hooks/useBackendPrivate";
import apiService from "../services/apiService.js";

function useProject(projectId) {
  return useQuery({
    queryKey: [`project-${projectId}`],
    queryFn: () => apiService.getSingleProject(projectId),
  });
}

function useAllProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: apiService.getAllProjects,
  });
}

function useCreateProject() {
  const queryClient = useQueryClient();
  const backendPrivate = useBackendPrivate();

  const mutationFn = async ({
    title,
    description,
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

export { useProject, useAllProjects, useCreateProject };
