import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export default function ParentChildrenPage() {
  return (
    <DashboardLayout role="parent" userEmail="parent@ums.edu">
      <Breadcrumbs items={[{ label: 'Parent', href: '/dashboard/parent' }, { label: 'Children Overview' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Registered Children</h1>
          <p className="text-sm text-slate-500">Academic profile, enrollment and current progress.</p>
        </div>

        <Card className="max-w-xl">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-full bg-blue-100 p-4 text-blue-600 dark:bg-blue-900/30">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Alex Mercer</h3>
              <p className="text-xs text-slate-500">Roll: CS-2025-042 • Adm: ADM-2025-001</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">Bachelor of Science in Computer Science (Sem 1)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
