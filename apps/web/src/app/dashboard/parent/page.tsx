import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, BookOpen, DollarSign } from 'lucide-react';

export default function ParentDashboardPage() {
  return (
    <DashboardLayout role="parent" userEmail="parent@ums.edu">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Parent Overview Portal
          </h1>
          <p className="text-sm text-slate-500">
            Welcome, Sarah Mercer • Guardian of Alex Mercer (Roll: CS-2025-042)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Registered Ward</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Alex Mercer</h3>
                <span className="text-[10px] text-slate-500">B.S. CS • Semester 1</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Ward Attendance</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">92.4%</h3>
                <span className="text-[10px] text-emerald-600 font-medium">Regular Standing</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Latest GPA</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">3.92 / 4.0</h3>
                <span className="text-[10px] text-emerald-600 font-medium">Dean&apos;s Honor List</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Fee Status</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Paid</h3>
                <span className="text-[10px] text-emerald-600 font-medium">No Outstanding Dues</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
