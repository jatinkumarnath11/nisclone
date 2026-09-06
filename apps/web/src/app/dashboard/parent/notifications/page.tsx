import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function ParentNotificationsPage() {
  const alerts = [
    { title: 'Midterm Examination Schedule', date: 'Yesterday', text: 'Alex has midterms scheduled starting October 12.' },
    { title: 'Tuition Receipt Available', date: '2 days ago', text: 'Invoice INV-2025-001 receipt has been issued.' },
  ];

  return (
    <DashboardLayout role="parent" userEmail="parent@ums.edu">
      <Breadcrumbs items={[{ label: 'Parent', href: '/dashboard/parent' }, { label: 'Notifications' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Parent Communication & Alerts</h1>
          <p className="text-sm text-slate-500">Official SMS & email alert digest for your ward.</p>
        </div>

        <div className="space-y-3">
          {alerts.map((a, idx) => (
            <Card key={idx}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className="rounded-full bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/30">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{a.title}</h3>
                    <span className="text-[11px] text-slate-400">{a.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{a.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
