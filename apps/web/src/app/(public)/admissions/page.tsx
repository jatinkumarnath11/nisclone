import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Admissions & Enrollments
      </h1>
      <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
        Admissions for the upcoming Academic Year 2025-2026 are now open across Engineering, Sciences,
        Business Administration, and Humanities. Apply online or contact our admissions office.
      </p>
    </div>
  );
}
