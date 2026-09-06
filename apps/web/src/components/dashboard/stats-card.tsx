import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, iconColor = 'text-blue-600 bg-blue-100' }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <div className={cn('rounded-lg p-3', iconColor)}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500">{title}</p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{value}</h3>
          {subtitle && <span className="text-[10px] text-slate-500">{subtitle}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
