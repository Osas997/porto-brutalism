import type { Project, Experience, Education, Skill, NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Alexander Carter",
  role: "LEAD BACKEND DEVELOPER",
  tagline: "Building resilient distributed systems, APIs, and scalable infrastructure.",
  bio: "I design high-performance, fault-tolerant backend services that process millions of events per day. Focused on clean architecture, Go/Rust, Kubernetes, and Postgres.",
  aboutBio: "Hi, I'm Alexander. I have 6+ years of experience designing backend systems, working with high-throughput microservices, database optimizations, and cloud architecture. I'm passionate about performance profiling, API design, and automation pipelines. When I'm not writing code, I contribute to open-source developer tooling.",
  email: "alexander@example.com",
  location: "San Francisco, CA",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/johndoe", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: "linkedin" },
  { name: "Twitter", url: "https://twitter.com/johndoe", icon: "twitter" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "OMNIQUEUE: DISTRIBUTED TASK BROKER",
    category: "Backend",
    description:
      "A lightweight, reliable distributed task queue broker built in Go with support for task prioritizing, delayed tasks, and automatic dead-letter routing. Features <1ms latency overhead and handles up to 50k concurrency tasks.",
    techStack: ["Golang", "Redis", "gRPC", "Docker"],
    githubUrl: "https://github.com/johndoe/omniqueue",
    liveUrl: "https://omniqueue.example.com",
    imageUrl: "/projects/project-1.svg",
    longDescription: "Omniqueue is a production-grade, highly performant distributed task broker designed to handle scheduling and execution of background workloads with microsecond-level latency. It serves as a drop-in replacement for complex queuing systems, prioritizing developer simplicity while maintaining horizontal scalability across Kubernetes clusters. Developed entirely in Golang, it utilizes Redis for lightning-fast memory state management and gRPC for client-broker communications.",
    features: [
      "Microsecond latency task scheduling and dispatch",
      "Dynamic priority queues with real-time weights adjustment",
      "Dead-letter queue (DLQ) with automatic retry and backoff policies",
      "gRPC APIs with client libraries in Go, Rust, and TypeScript",
      "Structured JSON-logging and native Prometheus metrics export"
    ],
    gallery: [
      "/projects/omniqueue-1.svg",
      "/projects/omniqueue-2.svg",
      "/projects/omniqueue-3.svg"
    ]
  },
  {
    id: "2",
    title: "LOGSTORM: REAL-TIME EVENT STREAMER",
    category: "Full Stack",
    description:
      "High-performance event streaming and analysis platform built in Rust. Capable of ingesting and parsing structured system logs at 100,000 requests per second. Includes a dashboard visualizer UI.",
    techStack: ["Rust", "PostgreSQL", "React", "Docker"],
    githubUrl: "https://github.com/johndoe/logstorm",
    liveUrl: "https://logstorm.example.com",
    imageUrl: "/projects/project-2.svg",
    longDescription: "Logstorm is an end-to-end event streaming and log analysis pipeline designed for high-throughput microservices. The backend is written in Rust to guarantee thread-safe log ingestion and parsing at speeds exceeding 100,000 events per second. The frontend features a reactive, live dashboard built with React and Tailwind, offering real-time charting, trace parsing, and query-filtering over ingested data stored in PostgreSQL.",
    features: [
      "Ingestion pipeline capable of 100k events/sec under low memory usage",
      "Regex-free log parsing using optimized Rust parser-combinators",
      "Interactive analytics dashboard with time-series charts",
      "Custom SQL-like query interface for live log filtering",
      "Webhooks support for real-time alerting based on log triggers"
    ],
    gallery: [
      "/projects/logstorm-1.svg",
      "/projects/logstorm-2.svg",
      "/projects/logstorm-3.svg"
    ]
  },
  {
    id: "3",
    title: "KUBEGUARD: AUTOSCALING ENGINES",
    category: "DevOps",
    description:
      "Custom Kubernetes controller for dynamic, metric-based autoscaling of heavy workloads. Configured with automated backup pipelines and multi-zone failovers.",
    techStack: ["Kubernetes", "Go", "Prometheus", "Helm"],
    githubUrl: "https://github.com/johndoe/kubeguard",
    liveUrl: "https://kubeguard.example.com",
    imageUrl: "/projects/project-3.svg",
    longDescription: "Kubeguard is a custom Kubernetes operator and controller built in Go that monitors pod latency and resources through Prometheus metrics. It automatically triggers horizontal pod autoscaling based on queue length or execution time rather than generic CPU/memory metrics, ensuring heavy tasks run efficiently without over-allocating cloud compute.",
    features: [
      "Prometheus metric-based horizontal pod autoscaling",
      "Custom CRDs for configuring scaling triggers and backoff delays",
      "High-availability failover scripts covering multi-region clusters",
      "Slack/Discord alerting webhooks on scaling events",
      "Dry-run simulation mode to test autoscaling limits"
    ],
    gallery: [
      "/projects/kubeguard-1.svg",
      "/projects/kubeguard-2.svg"
    ]
  },
  {
    id: "4",
    title: "SECUREGATE: ZERO-TRUST API GATEWAY",
    category: "Backend",
    description:
      "A secure API Gateway with OAuth2, MFA, and SSO support, featuring hardware-accelerated SSL termination and automated IP-rate limiting.",
    techStack: ["TypeScript", "Node.js", "Redis", "JWT"],
    githubUrl: "https://github.com/johndoe/securegate",
    liveUrl: "https://securegate.example.com",
    imageUrl: "/projects/project-4.svg",
    longDescription: "Securegate is a lightweight, zero-trust API Gateway designed for microservices architectures. Built with Node.js and TypeScript, it handles client authentication, role-based access control, session validation, and SSL termination. By leveraging Redis for high-speed rate-limiting, it successfully blocks malicious actors and DDoS attempts before they hit downstream services.",
    features: [
      "OAuth2, JWT authentication, and native Multi-Factor Authentication",
      "High-speed Redis rate-limiting (sliding window log algorithm)",
      "Automated IP blacklisting and DDoS throttling",
      "Dynamic request routing and path rewriting",
      "Unified audit logging and transaction tracing"
    ],
    gallery: [
      "/projects/securegate-1.svg",
      "/projects/securegate-2.svg"
    ]
  },
];

