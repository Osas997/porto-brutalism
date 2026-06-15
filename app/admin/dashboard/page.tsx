"use client";

import { Card } from "@/components/ui/Card";
import { useProjects } from "@/lib/queries/projects";
import { useSkills } from "@/lib/queries/skills";
import { Loader2 } from "lucide-react";

export default function AdminDashboardOverview() {
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const { data: skills, isLoading: loadingSkills } = useSkills();

  const isLoading = loadingProjects || loadingSkills;

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "TOTAL PROJECTS", value: isLoading ? "—" : (projects?.length ?? 0), change: "Active in grid" },
          { label: "SKILLS INVENTORY", value: isLoading ? "—" : (skills?.length ?? 0), change: "Grouped by layer" },
          { label: "SYSTEM LATENCY", value: "0.8ms", change: "Redis Pool health: OK" },
          { label: "VISITOR SESSIONS", value: "3,892", change: "+14.8% this week" }
        ].map((stat) => (
          <Card key={stat.label} hover={true} className="flex flex-col justify-between p-5 bg-surface min-h-[120px]">
            <div>
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <span className="font-mono text-3xl font-extrabold text-primary block leading-none my-1">
                {isLoading && (stat.label === "TOTAL PROJECTS" || stat.label === "SKILLS INVENTORY") ? (
                  <Loader2 size={24} className="animate-spin text-muted" />
                ) : (
                  stat.value
                )}
              </span>
            </div>
            <span className="font-mono text-[9px] text-secondary font-bold uppercase mt-3 block">
              {stat.change}
            </span>
          </Card>
        ))}
      </div>

      {/* Event Logs Container */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary border-3 border-primary rounded-lg translate-x-2.5 translate-y-2.5 pointer-events-none" />
        <div className="relative bg-white dark:bg-surface border-3 border-primary rounded-lg p-6">
          <h3 className="font-mono font-bold text-sm text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary border border-primary" />
            <span>SYSTEM OPERATIONS LOGS</span>
          </h3>
          
          <div className="font-mono text-xs text-primary space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
            {[
              { time: "15:34:11", event: "Admin dashboard overrides generated via /ui-ux-pro-max", type: "system" },
              { time: "15:15:44", event: "Mock user authentication verified successfully on /login", type: "auth" },
              { time: "15:13:31", event: "Admin portal component files deployed successfully", type: "deploy" },
              { time: "15:03:59", event: "Production static compilation succeeded with Next.js Turbopack", type: "build" },
              { time: "14:55:03", event: "Horizontal pod auto-scaling verification triggers matched", type: "monitor" }
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-4 p-2 border-b border-primary/10 last:border-0 hover:bg-secondary/5 transition-colors">
                <span className="text-muted font-bold shrink-0">[{log.time}]</span>
                <span className="text-primary font-semibold flex-1">{log.event}</span>
                <span className="text-[10px] bg-white dark:bg-surface border-2 border-primary px-1.5 py-0.5 rounded-sm shadow-[1px_1px_0px_rgba(0,0,0,1)] uppercase text-secondary font-bold">
                  {log.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
