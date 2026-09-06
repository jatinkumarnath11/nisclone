import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function StudentComplaintsPage() {
  const tickets = [
    { id: 'TKT-104', title: 'WiFi Connectivity in Hostel Block B', category: 'HOSTEL', status: 'RESOLVED', filedOn: '2025-08-25' },
    { id: 'TKT-119', title: 'Library Access Card Re-issue', category: 'GENERAL', status: 'IN_REVIEW', filedOn: '2025-09-02' },
  ];

  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Grievances' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Grievances & Helpdesk</h1>
            <p className="text-sm text-slate-500">Submit requests to academic departments, hostels, or campus maintenance.</p>
          </div>
          <Button size="sm">File New Ticket</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Ticket #', accessorKey: 'id' },
            { header: 'Subject', accessorKey: 'title' },
            { header: 'Category', accessorKey: 'category' },
            { header: 'Date Filed', accessorKey: 'filedOn' },
            {
              header: 'Status',
              cell: (item) => (
                <Badge variant={item.status === 'RESOLVED' ? 'success' : 'warning'}>
                  {item.status}
                </Badge>
              ),
            },
          ]}
          data={tickets}
        />
      </div>
    </DashboardLayout>
  );
}
