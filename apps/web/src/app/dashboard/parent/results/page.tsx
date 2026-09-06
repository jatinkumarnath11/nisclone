import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

export default function ParentResultsPage() {
  const results = [
    { id: '1', course: 'CS101: Data Structures', exam: 'Midterm', marks: '92/100', grade: 'A+' },
    { id: '2', course: 'MATH201: Discrete Math', exam: 'Midterm', marks: '88/100', grade: 'A' },
  ];

  return (
    <DashboardLayout role="parent" userEmail="parent@ums.edu">
      <Breadcrumbs items={[{ label: 'Parent', href: '/dashboard/parent' }, { label: 'Results' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Academic Performance & Grades</h1>
          <p className="text-sm text-slate-500">Alex Mercer - Official semester grades and GPA summary.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Course', accessorKey: 'course' },
            { header: 'Assessment', accessorKey: 'exam' },
            { header: 'Score', accessorKey: 'marks' },
            {
              header: 'Grade',
              cell: (item) => <Badge variant="default">{item.grade}</Badge>,
            },
          ]}
          data={results}
        />
      </div>
    </DashboardLayout>
  );
}
