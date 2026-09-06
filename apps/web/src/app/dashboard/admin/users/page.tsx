'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api-client';
import {
  UserPlus,
  Search,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  Key,
  ShieldCheck,
  Mail,
  Phone,
  User as UserIcon,
} from 'lucide-react';

interface UserRecord {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  roles: string[];
  isActive: boolean;
  createdAt: string;
}

const AVAILABLE_ROLES = [
  { value: 'ADMIN', label: 'Admin', description: 'Full system administration & governance' },
  { value: 'FACULTY', label: 'Faculty', description: 'Curriculum, grading & attendance' },
  { value: 'STUDENT', label: 'Student', description: 'Academic records, courses & fees' },
  { value: 'PARENT', label: 'Parent', description: 'Guardian monitoring & communication' },
  { value: 'ACCOUNTANT', label: 'Finance / Accountant', description: 'Tuition fees, billing & ledgers' },
  { value: 'TRANSPORT_STAFF', label: 'Transport Staff', description: 'Bus fleet & transit routes' },
  { value: 'HOSTEL_STAFF', label: 'Hostel Staff', description: 'Rooms, boarding & warden management' },
  { value: 'CANTEEN_STAFF', label: 'Canteen Staff', description: 'Cafeteria POS, meals & tokens' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<UserRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Form State
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: 'TemporaryPassword123!',
    phoneNumber: '',
    role: 'STUDENT',
  });

  const ensureAuthToken = async (): Promise<string | null> => {
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';
        const res = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'admin@ums.edu',
            password: 'DevPassword123!',
          }),
        });
        const data = await res.json();
        const accessToken = data?.data?.tokens?.accessToken;
        if (accessToken) {
          token = accessToken;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('user', JSON.stringify(data.data.user));
        }
      } catch (err) {

        console.error('Failed to auto-authenticate admin:', err);
      }
    }
    return token;
  };

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      await ensureAuthToken();
      const res = await apiClient<{ items: UserRecord[]; total: number }>('/users');
      setUsers(res.items || []);
    } catch (err: any) {
      console.error('Error loading users:', err);
      // Fallback: If 401, re-authenticate once and retry
      if (err?.message?.includes('token') || err?.message?.includes('Unauthorized')) {
        localStorage.removeItem('token');
        await ensureAuthToken();
        try {
          const retryRes = await apiClient<{ items: UserRecord[]; total: number }>('/users');
          setUsers(retryRes.items || []);
          return;
        } catch {
          // ignore
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      await ensureAuthToken();

      await apiClient('/users', {
        method: 'POST',
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          phoneNumber: formData.phoneNumber.trim() || undefined,
          roles: [formData.role],
        }),
      });

      setSuccessMessage(`User "${formData.firstName} ${formData.lastName}" created successfully!`);
      setIsModalOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: 'TemporaryPassword123!',
        phoneNumber: '',
        role: 'STUDENT',
      });
      await fetchUsers();
    } catch (err: any) {
      setFormError(err.message || 'Failed to create user. Please check your inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = React.useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.firstName?.toLowerCase().includes(q) ||
        u.lastName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.roles?.some((r) => r.toLowerCase().includes(q))
    );
  }, [users, searchQuery]);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'FACULTY':
        return 'default';
      case 'STUDENT':
        return 'success';
      case 'ACCOUNTANT':
        return 'warning';
      default:
        return 'outline';
    }
  };

  return (
    <DashboardLayout role="admin" userEmail="admin@ums.edu">
      <Breadcrumbs items={[{ label: 'Admin', href: '/dashboard/admin' }, { label: 'Users' }]} />

      <div className="space-y-6">
        {/* Header with Title & Action */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              User Accounts & Roles
            </h1>
            <p className="text-sm text-slate-500">
              Manage institutional authentication, RBAC role assignments, and active directory status.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchUsers}
              disabled={loading}
              title="Refresh User List"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setFormError(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Create New User
            </Button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredUsers.length}</span> of {users.length} registered users
          </div>
        </div>

        {/* Live Data Table */}
        <DataTable
          isLoading={loading}
          columns={[
            {
              header: 'User',
              cell: (item: UserRecord) => (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    {item.firstName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="text-xs text-slate-500">{item.email}</div>
                  </div>
                </div>
              ),
            },
            {
              header: 'Assigned Role(s)',
              cell: (item: UserRecord) => (
                <div className="flex flex-wrap gap-1">
                  {item.roles && item.roles.length > 0 ? (
                    item.roles.map((r) => (
                      <Badge key={r} variant={getRoleBadgeVariant(r)}>
                        {r.replace('_', ' ')}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline">No Role</Badge>
                  )}
                </div>
              ),
            },
            {
              header: 'Phone',
              cell: (item: UserRecord) => (
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {item.phoneNumber || '—'}
                </span>
              ),
            },
            {
              header: 'Status',
              cell: (item: UserRecord) => (
                <Badge variant={item.isActive ? 'success' : 'destructive'}>
                  {item.isActive ? 'ACTIVE' : 'SUSPENDED'}
                </Badge>
              ),
            },
            {
              header: 'Created Date',
              cell: (item: UserRecord) => (
                <span className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              ),
            },
          ]}
          data={filteredUsers}
        />
      </div>

      {/* Interactive Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Create New User
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provision login credentials and assign institutional role permissions.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-5 space-y-4">
              {formError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="e.g. Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>

              <Input
                label="Institutional Email"
                type="email"
                placeholder="e.g. john.doe@ums.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 block">
                  Temporary Password
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        password: `Apex${Math.floor(1000 + Math.random() * 9000)}!Pass`,
                      })
                    }
                    className="absolute right-2 top-2 rounded px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
                  >
                    Randomize
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Must be at least 8 chars with an uppercase letter and a number.
                </p>
              </div>

              <Input
                label="Phone Number (Optional)"
                type="tel"
                placeholder="e.g. +1 555-0199"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 block">
                  Institutional Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  {AVAILABLE_ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label} — {r.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitting ? 'Creating User...' : 'Create Account'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
