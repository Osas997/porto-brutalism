"use client";

import { useState, useCallback } from "react";
import { Mail, Copy, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig, socialLinks } from "@/lib/data";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  github: <GithubIcon />,
  linkedin: <LinkedinIcon />,
  twitter: <TwitterIcon />,
};

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = siteConfig.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${siteConfig.email}?subject=Hello from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
  };

  return (
    <section id="contact" className="py-20 md:py-32 section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading subtitle="Let's build something great together.">
            Get In Touch
          </SectionHeading>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left - Contact Info */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              {/* Email Card */}
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-secondary neo-border rounded-sm">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <h3 className="heading-sm text-primary">Email</h3>
                </div>
                <div className="flex items-center gap-3">
                  <p className="body-md text-on-surface font-mono">
                    {siteConfig.email}
                  </p>
                  <button
                    onClick={copyEmail}
                    className="neo-btn p-2 bg-surface text-primary hover:bg-secondary hover:text-primary"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="body-sm text-secondary mt-2 font-medium">
                    ✓ Copied to clipboard!
                  </p>
                )}
              </Card>

              {/* Social Links */}
              <Card>
                <h3 className="heading-sm text-primary mb-4">
                  Find me online
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn inline-flex items-center gap-2 px-4 py-2 bg-surface text-on-surface hover:bg-secondary hover:text-primary cursor-pointer"
                      aria-label={`Visit ${link.name} profile`}
                    >
                      {socialIcons[link.icon]}
                      <span className="label">{link.name}</span>
                    </a>
                  ))}
                </div>
              </Card>

              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full neo-border animate-pulse" />
                <p className="label text-muted">
                  Currently available for new projects
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Contact Form */}
          <ScrollReveal direction="right">
            <Card className="!p-6 md:!p-8">
              <h3 className="heading-sm text-primary mb-6">
                Send a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="label text-on-surface block mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full neo-border rounded-sm px-4 py-3 bg-bg text-on-surface font-mono text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="label text-on-surface block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full neo-border rounded-sm px-4 py-3 bg-bg text-on-surface font-mono text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="label text-on-surface block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={5}
                    className="w-full neo-border rounded-sm px-4 py-3 bg-bg text-on-surface font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </Button>
              </form>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
