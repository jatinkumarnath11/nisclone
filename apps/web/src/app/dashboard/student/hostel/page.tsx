import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, ShieldCheck } from 'lucide-react';

export default function StudentHostelPage() {
  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Hostel' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Hostel Residence</h1>
          <p className="text-sm text-slate-500">Your campus accommodation allocation and facility details.</p>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" /> Boys Hostel Block B
              </CardTitle>
              <Badge variant="success">Active Allocation</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Room Number</span>
              <span className="font-semibold text-slate-900 dark:text-white">Room 204 (Double Occupancy)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Assigned Bed</span>
              <span className="font-semibold text-slate-900 dark:text-white">Bed #2</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">Allocation Date</span>
              <span className="font-semibold text-slate-900 dark:text-white">August 10, 2025</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-600 pt-2">
              <ShieldCheck className="h-4 w-4" /> Warden clearance and room inspection verified
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
