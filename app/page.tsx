import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { prisma } from "@/lib/prisma";

// Force Next.js to use Server-Side Rendering (SSR) on every request
export const dynamic = "force-dynamic";

export default async function Home() {
  const dbProfile = await prisma.profile.findUnique({ where: { id: "default" } });
  const dbProjects = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  const dbSkills = await prisma.skill.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const profile = dbProfile
    ? {
        name: dbProfile.name,
        role: dbProfile.role,
        tagline: dbProfile.tagline,
        bio: dbProfile.bio,
        aboutBio: dbProfile.aboutBio,
        email: dbProfile.email,
        location: dbProfile.location,
        avatarUrl: dbProfile.avatarUrl,
        githubUrl: dbProfile.githubUrl,
        instagramUrl: dbProfile.instagramUrl,
        linkedinUrl: dbProfile.linkedinUrl,
        experience: (dbProfile.experience as any) || [],
        education: (dbProfile.education as any) || [],
      }
    : undefined;

  const projects = dbProjects.length > 0 ? dbProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    techStack: p.techStack,
    githubUrl: p.githubUrl || undefined,
    liveUrl: p.liveUrl || undefined,
    imageUrl: p.imageUrl,
    category: p.category,
    longDescription: p.longDescription || undefined,
    features: p.features,
    gallery: p.gallery,
    sortOrder: p.sortOrder,
  })) : undefined;

  const skills = dbSkills.length > 0 ? dbSkills.map((s) => ({
    name: s.name,
    category: s.category,
  })) : undefined;

  return (
    <>
      <Navbar name={profile?.name ?? undefined} />
      <main className="flex-1">
        <Hero profile={profile} skills={skills} />
        <hr className="border-t-4 border-primary" />
        <Projects projects={projects} />
        <hr className="border-t-4 border-primary" />
        <About profile={profile} skills={skills} />
        <hr className="border-t-4 border-primary" />
        <Contact profile={profile} />
      </main>
      <Footer
        name={profile?.name ?? undefined}
        githubUrl={profile?.githubUrl}
        instagramUrl={profile?.instagramUrl}
        linkedinUrl={profile?.linkedinUrl}
      />
    </>
  );
}
