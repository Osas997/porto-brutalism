import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./api";

import type { Experience, Education } from "@/types";

export interface ProfileData {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  aboutBio: string;
  email: string;
  location: string;
  avatarUrl?: string | null;
  githubUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  experience: Experience[];
  education: Education[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  aboutBio: string;
  email: string;
  location: string;
  avatarUrl?: string | null;
  githubUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  experience: Experience[];
  education: Education[];
}

export const profileKeys = {
  all: ["profile"] as const,
};

export function useProfile() {
  return useQuery<ProfileData>({
    queryKey: profileKeys.all,
    queryFn: () => apiFetch<ProfileData>("/api/profile"),
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<ProfileData, Error, UpdateProfilePayload>({
    mutationFn: (payload) =>
      apiFetch<ProfileData>("/api/profile", {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(profileKeys.all, data);
    },
  });
}
