'use client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { ImageUploadField } from './ImageUploadField';

export type FieldDef = {
  key: string;
  label: string;
  kind: 'text' | 'number' | 'url' | 'textarea' | 'select' | 'boolean' | 'list' | 'date' | 'image';
  required?: boolean;
  span?: 1 | 2;
  options?: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  folder?: string;
};

export function EntityFormModal({
  title,
  fields,
  initial,
  onSave,
  onClose,
}: {
  title: string;
  fields: FieldDef[];
  initial: Record<string, any>;
  onSave: (data: Record<string, any>) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Record<string, any>>({ ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key: string, v: any) => setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err?.message || 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell title={title} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={f.span === 2 ? 'sm:col-span-2' : ''}>
            <label className="field-label">{f.label}</label>
            {f.kind === 'image' ? (
              <ImageUploadField
                value={form[f.key] ?? ''}
                onChange={(v) => set(f.key, v)}
                required={f.required}
                folder={f.folder}
              />
            ) : f.kind === 'textarea' ? (
              <textarea
                value={form[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                rows={f.rows || 4}
                placeholder={f.placeholder}
                required={f.required}
                className="field-input resize-y"
              />
            ) : f.kind === 'select' ? (
              <select
                value={form[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                required={f.required}
                className="field-input"
              >
                <option value="">—</option>
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : f.kind === 'boolean' ? (
              <label className="flex items-center gap-3 mt-3">
                <input
                  type="checkbox"
                  checked={Boolean(form[f.key])}
                  onChange={(e) => set(f.key, e.target.checked)}
                  className="w-5 h-5 accent-plum-700"
                />
                <span className="text-sm text-charcoal-700">{f.placeholder || 'Activo'}</span>
              </label>
            ) : f.kind === 'list' ? (
              <input
                type="text"
                value={Array.isArray(form[f.key]) ? form[f.key].join(', ') : (form[f.key] ?? '')}
                onChange={(e) => set(f.key, e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                placeholder={f.placeholder || 'separado por comas'}
                className="field-input"
              />
            ) : f.kind === 'date' ? (
              <input
                type="date"
                value={form[f.key] ? String(form[f.key]).slice(0, 10) : ''}
                onChange={(e) => set(f.key, e.target.value || null)}
                className="field-input"
              />
            ) : (
              <input
                type={f.kind === 'number' ? 'number' : f.kind === 'url' ? 'url' : 'text'}
                value={form[f.key] ?? ''}
                onChange={(e) => set(f.key, f.kind === 'number' ? Number(e.target.value) : e.target.value)}
                min={f.min}
                max={f.max}
                step={f.step}
                placeholder={f.placeholder}
                required={f.required}
                className="field-input"
              />
            )}
          </div>
        ))}
        {error && <p className="sm:col-span-2 text-sm text-rose-700">{error}</p>}
        <div className="sm:col-span-2 flex gap-3 mt-2">
          <button type="submit" disabled={saving} className="btn btn-primary btn-md">
            {saving ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Guardando...
              </>
            ) : (
              'Guardar'
            )}
          </button>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-md">
            Cancelar
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
