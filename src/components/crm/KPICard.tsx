import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color?: 'blue' | 'emerald' | 'purple' | 'amber' | 'rose';
  onClick?: () => void;
}

export function KPICard({ title, value, change, changeType = 'neutral', icon: Icon, color = 'blue', onClick }: KPICardProps) {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      shadow: 'shadow-blue-500/30',
      hover: 'hover:border-blue-200'
    },
    emerald: {
      gradient: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      shadow: 'shadow-emerald-500/30',
      hover: 'hover:border-emerald-200'
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      shadow: 'shadow-purple-500/30',
      hover: 'hover:border-purple-200'
    },
    amber: {
      gradient: 'from-amber-500 to-amber-600',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      shadow: 'shadow-amber-500/30',
      hover: 'hover:border-amber-200'
    },
    rose: {
      gradient: 'from-rose-500 to-rose-600',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      shadow: 'shadow-rose-500/30',
      hover: 'hover:border-rose-200'
    }
  };

  const colors = colorClasses[color];

  return (
    <div 
      onClick={onClick}
      className={`group relative bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl ${colors.hover} transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity`}></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${colors.gradient} rounded-xl shadow-lg ${colors.shadow}`}>
            <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          {change && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
              changeType === 'up' 
                ? 'bg-emerald-50 text-emerald-700' 
                : changeType === 'down'
                ? 'bg-rose-50 text-rose-700'
                : 'bg-gray-50 text-gray-700'
            }`}>
              {changeType === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} />
              ) : changeType === 'down' ? (
                <TrendingDown className="w-3.5 h-3.5" strokeWidth={2} />
              ) : null}
              {change}
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
      </div>
    </div>
  );
}
