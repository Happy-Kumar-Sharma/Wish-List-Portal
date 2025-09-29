"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import StickyHeader from '@/components/StickyHeader';
const StatsBarChart = dynamic(() => import('@/components/StatsBarChart'), { ssr: false });
import { useRouter } from 'next/navigation';

export default function StatsChartsPage() {
  const [stats, setStats] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetch('/api/stats', { cache: 'no-store' })
      .then(res => res.json())
      .then(setStats);
  }, []);
  if (!stats) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  return (
    <>
      <StickyHeader />
      <main className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 animate-gradient-x p-6 pt-20">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-200">
          <h2 className="text-xl font-bold mb-4">Portal Statistics</h2>
          <StatsBarChart stats={stats} />
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
