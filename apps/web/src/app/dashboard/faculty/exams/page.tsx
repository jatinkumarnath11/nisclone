import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function FacultyExamsPage() {
  const exams = [
    { id: '1', title: 'Midterm Examination', course: 'CS101 - Algorithms', totalMarks: 100, weight: '30%', date: '2025-10-15' },
  ];

  return (
    <DashboardLayout role="faculty" userEmail="faculty@ums.edu">
      <Breadcrumbs items={[{ label: 'Faculty', href: '/dashboard/faculty' }, { label: 'Examinations' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Exam Assessments</h1>
            <p className="text-sm text-slate-500">Configure exams, schedules, and grading rubrics.</p>
          </div>
          <Button size="sm">Schedule Exam</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Assessment Title', accessorKey: 'title' },
            { header: 'Course Section', accessorKey: 'course' },
            { header: 'Total Marks', accessorKey: 'totalMarks' },
            { header: 'Weightage', accessorKey: 'weight' },
            { header: 'Exam Date', accessorKey: 'date' },
          ]}
          data={exams}
        />
      </div>
    </DashboardLayout>
  );
}
