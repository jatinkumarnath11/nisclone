import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

export default function StudentAttendancePage() {
  const attendanceData = [
    { id: '1', date: '2025-09-05', course: 'CS101: Data Structures', status: 'PRESENT', topic: 'Binary Search Trees' },
    { id: '2', date: '2025-09-04', course: 'MATH201: Discrete Math', status: 'PRESENT', topic: 'Graph Theory' },
    { id: '3', date: '2025-09-03', course: 'PHY101: Physics II', status: 'LATE', topic: 'Electromagnetism' },
    { id: '4', date: '2025-09-02', course: 'ENG102: Tech Communication', status: 'PRESENT', topic: 'Technical Writing' },
  ];

  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Attendance' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Attendance Records</h1>
          <p className="text-sm text-slate-500">Monitor your daily classroom presence and overall semester standing.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Date', accessorKey: 'date' },
            { header: 'Course', accessorKey: 'course' },
            { header: 'Topic Covered', accessorKey: 'topic' },
            {
              header: 'Status',
              cell: (item) => (
                <Badge variant={item.status === 'PRESENT' ? 'success' : item.status === 'LATE' ? 'warning' : 'destructive'}>
                  {item.status}
                </Badge>
              ),
            },
          ]}
          data={attendanceData}
        />
      </div>
    </DashboardLayout>
  );
}
