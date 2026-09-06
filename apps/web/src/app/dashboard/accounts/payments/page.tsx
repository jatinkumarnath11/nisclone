import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

export default function AccountsPaymentsPage() {
  const transactions = [
    { id: 'TXN-98421', student: 'Alex Mercer (CS-2025-042)', amount: '$3,500.00', method: 'ONLINE_GATEWAY', date: '2025-08-25', status: 'SUCCESS' },
  ];

  return (
    <DashboardLayout role="accounts" userEmail="accountant@ums.edu">
      <Breadcrumbs items={[{ label: 'Accounts', href: '/dashboard/accounts' }, { label: 'Payments' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Transaction Logs & Receipts</h1>
          <p className="text-sm text-slate-500">Real-time payment gateway confirmations and bank reconciliation logs.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Txn Ref #', accessorKey: 'id' },
            { header: 'Student', accessorKey: 'student' },
            { header: 'Amount Settled', accessorKey: 'amount' },
            { header: 'Payment Method', accessorKey: 'method' },
            { header: 'Date', accessorKey: 'date' },
            {
              header: 'Status',
              cell: (item) => <Badge variant="success">{item.status}</Badge>,
            },
          ]}
          data={transactions}
        />
      </div>
    </DashboardLayout>
  );
}
