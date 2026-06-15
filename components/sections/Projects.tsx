"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink, FolderGit2, GitBranch } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { projects } from "@/lib/data";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const router = useRouter();

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category.toLowerCase() === activeFilter;
  });

  const handleCardClick = (e: React.MouseEvent, id: string) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) {
      return;
    }
    router.push(`/projects/${id}`);
  };

  return (
    <section id="projects" className="py-20 md:py-32 section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            {/* Title Area */}
            <div>
              <span className="text-secondary font-mono font-bold text-xs uppercase tracking-widest block mb-2">
                PROJECT GRID
              </span>
              <h2 className="heading-lg text-primary uppercase leading-tight font-display">
                FEATURED WORK
              </h2>
              <div className="mt-3 h-1 w-16 bg-secondary" />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2.5">
              {["ALL", "BACKEND", "FULL STACK", "DEVOPS"].map((cat) => {
                const isActive = activeFilter === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat.toLowerCase())}
                    className={`neo-btn px-4 py-2 text-xs md:text-sm font-mono font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "bg-secondary text-primary shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        : "bg-white dark:bg-surface text-primary hover:bg-secondary/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <Card
                onClick={(e) => handleCardClick(e, project.id)}
                className="group h-full flex flex-col p-6 cursor-pointer bg-surface"
              >
                {/* Top Row: Category & Decorative Dot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-secondary font-mono font-semibold text-xs tracking-wider uppercase">
                    <FolderGit2 size={16} />
                    <span>{project.category}</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary border border-primary" />
                </div>

                {/* Divider */}
                <hr className="border-t-2 border-primary/20 my-4" />

                {/* Project Title */}
                <h3 className="heading-sm text-primary mb-3 font-mono font-bold tracking-tight uppercase leading-snug group-hover:text-secondary transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="body-sm text-muted mb-6 leading-relaxed flex-1 font-mono">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-white dark:bg-surface text-primary border-2 border-primary font-mono text-xs font-bold px-2.5 py-1 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <hr className="border-t-2 border-primary/20 mb-4 mt-auto" />

                {/* Footer Links */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-6">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono font-bold text-xs text-primary hover:text-secondary transition-colors duration-200 cursor-pointer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <GitBranch size={16} />
                        <span>CODE</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono font-bold text-xs text-primary hover:text-secondary transition-colors duration-200 cursor-pointer"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink size={16} />
                        <span>LIVE PREVIEW</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 font-mono font-bold text-xs text-secondary hover:text-primary dark:hover:text-tertiary transition-colors duration-200 cursor-pointer"
                  >
                    <span>DETAILS</span>
                    <span className="font-sans font-bold">&rarr;</span>
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
