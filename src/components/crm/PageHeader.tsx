import { LucideIcon, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; onClick?: () => void }[];
}

export function PageHeader({ title, description, icon: Icon, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumbs && (
        <div className="flex items-center gap-2 text-sm mb-3">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={1.5} />}
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-gray-900 font-semibold">{crumb.label}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-100">
              <Icon className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
            </div>
          )}
          <div>
            <h1 className="text-3xl text-gray-900 font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-gray-500 mt-2 font-normal">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
