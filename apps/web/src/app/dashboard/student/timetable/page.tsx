import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function StudentTimetablePage() {
  const schedule = [
    { day: 'Monday', slots: ['09:00 - CS101 (Room 101)', '11:00 - MATH201 (Room 204)'] },
    { day: 'Tuesday', slots: ['10:00 - PHY101 (Lab 3)', '14:00 - ENG102 (Room 102)'] },
    { day: 'Wednesday', slots: ['09:00 - CS101 (Room 101)', '11:00 - MATH201 (Room 204)'] },
    { day: 'Thursday', slots: ['13:00 - CS101 Lab (Computer Lab 1)'] },
    { day: 'Friday', slots: ['10:00 - Seminar / Tutorial (Hall A)'] },
  ];

  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Timetable' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Class Timetable</h1>
          <p className="text-sm text-slate-500">Fall 2025 semester weekly lecture and laboratory schedule.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedule.map((item, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-600 dark:text-blue-400">{item.day}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {item.slots.map((s, sIdx) => (
                  <div key={sIdx} className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                    {s}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
