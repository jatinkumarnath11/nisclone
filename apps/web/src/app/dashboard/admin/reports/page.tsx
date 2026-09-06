import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export default function AdminReportsPage() {
  const reports = [
    { title: 'Semester Enrollment Breakdown', desc: 'Active student counts across departments and degree levels' },
    { title: 'Fee Collection & Dues Statement', desc: 'Consolidated accounts summary, pending dues and scholarship allocations' },
    { title: 'Faculty Workload & Sections', desc: 'Credit load distribution and lecture hours per faculty' },
    { title: 'Campus Facility Occupancy', desc: 'Hostel and bus fleet capacity utilization rates' },
  ];

  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Reports' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Analytics & Executive Reports</h1>
          <p className="text-sm text-slate-500">Generate and export institutional business intelligence reports.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((r, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" /> {r.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center pt-2">
                <p className="text-xs text-slate-500 max-w-xs">{r.desc}</p>
                <Button size="sm" variant="outline">
                  <Download className="mr-1.5 h-3.5 w-3.5" /> Export PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
