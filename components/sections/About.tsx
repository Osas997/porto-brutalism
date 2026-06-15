"use client";

import { Briefcase, GraduationCap, Code2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig, skills, experiences, education } from "@/lib/data";
import type { Experience, Education as EduType, Skill } from "@/types";
import { sortByDurationDesc } from "@/lib/utils";

export interface AboutProps {
  profile?: {
    name: string | null;
    role: string | null;
    aboutBio: string | null;
    location: string | null;
    avatarUrl?: string | null;
    experience?: Experience[];
    education?: EduType[];
  };
  skills?: Skill[];
}

export function About({ profile, skills: dbSkills }: AboutProps = {}) {
  const skillList = dbSkills && dbSkills.length > 0 ? dbSkills : skills;

  const name = profile?.name || "ALEX CARTER";
  const role = profile?.role || "SYSTEMS ENGINEER";
  const aboutBio = profile?.aboutBio || siteConfig.aboutBio;
  const location = profile?.location || siteConfig.location;
  const experienceList = sortByDurationDesc(profile?.experience || experiences);
  const educationList = sortByDurationDesc(profile?.education || education);

  const skillCategories = [
    { key: "backend", label: "Backend" },
    { key: "frontend", label: "Frontend" },
    { key: "tools", label: "Tools & DevOps" },
    { key: "other", label: "Other" },
  ] as const;

  return (
    <section id="about" className="py-20 md:py-32 section-padding bg-surface/30">
      <div className="max-w-6xl mx-auto">

        {/* Bio + Profile */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-24 items-center">
            {/* Biography Text (Left) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-secondary font-mono font-bold text-xs uppercase tracking-widest block mb-2">
                BIOGRAPHY
              </span>
              <h2 className="heading-lg text-primary uppercase leading-tight font-display mb-3">
                ABOUT ME
              </h2>
              <div className="h-1 w-16 bg-secondary mb-6" />

              <p className="font-mono text-primary text-base leading-relaxed mb-8">
                {aboutBio}
              </p>

              {/* Location Badge */}
              <div className="inline-block">
                <div className="neo-border bg-white dark:bg-surface text-primary px-4 py-2.5 font-mono text-sm font-bold rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                  LOCATION: <span className="text-secondary">{location}</span>
                </div>
              </div>
            </div>

            {/* Profile Terminal Card (Right) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm aspect-square group cursor-pointer">
                {/* Yellow background offset sheet */}
                <div className="absolute inset-0 bg-secondary border-3 border-primary translate-x-3.5 translate-y-3.5 rounded-sm transition-transform duration-200 group-hover:translate-x-5 group-hover:translate-y-5" />
                
                {/* Main Profile Card Container */}
                <div className="relative w-full h-full bg-surface border-3 border-primary p-6 rounded-sm flex flex-col items-center justify-center transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
                  {/* Inner Dashed Border */}
                  <div className="border-3 border-dashed border-primary/30 rounded-sm w-full h-full p-6 flex flex-col items-center justify-center bg-surface/50">
                    {/* circular avatar symbol */}
                    <div className="w-24 h-24 rounded-full bg-white dark:bg-surface border-3 border-primary flex items-center justify-center mb-4 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform duration-200 group-hover:scale-105 group-hover:rotate-6 overflow-hidden">
                      {profile?.avatarUrl ? (
                        <img
                          src={profile.avatarUrl}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-mono text-3xl font-bold text-secondary tracking-tighter flex items-center">
                          &gt;_
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h4 className="font-mono font-extrabold text-xl text-primary tracking-tight uppercase mb-1 text-center">
                      {name}
                    </h4>

                    {/* Subtitle */}
                    <p className="font-mono font-bold text-xs text-muted uppercase tracking-widest mb-6 text-center">
                      {role}
                    </p>

                    {/* Status Pill */}
                    <span className="inline-block bg-[#1A202C] text-[10px] md:text-xs font-mono font-bold text-white px-4.5 py-2 rounded-sm uppercase tracking-wider">
                      STATUS: <span className="text-secondary font-extrabold">ACTIVE_PROFILE</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Tech Skills */}
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-8">
              <Code2 size={40} className="text-secondary" />
              <h3 className="heading-lg text-primary uppercase leading-tight font-display">Tech Stack</h3>
            </div>

            <div className="space-y-6">
              {skillCategories.map(({ key, label }) => {
                const categorySkills = skillList.filter((s) => s.category === key);
                if (categorySkills.length === 0) return null;

                return (
                  <div key={key}>
                    <p className="label text-muted mb-3 font-mono font-bold text-xs uppercase tracking-wider">{label}</p>
                    <div className="flex flex-wrap gap-3.5">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="inline-block bg-white dark:bg-surface text-primary border-3 border-primary px-4 py-2 rounded-sm font-mono font-bold text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-secondary dark:hover:text-primary transition-all duration-200 cursor-pointer select-none"
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Experience Timeline */}
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={40} className="text-secondary" />
              <h3 className="heading-lg text-primary uppercase leading-tight font-display">Experience</h3>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-8">
                {experienceList.map((exp, index) => (
                  <ScrollReveal key={exp.id} delay={index * 0.1}>
                    <div className="relative pl-12 md:pl-16">
                      {/* Timeline Dot */}
                      <div className="absolute left-2.5 md:left-4.5 top-2 w-3 h-3 bg-secondary neo-border rounded-full" />

                      <Card hover={false}>
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                          <h4 className="heading-sm text-primary">
                            {exp.role}
                          </h4>
                          <span className="body-sm text-muted whitespace-nowrap">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="label text-secondary mb-2">
                          {exp.company}
                        </p>
                        <p className="body-sm text-muted">{exp.description}</p>
                      </Card>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Education Timeline */}
        <ScrollReveal>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={40} className="text-secondary" />
              <h3 className="heading-lg text-primary uppercase leading-tight font-display">Education</h3>
            </div>

            <div className="relative">
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-8">
                {educationList.map((edu, index) => (
                  <ScrollReveal key={edu.id} delay={index * 0.1}>
                    <div className="relative pl-12 md:pl-16">
                      <div className="absolute left-2.5 md:left-4.5 top-2 w-3 h-3 bg-secondary neo-border rounded-full" />

                      <Card hover={false}>
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                          <h4 className="heading-sm text-primary">
                            {edu.degree}
                          </h4>
                          <span className="body-sm text-muted whitespace-nowrap">
                            {edu.duration}
                          </span>
                        </div>
                        <p className="label text-secondary mb-2">
                          {edu.institution}
                        </p>
                        {edu.description && (
                          <p className="body-sm text-muted">
                            {edu.description}
                          </p>
                        )}
                      </Card>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
