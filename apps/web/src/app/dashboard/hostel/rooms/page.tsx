import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HostelRoomsPage() {
  const rooms = [
    { id: '1', block: 'Block A', roomNumber: '101', capacity: 2, availableBeds: 0, status: 'FULL' },
    { id: '2', block: 'Block A', roomNumber: '102', capacity: 2, availableBeds: 1, status: 'AVAILABLE' },
  ];

  return (
    <DashboardLayout role="hostel" userEmail="hostel@ums.edu">
      <Breadcrumbs items={[{ label: 'Hostel', href: '/dashboard/hostel' }, { label: 'Rooms & Beds' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Rooms & Bed Inventory</h1>
            <p className="text-sm text-slate-500">Live room occupancy status and bed allocation availability.</p>
          </div>
          <Button size="sm">Add Room</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Block', accessorKey: 'block' },
            { header: 'Room #', accessorKey: 'roomNumber' },
            { header: 'Capacity', accessorKey: 'capacity' },
            { header: 'Available Beds', accessorKey: 'availableBeds' },
            {
              header: 'Status',
              cell: (item) => (
                <Badge variant={item.status === 'AVAILABLE' ? 'success' : 'outline'}>
                  {item.status}
                </Badge>
              ),
            },
          ]}
          data={rooms}
        />
      </div>
    </DashboardLayout>
  );
}
