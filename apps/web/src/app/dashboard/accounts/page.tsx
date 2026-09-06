import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AccountsDashboardPage() {
  return (
    <DashboardLayout role="accounts" userEmail="accountant@ums.edu">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Finance & Accounts Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Tuition fee structures, invoicing, student billing, and collection reconciliation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/30">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Collected Revenue</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">$14.2M</h3>
                <span className="text-[10px] text-emerald-600 font-medium">88% of Projected</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/30">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Outstanding Dues</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">$1.8M</h3>
                <span className="text-[10px] text-amber-600 font-medium">Due in 30 days</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Active Invoices</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">4,850</h3>
                <span className="text-[10px] text-slate-500">Fall 2025 Term</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Scholarships</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">$620K</h3>
                <span className="text-[10px] text-slate-500">142 Beneficiaries</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
