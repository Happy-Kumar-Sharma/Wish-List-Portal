"use client";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import StickyHeader from '@/components/StickyHeader';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast, ToastContainer } = useToast();
  async function handleRegister(data: any) {
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      // Send welcome email using FormSubmit from the client
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(data.email)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: data.fullName,
            email: data.email,
            subject: 'Welcome to Wish List Portal',
            message: `Hello ${data.fullName},\nYour registration is successful!`
          })
        });
      } catch (e) {
        // Ignore email errors, just show toast
      }
      toast({
        title: 'Registration Successful',
        description: 'A welcome email has been sent to your address.'
      });
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } else {
      setError(result.error || 'Registration failed');
      toast({
        title: 'Registration Failed',
        description: result.error || 'Registration failed',
        variant: 'destructive'
      });
    }
  }
  return (
    <>
      <StickyHeader />
      <ToastContainer />
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
