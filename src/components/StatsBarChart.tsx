"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import React from 'react';

export default function StatsBarChart({ stats }: { stats: any }) {
  const chartData = [
    { name: 'Total Users', value: stats.totalUsers },
    { name: 'Users with Wishes', value: stats.usersWithWishes },
    { name: 'Total Wishes', value: stats.totalWishes },
    { name: 'Purchased', value: stats.purchased },
    { name: 'Not Purchased', value: stats.notPurchased },
  ];
  return (
    <div className="w-full min-h-[400px] h-80 border-4 border-red-500 bg-white flex flex-col items-center justify-center">
      <div className="mb-2 text-red-700 font-bold"></div>
      {chartData.length === 0 ? (
        <div>No data for chart</div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
