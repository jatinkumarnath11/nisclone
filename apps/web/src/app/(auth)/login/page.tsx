'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('admin@ums.edu');
  const [password, setPassword] = React.useState('DevPassword123!');
  const [role, setRole] = React.useState('admin');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
        ? '/api/v1'
        : (process.env.NEXT_PUBLIC_API_URL || '/api/v1');
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const errorText = await response.text();
        throw new Error('Server returned an unexpected response. Please try again or check connection.');
      }

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData?.error?.message || 'Invalid email or password.');
      }
      if (resData.data?.tokens?.accessToken) {
        localStorage.setItem('token', resData.data.tokens.accessToken);
        localStorage.setItem('refreshToken', resData.data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(resData.data.user));
      }
      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const devRoles = [
    { name: 'Jatin (Admin)', email: 'jatinkumarnath110907@gmail.com', role: 'admin' },
    { name: 'Admin', email: 'admin@ums.edu', role: 'admin' },
    { name: 'Student', email: 'student@ums.edu', role: 'student' },
    { name: 'Faculty', email: 'faculty@ums.edu', role: 'faculty' },
    { name: 'Parent', email: 'parent@ums.edu', role: 'parent' },
    { name: 'Finance', email: 'accountant@ums.edu', role: 'accounts' },
    { name: 'Transport', email: 'transport@ums.edu', role: 'transport' },
    { name: 'Hostel', email: 'hostel@ums.edu', role: 'hostel' },
    { name: 'Canteen', email: 'canteen@ums.edu', role: 'canteen' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">
            Sign In to Apex UMS
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Select a development role or enter credentials to sign in
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Credentials</CardTitle>
            <CardDescription>Enter your institutional email address</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Institutional Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <input type="checkbox" className="rounded border-slate-300" defaultChecked />
                  Remember this device
                </label>
                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

          </CardContent>
        </Card>

        {/* Development Quick Role Switcher */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Quick Dev Login Switcher (Click to fill)
          </p>
          <div className="grid grid-cols-2 gap-2">
            {devRoles.map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() => {
                  setEmail(r.email);
                  setRole(r.role);
                }}
                className={`rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors ${
                  email === r.email
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                    : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
                }`}
              >
                <div className="font-medium">{r.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{r.email}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
