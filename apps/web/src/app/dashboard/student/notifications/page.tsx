import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, CheckCircle2 } from 'lucide-react';

export default function StudentNotificationsPage() {
  const alerts = [
    { id: '1', title: 'Midterm Timetable Announcement', message: 'Examination schedule has been published for Fall 2025.', time: '2 hours ago' },
    { id: '2', title: 'Tuition Payment Confirmed', message: 'Your payment for Invoice INV-2025-001 has been settled.', time: '1 day ago' },
  ];

  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Notifications' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Notification Feed</h1>
          <p className="text-sm text-slate-500">Real-time alerts, deadlines, and administrative notices.</p>
        </div>

        <div className="space-y-3">
          {alerts.map((a) => (
            <Card key={a.id}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className="rounded-full bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/30">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{a.title}</h3>
                    <span className="text-[11px] text-slate-400">{a.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{a.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
