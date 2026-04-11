import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Wifi,
  Waves,
  Utensils,
  Car,
  Dumbbell,
  Sparkles,
  Coffee,
  Heart,
  Share2,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { hotels, villas } from '@/lib/data';

const AMENITY_ICONS: Record<string, LucideIcon> = {
  WiFi: Wifi,
  Piscina: Waves,
  Restaurante: Utensils,
  Spa: Sparkles,
  Gimnasio: Dumbbell,
  Parking: Car,
  Desayuno: Coffee,
};

function getIcon(name: string) {
  const key = Object.keys(AMENITY_ICONS).find((k) => name.toLowerCase().includes(k.toLowerCase()));
  return key ? AMENITY_ICONS[key] : Sparkles;
}

export function generateStaticParams() {
  return [
    ...hotels.map((h) => ({ id: h.id })),
    ...villas.map((v) => ({ id: v.id })),
  ];
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotel = hotels.find((h) => h.id === params.id);
  const villa = !hotel ? villas.find((v) => v.id === params.id) : null;

  if (!hotel && !villa) notFound();

  const item = hotel || villa!;
  const gallery = item.gallery;
  const mainImage = gallery[0] || item.image;
  const extraImages = gallery.slice(1, 5);
  const amenities = item.amenities;
  const price = item.price;
  const description = item.description;
  const location = item.location;
  const country = item.country;
  const name = item.name;
  const rating = item.rating;
  const reviewCount = item.reviewCount;
  const ratingLabel = hotel ? hotel.ratingLabel : 'Excepcional';

  return (
    <div className="pt-28 pb-20 bg-ivory-100">
      <div className="container-site">
        {/* Breadcrumbs */}
        <div className="text-xs text-charcoal-500 mb-6 flex gap-2 uppercase tracking-wider">
          <Link href="/" className="text-plum-700">
            Inicio
          </Link>
          <span>/</span>
          <Link href={hotel ? '/hoteles' : '/villas'} className="text-plum-700">
            {hotel ? 'Hoteles' : 'Villas'}
          </Link>
          <span>/</span>
          <span>{name}</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-end mb-6 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-1 text-sm text-charcoal-500 mb-2">
              <MapPin size={14} />
              {location}, {country}
            </div>
            <h1 className="heading-lg">{name}</h1>
            <div className="flex items-center gap-4 mt-3">
              <span className="bg-plum-700 text-white px-3 py-1.5 rounded-lg font-semibold">
                {rating}
              </span>
              <div>
                <div className="text-sm font-semibold">{ratingLabel}</div>
                <div className="text-xs text-charcoal-500">
                  {reviewCount > 0 ? `${reviewCount} opiniones` : 'Nueva propiedad'}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm">
              <Share2 size={16} />
              Compartir
            </button>
            <button className="btn btn-ghost btn-sm">
              <Heart size={16} />
              Guardar
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[280px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
          <div className="col-span-4 md:col-span-2 row-span-2 relative">
            <Image src={mainImage} alt={name} fill className="object-cover" priority sizes="50vw" />
          </div>
          {extraImages.map((img, i) => (
            <div key={i} className="relative hidden md:block">
              <Image
                src={img}
                alt={`${name} ${i + 2}`}
                fill
                className="object-cover"
                sizes="25vw"
              />
              {i === 3 && (
                <div className="absolute inset-0 bg-charcoal-900/40 flex items-center justify-center">
                  <button className="btn btn-gold btn-sm">Ver todas las fotos</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          <div>
            {/* Highlights */}
            <div className="flex items-center gap-4 p-5 bg-rose-100 rounded-2xl mb-8">
              <div className="w-12 h-12 rounded-full bg-plum-700 text-white flex items-center justify-center">
                <Star size={22} fill="currentColor" />
              </div>
              <div>
                <div className="font-semibold text-charcoal-900">
                  Propiedad preferida por viajeras Aurelia
                </div>
                <div className="text-sm text-charcoal-500">
                  Valorada en el top 5% de nuestros hospedajes seleccionados
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="py-8 border-b border-ivory-200">
              <h2 className="heading-md mb-4">Sobre este refugio</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4 text-[15px]">{description}</p>
              <p className="text-charcoal-700 leading-relaxed text-[15px]">
                Nuestra experta Aurelia visita personalmente cada propiedad antes de incluirla en la
                coleccion. Este hotel ha sido seleccionado por su autenticidad, elegancia discreta y
                atencion al detalle que solo los establecimientos verdaderamente especiales pueden
                ofrecer.
              </p>
            </section>

            {/* Amenities */}
            <section className="py-8 border-b border-ivory-200">
              <h2 className="heading-md mb-6">Lo que ofrece</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((a) => {
                  const Icon = getIcon(a);
                  return (
                    <div
                      key={a}
                      className="flex items-center gap-3 p-3 bg-ivory-100 rounded-lg text-sm"
                    >
                      <Icon size={18} className="text-plum-700 flex-shrink-0" />
                      <span>{a}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Location */}
            <section className="py-8 border-b border-ivory-200">
              <h2 className="heading-md mb-4">Ubicacion</h2>
              <div className="bg-gradient-to-br from-rose-100 to-ivory-200 rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(107,44,95,0.3),transparent)]" />
                <div className="text-center relative z-10">
                  <MapPin size={48} className="text-plum-700 mx-auto mb-3" />
                  <div className="font-display text-xl">
                    {location}
                  </div>
                  <div className="text-sm text-charcoal-500">{country}</div>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="py-8">
              <h2 className="heading-md mb-6">Opiniones de viajeras</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Sofia M.',
                    date: 'Marzo 2026',
                    text: 'Un lugar magico. Cada detalle estaba cuidado al maximo. Las vistas desde la habitacion son de otro mundo.',
                  },
                  {
                    name: 'Ana C.',
                    date: 'Febrero 2026',
                    text: 'El servicio fue impecable. Nos hicieron sentir como reinas desde el momento que llegamos. Volveremos sin duda.',
                  },
                ].map((r) => (
                  <div key={r.name} className="card-soft p-6">
                    <div className="text-gold-600 mb-2">★ ★ ★ ★ ★</div>
                    <p className="font-script italic text-[17px] text-charcoal-700 mb-4">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="text-sm">
                      <strong className="text-charcoal-900">{r.name}</strong>
                      <span className="text-charcoal-500 ml-2">· {r.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking card */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="card-soft p-8 shadow-soft-lg">
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-ivory-200">
                <strong className="font-display text-4xl text-plum-700">${price}</strong>
                <span className="text-charcoal-500 text-sm">USD / noche</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="field-label">Entrada</label>
                  <input type="date" defaultValue="2026-05-15" className="field-input" />
                </div>
                <div>
                  <label className="field-label">Salida</label>
                  <input type="date" defaultValue="2026-05-20" className="field-input" />
                </div>
              </div>
              <div className="mb-4">
                <label className="field-label">Huespedes</label>
                <select className="field-input">
                  <option>2 Adultos</option>
                  <option>2 Adultos · 1 Nino</option>
                  <option>4 Adultos</option>
                </select>
              </div>

              <div className="p-5 bg-ivory-100 rounded-xl my-5 text-sm">
                <div className="flex justify-between mb-2">
                  <span>${price} x 5 noches</span>
                  <span>${price * 5}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Impuestos</span>
                  <span>${Math.round(price * 5 * 0.12)}</span>
                </div>
                <div className="flex justify-between text-sage-500">
                  <span>Descuento Aurelia Society</span>
                  <span>-${Math.round(price * 0.05)}</span>
                </div>
                <div className="flex justify-between pt-3 mt-3 border-t border-ivory-300 font-display text-lg text-plum-700 font-semibold">
                  <span>Total</span>
                  <span>${Math.round(price * 5 * 1.12 - price * 0.05)}</span>
                </div>
              </div>

              <Link href="/carrito" className="btn btn-primary btn-lg w-full">
                Reservar ahora
              </Link>
              <p className="text-center text-xs text-charcoal-500 mt-3">
                No se te cobrara aun. Cancelacion gratis.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
