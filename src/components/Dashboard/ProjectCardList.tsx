import { useDashboardStore } from '@/store/useDashboardStore';
import { ProjectCard } from '@/components/common/ProjectCard';
import { ChartCard } from '@/components/common/ChartCard';
import { FolderKanban } from 'lucide-react';

export function ProjectCardList() {
  const getProjects = useDashboardStore((state) => state.getProjects);
  const openProjectDetail = useDashboardStore((state) => state.openProjectDetail);
  const projects = getProjects();

  const lowOutputCount = projects.filter((p) => p.lowOutput).length;

  return (
    <ChartCard
      title="在研课题列表"
      subtitle={`共 ${projects.length} 项课题，${lowOutputCount} 项低产出课题需关注`}
      icon={<FolderKanban className="w-4 h-4" />}
      className="h-full"
    >
      <div className="grid grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => openProjectDetail(project)}
          />
        ))}
      </div>
    </ChartCard>
  );
}
