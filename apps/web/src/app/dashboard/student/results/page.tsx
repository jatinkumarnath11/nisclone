import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

export default function StudentResultsPage() {
  const results = [
    { id: '1', course: 'CS101: Data Structures', exam: 'Midterm Exam', marks: '92/100', grade: 'A+' },
    { id: '2', course: 'MATH201: Discrete Mathematics', exam: 'Midterm Exam', marks: '88/100', grade: 'A' },
  ];

  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Results & Grades' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Examination Results</h1>
          <p className="text-sm text-slate-500">Official grades and transcripts issued by the Examination Controller.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Course', accessorKey: 'course' },
            { header: 'Examination', accessorKey: 'exam' },
            { header: 'Score', accessorKey: 'marks' },
            {
              header: 'Letter Grade',
              cell: (item) => <Badge variant="default">{item.grade}</Badge>,
            },
          ]}
          data={results}
        />
      </div>
    </DashboardLayout>
  );
}
