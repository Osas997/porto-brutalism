export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  category: string;
  longDescription?: string;
  features?: string[];
  gallery?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
