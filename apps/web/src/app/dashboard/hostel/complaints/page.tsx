import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HostelComplaintsPage() {
  const issues = [
    { id: '1', block: 'Block B', room: '204', issue: 'Air conditioning thermostat issue', filedAt: '2025-09-01', status: 'IN_REVIEW' },
    { id: '2', block: 'Block A', room: '105', issue: 'Plumbing leak in bathroom', filedAt: '2025-08-30', status: 'RESOLVED' },
  ];

  return (
    <DashboardLayout role="hostel" userEmail="hostel@ums.edu">
      <Breadcrumbs items={[{ label: 'Hostel', href: '/dashboard/hostel' }, { label: 'Complaints' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Maintenance Grievances</h1>
          <p className="text-sm text-slate-500">Facility repairs, electrical requests, and sanitation tickets.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Block', accessorKey: 'block' },
            { header: 'Room #', accessorKey: 'room' },
            { header: 'Issue Description', accessorKey: 'issue' },
            { header: 'Reported Date', accessorKey: 'filedAt' },
            {
              header: 'Status',
              cell: (item) => (
                <Badge variant={item.status === 'RESOLVED' ? 'success' : 'warning'}>
                  {item.status}
                </Badge>
              ),
            },
            {
              header: 'Action',
              cell: () => <Button size="sm" variant="outline">Update Status</Button>,
            },
          ]}
          data={issues}
        />
      </div>
    </DashboardLayout>
  );
}
