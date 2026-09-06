import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function AdminProgramsPage() {
  const programs = [
    { id: '1', code: 'BS-CS', name: 'Bachelor of Science in Computer Science', dept: 'CSE', duration: '4 Years', semesters: 8 },
    { id: '2', code: 'MS-CS', name: 'Master of Science in Computer Science', dept: 'CSE', duration: '2 Years', semesters: 4 },
  ];

  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Programs' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Degree Programs</h1>
            <p className="text-sm text-slate-500">Degree structures, curriculum durations, and graduation criteria.</p>
          </div>
          <Button size="sm">Add Program</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Code', accessorKey: 'code' },
            { header: 'Program Name', accessorKey: 'name' },
            { header: 'Department', accessorKey: 'dept' },
            { header: 'Duration', accessorKey: 'duration' },
            { header: 'Total Semesters', accessorKey: 'semesters' },
          ]}
          data={programs}
        />
      </div>
    </DashboardLayout>
  );
}
