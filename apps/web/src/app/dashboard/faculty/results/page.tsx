import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function FacultyResultsPage() {
  const results = [
    { id: '1', roll: 'CS-2025-042', name: 'Alex Mercer', exam: 'Midterm', marks: '92', grade: 'A+' },
  ];

  return (
    <DashboardLayout role="faculty" userEmail="faculty@ums.edu">
      <Breadcrumbs items={[{ label: 'Faculty', href: '/dashboard/faculty' }, { label: 'Enter Results' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Grade & Score Entry</h1>
            <p className="text-sm text-slate-500">Record assessment scores and submit official grade sheets.</p>
          </div>
          <Button size="sm">Save Grades</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Roll #', accessorKey: 'roll' },
            { header: 'Student Name', accessorKey: 'name' },
            { header: 'Exam', accessorKey: 'exam' },
            { header: 'Marks (Out of 100)', accessorKey: 'marks' },
            { header: 'Grade', accessorKey: 'grade' },
          ]}
          data={results}
        />
      </div>
    </DashboardLayout>
  );
}
