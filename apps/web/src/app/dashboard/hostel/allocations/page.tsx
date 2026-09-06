import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function HostelAllocationsPage() {
  const allocations = [
    { id: '1', student: 'Alex Mercer (CS-2025-042)', block: 'Block B', room: 'Room 204', bed: 'Bed #2', date: '2025-08-10' },
  ];

  return (
    <DashboardLayout role="hostel" userEmail="hostel@ums.edu">
      <Breadcrumbs items={[{ label: 'Hostel', href: '/dashboard/hostel' }, { label: 'Allocations' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Resident Bed Allocations</h1>
            <p className="text-sm text-slate-500">Student room assignments, check-in verification, and check-out logs.</p>
          </div>
          <Button size="sm">Allocate Bed</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Student', accessorKey: 'student' },
            { header: 'Block', accessorKey: 'block' },
            { header: 'Room #', accessorKey: 'room' },
            { header: 'Bed #', accessorKey: 'bed' },
            { header: 'Allocated Date', accessorKey: 'date' },
          ]}
          data={allocations}
        />
      </div>
    </DashboardLayout>
  );
}
