import { X, Calendar, User, FileText, Clock, Activity } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import type { ExperimentRecord } from '@/types';

export function ProjectDetailModal() {
  const isOpen = useDashboardStore((state) => state.isModalOpen);
  const project = useDashboardStore((state) => state.selectedProject);
  const closeProjectDetail = useDashboardStore((state) => state.closeProjectDetail);

  if (!isOpen || !project) return null;

  const getResultColor = (result: string) => {
    switch (result) {
      case '成功':
        return 'text-emerald-400 bg-emerald-500/10';
      case '部分成功':
        return 'text-amber-400 bg-amber-500/10';
      case '待分析':
        return 'text-blue-400 bg-blue-500/10';
      case '失败':
        return 'text-rose-400 bg-rose-500/10';
      default:
        return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={closeProjectDetail}
      />

      <div className="relative w-full max-w-4xl max-h-[85vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/5 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

        <div className="flex items-start justify-between p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">{project.name}</h2>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-400" />
                {project.leader}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" />
                {project.startDate} ~ {project.endDate}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                {project.labName}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 text-xs">
                {project.category}
              </span>
            </div>
          </div>
          <button
            onClick={closeProjectDetail}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-700/50">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">项目进度</div>
            <div className="text-2xl font-bold text-cyan-400 font-mono">{project.progress}%</div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">产出数量</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {project.outputCount}
            </div>
            <div className="text-xs text-slate-500 mt-1">项科研成果</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">状态</div>
            <div
              className={`text-2xl font-bold font-mono ${
                project.lowOutput ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {project.lowOutput ? '低产出' : '正常'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {project.lowOutput ? '建议复盘' : '进展顺利'}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-slate-100">实验记录详情</h3>
            <span className="text-sm text-slate-500">
              共 {project.experimentRecords.length} 条记录
            </span>
          </div>

          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
            {project.experimentRecords.map((record: ExperimentRecord) => (
              <div
                key={record.id}
                className="flex items-center gap-4 p-3 bg-slate-800/40 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-slate-200 mb-1">{record.name}</div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {record.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {record.duration} 分钟
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {record.instrument}
                    </span>
                    <span>操作人: {record.operator}</span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${getResultColor(
                    record.result,
                  )}`}
                >
                  {record.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
