import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Bus, MapPin, Users, Activity } from 'lucide-react';

export default function TransportDashboardPage() {
  return (
    <DashboardLayout role="transport" userEmail="transport@ums.edu">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transit & Fleet Management
          </h1>
          <p className="text-sm text-slate-500">
            University vehicle fleet, bus routes, driver rosters, and live GPS telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                <Bus className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Active Bus Fleet</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">18 Buses</h3>
                <span className="text-[10px] text-emerald-600 font-medium">100% Operational</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Transit Routes</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">12 Routes</h3>
                <span className="text-[10px] text-slate-500">84 Total Stops</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Subscribed Students</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">850 Riders</h3>
                <span className="text-[10px] text-slate-500">Daily Commuters</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Live GPS Stream</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Connected</h3>
                <span className="text-[10px] text-emerald-600 font-medium">Telemetry Online</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
