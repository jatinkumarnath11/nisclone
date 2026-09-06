import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function TransportDriversPage() {
  const drivers = [
    { id: '1', name: 'Gary Miller', license: 'DL-TX-99120', phone: '+1 (555) 0192', bus: 'BUS-04' },
    { id: '2', name: 'Arthur Dent', license: 'DL-TX-42420', phone: '+1 (555) 0142', bus: 'BUS-07' },
  ];

  return (
    <DashboardLayout role="transport" userEmail="transport@ums.edu">
      <Breadcrumbs items={[{ label: 'Transport', href: '/dashboard/transport' }, { label: 'Drivers' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Driver Rosters</h1>
            <p className="text-sm text-slate-500">Commercial driver license records, contact numbers, and vehicle assignments.</p>
          </div>
          <Button size="sm">Register Driver</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Driver Name', accessorKey: 'name' },
            { header: 'Commercial License #', accessorKey: 'license' },
            { header: 'Emergency Contact', accessorKey: 'phone' },
            { header: 'Assigned Bus', accessorKey: 'bus' },
          ]}
          data={drivers}
        />
      </div>
    </DashboardLayout>
  );
}
