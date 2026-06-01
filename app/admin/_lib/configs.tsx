import type { CrudConfig } from '../_components/CrudPanel';
import type {
  HotelRow, PackageRow, FlightRow, VillaRow, CarRow, ActivityRow,
  DestinationRow, BlogRow, TestimonialRow, PromoRow,
} from './types';
import { slugify, formatCurrency } from '@/lib/utils';

const STOCK_HOTEL = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80';
const STOCK_PKG = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80';
const STOCK_FLIGHT = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80';
const STOCK_VILLA = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80';
const STOCK_CAR = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80';
const STOCK_ACTIVITY = 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=80';
const STOCK_DEST = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80';
const STOCK_BLOG = 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1200&q=80';
const STOCK_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80';

export const HOTEL_CONFIG: CrudConfig<HotelRow> = {
  endpoint: '/api/admin/hotels',
  idField: 'id',
  itemSingular: 'hotel',
  itemPlural: 'hoteles',
  imageField: 'image',
  newDefaults: () => ({
    id: '', name: '', location: '', country: 'México', image: STOCK_HOTEL,
    rating: 4.5, stars: 5, price: 200, ratingLabel: 'Excepcional', description: '',
  }),
  prepareSave: (d) => ({ ...d, id: (d.id && String(d.id).trim()) || slugify(String(d.name)) }),
  columns: [
    { key: 'name', label: 'Nombre' },
    { key: 'location', label: 'Ciudad' },
    { key: 'country', label: 'País' },
    { key: 'price', label: 'Precio/noche', align: 'right', render: (r) => formatCurrency(r.price) },
    { key: 'stars', label: '★', align: 'right' },
  ],
  fields: [
    { key: 'name', label: 'Nombre', kind: 'text', required: true, span: 2 },
    { key: 'location', label: 'Ciudad', kind: 'text', required: true },
    { key: 'country', label: 'País', kind: 'text', required: true },
    { key: 'image', label: 'URL de imagen', kind: 'url', required: true, span: 2 },
    { key: 'price', label: 'Precio (USD/noche)', kind: 'number', required: true, min: 1 },
    { key: 'oldPrice', label: 'Precio anterior (opcional)', kind: 'number', min: 0 },
    { key: 'stars', label: 'Estrellas (1-5)', kind: 'number', required: true, min: 1, max: 5 },
    { key: 'rating', label: 'Rating (0-5)', kind: 'number', required: true, min: 0, max: 5, step: 0.1 },
    { key: 'ratingLabel', label: 'Etiqueta del rating', kind: 'text', placeholder: 'Excepcional' },
    { key: 'description', label: 'Descripción', kind: 'textarea', span: 2, required: true, rows: 4 },
  ],
};

export const PACKAGE_CONFIG: CrudConfig<PackageRow> = {
  endpoint: '/api/admin/packages',
  idField: 'id',
  itemSingular: 'paquete',
  itemPlural: 'paquetes',
  imageField: 'image',
  newDefaults: () => ({
    id: '', title: '', destination: '', image: STOCK_PKG,
    duration: '7 noches', price: 1500, oldPrice: 2000, badge: 'Destacado', description: '',
  }),
  prepareSave: (d) => ({ ...d, id: (d.id && String(d.id).trim()) || slugify(String(d.title)) }),
  columns: [
    { key: 'title', label: 'Título' },
    { key: 'destination', label: 'Destino' },
    { key: 'duration', label: 'Duración' },
    { key: 'price', label: 'Precio', align: 'right', render: (r) => formatCurrency(r.price) },
  ],
  fields: [
    { key: 'title', label: 'Título', kind: 'text', required: true, span: 2 },
    { key: 'destination', label: 'Destino', kind: 'text', required: true },
    { key: 'duration', label: 'Duración', kind: 'text', placeholder: '7 noches', required: true },
    { key: 'image', label: 'URL de imagen', kind: 'url', required: true, span: 2 },
    { key: 'price', label: 'Precio (USD)', kind: 'number', required: true, min: 1 },
    { key: 'oldPrice', label: 'Precio original (USD)', kind: 'number', required: true, min: 0 },
    { key: 'badge', label: 'Etiqueta (badge)', kind: 'text', placeholder: 'Luna de miel', span: 2 },
    { key: 'description', label: 'Descripción', kind: 'textarea', span: 2, required: true, rows: 4 },
  ],
};

