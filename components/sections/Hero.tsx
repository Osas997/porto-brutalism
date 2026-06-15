"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { siteConfig, marqueeTexts } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const leftColumn = (
    <>
      {/* Label */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 neo-border neo-shadow px-3.5 py-1.5 bg-secondary text-primary text-xs font-mono font-bold uppercase tracking-wider">
          &gt;_ {siteConfig.role}
        </span>
      </div>

      {/* Name */}
      <h1 className="heading-display text-primary uppercase mb-6 leading-none">
        {siteConfig.name}
      </h1>

      {/* Tagline */}
      <div className="border-l-4 border-secondary pl-4 mb-6">
        <p className="font-mono font-bold text-lg md:text-xl text-primary leading-snug">
          {siteConfig.tagline}
        </p>
      </div>

      {/* Bio */}
      <p className="font-mono text-muted text-sm md:text-base leading-relaxed mb-10 max-w-xl">
        {siteConfig.bio}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-6 items-center">
        <div className="relative inline-block group">
          {/* Tilted background card paper decoration */}
          <div className="absolute inset-0 bg-white dark:bg-surface border-3 border-primary -rotate-6 translate-x-[-4px] translate-y-[-6px] transition-transform duration-200 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0" />
          
          <a
            href="#projects"
            className="relative neo-btn bg-primary text-secondary dark:text-tertiary px-6 py-4 text-sm font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-secondary hover:text-primary dark:hover:text-tertiary transition-colors duration-200 z-10"
          >
            <span>VIEW PROJECTS</span>
            <span className="font-sans font-bold">&rarr;</span>
          </a>
        </div>

        <a
          href="#contact"
          className="neo-btn bg-white dark:bg-surface text-primary px-6 py-4 text-sm font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-primary transition-colors duration-200"
        >
          LET&apos;S CHAT
        </a>
      </div>
    </>
  );

  const rightColumn = (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto z-10 mt-8 lg:mt-0">
      {/* Peeking yellow post-it tab behind */}
      <div className="absolute -top-3.5 right-12 w-28 h-10 bg-secondary border-3 border-primary rotate-3 -z-10 rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)]" />

      {/* Main Terminal Window */}
      <div className="w-full bg-surface border-3 border-primary neo-shadow-lg rounded-sm overflow-hidden flex flex-col">
        {/* Terminal Header */}
        <div className="bg-primary text-secondary px-4 py-3 flex items-center justify-between border-b-3 border-primary">
          {/* 3 Mac-style dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444] border-2 border-primary" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B] border-2 border-primary" />
            <span className="w-3 h-3 rounded-full bg-[#10B981] border-2 border-primary" />
          </div>
          {/* System Status */}
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-secondary">
            <span className="text-xs">⚙</span>
            <span>system.status = "active"</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-sm space-y-4 text-primary bg-surface/50">
          {/* Cmd 1 */}
          <div>
            <p className="text-secondary font-bold">$ whoami</p>
            <p className="text-primary mt-1 font-medium">alexander</p>
          </div>
          <hr className="border-t-2 border-primary/10" />

          {/* Cmd 2 */}
          <div>
            <p className="text-secondary font-bold">$ locate --skills</p>
            <p className="text-primary mt-1 font-medium">[Go, Rust, TypeScript, K8s, PostgreSQL, Redis]</p>
          </div>
          <hr className="border-t-2 border-primary/10" />

          {/* Cmd 3 */}
          <div>
            <p className="text-secondary font-bold">$ make coffee</p>
            <p className="text-emerald-500 dark:text-emerald-400 mt-1 font-bold flex items-center gap-1">
              <span>✓</span> Success. Coffee hot.
            </p>
          </div>
          <hr className="border-t-2 border-primary/10" />

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 text-xs font-bold text-muted">
            <span>ALEX_CARTER_V2.0</span>
            <span className="w-3.5 h-3.5 bg-secondary border-2 border-primary" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-8 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 neo-dot-pattern pointer-events-none" />

      {/* Decorative Shapes */}
      <div className="absolute top-32 right-8 md:right-24 w-20 h-20 md:w-32 md:h-32 bg-secondary neo-border rotate-12 opacity-20 pointer-events-none" />
      <div className="absolute bottom-40 left-8 md:left-16 w-12 h-12 md:w-20 md:h-20 bg-error neo-border rounded-full opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-8 h-8 md:w-14 md:h-14 bg-primary neo-border opacity-10 pointer-events-none" />

      {/* Main Content */}
      <div className="section-padding max-w-6xl mx-auto w-full flex-1 flex items-center py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {prefersReducedMotion ? (
              leftColumn
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col justify-center"
              >
                <motion.div variants={itemVariants} className="flex flex-col justify-center">
                  {leftColumn}
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
            {prefersReducedMotion ? (
              rightColumn
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full flex items-center justify-center lg:justify-end"
              >
                {rightColumn}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-y-3 border-border bg-surface/50 mt-auto">
        <Marquee texts={marqueeTexts} speed={40} />
      </div>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-muted" />
        </motion.div>
      )}
    </section>
  );
}
