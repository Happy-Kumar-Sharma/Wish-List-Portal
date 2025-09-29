import { useState } from 'react';

export default function WishForm({ onSubmit, initial }: { onSubmit: (data: any) => void; initial?: any }) {
  const [form, setForm] = useState(initial || {
    productName: '',
    productLink: '',
    description: '',
  });
  return (
    <form
      className="space-y-4 bg-white p-6 rounded shadow max-w-md mx-auto"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Product Name"
        value={form.productName}
  onChange={e => setForm((f: typeof form) => ({ ...f, productName: e.target.value }))}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Product Link"
        value={form.productLink}
  onChange={e => setForm((f: typeof form) => ({ ...f, productLink: e.target.value }))}
        required
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description (optional)"
        value={form.description}
  onChange={e => setForm((f: typeof form) => ({ ...f, description: e.target.value }))}
      />
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition" type="submit">
        {initial ? 'Update Wish' : 'Add Wish'}
      </button>
    </form>
  );
}
