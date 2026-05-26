import type { Metadata } from 'next';
import { Scale, ShieldCheck, FileCheck2, Plane, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ConsultationForm from '@/components/ConsultationForm';

export const metadata: Metadata = {
  title: 'Asesoría consular — Estados Unidos, Canadá y Europa',
  description:
    'Agenda una consulta gratuita con nuestra encargada legal. Asesoría especializada en visas, trámites consulares y documentación de viaje para Estados Unidos, Canadá y Europa.',
};

const REGIONS = [
  {
    key: 'us' as const,
    title: 'Estados Unidos',
    flag: '🇺🇸',
    desc: 'Visas B1/B2 de turismo y negocios, renovaciones, entrevistas consulares, ESTA, casos previos de negativa.',
    items: ['Visa de turismo B1/B2', 'ESTA y casos sin visa', 'Entrevista consular', 'Cartas de apoyo y patrocinio'],
  },
  {
    key: 'canada' as const,
    title: 'Canadá',
    flag: '🇨🇦',
    desc: 'eTA, visa de visitante (TRV), super visa para padres y abuelos, casos de estudio y biometría.',
    items: ['Visa de visitante (TRV)', 'eTA electronica', 'Super Visa familiar', 'Biometria y documentos'],
  },
  {
    key: 'europa' as const,
    title: 'Europa (Schengen)',
    flag: '🇪🇺',
    desc: 'Visa Schengen de corta estancia para 27 paises europeos, documentacion, seguro de viaje, itinerarios.',
    items: ['Visa Schengen (corta estancia)', 'Seguro de viaje internacional', 'Itinerario y reservas', 'Carta de invitacion'],
  },
];

const PROCESS = [
  { icon: FileCheck2, title: 'Agenda tu consulta', desc: 'Selecciona region, fecha y franja horaria.' },
  { icon: Scale, title: 'Conversa con nuestra encargada legal', desc: 'Videollamada, WhatsApp o presencial — sin compromiso.' },
  { icon: ShieldCheck, title: 'Recibe un plan claro', desc: 'Documentos, tiempos, costos y siguiente paso.' },
  { icon: Plane, title: 'Reserva tu viaje con seguridad', desc: 'Cuando tu visa este lista, Aurelia coordina el resto.' },
];

export default function AsesoriaConsularPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicio especializado"
        title="Asesoria <span class='italic-script'>consular</span> con respaldo legal"
        subtitle="Estados Unidos, Canadá y Europa — agenda una consulta gratuita con nuestra encargada legal para evaluar tu caso antes de viajar."
        crumbs={[{ href: '/', label: 'Inicio' }, { label: 'Asesoria consular' }]}
      />

      {/* Regions */}
      <section className="container-site py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {REGIONS.map((r) => (
            <div key={r.key} className="card-soft p-7 hover:-translate-y-1 transition-transform">
              <div className="text-4xl mb-4">{r.flag}</div>
              <h3 className="font-display text-2xl mb-2 text-plum-900">{r.title}</h3>
              <p className="text-sm text-charcoal-700 mb-5 leading-relaxed">{r.desc}</p>
              <ul className="space-y-2 text-sm">
                {r.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-charcoal-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-ivory-100 py-20">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow">Como funciona</span>
            <h2 className="heading-lg mt-3">
              Cuatro pasos para viajar <span className="italic-script">sin sorpresas</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="card-soft p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-plum-700/10 text-plum-700 flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-gold-700 font-semibold mb-2">
                    Paso {i + 1}
                  </div>
                  <h4 className="font-display text-lg text-plum-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-charcoal-700">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking form + side info */}
      <section className="container-site py-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <div className="mb-8">
              <span className="eyebrow">Agenda tu consulta</span>
              <h2 className="heading-lg mt-3 mb-3">
                Conversa con nuestra <span className="italic-script">encargada legal</span>
              </h2>
              <p className="text-charcoal-700 max-w-2xl">
                La consulta inicial es <strong>gratuita</strong>. Recibiras un plan claro con
                documentos, tiempos y costos antes de tomar cualquier decision.
              </p>
            </div>
            <ConsultationForm />
          </div>

          <aside className="space-y-5 h-fit lg:sticky lg:top-28">
            <div className="card-soft p-6">
              <h3 className="font-display text-lg mb-3 text-plum-900 flex items-center gap-2">
                <Scale size={18} className="text-gold-600" /> Por que con Aurelia
              </h3>
              <ul className="space-y-3 text-sm text-charcoal-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0" />
                  Encargada legal con experiencia en tramites de las 3 regiones.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0" />
                  Acompañamiento desde la asesoria hasta el viaje completo.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0" />
                  Coordinacion con hoteles, vuelos y seguros segun tu visa.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0" />
                  Sin compromiso: solo continuas si te convence el plan.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-ivory-100 border border-ivory-200 p-6">
              <h3 className="font-display text-lg mb-2 text-plum-900 flex items-center gap-2">
                <MapPin size={18} className="text-plum-700" /> Modalidades
              </h3>
              <p className="text-sm text-charcoal-700">
                Videollamada (Google Meet o WhatsApp), llamada telefonica, o presencial en
                nuestra oficina con cita previa.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
