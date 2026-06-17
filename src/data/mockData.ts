import type {
  CoreMetrics,
  InstrumentUsage,
  ProjectOutput,
  ConsumableUsage,
  HeatmapData,
  Project,
  ExperimentRecord,
} from '@/types';
import { TIME_SLOTS, EQUIPMENTS } from '@/types';

export const coreMetricsMonth: CoreMetrics = {
  totalExperiments: 2847,
  instrumentUtilization: 78.5,
  activeProjects: 156,
  consumableCost: 328.6,
  experimentGrowth: 12.3,
  utilizationGrowth: 5.2,
  projectGrowth: 8.7,
  costGrowth: -3.1,
};

export const coreMetricsQuarter: CoreMetrics = {
  totalExperiments: 8542,
  instrumentUtilization: 76.2,
  activeProjects: 162,
  consumableCost: 987.3,
  experimentGrowth: 15.6,
  utilizationGrowth: 3.8,
  projectGrowth: 12.4,
  costGrowth: 2.5,
};

export const instrumentUsageMonth: InstrumentUsage[] = [
  { labName: '物理实验室', avgDailyHours: 6.8, instrumentCount: 24 },
  { labName: '化学实验室', avgDailyHours: 7.2, instrumentCount: 31 },
  { labName: '生物实验室', avgDailyHours: 5.9, instrumentCount: 28 },
  { labName: '材料实验室', avgDailyHours: 8.1, instrumentCount: 19 },
  { labName: '信息实验室', avgDailyHours: 6.4, instrumentCount: 22 },
];

export const instrumentUsageQuarter: InstrumentUsage[] = [
  { labName: '物理实验室', avgDailyHours: 6.5, instrumentCount: 24 },
  { labName: '化学实验室', avgDailyHours: 7.0, instrumentCount: 31 },
  { labName: '生物实验室', avgDailyHours: 5.7, instrumentCount: 28 },
  { labName: '材料实验室', avgDailyHours: 7.8, instrumentCount: 19 },
  { labName: '信息实验室', avgDailyHours: 6.2, instrumentCount: 22 },
];

export const projectOutputMonth: ProjectOutput[] = [
  { period: '第1周', papers: 12, patents: 3, reports: 8, prototypes: 2 },
  { period: '第2周', papers: 15, patents: 5, reports: 10, prototypes: 3 },
  { period: '第3周', papers: 18, patents: 4, reports: 12, prototypes: 4 },
  { period: '第4周', papers: 14, patents: 6, reports: 9, prototypes: 2 },
];

export const projectOutputQuarter: ProjectOutput[] = [
  { period: '1月', papers: 48, patents: 12, reports: 32, prototypes: 8 },
  { period: '2月', papers: 52, patents: 15, reports: 38, prototypes: 11 },
  { period: '3月', papers: 59, patents: 18, reports: 42, prototypes: 13 },
];

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

export const consumableUsageMonth = generateConsumableMonth();
export const consumableUsageQuarter = generateConsumableQuarter();

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

export const heatmapData = generateHeatmapData();

function generateExperimentRecords(projectId: string, count: number): ExperimentRecord[] {
  const experiments = [
    '样品制备',
    '光谱分析',
    '显微观测',
    '色谱分离',
    '质谱检测',
    '热重分析',
    '电化学测试',
    '形貌表征',
  ];
  const instruments = [
    '电子显微镜',
    '质谱仪',
    '核磁共振仪',
    'X射线衍射仪',
    '高效液相色谱',
    '分光光度计',
  ];
  const operators = ['张伟', '李明', '王芳', '刘洋', '陈静', '赵强'];
  const results = ['成功', '成功', '成功', '部分成功', '待分析', '失败'];

  const records: ExperimentRecord[] = [];
  for (let i = 0; i < count; i++) {
    const day = Math.floor(Math.random() * 28) + 1;
    records.push({
      id: `${projectId}-exp-${i + 1}`,
      date: `2026-06-${String(day).padStart(2, '0')}`,
      name: experiments[Math.floor(Math.random() * experiments.length)],
      instrument: instruments[Math.floor(Math.random() * instruments.length)],
      duration: Math.floor(Math.random() * 240) + 30,
      operator: operators[Math.floor(Math.random() * operators.length)],
      result: results[Math.floor(Math.random() * results.length)],
    });
  }
  return records.sort((a, b) => b.date.localeCompare(a.date));
}

export const projectsMonth: Project[] = [
  {
    id: 'p001',
    name: '新型二维材料的光电特性研究',
    labName: '物理实验室',
    leader: '张教授',
    progress: 65,
    outputCount: 8,
    lowOutput: false,
    startDate: '2026-01-15',
    endDate: '2026-12-31',
    category: '基础研究',
    experimentRecords: generateExperimentRecords('p001', 12),
  },
  {
    id: 'p002',
    name: '高效催化材料的合成与应用',
    labName: '化学实验室',
    leader: '李教授',
    progress: 42,
    outputCount: 3,
    lowOutput: true,
    startDate: '2026-02-01',
    endDate: '2027-01-31',
    category: '应用研究',
    experimentRecords: generateExperimentRecords('p002', 5),
  },
  {
    id: 'p003',
    name: '肿瘤靶向药物分子设计',
    labName: '生物实验室',
    leader: '王教授',
    progress: 78,
    outputCount: 12,
    lowOutput: false,
    startDate: '2025-09-01',
    endDate: '2026-08-31',
    category: '基础研究',
    experimentRecords: generateExperimentRecords('p003', 15),
  },
  {
    id: 'p004',
    name: '高强度轻质合金研发',
    labName: '材料实验室',
    leader: '刘教授',
    progress: 88,
    outputCount: 15,
    lowOutput: false,
    startDate: '2025-06-01',
    endDate: '2026-05-31',
    category: '开发研究',
    experimentRecords: generateExperimentRecords('p004', 18),
  },
  {
    id: 'p005',
    name: '量子计算算法优化',
    labName: '信息实验室',
    leader: '陈教授',
    progress: 35,
    outputCount: 2,
    lowOutput: true,
    startDate: '2026-03-01',
    endDate: '2027-02-28',
    category: '基础研究',
    experimentRecords: generateExperimentRecords('p005', 4),
  },
  {
    id: 'p006',
    name: '智能传感系统开发',
    labName: '信息实验室',
    leader: '赵教授',
    progress: 55,
    outputCount: 7,
    lowOutput: false,
    startDate: '2025-11-01',
    endDate: '2026-10-31',
    category: '应用研究',
    experimentRecords: generateExperimentRecords('p006', 10),
  },
  {
    id: 'p007',
    name: '纳米药物载体研究',
    labName: '材料实验室',
    leader: '孙教授',
    progress: 30,
    outputCount: 1,
    lowOutput: true,
    startDate: '2026-04-01',
    endDate: '2027-03-31',
    category: '基础研究',
    experimentRecords: generateExperimentRecords('p007', 3),
  },
  {
    id: 'p008',
    name: '基因编辑技术优化',
    labName: '生物实验室',
    leader: '周教授',
    progress: 72,
    outputCount: 9,
    lowOutput: false,
    startDate: '2025-08-01',
    endDate: '2026-07-31',
    category: '应用研究',
    experimentRecords: generateExperimentRecords('p008', 14),
  },
];

export const projectsQuarter: Project[] = projectsMonth.map((p) => ({
  ...p,
  outputCount: Math.floor(p.outputCount * (2.5 + Math.random())),
  experimentRecords: generateExperimentRecords(p.id, Math.floor(p.experimentRecords.length * 2.5)),
}));
