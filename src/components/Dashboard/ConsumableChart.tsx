import ReactECharts from 'echarts-for-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { ChartCard } from '@/components/common/ChartCard';
import { TrendingUp } from 'lucide-react';

export function ConsumableChart() {
  const getConsumableUsage = useDashboardStore((state) => state.getConsumableUsage);
  const refreshKey = useDashboardStore((state) => state.refreshKey);
  const data = getConsumableUsage();

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'rgba(34, 211, 238, 0.3)',
      textStyle: {
        color: '#e2e8f0',
        fontSize: 12,
      },
      axisPointer: {
        type: 'cross',
        lineStyle: {
          color: 'rgba(34, 211, 238, 0.5)',
        },
      },
    },
    legend: {
      data: ['消耗金额', '消耗数量'],
      textStyle: {
        color: '#94a3b8',
        fontSize: 11,
      },
      top: 0,
      right: 0,
      itemWidth: 14,
      itemHeight: 2,
      itemGap: 16,
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
      boundaryGap: false,
      data: data.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.3)',
        },
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 10,
        interval: 'auto',
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '万元',
        nameTextStyle: {
          color: '#64748b',
          fontSize: 10,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#64748b',
          fontSize: 10,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(148, 163, 184, 0.1)',
            type: 'dashed',
          },
        },
      },
      {
        type: 'value',
        name: '件数',
        nameTextStyle: {
          color: '#64748b',
          fontSize: 10,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#64748b',
          fontSize: 10,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '消耗金额',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        data: data.map((item) => Number(item.cost.toFixed(2))),
        lineStyle: {
          width: 2,
          color: '#22d3ee',
          shadowColor: 'rgba(34, 211, 238, 0.5)',
          shadowBlur: 10,
        },
        itemStyle: {
          color: '#22d3ee',
          borderWidth: 2,
          borderColor: '#0f172a',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(34, 211, 238, 0.3)' },
              { offset: 1, color: 'rgba(34, 211, 238, 0)' },
            ],
          },
        },
      },
      {
        name: '消耗数量',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'diamond',
        symbolSize: 4,
        data: data.map((item) => Math.round(item.quantity)),
        lineStyle: {
          width: 2,
          color: '#a78bfa',
          type: 'dashed',
        },
        itemStyle: {
          color: '#a78bfa',
        },
      },
    ],
    animationDuration: 1500,
    animationEasing: 'cubicOut',
  };

  return (
    <ChartCard
      title="耗材消耗速率"
      subtitle="消耗金额与数量变化趋势"
      icon={<TrendingUp className="w-4 h-4" />}
      className="h-full"
    >
      <ReactECharts key={refreshKey} option={option} style={{ height: '240px', width: '100%' }} />
    </ChartCard>
  );
}
