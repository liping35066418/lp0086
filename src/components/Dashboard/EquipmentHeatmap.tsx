import ReactECharts from 'echarts-for-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { ChartCard } from '@/components/common/ChartCard';
import { Flame } from 'lucide-react';
import { EQUIPMENTS, TIME_SLOTS } from '@/types';

export function EquipmentHeatmap() {
  const getHeatmapData = useDashboardStore((state) => state.getHeatmapData);
  const refreshKey = useDashboardStore((state) => state.refreshKey);
  const rawData = getHeatmapData();

  const data = rawData.map((item) => [
    TIME_SLOTS.indexOf(item.timeSlot),
    EQUIPMENTS.indexOf(item.equipment),
    item.frequency,
  ]);

  const option = {
    tooltip: {
      position: 'top',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(34, 211, 238, 0.3)',
      textStyle: {
        color: '#e2e8f0',
        fontSize: 12,
      },
      formatter: (params: any) => {
        return `
          <div style="font-weight: 600; margin-bottom: 4px;">${EQUIPMENTS[params.data[1]]}</div>
          <div>时段: ${TIME_SLOTS[params.data[0]]}</div>
          <div>使用频次: <span style="color: #22d3ee; font-weight: 600;">${params.data[2]} 次</span></div>
        `;
      },
    },
    grid: {
      left: '18%',
      right: '8%',
      bottom: '8%',
      top: '5%',
    },
    xAxis: {
      type: 'category',
      data: TIME_SLOTS,
      axisLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.3)',
        },
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 10,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      data: EQUIPMENTS,
      axisLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.3)',
        },
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 10,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
    },
    visualMap: {
      min: 0,
      max: 70,
      calculable: true,
      orient: 'vertical',
      right: '2%',
      top: 'center',
      textStyle: {
        color: '#64748b',
        fontSize: 10,
      },
      inRange: {
        color: ['#0c4a6e', '#0369a1', '#0284c7', '#0ea5e9', '#38bdf8', '#22d3ee', '#67e8f9'],
      },
      handleStyle: {
        borderColor: '#22d3ee',
      },
    },
    series: [
      {
        name: '使用频次',
        type: 'heatmap',
        data,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(34, 211, 238, 0.5)',
          },
        },
        itemStyle: {
          borderRadius: 2,
          borderWidth: 2,
          borderColor: 'transparent',
        },
      },
    ],
    animationDuration: 1000,
    animationEasing: 'cubicOut',
  };

  return (
    <ChartCard
      title="热门实验设备使用频次热力图"
      subtitle="按设备和时段统计使用频次"
      icon={<Flame className="w-4 h-4" />}
      className="h-full"
    >
      <ReactECharts key={refreshKey} option={option} style={{ height: '320px', width: '100%' }} />
    </ChartCard>
  );
}
