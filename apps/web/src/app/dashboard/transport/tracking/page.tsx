import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, MapPin, Radio } from 'lucide-react';

export default function TransportTrackingPage() {
  return (
    <DashboardLayout role="transport" userEmail="transport@ums.edu">
      <Breadcrumbs items={[{ label: 'Transport', href: '/dashboard/transport' }, { label: 'Live Tracking' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Live Fleet Telemetry</h1>
          <p className="text-sm text-slate-500">Real-time GPS bus coordinates streamed via Socket.IO.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base flex items-center gap-2">
                <Radio className="h-4 w-4 text-emerald-500 animate-pulse" /> Live Telemetry Feed (Simulated)
              </CardTitle>
              <Badge variant="success">Socket.IO Connected</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <Bus className="h-10 w-10 text-blue-600 mb-2" />
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Interactive Fleet Map View</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Displaying live positions for 18 active vehicles with 5-second socket heartbeat pings.
              </p>
              <div className="mt-4 flex gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
                <span>BUS-04: 30.2672° N, 97.7431° W (32 mph)</span>
                <span>BUS-07: 30.2747° N, 97.7404° W (28 mph)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
