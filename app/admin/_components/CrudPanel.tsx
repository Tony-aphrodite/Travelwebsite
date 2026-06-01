'use client';
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { EntityFormModal, type FieldDef } from './EntityForm';

export type Column<T> = {
  key: keyof T;
  label: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => React.ReactNode;
  className?: string;
};

export type CrudConfig<T> = {
  endpoint: string;
  idField: keyof T;
  itemSingular: string;
  itemPlural: string;
  columns: Column<T>[];
  fields: FieldDef[];
  imageField?: keyof T;
  newDefaults: () => Partial<T>;
  prepareSave?: (data: Partial<T>) => Partial<T>;
};

export function CrudPanel<T extends Record<string, any>>({ config }: { config: CrudConfig<T> }) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ data: Partial<T>; isNew: boolean } | null>(null);

  useEffect(() => {
    fetch(config.endpoint)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setRows(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [config.endpoint]);

  const onCreate = () => setEditing({ data: config.newDefaults(), isNew: true });
  const onEdit = (row: T) => setEditing({ data: row, isNew: false });

  const onSave = async (data: Partial<T>) => {
    const prepared = config.prepareSave ? config.prepareSave(data) : data;
    const id = data[config.idField];
    const isNew = editing?.isNew ?? false;
    const url = isNew ? config.endpoint : `${config.endpoint}/${id}`;
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prepared),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'No se pudo guardar');
    }
    const saved = await res.json();
    setRows((prev) => {
      if (isNew) return [saved, ...prev];
      return prev.map((r) => (r[config.idField] === id ? saved : r));
    });
    setEditing(null);
  };

  const onDelete = async (row: T) => {
    const label = String(row[config.columns[0].key] ?? '');
    if (!confirm(`Eliminar "${label}"? Esta accion no se puede deshacer.`)) return;
    const id = row[config.idField];
    const res = await fetch(`${config.endpoint}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r[config.idField] !== id));
    } else {
      alert('No se pudo eliminar');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="text-plum-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <p className="text-sm text-charcoal-500">
          {rows.length} {rows.length === 1 ? config.itemSingular : config.itemPlural}
        </p>
        <button onClick={onCreate} className="btn btn-primary btn-sm">
          <Plus size={14} /> Nuevo
        </button>
      </div>

      <div className="card-soft overflow-hidden">
        {rows.length === 0 ? (
          <p className="p-12 text-center text-sm text-charcoal-500">
            Aún no hay {config.itemPlural}. Crea el primero con el botón “Nuevo”.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ivory-100 text-xs uppercase tracking-wider text-charcoal-500">
                <tr>
                  {config.imageField && <th className="px-4 py-3"></th>}
                  {config.columns.map((c) => (
                    <th
                      key={String(c.key)}
                      className={`px-4 py-3 text-${c.align ?? 'left'} ${c.className ?? ''}`}
                    >
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={String(row[config.idField])} className="border-t border-ivory-200 hover:bg-ivory-50">
                    {config.imageField && (
                      <td className="px-4 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={String(row[config.imageField] ?? '')}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                      </td>
                    )}
                    {config.columns.map((c) => (
                      <td
                        key={String(c.key)}
                        className={`px-4 py-3 text-${c.align ?? 'left'} ${c.className ?? ''}`}
                      >
                        {c.render ? c.render(row) : String(row[c.key] ?? '')}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => onEdit(row)}
                          title="Editar"
                          aria-label="Editar"
                          className="w-8 h-8 rounded-full bg-ivory-100 hover:bg-ivory-200 text-plum-700 flex items-center justify-center"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => onDelete(row)}
                          title="Eliminar"
                          aria-label="Eliminar"
                          className="w-8 h-8 rounded-full bg-ivory-100 hover:bg-rose-100 text-rose-700 flex items-center justify-center"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <EntityFormModal
          title={editing.isNew ? `Nuevo ${config.itemSingular}` : `Editar ${config.itemSingular}`}
          fields={config.fields}
          initial={editing.data as Record<string, any>}
          onClose={() => setEditing(null)}
          onSave={(data) => onSave(data as Partial<T>)}
        />
      )}
    </div>
  );
}
