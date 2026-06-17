import { useDashboardStore } from '@/store/useDashboardStore';
import { LABS, CATEGORIES } from '@/types';
import { Filter } from 'lucide-react';

export function FilterBar() {
  const lab = useDashboardStore((state) => state.filter.lab);
  const category = useDashboardStore((state) => state.filter.category);
  const setLab = useDashboardStore((state) => state.setLab);
  const setCategory = useDashboardStore((state) => state.setCategory);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        <span className="text-sm text-slate-400">筛选:</span>
      </div>

      <select
        value={lab}
        onChange={(e) => setLab(e.target.value)}
        className="px-3 py-1.5 text-sm bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all cursor-pointer"
      >
        {LABS.map((labName) => (
          <option key={labName} value={labName} className="bg-slate-800">
            {labName}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-1.5 text-sm bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all cursor-pointer"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat} className="bg-slate-800">
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
