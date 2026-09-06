import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Apex University Management System (UMS)',
    template: '%s | Apex UMS',
  },
  description:
    'Comprehensive enterprise campus management platform for students, faculty, parents, administrators, and staff.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
        {children}
      </body>
    </html>
  );
}
