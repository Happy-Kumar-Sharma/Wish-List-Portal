import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';

export default function StatsPanel({ stats }: { stats: any }) {
  const chartData = [
    { name: 'Total Users', value: stats.totalUsers },
    { name: 'Users with Wishes', value: stats.usersWithWishes },
    { name: 'Total Wishes', value: stats.totalWishes },
    { name: 'Purchased', value: stats.purchased },
    { name: 'Not Purchased', value: stats.notPurchased },
  ];
  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto my-6">
      <h2 className="text-xl font-bold mb-4">Portal Statistics</h2>
      <div className="w-full h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <h3 className="font-semibold mb-2">All Wishes</h3>
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white">
              <th className="py-2 px-4 text-left rounded-tl-xl">Product</th>
              <th className="py-2 px-4 text-left">Link</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-left rounded-tr-xl">By</th>
            </tr>
          </thead>
          <tbody>
            {stats.wishes.map((w: any, i: number) => (
              <tr key={i} className={w.purchased ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4 font-medium">{w.productName}</td>
                <td className="py-2 px-4">
                  <a href={w.productLink} className="text-blue-600 underline text-xs break-all" target="_blank" rel="noopener noreferrer">{w.productLink}</a>
                </td>
                <td className="py-2 px-4 text-center">
                  <span className={`text-xs font-semibold ${w.purchased ? 'text-green-600' : 'text-yellow-600'}`}>{w.purchased ? 'Purchased' : 'Not Purchased'}</span>
                </td>
                <td className="py-2 px-4 text-xs text-gray-500">{w.user?.fullName || 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
