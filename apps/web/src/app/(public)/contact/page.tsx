import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Contact University Administration
      </h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-6 bg-white dark:bg-slate-900 dark:border-slate-800">
          <Mail className="h-6 w-6 text-blue-600 mb-3" />
          <h2 className="font-semibold text-sm">Email Inquiries</h2>
          <p className="text-xs text-slate-500 mt-1">admissions@apex-university.edu</p>
        </div>
        <div className="border rounded-xl p-6 bg-white dark:bg-slate-900 dark:border-slate-800">
          <Phone className="h-6 w-6 text-blue-600 mb-3" />
          <h2 className="font-semibold text-sm">Campus Helpline</h2>
          <p className="text-xs text-slate-500 mt-1">+1 (800) 555-APEX</p>
        </div>
        <div className="border rounded-xl p-6 bg-white dark:bg-slate-900 dark:border-slate-800">
          <MapPin className="h-6 w-6 text-blue-600 mb-3" />
          <h2 className="font-semibold text-sm">Campus Address</h2>
          <p className="text-xs text-slate-500 mt-1">100 University Blvd, Tech Valley</p>
        </div>
      </div>
    </div>
  );
}
