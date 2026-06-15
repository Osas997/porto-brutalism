import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./api";

export interface SkillData {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillPayload {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  sortOrder?: number;
}

export const skillKeys = {
  all: ["skills"] as const,
  detail: (id: string) => ["skills", id] as const,
};

export function useSkills() {
  return useQuery<SkillData[]>({
    queryKey: skillKeys.all,
    queryFn: () => apiFetch<SkillData[]>("/api/skills"),
  });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation<SkillData, Error, CreateSkillPayload>({
    mutationFn: (payload) =>
      apiFetch<SkillData>("/api/skills", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillKeys.all });
    },
  });
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation<{ id: string }, Error, string>({
    mutationFn: (id) =>
      apiFetch<{ id: string }>(`/api/skills/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillKeys.all });
    },
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation<SkillData, Error, { id: string; payload: Partial<CreateSkillPayload> }>({
    mutationFn: ({ id, payload }) =>
      apiFetch<SkillData>(`/api/skills/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: skillKeys.all });
      queryClient.invalidateQueries({ queryKey: skillKeys.detail(data.id) });
    },
  });
}
