"use client";

import { useState } from "react";
import { Loader2, Edit, X } from "lucide-react";
import { useAdmin } from "../AdminContext";
import { Card } from "@/components/ui/Card";
import { useSkills, useCreateSkill, useDeleteSkill, useUpdateSkill } from "@/lib/queries/skills";

export default function AdminSkills() {
  const { showNotification } = useAdmin();
  const { data: skills = [], isLoading } = useSkills();
  const createSkill = useCreateSkill();
  const deleteSkill = useDeleteSkill();
  const updateSkill = useUpdateSkill();

  // Skill Form State
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCat, setNewSkillCat] = useState<"frontend" | "backend" | "tools" | "other">("backend");
  const [editingSkill, setEditingSkill] = useState<any | null>(null);

  const resetForm = () => {
    setNewSkillName("");
    setNewSkillCat("backend");
    setEditingSkill(null);
  };

  const handleEditSkillClick = (skill: any) => {
    setEditingSkill(skill);
    setNewSkillName(skill.name);
    setNewSkillCat(skill.category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) {
      showNotification("Skill name cannot be empty", false);
      return;
    }

    try {
      if (editingSkill) {
        await updateSkill.mutateAsync({
          id: editingSkill.id,
          payload: {
            name: newSkillName.trim(),
            category: newSkillCat,
          },
        });
        showNotification(`Updated ${newSkillName.trim()} in tech stack!`);
      } else {
        await createSkill.mutateAsync({
          name: newSkillName.trim(),
          category: newSkillCat,
        });
        showNotification(`Added ${newSkillName.trim()} to tech stack!`);
      }
      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save skill";
      showNotification(msg, false);
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    try {
      await deleteSkill.mutateAsync(id);
      showNotification(`${name} removed from tech stack`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete skill";
      showNotification(msg, false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-secondary" />
        <span className="ml-3 font-mono text-sm text-muted uppercase">Loading skills...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: List */}
      <div className="lg:col-span-8 space-y-6">
        {(["backend", "frontend", "tools", "other"] as const).map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          return (
            <Card key={cat} hover={false} className="p-6 bg-surface">
              <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-secondary border-b-2 border-primary/10 pb-2.5 mb-4">
                {cat.toUpperCase()} INVENTORY
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {catSkills.length > 0 ? (
                  catSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-primary bg-white dark:bg-surface text-primary shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] inline-flex items-center gap-2 rounded-sm"
                    >
                      <span>{skill.name}</span>
                      <div className="inline-flex items-center gap-1.5 ml-1.5">
                        <button
                          onClick={() => handleEditSkillClick(skill)}
                          className="text-muted hover:text-secondary transition-colors focus:outline-none cursor-pointer"
                          title="Edit skill"
                        >
                          <Edit size={10} />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id, skill.name)}
                          disabled={deleteSkill.isPending}
                          className="text-muted hover:text-error transition-colors focus:outline-none cursor-pointer text-sm font-bold disabled:opacity-50"
                          title="Remove skill"
                        >
                          &times;
                        </button>
                      </div>
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-xs text-muted italic">No registered skills.</span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Right Column: Add/Edit Form */}
      <div className="lg:col-span-4">
        <div className="sticky top-6">
          <div className="absolute inset-0 bg-primary border-3 border-primary rounded-lg translate-x-2 translate-y-2 pointer-events-none" />
          <form onSubmit={handleAddSkill} className="relative bg-white dark:bg-surface border-3 border-primary p-6 rounded-lg space-y-4">
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-secondary">
              {editingSkill ? `EDIT SKILL: ${editingSkill.name}` : "REGISTER NEW SKILL"}
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono font-bold text-xs uppercase text-primary">Skill Name</label>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. GraphQL, Elixir"
                className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono font-bold text-xs uppercase text-primary">Category</label>
              <select
                value={newSkillCat}
                onChange={(e) => setNewSkillCat(e.target.value as any)}
                className="font-mono text-xs p-2.5 border-2 border-primary bg-white dark:bg-surface text-primary rounded-sm outline-none focus:bg-secondary/5"
              >
                <option value="backend">Backend</option>
                <option value="frontend">Frontend</option>
                <option value="tools">Tools</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={createSkill.isPending || updateSkill.isPending}
              className="w-full neo-btn bg-secondary text-primary py-2.5 text-xs font-mono font-bold uppercase tracking-wider shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] mt-2 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {(createSkill.isPending || updateSkill.isPending) && <Loader2 size={14} className="animate-spin" />}
              {createSkill.isPending || updateSkill.isPending ? "SAVING..." : editingSkill ? "SAVE CHANGES" : "ADD SKILL TO INVENTORY"}
            </button>

            {editingSkill && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full neo-btn bg-white dark:bg-surface text-primary py-2.5 text-xs font-mono font-bold uppercase tracking-wider shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] mt-2 inline-flex items-center justify-center gap-2 border-2 border-primary"
              >
                <X size={14} />
                <span>CANCEL EDIT</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
