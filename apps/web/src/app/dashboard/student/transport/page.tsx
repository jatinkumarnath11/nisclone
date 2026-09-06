import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, MapPin } from 'lucide-react';

export default function StudentTransportPage() {
  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Transport' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">University Transit & Bus</h1>
          <p className="text-sm text-slate-500">Transit pass, route schedule, and assigned pickup location.</p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bus className="h-5 w-5 text-blue-600" /> Bus #04 - Route North
              </CardTitle>
              <Badge variant="success">Pass Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Boarding Stop</span>
              <span className="font-semibold flex items-center gap-1 text-slate-900 dark:text-white">
                <MapPin className="h-3.5 w-3.5 text-blue-500" /> Tech Square Station
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Morning Pickup</span>
              <span className="font-semibold text-slate-900 dark:text-white">07:45 AM</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Evening Return</span>
              <span className="font-semibold text-slate-900 dark:text-white">05:15 PM</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Driver Contact</span>
              <span className="font-semibold text-slate-900 dark:text-white">Gary Miller (+1 555-0192)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
