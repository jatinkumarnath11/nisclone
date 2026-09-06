'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Set New Password</CardTitle>
            <CardDescription>Enter your new secure account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input label="New Password" type="password" required />
              <Input label="Confirm New Password" type="password" required />
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/login" className="text-xs text-blue-600 hover:underline">
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
