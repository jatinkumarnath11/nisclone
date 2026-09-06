import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminNoticesPage() {
  const notices = [
    { id: '1', title: 'Fall 2025 Midterm Examination Schedule', priority: 'NORMAL', publishDate: '2025-09-01', target: 'ALL_STUDENTS' },
    { id: '2', title: 'Campus Network Maintenance', priority: 'HIGH', publishDate: '2025-09-05', target: 'ALL' },
  ];

  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Notices' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Broadcast Notices</h1>
            <p className="text-sm text-slate-500">Publish institution-wide circulars, advisories, and urgent alerts.</p>
          </div>
          <Button size="sm">Publish Notice</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Title', accessorKey: 'title' },
            {
              header: 'Priority',
              cell: (item) => (
                <Badge variant={item.priority === 'HIGH' ? 'destructive' : 'default'}>
                  {item.priority}
                </Badge>
              ),
            },
            { header: 'Publish Date', accessorKey: 'publishDate' },
            { header: 'Target Audience', accessorKey: 'target' },
          ]}
          data={notices}
        />
      </div>
    </DashboardLayout>
  );
}
