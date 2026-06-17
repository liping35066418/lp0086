import { create } from 'zustand';
import type { FilterState, CoreMetrics, InstrumentUsage, ProjectOutput, ConsumableUsage, HeatmapData, Project } from '@/types';
import {
  coreMetricsMonth,
  coreMetricsQuarter,
  instrumentUsageMonth,
  instrumentUsageQuarter,
  projectOutputMonth,
  projectOutputQuarter,
  consumableUsageMonth,
  consumableUsageQuarter,
  heatmapData,
  projectsMonth,
  projectsQuarter,
} from '@/data/mockData';

interface DashboardState {
  filter: FilterState;
  selectedProject: Project | null;
  isModalOpen: boolean;
  setPeriod: (period: 'month' | 'quarter') => void;
  setLab: (lab: string) => void;
  setCategory: (category: string) => void;
  openProjectDetail: (project: Project) => void;
  closeProjectDetail: () => void;
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

  setPeriod: (period) => set((state) => ({ filter: { ...state.filter, period } })),
  setLab: (lab) => set((state) => ({ filter: { ...state.filter, lab } })),
  setCategory: (category) => set((state) => ({ filter: { ...state.filter, category } })),

  openProjectDetail: (project) => set({ selectedProject: project, isModalOpen: true }),
  closeProjectDetail: () => set({ selectedProject: null, isModalOpen: false }),

  getCoreMetrics: () => {
    const { period } = get().filter;
    return period === 'month' ? coreMetricsMonth : coreMetricsQuarter;
  },

  getInstrumentUsage: () => {
    const { period, lab } = get().filter;
    let data = period === 'month' ? instrumentUsageMonth : instrumentUsageQuarter;
    if (lab !== '全部实验室') {
      data = data.filter((item) => item.labName === lab);
    }
    return data;
  },

  getProjectOutput: () => {
    const { period } = get().filter;
    return period === 'month' ? projectOutputMonth : projectOutputQuarter;
  },

  getConsumableUsage: () => {
    const { period } = get().filter;
    return period === 'month' ? consumableUsageMonth : consumableUsageQuarter;
  },

  getHeatmapData: () => {
    return heatmapData;
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
