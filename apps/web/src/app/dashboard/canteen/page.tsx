import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, ClipboardList, DollarSign, Clock } from 'lucide-react';

export default function CanteenDashboardPage() {
  return (
    <DashboardLayout role="canteen" userEmail="canteen@ums.edu">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Canteen & Dining Services
          </h1>
          <p className="text-sm text-slate-500">
            Campus cafeterias, daily dining menu, order processing, and meal plan tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                <Utensils className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Menu Items</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">45 Items</h3>
                <span className="text-[10px] text-emerald-600 font-medium">All Available</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Today&apos;s Orders</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">312 Orders</h3>
                <span className="text-[10px] text-slate-500">Breakfast & Lunch</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Daily Revenue</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">$2,450.00</h3>
                <span className="text-[10px] text-emerald-600 font-medium">POS + Online</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Active Queue</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">6 Orders</h3>
                <span className="text-[10px] text-amber-600 font-medium">Avg wait: 4 mins</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
