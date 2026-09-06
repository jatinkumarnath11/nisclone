import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CanteenOrdersPage() {
  const orders = [
    { id: 'ORD-5501', customer: 'Alex Mercer (Student)', items: 'Chicken Salad (1), Espresso (1)', total: '$12.00', status: 'READY' },
    { id: 'ORD-5502', customer: 'Dr. Robert Langdon (Faculty)', items: 'Vegetarian Panini (1)', total: '$6.00', status: 'PREPARING' },
  ];

  return (
    <DashboardLayout role="canteen" userEmail="canteen@ums.edu">
      <Breadcrumbs items={[{ label: 'Canteen', href: '/dashboard/canteen' }, { label: 'Active Orders' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Active Cafeteria Orders</h1>
          <p className="text-sm text-slate-500">Live order queue for dining pickup and point-of-sale tokens.</p>
        </div>

        <DataTable
          columns={[
            { header: 'Order #', accessorKey: 'id' },
            { header: 'Customer', accessorKey: 'customer' },
            { header: 'Items Ordered', accessorKey: 'items' },
            { header: 'Total', accessorKey: 'total' },
            {
              header: 'Status',
              cell: (item) => (
                <Badge variant={item.status === 'READY' ? 'success' : 'warning'}>
                  {item.status}
                </Badge>
              ),
            },
            {
              header: 'Action',
              cell: () => <Button size="sm" variant="outline">Mark Completed</Button>,
            },
          ]}
          data={orders}
        />
      </div>
    </DashboardLayout>
  );
}
