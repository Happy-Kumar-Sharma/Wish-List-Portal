import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);

  function toast({ title, description, variant }: { title: string; description: string; variant?: "destructive" }) {
    setToasts((prev) => [
      ...prev,
      { id: Date.now(), title, description, variant }
    ]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3500);
  }

  function ToastContainer() {
    return (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded shadow-lg text-white ${t.variant === "destructive" ? "bg-red-600" : "bg-green-600"}`}
          >
            <div className="font-bold">{t.title}</div>
            <div className="text-sm">{t.description}</div>
          </div>
        ))}
      </div>
    );
  }

  return { toast, ToastContainer };
}