export const FLIGHT_CONFIG: CrudConfig<FlightRow> = {
  endpoint: '/api/admin/flights',
  idField: 'id',
  itemSingular: 'vuelo',
  itemPlural: 'vuelos',
  newDefaults: () => ({
    id: '', airline: '', airlineCode: '', fromCode: '', toCode: '',
    fromCity: '', toCity: '', departure: '08:00', arrival: '12:00',
    duration: '4h 0m', stops: 0, stopInfo: 'Directo',
    price: 500, cabin: 'Económica', isActive: true,
  }),
  prepareSave: (d) => ({
    ...d,
    id: (d.id && String(d.id).trim()) || `${String(d.airlineCode || 'XX')}-${slugify(`${d.fromCode}-${d.toCode}-${Math.floor(Math.random() * 1000)}`)}`,
    airlineCode: String(d.airlineCode || '').toUpperCase(),
    fromCode: String(d.fromCode || '').toUpperCase(),
    toCode: String(d.toCode || '').toUpperCase(),
  }),
  columns: [
    { key: 'airline', label: 'Aerolínea' },
    { key: 'fromCode', label: 'De', render: (r) => `${r.fromCity} (${r.fromCode})` },
    { key: 'toCode', label: 'A', render: (r) => `${r.toCity} (${r.toCode})` },
    { key: 'cabin', label: 'Cabina' },
    { key: 'price', label: 'Precio', align: 'right', render: (r) => formatCurrency(r.price) },
  ],
  fields: [
    { key: 'airline', label: 'Aerolínea', kind: 'text', required: true },
    { key: 'airlineCode', label: 'Código (2-3 letras)', kind: 'text', required: true, placeholder: 'AM' },
    { key: 'fromCity', label: 'Ciudad origen', kind: 'text', required: true },
    { key: 'fromCode', label: 'Código origen (IATA)', kind: 'text', required: true, placeholder: 'MEX' },
    { key: 'toCity', label: 'Ciudad destino', kind: 'text', required: true },
    { key: 'toCode', label: 'Código destino (IATA)', kind: 'text', required: true, placeholder: 'CDG' },
    { key: 'departure', label: 'Hora salida', kind: 'text', required: true, placeholder: '08:30' },
    { key: 'arrival', label: 'Hora llegada', kind: 'text', required: true, placeholder: '11:45' },
    { key: 'duration', label: 'Duración', kind: 'text', required: true, placeholder: '3h 15m' },
    { key: 'cabin', label: 'Cabina', kind: 'select', required: true, options: [
      { value: 'Económica', label: 'Económica' },
      { value: 'Premium', label: 'Premium' },
      { value: 'Business', label: 'Business' },
      { value: 'Primera', label: 'Primera' },
    ] },
    { key: 'stops', label: 'Escalas', kind: 'number', required: true, min: 0, max: 5 },
    { key: 'stopInfo', label: 'Info de escala', kind: 'text', placeholder: 'Directo', span: 2 },
    { key: 'price', label: 'Precio (USD)', kind: 'number', required: true, min: 1 },
    { key: 'isActive', label: 'Estado', kind: 'boolean', placeholder: 'Activo y visible al público' },
  ],
};

