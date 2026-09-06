'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login" className="inline-flex items-center text-xs text-blue-600 hover:underline">
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Sign In
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email and we will send a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="rounded-lg bg-emerald-50 p-4 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                If an account exists for this email, you will receive password reset instructions.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <Input label="Institutional Email" type="email" required />
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
