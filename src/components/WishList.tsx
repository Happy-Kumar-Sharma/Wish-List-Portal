import React from 'react';

export default function WishList({ wishes, onPurchase, onEdit, onDelete, userId }: {
  wishes: any[];
  onPurchase?: (id: number) => void;
  onEdit?: (wish: any) => void;
  onDelete?: (id: number) => void;
  userId?: number;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white">
            <th className="py-3 px-4 text-left rounded-tl-xl">Product</th>
            <th className="py-3 px-4 text-left">Link</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">By</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
          </tr>
        </thead>
  <tbody className="divide-y divide-gray-300">
          {wishes.map(wish => (
            <tr key={wish.id} className={(wish.purchased ? 'bg-gray-100' : 'bg-white') + ' border-b border-gray-300'}>
              <td className="py-3 px-4 font-bold text-lg">
                <span title={wish.productName} className="cursor-pointer">
                  {wish.productName.length > 15 ? wish.productName.slice(0, 15) + '…' : wish.productName}
                </span>
              </td>
              <td className="py-3 px-4">
                <a
                  href={wish.productLink}
                  className="text-blue-600 underline break-all cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={wish.productLink}
                >
                  {wish.productLink.length > 15 ? wish.productLink.slice(0, 15) + '…' : wish.productLink}
                </a>
              </td>
              <td className="py-3 px-4 text-gray-700 text-sm max-w-xs break-words">
                {wish.description
                  ? <span title={wish.description} className="cursor-pointer">{wish.description.length > 15 ? wish.description.slice(0, 15) + '…' : wish.description}</span>
                  : <span className="text-gray-400 italic">—</span>}
              </td>
              <td className="py-3 px-4 text-xs text-gray-500">{wish.user?.fullName || 'Unknown'}</td>
              <td className="py-3 px-4 text-center">
                {wish.purchased ? (
                  <span className="text-green-600 font-semibold">Purchased</span>
                ) : (
                  <span className="text-yellow-600 font-semibold">Not Purchased</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex flex-row gap-2 justify-center items-center">
                  {!wish.purchased && onPurchase && (
                    <div className="relative flex flex-col items-center group">
                      <button
                        className="p-2 rounded-full hover:bg-green-100 transition"
                        onClick={() => onPurchase(wish.id)}
                        aria-label="Mark Purchased"
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 group-hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20 transition">Mark Purchased</span>
                    </div>
                  )}
                  {userId === wish.userId && !wish.purchased && onEdit && (
                    <div className="relative flex flex-col items-center group">
                      <button
                        className="p-2 rounded-full hover:bg-blue-100 transition"
                        onClick={() => onEdit(wish)}
                        aria-label="Edit"
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 group-hover:text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h2v2H7v-2h2z" />
                        </svg>
                      </button>
                      <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20 transition">Edit</span>
                    </div>
                  )}
                  {userId === wish.userId && !wish.purchased && onDelete && (
                    <div className="relative flex flex-col items-center group">
                      <button
                        className="p-2 rounded-full hover:bg-red-100 transition"
                        onClick={() => onDelete(wish.id)}
                        aria-label="Delete"
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 group-hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20 transition">Delete</span>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
