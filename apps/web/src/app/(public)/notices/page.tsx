import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PublicNoticesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Official University Notices
      </h1>
      <p className="mt-2 text-sm text-slate-500">Public circulars and university bulletins.</p>
      <div className="mt-6 space-y-4">
        <div className="border rounded-lg p-5 bg-white dark:bg-slate-900 dark:border-slate-800">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Published by Registrar Office</span>
            <span>Fall 2025</span>
          </div>
          <h2 className="text-base font-semibold mt-1">Fall Semester 2025 Academic Calendar Released</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            The full semester schedule including midterm dates and registration deadlines is now accessible.
          </p>
        </div>
      </div>
    </div>
  );
}
