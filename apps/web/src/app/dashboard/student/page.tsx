import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, Clock, DollarSign } from 'lucide-react';

export default function StudentDashboardPage() {
  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Student Academic Portal
          </h1>
          <p className="text-sm text-slate-500">
            Welcome back, Alex Mercer • B.S. Computer Science • Semester 1
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Overall Attendance</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">92.4%</h3>
                <span className="text-[10px] text-emerald-600 font-medium">Above required (75%)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Enrolled Courses</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">5 Courses</h3>
                <span className="text-[10px] text-slate-500">18 Credits this term</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Pending Tasks</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">2 Due</h3>
                <span className="text-[10px] text-amber-600 font-medium">Algorithm Assignment #1</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Tuition Balance</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">$0.00</h3>
                <Badge variant="success">Fully Settled</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today&apos;s Class Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: '09:00 - 10:30 AM', course: 'CS101: Algorithms', room: 'Hall 101', prof: 'Dr. Robert Langdon' },
                { time: '11:00 - 12:30 PM', course: 'MATH201: Discrete Math', room: 'Hall 204', prof: 'Prof. Gauss' },
              ].map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{slot.course}</h4>
                    <p className="text-xs text-slate-500">{slot.prof} • {slot.room}</p>
                  </div>
                  <span className="text-xs font-mono font-medium text-blue-600">{slot.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Campus Notices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="warning">Academic</Badge>
                  <span className="text-[11px] text-slate-400">Sep 2025</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Midterm Schedule Published</h4>
                <p className="text-xs text-slate-500 mt-1">Midterm examinations for Fall 2025 commence from October 12.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
