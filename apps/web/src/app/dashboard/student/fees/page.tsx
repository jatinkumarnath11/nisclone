import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function StudentFeesPage() {
  const invoices = [
    { id: 'INV-2025-001', feeName: 'Tuition Fee - Fall 2025', amount: '$3,500.00', paid: '$3,500.00', dueDate: '2025-08-30', status: 'PAID' },
    { id: 'INV-2025-002', feeName: 'Laboratory & Library Fee', amount: '$450.00', paid: '$450.00', dueDate: '2025-09-10', status: 'PAID' },
  ];

  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Fees & Invoices' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Fee Statements & Invoices</h1>
          <p className="text-sm text-slate-500">View semester billing records, receipts, and payment status.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Invoice #', accessorKey: 'id' },
            { header: 'Fee Type', accessorKey: 'feeName' },
            { header: 'Billed Amount', accessorKey: 'amount' },
            { header: 'Paid Amount', accessorKey: 'paid' },
            { header: 'Due Date', accessorKey: 'dueDate' },
            {
              header: 'Status',
              cell: (item) => (
                <Badge variant={item.status === 'PAID' ? 'success' : 'warning'}>
                  {item.status}
                </Badge>
              ),
            },
            {
              header: 'Receipt',
              cell: () => <Button size="sm" variant="ghost">Download PDF</Button>,
            },
          ]}
          data={invoices}
        />
      </div>
    </DashboardLayout>
  );
}
