import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const styles = {
    default: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    destructive: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    outline: 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
