import { useDashboardStore } from '@/store/useDashboardStore';
import { LABS, CATEGORIES } from '@/types';
import { Filter, AlertTriangle } from 'lucide-react';

export function FilterBar() {
  const lab = useDashboardStore((state) => state.filter.lab);
  const category = useDashboardStore((state) => state.filter.category);
  const showLowOutputOnly = useDashboardStore((state) => state.filter.showLowOutputOnly);
  const setLab = useDashboardStore((state) => state.setLab);
  const setCategory = useDashboardStore((state) => state.setCategory);
  const setShowLowOutputOnly = useDashboardStore((state) => state.setShowLowOutputOnly);

  return (
    <div className="flex items-center gap-4 flex-wrap">
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

      <button
        onClick={() => setShowLowOutputOnly(!showLowOutputOnly)}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-all cursor-pointer ${
          showLowOutputOnly
            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 ring-1 ring-amber-500/30'
            : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-amber-400 hover:border-amber-500/30'
        }`}
      >
        <AlertTriangle className="w-4 h-4" />
        <span>只看低产出</span>
        <div
          className={`w-8 h-4 rounded-full transition-all relative ${
          showLowOutputOnly ? 'bg-amber-500' : 'bg-slate-600'
        }`}
        >
          <div
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
            showLowOutputOnly ? 'left-4' : 'left-0.5'
          }`}
          />
        </div>
      </button>
    </div>
  );
}
