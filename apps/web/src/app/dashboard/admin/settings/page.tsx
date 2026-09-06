import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminSettingsPage() {
  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Settings' }]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">System Settings</h1>
          <p className="text-sm text-slate-500">Institution metadata, semester calendar, and security policies.</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="text-base">Institution Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="University Legal Name" defaultValue="Apex International University" />
            <Input label="Short Code" defaultValue="APEX-UNIV" />
            <Input label="Portal Domain URL" defaultValue="https://apex-university.edu" />
            <Button size="sm">Save Configuration</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
