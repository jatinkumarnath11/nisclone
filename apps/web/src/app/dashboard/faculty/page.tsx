import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, ClipboardList, BookOpen } from 'lucide-react';

export default function FacultyDashboardPage() {
  return (
    <DashboardLayout role="faculty" userEmail="faculty@ums.edu">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Faculty Teaching Portal
          </h1>
          <p className="text-sm text-slate-500">
            Welcome, Dr. Robert Langdon • Associate Professor of Computer Science
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Assigned Sections</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">3 Sections</h3>
                <span className="text-[10px] text-slate-500">CS101, CS302</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Enrolled</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">168 Students</h3>
                <span className="text-[10px] text-emerald-600 font-medium">94% Avg Attendance</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Pending Gradings</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">42 Submissions</h3>
                <span className="text-[10px] text-amber-600 font-medium">Assignment #1</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Lectures Today</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">2 Classes</h3>
                <span className="text-[10px] text-blue-600 font-medium">Next at 09:00 AM</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
