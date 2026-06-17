import { useDashboardStore } from '@/store/useDashboardStore';
import { MetricCard } from '@/components/common/MetricCard';
import { FlaskConical, Gauge, FolderKanban, DollarSign } from 'lucide-react';

export function CoreMetrics() {
  const getCoreMetrics = useDashboardStore((state) => state.getCoreMetrics);
  useDashboardStore((state) => state.refreshKey);
  const metrics = getCoreMetrics();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        title="实验产出总量"
        value={metrics.totalExperiments}
        unit=""
        growth={metrics.experimentGrowth}
        icon={<FlaskConical className="w-5 h-5" />}
      />
      <MetricCard
        title="仪器使用率"
        value={metrics.instrumentUtilization}
        unit=""
        growth={metrics.utilizationGrowth}
        icon={<Gauge className="w-5 h-5" />}
        valueSuffix="%"
        isPercentage
      />
      <MetricCard
        title="在研课题数"
        value={metrics.activeProjects}
        unit=""
        growth={metrics.projectGrowth}
        icon={<FolderKanban className="w-5 h-5" />}
      />
      <MetricCard
        title="耗材消耗金额"
        value={metrics.consumableCost}
        unit="¥"
        growth={metrics.costGrowth}
        icon={<DollarSign className="w-5 h-5" />}
        valueSuffix="万"
      />
    </div>
  );
}
