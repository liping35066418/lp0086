import ReactECharts from 'echarts-for-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { ChartCard } from '@/components/common/ChartCard';
import { Activity } from 'lucide-react';
import { useCallback } from 'react';

interface ChartClickParams {
  name: string;
  dataIndex: number;
  value: number;
}

interface TooltipParamItem {
  name: string;
  value: number;
  dataIndex: number;
}

interface LabelParams {
  dataIndex: number;
}

export function InstrumentUsageChart() {
  const getInstrumentUsage = useDashboardStore((state) => state.getInstrumentUsage);
  const refreshKey = useDashboardStore((state) => state.refreshKey);
  const selectedLab = useDashboardStore((state) => state.filter.lab);
  const toggleLab = useDashboardStore((state) => state.toggleLab);
  const data = getInstrumentUsage();

  const onChartClick = useCallback(
    (params: ChartClickParams) => {
      if (params.name) {
        toggleLab(params.name);
      }
    },
    [toggleLab]
  );

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
      formatter: (params: unknown) => {
        const items = params as TooltipParamItem[];
        const item = items[0];
        const labName = item.name;
        const isSelected = selectedLab === labName;
        return `
          <div style="font-weight: 600; margin-bottom: 4px;">${labName}${isSelected ? ' (已选中)' : ''}</div>
          <div>日均使用时长: <span style="color: #22d3ee; font-weight: 600;">${item.value} 小时</span></div>
          <div>仪器数量: <span style="color: #67e8f9;">${data[item.dataIndex]?.instrumentCount || 0} 台</span></div>
          <div style="margin-top: 4px; color: #94a3b8; font-size: 11px;">${isSelected ? '点击取消筛选' : '点击下钻查看'}</div>
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
        fontSize: 11,
        interval: 0,
        rotate: 0,
        fontWeight: (value: string) => (selectedLab === value ? 700 : 400),
        color: (value: string) => (selectedLab === value ? '#22d3ee' : '#94a3b8'),
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
        data: data.map((item) => ({
          value: item.avgDailyHours,
          itemStyle:
            selectedLab === item.labName
              ? {
                  borderRadius: [4, 4, 0, 0],
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: '#fbbf24' },
                      { offset: 1, color: '#d97706' },
                    ],
                  },
                  shadowColor: 'rgba(251, 191, 36, 0.4)',
                  shadowBlur: 15,
                }
              : {
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
        })),
        barWidth: '45%',
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
          color: (params: LabelParams) => {
            const labName = data[params.dataIndex]?.labName;
            return selectedLab === labName ? '#fbbf24' : '#67e8f9';
          },
          fontSize: 11,
          fontWeight: 600,
          formatter: '{c}h',
        },
      },
    ],
    animationDuration: 1200,
    animationEasing: 'cubicOut',
  };

  const onEvents = {
    click: onChartClick,
  };

  return (
    <ChartCard
      title="各实验室仪器日均使用时长"
      subtitle={selectedLab !== '全部实验室' ? `当前筛选: ${selectedLab}（点击柱子取消）` : '按实验室统计仪器平均每日使用时长，点击柱子下钻'}
      icon={<Activity className="w-4 h-4" />}
      className="h-full"
    >
      <ReactECharts
        key={refreshKey}
        option={option}
        onEvents={onEvents}
        style={{ height: '240px', width: '100%', cursor: 'pointer' }}
      />
    </ChartCard>
  );
}
