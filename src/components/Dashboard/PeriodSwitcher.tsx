import { useDashboardStore } from '@/store/useDashboardStore';
import { Calendar, Clock } from 'lucide-react';

export function PeriodSwitcher() {
  const period = useDashboardStore((state) => state.filter.period);
  const setPeriod = useDashboardStore((state) => state.setPeriod);

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-700/50">
      <button
        onClick={() => setPeriod('month')}
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
          period === 'month'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
        }`}
      >
        <Calendar className="w-3.5 h-3.5" />
        月度
      </button>
      <button
        onClick={() => setPeriod('quarter')}
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
          period === 'quarter'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
        }`}
      >
        <Clock className="w-3.5 h-3.5" />
        季度
      </button>
    </div>
  );
}
