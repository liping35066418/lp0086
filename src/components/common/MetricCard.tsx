import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  growth: number;
  icon: React.ReactNode;
  valueSuffix?: string;
  isPercentage?: boolean;
}

export function MetricCard({
  title,
  value,
  unit = '',
  growth,
  icon,
  valueSuffix = '',
  isPercentage = false,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const isPositive = growth >= 0;

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + (value - startValue) * easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const formatValue = (val: number) => {
    if (isPercentage) {
      return val.toFixed(1);
    }
    if (val >= 10000) {
      return (val / 10000).toFixed(2) + '万';
    }
    if (val >= 1000) {
      return val.toFixed(0);
    }
    return val.toFixed(1);
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-sm border border-cyan-500/20 p-5 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-60" />
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-sm font-medium text-slate-400 tracking-wide">{title}</span>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
            {icon}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold font-mono bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            {unit}{formatValue(displayValue)}{valueSuffix}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-rose-400" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? '+' : ''}{growth.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-500 ml-1">较上期</span>
        </div>
      </div>
    </div>
  );
}
