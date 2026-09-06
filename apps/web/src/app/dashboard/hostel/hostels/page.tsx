import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function HostelBlocksPage() {
  const blocks = [
    { id: '1', name: 'Boys Hostel Block A', campus: 'Apex Main Campus', type: 'BOYS', floors: 4, rooms: 120 },
    { id: '2', name: 'Girls Hostel Block B', campus: 'Apex Main Campus', type: 'GIRLS', floors: 4, rooms: 120 },
  ];

  return (
    <DashboardLayout role="hostel" userEmail="hostel@ums.edu">
      <Breadcrumbs items={[{ label: 'Hostel', href: '/dashboard/hostel' }, { label: 'Hostel Blocks' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Hostel Buildings & Blocks</h1>
            <p className="text-sm text-slate-500">Manage residential buildings across campuses.</p>
          </div>
          <Button size="sm">Add Block</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Block Name', accessorKey: 'name' },
            { header: 'Campus', accessorKey: 'campus' },
            { header: 'Type', accessorKey: 'type' },
            { header: 'Floors', accessorKey: 'floors' },
            { header: 'Total Rooms', accessorKey: 'rooms' },
          ]}
          data={blocks}
        />
      </div>
    </DashboardLayout>
  );
}
