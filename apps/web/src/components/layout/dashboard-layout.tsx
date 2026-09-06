'use client';

import * as React from 'react';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'student' | 'parent' | 'faculty' | 'accounts' | 'transport' | 'hostel' | 'canteen';
  userEmail?: string;
}

export function DashboardLayout({
  children,
  role,
  userEmail,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar role={role} />
      <div className="pl-64">
        <Navbar userEmail={userEmail} roleName={role} />
        <main className="p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
