/**
 * English copy. Same structure as `es.ts` (TypeScript fails the build if a key is missing).
 * Conventions: `*text*` = italic gold emphasis; `[PENDIENTE USUARIO] …` = data the owner must provide.
 * Written for English-speaking business owners, not translated word for word.
 */
import type { Dictionary } from './es';

const en: Dictionary = {
  meta: {
    title: 'Bazan & Co. — Premium web design, SEO and landing pages from Chihuahua, Mexico',
    description:
      'Web engineering studio in Chihuahua, Mexico, working remotely worldwide. Fast, bilingual, custom-built websites for local businesses and SMBs that want more customers.',
  },
  language: {
    name: 'English',
    short: 'EN',
    switchTo: 'View this site in English',
    suggestion: 'This site is also available in English.',
    suggestionCta: 'View in English',
    dismiss: 'No, thanks',
    suggestionLabel: 'Language suggestion',
  },
  a11y: {
    skipToContent: 'Skip to content',
    homeSuffix: ', home',
    mainNav: 'Main navigation',
    footerNav: 'Footer links',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    externalLink: '(opens in a new tab)',
    pendingLabel: 'Pending',
  },
  nav: {
    links: [
      { href: '#servicios', label: 'Services' },
      { href: '#proceso', label: 'Process' },
      { href: '#portafolio', label: 'Work' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contacto', label: 'Contact' },
    ],
    cta: 'Book a consultation',
  },
  whatsapp: {
    defaultMessage: "Hi! I'm interested in a professional website. Could we set up a consultation?",
    fabLabel: 'Message us on WhatsApp',
  },
  hero: {
    eyebrow: 'Web engineering · Chihuahua, Mexico',
    title: "We don't build web pages. *We engineer conversion machines.*",
    lead: "Fast, bilingual, custom-built websites for local businesses and SMBs that want more customers, not just more traffic. Your website isn't an expense: it's an asset that works for you every single day.",
    primaryCta: 'Message us on WhatsApp',
    secondaryCta: 'Book a consultation',
    note: 'You talk directly to the engineer who builds your site.',
  },
  trust: {
    label: 'Verifiable facts',
    items: [
      {
        value: '<2 s',
        number: null,
        prefix: '<',
        suffix: ' s',
        label: 'mobile load-time target',
      },
      { value: '100%', number: 100, prefix: '', suffix: '%', label: 'bilingual sites (ES/EN)' },
      {
        value: '95+',
        number: 95,
        prefix: '',
        suffix: '+',
        label: 'mobile Lighthouse score of this site',
      },
      {
        value: '1:1',
        number: null,
        prefix: '',
        suffix: '',
        label: 'direct access to your engineer',
      },
    ],
    credentials: [
      'Background in Software Development Engineering (UTCH BIS)',
      'Advanced English',
      'Chihuahua, Mexico · working remotely worldwide',
    ],
  },
  tech: {
    label: 'Technologies and tools we work with',
    items: [
      'Astro',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'JavaScript',
      'HTML',
      'CSS',
      'Netlify',
      'Google Analytics 4',
      'Google Search Console',
      'Lighthouse',
      'Schema.org',
    ],
  },
  problem: {
    eyebrow: 'The problem',
    title: "Your business is great. *Your website doesn't show it.*",
    lead: "Your customers look you up on their phones and decide in seconds. If your site isn't fast and clear, they go to your competitor.",
    problemsTitle: 'What happens today',
    problems: [
      'It loads slowly and people leave before they see it.',
      "It doesn't show up when people search for you on Google.",
      'It looks broken on phones, exactly where people find you.',
      "It doesn't clearly say what you do or how to reach you.",
    ],
    solutionTitle: 'What we build',
    solutions: [
      'Designed to load in under 2 seconds on mobile.',
      'Technical SEO from day one, so customers can find you.',
      'Mobile-first design that looks sharp on any screen.',
      'One clear goal: getting people to message you or book a call.',
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Solutions that drive *your digital growth.*',
    lead: 'Every service is approached like an engineering problem: measurable, scalable and focused on winning customers.',
    items: [
      {
        icon: 'monitor' as const,
        title: 'Premium Web Design',
        text: 'Custom websites built with clean code and an obsession with speed. Every section has a job: building trust and getting you contacted.',
        features: [
          '100% responsive, mobile-first design',
          'Load-time target under 2 seconds',
          'Spanish and English versions',
          'Hand-written code, no generic templates',
        ],
      },
      {
        icon: 'search' as const,
        title: 'SEO Optimization',
        text: 'Technical SEO so the people already searching for what you offer can find you.',
        features: [
          'On-page technical SEO',
          'Optimized Core Web Vitals',
          'Metadata and structured data',
          'Google Search Console setup and monitoring',
        ],
      },
      {
        icon: 'rocket' as const,
        title: 'High-Converting Landing Pages',
        text: 'Pages with a single goal: turning visitors into customers. A clear message and a design built around action.',
        features: [
          'Persuasive copy in English and Spanish',
          'Calls to action to WhatsApp and a contact form',
          'Conversion tracking with Google Analytics',
        ],
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'From idea to launch, *no surprises.*',
    lead: 'A clear four-step process. You always know where your project stands.',
    steps: [
      {
        icon: 'compass' as const,
        title: 'Discovery',
        text: 'We get to know your business, your customers and your competitors, then define what the site must achieve and how we will measure it.',
      },
      {
        icon: 'pen' as const,
        title: 'Design',
        text: 'Structure, copy and visual design built around your customer. You review and approve the proposal before development starts.',
      },
      {
        icon: 'code' as const,
        title: 'Development',
        text: 'Built with clean code and technical SEO, then tested for speed and accessibility on real phones.',
      },
      {
        icon: 'flag' as const,
        title: 'Launch',
        text: 'Go-live with Google Analytics and Search Console set up. We show you how to track your results.',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Work',
    title: 'Projects that *speak for themselves.*',
    lead: 'Real websites for real businesses in Chihuahua.',
    labels: {
      problem: 'Challenge',
      solution: 'Solution',
      stack: 'Stack',
      result: 'Result',
      testimonial: 'Testimonial',
      visit: 'Visit site',
      noImage: 'Screenshot pending',
    },
    projects: [
      {
        id: 'soldaduras',
        name: 'Soldaduras y Equipos',
        category: 'Landing page · Industrial supply',
        url: 'https://soldadurasequipos.netlify.app/',
        imageAlt:
          'Soldaduras y Equipos home page: the headline "Impulsa tu taller con los mejores equipos", a photo of the storefront and a location map.',
        problem:
          'A local supplier of welding consumables, industrial gases and repair services for workshops that needed its own website to showcase its offer and make it easy to get in touch.',
        solution:
          'A landing page with a product and brand catalog, a machine-repair section, a location map and direct contact through WhatsApp.',
        stack: ['HTML', 'Tailwind CSS', 'JavaScript', 'Google Maps'],
        result: '[PENDIENTE USUARIO] Measurable project result (traffic, leads, sales).',
        testimonial: '[PENDIENTE USUARIO] Client testimonial (with their permission).',
      },
      {
        id: 'ries',
        name: 'RIES Chihuahua',
        category: 'Corporate website · Industrial and maquiladora sector',
        // [REVISAR] See es.ts: link hidden until the HTTPS certificate of rieschihuahua.com is fixed.
        url: null,
        imageAlt:
          'RIES Chihuahua home page: the RIES logo, the tagline "La solución en soldadura" and contact and WhatsApp buttons on a dark background.',
        problem:
          'An industrial representation and welding equipment company serving the maquiladora sector that needed a brand image on par with its industrial clients.',
        solution:
          'A website with services, company overview, locations and contact; a dark identity with the brand yellow and one-tap access to WhatsApp.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        result: '[PENDIENTE USUARIO] Measurable project result (traffic, leads, sales).',
        testimonial: '[PENDIENTE USUARIO] Client testimonial (with their permission).',
      },
      {
        id: 'gech',
        name: 'GECH',
        category: '[PENDIENTE USUARIO] Project type and industry',
        url: null,
        imageAlt: '',
        problem: "[PENDIENTE USUARIO] The client's challenge or need.",
        solution: '[PENDIENTE USUARIO] What was built.',
        stack: ['[PENDIENTE USUARIO] Technologies used'],
        result: '[PENDIENTE USUARIO] Measurable project result.',
        testimonial: '[PENDIENTE USUARIO] Client testimonial (with their permission).',
      },
    ],
  },
  why: {
    eyebrow: 'Why Bazan & Co.',
    title: 'Engineering rigor, *direct access.*',
    lead: "What sets us apart isn't only what we do, but how we do it.",
    items: [
      {
        icon: 'bolt' as const,
        title: 'Speed',
        text: 'Sites designed to load in under 2 seconds on mobile. Speed helps your rankings and keeps visitors around.',
      },
      {
        icon: 'code' as const,
        title: 'Clean code',
        text: 'Maintainable, scalable architecture with no bloated templates. Your site can grow without starting over.',
      },
      {
        icon: 'chat' as const,
        title: 'Direct support',
        text: 'You talk to the engineer who builds your site. No middlemen, no lost tickets.',
      },
      {
        icon: 'chart' as const,
        title: 'Measurable results',
        text: 'Google Analytics and Search Console set up so you can see how many people visit and how many get in touch.',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'What people ask us *most.*',
    items: [
      {
        q: 'How much does a website cost?',
        a: 'It depends on the scope: number of sections, languages and integrations. After the discovery call you get a written quote that spells out everything included.',
        pending: '[PENDIENTE USUARIO] Indicative price ranges, if you want to show them.',
      },
      {
        q: 'How long does it take?',
        a: 'It depends on the scope and on how soon we have your copy and images.',
        pending: '[PENDIENTE USUARIO] Typical delivery time per project type.',
      },
      {
        q: 'Do I need to be tech-savvy?',
        a: 'No. We handle the technical side and explain every decision in plain language, no jargon.',
        pending: null,
      },
      {
        q: 'Do you work with businesses outside Chihuahua?',
        a: "Yes. We're based in Chihuahua, Mexico, and work remotely with businesses anywhere, in English or Spanish.",
        pending: null,
      },
      {
        q: 'Will my site show up on Google?',
        a: "We build it with technical SEO from day one and register it with Google Search Console. Rankings also depend on your competition and your content, so we don't promise a specific position, but we do show you how to track your progress.",
        pending: null,
      },
      {
        q: 'What happens after launch?',
        a: 'We hand over a working site and show you how to check your metrics.',
        pending: '[PENDIENTE USUARIO] Maintenance or support plan after launch, and its cost.',
      },
    ],
  },
  finalCta: {
    title: 'Ready for a website that *works for you?*',
    text: "Book a free technical consultation. We'll review where you stand today and propose a web strategy focused on real results.",
    primaryCta: 'Message us on WhatsApp',
    secondaryCta: "I'd rather use the form",
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about *your next project.*",
    lead: "Every project starts with a conversation. Tell us what you need and we'll send you a tailored proposal, no strings attached.",
    channels: {
      whatsapp: 'WhatsApp',
      email: 'Email',
      location: 'Location',
      locationValue: 'Chihuahua, Mexico · working remotely worldwide',
    },
    form: {
      title: 'Send us a message',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      service: 'Service you are interested in',
      servicePlaceholder: 'Choose a service',
      services: [
        { value: 'diseno-web', label: 'Premium Web Design' },
        { value: 'seo', label: 'SEO Optimization' },
        { value: 'landing-page', label: 'High-Converting Landing Page' },
        { value: 'otro', label: "Something else / I'm not sure" },
      ],
      message: 'Message',
      messagePlaceholder: 'Tell us about your business and what you need…',
      optional: '(optional)',
      submit: 'Send message',
      required: 'Required field',
      errors: {
        name: 'Please enter your name.',
        emailRequired: 'Please enter your email.',
        emailInvalid: 'Check your email, it looks incomplete (example: you@company.com).',
        service: 'Choose a service or "Something else / I\'m not sure".',
        summary: 'Please fix the highlighted fields to send your message.',
      },
      notConnected:
        'The form will be connected in the next phase. Meanwhile, message us on WhatsApp.',
      responseTime: 'We reply within 24 hours.',
    },
  },
  cookies: {
    text: 'We use analytics cookies (Google Analytics) to understand how the site is used, only if you accept them.',
    accept: 'Accept',
    reject: 'Decline',
    more: 'Privacy notice',
    label: 'Cookie preferences',
  },
  footer: {
    tagline: 'Premium web engineering for businesses that want to grow.',
    privacy: 'Privacy notice',
    cookies: 'Cookie preferences',
    rights: 'All rights reserved.',
    contactTitle: 'Contact',
    navTitle: 'Site',
  },
  privacy: {
    metaTitle: 'Privacy notice — Bazan & Co.',
    metaDescription:
      'How Bazan & Co. handles personal data from the contact form, WhatsApp and Google Analytics.',
    title: 'Privacy notice',
    updated: 'Last updated: October 3, 2026',
    back: 'Back to home',
    translationNote:
      'This is a courtesy translation. In case of any discrepancy, the Spanish version prevails.',
    sections: [
      {
        title: 'Data controller',
        paragraphs: [
          'Bazan & Co., based in Chihuahua, Mexico, is responsible for the personal data it receives through this website. Contact: contacto@bazanco.com.',
          '[PENDIENTE USUARIO] Full legal name of the data controller and address for notices.',
        ],
      },
      {
        title: 'Data we collect',
        paragraphs: [
          'Contact form: name, email, service of interest and the message you write.',
          'WhatsApp: if you message us, we receive your phone number, profile name and the messages you send, under the terms of WhatsApp (Meta).',
          "Analytics: only if you accept analytics cookies, Google Analytics collects browsing data such as pages visited, device and browser type, approximate location and cookie identifiers. If you decline, it isn't loaded.",
          'We do not ask for sensitive or financial personal data.',
        ],
      },
      {
        title: 'How we use your data',
        paragraphs: [
          'Primary purposes: answering your request, sending you a proposal or quote, and following up on the conversation you start.',
          'Secondary purpose (only with your consent): measuring, in aggregate, how the site is used in order to improve it. You can opt out without it affecting the service you receive.',
        ],
      },
      {
        title: 'Who we share it with',
        paragraphs: [
          'We use providers that process data on our behalf: Netlify (website hosting and form submissions), Google (Google Analytics) and Meta (WhatsApp). These providers may store information outside Mexico.',
          'We do not sell or hand over your data to third parties for advertising.',
        ],
      },
      {
        title: 'Cookies and local storage',
        paragraphs: [
          "When you arrive we ask whether you accept analytics cookies. If you do, Google Analytics sets first-party cookies (for example, _ga). The site saves your choice, and your preferred language if you switch it, in your browser's local storage so we don't ask again.",
          'You can change your choice at any time from "Cookie preferences" in the footer, or delete cookies in your browser settings.',
        ],
      },
      {
        title: 'Your rights',
        paragraphs: [
          'You can access, rectify or delete your data, or object to its use (ARCO rights under Mexican law), and withdraw your consent, by writing to contacto@bazanco.com with your name, the right you want to exercise and a way to reply to you.',
          '[PENDIENTE USUARIO] Response time for ARCO requests and how long received messages are kept.',
        ],
      },
      {
        title: 'Changes to this notice',
        paragraphs: ['Any change will be published on this page with its update date.'],
      },
    ],
  },
  notFound: {
    title: 'Page not found',
    text: "The page you're looking for doesn't exist or has moved.",
    cta: 'Back to home',
  },
};

export default en;
