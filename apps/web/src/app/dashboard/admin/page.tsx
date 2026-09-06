import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Users, GraduationCap, Building, ShieldCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Administrative Control Center
          </h1>
          <p className="text-sm text-slate-500">
            System-wide operational oversight, analytics, and institutional management.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Students</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">4,850</h3>
                <span className="text-[10px] text-emerald-600 font-medium">99.2% Active</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Faculty Members</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">320</h3>
                <span className="text-[10px] text-slate-500">Across 14 Depts</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Campus Units</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">28 Buildings</h3>
                <span className="text-[10px] text-slate-500">1 Main Campus</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Security & RBAC</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">8 Active Roles</h3>
                <span className="text-[10px] text-emerald-600 font-medium">Zero breaches</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
