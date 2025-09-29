import { useState } from 'react';

export default function AuthForm({ type, onSubmit, error }: { type: 'login' | 'register'; onSubmit: (data: any) => void; error?: string }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  return (
    <form
      className="space-y-4 bg-white p-6 rounded shadow max-w-md mx-auto"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      {type === 'register' && (
        <input
          className="w-full border p-2 rounded"
          placeholder="Full Name"
          value={form.fullName}
          onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
          required
        />
      )}
      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" type="submit">
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
}
