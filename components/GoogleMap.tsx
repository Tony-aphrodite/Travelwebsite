'use client';

export default function GoogleMap({
  lat,
  lng,
  name,
  className = '',
}: {
  lat: number;
  lng: number;
  name: string;
  className?: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const query = encodeURIComponent(name);

  if (!apiKey) {
    return (
      <div className={`bg-ivory-200 rounded-2xl flex items-center justify-center text-charcoal-500 text-sm ${className}`}>
        Mapa no disponible
      </div>
    );
  }

  return (
    <iframe
      className={`rounded-2xl border-0 ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&center=${lat},${lng}&zoom=14`}
      allowFullScreen
      title={`Mapa de ${name}`}
    />
  );
}
