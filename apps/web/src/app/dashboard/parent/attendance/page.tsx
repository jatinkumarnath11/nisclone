import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

export default function ParentAttendancePage() {
  const records = [
    { id: '1', date: '2025-09-05', course: 'CS101: Algorithms', status: 'PRESENT' },
    { id: '2', date: '2025-09-04', course: 'MATH201: Discrete Math', status: 'PRESENT' },
    { id: '3', date: '2025-09-03', course: 'PHY101: Physics II', status: 'LATE' },
  ];

  return (
    <DashboardLayout role="parent" userEmail="parent@ums.edu">
      <Breadcrumbs items={[{ label: 'Parent', href: '/dashboard/parent' }, { label: 'Attendance' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Ward Attendance Status</h1>
          <p className="text-sm text-slate-500">Alex Mercer - Fall 2025 semester attendance history.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Date', accessorKey: 'date' },
            { header: 'Course', accessorKey: 'course' },
            {
              header: 'Status',
              cell: (item) => (
                <Badge variant={item.status === 'PRESENT' ? 'success' : 'warning'}>{item.status}</Badge>
              ),
            },
          ]}
          data={records}
        />
      </div>
    </DashboardLayout>
  );
}
