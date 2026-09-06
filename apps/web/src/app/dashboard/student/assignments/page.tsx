import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function StudentAssignmentsPage() {
  const assignments = [
    { id: '1', title: 'AVL Trees & Balance Factor', course: 'CS101', dueDate: '2025-09-18', maxScore: 100, status: 'PENDING' },
    { id: '2', title: 'Graph Coloring Proofs', course: 'MATH201', dueDate: '2025-09-22', maxScore: 50, status: 'SUBMITTED' },
  ];

  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Assignments' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Assignments & Submissions</h1>
          <p className="text-sm text-slate-500">Track and upload your coursework submissions.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Title', accessorKey: 'title' },
            { header: 'Course', accessorKey: 'course' },
            { header: 'Due Date', accessorKey: 'dueDate' },
            { header: 'Max Score', accessorKey: 'maxScore' },
            {
              header: 'Status',
              cell: (item) => (
                <Badge variant={item.status === 'SUBMITTED' ? 'success' : 'warning'}>
                  {item.status}
                </Badge>
              ),
            },
            {
              header: 'Action',
              cell: () => <Button size="sm" variant="outline">Upload</Button>,
            },
          ]}
          data={assignments}
        />
      </div>
    </DashboardLayout>
  );
}
