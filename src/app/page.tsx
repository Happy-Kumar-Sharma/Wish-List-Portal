
"use client";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Sticky Header */}
      <header className="w-full fixed top-0 z-50 flex flex-col items-center pointer-events-none">
        <div className="w-full bg-blue-700 shadow-lg pointer-events-auto">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-2">
            <div className="flex items-center gap-3">
              <svg width="40" height="40" viewBox="0 0 24 24" className="drop-shadow-lg">
                <defs>
                  <linearGradient id="heartGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heartGradientHeader)" />
              </svg>
              <span className="text-white font-extrabold text-2xl tracking-tight drop-shadow">Wish List Portal</span>
            </div>
            <nav className="flex flex-row gap-3 overflow-x-auto whitespace-nowrap items-center">
              <Link href="/wishes" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Wish List</Link>
              <Link href="/stats" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Stats</Link>
              <Link href="/admin" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all min-w-[120px] text-center">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center pt-32 pb-12 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 shadow-2xl rounded-b-[3rem] relative">
        <div className="flex flex-col items-center animate-fade-in">
          <svg width="90" height="90" viewBox="0 0 24 24" className="mb-4 animate-bounce drop-shadow-xl">
            <defs>
              <linearGradient id="heartGradientHero" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heartGradientHero)" />
          </svg>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-3 text-center tracking-tight">Make Every Wish Count</h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 text-center max-w-2xl">Create, share, and fulfill wishes for your friends and family in a beautiful, easy-to-use portal.</p>
        </div>
      </section>

      {/* Main Card with Actions */}
      <main className="w-full max-w mx-auto -mt-20 mb-10 p-12 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100/80 backdrop-blur-2xl border border-white/30 flex flex-col items-center animate-fade-in">
        <div className="flex flex-row gap-6 w-full justify-center">
          <Link href="/auth/login" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform font-semibold text-lg">Login</Link>
          <Link href="/auth/register" className="bg-gradient-to-r from-green-400 to-blue-400 text-white py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform font-semibold text-lg">Register</Link>
        </div>
      </main>


      {/* Footer */}
      <footer className="w-full text-center py-6 text-gray-500 text-base mt-8">
        <div className="mb-2">&copy; {new Date().getFullYear()} Wish List Portal. All rights reserved.</div>
        <div>
          <a href="#" className="text-purple-500 underline mr-6">Privacy Policy</a>
          <a href="#" className="text-purple-500 underline">Contact</a>
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  );
}
