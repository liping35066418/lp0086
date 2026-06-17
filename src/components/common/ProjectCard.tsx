import { Users, Clock, FileText, AlertTriangle } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isLowOutput = project.lowOutput;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isLowOutput
          ? 'bg-gradient-to-br from-amber-900/40 to-amber-800/20 border border-amber-500/40 hover:border-amber-400/60 hover:shadow-amber-500/20'
          : 'bg-gradient-to-br from-slate-900/90 to-slate-800/80 border border-slate-600/30 hover:border-cyan-400/40 hover:shadow-cyan-500/10'
      }`}
    >
      {isLowOutput && (
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-2 right-2 flex items-center gap-1 text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded text-xs font-medium">
            <AlertTriangle className="w-3 h-3" />
            低产出
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-100 line-clamp-2 flex-1 pr-2">
            {project.name}
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>{project.leader}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{project.outputCount} 项产出</span>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400">项目进度</span>
            <span className="text-cyan-400 font-medium">{project.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isLowOutput
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400">
            {project.labName}
          </span>
          <span className="text-xs text-slate-500">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
}
