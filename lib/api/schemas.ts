import { z } from "zod"

const optionalUrl = z.union([z.string().url(), z.literal(""), z.null()]).optional().transform((value) => value || undefined)
const stringList = z.array(z.string().trim().min(1)).default([])

export const projectCreateSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  description: z.string().trim().min(1).max(2000),
  longDescription: z.string().trim().max(8000).optional(),
  category: z.string().trim().min(1).max(80),
  techStack: stringList,
  features: stringList,
  gallery: stringList,
  imageUrl: z.string().trim().min(1),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
})

export const projectUpdateSchema = projectCreateSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
})

export const skillCreateSchema = z.object({
  name: z.string().trim().min(1).max(80),
  category: z.enum(["frontend", "backend", "tools", "other"]),
  sortOrder: z.number().int().min(0).default(0),
})

export const skillUpdateSchema = skillCreateSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
})

export const profileSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(160),
  tagline: z.string().trim().min(1).max(260),
  bio: z.string().trim().min(1).max(2000),
  aboutBio: z.string().trim().min(1).max(5000),
  email: z.string().trim().email().max(160),
  location: z.string().trim().min(1).max(160),
  avatarUrl: z.string().trim().url().optional().or(z.literal("")).or(z.null()),
  githubUrl: z.string().trim().url().optional().or(z.literal("")).or(z.null()),
  instagramUrl: z.string().trim().url().optional().or(z.literal("")).or(z.null()),
  linkedinUrl: z.string().trim().url().optional().or(z.literal("")).or(z.null()),
  experience: z.array(
    z.object({
      id: z.string(),
      company: z.string().trim().min(1).max(160),
      role: z.string().trim().min(1).max(160),
      duration: z.string().trim().min(1).max(100),
      description: z.string().trim().min(1).max(1000),
    })
  ).default([]),
  education: z.array(
    z.object({
      id: z.string(),
      institution: z.string().trim().min(1).max(160),
      degree: z.string().trim().min(1).max(160),
      duration: z.string().trim().min(1).max(100),
      description: z.string().trim().max(1000).optional().or(z.literal("")),
    })
  ).default([]),
})

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
