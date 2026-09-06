import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';

export default function FacultyStudentsPage() {
  const students = [
    { id: '1', roll: 'CS-2025-042', name: 'Alex Mercer', course: 'CS101 - Section A', attendance: '95%' },
  ];

  return (
    <DashboardLayout role="faculty" userEmail="faculty@ums.edu">
      <Breadcrumbs items={[{ label: 'Faculty', href: '/dashboard/faculty' }, { label: 'My Students' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Enrolled Students</h1>
          <p className="text-sm text-slate-500">Students registered in your active course sections.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Roll #', accessorKey: 'roll' },
            { header: 'Student Name', accessorKey: 'name' },
            { header: 'Section', accessorKey: 'course' },
            { header: 'Attendance %', accessorKey: 'attendance' },
          ]}
          data={students}
        />
      </div>
    </DashboardLayout>
  );
}
