import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function AdminFacultyPage() {
  const facultyList = [
    { id: '1', empId: 'EMP-FAC-001', name: 'Dr. Robert Langdon', department: 'Computer Science', designation: 'Associate Professor' },
  ];

  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Faculty' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Faculty Directory</h1>
            <p className="text-sm text-slate-500">Professors, lecturers, and teaching staff.</p>
          </div>
          <Button size="sm">Add Faculty Member</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Employee ID', accessorKey: 'empId' },
            { header: 'Faculty Name', accessorKey: 'name' },
            { header: 'Department', accessorKey: 'department' },
            { header: 'Designation', accessorKey: 'designation' },
          ]}
          data={facultyList}
        />
      </div>
    </DashboardLayout>
  );
}
