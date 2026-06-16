import { prisma } from "../prisma";
import { projects } from "../data";

export async function getProjectById(id: string) {
  try {
    const dbProject = await prisma.project.findUnique({ where: { id } });
    if (dbProject) {
      return {
        id: dbProject.id,
        title: dbProject.title,
        description: dbProject.description,
        techStack: dbProject.techStack,
        githubUrl: dbProject.githubUrl || undefined,
        liveUrl: dbProject.liveUrl || undefined,
        imageUrl: dbProject.imageUrl,
        category: dbProject.category,
        longDescription: dbProject.longDescription || undefined,
        features: dbProject.features,
        gallery: dbProject.gallery,
      };
    }
  } catch (err) {
    console.error("Database error loading project details:", err);
  }
  return projects.find((p) => p.id === id);
}