export const VILLA_CONFIG: CrudConfig<VillaRow> = {
  endpoint: '/api/admin/villas',
  idField: 'id',
  itemSingular: 'villa',
  itemPlural: 'villas',
  imageField: 'image',
  newDefaults: () => ({
    id: '', name: '', location: '', country: 'México', image: STOCK_VILLA,
    guests: 6, bedrooms: 3, bathrooms: 2, price: 400, rating: 4.5, description: '',
    isActive: true,
  }),
  prepareSave: (d) => ({ ...d, id: (d.id && String(d.id).trim()) || slugify(String(d.name)) }),
  columns: [
    { key: 'name', label: 'Nombre' },
    { key: 'location', label: 'Ubicación', render: (r) => `${r.location}, ${r.country}` },
    { key: 'guests', label: 'Personas', align: 'right' },
    { key: 'price', label: 'Precio/noche', align: 'right', render: (r) => formatCurrency(r.price) },
  ],
  fields: [
    { key: 'name', label: 'Nombre', kind: 'text', required: true, span: 2 },
    { key: 'location', label: 'Ubicación', kind: 'text', required: true },
    { key: 'country', label: 'País', kind: 'text', required: true },
    { key: 'image', label: 'URL de imagen', kind: 'url', required: true, span: 2 },
    { key: 'guests', label: 'Personas máx.', kind: 'number', required: true, min: 1 },
    { key: 'bedrooms', label: 'Dormitorios', kind: 'number', required: true, min: 1 },
    { key: 'bathrooms', label: 'Baños', kind: 'number', required: true, min: 1 },
    { key: 'price', label: 'Precio (USD/noche)', kind: 'number', required: true, min: 1 },
    { key: 'rating', label: 'Rating (0-5)', kind: 'number', required: true, min: 0, max: 5, step: 0.1 },
    { key: 'description', label: 'Descripción', kind: 'textarea', span: 2, required: true, rows: 4 },
    { key: 'isActive', label: 'Estado', kind: 'boolean', span: 2, placeholder: 'Activa y visible al público' },
  ],
};

export const CAR_CONFIG: CrudConfig<CarRow> = {
  endpoint: '/api/admin/cars',
  idField: 'id',
  itemSingular: 'auto',
  itemPlural: 'autos',
  imageField: 'image',
  newDefaults: () => ({
    id: '', model: '', category: 'Económico', image: STOCK_CAR,
    company: '', seats: 5, transmission: 'Automática', fuel: 'Gasolina',
    price: 50, isActive: true,
  }),
  prepareSave: (d) => ({ ...d, id: (d.id && String(d.id).trim()) || slugify(String(d.model)) }),
  columns: [
    { key: 'model', label: 'Modelo' },
    { key: 'category', label: 'Categoría' },
    { key: 'company', label: 'Compañía' },
    { key: 'transmission', label: 'Trans.' },
    { key: 'price', label: 'Precio/día', align: 'right', render: (r) => formatCurrency(r.price) },
  ],
  fields: [
    { key: 'model', label: 'Modelo', kind: 'text', required: true, span: 2 },
    { key: 'company', label: 'Compañía rental', kind: 'text', required: true },
    { key: 'category', label: 'Categoría', kind: 'select', required: true, options: [
      { value: 'Económico', label: 'Económico' },
      { value: 'Compacto', label: 'Compacto' },
      { value: 'Sedán', label: 'Sedán' },
      { value: 'SUV', label: 'SUV' },
      { value: 'Premium', label: 'Premium' },
      { value: 'Convertible', label: 'Convertible' },
    ] },
    { key: 'image', label: 'URL de imagen', kind: 'url', required: true, span: 2 },
    { key: 'seats', label: 'Asientos', kind: 'number', required: true, min: 1 },
    { key: 'transmission', label: 'Transmisión', kind: 'select', required: true, options: [
      { value: 'Automática', label: 'Automática' },
      { value: 'Manual', label: 'Manual' },
    ] },
    { key: 'fuel', label: 'Combustible', kind: 'select', required: true, options: [
      { value: 'Gasolina', label: 'Gasolina' },
      { value: 'Diesel', label: 'Diésel' },
      { value: 'Híbrido', label: 'Híbrido' },
      { value: 'Eléctrico', label: 'Eléctrico' },
    ] },
    { key: 'price', label: 'Precio (USD/día)', kind: 'number', required: true, min: 1 },
    { key: 'isActive', label: 'Estado', kind: 'boolean', span: 2, placeholder: 'Activo y visible al público' },
  ],
};