export const skills: Skill[] = [
  { name: "Go", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "TypeScript", category: "backend" },
  { name: "Rust", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Redis", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Kubernetes", category: "tools" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind", category: "frontend" },
  { name: "Git", category: "tools" },
  { name: "Linux", category: "tools" },
  { name: "AWS", category: "tools" },
  { name: "GraphQL", category: "other" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "TechCorp Inc.",
    role: "Senior Backend Engineer",
    duration: "2023 — Present",
    description:
      "Leading a team of 5 engineers building microservices architecture. Reduced API latency by 40% and improved system uptime to 99.99%.",
  },
  {
    id: "2",
    company: "StartupXYZ",
    role: "Backend Developer",
    duration: "2021 — 2023",
    description:
      "Built and maintained RESTful APIs serving 100K+ daily users. Implemented CI/CD pipelines and automated testing infrastructure.",
  },
  {
    id: "3",
    company: "Freelance",
    role: "Software Engineer",
    duration: "2020 — 2021",
    description:
      "Developed custom backend solutions for 10+ clients including e-commerce platforms and SaaS applications.",
  },
];

export const education: Education[] = [
  {
    id: "1",
    institution: "University of Technology",
    degree: "B.Sc. Computer Science",
    duration: "2016 — 2020",
    description: "Focus on distributed systems and software engineering. Dean's list 2018-2020.",
  },
];

export const marqueeTexts = [
  "Backend Developer",
  "System Architect",
  "Open Source Contributor",
  "Problem Solver",
  "API Designer",
  "DevOps Enthusiast",
];
