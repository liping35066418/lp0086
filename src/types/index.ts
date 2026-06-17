export interface CoreMetrics {
  totalExperiments: number;
  instrumentUtilization: number;
  activeProjects: number;
  consumableCost: number;
  experimentGrowth: number;
  utilizationGrowth: number;
  projectGrowth: number;
  costGrowth: number;
}

export interface InstrumentUsage {
  labName: string;
  avgDailyHours: number;
  instrumentCount: number;
}

export interface ProjectOutput {
  period: string;
  papers: number;
  patents: number;
  reports: number;
  prototypes: number;
}

export interface ConsumableUsage {
  date: string;
  cost: number;
  quantity: number;
}

export interface HeatmapData {
  equipment: string;
  timeSlot: string;
  frequency: number;
}

export interface ExperimentRecord {
  id: string;
  date: string;
  name: string;
  instrument: string;
  duration: number;
  operator: string;
  result: string;
}

export interface Project {
  id: string;
  name: string;
  labName: string;
  leader: string;
  progress: number;
  outputCount: number;
  lowOutput: boolean;
  startDate: string;
  endDate: string;
  category: string;
  experimentRecords: ExperimentRecord[];
}

export interface FilterState {
  period: 'month' | 'quarter';
  lab: string;
  category: string;
  showLowOutputOnly: boolean;
}

export const LABS = [
  '全部实验室',
  '物理实验室',
  '化学实验室',
  '生物实验室',
  '材料实验室',
  '信息实验室',
];

export const CATEGORIES = [
  '全部类型',
  '基础研究',
  '应用研究',
  '开发研究',
  '试验发展',
];

export const TIME_SLOTS = [
  '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00',
];

export const EQUIPMENTS = [
  '电子显微镜',
  '质谱仪',
  '核磁共振仪',
  'X射线衍射仪',
  '高效液相色谱',
  '气相色谱仪',
  '分光光度计',
  '离心机',
];
