import { create } from 'zustand';
import type { FilterState, CoreMetrics, InstrumentUsage, ProjectOutput, ConsumableUsage, HeatmapData, Project } from '@/types';
import {
  coreMetricsMonth,
  coreMetricsQuarter,
  instrumentUsageMonth,
  instrumentUsageQuarter,
  projectOutputMonth,
  projectOutputQuarter,
  heatmapData as initialHeatmapData,
  projectsMonth,
  projectsQuarter,
} from '@/data/mockData';
import { TIME_SLOTS, EQUIPMENTS } from '@/types';

function generateConsumableMonth(): ConsumableUsage[] {
  const data: ConsumableUsage[] = [];
  for (let i = 1; i <= 30; i++) {
    const day = String(i).padStart(2, '0');
    data.push({
      date: `${day}日`,
      cost: 8 + Math.random() * 6,
      quantity: 120 + Math.random() * 80,
    });
  }
  return data;
}

function generateConsumableQuarter(): ConsumableUsage[] {
  const data: ConsumableUsage[] = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      date: `第${i}周`,
      cost: 65 + Math.random() * 35,
      quantity: 900 + Math.random() * 500,
    });
  }
  return data;
}

function generateHeatmapData(): HeatmapData[] {
  const data: HeatmapData[] = [];
  EQUIPMENTS.forEach((equipment) => {
    TIME_SLOTS.forEach((timeSlot) => {
      const baseFreq = Math.floor(Math.random() * 30) + 10;
      const midBoost = timeSlot === '10:00' || timeSlot === '14:00' || timeSlot === '16:00' ? 20 : 0;
      data.push({
        equipment,
        timeSlot,
        frequency: baseFreq + midBoost + Math.floor(Math.random() * 15),
      });
    });
  });
  return data;
}

function randomizeCoreMetrics(base: CoreMetrics): CoreMetrics {
  const vary = (val: number, pct = 0.05) => val * (1 + (Math.random() - 0.5) * 2 * pct);
  return {
    totalExperiments: Math.round(vary(base.totalExperiments)),
    instrumentUtilization: Number(vary(base.instrumentUtilization).toFixed(1)),
    activeProjects: Math.round(vary(base.activeProjects, 0.02)),
    consumableCost: Number(vary(base.consumableCost).toFixed(1)),
    experimentGrowth: Number(vary(base.experimentGrowth, 0.2).toFixed(1)),
    utilizationGrowth: Number(vary(base.utilizationGrowth, 0.2).toFixed(1)),
    projectGrowth: Number(vary(base.projectGrowth, 0.2).toFixed(1)),
    costGrowth: Number(vary(base.costGrowth, 0.3).toFixed(1)),
  };
}

function randomizeInstrumentUsage(base: InstrumentUsage[]): InstrumentUsage[] {
  return base.map((item) => ({
    ...item,
    avgDailyHours: Number((item.avgDailyHours * (1 + (Math.random() - 0.5) * 0.15)).toFixed(1)),
    instrumentCount: item.instrumentCount + Math.floor((Math.random() - 0.5) * 4),
  }));
}

function randomizeProjectOutput(base: ProjectOutput[]): ProjectOutput[] {
  return base.map((item) => ({
    ...item,
    papers: Math.max(0, Math.round(item.papers * (1 + (Math.random() - 0.5) * 0.3))),
    patents: Math.max(0, Math.round(item.patents * (1 + (Math.random() - 0.5) * 0.3))),
    reports: Math.max(0, Math.round(item.reports * (1 + (Math.random() - 0.5) * 0.3))),
    prototypes: Math.max(0, Math.round(item.prototypes * (1 + (Math.random() - 0.5) * 0.3))),
  }));
}

