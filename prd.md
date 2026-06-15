# PRODUCT REQUIREMENT DOCUMENT (PRD)

## Modern Portfolio Website – Neobrutalism Style

---

## 1. Overview

### 1.1 Product Name

Modern Portfolio Website (Neobrutalism Style)

### 1.2 Objective

Membangun website portofolio modern, responsif, SEO-friendly dengan gaya visual **neobrutalism**, untuk menampilkan profil, project, dan informasi profesional secara menarik dan interaktif.

### 1.3 Target Users

* Recruiter / HR
* Client freelance
* Developer community

---

## 2. Tech Stack

### Core

* Framework: **Next.js (App Router)**
* Language: **TypeScript**
* Styling: **Tailwind CSS**
* Animation: **Framer Motion / GSAP**
* State: React Hooks (useState, useEffect, useMemo, dll)

### Optional Enhancements

* Dark mode: `next-themes`
* SEO: `next-seo`
* Icons: `lucide-react`

---

## 3. Design System

### 3.1 Style Reference

Mengacu pada file `@design.md` dengan karakteristik:

* Neobrutalism:

  * Bold borders (2px–4px)
  * High contrast colors
  * Flat design (no soft shadows)
  * Offset shadows / hard shadows
  * Asymmetric layout

### 3.2 Color System

* Light mode: putih, hitam, accent neon
* Dark mode: hitam, putih, accent kontras
* Gunakan CSS variables untuk theming

### 3.3 Typography

* Font modern (Inter / Space Grotesk)
* Heading: bold & uppercase
* Body: clean readable

---

## 4. Features

### 4.1 Global Features

* ✅ Responsive design (mobile-first)
* ✅ Dark mode toggle
* ✅ Smooth animation
* ✅ SEO optimized
* ✅ Accessibility (a11y basic)

---

## 5. Sections

---

### 5.1 Hero Section

**Tujuan:** First impression + branding

**Content:**

* Nama
* Role (Backend Developer, etc)
* Short tagline
* CTA button (View Projects / Contact)

**Features:**

* Running text animation (marquee modern)
* Entrance animation (fade/slide)
* Hover button effect (scale, border shift)

---

### 5.2 Project Section

**Tujuan:** Showcase karya

**Content:**

* List project:

  * Title
  * Description
  * Tech stack
  * Link (GitHub / Live)

**Features:**

* Card hover animation
* Image preview
* Filter (optional)

---

### 5.3 About Section

#### 5.3.1 Bio

* Deskripsi singkat

#### 5.3.2 Profile Image

* Foto profesional

#### 5.3.3 Tech Skills

* Grid icon skill

#### 5.3.4 Experience

* Timeline / list

#### 5.3.5 Education

* Timeline / list

**Features:**

* Scroll animation (reveal on scroll)
* Timeline animation

---

### 5.4 Contact Section

**Tujuan:** Convert visitor → contact

**Content:**

* Email
* Social media (LinkedIn, GitHub)
* Contact form (optional)

**Features:**

* Button hover animation
* Copy email interaction

---

## 6. Animation Requirements

Gunakan:

* **Framer Motion** untuk:

  * Page transition
  * Hover effect
  * Scroll reveal

* **GSAP** untuk:

  * Running text / marquee
  * Complex timeline animation

### Animation Principles:

* Smooth (ease-in-out)
* Tidak berlebihan
* Performance optimized

---

## 7. SEO Requirements

### 7.1 Technical SEO

* Meta tags (title, description)
* Open Graph
* Sitemap.xml
* robots.txt

### 7.2 Performance

* Image optimization (next/image)
* Lazy loading
* Code splitting

### 7.3 Accessibility

* Semantic HTML
* Alt text image
* Keyboard navigation

---

## 8. Folder Structure (Best Practice)

```
/app
  /layout.tsx
  /page.tsx

/components
  /ui
  /sections
    Hero.tsx
    Projects.tsx
    About.tsx
    Contact.tsx

/lib
  utils.ts

/hooks
  useTheme.ts
  useScroll.ts

/types
  index.ts

/styles
  globals.css
```

---

## 9. Coding Guidelines

* Gunakan TypeScript strict mode
* Gunakan functional component
* Gunakan reusable component
* Hindari inline styles
* Gunakan Tailwind utility-first
* Pisahkan logic ke hooks

---

## 10. Dark Mode

* Gunakan `class` strategy
* Toggle via button
* Simpan preferensi user (localStorage)

---

## 11. Performance Optimization

* Use `next/image`
* Use dynamic import untuk heavy component
* Avoid unnecessary re-render
* Memoization (`useMemo`, `useCallback`)

---

## 12. Future Enhancements

* Blog section
* CMS integration (Sanity / Notion)
* Analytics (Vercel / GA)
* Multi-language

---

# PROMPT (FOR AI / CODING GENERATOR)

Build a modern portfolio website using Next.js App Router, TypeScript, and Tailwind CSS with a neobrutalism design style.

Requirements:

* Fully responsive (mobile-first)
* Dark mode support using class strategy
* SEO optimized (meta tags, Open Graph, sitemap)
* Use Framer Motion and GSAP for animations

Sections:

1. Hero section with running text animation and CTA
2. Projects section with animated cards
3. About section (bio, profile image, skills, experience, education)
4. Contact section with social links and optional form

Design:

* Neobrutalism style (bold borders, high contrast, flat design)
* Clean typography (Inter / Space Grotesk)
* Use Tailwind CSS utility classes

Best Practices:

* Use React hooks
* Use TypeScript types
* Component-based architecture
* Separate logic into hooks
* Optimize performance

Output:

* Clean, scalable folder structure
* Reusable components
* Production-ready code
