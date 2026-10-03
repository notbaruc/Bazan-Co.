/**
 * Copy en español (idioma por defecto).
 * Convenciones:
 * - `*texto*` marca la parte de un título que va en itálica con color de acento.
 * - `[PENDIENTE USUARIO] …` marca un dato que debe dar el dueño del negocio; se ve como
 *   placeholder en la página y `npm run pending` lo lista. Nunca inventar cifras ni testimonios.
 */
const es = {
  meta: {
    title: 'Bazan & Co. — Diseño web premium, SEO y landing pages en Chihuahua',
    description:
      'Ingeniería web en Chihuahua, México. Sitios rápidos, bilingües y a la medida para negocios locales y PYMEs que quieren más clientes. Servicio remoto global.',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    homeSuffix: ', inicio',
    mainNav: 'Navegación principal',
    footerNav: 'Enlaces del pie de página',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    externalLink: '(se abre en una pestaña nueva)',
    pendingLabel: 'Pendiente',
  },
  nav: {
    links: [
      { href: '#servicios', label: 'Servicios' },
      { href: '#proceso', label: 'Proceso' },
      { href: '#portafolio', label: 'Portafolio' },
      { href: '#faq', label: 'Preguntas' },
      { href: '#contacto', label: 'Contacto' },
    ],
    cta: 'Agenda una consulta',
  },
  whatsapp: {
    defaultMessage: 'Hola, me interesa una página web profesional. ¿Podemos agendar una consulta?',
    fabLabel: 'Escríbenos por WhatsApp',
  },
  hero: {
    eyebrow: 'Ingeniería web · Chihuahua, México',
    title: 'No construimos páginas web. *Diseñamos máquinas de conversión.*',
    lead: 'Sitios rápidos, bilingües y hechos a la medida para negocios locales y PYMEs que quieren más clientes, no solo más visitas. Tu sitio web no es un gasto: es un activo que trabaja por ti todos los días.',
    primaryCta: 'Escríbenos por WhatsApp',
    secondaryCta: 'Agenda una consulta',
    note: 'Hablas directo con el ingeniero que construye tu sitio.',
  },
  trust: {
    label: 'Indicadores verificables',
    items: [
      {
        value: '<2 s',
        number: 2,
        prefix: '<',
        suffix: ' s',
        label: 'objetivo de carga en celular',
      },
      { value: '100%', number: 100, prefix: '', suffix: '%', label: 'sitios bilingües ES/EN' },
      {
        value: '95+',
        number: 95,
        prefix: '',
        suffix: '+',
        label: 'Lighthouse móvil de este sitio',
      },
      {
        value: '1:1',
        number: null,
        prefix: '',
        suffix: '',
        label: 'trato directo con el ingeniero',
      },
    ],
    credentials: [
      'Formación en Ingeniería en Desarrollo de Software (UTCH BIS)',
      'Inglés avanzado',
      'Chihuahua, México · servicio remoto global',
    ],
  },
  problem: {
    eyebrow: 'El problema',
    title: 'Tu negocio es bueno. *Tu sitio web no lo demuestra.*',
    lead: 'Tus clientes te buscan en el celular y deciden en segundos. Si tu sitio no responde rápido y claro, se van con tu competencia.',
    problemsTitle: 'Lo que pasa hoy',
    problems: [
      'Tarda en cargar y la gente se va antes de verlo.',
      'No aparece cuando te buscan en Google.',
      'Se ve mal en el celular, justo donde te buscan.',
      'No dice con claridad qué haces ni cómo contactarte.',
    ],
    solutionTitle: 'Lo que construimos',
    solutions: [
      'Diseño pensado para cargar en menos de 2 segundos en celular.',
      'SEO técnico desde la base para que te encuentren.',
      'Diseño mobile-first que se ve impecable en cualquier pantalla.',
      'Un solo objetivo claro: que te escriban o agenden una consulta.',
    ],
  },
  services: {
    eyebrow: 'Servicios',
    title: 'Soluciones que impulsan *tu crecimiento digital.*',
    lead: 'Cada servicio tiene un enfoque de ingeniería: medible, escalable y orientado a conseguir clientes.',
    items: [
      {
        icon: 'monitor' as const,
        title: 'Diseño Web Premium',
        text: 'Sitios a la medida con código limpio y obsesión por la velocidad. Cada sección tiene un propósito: generar confianza y contacto.',
        features: [
          'Diseño 100% responsivo, mobile-first',
          'Objetivo de carga menor a 2 segundos',
          'Versión en español e inglés',
          'Código propio, sin plantillas genéricas',
        ],
      },
      {
        icon: 'search' as const,
        title: 'Optimización SEO',
        text: 'Posicionamiento técnico para que te encuentren quienes ya están buscando lo que ofreces.',
        features: [
          'SEO técnico on-page',
          'Core Web Vitals optimizados',
          'Metadatos y datos estructurados',
          'Alta y seguimiento en Google Search Console',
        ],
      },
      {
        icon: 'rocket' as const,
        title: 'Landing Pages de Alta Conversión',
        text: 'Páginas con un solo objetivo: convertir visitas en clientes. Mensaje claro, diseño centrado en la acción.',
        features: [
          'Copy persuasivo en español e inglés',
          'Llamados a la acción a WhatsApp y formulario',
          'Medición de conversiones con Google Analytics',
        ],
      },
    ],
  },
  process: {
    eyebrow: 'Proceso',
    title: 'De la idea al lanzamiento, *sin sorpresas.*',
    lead: 'Un proceso claro en cuatro pasos. Siempre sabes en qué etapa va tu proyecto.',
    steps: [
      {
        icon: 'compass' as const,
        title: 'Diagnóstico',
        text: 'Conocemos tu negocio, tus clientes y tu competencia. Definimos qué debe lograr el sitio y cómo vamos a medirlo.',
      },
      {
        icon: 'pen' as const,
        title: 'Diseño',
        text: 'Estructura, textos y diseño visual pensados para tu cliente. Revisas y apruebas la propuesta antes del desarrollo.',
      },
      {
        icon: 'code' as const,
        title: 'Desarrollo',
        text: 'Construcción con código limpio, SEO técnico y pruebas de velocidad y accesibilidad en celular.',
      },
      {
        icon: 'flag' as const,
        title: 'Lanzamiento',
        text: 'Publicación, Google Analytics y Search Console configurados. Te explicamos cómo medir los resultados.',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Portafolio',
    title: 'Proyectos que hablan *por sí mismos.*',
    lead: 'Sitios reales para negocios reales de Chihuahua.',
    labels: {
      problem: 'Reto',
      solution: 'Solución',
      stack: 'Stack',
      result: 'Resultado',
      testimonial: 'Testimonio',
      visit: 'Ver sitio',
      noImage: 'Captura pendiente',
    },
    projects: [
      {
        id: 'soldaduras',
        name: 'Soldaduras y Equipos',
        category: 'Landing page · Comercio industrial',
        url: 'https://soldadurasequipos.netlify.app/',
        imageAlt:
          'Página de inicio de Soldaduras y Equipos: titular «Impulsa tu taller con los mejores equipos», foto de la fachada de la tienda y mapa de ubicación.',
        problem:
          'Negocio local de consumibles, gases industriales y servicio técnico para talleres que necesitaba presencia web propia para mostrar su oferta y facilitar el contacto.',
        solution:
          'Landing page con catálogo de productos y marcas, sección de reparación de máquinas, ubicación con mapa y contacto directo por WhatsApp.',
        stack: ['HTML', 'Tailwind CSS', 'JavaScript', 'Google Maps'],
        result: '[PENDIENTE USUARIO] Resultado medible del proyecto (visitas, contactos, ventas).',
        testimonial: '[PENDIENTE USUARIO] Testimonio del cliente (con su permiso).',
      },
      {
        id: 'ries',
        name: 'RIES Chihuahua',
        category: 'Sitio corporativo · Sector industrial y maquilador',
        // [REVISAR] El certificado HTTPS de rieschihuahua.com es inválido (detectado 2026-10-03):
        // el enlace se oculta para no mandar a los visitantes a una advertencia de seguridad.
        // Restaurar 'https://rieschihuahua.com/' cuando se corrija.
        url: null,
        imageAlt:
          'Página de inicio de RIES Chihuahua: logotipo de RIES, lema «La solución en soldadura» y botones de contacto y WhatsApp sobre fondo oscuro.',
        problem:
          'Empresa de representaciones industriales y equipos para soldar que atiende al sector maquilador y necesitaba una imagen a la altura de sus clientes industriales.',
        solution:
          'Sitio con servicios, presentación de la empresa, ubicaciones y contacto; identidad oscura con el amarillo de la marca y acceso directo a WhatsApp.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        result: '[PENDIENTE USUARIO] Resultado medible del proyecto (visitas, contactos, ventas).',
        testimonial: '[PENDIENTE USUARIO] Testimonio del cliente (con su permiso).',
      },
      {
        id: 'gech',
        name: 'GECH',
        category: '[PENDIENTE USUARIO] Tipo de proyecto y sector',
        url: null,
        imageAlt: '',
        problem: '[PENDIENTE USUARIO] Reto o necesidad del cliente.',
        solution: '[PENDIENTE USUARIO] Qué se construyó.',
        stack: ['[PENDIENTE USUARIO] Tecnologías usadas'],
        result: '[PENDIENTE USUARIO] Resultado medible del proyecto.',
        testimonial: '[PENDIENTE USUARIO] Testimonio del cliente (con su permiso).',
      },
    ],
  },
  why: {
    eyebrow: 'Por qué Bazan & Co.',
    title: 'Rigor de ingeniería, *trato directo.*',
    lead: 'Lo que nos distingue no es solo lo que hacemos, sino cómo lo hacemos.',
    items: [
      {
        icon: 'bolt' as const,
        title: 'Velocidad',
        text: 'Sitios pensados para cargar en menos de 2 segundos en celular. La velocidad mejora tu posicionamiento y retiene a tus visitantes.',
      },
      {
        icon: 'code' as const,
        title: 'Código limpio',
        text: 'Arquitectura mantenible y escalable, sin plantillas pesadas. Tu sitio puede crecer sin empezar de cero.',
      },
      {
        icon: 'chat' as const,
        title: 'Soporte directo',
        text: 'Hablas con el ingeniero que construye tu sitio. Sin intermediarios ni tickets perdidos.',
      },
      {
        icon: 'chart' as const,
        title: 'Resultados medibles',
        text: 'Google Analytics y Search Console configurados para que veas cuántas personas te visitan y cuántas te contactan.',
      },
    ],
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que más nos *preguntan.*',
    items: [
      {
        q: '¿Cuánto cuesta un sitio web?',
        a: 'Depende del alcance: número de secciones, idiomas e integraciones. Después del diagnóstico recibes una cotización por escrito con todo lo que incluye.',
        pending: '[PENDIENTE USUARIO] Rangos de precio orientativos, si quieres mostrarlos.',
      },
      {
        q: '¿Cuánto tiempo tarda?',
        a: 'Depende del alcance y de qué tan pronto tengamos tus textos e imágenes.',
        pending: '[PENDIENTE USUARIO] Tiempo típico de entrega por tipo de proyecto.',
      },
      {
        q: '¿Necesito saber de tecnología?',
        a: 'No. Nos encargamos de la parte técnica y te explicamos cada decisión en lenguaje claro, sin tecnicismos.',
        pending: null,
      },
      {
        q: '¿Trabajan con negocios fuera de Chihuahua?',
        a: 'Sí. Estamos en Chihuahua y trabajamos de forma remota con negocios de cualquier lugar, en español o en inglés.',
        pending: null,
      },
      {
        q: '¿Mi sitio va a aparecer en Google?',
        a: 'Lo construimos con SEO técnico desde la base y lo damos de alta en Google Search Console. El lugar en los resultados también depende de tu competencia y tu contenido, así que no prometemos una posición específica: sí te mostramos cómo medir el avance.',
        pending: null,
      },
      {
        q: '¿Qué pasa después del lanzamiento?',
        a: 'Te entregamos el sitio funcionando y te explicamos cómo revisar tus métricas.',
        pending: '[PENDIENTE USUARIO] Plan de mantenimiento o soporte posterior y si tiene costo.',
      },
    ],
  },
  finalCta: {
    title: '¿Listo para que tu sitio *trabaje por ti?*',
    text: 'Agenda una consulta técnica sin costo. Analizamos tu situación actual y te proponemos una estrategia web enfocada en resultados reales.',
    primaryCta: 'Escríbenos por WhatsApp',
    secondaryCta: 'Prefiero el formulario',
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu *próximo proyecto.*',
    lead: 'Cada proyecto empieza con una conversación. Cuéntanos qué necesitas y te enviamos una propuesta a la medida, sin compromiso.',
    channels: {
      whatsapp: 'WhatsApp',
      email: 'Email',
      location: 'Ubicación',
      locationValue: 'Chihuahua, México · servicio remoto global',
    },
    form: {
      title: 'Envíanos un mensaje',
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'tu@empresa.com',
      service: 'Servicio de interés',
      servicePlaceholder: 'Selecciona un servicio',
      services: [
        { value: 'diseno-web', label: 'Diseño Web Premium' },
        { value: 'seo', label: 'Optimización SEO' },
        { value: 'landing-page', label: 'Landing Page de Alta Conversión' },
        { value: 'otro', label: 'Otro / No estoy seguro' },
      ],
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntanos sobre tu negocio y lo que necesitas…',
      optional: '(opcional)',
      submit: 'Enviar mensaje',
      required: 'Campo obligatorio',
      errors: {
        name: 'Escribe tu nombre.',
        emailRequired: 'Escribe tu email.',
        emailInvalid: 'Revisa tu email: parece incompleto (ejemplo: tu@empresa.com).',
        service: 'Elige un servicio o «Otro / No estoy seguro».',
        summary: 'Revisa los campos marcados para poder enviar tu mensaje.',
      },
      notConnected:
        'El formulario se conecta en la siguiente fase. Mientras tanto, escríbenos por WhatsApp.',
      responseTime: 'Te respondemos en menos de 24 horas.',
    },
  },
  cookies: {
    text: 'Usamos cookies de analítica (Google Analytics) para entender cómo se usa el sitio, solo si las aceptas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    more: 'Aviso de privacidad',
    label: 'Preferencias de cookies',
  },
  footer: {
    tagline: 'Ingeniería web premium para negocios que quieren crecer.',
    privacy: 'Aviso de privacidad',
    cookies: 'Preferencias de cookies',
    rights: 'Todos los derechos reservados.',
    contactTitle: 'Contacto',
    navTitle: 'Sitio',
  },
  privacy: {
    metaTitle: 'Aviso de privacidad — Bazan & Co.',
    metaDescription:
      'Cómo Bazan & Co. trata los datos personales del formulario de contacto, WhatsApp y Google Analytics.',
    title: 'Aviso de privacidad',
    updated: 'Última actualización: 3 de octubre de 2026',
    back: 'Volver al inicio',
    sections: [
      {
        title: 'Responsable',
        paragraphs: [
          'Bazan & Co., con domicilio en Chihuahua, México, es responsable del tratamiento de los datos personales que recibe a través de este sitio. Contacto: contacto@bazanco.com.',
          '[PENDIENTE USUARIO] Nombre completo del responsable y domicilio para oír y recibir notificaciones.',
        ],
      },
      {
        title: 'Datos que recabamos',
        paragraphs: [
          'Formulario de contacto: nombre, email, servicio de interés y el mensaje que escribas.',
          'WhatsApp: si nos escribes, recibimos tu número de teléfono, nombre de perfil y los mensajes que envíes, conforme a las condiciones de WhatsApp (Meta).',
          'Analítica: solo si aceptas las cookies de analítica, Google Analytics recaba datos de navegación como páginas visitadas, tipo de dispositivo y navegador, ubicación aproximada e identificadores de cookies. Si las rechazas, no se carga.',
          'No solicitamos datos personales sensibles ni financieros.',
        ],
      },
      {
        title: 'Para qué usamos tus datos',
        paragraphs: [
          'Finalidades principales: responder tu solicitud, enviarte una propuesta o cotización y dar seguimiento a la conversación que inicies.',
          'Finalidad secundaria (solo con tu consentimiento): medir de forma agregada cómo se usa el sitio para mejorarlo. Puedes negarte sin que afecte la atención que recibes.',
        ],
      },
      {
        title: 'Con quién se comparten',
        paragraphs: [
          'Usamos proveedores que procesan datos por nuestra cuenta: Netlify (alojamiento del sitio y recepción del formulario), Google (Google Analytics) y Meta (WhatsApp). Estos proveedores pueden almacenar información fuera de México.',
          'No vendemos ni cedemos tus datos a terceros para fines publicitarios.',
        ],
      },
      {
        title: 'Cookies y almacenamiento local',
        paragraphs: [
          'Al entrar te preguntamos si aceptas cookies de analítica. Si aceptas, Google Analytics usa cookies propias (por ejemplo, _ga). El sitio guarda tu elección en el almacenamiento local de tu navegador para no volver a preguntarte.',
          'Puedes cambiar tu decisión cuando quieras desde «Preferencias de cookies» en el pie de página, o borrar las cookies desde la configuración de tu navegador.',
        ],
      },
      {
        title: 'Tus derechos',
        paragraphs: [
          'Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso (derechos ARCO), así como revocar tu consentimiento, escribiendo a contacto@bazanco.com con tu nombre, el derecho que quieres ejercer y un medio para responderte.',
          '[PENDIENTE USUARIO] Plazo de respuesta a solicitudes ARCO y tiempo de conservación de los mensajes recibidos.',
        ],
      },
      {
        title: 'Cambios a este aviso',
        paragraphs: ['Cualquier cambio se publicará en esta página con su fecha de actualización.'],
      },
    ],
  },
  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscas no existe o cambió de dirección.',
    cta: 'Volver al inicio',
  },
};

export default es;
export type Dictionary = typeof es;
