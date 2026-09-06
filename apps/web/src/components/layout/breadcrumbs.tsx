import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight className="h-3 w-3 text-slate-400" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
