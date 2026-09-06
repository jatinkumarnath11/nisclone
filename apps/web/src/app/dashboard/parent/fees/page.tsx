import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ParentFeesPage() {
  const invoices = [
    { id: 'INV-2025-001', fee: 'Tuition Fee (Fall 2025)', amount: '$3,500.00', status: 'PAID' },
    { id: 'INV-2025-002', fee: 'Lab & Library Fee', amount: '$450.00', status: 'PAID' },
  ];

  return (
    <DashboardLayout role="parent" userEmail="parent@ums.edu">
      <Breadcrumbs items={[{ label: 'Parent', href: '/dashboard/parent' }, { label: 'Fees' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Fee Statements & Billing</h1>
          <p className="text-sm text-slate-500">Alex Mercer - Tuition statements, receipts, and payment receipts.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Invoice #', accessorKey: 'id' },
            { header: 'Description', accessorKey: 'fee' },
            { header: 'Amount', accessorKey: 'amount' },
            {
              header: 'Status',
              cell: (item) => <Badge variant="success">{item.status}</Badge>,
            },
            {
              header: 'Receipt',
              cell: () => <Button size="sm" variant="outline">Receipt PDF</Button>,
            },
          ]}
          data={invoices}
        />
      </div>
    </DashboardLayout>
  );
}
