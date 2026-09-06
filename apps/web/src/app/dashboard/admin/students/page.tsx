import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function AdminStudentsPage() {
  const students = [
    { id: '1', rollNumber: 'CS-2025-042', name: 'Alex Mercer', program: 'BS-CS', semester: 'Sem 1', admissionDate: '2025-08-01' },
  ];

  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Students' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Student Directory</h1>
            <p className="text-sm text-slate-500">All registered undergraduate and postgraduate students.</p>
          </div>
          <Button size="sm">Register Student</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Roll #', accessorKey: 'rollNumber' },
            { header: 'Student Name', accessorKey: 'name' },
            { header: 'Degree Program', accessorKey: 'program' },
            { header: 'Semester', accessorKey: 'semester' },
            { header: 'Admission Date', accessorKey: 'admissionDate' },
          ]}
          data={students}
        />
      </div>
    </DashboardLayout>
  );
}
