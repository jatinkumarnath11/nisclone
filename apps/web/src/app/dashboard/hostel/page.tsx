import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Users, Home, MessageSquare } from 'lucide-react';

export default function HostelDashboardPage() {
  return (
    <DashboardLayout role="hostel" userEmail="hostel@ums.edu">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hostel & Housing Administration
          </h1>
          <p className="text-sm text-slate-500">
            Residential blocks, room inventory, student bed allocations, and maintenance grievances.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Hostel Buildings</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">6 Blocks</h3>
                <span className="text-[10px] text-slate-500">Boys, Girls & Co-Ed</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Rooms</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">480 Rooms</h3>
                <span className="text-[10px] text-slate-500">960 Total Beds</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Occupancy Rate</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">91.5%</h3>
                <span className="text-[10px] text-emerald-600 font-medium">878 Residents</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Open Complaints</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">5 Tickets</h3>
                <span className="text-[10px] text-amber-600 font-medium">Under Review</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
