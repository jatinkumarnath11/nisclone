import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function AccountsFeesPage() {
  const feeStructures = [
    { id: '1', name: 'BS-CS Annual Tuition Fee', term: '2025-2026', program: 'BS-CS', amount: '$7,000.00', dueDate: '2025-08-30' },
    { id: '2', name: 'MS-CS Annual Tuition Fee', term: '2025-2026', program: 'MS-CS', amount: '$8,500.00', dueDate: '2025-08-30' },
  ];

  return (
    <DashboardLayout role="accounts" userEmail="accountant@ums.edu">
      <Breadcrumbs items={[{ label: 'Accounts', href: '/dashboard/accounts' }, { label: 'Fee Structures' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tuition Fee Structures</h1>
            <p className="text-sm text-slate-500">Configure program-specific tuition packages and installment deadlines.</p>
          </div>
          <Button size="sm">Create Structure</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Structure Name', accessorKey: 'name' },
            { header: 'Academic Year', accessorKey: 'term' },
            { header: 'Program', accessorKey: 'program' },
            { header: 'Amount', accessorKey: 'amount' },
            { header: 'Due Date', accessorKey: 'dueDate' },
          ]}
          data={feeStructures}
        />
      </div>
    </DashboardLayout>
  );
}
