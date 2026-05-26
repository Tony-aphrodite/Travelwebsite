'use client';

import { useMemo, useState } from 'react';
import { CalendarCheck, Loader2, CheckCircle2 } from 'lucide-react';

type Region = 'us' | 'canada' | 'europa';
type TimeSlot = 'morning' | 'afternoon' | 'evening';

const REGION_OPTIONS: { value: Region; label: string }[] = [
  { value: 'us', label: 'Estados Unidos' },
  { value: 'canada', label: 'Canada' },
  { value: 'europa', label: 'Europa' },
];

const TIMESLOT_OPTIONS: { value: TimeSlot; label: string; hint: string }[] = [
  { value: 'morning', label: 'Manana', hint: '9:00 - 12:00' },
  { value: 'afternoon', label: 'Tarde', hint: '14:00 - 17:00' },
  { value: 'evening', label: 'Noche', hint: '18:00 - 20:00' },
];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function ConsultationForm({ initialRegion }: { initialRegion?: Region }) {
  const [region, setRegion] = useState<Region>(initialRegion ?? 'us');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(todayIso());
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('morning');
  const [topic, setTopic] = useState('');
  const [agree, setAgree] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const minDate = useMemo(() => todayIso(), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!agree) {
      setError('Debes aceptar el contacto para agendar la cita.');
      return;
    }
    if (topic.trim().length < 10) {
      setError('Por favor describe brevemente tu situacion (minimo 10 caracteres).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          preferredDate,
          preferredTimeSlot: timeSlot,
          topic: topic.trim(),
        }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(typeof data.error === 'string' ? data.error : 'No se pudo enviar la solicitud.');
      }
    } catch {
      setError('Error de red. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card-soft p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-sage-300/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-sage-500" />
        </div>
        <h3 className="font-display text-2xl mb-3 text-plum-900">Solicitud recibida</h3>
        <p className="text-charcoal-700 max-w-md mx-auto mb-2">
          Te enviamos una confirmacion a <strong>{email}</strong>.
        </p>
        <p className="text-sm text-charcoal-500 max-w-md mx-auto">
          Nuestra encargada legal te contactara en las proximas 24 horas habiles para confirmar la cita.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-soft p-8 md:p-10 space-y-6">
      <div>
        <label className="field-label">Region de interes</label>
        <div className="grid grid-cols-3 gap-3">
          {REGION_OPTIONS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRegion(r.value)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                region === r.value
                  ? 'border-plum-700 bg-plum-700/5 text-plum-700'
                  : 'border-ivory-300 text-charcoal-700 hover:border-plum-700/50'
              }`}
              aria-pressed={region === r.value}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Nombre completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={80}
            className="field-input"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="field-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="field-input"
            placeholder="tu@correo.com"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Telefono / WhatsApp (opcional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={40}
            className="field-input"
            placeholder="+52 55 1234 5678"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Fecha preferida</label>
          <input
            type="date"
            value={preferredDate}
            min={minDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            required
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label">Franja horaria</label>
          <div className="grid grid-cols-3 gap-2">
            {TIMESLOT_OPTIONS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTimeSlot(t.value)}
                className={`px-2 py-2 rounded-lg border text-[12px] font-medium transition-colors leading-tight ${
                  timeSlot === t.value
                    ? 'border-plum-700 bg-plum-700/5 text-plum-700'
                    : 'border-ivory-300 text-charcoal-700 hover:border-plum-700/50'
                }`}
                aria-pressed={timeSlot === t.value}
              >
                <div>{t.label}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{t.hint}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="field-label">Describe tu situacion</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className="field-input resize-y"
          placeholder="Ejemplo: Estoy planeando solicitar visa de turista para Estados Unidos. He viajado antes a Canada pero no a EE.UU. Tengo dudas sobre los documentos y la entrevista..."
        />
        <div className="text-right text-[11px] text-charcoal-500 mt-1">{topic.length} / 2000</div>
      </div>

      <label className="flex items-start gap-2 text-sm text-charcoal-700">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1"
          required
        />
        <span>
          Acepto que Aurelia me contacte por email/telefono para coordinar esta cita y comparta mi
          informacion con su encargada legal. La consulta inicial es <strong>gratuita y sin compromiso</strong>.
        </span>
      </label>

      {error && (
        <div className="bg-rose-100 text-rose-700 text-sm px-4 py-3 rounded-xl">{error}</div>
      )}

      <div className="flex flex-wrap gap-3 items-center">
        <button type="submit" disabled={submitting} className="btn btn-primary btn-lg">
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Enviando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CalendarCheck size={16} /> Agendar consulta gratuita
            </span>
          )}
        </button>
        <span className="text-xs text-charcoal-500">
          Respondemos en menos de 24 horas habiles.
        </span>
      </div>
    </form>
  );
}
