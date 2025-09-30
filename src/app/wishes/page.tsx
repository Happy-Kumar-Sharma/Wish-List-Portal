"use client";
import { useEffect, useState } from 'react';
import StickyHeader from '@/components/StickyHeader';
import WishList from '@/components/WishList';
import WishForm from '@/components/WishForm';

import { useRouter } from 'next/navigation';

export default function WishesPage() {
  const [wishes, setWishes] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [editWish, setEditWish] = useState<any>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchWishes();
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch {}
  }, []);

  async function fetchWishes() {
    const res = await fetch('/api/wishes');
    setWishes(await res.json());
  }

  async function handleAddWish(data: any) {
    setError('');
    const token = localStorage.getItem('token');
    const res = await fetch('/api/wishes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setShowForm(false);
      fetchWishes();
    } else {
      setError('Failed to add wish');
    }
  }

  async function handlePurchase(id: number) {
    const token = localStorage.getItem('token');
    await fetch(`/api/wishes/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchWishes();
  }

  async function handleEditWish(wish: any) {
    setEditWish(wish);
    setShowForm(true);
  }

  async function handleUpdateWish(data: any) {
    const token = localStorage.getItem('token');
    await fetch(`/api/wishes/${editWish.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    setEditWish(null);
    setShowForm(false);
    fetchWishes();
  }

  async function handleDeleteWish(id: number) {
    const token = localStorage.getItem('token');
    await fetch(`/api/wishes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchWishes();
  }

  return (
    <>
      <StickyHeader />
      <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 animate-gradient-x p-6 pt-20">
        <div className="mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-yellow-200">
          <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500">Wish List</h1>
          {user && (
            <button className="mb-4 bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold" onClick={() => { setShowForm(true); setEditWish(null); }}>
              Add Wish
            </button>
          )}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {showForm && (
            <WishForm
              onSubmit={editWish ? handleUpdateWish : handleAddWish}
              initial={editWish}
            />
          )}
          <WishList
            wishes={wishes}
            onPurchase={user ? handlePurchase : undefined}
            onEdit={user ? handleEditWish : undefined}
            onDelete={user ? handleDeleteWish : undefined}
            userId={user?.id}
          />
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
