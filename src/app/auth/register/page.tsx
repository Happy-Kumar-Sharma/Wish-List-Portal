"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import StickyHeader from '@/components/StickyHeader';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  async function handleRegister(data: any) {
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      router.push('/auth/login');
    } else {
      setError(result.error || 'Registration failed');
    }
  }
  return (
    <>
      <StickyHeader />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 animate-gradient-x pt-20">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full border border-green-200">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">Register for Wish List Portal</h2>
          <AuthForm type="register" onSubmit={handleRegister} error={error} />
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
