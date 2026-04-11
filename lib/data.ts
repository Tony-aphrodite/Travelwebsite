// Mock data for Aurelia Viajes

export type Destination = {
  id: string;
  name: string;
  country: string;
  image: string;
  priceFrom: number;
  tagline: string;
};

export const destinations: Destination[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Grecia',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    priceFrom: 1890,
    tagline: 'Atardeceres en el Egeo',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'Francia',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80',
    priceFrom: 1250,
    tagline: 'Romance eterno',
  },
  {
    id: 'venecia',
    name: 'Venecia',
    country: 'Italia',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=900&q=80',
    priceFrom: 1450,
    tagline: 'Canales de ensueno',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'Emiratos',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80',
    priceFrom: 1990,
    tagline: 'Lujo en el desierto',
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80',
    priceFrom: 1690,
    tagline: 'Paraiso tropical',
  },
  {
    id: 'maldivas',
    name: 'Maldivas',
    country: 'Oceano Indico',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80',
    priceFrom: 3200,
    tagline: 'Aguas cristalinas',
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japon',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&q=80',
    priceFrom: 2100,
    tagline: 'Cultura milenaria',
  },
  {
    id: 'toscana',
    name: 'Toscana',
    country: 'Italia',
    image: 'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=900&q=80',
    priceFrom: 1750,
    tagline: 'Vinedos y cipreses',
  },
];

export type Hotel = {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  ratingLabel: string;
  stars: number;
  price: number;
  oldPrice?: number;
  description: string;
  amenities: string[];
  tags: string[];
};

export const hotels: Hotel[] = [
  {
    id: 'canaves-oia',
    name: 'Canaves Oia Epitome',
    location: 'Oia, Santorini',
    country: 'Grecia',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    ],
    rating: 9.6,
    reviewCount: 842,
    ratingLabel: 'Excepcional',
    stars: 5,
    price: 680,
    oldPrice: 950,
    description:
      'Un hotel boutique de lujo con suites esculpidas en la roca volcanica, piscinas privadas infinitas y vistas ininterrumpidas a la caldera de Santorini.',
    amenities: ['WiFi gratis', 'Piscina infinita', 'Spa', 'Restaurante Michelin', 'Servicio de habitaciones 24h', 'Traslado aeropuerto'],
    tags: ['Con piscina', 'Vista al mar', 'Adults only'],
  },
  {
    id: 'ritz-paris',
    name: 'Ritz Paris',
    location: 'Place Vendome, Paris',
    country: 'Francia',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&q=80',
    ],
    rating: 9.8,
    reviewCount: 1240,
    ratingLabel: 'Iconico',
    stars: 5,
    price: 1250,
    description:
      'Una leyenda parisina desde 1898. Habitaciones decoradas con lujo Louis XV, el bar Hemingway y jardines privados en el corazon de Place Vendome.',
    amenities: ['WiFi gratis', 'Spa Chanel', 'Restaurante Michelin', 'Bar legendario', 'Conserje', 'Limo'],
    tags: ['Palacio', 'Centro historico', 'Lujo'],
  },
  {
    id: 'belmond-venice',
    name: 'Belmond Hotel Cipriani',
    location: 'Giudecca, Venecia',
    country: 'Italia',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80',
      'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?w=800&q=80',
      'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
      'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=800&q=80',
      'https://images.unsplash.com/photo-1529551739587-e242c564f727?w=800&q=80',
    ],
    rating: 9.5,
    reviewCount: 612,
    ratingLabel: 'Extraordinario',
    stars: 5,
    price: 890,
    description:
      'Refugio exclusivo en la isla de Giudecca con piscina de agua salada, jardines privados y lanzadera privada a San Marco.',
    amenities: ['Piscina', 'Spa', 'Lanzadera privada', 'Jardines', 'Restaurante', 'WiFi'],
    tags: ['Vista laguna', 'Jardin privado', 'Romantico'],
  },
  {
    id: 'four-seasons-bali',
    name: 'Four Seasons Sayan',
    location: 'Ubud, Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1602002418082-dd4a3f5d5f8d?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    ],
    rating: 9.7,
    reviewCount: 980,
    ratingLabel: 'Excepcional',
    stars: 5,
    price: 720,
    oldPrice: 950,
    description:
      'Villas privadas suspendidas sobre el rio Ayung, rodeadas de arrozales. Spa flotante, yoga al amanecer y experiencias culinarias balinesas.',
    amenities: ['Villa privada', 'Piscina privada', 'Spa', 'Yoga', 'Clases de cocina', 'WiFi'],
    tags: ['Villa privada', 'Naturaleza', 'Bienestar'],
  },
  {
    id: 'burj-al-arab',
    name: 'Burj Al Arab Jumeirah',
    location: 'Dubai Marina, Dubai',
    country: 'Emiratos Arabes',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    ],
    rating: 9.4,
    reviewCount: 2100,
    ratingLabel: 'Extraordinario',
    stars: 5,
    price: 1580,
    description:
      'El unico hotel de siete estrellas del mundo. Suites duplex, Rolls Royce a disposicion, helipuerto privado y restaurantes con vista al Golfo Persico.',
    amenities: ['Rolls Royce', 'Helipuerto', 'Spa', 'Piscinas', 'Playa privada', 'Restaurantes'],
    tags: ['Iconico', 'Playa', 'Ultra lujo'],
  },
  {
    id: 'aman-tokyo',
    name: 'Aman Tokyo',
    location: 'Otemachi, Tokio',
    country: 'Japon',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&q=80',
      'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&q=80',
    ],
    rating: 9.9,
    reviewCount: 540,
    ratingLabel: 'Perfecto',
    stars: 5,
    price: 1180,
    description:
      'Oasis de serenidad en la planta 33 del Otemachi Tower. Ofuro de onsen, ceremonia del te y vistas al Monte Fuji en dias claros.',
    amenities: ['Onsen spa', 'Ceremonia del te', 'Restaurante', 'Biblioteca', 'Gimnasio', 'WiFi'],
    tags: ['Bienestar', 'Ciudad', 'Zen'],
  },
];

