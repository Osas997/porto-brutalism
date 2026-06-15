"use client";

import { useState } from "react";
import { Plus, Trash2, X, Loader2, ImagePlus, Edit } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAdmin } from "../AdminContext";
import { Card } from "@/components/ui/Card";
import { useProjects, useCreateProject, useDeleteProject, useUpdateProject } from "@/lib/queries/projects";
import { uploadFile } from "@/lib/queries/api";

export default function AdminProjects() {
  const { showNotification } = useAdmin();
  const { data: projects = [], isLoading } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const updateProject = useUpdateProject();

  // Project Form State
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjCategory, setNewProjCategory] = useState("Backend");
  const [newProjTech, setNewProjTech] = useState("");
  const [newProjFeatures, setNewProjFeatures] = useState<string[]>([]);
  const [galleryItems, setGalleryItems] = useState<{ id: string; file?: File; url?: string; previewUrl: string }[]>([]);
  const [newProjGithubUrl, setNewProjGithubUrl] = useState("");
  const [newProjLiveUrl, setNewProjLiveUrl] = useState("");

  const [featureInput, setFeatureInput] = useState("");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureInput.trim()) return;
    setNewProjFeatures([...newProjFeatures, featureInput.trim()]);
    setFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    setNewProjFeatures(newProjFeatures.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 3 - galleryItems.length;
    if (remainingSlots <= 0) {
      showNotification("Maximum 3 gallery images allowed", false);
      return;
    }

    const newFiles = Array.from(files).slice(0, remainingSlots);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewUrl = event.target?.result as string;
        setGalleryItems((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            file,
            previewUrl,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryItems((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setNewProjTitle("");
    setNewProjDesc("");
    setNewProjTech("");
    setNewProjFeatures([]);
    setGalleryItems([]);
    setNewProjGithubUrl("");
    setNewProjLiveUrl("");
    setIsAddingProject(false);
    setEditingProject(null);
  };

  const handleEditClick = (project: any) => {
    setEditingProject(project);
    setNewProjTitle(project.title);
    setNewProjDesc(project.description);
    setNewProjCategory(project.category);
    setNewProjTech(project.techStack.join(", "));
    setNewProjFeatures(project.features || []);
    setGalleryItems(
      (project.gallery || []).map((imgUrl: string) => ({
        id: Math.random().toString(36).substring(2, 9),
        url: imgUrl,
        previewUrl: imgUrl,
      }))
    );
    setNewProjGithubUrl(project.githubUrl || "");
    setNewProjLiveUrl(project.liveUrl || "");
    setIsAddingProject(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) {
      showNotification("Project Title is required", false);
      return;
    }
    if (!newProjDesc.trim()) {
      showNotification("Description is required", false);
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload files
      const finalGallery: string[] = [];
      for (const item of galleryItems) {
        if (item.file) {
          const url = await uploadFile(item.file, "projects");
          finalGallery.push(url);
        } else if (item.url) {
          finalGallery.push(item.url);
        }
      }

      const techArray = newProjTech
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const payload = {
        title: newProjTitle.toUpperCase(),
        description: newProjDesc,
        techStack: techArray,
        category: newProjCategory,
        features: newProjFeatures,
        gallery: finalGallery,
        imageUrl: finalGallery[0] || `/projects/project-1.svg`,
        githubUrl: newProjGithubUrl.trim() || undefined,
        liveUrl: newProjLiveUrl.trim() || undefined,
      };

      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          payload,
        });
        showNotification("Project updated successfully!");
      } else {
        await createProject.mutateAsync(payload);
        showNotification("New project added to portfolio!");
      }

      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save project";
      showNotification(msg, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
      showNotification("Project deleted successfully");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete project";
      showNotification(msg, false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-secondary" />
        <span className="ml-3 font-mono text-sm text-muted uppercase">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with actions */}
      <div className="flex justify-between items-center bg-surface border-3 border-primary p-4 rounded-sm shadow-[3px_3px_0px_rgba(0,0,0,1)]">
        <span className="font-mono font-bold text-xs uppercase tracking-wider text-primary">
          {projects.length} PROJECTS REGISTERED IN PORTFOLIO
        </span>
        <button
          onClick={() => {
            if (isAddingProject) {
              resetForm();
            } else {
              setIsAddingProject(true);
            }
          }}
          className="neo-btn bg-secondary text-primary px-3 py-1.5 text-xs font-mono font-bold uppercase inline-flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          {isAddingProject ? <X size={14} /> : <Plus size={14} />}
          <span>{isAddingProject ? "Cancel" : "Add New"}</span>
        </button>
      </div>

      {/* Add/Edit Project Form Drawer */}
      <AnimatePresence>
        {isAddingProject && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddProject} className="bg-surface border-3 border-primary p-6 rounded-sm space-y-4 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-secondary">
                {editingProject ? `EDIT PORTFOLIO PROJECT: ${editingProject.title}` : "REGISTER NEW PORTFOLIO PROJECT"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono font-bold text-xs uppercase text-primary">Project Title</label>
                  <input
                    type="text"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="e.g. DATASTREAM"
                    className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono font-bold text-xs uppercase text-primary">Category</label>
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5"
                  >
                    <option>Backend</option>
                    <option>Full Stack</option>
                    <option>DevOps</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono font-bold text-xs uppercase text-primary">Short Description</label>
                <textarea
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="Short summary of project features and capabilities..."
                  rows={2}
                  className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono font-bold text-xs uppercase text-primary">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={newProjTech}
                  onChange={(e) => setNewProjTech(e.target.value)}
                  placeholder="e.g. Rust, Docker, gRPC"
                  className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono font-bold text-xs uppercase text-primary">GitHub Link (Optional)</label>
                  <input
                    type="url"
                    value={newProjGithubUrl}
                    onChange={(e) => setNewProjGithubUrl(e.target.value)}
                    placeholder="e.g. https://github.com/username/project"
                    className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono font-bold text-xs uppercase text-primary">Live Preview Link (Optional)</label>
                  <input
                    type="url"
                    value={newProjLiveUrl}
                    onChange={(e) => setNewProjLiveUrl(e.target.value)}
                    placeholder="e.g. https://project.example.com"
                    className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              {/* Key Features & Gallery Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-primary/10 pt-4">
                {/* Features */}
                <div className="flex flex-col gap-2.5">
                  <label className="font-mono font-bold text-xs uppercase text-primary">Key Features</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="e.g. In-memory indexing"
                      className="flex-1 font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddFeature(e);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="neo-btn bg-secondary text-primary px-3 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-secondary/80"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-1">
                    {newProjFeatures.map((feat, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border-2 border-primary bg-white dark:bg-surface rounded-sm text-xs font-mono">
                        <span className="truncate pr-2">{feat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-muted hover:text-error font-bold focus:outline-none"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {newProjFeatures.length === 0 && (
                      <span className="font-mono text-[10px] text-muted italic">No features added yet.</span>
                    )}
                  </div>
                </div>

                {/* Gallery */}
                <div className="flex flex-col gap-2.5">
                  <label className="font-mono font-bold text-xs uppercase text-primary">
                    Gallery Images (Max 3)
                  </label>
                  {galleryItems.length < 3 ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        id="gallery-upload"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="gallery-upload"
                        className="neo-btn bg-secondary text-primary px-4 py-2.5 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-secondary/80 cursor-pointer text-center block inline-flex items-center justify-center gap-2"
                      >
                        <ImagePlus size={14} />
                        Choose Images ({3 - galleryItems.length} remaining)
                      </label>
                      <span className="font-mono text-[9px] text-muted italic">
                        Supports JPEG, PNG, WebP — max 5MB each
                      </span>
                    </div>
                  ) : (
                    <div className="text-[10px] font-mono text-muted uppercase italic bg-secondary/10 border-2 border-dashed border-primary/20 p-2.5 rounded-sm text-center">
                      Limit of 3 images reached
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {galleryItems.map((item, index) => (
                      <div key={item.id} className="relative border-2 border-primary bg-white dark:bg-surface rounded-sm p-1 flex flex-col items-center shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                        <div className="w-full h-12 bg-muted rounded-sm overflow-hidden mb-1 flex items-center justify-center">
                          <img src={item.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-mono text-[8px] text-muted truncate w-full text-center px-1">
                          {item.file?.name ?? "Existing Image"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="absolute -top-1.5 -right-1.5 bg-error border border-primary text-white rounded-full p-0.5 hover:bg-error/80 focus:outline-none"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    {galleryItems.length === 0 && (
                      <div className="col-span-3 font-mono text-[10px] text-muted italic">No images added yet.</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="neo-btn bg-primary text-secondary dark:text-tertiary px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  {isSubmitting ? "UPLOADING & SAVING..." : editingProject ? "SAVE CHANGES TO REGISTRY" : "SUBMIT PROJECT TO REGISTRY"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} hover={false} className="flex flex-col p-6 bg-surface">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[9px] bg-white dark:bg-surface border-2 border-primary px-1.5 py-0.5 rounded-sm shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] uppercase text-secondary font-bold">
                  {project.category}
                </span>
                <h3 className="heading-sm text-primary font-bold uppercase mt-2.5">
                  {project.title}
                </h3>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(project)}
                  className="neo-btn p-1.5 bg-secondary text-primary shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:bg-secondary/85 active:translate-y-0.5"
                  title="Edit Project"
                >
                  <Edit size={13} />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={deleteProject.isPending}
                  className="neo-btn p-1.5 bg-error text-white shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:bg-error/85 active:translate-y-0.5 disabled:opacity-60"
                  title="Delete Project"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <p className="font-mono text-xs text-muted leading-relaxed my-4 flex-1">
              {project.description}
            </p>

            {/* Render Key Features in Card */}
            {project.features && project.features.length > 0 && (
              <div className="border-t border-primary/10 pt-3.5 mt-3.5 mb-2">
                <span className="font-mono text-[9px] text-muted uppercase tracking-wider block mb-2">
                  Key Features
                </span>
                <ul className="list-disc list-inside font-mono text-[10px] text-primary space-y-1.5">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="truncate" title={feat}>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Render Gallery Images in Card */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="border-t border-primary/10 pt-3.5 mt-2.5">
                <span className="font-mono text-[9px] text-muted uppercase tracking-wider block mb-2">
                  Gallery ({project.gallery.length})
                </span>
                <div className="flex gap-2">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-14 h-10 border-2 border-primary rounded-sm overflow-hidden bg-muted shadow-[1px_1px_0px_rgba(0,0,0,1)] relative"
                    >
                      <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 border-t border-primary/10 pt-4 mt-auto">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] font-bold px-1.5 py-0.5 border border-primary bg-white dark:bg-surface rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
