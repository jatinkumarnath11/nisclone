import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet } from 'lucide-react';

export default function AccountsReportsPage() {
  return (
    <DashboardLayout role="accounts" userEmail="accountant@ums.edu">
      <Breadcrumbs items={[{ label: 'Accounts', href: '/dashboard/accounts' }, { label: 'Financial Reports' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Audited Financial Statements</h1>
          <p className="text-sm text-slate-500">Revenue forecasts, quarterly reconciliation reports, and fee collection ledgers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Fall 2025 Comprehensive Collection Ledger
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center pt-2">
              <p className="text-xs text-slate-500">Includes all bank transactions, gateway fees, and partial dues</p>
              <Button size="sm" variant="outline"><Download className="mr-1.5 h-3.5 w-3.5" /> CSV Export</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
