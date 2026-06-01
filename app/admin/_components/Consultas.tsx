'use client';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { ConsultRow } from '../_lib/types';

const STATUS_STYLE: Record<ConsultRow['status'], string> = {
  pending: 'bg-gold-600/15 text-gold-700',
  confirmed: 'bg-sage-500/15 text-sage-500',
  completed: 'bg-plum-700/10 text-plum-700',
  cancelled: 'bg-rose-500/15 text-rose-700',
};
const STATUS_LABEL: Record<ConsultRow['status'], string> = {
  pending: 'Pendiente', confirmed: 'Confirmada', completed: 'Completada', cancelled: 'Cancelada',
};
const REGION_LABEL: Record<ConsultRow['region'], string> = {
  us: 'Estados Unidos', canada: 'Canadá', europa: 'Europa',
};
const SLOT_LABEL: Record<string, string> = {
  morning: 'Mañana', afternoon: 'Tarde', evening: 'Noche',
};

export function Consultas() {
  const [rows, setRows] = useState<ConsultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/consultations')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setRows(data); })
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: number, status: ConsultRow['status'], notes?: string) => {
    const res = await fetch('/api/admin/consultations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, notes }),
    });
    if (res.ok) {
      const updated = await res.json();
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
    } else {
      alert('No se pudo actualizar');
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={28} className="text-plum-700 animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <p className="text-sm text-charcoal-500">{rows.length} solicitudes de asesoría consular</p>
      <div className="card-soft overflow-hidden">
        {rows.length === 0 ? (
          <p className="p-12 text-center text-sm text-charcoal-500">Aún no hay solicitudes recibidas.</p>
        ) : (
          <div className="divide-y divide-ivory-200">
            {rows.map((r) => (
              <div key={r.id} className="p-5">
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-display text-lg">{r.name}</span>
                      <span className="text-xs uppercase tracking-widest text-gold-700">{REGION_LABEL[r.region]}</span>
                      <span className={`status-pill ${STATUS_STYLE[r.status]}`}>{STATUS_LABEL[r.status]}</span>
                    </div>
                    <div className="text-xs text-charcoal-500">
                      {r.email} {r.phone ? ` · ${r.phone}` : ''}
                    </div>
                    <div className="text-xs text-charcoal-500">
                      Preferencia: <strong>{new Date(r.preferredDate).toLocaleDateString('es-ES')}</strong> · {SLOT_LABEL[r.preferredTimeSlot] || r.preferredTimeSlot}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value as ConsultRow['status'])}
                      className={`text-xs font-semibold rounded-full px-3 py-1 border-0 cursor-pointer ${STATUS_STYLE[r.status]}`}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmar</option>
                      <option value="completed">Completar</option>
                      <option value="cancelled">Cancelar</option>
                    </select>
                    <button
                      onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      className="btn btn-ghost btn-sm"
                    >
                      {expanded === r.id ? 'Cerrar' : 'Ver detalles'}
                    </button>
                  </div>
                </div>
                {expanded === r.id && (
                  <div className="mt-4 p-4 bg-ivory-100 rounded-2xl space-y-3">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-charcoal-500 mb-1">Consulta</div>
                      <p className="text-sm text-charcoal-700 whitespace-pre-line">{r.topic}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-charcoal-500 mb-1">Notas internas</div>
                      <textarea
                        defaultValue={r.notes || ''}
                        rows={3}
                        placeholder="Notas para el equipo legal..."
                        className="field-input"
                        onBlur={(e) => {
                          if (e.target.value !== (r.notes || '')) {
                            updateStatus(r.id, r.status, e.target.value);
                          }
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-charcoal-500">
                      Recibido: {new Date(r.createdAt).toLocaleString('es-ES')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