interface DashboardState {
  filter: FilterState;
  selectedProject: Project | null;
  isModalOpen: boolean;
  isRefreshing: boolean;
  refreshKey: number;
  cachedCoreMetrics: { month: CoreMetrics; quarter: CoreMetrics };
  cachedInstrumentUsage: { month: InstrumentUsage[]; quarter: InstrumentUsage[] };
  cachedProjectOutput: { month: ProjectOutput[]; quarter: ProjectOutput[] };
  cachedConsumableUsage: { month: ConsumableUsage[]; quarter: ConsumableUsage[] };
  cachedHeatmapData: HeatmapData[];
  setPeriod: (period: 'month' | 'quarter') => void;
  setLab: (lab: string) => void;
  setCategory: (category: string) => void;
  openProjectDetail: (project: Project) => void;
  closeProjectDetail: () => void;
  refreshData: () => Promise<void>;
  resetFilters: () => void;
  getCoreMetrics: () => CoreMetrics;
  getInstrumentUsage: () => InstrumentUsage[];
  getProjectOutput: () => ProjectOutput[];
  getConsumableUsage: () => ConsumableUsage[];
  getHeatmapData: () => HeatmapData[];
  getProjects: () => Project[];
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  filter: {
    period: 'month',
    lab: '全部实验室',
    category: '全部类型',
  },
  selectedProject: null,
  isModalOpen: false,
  isRefreshing: false,
  refreshKey: 0,
  cachedCoreMetrics: {
    month: { ...coreMetricsMonth },
    quarter: { ...coreMetricsQuarter },
  },
  cachedInstrumentUsage: {
    month: instrumentUsageMonth.map((i) => ({ ...i })),
    quarter: instrumentUsageQuarter.map((i) => ({ ...i })),
  },
  cachedProjectOutput: {
    month: projectOutputMonth.map((i) => ({ ...i })),
    quarter: projectOutputQuarter.map((i) => ({ ...i })),
  },
  cachedConsumableUsage: {
    month: generateConsumableMonth(),
    quarter: generateConsumableQuarter(),
  },
  cachedHeatmapData: initialHeatmapData,

  setPeriod: (period) => set((state) => ({ filter: { ...state.filter, period } })),
  setLab: (lab) => set((state) => ({ filter: { ...state.filter, lab } })),
  setCategory: (category) => set((state) => ({ filter: { ...state.filter, category } })),

  openProjectDetail: (project) => set({ selectedProject: project, isModalOpen: true }),
  closeProjectDetail: () => set({ selectedProject: null, isModalOpen: false }),

  refreshData: async () => {
    set({ isRefreshing: true });
    await new Promise((resolve) => setTimeout(resolve, 800));
    set((state) => ({
      refreshKey: state.refreshKey + 1,
      cachedCoreMetrics: {
        month: randomizeCoreMetrics(coreMetricsMonth),
        quarter: randomizeCoreMetrics(coreMetricsQuarter),
      },
      cachedInstrumentUsage: {
        month: randomizeInstrumentUsage(instrumentUsageMonth),
        quarter: randomizeInstrumentUsage(instrumentUsageQuarter),
      },
      cachedProjectOutput: {
        month: randomizeProjectOutput(projectOutputMonth),
        quarter: randomizeProjectOutput(projectOutputQuarter),
      },
      cachedConsumableUsage: {
        month: generateConsumableMonth(),
        quarter: generateConsumableQuarter(),
      },
      cachedHeatmapData: generateHeatmapData(),
      isRefreshing: false,
    }));
  },

  resetFilters: () =>
    set({
      filter: {
        period: 'month',
        lab: '全部实验室',
        category: '全部类型',
      },
    }),

  getCoreMetrics: () => {
    const { period } = get().filter;
    return period === 'month' ? get().cachedCoreMetrics.month : get().cachedCoreMetrics.quarter;
  },

  getInstrumentUsage: () => {
    const { period, lab } = get().filter;
    let data = period === 'month' ? get().cachedInstrumentUsage.month : get().cachedInstrumentUsage.quarter;
    if (lab !== '全部实验室') {
      data = data.filter((item) => item.labName === lab);
    }
    return data;
  },

  getProjectOutput: () => {
    const { period } = get().filter;
    return period === 'month' ? get().cachedProjectOutput.month : get().cachedProjectOutput.quarter;
  },

  getConsumableUsage: () => {
    const { period } = get().filter;
    return period === 'month' ? get().cachedConsumableUsage.month : get().cachedConsumableUsage.quarter;
  },

  getHeatmapData: () => {
    return get().cachedHeatmapData;
  },

  getProjects: () => {
    const { period, lab, category } = get().filter;
    let data = period === 'month' ? projectsMonth : projectsQuarter;
    if (lab !== '全部实验室') {
      data = data.filter((item) => item.labName === lab);
    }
    if (category !== '全部类型') {
      data = data.filter((item) => item.category === category);
    }
    return data;
  },
}));
