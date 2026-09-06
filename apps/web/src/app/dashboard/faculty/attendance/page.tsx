import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function FacultyAttendancePage() {
  return (
    <DashboardLayout role="faculty" userEmail="faculty@ums.edu">
      <Breadcrumbs items={[{ label: 'Faculty', href: '/dashboard/faculty' }, { label: 'Mark Attendance' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Classroom Attendance Session</h1>
          <p className="text-sm text-slate-500">Record and verify daily lecture attendance.</p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-base">CS101: Section A - Algorithms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg border">
              <div>
                <p className="text-sm font-semibold">Alex Mercer</p>
                <p className="text-xs text-slate-500">Roll: CS-2025-042</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Present</Button>
                <Button size="sm" variant="outline">Absent</Button>
                <Button size="sm" variant="ghost">Late</Button>
              </div>
            </div>
            <Button className="w-full">Submit Final Attendance</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
