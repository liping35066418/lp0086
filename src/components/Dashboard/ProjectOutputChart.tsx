import ReactECharts from 'echarts-for-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { ChartCard } from '@/components/common/ChartCard';
import { BarChart3 } from 'lucide-react';

export function ProjectOutputChart() {
  const getProjectOutput = useDashboardStore((state) => state.getProjectOutput);
  const data = getProjectOutput();

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'rgba(34, 211, 238, 0.3)',
      textStyle: {
        color: '#e2e8f0',
        fontSize: 12,
      },
    },
    legend: {
      data: ['论文', '专利', '报告', '原型'],
      textStyle: {
        color: '#94a3b8',
        fontSize: 11,
      },
      top: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 12,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '18%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.period),
      axisLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.3)',
        },
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.1)',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '论文',
        type: 'bar',
        stack: 'total',
        data: data.map((item) => item.papers),
        barWidth: '50%',
        itemStyle: {
          color: '#22d3ee',
        },
      },
      {
        name: '专利',
        type: 'bar',
        stack: 'total',
        data: data.map((item) => item.patents),
        itemStyle: {
          color: '#a78bfa',
        },
      },
      {
        name: '报告',
        type: 'bar',
        stack: 'total',
        data: data.map((item) => item.reports),
        itemStyle: {
          color: '#34d399',
        },
      },
      {
        name: '原型',
        type: 'bar',
        stack: 'total',
        data: data.map((item) => item.prototypes),
        itemStyle: {
          color: '#fb923c',
          borderRadius: [0, 0, 4, 4],
        },
      },
    ],
    animationDuration: 1200,
    animationEasing: 'cubicOut',
  };

  return (
    <ChartCard
      title="项目阶段性产出数量"
      subtitle="论文、专利、报告、原型产出统计"
      icon={<BarChart3 className="w-4 h-4" />}
      className="h-full"
    >
      <ReactECharts option={option} style={{ height: '240px', width: '100%' }} />
    </ChartCard>
  );
}
