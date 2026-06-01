'use client';
import { useState, useMemo } from 'react';
import type { UserRow } from '../_lib/types';

export function Usuarios({
  users,
  currentUserId,
  onRoleChange,
}: {
  users: UserRow[];
  currentUserId?: string;
  onRoleChange: (userId: string, role: 'user' | 'admin') => void;
}) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return users;
    return users.filter((u) => (u.name || '').toLowerCase().includes(k) || u.email.toLowerCase().includes(k));
  }, [users, q]);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="field-input max-w-xs"
        />
        <p className="text-xs text-charcoal-500">{filtered.length} usuarias</p>
      </div>
      <div className="card-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
            <tr>
              <th className="px-6 py-3 text-left">Viajera</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Nivel</th>
              <th className="px-6 py-3 text-right">Puntos</th>
              <th className="px-6 py-3 text-left">Rol</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-ivory-200 hover:bg-ivory-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-plum-700 to-rose-700 text-white flex items-center justify-center font-display text-sm">
                    {(u.name || u.email).charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold">{u.name || '—'}</span>
                </td>
                <td className="px-6 py-4 text-charcoal-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="status-pill bg-ivory-200 text-charcoal-700 capitalize">
                    {u.loyaltyTier.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">{u.loyaltyPoints.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    disabled={u.id === currentUserId}
                    onChange={(e) => onRoleChange(u.id, e.target.value as 'user' | 'admin')}
                    className={`text-xs font-semibold rounded-full px-3 py-1 border ${
                      u.role === 'admin'
                        ? 'bg-plum-700/10 text-plum-700 border-plum-700/20'
                        : 'bg-ivory-100 text-charcoal-700 border-ivory-200'
                    } ${u.id === currentUserId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <option value="user">Usuaria</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-charcoal-500">Sin resultados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
