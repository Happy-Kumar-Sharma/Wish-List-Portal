import React from 'react';

export default function AdminUserTable({ users }: { users: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Full Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Wishes</th>
            <th className="p-2 text-left">Has Wishes?</th>
            <th className="p-2 text-left">Registered</th>
          </tr>
        </thead>
  <tbody className="divide-y divide-gray-300">
          {users.map(u => (
            <tr key={u.id} className="border-t border-b border-gray-300">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.fullName}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.wishesCount}</td>
              <td className="p-2">{u.hasWishes ? 'Yes' : 'No'}</td>
              <td className="p-2 text-xs">{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
