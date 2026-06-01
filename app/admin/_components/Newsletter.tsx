'use client';
import { useEffect, useState } from 'react';
import { Loader2, Trash2, Download } from 'lucide-react';
import type { NewsletterRow } from '../_lib/types';

export function Newsletter() {
  const [rows, setRows] = useState<NewsletterRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/newsletter')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setRows(data); })
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar suscripción?')) return;
    const res = await fetch(`/api/admin/newsletter?id=${id}`, { method: 'DELETE' });
    if (res.ok) setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const exportCsv = () => {
    const csv = ['email,fecha\n', ...rows.map((r) => `${r.email},${r.subscribedAt}\n`)].join('');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={28} className="text-plum-700 animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-sm text-charcoal-500">{rows.length} suscriptoras</p>
        <button onClick={exportCsv} className="btn btn-ghost btn-sm" disabled={rows.length === 0}>
          <Download size={14} /> Exportar CSV
        </button>
      </div>
      <div className="card-soft overflow-hidden">
        {rows.length === 0 ? (
          <p className="p-12 text-center text-sm text-charcoal-500">Aún no hay suscriptoras al newsletter.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
              <tr>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-ivory-200 hover:bg-ivory-50">
                  <td className="px-6 py-4 font-mono text-xs">{r.email}</td>
                  <td className="px-6 py-4 text-charcoal-500 text-xs">{new Date(r.subscribedAt).toLocaleString('es-ES')}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => remove(r.id)} className="w-8 h-8 rounded-full bg-ivory-100 hover:bg-rose-100 text-rose-700 inline-flex items-center justify-center" aria-label="Eliminar">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
