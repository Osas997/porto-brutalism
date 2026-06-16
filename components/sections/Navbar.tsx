"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { navLinks } from "@/lib/data";

interface NavbarProps {
  name?: string;
}

export function Navbar({ name }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollDirection, scrollY } = useScrollDirection();

  const isScrolled = scrollY > 50;
  const isHidden = scrollDirection === "down" && scrollY > 200;

  const logoText = name ? `${name.split(" ")[1].toUpperCase()}//` : "ALEXANDER//";

  return (
    <motion.header
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isHidden ? "-translate-y-[calc(100%+2rem)]" : "translate-y-0"
      }`}
    >
      <nav
        className={`neo-border neo-shadow rounded-md mx-auto max-w-6xl transition-colors duration-300 ${
          isScrolled ? "bg-surface/95 backdrop-blur-sm" : "bg-surface"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 font-mono font-bold tracking-wider text-lg md:text-xl text-primary cursor-pointer hover:text-secondary transition-colors duration-200"
          >
            <img src="/logo.svg" alt="Logo" className="w-6 h-6 object-contain dark:invert" />
            <span>{logoText}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="label text-on-surface hover:text-secondary transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="neo-btn p-2 bg-surface text-primary hover:text-secondary flex items-center justify-center"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  className="flex items-center justify-center"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? (
                    <Moon size={18} className="fill-current" />
                  ) : (
                    <Sun size={18} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Resume CTA */}
            <a
              target="_blank"
              href="/cv.pdf"
              className="neo-btn bg-secondary text-primary dark:text-tertiary px-4 py-2 text-sm font-mono font-bold uppercase tracking-wider hover:bg-primary hover:text-secondary dark:hover:text-tertiary transition-colors duration-200"
            >
              CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="neo-btn p-2 bg-surface text-primary"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="neo-btn p-2 bg-surface text-primary"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden md:hidden border-t-3 border-border"
            >
              <div className="flex flex-col gap-2 px-4 py-4 bg-surface">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="label text-on-surface hover:text-secondary hover:bg-secondary/10 px-3 py-3 rounded transition-colors duration-200 cursor-pointer"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  target="_blank"
                  href="/cv.pdf"
                  onClick={() => setIsOpen(false)}
                  className="neo-btn bg-secondary text-primary dark:text-tertiary px-4 py-3 text-center text-sm font-mono font-bold uppercase tracking-wider hover:bg-primary hover:text-secondary dark:hover:text-tertiary mt-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  CV
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
