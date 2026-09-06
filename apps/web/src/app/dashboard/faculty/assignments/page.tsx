import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function FacultyAssignmentsPage() {
  const assignments = [
    { id: '1', title: 'AVL Trees Implementation', course: 'CS101', dueDate: '2025-09-18', submissions: '42 / 60' },
  ];

  return (
    <DashboardLayout role="faculty" userEmail="faculty@ums.edu">
      <Breadcrumbs items={[{ label: 'Faculty', href: '/dashboard/faculty' }, { label: 'Assignments' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Assignments Management</h1>
            <p className="text-sm text-slate-500">Create new tasks, download submissions, and grade work.</p>
          </div>
          <Button size="sm">Create Assignment</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Title', accessorKey: 'title' },
            { header: 'Course Section', accessorKey: 'course' },
            { header: 'Due Date', accessorKey: 'dueDate' },
            { header: 'Submissions', accessorKey: 'submissions' },
            {
              header: 'Action',
              cell: () => <Button size="sm" variant="outline">Grade Submissions</Button>,
            },
          ]}
          data={assignments}
        />
      </div>
    </DashboardLayout>
  );
}
