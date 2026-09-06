'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Users,
  Calendar,
  ClipboardList,
  DollarSign,
  Bus,
  Building,
  Utensils,
  Bell,
  Settings,
  BookOpen,
  Home,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  role?: string;
}

export function Sidebar({ role = 'student' }: SidebarProps) {
  const pathname = usePathname();

  const roleNavItems: Record<string, NavItem[]> = {
    admin: [
      { label: 'Overview', href: '/dashboard/admin', icon: Home },
      { label: 'Users', href: '/dashboard/admin/users', icon: Users },
      { label: 'Students', href: '/dashboard/admin/students', icon: GraduationCap },
      { label: 'Faculty', href: '/dashboard/admin/faculty', icon: Users },
      { label: 'Departments', href: '/dashboard/admin/departments', icon: Building },
      { label: 'Programs', href: '/dashboard/admin/programs', icon: BookOpen },
      { label: 'Subjects', href: '/dashboard/admin/subjects', icon: ClipboardList },
      { label: 'Notices', href: '/dashboard/admin/notices', icon: Bell },
      { label: 'Reports', href: '/dashboard/admin/reports', icon: FileText },
      { label: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
    ],
    student: [
      { label: 'Dashboard', href: '/dashboard/student', icon: Home },
      { label: 'Attendance', href: '/dashboard/student/attendance', icon: Calendar },
      { label: 'Assignments', href: '/dashboard/student/assignments', icon: ClipboardList },
      { label: 'Results & Grades', href: '/dashboard/student/results', icon: BookOpen },
      { label: 'Timetable', href: '/dashboard/student/timetable', icon: Calendar },
      { label: 'Fee Invoices', href: '/dashboard/student/fees', icon: DollarSign },
      { label: 'Hostel', href: '/dashboard/student/hostel', icon: Building },
      { label: 'Transport', href: '/dashboard/student/transport', icon: Bus },
      { label: 'Documents', href: '/dashboard/student/documents', icon: FileText },
      { label: 'Notifications', href: '/dashboard/student/notifications', icon: Bell },
      { label: 'Grievances', href: '/dashboard/student/complaints', icon: MessageSquare },
    ],
    faculty: [
      { label: 'Overview', href: '/dashboard/faculty', icon: Home },
      { label: 'My Students', href: '/dashboard/faculty/students', icon: Users },
      { label: 'Mark Attendance', href: '/dashboard/faculty/attendance', icon: Calendar },
      { label: 'Assignments', href: '/dashboard/faculty/assignments', icon: ClipboardList },
      { label: 'Examinations', href: '/dashboard/faculty/exams', icon: FileText },
      { label: 'Enter Results', href: '/dashboard/faculty/results', icon: BookOpen },
      { label: 'Class Timetable', href: '/dashboard/faculty/timetable', icon: Calendar },
    ],
    parent: [
      { label: 'Dashboard', href: '/dashboard/parent', icon: Home },
      { label: 'Children Overview', href: '/dashboard/parent/children', icon: Users },
      { label: 'Attendance', href: '/dashboard/parent/attendance', icon: Calendar },
      { label: 'Exam Results', href: '/dashboard/parent/results', icon: BookOpen },
      { label: 'Fee Payments', href: '/dashboard/parent/fees', icon: DollarSign },
      { label: 'Alerts', href: '/dashboard/parent/notifications', icon: Bell },
    ],
    accounts: [
      { label: 'Overview', href: '/dashboard/accounts', icon: Home },
      { label: 'Fee Structures', href: '/dashboard/accounts/fees', icon: DollarSign },
      { label: 'Invoices', href: '/dashboard/accounts/invoices', icon: FileText },
      { label: 'Payments', href: '/dashboard/accounts/payments', icon: DollarSign },
      { label: 'Financial Reports', href: '/dashboard/accounts/reports', icon: FileText },
    ],
    transport: [
      { label: 'Dashboard', href: '/dashboard/transport', icon: Home },
      { label: 'Fleet & Buses', href: '/dashboard/transport/buses', icon: Bus },
      { label: 'Routes & Stops', href: '/dashboard/transport/routes', icon: Calendar },
      { label: 'Drivers', href: '/dashboard/transport/drivers', icon: Users },
      { label: 'Live Tracking', href: '/dashboard/transport/tracking', icon: Bus },
    ],
    hostel: [
      { label: 'Overview', href: '/dashboard/hostel', icon: Home },
      { label: 'Hostel Blocks', href: '/dashboard/hostel/hostels', icon: Building },
      { label: 'Rooms & Beds', href: '/dashboard/hostel/rooms', icon: Home },
      { label: 'Allocations', href: '/dashboard/hostel/allocations', icon: Users },
      { label: 'Complaints', href: '/dashboard/hostel/complaints', icon: MessageSquare },
    ],
    canteen: [
      { label: 'Dashboard', href: '/dashboard/canteen', icon: Home },
      { label: 'Food Menu', href: '/dashboard/canteen/menu', icon: Utensils },
      { label: 'Active Orders', href: '/dashboard/canteen/orders', icon: ClipboardList },
      { label: 'Feedback', href: '/dashboard/canteen/complaints', icon: MessageSquare },
    ],
  };

  const navItems = roleNavItems[role] || roleNavItems.student;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            U
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              APEX UMS
            </h2>
            <span className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-400">
              {role} portal
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Academic Term</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Fall 2025</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