export const ACTIVITY_CONFIG: CrudConfig<ActivityRow> = {
  endpoint: '/api/admin/activities',
  idField: 'id',
  itemSingular: 'actividad',
  itemPlural: 'actividades',
  imageField: 'image',
  newDefaults: () => ({
    id: '', title: '', location: '', image: STOCK_ACTIVITY,
    duration: '3 horas', price: 80, rating: 4.7, category: 'Gastronomía',
    description: '', isActive: true,
  }),
  prepareSave: (d) => ({ ...d, id: (d.id && String(d.id).trim()) || slugify(String(d.title)) }),
  columns: [
    { key: 'title', label: 'Título' },
    { key: 'location', label: 'Ubicación' },
    { key: 'category', label: 'Categoría' },
    { key: 'duration', label: 'Duración' },
    { key: 'price', label: 'Precio', align: 'right', render: (r) => formatCurrency(r.price) },
  ],
  fields: [
    { key: 'title', label: 'Título', kind: 'text', required: true, span: 2 },
    { key: 'location', label: 'Ubicación', kind: 'text', required: true },
    { key: 'category', label: 'Categoría', kind: 'select', required: true, options: [
      { value: 'Gastronomía', label: 'Gastronomía' },
      { value: 'Aventura', label: 'Aventura' },
      { value: 'Cultura', label: 'Cultura' },
      { value: 'Bienestar', label: 'Bienestar' },
      { value: 'Naturaleza', label: 'Naturaleza' },
      { value: 'Tours', label: 'Tours' },
    ] },
    { key: 'image', label: 'URL de imagen', kind: 'url', required: true, span: 2 },
    { key: 'duration', label: 'Duración', kind: 'text', required: true, placeholder: '3 horas' },
    { key: 'price', label: 'Precio (USD)', kind: 'number', required: true, min: 1 },
    { key: 'rating', label: 'Rating (0-5)', kind: 'number', required: true, min: 0, max: 5, step: 0.1 },
    { key: 'description', label: 'Descripción', kind: 'textarea', span: 2, required: true, rows: 4 },
    { key: 'isActive', label: 'Estado', kind: 'boolean', span: 2, placeholder: 'Activa y visible al público' },
  ],
};

export const DESTINATION_CONFIG: CrudConfig<DestinationRow> = {
  endpoint: '/api/admin/destinations',
  idField: 'id',
  itemSingular: 'destino',
  itemPlural: 'destinos',
  imageField: 'image',
  newDefaults: () => ({
    id: '', name: '', country: '', image: STOCK_DEST,
    priceFrom: 1000, tagline: '',
  }),
  prepareSave: (d) => ({ ...d, id: (d.id && String(d.id).trim()) || slugify(String(d.name)) }),
  columns: [
    { key: 'name', label: 'Nombre' },
    { key: 'country', label: 'País' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'priceFrom', label: 'Desde', align: 'right', render: (r) => formatCurrency(r.priceFrom) },
  ],
  fields: [
    { key: 'name', label: 'Nombre', kind: 'text', required: true, span: 2 },
    { key: 'country', label: 'País', kind: 'text', required: true },
    { key: 'priceFrom', label: 'Precio desde (USD)', kind: 'number', required: true, min: 1 },
    { key: 'image', label: 'URL de imagen', kind: 'url', required: true, span: 2 },
    { key: 'tagline', label: 'Tagline', kind: 'text', span: 2, required: true, placeholder: 'Frase corta evocadora' },
  ],
};

export const BLOG_CONFIG: CrudConfig<BlogRow> = {
  endpoint: '/api/admin/blog',
  idField: 'id',
  itemSingular: 'artículo',
  itemPlural: 'artículos',
  imageField: 'image',
  newDefaults: () => ({
    slug: '', title: '', excerpt: '', content: '',
    category: 'Inspiración', readTime: '5 min', image: STOCK_BLOG,
    author: 'Aurelia Editorial', isPublished: false,
  }),
  prepareSave: (d) => ({ ...d, slug: (d.slug && String(d.slug).trim()) || slugify(String(d.title)) }),
  columns: [
    { key: 'title', label: 'Título' },
    { key: 'category', label: 'Categoría' },
    { key: 'author', label: 'Autora' },
    { key: 'isPublished', label: 'Estado', render: (r) => (
      r.isPublished
        ? <span className="status-pill bg-sage-500/15 text-sage-500">Publicado</span>
        : <span className="status-pill bg-gold-600/15 text-gold-700">Borrador</span>
    ) },
  ],
  fields: [
    { key: 'title', label: 'Título', kind: 'text', required: true, span: 2 },
    { key: 'slug', label: 'Slug (URL)', kind: 'text', placeholder: 'se genera del título si vacío' },
    { key: 'category', label: 'Categoría', kind: 'select', required: true, options: [
      { value: 'Inspiración', label: 'Inspiración' },
      { value: 'Guías', label: 'Guías' },
      { value: 'Noticias', label: 'Noticias' },
      { value: 'Cultura', label: 'Cultura' },
      { value: 'Gastronomía', label: 'Gastronomía' },
    ] },
    { key: 'author', label: 'Autora', kind: 'text', required: true },
    { key: 'readTime', label: 'Tiempo de lectura', kind: 'text', placeholder: '5 min', required: true },
    { key: 'image', label: 'URL de imagen', kind: 'url', required: true, span: 2 },
    { key: 'excerpt', label: 'Resumen', kind: 'textarea', span: 2, required: true, rows: 3 },
    { key: 'content', label: 'Contenido (Markdown)', kind: 'textarea', span: 2, rows: 12 },
    { key: 'isPublished', label: 'Estado', kind: 'boolean', span: 2, placeholder: 'Publicado (visible en el sitio)' },
  ],
};

