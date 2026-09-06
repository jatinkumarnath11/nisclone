import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function AdminDepartmentsPage() {
  const departments = [
    { id: '1', code: 'CSE', name: 'Computer Science and Engineering', campus: 'Apex Main Campus', programs: 3 },
    { id: '2', code: 'ECE', name: 'Electronics and Communication', campus: 'Apex Main Campus', programs: 2 },
  ];

  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Departments' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Academic Departments</h1>
            <p className="text-sm text-slate-500">Configure university faculties, schools, and academic divisions.</p>
          </div>
          <Button size="sm">Create Department</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Code', accessorKey: 'code' },
            { header: 'Department Name', accessorKey: 'name' },
            { header: 'Campus', accessorKey: 'campus' },
            { header: 'Programs Offered', accessorKey: 'programs' },
          ]}
          data={departments}
        />
      </div>
    </DashboardLayout>
  );
}
