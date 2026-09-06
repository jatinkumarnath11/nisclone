import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AcademicsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Academics & Curriculum
      </h1>
      <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
        Apex University offers globally recognized undergraduate, graduate, and doctoral degree programs
        supported by credit-based semester systems, practical laboratory experiences, and active industry
        partnerships.
      </p>
    </div>
  );
}
