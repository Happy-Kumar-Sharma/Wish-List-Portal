"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminUserTable from '@/components/AdminUserTable';
import StickyHeader from '@/components/StickyHeader';

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Access denied');
      return;
    }
    // Decode JWT to check role (without verifying signature, for client-side check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'ADMIN') {
        setError('Access denied');
        return;
      }
    } catch {
      setError('Access denied');
      return;
    }
    fetchUsers(token);
  }, []);
  async function fetchUsers(token: string) {
    const res = await fetch('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setUsers(await res.json());
    } else {
      setError('Access denied or not admin');
    }
  }
  if (error) {
    return (
      <>
        <StickyHeader />
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 animate-gradient-x p-6 pt-20">
          <div className="bg-white/80 p-8 rounded-2xl shadow-2xl border border-blue-200 text-center text-red-600 text-xl font-bold">
            {error}
          </div>
        </main>
      </>
    );
  }
  return (
    <>
      <StickyHeader />
      <main className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 animate-gradient-x p-6 pt-20">
        <div className="max-w mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-blue-200">
          <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Admin Dashboard</h1>
          <AdminUserTable users={users} />
        </div>
        <style jsx global>{`
          @keyframes gradient-x {
            0%, 100% { background-position: left; }
            50% { background-position: right; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 8s ease-in-out infinite;
          }
        `}</style>
      </main>
    </>
  );
}
