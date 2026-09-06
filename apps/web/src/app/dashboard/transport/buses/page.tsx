import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TransportBusesPage() {
  const buses = [
    { id: '1', busNumber: 'BUS-04', regNo: 'REG-8921-TX', capacity: 54, driver: 'Gary Miller', status: 'ACTIVE' },
    { id: '2', busNumber: 'BUS-07', regNo: 'REG-5512-TX', capacity: 54, driver: 'Arthur Dent', status: 'ACTIVE' },
  ];

  return (
    <DashboardLayout role="transport" userEmail="transport@ums.edu">
      <Breadcrumbs items={[{ label: 'Transport', href: '/dashboard/transport' }, { label: 'Buses' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Bus Fleet Inventory</h1>
            <p className="text-sm text-slate-500">Registered campus buses and service readiness status.</p>
          </div>
          <Button size="sm">Register Bus</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Bus Number', accessorKey: 'busNumber' },
            { header: 'Registration No.', accessorKey: 'regNo' },
            { header: 'Seating Capacity', accessorKey: 'capacity' },
            { header: 'Assigned Driver', accessorKey: 'driver' },
            {
              header: 'Status',
              cell: (item) => <Badge variant="success">{item.status}</Badge>,
            },
          ]}
          data={buses}
        />
      </div>
    </DashboardLayout>
  );
}