export const TESTIMONIAL_CONFIG: CrudConfig<TestimonialRow> = {
  endpoint: '/api/admin/testimonials',
  idField: 'id',
  itemSingular: 'testimonio',
  itemPlural: 'testimonios',
  imageField: 'avatar',
  newDefaults: () => ({
    name: '', trip: '', avatar: STOCK_AVATAR, text: '', isActive: true,
  }),
  columns: [
    { key: 'name', label: 'Nombre' },
    { key: 'trip', label: 'Viaje' },
    { key: 'text', label: 'Comentario', render: (r) => (
      <span className="text-xs text-charcoal-500 line-clamp-2 block max-w-md">{r.text}</span>
    ) },
    { key: 'isActive', label: 'Estado', render: (r) => (
      r.isActive
        ? <span className="status-pill bg-sage-500/15 text-sage-500">Activo</span>
        : <span className="status-pill bg-ivory-200 text-charcoal-500">Oculto</span>
    ) },
  ],
  fields: [
    { key: 'name', label: 'Nombre', kind: 'text', required: true },
    { key: 'trip', label: 'Viaje realizado', kind: 'text', required: true, placeholder: 'Paris · Marzo 2026' },
    { key: 'avatar', label: 'URL del avatar', kind: 'url', required: true, span: 2 },
    { key: 'text', label: 'Comentario', kind: 'textarea', span: 2, required: true, rows: 4 },
    { key: 'isActive', label: 'Estado', kind: 'boolean', span: 2, placeholder: 'Activo y visible al público' },
  ],
};

export const PROMO_CONFIG: CrudConfig<PromoRow> = {
  endpoint: '/api/admin/promos',
  idField: 'id',
  itemSingular: 'código',
  itemPlural: 'códigos',
  newDefaults: () => ({
    code: '', discountPercent: 10, maxUses: null, expiresAt: null, isActive: true,
  }),
  columns: [
    { key: 'code', label: 'Código', render: (r) => (
      <span className="font-mono font-semibold text-plum-700">{r.code}</span>
    ) },
    { key: 'discountPercent', label: 'Descuento', align: 'right', render: (r) => `${r.discountPercent}%` },
    { key: 'currentUses', label: 'Usos', align: 'right', render: (r) => (
      r.maxUses ? `${r.currentUses} / ${r.maxUses}` : `${r.currentUses}`
    ) },
    { key: 'expiresAt', label: 'Expira', render: (r) => (
      r.expiresAt ? new Date(r.expiresAt).toLocaleDateString('es-ES') : 'Sin vencimiento'
    ) },
    { key: 'isActive', label: 'Estado', render: (r) => (
      r.isActive
        ? <span className="status-pill bg-sage-500/15 text-sage-500">Activo</span>
        : <span className="status-pill bg-rose-500/15 text-rose-700">Inactivo</span>
    ) },
  ],
  fields: [
    { key: 'code', label: 'Código', kind: 'text', required: true, placeholder: 'VERANO2026' },
    { key: 'discountPercent', label: 'Descuento %', kind: 'number', required: true, min: 1, max: 100 },
    { key: 'maxUses', label: 'Usos máximos (opcional)', kind: 'number', min: 1, placeholder: 'vacío = ilimitado' },
    { key: 'expiresAt', label: 'Fecha de expiración (opcional)', kind: 'date' },
    { key: 'isActive', label: 'Estado', kind: 'boolean', span: 2, placeholder: 'Activo y aceptado en el checkout' },
  ],
};
