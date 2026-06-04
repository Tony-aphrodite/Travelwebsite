/**
 * Aurelia chrome dictionaries.
 *
 * Covers all visible UI strings that ship in the build (navbar, hero,
 * search widget, footer, common CTAs). DB-backed content (hotel names,
 * descriptions, blog posts) is NOT translated here — that copy lives
 * in the database in Spanish and stays as the admin wrote it.
 *
 * Add new keys as needed; both `es` and `en` must stay in sync.
 */

export type Locale = 'es' | 'en';

export type Dictionary = {
  nav: {
    vuelos: string; hoteles: string; villas: string; paquetes: string;
    autos: string; experiencias: string; cruceros: string;
    asesoria: string; ofertas: string;
  };
  user: {
    iniciarSesion: string; registrarse: string; registrarseGratis: string;
    miCuenta: string; carrito: string; panelAdmin: string;
    cerrarSesion: string; administrador: string; favoritos: string; idioma: string;
  };
  hero: {
    eyebrow: string; headlinePart1: string; headlineScript: string; headlinePart2: string;
    subtitle: string; ctaPrimary: string; ctaSecondary: string;
    carouselPrev: string; carouselNext: string; desde: string;
  };
  search: {
    vuelos: string; hoteles: string; villas: string; paquetes: string;
    autos: string; experiencias: string; cruceros: string;
    buscar: string; busquedaAvanzada: string;
    idaYVuelta: string; soloIda: string; multidestino: string;
    desde: string; hacia: string; salida: string; regreso: string;
    pasajeros: string; destino: string; entrada: string; habitaciones: string;
    region: string; llegada: string; huespedes: string; viajeros: string;
    recogerEn: string; devolverEn: string; fechaInicio: string; fechaFin: string;
    destinoOExperiencia: string; fecha: string; personas: string;
    puertoSalida: string; naviera: string; embarque: string; duracion: string;
    cualquiera: string; unAdulto: string; dosAdultos: string; familia: string;
  };
  destinations: {
    title: string; subtitle: string; viewAll: string; from: string;
  };
  club: {
    title: string; tagline: string; cta: string;
  };
  trust: {
    support: string; supportDesc: string;
    price: string; priceDesc: string;
    payment: string; paymentDesc: string;
    flexible: string; flexibleDesc: string;
    confidence: string; confidenceDesc: string;
  };
  ai: {
    openLabel: string; close: string; send: string;
    greetingTitle: string; greetingPrompt: string;
    subline: string; welcomeIntro: string;
    starters: string[];
    inputPlaceholder: string;
    thinking: string; errorGeneric: string; errorNetwork: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  es: {
    nav: {
      vuelos: 'Vuelos',
      hoteles: 'Hoteles',
      villas: 'Villas',
      paquetes: 'Paquetes',
      autos: 'Autos',
      experiencias: 'Experiencias',
      cruceros: 'Cruceros',
      asesoria: 'Asesoria',
      ofertas: 'Ofertas',
    },
    user: {
      iniciarSesion: 'Iniciar sesion',
      registrarse: 'Registrarse',
      registrarseGratis: 'Registrarse gratis',
      miCuenta: 'Mi cuenta',
      carrito: 'Carrito',
      panelAdmin: 'Panel admin',
      cerrarSesion: 'Cerrar sesion',
      administrador: 'Administrador',
      favoritos: 'Favoritos',
      idioma: 'Idioma',
    },
    hero: {
      eyebrow: 'Coleccion 2026',
      headlinePart1: 'El arte de viajar,',
      headlineScript: 'redescubierto',
      headlinePart2: 'para ti.',
      subtitle:
        'Aurelia crea experiencias de viaje que combinan el lujo discreto con el alma de cada destino. Vuelos, hoteles boutique, villas privadas y momentos que recordaras para siempre.',
      ctaPrimary: 'Planifica tu viaje',
      ctaSecondary: 'Explorar destinos',
      carouselPrev: 'Anterior destino',
      carouselNext: 'Siguiente destino',
      desde: 'Desde',
    },
    search: {
      vuelos: 'Vuelos',
      hoteles: 'Hoteles',
      villas: 'Villas',
      paquetes: 'Paquetes',
      autos: 'Autos',
      experiencias: 'Experiencias',
      cruceros: 'Cruceros',
      buscar: 'Buscar',
      busquedaAvanzada: 'Busqueda avanzada',
      idaYVuelta: 'Ida y vuelta',
      soloIda: 'Solo ida',
      multidestino: 'Multidestino',
      desde: 'Desde',
      hacia: 'Hacia',
      salida: 'Salida',
      regreso: 'Regreso',
      pasajeros: 'Pasajeros',
      destino: 'Destino',
      entrada: 'Entrada',
      habitaciones: 'Habitaciones',
      region: 'Region',
      llegada: 'Llegada',
      huespedes: 'Huespedes',
      viajeros: 'Viajeros',
      recogerEn: 'Recoger en',
      devolverEn: 'Devolver en',
      fechaInicio: 'Fecha inicio',
      fechaFin: 'Fecha fin',
      destinoOExperiencia: 'Destino o experiencia',
      fecha: 'Fecha',
      personas: 'Personas',
      puertoSalida: 'Puerto de salida',
      naviera: 'Naviera',
      embarque: 'Embarque',
      duracion: 'Duracion',
      cualquiera: 'Cualquiera',
      unAdulto: '1 Adulto',
      dosAdultos: '2 Adultos',
      familia: 'Familia',
    },
    destinations: {
      title: 'Destinos que te encantarán',
      subtitle: 'Una selección cuidada de destinos para tu próxima escapada.',
      viewAll: 'Ver todos',
      from: 'Desde',
    },
    club: {
      title: 'Aurelia Club',
      tagline: 'Únete gratis y comienza a acumular puntos para viajes increíbles.',
      cta: 'Únete ahora',
    },
    trust: {
      support: 'Atención 24/7',
      supportDesc: 'Asistencia personalizada',
      price: 'Mejor precio garantizado',
      priceDesc: 'Encontramos la mejor tarifa',
      payment: 'Pago seguro',
      paymentDesc: 'Tus datos siempre protegidos',
      flexible: 'Reserva flexible',
      flexibleDesc: 'Cambia sin complicaciones',
      confidence: 'Viaja con confianza',
      confidenceDesc: 'Más de 10 años creando recuerdos',
    },
    ai: {
      openLabel: 'Abrir asistente de IA',
      close: 'Cerrar',
      send: 'Enviar',
      greetingTitle: 'Hola, soy Aurelia AI',
      greetingPrompt: '¿En qué puedo ayudarte a planear hoy?',
      subline: 'Asistente de viaje 24/7',
      welcomeIntro: 'Pregúntame sobre destinos, hoteles, cruceros o cuándo viajar.',
      starters: [
        '¿Cuáles son los mejores destinos para luna de miel?',
        '¿Qué época es buena para visitar Japón?',
        'Recomiéndame un crucero por el Mediterráneo',
      ],
      inputPlaceholder: 'Escribe tu pregunta...',
      thinking: 'Pensando...',
      errorGeneric: 'Hubo un problema. Intenta de nuevo.',
      errorNetwork: 'Error de conexión. Verifica tu internet.',
    },
  },
  en: {
    nav: {
      vuelos: 'Flights',
      hoteles: 'Hotels',
      villas: 'Villas',
      paquetes: 'Packages',
      autos: 'Cars',
      experiencias: 'Experiences',
      cruceros: 'Cruises',
      asesoria: 'Advisory',
      ofertas: 'Deals',
    },
    user: {
      iniciarSesion: 'Sign in',
      registrarse: 'Register',
      registrarseGratis: 'Sign up free',
      miCuenta: 'My account',
      carrito: 'Cart',
      panelAdmin: 'Admin panel',
      cerrarSesion: 'Sign out',
      administrador: 'Administrator',
      favoritos: 'Favorites',
      idioma: 'Language',
    },
    hero: {
      eyebrow: '2026 Collection',
      headlinePart1: 'The art of travel,',
      headlineScript: 'reimagined',
      headlinePart2: 'just for you.',
      subtitle:
        'Aurelia crafts journeys that blend discreet luxury with the soul of every destination. Flights, boutique hotels, private villas and moments to remember forever.',
      ctaPrimary: 'Plan your trip',
      ctaSecondary: 'Explore destinations',
      carouselPrev: 'Previous destination',
      carouselNext: 'Next destination',
      desde: 'From',
    },
    search: {
      vuelos: 'Flights',
      hoteles: 'Hotels',
      villas: 'Villas',
      paquetes: 'Packages',
      autos: 'Cars',
      experiencias: 'Experiences',
      cruceros: 'Cruises',
      buscar: 'Search',
      busquedaAvanzada: 'Advanced search',
      idaYVuelta: 'Round trip',
      soloIda: 'One way',
      multidestino: 'Multi-city',
      desde: 'From',
      hacia: 'To',
      salida: 'Departure',
      regreso: 'Return',
      pasajeros: 'Passengers',
      destino: 'Destination',
      entrada: 'Check-in',
      habitaciones: 'Rooms',
      region: 'Region',
      llegada: 'Arrival',
      huespedes: 'Guests',
      viajeros: 'Travelers',
      recogerEn: 'Pick up at',
      devolverEn: 'Drop off at',
      fechaInicio: 'Start date',
      fechaFin: 'End date',
      destinoOExperiencia: 'Destination or experience',
      fecha: 'Date',
      personas: 'People',
      puertoSalida: 'Port of departure',
      naviera: 'Cruise line',
      embarque: 'Boarding',
      duracion: 'Duration',
      cualquiera: 'Any',
      unAdulto: '1 Adult',
      dosAdultos: '2 Adults',
      familia: 'Family',
    },
    destinations: {
      title: 'Destinations you will love',
      subtitle: 'A handpicked selection of destinations for your next getaway.',
      viewAll: 'See all',
      from: 'From',
    },
    club: {
      title: 'Aurelia Club',
      tagline: 'Join free and start earning points toward unforgettable trips.',
      cta: 'Join now',
    },
    trust: {
      support: '24/7 Support',
      supportDesc: 'Personalized assistance',
      price: 'Best price guaranteed',
      priceDesc: 'We find you the best rate',
      payment: 'Secure payment',
      paymentDesc: 'Your data is always protected',
      flexible: 'Flexible booking',
      flexibleDesc: 'Change without hassle',
      confidence: 'Travel with confidence',
      confidenceDesc: 'Over 10 years creating memories',
    },
    ai: {
      openLabel: 'Open AI assistant',
      close: 'Close',
      send: 'Send',
      greetingTitle: 'Hi, I am Aurelia AI',
      greetingPrompt: 'How can I help you plan today?',
      subline: '24/7 travel assistant',
      welcomeIntro: 'Ask me about destinations, hotels, cruises, or when to travel.',
      starters: [
        'What are the best honeymoon destinations?',
        'When is a good time to visit Japan?',
        'Recommend a Mediterranean cruise for me',
      ],
      inputPlaceholder: 'Type your question...',
      thinking: 'Thinking...',
      errorGeneric: 'Something went wrong. Try again.',
      errorNetwork: 'Connection error. Check your internet.',
    },
  },
};
