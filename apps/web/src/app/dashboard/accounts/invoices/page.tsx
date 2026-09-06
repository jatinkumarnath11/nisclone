import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AccountsInvoicesPage() {
  const invoices = [
    { id: 'INV-2025-001', student: 'Alex Mercer (CS-2025-042)', amount: '$3,500.00', paid: '$3,500.00', status: 'PAID' },
  ];

  return (
    <DashboardLayout role="accounts" userEmail="accountant@ums.edu">
      <Breadcrumbs items={[{ label: 'Accounts', href: '/dashboard/accounts' }, { label: 'Invoices' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Student Invoices</h1>
            <p className="text-sm text-slate-500">Generate, dispatch, and track student billing statements.</p>
          </div>
          <Button size="sm">Generate Invoices</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Invoice #', accessorKey: 'id' },
            { header: 'Student Name', accessorKey: 'student' },
            { header: 'Total Billed', accessorKey: 'amount' },
            { header: 'Amount Paid', accessorKey: 'paid' },
            {
              header: 'Status',
              cell: (item) => <Badge variant="success">{item.status}</Badge>,
            },
          ]}
          data={invoices}
        />
      </div>
    </DashboardLayout>
  );
}
