import React from 'react';

export default function WishesTable({ wishes }: { wishes: any[] }) {
  return (
    <div className="bg-white p-6 rounded shadow max-w mx-auto my-6">
      <h2 className="text-xl font-bold mb-4">All Wishes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white">
              <th className="py-2 px-4 text-left rounded-tl-xl">Product</th>
              <th className="py-2 px-4 text-left">Link</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-left rounded-tr-xl">By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {wishes.map((w: any, i: number) => (
              <tr key={i} className={(w.purchased ? 'bg-gray-100' : 'bg-white') + ' border-b border-gray-300'}>
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
