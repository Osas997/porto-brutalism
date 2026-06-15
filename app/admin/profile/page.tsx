"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Plus, Trash2, ImagePlus } from "lucide-react";
import { useAdmin } from "../AdminContext";
import { useProfile, useUpdateProfile, type ProfileData } from "@/lib/queries/profile";
import { uploadFile } from "@/lib/queries/api";
import { sortByDurationDesc } from "@/lib/utils";

export default function AdminProfile() {
  const { showNotification } = useAdmin();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  // Local form state
  const [form, setForm] = useState({
    name: "",
    role: "",
    tagline: "",
    bio: "",
    aboutBio: "",
    email: "",
    location: "",
    avatarUrl: "",
    githubUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    experience: [] as { id: string; company: string; role: string; duration: string; description: string }[],
    education: [] as { id: string; institution: string; degree: string; duration: string; description?: string }[],
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  // Sync profile data into form when loaded
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        role: profile.role || "",
        tagline: profile.tagline || "",
        bio: profile.bio || "",
        aboutBio: profile.aboutBio || "",
        email: profile.email || "",
        location: profile.location || "",
        avatarUrl: profile.avatarUrl || "",
        githubUrl: profile.githubUrl || "",
        instagramUrl: profile.instagramUrl || "",
        linkedinUrl: profile.linkedinUrl || "",
        experience: sortByDurationDesc(profile.experience || []),
        education: sortByDurationDesc(profile.education || []),
      });
      setAvatarPreview(profile.avatarUrl || "");
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification("Image exceeds 5MB size limit", false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    setAvatarFile(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
    setForm((prev) => ({ ...prev, avatarUrl: "" }));
  };

  const randomId = () => typeof window !== "undefined" && window.crypto?.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).substring(2, 11);

  const addExperience = () => {
    setForm((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: randomId(),
          company: "",
          role: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (id: string, key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [key]: value } : exp)),
    }));
  };

  const removeExperience = (id: string) => {
    setForm((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    setForm((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: randomId(),
          institution: "",
          degree: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const updateEducation = (id: string, key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [key]: value } : edu)),
    }));
  };

  const removeEducation = (id: string) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let finalAvatarUrl = form.avatarUrl;

      // Upload file if new one is selected
      if (avatarFile) {
        finalAvatarUrl = await uploadFile(avatarFile, "profile");
      }

      await updateProfile.mutateAsync({
        ...form,
        avatarUrl: finalAvatarUrl,
      });

      setAvatarFile(null);
      showNotification("Profile settings updated successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update profile";
      showNotification(msg, false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-secondary" />
        <span className="ml-3 font-mono text-sm text-muted uppercase">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary border-3 border-primary rounded-lg translate-x-2.5 translate-y-2.5 pointer-events-none" />
      <form onSubmit={handleSaveProfile} className="relative bg-white dark:bg-surface border-3 border-primary rounded-lg p-6 md:p-8 space-y-6">

        {/* Profile Avatar Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b-2 border-primary/10 pb-6">
          <div className="relative w-24 h-24 rounded-full border-3 border-primary overflow-hidden bg-muted flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="font-mono text-2xl font-bold text-secondary">&gt;_</span>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="font-mono font-bold text-xs uppercase text-primary block">
              Profile Avatar Image
            </label>
            <div className="flex flex-wrap gap-3">
              <input
                type="file"
                accept="image/*"
                id="avatar-upload"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <label
                htmlFor="avatar-upload"
                className="neo-btn bg-secondary text-primary px-3 py-1.5 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-secondary/80 cursor-pointer inline-flex items-center gap-1.5 border-2 border-primary"
              >
                <ImagePlus size={12} />
                <span>Upload New Photo</span>
              </label>

              {avatarPreview && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="neo-btn bg-white dark:bg-surface text-error px-3 py-1.5 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-error/10 cursor-pointer border-2 border-primary"
                >
                  Remove Photo
                </button>
              )}
            </div>
            <span className="font-mono text-[9px] text-muted italic">
              Supports JPEG, PNG, WebP — max 5MB
            </span>
          </div>
        </div>

        <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-secondary border-b-2 border-primary/10 pb-2.5">
          CORE BIOGRAPHY SETTINGS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono font-bold text-xs uppercase text-primary">Display Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono font-bold text-xs uppercase text-primary">Professional Role</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono font-bold text-xs uppercase text-primary">Tagline</label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono font-bold text-xs uppercase text-primary">Bio Summary</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={3}
            className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono font-bold text-xs uppercase text-primary">About Bio (Extended)</label>
          <textarea
            value={form.aboutBio}
            onChange={(e) => setForm({ ...form, aboutBio: e.target.value })}
            rows={4}
            className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono font-bold text-xs uppercase text-primary">Email Contact</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono font-bold text-xs uppercase text-primary">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-secondary border-b-2 border-primary/10 pb-2.5 pt-4">
          SOCIAL MEDIA LINKS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono font-bold text-xs uppercase text-primary">GitHub Profile Link</label>
            <input
              type="url"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              placeholder="e.g. https://github.com/username"
              className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono font-bold text-xs uppercase text-primary">Instagram Profile Link</label>
            <input
              type="url"
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              placeholder="e.g. https://instagram.com/username"
              className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono font-bold text-xs uppercase text-primary">LinkedIn Profile Link</label>
            <input
              type="url"
              value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              placeholder="e.g. https://linkedin.com/in/username"
              className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-4 pt-6 border-t-2 border-primary/10">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-secondary">
              PROFESSIONAL EXPERIENCE HISTORY
            </h3>
            <button
              type="button"
              onClick={addExperience}
              className="neo-btn bg-secondary text-primary px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-primary inline-flex items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-150 cursor-pointer"
            >
              <Plus size={12} />
              <span>Add Experience</span>
            </button>
          </div>

          <div className="space-y-4">
            {form.experience.length === 0 ? (
              <div className="font-mono text-xs text-muted italic p-6 border-2 border-dashed border-primary/20 rounded-sm text-center">
                No experience entries listed. Click "Add Experience" to add one.
              </div>
            ) : (
              form.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className="relative bg-white dark:bg-surface border-2 border-primary rounded-sm p-4 space-y-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="font-mono font-bold text-xs uppercase text-primary">
                      ENTRY #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="font-mono text-[10px] font-bold text-error uppercase border-2 border-primary bg-white dark:bg-surface px-2 py-0.5 shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:bg-error hover:text-white transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                    >
                      <Trash2 size={10} />
                      <span>REMOVE</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono font-bold text-[10px] uppercase text-primary">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        className="font-mono text-xs p-2 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                        placeholder="e.g. TechCorp Inc."
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono font-bold text-[10px] uppercase text-primary">Role / Position</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                        className="font-mono text-xs p-2 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                        placeholder="e.g. Senior Backend Engineer"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono font-bold text-[10px] uppercase text-primary">Duration</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                      className="font-mono text-xs p-2 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                      placeholder="e.g. 2023 — Present or Jan 2021 — Dec 2022"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono font-bold text-[10px] uppercase text-primary">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      rows={3}
                      className="font-mono text-xs p-2 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                      placeholder="Describe your role, responsibilities, and key achievements..."
                      required
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4 pt-6 border-t-2 border-primary/10">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-secondary">
              EDUCATION BACKGROUND
            </h3>
            <button
              type="button"
              onClick={addEducation}
              className="neo-btn bg-secondary text-primary px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-primary inline-flex items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-150 cursor-pointer"
            >
              <Plus size={12} />
              <span>Add Education</span>
            </button>
          </div>

          <div className="space-y-4">
            {form.education.length === 0 ? (
              <div className="font-mono text-xs text-muted italic p-6 border-2 border-dashed border-primary/20 rounded-sm text-center">
                No education entries listed. Click "Add Education" to add one.
              </div>
            ) : (
              form.education.map((edu, index) => (
                <div
                  key={edu.id}
                  className="relative bg-white dark:bg-surface border-2 border-primary rounded-sm p-4 space-y-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="font-mono font-bold text-xs uppercase text-primary">
                      ENTRY #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="font-mono text-[10px] font-bold text-error uppercase border-2 border-primary bg-white dark:bg-surface px-2 py-0.5 shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:bg-error hover:text-white transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                    >
                      <Trash2 size={10} />
                      <span>REMOVE</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono font-bold text-[10px] uppercase text-primary">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        className="font-mono text-xs p-2 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                        placeholder="e.g. University of Technology"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono font-bold text-[10px] uppercase text-primary">Degree / Certification</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        className="font-mono text-xs p-2 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                        placeholder="e.g. B.Sc. Computer Science"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono font-bold text-[10px] uppercase text-primary">Duration</label>
                    <input
                      type="text"
                      value={edu.duration}
                      onChange={(e) => updateEducation(edu.id, "duration", e.target.value)}
                      className="font-mono text-xs p-2 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                      placeholder="e.g. 2016 — 2020"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono font-bold text-[10px] uppercase text-primary">Description (Optional)</label>
                    <textarea
                      value={edu.description || ""}
                      onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                      rows={2}
                      className="font-mono text-xs p-2 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                      placeholder="e.g. Focus on distributed systems, GPA 3.8, etc."
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={updateProfile.isPending}
          className="neo-btn bg-primary text-secondary dark:text-tertiary px-5 py-3 text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-150 cursor-pointer"
        >
          {updateProfile.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{updateProfile.isPending ? "SAVING..." : "COMMIT CHANGES TO SYSTEM"}</span>
        </button>
      </form>
    </div>
  );
}
