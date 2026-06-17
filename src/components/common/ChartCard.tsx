import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function ChartCard({ title, subtitle, children, className = '', icon }: ChartCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/80 to-slate-800/70 backdrop-blur-sm border border-cyan-500/15 transition-all duration-300 hover:border-cyan-400/30 ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="p-4 pb-2">
        <div className="flex items-center gap-2 mb-1">
          {icon && <span className="text-cyan-400">{icon}</span>}
          <h3 className="text-base font-semibold text-slate-100">{title}</h3>
        </div>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div className="px-2 pb-2">{children}</div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
}
