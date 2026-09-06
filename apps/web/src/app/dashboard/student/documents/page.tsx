import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

export default function StudentDocumentsPage() {
  const documents = [
    { id: '1', title: 'High School Official Transcript', category: 'Academic Credentials', uploadedAt: '2025-08-01', size: '2.4 MB' },
    { id: '2', title: 'National Identity Proof (Passport)', category: 'Identification', uploadedAt: '2025-08-01', size: '1.1 MB' },
    { id: '3', title: 'Medical Fitness Certificate', category: 'Health & Medical', uploadedAt: '2025-08-05', size: '850 KB' },
  ];

  return (
    <DashboardLayout role="student" userEmail="student@ums.edu">
      <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard/student' }, { label: 'Documents' }]} />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Document Vault</h1>
            <p className="text-sm text-slate-500">Stored official records, admission certificates, and transcripts.</p>
          </div>
          <Button size="sm">Upload Document</Button>
        </div>

        <DataTable
          columns={[
            { header: 'Document Title', accessorKey: 'title' },
            { header: 'Category', accessorKey: 'category' },
            { header: 'Uploaded Date', accessorKey: 'uploadedAt' },
            { header: 'File Size', accessorKey: 'size' },
            {
              header: 'Action',
              cell: () => <Button size="sm" variant="outline">View</Button>,
            },
          ]}
          data={documents}
        />
      </div>
    </DashboardLayout>
  );
}