export type Flight = {
  id: string;
  airline: string;
  airlineCode: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  stopInfo: string;
  price: number;
  cabin: string;
};

export const flights: Flight[] = [
  {
    id: 'f1',
    airline: 'Air France',
    airlineCode: 'AF',
    from: 'MEX',
    to: 'CDG',
    fromCity: 'Ciudad de Mexico',
    toCity: 'Paris',
    departure: '23:55',
    arrival: '18:30',
    duration: '11h 35m',
    stops: 0,
    stopInfo: 'Directo',
    price: 1250,
    cabin: 'Economy Premium',
  },
  {
    id: 'f2',
    airline: 'Emirates',
    airlineCode: 'EK',
    from: 'MEX',
    to: 'CDG',
    fromCity: 'Ciudad de Mexico',
    toCity: 'Paris',
    departure: '09:15',
    arrival: '14:45',
    duration: '18h 30m',
    stops: 1,
    stopInfo: '1 escala · Dubai',
    price: 1680,
    cabin: 'Business',
  },
  {
    id: 'f3',
    airline: 'Lufthansa',
    airlineCode: 'LH',
    from: 'MEX',
    to: 'CDG',
    fromCity: 'Ciudad de Mexico',
    toCity: 'Paris',
    departure: '16:20',
    arrival: '12:10',
    duration: '13h 50m',
    stops: 1,
    stopInfo: '1 escala · Frankfurt',
    price: 980,
    cabin: 'Economy',
  },
  {
    id: 'f4',
    airline: 'KLM',
    airlineCode: 'KL',
    from: 'MEX',
    to: 'CDG',
    fromCity: 'Ciudad de Mexico',
    toCity: 'Paris',
    departure: '14:30',
    arrival: '11:55',
    duration: '14h 25m',
    stops: 1,
    stopInfo: '1 escala · Amsterdam',
    price: 1080,
    cabin: 'Economy',
  },
  {
    id: 'f5',
    airline: 'Aeromexico',
    airlineCode: 'AM',
    from: 'MEX',
    to: 'CDG',
    fromCity: 'Ciudad de Mexico',
    toCity: 'Paris',
    departure: '20:45',
    arrival: '15:30',
    duration: '11h 45m',
    stops: 0,
    stopInfo: 'Directo',
    price: 1150,
    cabin: 'Economy',
  },
];

export type Villa = {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  gallery: string[];
  guests: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  amenities: string[];
};

