import {
  AcademicCapIcon,
  ArrowRightIcon,
  BoltIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CheckIcon,
  CodeIcon,
  CompassIcon,
  DesktopIcon,
  ExternalLinkIcon,
  FlagIcon,
  GlobeIcon,
  PenToolIcon,
  PlusIcon,
  RocketIcon,
  ShieldCheckIcon,
  WhatsAppIcon,
  XCircleIcon,
} from './ui/Icons';

export const WHATSAPP_URL =
  'https://wa.me/5216143436765?text=Hola%2C%20me%20interesa%20una%20p%C3%A1gina%20web%20profesional.%20%C2%BFPodemos%20agendar%20una%20consulta%3F';

export function HeroSection() {
  const stats = [
    { value: '<2s', label: 'Objetivo de carga móvil (LCP)' },
    { value: '95+', label: 'Estándar Lighthouse Móvil' },
    { value: '100%', label: 'Sitios Bilingües ES/EN' },
    { value: '1:1', label: 'Trato directo con el ingeniero' },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.22), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-container px-6">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-light">
              Ingeniería Web de Alto Nivel · Chihuahua, México
            </span>
          </div>

          <h1
            id="hero-heading"
            className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-content-primary sm:text-5xl lg:text-6xl"
          >
            No construimos páginas web.
            <span className="gradient-gold-text mt-2 block">Diseñamos máquinas de conversión.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-content-secondary sm:text-xl">
            Somos una firma de ingeniería de software en Chihuahua, México (con servicio remoto
            global) especializada en crear experiencias digitales rápidas, bilingües y orientadas a
            resultados para negocios locales y PYMEs. Tu sitio web no es un gasto — es tu activo
            digital más rentable.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-primary inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Escribir por WhatsApp</span>
            </a>

            <a
              href="#contacto"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-white/15 bg-obsidian-surface px-7 py-3.5 font-heading text-base font-bold text-content-primary hover:border-gold/40 hover:bg-obsidian-elevated"
            >
              <span>Agenda una Consulta Técnica</span>
              <ArrowRightIcon className="h-4 w-4 text-gold" />
            </a>
          </div>

          <p className="mt-4 text-sm text-content-muted">
            Atención directa del ingeniero a cargo · Sin intermediarios · Diagnóstico inicial sin
            costo
          </p>
        </div>

        <dl
          aria-label="Indicadores técnicos verificables"
          className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-gold/40 pl-5">
              <dt className="mt-1 text-sm text-content-muted">{stat.label}</dt>
              <dd className="order-first font-heading text-3xl font-black tabular-nums text-content-primary sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function TrustBarSection() {
  const credentials = [
    'Ingeniería en Desarrollo de Software (UTCH BIS)',
    'Inglés avanzado (iTEP Academic Plus)',
    'Carga objetivo <2s y Core Web Vitals óptimos',
    'Arquitectura 100% a medida (0% plantillas genéricas)',
    'Chihuahua, México · Servicio remoto global',
  ];

  return (
    <section
      aria-label="Barra de confianza y credenciales"
      className="border-y border-white/10 bg-obsidian-surface/80 py-6"
    >
      <div className="mx-auto max-w-container px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-content-secondary lg:justify-between">
          {credentials.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <ShieldCheckIcon className="h-5 w-5 shrink-0 text-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProblemSolutionSection() {
  const problems = [
    'Plantillas genéricas y pesadas que tardan más de 5 segundos en abrir desde el celular, haciendo que el visitante cierre la pestaña.',
    'Diseño improvisado que no transmite la seriedad ni la calidad real de tu negocio frente a tus competidores.',
    'Invisibilidad en Google por falta de estructura semántica, metadatos técnicos y optimización local.',
    'Páginas informativas sin un embudo claro: el visitante entra, no entiende cómo cotizar rápido y nunca te escribe.',
  ];

  const solutions = [
    'Ingeniería de rendimiento extremo (<2 segundos de carga objetivo) para retener a cada prospecto desde el primer clic.',
    'Diseño oscuro, sobrio y de autoridad que posiciona a tu empresa como líder confiable en su sector.',
    'SEO técnico de raíz (Schema.org, Core Web Vitals, Search Console) para captar demanda activa en tu ciudad o mercado.',
    'Arquitectura enfocada en un único objetivo comercial: que te contacten por WhatsApp o agenden una consulta.',
  ];

  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="scroll-mt-20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              Problema / Solución
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="problema-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            Tu negocio es excelente.{' '}
            <span className="gradient-gold-text">Tu sitio web debe demostrarlo en segundos.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            La mayoría de los dueños de negocios locales pierden clientes todos los días por tener
            un sitio lento o confuso. Nosotros reemplazamos la improvisación con ingeniería de
            software.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-obsidian-surface p-7 sm:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose-300">
              Lo habitual en el mercado
            </div>
            <h3 className="mt-4 font-heading text-2xl font-bold text-content-primary">
              Por qué las páginas convencionales no generan clientes
            </h3>
            <ul className="mt-6 space-y-4">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3.5 text-content-secondary">
                  <XCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span className="text-sm leading-relaxed sm:text-base">{problem}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-gold/35 bg-obsidian-elevated p-7 shadow-card sm:p-9">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
              aria-hidden="true"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-light">
              El Estándar Bazan &amp; Co.
            </div>
            <h3 className="mt-4 font-heading text-2xl font-bold text-content-primary">
              Ingeniería de software aplicada a tu conversión comercial
            </h3>
            <ul className="mt-6 space-y-4">
              {solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-3.5 text-content-primary">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm leading-relaxed sm:text-base">{solution}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const services = [
    {
      title: 'Diseño Web Premium',
      description:
        'Sitios construidos con código limpio, diseño a medida y una obsesión por la velocidad de carga. Cada píxel tiene un propósito de conversión y autoridad de marca.',
      icon: DesktopIcon,
      features: [
        'Diseño 100% responsivo y mobile-first',
        'Carga ultra-rápida (<2s) en redes móviles',
        'Arquitectura escalable sin plantillas genéricas',
        'Capacidad bilingüe ES/EN real',
      ],
    },
    {
      title: 'Optimización SEO',
      description:
        'Posicionamiento técnico que pone a tu negocio frente a quienes realmente te buscan en Google. Estructura semántica, metadatos optimizados y velocidad verificable.',
      icon: ChartBarIcon,
      features: [
        'SEO técnico on-page y jerarquía semántica',
        'Core Web Vitals óptimos (LCP, CLS, INP)',
        'Datos estructurados Schema.org (JSON-LD)',
        'Indexación estratégica en Google Search Console',
      ],
    },
    {
      title: 'Landing Pages de Alta Conversión',
      description:
        'Páginas de aterrizaje diseñadas para un solo objetivo: convertir visitantes en clientes. Copy persuasivo, diseño centrado en la acción y contacto directo.',
      icon: RocketIcon,
      features: [
        'Copy persuasivo orientado a acción en ES/EN',
        'Integración directa con WhatsApp y formulario',
        'Fricción cero para maximizar solicitudes de cotización',
        'Medición de eventos clave con Google Analytics 4',
      ],
    },
  ];

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="scroll-mt-20 border-t border-white/10 bg-obsidian-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              Servicios
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="servicios-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            Soluciones que impulsan{' '}
            <span className="gradient-gold-text">tu crecimiento digital.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            Cada servicio está diseñado con un enfoque de ingeniería: medible, escalable y orientado
            al retorno de inversión de tu negocio.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-obsidian-surface p-7 shadow-card hover:border-gold/35 sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                  <IconComponent className="h-7 w-7" />
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold text-content-primary">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary sm:text-base">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-content-primary"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      description:
        'Analizamos tu negocio, tus clientes potenciales y tu competencia. Definimos qué objetivo comercial debe cumplir el sitio y cómo mediremos su éxito.',
      icon: CompassIcon,
    },
    {
      number: '02',
      title: 'Diseño',
      description:
        'Estructuramos la arquitectura de conversión, los mensajes clave y el diseño visual a medida. Revisas y apruebas la propuesta antes de programar.',
      icon: PenToolIcon,
    },
    {
      number: '03',
      title: 'Desarrollo',
      description:
        'Construimos tu sitio con código limpio, SEO técnico on-page, optimización de imágenes WebP y pruebas rigurosas de velocidad (<2s) en móvil.',
      icon: CodeIcon,
    },
    {
      number: '04',
      title: 'Lanzamiento',
      description:
        'Desplegamos en producción con certificado SSL, Google Analytics 4, Search Console y canales de WhatsApp y formulario verificados.',
      icon: FlagIcon,
    },
  ];

  return (
    <section
      id="proceso"
      aria-labelledby="proceso-heading"
      className="scroll-mt-20 border-t border-white/10 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              Proceso de Ingeniería
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="proceso-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            De la idea al lanzamiento, <span className="gradient-gold-text">sin sorpresas.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            Un método claro en cuatro etapas donde siempre tienes visibilidad directa del avance de
            tu proyecto.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <li
                key={step.number}
                className="flex flex-col rounded-2xl border border-white/10 bg-obsidian-surface p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                    <IconComponent className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-sm font-bold text-gold-light">{step.number}</span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-content-primary">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-content-secondary">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function PortfolioSection() {
  const projects = [
    {
      id: 'soldaduras-y-equipos',
      title: 'Soldaduras y Equipos',
      category: 'Landing Page · Suministros Industriales',
      image: '/img/Consumbiles.webp',
      imageAlt:
        'Catálogo de equipos de soldadura, careta electrónica y consumibles industriales de Soldaduras y Equipos',
      url: 'https://soldadurasequipos.netlify.app/',
      problem:
        'Empresa comercializadora de consumibles, gases industriales y servicio técnico para soldadura que requería presencia digital propia para exhibir su catálogo y captar cotizaciones de talleres.',
      solution:
        'Landing page de carga rápida con presentación clara de líneas de producto, sección de mantenimiento de equipos, mapa de ubicación y botón de contacto directo vía WhatsApp.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'SEO Local'],
      result: '[PENDIENTE USUARIO: Métrica verificable de solicitudes de cotización o visitas]',
      testimonial: '[PENDIENTE USUARIO: Testimonio autorizado del cliente en Soldaduras y Equipos]',
    },
    {
      id: 'ries-chihuahua',
      title: 'RIES Chihuahua',
      titleBadge: 'Sector Maquilador',
      category: 'Sitio Corporativo B2B · Industria y Maquila',
      image: '/img/RIES_Logo_BW.webp',
      imageAlt:
        'Logotipo industrial de RIES Chihuahua con emblema de soldador especializado para el sector maquilador',
      url: 'https://rieschihuahua.com/',
      problem:
        'Proveedor de suministros y equipos de soldadura enfocado en el sector maquilador de Chihuahua que necesitaba proyectar solidez corporativa B2B y facilitar el contacto de compradores industriales.',
      solution:
        'Sitio web especializado con enfoque en atención a industria maquiladora, presentación de capacidades de suministro técnico y canal directo de atención comercial.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'SEO Técnico B2B'],
      result: '[PENDIENTE USUARIO: Métrica verificable de prospectos industriales captados]',
      testimonial: '[PENDIENTE USUARIO: Testimonio autorizado del cliente en RIES Chihuahua]',
    },
    {
      id: 'gech',
      title: 'GECH',
      category: 'Proyecto Web · Chihuahua, México',
      image: '/img/bazancologo.webp',
      imageAlt:
        'Vista previa institucional reservada para el caso de estudio de GECH desarrollado por Bazan & Co.',
      url: undefined,
      isPendingCapture: true,
      problem:
        'Organización en Chihuahua que requería estructurar y modernizar su presencia digital con una plataforma rápida, accesible en dispositivos móviles y orientada a la generación de confianza. [PENDIENTE USUARIO: Confirmar detalle específico del reto de GECH]',
      solution:
        'Desarrollo de interfaz web a medida con arquitectura limpia, navegación clara por servicios, optimización para buscadores y puntos de contacto directo. [PENDIENTE USUARIO: Confirmar alcance final entregado a GECH]',
      stack: ['HTML5 / CSS3', 'JavaScript', 'Diseño Responsivo', 'SEO Técnico'],
      result: '[PENDIENTE USUARIO: Métrica verificable de impacto del proyecto GECH]',
      testimonial: '[PENDIENTE USUARIO: Testimonio autorizado del cliente en GECH]',
    },
  ];

  return (
    <section
      id="portafolio"
      aria-labelledby="portafolio-heading"
      className="scroll-mt-20 border-t border-white/10 bg-obsidian-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              Portafolio
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="portafolio-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            Proyectos que hablan <span className="gradient-gold-text">por sí mismos.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            Cada proyecto refleja nuestra obsesión por el detalle, el rendimiento móvil y la
            experiencia de usuario orientada a conversión.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-obsidian-surface shadow-card"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-obsidian-elevated">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full ${
                    project.isPendingCapture
                      ? 'object-contain p-10 opacity-40'
                      : 'object-cover object-center'
                  }`}
                />
                {project.isPendingCapture && (
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-obsidian-base/90 via-obsidian-base/40 to-transparent p-4">
                    <span className="rounded-md border border-dashed border-gold/50 bg-obsidian-base/90 px-3 py-1 font-mono text-xs text-gold-light">
                      [PENDIENTE USUARIO: Captura oficial de GECH]
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                  {project.category}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-content-primary">
                  {project.title}
                </h3>

                <dl className="mt-5 flex-1 space-y-4 text-sm">
                  <div>
                    <dt className="font-heading font-bold text-content-primary">Problema</dt>
                    <dd className="mt-1 leading-relaxed text-content-secondary">
                      {project.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-heading font-bold text-content-primary">Solución</dt>
                    <dd className="mt-1 leading-relaxed text-content-secondary">
                      {project.solution}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-heading font-bold text-content-primary">Resultado</dt>
                    <dd className="mt-1">
                      <span className="inline-block rounded-lg border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 font-mono text-xs text-gold-light">
                        {project.result}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-heading font-bold text-content-primary">Testimonio</dt>
                    <dd className="mt-1">
                      <span className="inline-block rounded-lg border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 font-mono text-xs text-gold-light">
                        {project.testimonial}
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-content-muted">
                    Stack Técnico
                  </p>
                  <ul
                    className="mt-2.5 flex flex-wrap gap-2"
                    aria-label={`Stack de ${project.title}`}
                  >
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-mono text-xs font-medium text-gold-light"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-gold-light hover:text-gold"
                    >
                      <span>Ver proyecto en vivo</span>
                      <ExternalLinkIcon className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="mt-5 font-mono text-xs text-content-muted">
                      [PENDIENTE USUARIO: Enlace público de GECH]
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  const pillars = [
    {
      title: 'Velocidad Extrema (<2s)',
      description:
        'Sitios diseñados para cargar en menos de 2 segundos en redes móviles. Rendimiento técnico real que mejora tu SEO y retiene a tus prospectos.',
      icon: BoltIcon,
    },
    {
      title: 'Respaldo Académico e Ingeniería',
      description:
        'Formación en Ingeniería en Desarrollo de Software por la Universidad Tecnológica de Chihuahua (UTCH BIS). Arquitectura limpia, sin deuda técnica.',
      icon: AcademicCapIcon,
    },
    {
      title: 'Alcance Bilingüe Internacional',
      description:
        'Inglés avanzado (iTEP Academic Plus) para construir sitios 100% bilingües (ES/EN) con redacción natural que abre puertas a clientes en México y EE. UU.',
      icon: GlobeIcon,
    },
    {
      title: 'Trato Directo 1:1 sin Intermediarios',
      description:
        'Comunicación directa con el ingeniero responsable de tu proyecto. Sin vendedores comisionistas, sin tickets perdidos y con resultados medibles.',
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <section
      id="por-que"
      aria-labelledby="por-que-heading"
      className="scroll-mt-20 border-t border-white/10 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
                Diferenciadores
              </span>
            </div>
            <h2
              id="por-que-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
            >
              ¿Por qué elegir <span className="gradient-gold-text">Bazan &amp; Co.?</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-content-secondary">
              En <strong className="text-content-primary">Bazan &amp; Co.</strong> aplicamos
              estándares de ingeniería de software de primer nivel. No somos una agencia masiva que
              recicla plantillas lentas; construimos activos digitales a la medida diseñados para
              generar confianza, autoridad y contactos comerciales.
            </p>
            <p className="mt-4 text-base leading-relaxed text-content-secondary">
              Nuestro dominio de{' '}
              <strong className="text-content-primary">Inglés avanzado (iTEP Academic Plus)</strong>{' '}
              y formación en la <strong className="text-content-primary">UTCH BIS</strong>{' '}
              garantizan una ejecución impecable tanto en código como en comunicación comercial
              bilingüe.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/10 bg-obsidian-surface p-6 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-content-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const faqs = [
    {
      question: '¿Cuánto cuesta desarrollar un sitio web o landing page?',
      answer:
        'La inversión depende del alcance del proyecto (landing page de conversión, sitio corporativo multipágina o integración bilingüe ES/EN). Tras una breve llamada de diagnóstico sin costo, entregamos una propuesta cerrada por escrito sin cargos ocultos.',
      pendingNote:
        '[PENDIENTE USUARIO: Rangos de inversión orientativos por paquete si desea publicarlos]',
    },
    {
      question: '¿En cuánto tiempo estará listo mi sitio web?',
      answer:
        'Trabajamos por hitos semanales claros (Diagnóstico, Diseño, Desarrollo y Lanzamiento) para que puedas revisar avances reales desde la primera semana.',
      pendingNote: '[PENDIENTE USUARIO: Tiempo estimado promedio de entrega en semanas]',
    },
    {
      question: '¿Necesito saber de programación o tecnología para trabajar con ustedes?',
      answer:
        'En absoluto. Nos encargamos del 100% de la complejidad técnica (dominio, hosting, certificado SSL, velocidad, SEO y analítica) y te hablamos siempre en términos de negocio y resultados.',
    },
    {
      question: '¿Trabajan solo en Chihuahua o atienden a negocios de otras ciudades y países?',
      answer:
        'Nuestra firma está en Chihuahua, México, y trabajamos de forma remota con empresas de todo México, Estados Unidos y Latinoamérica, tanto en español como en inglés.',
    },
    {
      question:
        '¿Qué diferencia hay entre Bazan & Co. y una agencia tradicional con WordPress/Wix?',
      answer:
        'Los constructores visuales genéricos generan código pesado que tarda en cargar y limita tu crecimiento. Nosotros desarrollamos con ingeniería de software moderna logrando cargas menores a 2 segundos, seguridad superior y diseño 100% enfocado en que tus visitantes te contacten.',
    },
    {
      question: '¿Ofrecen mantenimiento o actualizaciones después del lanzamiento?',
      answer:
        'Tu sitio queda completamente funcional, documentado y con Google Analytics 4 y Search Console activos. Además, contamos con acompañamiento técnico directo cuando tu negocio requiera nuevas secciones o ajustes.',
      pendingNote:
        '[PENDIENTE USUARIO: Detalles de póliza o esquema de soporte mensual post-lanzamiento]',
    },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 border-t border-white/10 bg-obsidian-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              Preguntas Frecuentes
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="faq-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            Resolvemos tus dudas <span className="gradient-gold-text">antes de empezar.</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-obsidian-surface">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-bold text-content-primary sm:text-lg">
                <span>{faq.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-transform group-open:rotate-45">
                  <PlusIcon className="h-4 w-4" />
                </span>
              </summary>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-content-secondary sm:text-base">
                <p>{faq.answer}</p>
                {faq.pendingNote && (
                  <p className="inline-block rounded-lg border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 font-mono text-xs text-gold-light">
                    {faq.pendingNote}
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section aria-labelledby="final-cta-heading" className="py-20 md:py-24">
      <div className="mx-auto max-w-container px-6">
        <div className="relative overflow-hidden rounded-3xl border border-gold/35 bg-gradient-to-br from-obsidian-elevated via-obsidian-surface to-obsidian-base px-6 py-14 text-center shadow-card sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4), transparent 70%)',
            }}
            aria-hidden="true"
          />
          <h2
            id="final-cta-heading"
            className="mx-auto max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            ¿Listo para transformar tu presencia digital en una{' '}
            <span className="gradient-gold-text">máquina de conversión?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
            Agenda una consulta técnica sin costo o escríbenos directamente por WhatsApp. Analizamos
            tu situación actual y diseñamos una estrategia web enfocada en resultados reales.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-primary inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Iniciar Conversación por WhatsApp</span>
            </a>
            <a
              href="#contacto"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-white/15 bg-obsidian-base/80 px-7 py-3.5 font-heading text-base font-bold text-content-primary hover:border-gold/40"
            >
              <span>Solicitar Propuesta por Formulario</span>
              <ArrowRightIcon className="h-4 w-4 text-gold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
