import { CoreMetrics } from '@/components/Dashboard/CoreMetrics';
import { InstrumentUsageChart } from '@/components/Dashboard/InstrumentUsageChart';
import { ProjectOutputChart } from '@/components/Dashboard/ProjectOutputChart';
import { ConsumableChart } from '@/components/Dashboard/ConsumableChart';
import { EquipmentHeatmap } from '@/components/Dashboard/EquipmentHeatmap';
import { ProjectCardList } from '@/components/Dashboard/ProjectCardList';
import { PeriodSwitcher } from '@/components/Dashboard/PeriodSwitcher';
import { FilterBar } from '@/components/Dashboard/FilterBar';
import { ProjectDetailModal } from '@/components/Dashboard/ProjectDetailModal';
import { Monitor, RefreshCw, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, '0')}月${String(date.getDate()).padStart(2, '0')}日`;
  };

  const formatTime = (date: Date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-4 md:p-6 min-w-[1280px]">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
              <Monitor className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent whitespace-nowrap">
                科研数据可视化大屏
              </h1>
              <p className="text-sm text-slate-500">3836 · 实时监测科研核心指标</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            <FilterBar />
            <PeriodSwitcher />
            <div className="flex items-center gap-3 pl-0 lg:pl-4 border-l-0 lg:border-l border-slate-700/50">
              <div className="text-right">
                <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                <div className="font-mono text-lg text-cyan-400 font-medium">
                  {formatTime(currentTime)}
                </div>
              </div>
              <button className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <section className="mb-6">
          <CoreMetrics />
        </section>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-5">
            <InstrumentUsageChart />
          </div>
          <div className="col-span-12 md:col-span-4">
            <ProjectOutputChart />
          </div>
          <div className="col-span-12 md:col-span-3">
            <ConsumableChart />
          </div>

          <div className="col-span-12 lg:col-span-7">
            <EquipmentHeatmap />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ProjectCardList />
          </div>
        </div>

        <footer className="mt-6 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span>数据来源: 8836 数据聚合服务</span>
          </div>
          <div>数据每 30 秒自动更新</div>
        </footer>
      </div>

      <ProjectDetailModal />
    </div>
  );
}