export const villas: Villa[] = [
  {
    id: 'villa-chianti',
    name: 'Villa del Chianti',
    location: 'Greve, Toscana',
    country: 'Italia',
    image: 'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    ],
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    price: 680,
    rating: 9.8,
    reviewCount: 124,
    description:
      'Villa del siglo XVII restaurada entre vinedos. Piscina climatizada, cocinera privada y cata de vinos en la bodega.',
    amenities: ['Piscina', 'Cocina', 'WiFi', 'Chef', 'Jardin', 'Chimenea', 'Aire acondicionado', 'Parking'],
  },
  {
    id: 'villa-bali',
    name: 'Villa Luna Ubud',
    location: 'Ubud, Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    ],
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    price: 420,
    rating: 9.7,
    reviewCount: 89,
    description:
      'Villa balinesa sobre los arrozales con piscina infinita, pabellon de yoga privado y masajes tradicionales.',
    amenities: ['Piscina', 'Cocina', 'WiFi', 'Yoga', 'Spa', 'Staff', 'Parking'],
  },
  {
    id: 'villa-mykonos',
    name: 'Casa Blanca Mykonos',
    location: 'Agios Lazaros, Mykonos',
    country: 'Grecia',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    ],
    guests: 10,
    bedrooms: 5,
    bathrooms: 5,
    price: 1180,
    rating: 9.6,
    reviewCount: 67,
    description:
      'Villa blanca con vistas panoramicas al mar Egeo, piscina infinita, acceso privado a playa y yate disponible.',
    amenities: ['Piscina', 'Acceso playa', 'WiFi', 'Cocina', 'Yate', 'Chef', 'Parking'],
  },
  {
    id: 'villa-provenza',
    name: 'Mas de Provence',
    location: 'Saint-Remy, Provenza',
    country: 'Francia',
    image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=1200&q=80',
    ],
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    price: 560,
    rating: 9.5,
    reviewCount: 45,
    description:
      'Mas provenzal entre campos de lavanda. Piscina de piedra, jardin aromatico y mercado semanal en la aldea.',
    amenities: ['Piscina', 'Cocina', 'WiFi', 'Jardin', 'Chimenea', 'Parking'],
  },
];

export type Package = {
  id: string;
  title: string;
  destination: string;
  image: string;
  duration: string;
  includes: string[];
  price: number;
  oldPrice: number;
  badge: string;
  description: string;
};

export const packages: Package[] = [
  {
    id: 'maldivas-7',
    title: 'Retiro en Soneva Jani',
    destination: 'Maldivas',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
    duration: '7 noches',
    includes: ['Vuelo ida y vuelta', 'Villa sobre agua', 'Desayuno', 'Traslado en hidroavion', 'Spa 60min'],
    price: 3510,
    oldPrice: 5400,
    badge: '-35%',
    description:
      'Villa privada sobre el agua con piscina infinita, tobogan directo al oceano y cena bajo las estrellas en la playa.',
  },
  {
    id: 'toscana-5',
    title: 'Cosecha toscana en Chianti',
    destination: 'Toscana, Italia',
    image: 'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=1200&q=80',
    duration: '5 noches',
    includes: ['Vuelo desde CDMX', 'Villa privada', 'Cata de vinos', 'Clase de pasta', 'Auto alquilado'],
    price: 2450,
    oldPrice: 3200,
    badge: 'VUELO + HOTEL',
    description:
      'Villa del siglo XVII entre vinedos con cata privada en bodegas Chianti Classico y clase de cocina con chef local.',
  },
  {
    id: 'bali-10',
    title: 'Romance en la isla de los dioses',
    destination: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    duration: '10 noches',
    includes: ['Vuelo internacional', 'Resort boutique', 'Spa de pareja', 'Cena privada', 'Yoga al amanecer'],
    price: 2890,
    oldPrice: 4100,
    badge: 'LUNA DE MIEL',
    description:
      '5 noches en Ubud entre arrozales y 5 en Seminyak frente al mar. Cena romantica privada y ritual de spa en pareja incluidos.',
  },
  {
    id: 'kyoto-7',
    title: 'Ruta del cerezo en flor',
    destination: 'Kyoto, Japon',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80',
    duration: '7 noches',
    includes: ['Vuelo', 'Ryokan tradicional', 'Ceremonia del te', 'Tour geisha', 'JR Pass'],
    price: 3180,
    oldPrice: 4200,
    badge: 'TEMPORADA ALTA',
    description:
      'Experiencia zen en ryokan tradicional con onsen privado, ceremonia del te en Gion y paseos nocturnos por Arashiyama.',
  },
  {
    id: 'paris-5',
    title: 'Paris para ella',
    destination: 'Paris, Francia',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    duration: '5 noches',
    includes: ['Vuelo', 'Hotel 5* zona Marais', 'Tour Chanel', 'Cena Michelin', 'Palacio Versalles'],
    price: 2290,
    oldPrice: 2980,
    badge: 'EXPERIENCIA',
    description:
      'Shopping en el Faubourg Saint-Honore, cena privada en restaurante con estrella y visita guiada al Palacio de Versalles.',
  },
  {
    id: 'dubai-6',
    title: 'Escapada de lujo en el desierto',
    destination: 'Dubai, Emiratos',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
    duration: '6 noches',
    includes: ['Vuelo', 'Burj Al Arab', 'Safari 4x4', 'Yate privado', 'Desierto 1 noche'],
    price: 4280,
    oldPrice: 5600,
    badge: 'PREMIUM',
    description:
      'Estancia en suite duplex del Burj Al Arab, experiencia de safari en el desierto con cena bereber y yate privado al atardecer.',
  },
];

