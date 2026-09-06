'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bell, Search, User } from 'lucide-react';

interface NavbarProps {
  userEmail?: string;
  roleName?: string;
}

export function Navbar({ userEmail = 'dev@ums.edu', roleName = 'Student' }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex w-72 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search students, courses, notices..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="View notifications"
          className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-700" />

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <User className="h-4 w-4" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
              {userEmail}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">{roleName}</p>
          </div>
          <Link
            href="/login"
            className="ml-2 text-xs font-medium text-slate-500 hover:text-red-600 dark:text-slate-400"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
