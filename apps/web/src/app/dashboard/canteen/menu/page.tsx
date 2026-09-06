import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CanteenMenuPage() {
  const menuItems = [
    { id: '1', name: 'Mediterranean Chicken Salad Bowl', category: 'LUNCH', price: '$8.50', status: 'AVAILABLE' },
    { id: '2', name: 'Artisan Espresso / Cappuccino', category: 'BEVERAGES', price: '$3.50', status: 'AVAILABLE' },
    { id: '3', name: 'Vegetarian Panini Sandwich', category: 'SNACKS', price: '$6.00', status: 'AVAILABLE' },
  ];

  return (
    <DashboardLayout role="canteen" userEmail="canteen@ums.edu">
      <Breadcrumbs items={[{ label: 'Canteen', href: '/dashboard/canteen' }, { label: 'Menu' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Cafeteria Menu Catalog</h1>
            <p className="text-sm text-slate-500">Manage daily food offerings, pricing, and dietary tags.</p>
          </div>
          <Button size="sm">Add Menu Item</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Item Name', accessorKey: 'name' },
            { header: 'Meal Category', accessorKey: 'category' },
            { header: 'Price', accessorKey: 'price' },
            {
              header: 'Availability',
              cell: (item) => <Badge variant="success">{item.status}</Badge>,
            },
          ]}
          data={menuItems}
        />
      </div>
    </DashboardLayout>
  );
}
