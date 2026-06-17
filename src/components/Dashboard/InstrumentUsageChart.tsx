import ReactECharts from 'echarts-for-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { ChartCard } from '@/components/common/ChartCard';
import { Activity } from 'lucide-react';

export function InstrumentUsageChart() {
  const getInstrumentUsage = useDashboardStore((state) => state.getInstrumentUsage);
  const data = getInstrumentUsage();

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
      formatter: (params: any) => {
        const item = params[0];
        return `
          <div style="font-weight: 600; margin-bottom: 4px;">${item.name}</div>
          <div>日均使用时长: <span style="color: #22d3ee; font-weight: 600;">${item.value} 小时</span></div>
          <div>仪器数量: <span style="color: #67e8f9;">${data[item.dataIndex]?.instrumentCount || 0} 台</span></div>
        `;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.labName),
      axisLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.3)',
        },
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        interval: 0,
        rotate: 0,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: '小时/天',
      nameTextStyle: {
        color: '#64748b',
        fontSize: 11,
      },
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
        type: 'bar',
        data: data.map((item) => item.avgDailyHours),
        barWidth: '45%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#22d3ee' },
              { offset: 1, color: '#0891b2' },
            ],
          },
          shadowColor: 'rgba(34, 211, 238, 0.3)',
          shadowBlur: 10,
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#67e8f9' },
                { offset: 1, color: '#06b6d4' },
              ],
            },
          },
        },
        label: {
          show: true,
          position: 'top',
          color: '#67e8f9',
          fontSize: 11,
          fontWeight: 600,
          formatter: '{c}h',
        },
      },
    ],
    animationDuration: 1200,
    animationEasing: 'cubicOut',
  };

  return (
    <ChartCard
      title="各实验室仪器日均使用时长"
      subtitle="按实验室统计仪器平均每日使用时长"
      icon={<Activity className="w-4 h-4" />}
      className="h-full"
    >
      <ReactECharts option={option} style={{ height: '240px', width: '100%' }} />
    </ChartCard>
  );
}
