'use client';
import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import type { SiteSettings } from '../_lib/types';

export function Settings() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => setForm(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !form) {
    return <div className="flex items-center justify-center py-20"><Loader2 size={28} className="text-plum-700 animate-spin" /></div>;
  }

  const set = <K extends keyof SiteSettings>(key: K, v: SiteSettings[K]) =>
    setForm((f) => (f ? { ...f, [key]: v } : f));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert('No se pudo guardar');
    }
  };

  return (
    <form onSubmit={save} className="space-y-6 max-w-3xl">
      {/* Precios e impuestos */}
      <section className="card-soft p-6 space-y-4">
        <h3 className="font-display text-xl">Precios e impuestos</h3>
        <p className="text-xs text-charcoal-500 -mt-2">Se aplican automáticamente en el checkout y en las reservas.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Tasa de impuestos (%)">
            <input type="number" min={0} max={100} value={form.taxRate}
              onChange={(e) => set('taxRate', Number(e.target.value))} className="field-input" />
          </Field>
          <Field label="Descuento Aurelia Society (%)">
            <input type="number" min={0} max={50} value={form.memberDiscountPercent}
              onChange={(e) => set('memberDiscountPercent', Number(e.target.value))} className="field-input" />
          </Field>
          <Field label="Moneda">
            <input value={form.currency} onChange={(e) => set('currency', e.target.value)} className="field-input" placeholder="USD" />
          </Field>
          <Field label="Puntos por dólar gastado">
            <input type="number" min={0} max={100} value={form.loyaltyPointsPerDollar}
              onChange={(e) => set('loyaltyPointsPerDollar', Number(e.target.value))} className="field-input" />
          </Field>
        </div>
      </section>

      {/* Niveles Aurelia Society */}
      <section className="card-soft p-6 space-y-4">
        <h3 className="font-display text-xl">Niveles Aurelia Society</h3>
        <p className="text-xs text-charcoal-500 -mt-2">Umbrales en puntos para escalar de nivel.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Silver (mín. puntos)">
            <input type="number" min={0} value={form.silverThreshold}
              onChange={(e) => set('silverThreshold', Number(e.target.value))} className="field-input" />
          </Field>
          <Field label="Rose Gold (mín. puntos)">
            <input type="number" min={0} value={form.roseGoldThreshold}
              onChange={(e) => set('roseGoldThreshold', Number(e.target.value))} className="field-input" />
          </Field>
          <Field label="Platinum (mín. puntos)">
            <input type="number" min={0} value={form.platinumThreshold}
              onChange={(e) => set('platinumThreshold', Number(e.target.value))} className="field-input" />
          </Field>
        </div>
      </section>

      {/* Contacto */}
      <section className="card-soft p-6 space-y-4">
        <h3 className="font-display text-xl">Datos de contacto</h3>
        <p className="text-xs text-charcoal-500 -mt-2">Aparecen en el footer y en las páginas de contacto.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email de contacto">
            <input type="email" value={form.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} className="field-input" />
          </Field>
          <Field label="Teléfono">
            <input value={form.contactPhone} onChange={(e) => set('contactPhone', e.target.value)} className="field-input" />
          </Field>
          <Field label="WhatsApp (formato internacional)">
            <input value={form.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} className="field-input" placeholder="+525500000000" />
          </Field>
          <Field label="Asunto correo de reserva">
            <input value={form.bookingEmailSubject} onChange={(e) => set('bookingEmailSubject', e.target.value)} className="field-input" />
          </Field>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="btn btn-primary btn-md">
          {saving ? <><Loader2 size={14} className="animate-spin" /> Guardando...</> : <><Save size={14} /> Guardar cambios</>}
        </button>
        {saved && <span className="text-sm text-sage-500 font-semibold">✓ Guardado correctamente</span>}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}
