import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StickyHeader() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);
  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    router.push('/auth/login');
  }
  return (
    <header className="w-full fixed top-0 z-50 flex flex-col items-center pointer-events-none">
      <div className="w-full bg-blue-700 shadow-lg pointer-events-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-2">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <svg width="40" height="40" viewBox="0 0 24 24" className="drop-shadow-lg group-hover:scale-105 transition-transform">
              <defs>
                <linearGradient id="heartGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heartGradientHeader)" />
            </svg>
            <span className="text-white font-extrabold text-2xl tracking-tight drop-shadow group-hover:underline">Wish List Portal</span>
          </Link>
          <nav className="flex flex-row gap-3 overflow-x-auto whitespace-nowrap items-center">
            <Link href="/wishes" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Wish List</Link>
            <Link href="/stats" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Stats</Link>
            <Link href="/stats-charts" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Charts</Link>
            <Link href="/admin" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Admin</Link>
            {loggedIn ? (
              <button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Logout</button>
            ) : (
              <Link href="/auth/login" className="ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
