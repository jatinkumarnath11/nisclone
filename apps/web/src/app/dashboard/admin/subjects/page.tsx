import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function AdminSubjectsPage() {
  const subjects = [
    { id: '1', code: 'CS101', name: 'Algorithms & Data Structures', credits: 4, dept: 'Computer Science' },
    { id: '2', code: 'MATH201', name: 'Discrete Mathematics', credits: 3, dept: 'Mathematics' },
  ];

  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Subjects' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Courses & Subjects</h1>
            <p className="text-sm text-slate-500">Course catalog, syllabus, and credit requirements.</p>
          </div>
          <Button size="sm">Create Subject</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Subject Code', accessorKey: 'code' },
            { header: 'Subject Title', accessorKey: 'name' },
            { header: 'Credits', accessorKey: 'credits' },
            { header: 'Department', accessorKey: 'dept' },
          ]}
          data={subjects}
        />
      </div>
    </DashboardLayout>
  );
}
