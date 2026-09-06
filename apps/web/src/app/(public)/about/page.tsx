import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        About Apex International University
      </h1>
      <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
        Founded with a commitment to excellence, Apex International University is dedicated to cutting-edge
        research, holistic education, and multidisciplinary innovation. Our centralized University
        Management System ensures transparency, agility, and modern pedagogical environments for thousands
        of students, researchers, and distinguished faculty members across globe-class campuses.
      </p>
    </div>
  );
}
