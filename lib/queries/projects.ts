import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./api";

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  category: string;
  techStack: string[];
  features: string[];
  gallery: string[];
  imageUrl: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  title: string;
  slug?: string;
  description: string;
  longDescription?: string;
  category: string;
  techStack: string[];
  features: string[];
  gallery: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  sortOrder?: number;
}

export const projectKeys = {
  all: ["projects"] as const,
  detail: (id: string) => ["projects", id] as const,
};

export function useProjects() {
  return useQuery<ProjectData[]>({
    queryKey: projectKeys.all,
    queryFn: () => apiFetch<ProjectData[]>("/api/projects"),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation<ProjectData, Error, CreateProjectPayload>({
    mutationFn: (payload) =>
      apiFetch<ProjectData>("/api/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation<{ id: string }, Error, string>({
    mutationFn: (id) =>
      apiFetch<{ id: string }>(`/api/projects/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation<ProjectData, Error, { id: string; payload: Partial<CreateProjectPayload> }>({
    mutationFn: ({ id, payload }) =>
      apiFetch<ProjectData>(`/api/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(data.id) });
    },
  });
}
