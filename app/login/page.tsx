"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Key, Lock, Eye, EyeOff, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);

    const { error: signInError } = await authClient.signIn.username({
      username,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError("Invalid username or password.");
      return;
    }

    setSuccess(true);
    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-background text-primary relative flex items-center justify-center p-6 transition-colors duration-300">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 neo-dot-pattern pointer-events-none" />

      {/* Floating Header Actions */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <Link
          href="/"
          className="neo-btn bg-white dark:bg-surface text-primary px-4 py-2 font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:bg-secondary dark:hover:text-primary transition-all duration-200 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="neo-btn p-2 bg-white dark:bg-surface text-primary hover:text-secondary flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)]"
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
                <Moon size={16} className="fill-current" />
              ) : (
                <Sun size={16} />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Login Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Decorative Offset Brutalist Accent Box */}
        <div className="absolute inset-0 bg-secondary border-3 border-primary rounded-lg translate-x-3 translate-y-3 pointer-events-none" />

        {/* Main Card */}
        <div className="relative bg-white dark:bg-surface border-3 border-primary rounded-lg p-8 shadow-none transition-colors duration-300">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-secondary text-primary border-3 border-primary flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[-3deg]">
              <Key size={24} className="stroke-[2.5]" />
            </div>
            <h1 className="font-display font-bold text-2xl text-primary tracking-tight uppercase">
              ADMIN CONTROL
            </h1>
            <p className="font-mono text-muted text-xs uppercase tracking-widest mt-1">
              Restricted Area Access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Notifications */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-error/10 border-2 border-error text-error text-xs font-mono p-3 rounded-sm flex items-center gap-2"
                >
                  <ShieldAlert size={16} className="shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-500/10 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 text-xs font-mono p-3 rounded-sm flex items-center gap-2"
                >
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>Access Granted! Redirecting...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="font-mono font-bold text-xs uppercase tracking-wider text-primary flex justify-between"
              >
                <span>Username</span>
                <span className="text-muted text-[10px]">REQUIRED</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading || success}
                placeholder="e.g. admin"
                className={`font-mono text-sm px-4 py-3 bg-white dark:bg-surface text-primary border-3 border-primary rounded-sm outline-none transition-all duration-150 focus:bg-secondary/10 focus:shadow-[3px_3px_0px_rgba(0,0,0,1)] ${
                  error && !username ? "border-error focus:bg-error/5" : ""
                }`}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-mono font-bold text-xs uppercase tracking-wider text-primary flex justify-between"
              >
                <span>Password</span>
                <span className="text-muted text-[10px]">SECURED</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || success}
                  placeholder="••••••••"
                  className={`w-full font-mono text-sm pl-4 pr-12 py-3 bg-white dark:bg-surface text-primary border-3 border-primary rounded-sm outline-none transition-all duration-150 focus:bg-secondary/10 focus:shadow-[3px_3px_0px_rgba(0,0,0,1)] ${
                    error && !password ? "border-error focus:bg-error/5" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || success}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className={`w-full neo-btn py-3.5 bg-primary text-secondary font-mono font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 border-3 border-primary shadow-[3px_3px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                  <span>AUTHORIZING...</span>
                </span>
              ) : success ? (
                <span>GRANTED</span>
              ) : (
                <>
                  <Lock size={16} className="stroke-[2.5]" />
                  <span>ENTER CONTROL ROOM</span>
                </>
              )}
            </button>
          </form>

          {/* Hint Card */}
          <div className="mt-8 border-t-2 border-primary/10 pt-6 text-center">
            <span className="inline-block bg-white dark:bg-surface text-primary border-2 border-primary font-mono text-[10px] font-bold px-2 py-1 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              REGISTRATION DISABLED • USE SEEDED ADMIN USER
            </span>
          </div>

        </div>
      </div>
    </main>
  );
}
