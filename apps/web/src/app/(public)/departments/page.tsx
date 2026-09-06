import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DepartmentsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Academic Departments
      </h1>
      <ul className="mt-6 space-y-4 text-slate-700 dark:text-slate-300">
        <li className="p-4 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-800">
          <h3 className="font-semibold text-lg">Department of Computer Science & Engineering</h3>
          <p className="text-sm text-slate-500">Degree programs in Software Engineering, AI & Cybersecurity.</p>
        </li>
        <li className="p-4 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-800">
          <h3 className="font-semibold text-lg">Department of Electrical & Electronics Engineering</h3>
          <p className="text-sm text-slate-500">Embedded Systems, VLSI, Robotics and Power Systems.</p>
        </li>
      </ul>
    </div>
  );
}
