import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function TransportRoutesPage() {
  const routes = [
    { id: '1', name: 'Route 1 - North Tech Valley', source: 'North Gate', destination: 'Main Campus Terminal', stops: 8, bus: 'BUS-04' },
    { id: '2', name: 'Route 2 - Metro Downtown Express', source: 'Central Station', destination: 'Main Campus Terminal', stops: 5, bus: 'BUS-07' },
  ];

  return (
    <DashboardLayout role="transport" userEmail="transport@ums.edu">
      <Breadcrumbs items={[{ label: 'Transport', href: '/dashboard/transport' }, { label: 'Routes' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Bus Routes & Stops</h1>
            <p className="text-sm text-slate-500">Pick-up schedules, geolocation stops, and corridor mappings.</p>
          </div>
          <Button size="sm">Add Route</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Route Name', accessorKey: 'name' },
            { header: 'Source', accessorKey: 'source' },
            { header: 'Destination', accessorKey: 'destination' },
            { header: 'Total Stops', accessorKey: 'stops' },
            { header: 'Assigned Vehicle', accessorKey: 'bus' },
          ]}
          data={routes}
        />
      </div>
    </DashboardLayout>
  );
}
