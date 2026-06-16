import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.muhammadariq.my.id";

  // Fetch all published projects to dynamically include in the sitemap
  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    const dbProjects = await prisma.project.findMany({
      where: { isPublished: true },
      select: { id: true, updatedAt: true },
    });

    projectUrls = dbProjects.map((p) => ({
      url: `${baseUrl}/projects/${p.id}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to generate project urls for sitemap:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
