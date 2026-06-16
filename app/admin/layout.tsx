"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Terminal,
  UserCircle,
  ShieldCheck,
  Power,
  X,
  Menu,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { AnimatePresence, motion } from "framer-motion";
import { AdminProvider, useAdmin } from "./AdminContext";
import { QueryProvider } from "@/lib/queries/query-provider";
import { useProfile } from "@/lib/queries/profile";
import { Button } from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { message, isSuccess,showNotification } = useAdmin();
  const { data: profile } = useProfile();
  const pathname = usePathname();
  const router = useRouter();

  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tab definitions
  const tabs = [
    { id: "dashboard", href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", href: "/admin/projects", label: "Manage Projects", icon: FolderGit2 },
    { id: "skills", href: "/admin/skills", label: "Manage Tech Stack", icon: Terminal },
    { id: "profile", href: "/admin/profile", label: "Profile Editor", icon: UserCircle }
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      showNotification("Logged out successfully", true)
      router.push("/login")
      router.refresh()
    } catch (error) {
      showNotification("Failed to logout", false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col md:flex-row transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-6 left-1/2 z-50 px-6 py-3 border-3 border-primary rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)] font-mono text-sm font-bold flex items-center gap-2 ${
              isSuccess ? "bg-secondary text-primary" : "bg-error text-white"
            }`}
          >
            {isSuccess ? <ShieldCheck size={16} /> : <X size={16} />}
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE HEADER & NAV */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-surface border-b-3 border-primary relative z-30">
        <div className="font-mono font-bold tracking-wider text-base text-primary">
          {profile?.name.split(" ")[1].toUpperCase() ?? "Admin"}//DASHBOARD
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="neo-btn p-1.5 bg-white dark:bg-surface text-primary"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="neo-btn p-1.5 bg-white dark:bg-surface text-primary"
            aria-label="Toggle menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-[57px] left-0 right-0 bg-surface border-b-3 border-primary p-6 z-20 flex flex-col gap-3 font-mono font-bold"
          >
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 border-2 border-primary rounded-sm transition-all text-sm uppercase ${
                    isActive
                      ? "bg-secondary text-primary shadow-[2px_2px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white dark:bg-surface text-primary"
                  }`}
                >
                  <IconComp size={16} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
            <Link
              href="/"
              className="flex items-center gap-3 p-3 border-2 border-primary rounded-sm bg-primary text-white dark:text-tertiary text-sm uppercase justify-center mt-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <span>View Main Website &rarr;</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-72 bg-surface border-r-3 border-primary p-6 shrink-0 sticky top-0 h-screen z-10 overflow-y-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="font-mono font-bold tracking-wider text-lg text-primary hover:text-secondary transition-colors block"
          >
            {profile?.name?.split(" ")[1].toUpperCase()}//DASHBOARD
          </Link>
          <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-muted tracking-widest uppercase">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border border-primary" />
            <span>//SYSTEM ONLINE</span>
          </div>
        </div>

        {/* Tab Links */}
        <nav className="flex-1 flex flex-col gap-4">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`neo-btn w-full px-4 py-3.5 flex items-center gap-3.5 font-mono text-sm font-bold tracking-wide transition-all uppercase justify-start ${
                  isActive
                    ? "bg-secondary text-primary translate-x-[-1.5px] translate-y-[-1.5px] shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    : "bg-white dark:bg-surface text-primary hover:bg-secondary/15 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <IconComp size={18} className="stroke-[2.2]" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t-2 border-primary/15 pt-6 flex flex-col gap-4">
          {/* Quick Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary border-2 border-primary rounded-sm flex items-center justify-center font-mono font-extrabold text-sm text-primary shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              AC
            </div>
            <div>
              <div className="font-mono text-xs font-bold uppercase text-primary leading-tight">
                {profile?.name ?? "Admin"}
              </div>
              <div className="font-mono text-[9px] text-muted tracking-wide mt-0.5">
                {profile?.role ? profile.role.split(" ")[0] : "ADMIN"} ADMIN
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="neo-btn px-3 py-2 text-xs font-mono font-bold uppercase flex items-center gap-2 bg-white dark:bg-surface text-primary shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)]"
            >
              {theme === "light" ? (
                <>
                  <Moon size={12} className="fill-current" />
                  <span>DARK MODE</span>
                </>
              ) : (
                <>
                  <Sun size={12} />
                  <span>LIGHT MODE</span>
                </>
              )}
            </button>
            <Button
              onClick={handleLogout}
              className="neo-btn p-2 bg-primary text-secondary dark:text-tertiary flex items-center justify-center shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)]"
              title="Logout / Exit"
            >
              <Power size={14} className="stroke-[2.5]" />
            </Button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 md:p-10 relative overflow-x-hidden">
        {/* Dot pattern background */}
        <div className="absolute inset-0 neo-dot-pattern pointer-events-none opacity-[0.06]" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Active View Title */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-secondary font-mono font-bold text-xs uppercase tracking-widest block mb-2">
                ADMIN PANEL CONTROL
              </span>
              <h1 className="heading-lg text-primary uppercase font-display leading-none">
                {pathname === "/admin/dashboard" && "Overview statistics"}
                {pathname === "/admin/projects" && "Portfolio Projects"}
                {pathname === "/admin/skills" && "Skill Inventory"}
                {pathname === "/admin/profile" && "Profile settings"}
              </h1>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="inline-block bg-primary text-secondary dark:text-tertiary border-2 border-primary font-bold px-2.5 py-1 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
                STATUS: ROOT_OK
              </span>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AdminProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminProvider>
    </QueryProvider>
  );
}
