import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Users,
  Building,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
              A
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                Apex University
              </span>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Management System
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link href="/academics" className="hover:text-blue-600 dark:hover:text-blue-400">
              Academics
            </Link>
            <Link href="/admissions" className="hover:text-blue-600 dark:hover:text-blue-400">
              Admissions
            </Link>
            <Link href="/departments" className="hover:text-blue-600 dark:hover:text-blue-400">
              Departments
            </Link>
            <Link href="/notices" className="hover:text-blue-600 dark:hover:text-blue-400">
              Notices
            </Link>
            <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard/student">
              <Button size="sm">
                Access Portal <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300 mb-6">
            <Shield className="h-3.5 w-3.5" />
            Enterprise University Management Platform
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            Unified Campus Intelligence, Real-time Operations & Academic Excellence
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            A next-generation platform interconnecting students, faculty, administration, parents,
            and campus logistics in real time.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="px-8">
                Login to Your Dashboard
              </Button>
            </Link>
            <Link href="/admissions">
              <Button size="lg" variant="outline" className="px-8">
                Explore Admissions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Role Navigation Cards */}
      <section className="container mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Role Portals & Dashboards
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Select a portal to explore role-specific features and interfaces
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Student Portal',
              role: 'student',
              href: '/dashboard/student',
              desc: 'Attendance, grades, fees, timetable & assignments',
              icon: GraduationCap,
            },
            {
              title: 'Faculty Portal',
              role: 'faculty',
              href: '/dashboard/faculty',
              desc: 'Attendance grading, grade entries & course materials',
              icon: Users,
            },
            {
              title: 'Admin Control Center',
              role: 'admin',
              href: '/dashboard/admin',
              desc: 'System oversight, user security & academic structure',
              icon: Shield,
            },
            {
              title: 'Finance & Accounts',
              role: 'accounts',
              href: '/dashboard/accounts',
              desc: 'Fee structures, invoices, transactions & billing reports',
              icon: Building,
            },
            {
              title: 'Parent Portal',
              role: 'parent',
              href: '/dashboard/parent',
              desc: 'Track academic progress, attendance alerts & fee payments',
              icon: Users,
            },
            {
              title: 'Transport Logistics',
              role: 'transport',
              href: '/dashboard/transport',
              desc: 'Bus routes, driver management & live vehicle tracking',
              icon: Building,
            },
            {
              title: 'Hostel Housing',
              role: 'hostel',
              href: '/dashboard/hostel',
              desc: 'Block administration, bed allocations & maintenance',
              icon: Building,
            },
            {
              title: 'Canteen Services',
              role: 'canteen',
              href: '/dashboard/canteen',
              desc: 'Food menus, daily specials & point-of-sale orders',
              icon: BookOpen,
            },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link key={idx} href={card.href} className="group block">
                <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 Apex International University Management System (UMS). All rights reserved.</p>
      </footer>
    </div>
  );
}