export type Car = {
  id: string;
  model: string;
  category: string;
  image: string;
  company: string;
  seats: number;
  transmission: string;
  fuel: string;
  price: number;
  features: string[];
};

export const cars: Car[] = [
  {
    id: 'c1',
    model: 'Fiat 500 Cabrio',
    category: 'Compacto',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
    company: 'Hertz',
    seats: 4,
    transmission: 'Automatico',
    fuel: 'Gasolina',
    price: 48,
    features: ['Descapotable', 'Bluetooth', 'GPS', 'AC'],
  },
  {
    id: 'c2',
    model: 'BMW Serie 3',
    category: 'Sedan Premium',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    company: 'Sixt',
    seats: 5,
    transmission: 'Automatico',
    fuel: 'Gasolina',
    price: 95,
    features: ['Cuero', 'GPS', 'Sensor parking', 'AC'],
  },
  {
    id: 'c3',
    model: 'Range Rover Evoque',
    category: 'SUV de lujo',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    company: 'Europcar',
    seats: 5,
    transmission: 'Automatico',
    fuel: 'Hibrido',
    price: 135,
    features: ['4x4', 'Cuero', 'Techo panoramico', 'GPS'],
  },
  {
    id: 'c4',
    model: 'Mercedes-Benz Clase E',
    category: 'Sedan Executive',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
    company: 'Avis',
    seats: 5,
    transmission: 'Automatico',
    fuel: 'Diesel',
    price: 115,
    features: ['Cuero', 'GPS', 'Techo', 'Asientos calefaccion'],
  },
  {
    id: 'c5',
    model: 'Porsche 911 Cabrio',
    category: 'Deportivo',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    company: 'Sixt',
    seats: 2,
    transmission: 'Automatico',
    fuel: 'Gasolina',
    price: 420,
    features: ['Descapotable', 'Cuero', 'Sport+', 'GPS'],
  },
];

export type Activity = {
  id: string;
  title: string;
  location: string;
  image: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
};

