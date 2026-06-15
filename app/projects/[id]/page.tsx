import Link from "next/link";
import { ArrowLeft, ExternalLink, FolderGit2, GitBranch } from "lucide-react";
import { projects } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const dbProjects = await prisma.project.findMany({ where: { isPublished: true } });
    const projectList = dbProjects.length > 0 ? dbProjects : projects;
    return projectList.map((project) => ({
      id: project.id,
    }));
  } catch (err) {
    console.error("Failed to generate static params from database, using fallback data:", err);
    return projects.map((project) => ({
      id: project.id,
    }));
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  let project: Project | undefined = undefined;

  try {
    const dbProject = await prisma.project.findUnique({ where: { id } });
    if (dbProject) {
      project = {
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

  // Fallback to static mock projects
  if (!project) {
    project = projects.find((p) => p.id === id);
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="neo-card p-8 bg-surface max-w-md w-full">
          <h1 className="heading-lg text-primary uppercase font-display mb-4">
            Project Not Found
          </h1>
          <p className="font-mono text-muted text-sm mb-6">
            The project directory you are trying to reach does not exist or has been relocated.
          </p>
          <Link
            href="/"
            className="neo-btn bg-secondary text-primary px-6 py-3 font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-primary hover:text-secondary transition-colors duration-200 w-full justify-center"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-primary py-12 md:py-20 section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Header */}
        <div className="mb-10 flex justify-between items-center">
          <Link
            href="/#projects"
            className="neo-btn bg-white dark:bg-surface text-primary px-5 py-2.5 font-mono font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 hover:bg-secondary dark:hover:text-primary transition-all duration-200 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Content System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Category Tag */}
            <div className="flex items-center gap-2 text-secondary font-mono font-bold text-xs tracking-wider uppercase mb-3">
              <FolderGit2 size={16} />
              <span>{project.category}</span>
            </div>

            {/* Project Title */}
            <h1 className="heading-display text-primary leading-none uppercase mb-6">
              {project.title.split(":").map((part: string, idx: number) => (
                <span key={part} className="block">
                  {part.trim()}
                  {idx === 0 && <span className="text-secondary">:</span>}
                </span>
              ))}
            </h1>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-block bg-white dark:bg-surface text-primary border-2 border-primary font-mono text-xs font-bold px-2.5 py-1 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Long Description / Description Fallback */}
            <p className="font-mono text-primary text-base leading-relaxed mb-8">
              {project.longDescription || project.description}
            </p>

            {/* Key Features checklist */}
            {project.features && (
              <Card hover={false} className="mb-8 bg-surface/30">
                <h4 className="font-mono font-bold text-sm text-secondary uppercase tracking-widest mb-4">
                  KEY FEATURES & OVERVIEW
                </h4>
                <ul className="space-y-3 font-mono text-sm text-primary">
                  {project.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <span className="text-secondary font-extrabold mt-0.5">✓</span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Action Links */}
            <div className="flex flex-wrap gap-4 pt-6 border-t-2 border-primary/10 mt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn bg-primary text-secondary dark:text-tertiary px-6 py-3.5 text-sm font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-secondary hover:text-primary dark:hover:text-tertiary transition-all duration-200 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                >
                  <GitBranch size={16} />
                  <span>View Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn bg-white dark:bg-surface text-primary px-6 py-3.5 text-sm font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-primary transition-all duration-200 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                >
                  <ExternalLink size={16} />
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Image Showcase / Documentation */}
          <div className="lg:col-span-5 w-full">
            <span className="text-secondary font-mono font-bold text-xs uppercase tracking-widest block mb-4">
              PROJECT DOCUMENTATION
            </span>
            <ProjectGallery images={project.gallery} />
          </div>
        </div>
      </div>
    </main>
  );
}
