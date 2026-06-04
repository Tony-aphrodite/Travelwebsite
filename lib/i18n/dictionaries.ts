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
  },
};