export const activities: Activity[] = [
  {
    id: 'a1',
    title: 'Cata privada en vinedo Antinori',
    location: 'Toscana, Italia',
    image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&q=80',
    duration: '4 horas',
    price: 180,
    rating: 4.9,
    reviewCount: 342,
    category: 'Gastronomia',
    description:
      'Visita guiada a la bodega Antinori con cata de 6 vinos premium y maridaje con productos locales toscanos.',
  },
  {
    id: 'a2',
    title: 'Ritual de spa balines en Ubud',
    location: 'Ubud, Bali',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
    duration: '3 horas',
    price: 120,
    rating: 4.8,
    reviewCount: 215,
    category: 'Bienestar',
    description:
      'Ritual completo de spa balines: exfoliacion con flores, masaje tradicional de 90 min, bano floral y te de jengibre.',
  },
  {
    id: 'a3',
    title: 'Vuelo en globo al amanecer',
    location: 'Capadocia, Turquia',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=800&q=80',
    duration: '2 horas',
    price: 280,
    rating: 5.0,
    reviewCount: 512,
    category: 'Aventura',
    description:
      'Vuelo en globo aerostatico sobre las chimeneas de hadas de Capadocia al amanecer, con brindis de champagne al aterrizar.',
  },
  {
    id: 'a4',
    title: 'Cena privada con chef Michelin',
    location: 'Paris, Francia',
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&q=80',
    duration: '3 horas',
    price: 450,
    rating: 4.9,
    reviewCount: 128,
    category: 'Gastronomia',
    description:
      'Cena degustacion de 7 tiempos en apartamento privado en el Marais con chef galardonado y maridaje de vinos franceses.',
  },
  {
    id: 'a5',
    title: 'Clase privada de ceramica japonesa',
    location: 'Kyoto, Japon',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    duration: '2.5 horas',
    price: 85,
    rating: 4.7,
    reviewCount: 94,
    category: 'Cultura',
    description:
      'Aprende la tecnica Kiyomizu con un maestro ceramista en su taller tradicional. Llevate tu creacion a casa.',
  },
  {
    id: 'a6',
    title: 'Safari fotografico al atardecer',
    location: 'Masai Mara, Kenia',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
    duration: '5 horas',
    price: 320,
    rating: 4.9,
    reviewCount: 186,
    category: 'Aventura',
    description:
      'Safari privado 4x4 con guia fotografo profesional. Incluye aperitivos sundowner en la sabana.',
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  author: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'paris-secreto',
    title: 'Paris secreto: 12 cafes donde las parisinas desayunan',
    excerpt: 'Una guia intima de los rincones mas autenticos de la Ciudad de la Luz, lejos de las multitudes turisticas.',
    category: 'Guia',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80',
    author: 'Camila Estrada',
    date: '28 Marzo 2026',
  },
  {
    slug: 'retiros-bali',
    title: 'Retiros de yoga en Bali que transformaran tu verano',
    excerpt: 'Cinco retiros seleccionados con yoga, meditacion y cocina ayurvedica frente al mar.',
    category: 'Bienestar',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80',
    author: 'Valentina Torres',
    date: '15 Marzo 2026',
  },
  {
    slug: 'empacar-elegante',
    title: 'Como empacar elegante para un viaje largo',
    excerpt: 'La capsule wardrobe ideal para viajar ligero sin renunciar al estilo.',
    category: 'Consejos',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?w=1200&q=80',
    author: 'Sofia Menendez',
    date: '08 Marzo 2026',
  },
  {
    slug: 'tren-glaciar',
    title: 'A bordo del Glacier Express: el tren mas panoramico del mundo',
    excerpt: 'Un viaje de 8 horas por los Alpes suizos entre glaciares, lagos alpinos y pueblos de cuento.',
    category: 'Experiencia',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
    author: 'Isabel Ramirez',
    date: '22 Febrero 2026',
  },
  {
    slug: 'solo-travel',
    title: 'Guia para el primer viaje sola: Japon sin miedo',
    excerpt: 'Consejos practicos, itinerario sugerido y por que Japon es el mejor primer destino para viajar sola.',
    category: 'Solo Travel',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80',
    author: 'Ana Carolina Ruiz',
    date: '10 Febrero 2026',
  },
  {
    slug: 'aceite-toscana',
    title: 'Rutas del aceite de oliva en Toscana',
    excerpt: 'Visitas guiadas a las mejores almazaras de la region con cata incluida.',
    category: 'Gastronomia',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=1200&q=80',
    author: 'Camila Estrada',
    date: '30 Enero 2026',
  },
];

export const testimonials = [
  {
    name: 'Sofia Menendez',
    trip: 'Luna de miel · Santorini',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    text: 'Aurelia entendio exactamente lo que buscaba para mi luna de miel. Cada detalle fue pensado con delicadeza. La villa en Santorini supero nuestras expectativas.',
  },
  {
    name: 'Ana Carolina Ruiz',
    trip: 'Viaje familiar · Italia',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    text: 'La mejor agencia que he conocido. Planearon un viaje familiar por Italia y fue absolutamente magico. Cada hotel, cada experiencia... perfecto.',
  },
  {
    name: 'Valentina Torres',
    trip: 'Solo travel · Japon',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    text: 'El servicio personalizado es lo que hace diferente a Aurelia. Me sentia acompanada en cada momento, como si viajara con una amiga que conoce todos los secretos.',
  },
];
