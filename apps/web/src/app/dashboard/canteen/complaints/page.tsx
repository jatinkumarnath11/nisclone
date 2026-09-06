import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CanteenComplaintsPage() {
  const feedback = [
    { id: '1', customer: 'Student Council', issue: 'Request more vegan lunch options in Main Cafeteria', date: '2025-09-02', status: 'IN_REVIEW' },
  ];

  return (
    <DashboardLayout role="canteen" userEmail="canteen@ums.edu">
      <Breadcrumbs items={[{ label: 'Canteen', href: '/dashboard/canteen' }, { label: 'Feedback' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dining Feedback & Grievances</h1>
          <p className="text-sm text-slate-500">Hygiene reports, dietary suggestions, and food service tickets.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Ticket #', accessorKey: 'id' },
            { header: 'Submitted By', accessorKey: 'customer' },
            { header: 'Feedback / Issue', accessorKey: 'issue' },
            { header: 'Date', accessorKey: 'date' },
            {
              header: 'Status',
              cell: (item) => <Badge variant="warning">{item.status}</Badge>,
            },
            {
              header: 'Action',
              cell: () => <Button size="sm" variant="outline">Respond</Button>,
            },
          ]}
          data={feedback}
        />
      </div>
    </DashboardLayout>
  );
}
