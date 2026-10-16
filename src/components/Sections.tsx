import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/analytics';
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

interface StatItem {
  displayValue: string;
  numericTarget?: number;
  prefix: string;
  suffix: string;
  label: string;
}

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
}

interface PortfolioProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  url?: string;
  isPendingCapture?: boolean;
  problem: string;
  solution: string;
  stack: string[];
  result: string;
  testimonial: string;
}

interface WhyUsPillarItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
  pendingNote?: string;
}

export function RevealOnScroll({
  children,
  delayMs = 0,
  className = '',
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<'ssr' | 'hidden' | 'visible'>('ssr');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('visible');
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setState('visible');
      return;
    }

    setState('hidden');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setState('visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibilityClass =
    state === 'hidden' ? 'is-hidden' : state === 'visible' ? 'is-visible' : '';

  return (
    <div
      ref={ref}
      style={{ '--reveal-delay': `${delayMs}ms` } as CSSProperties}
      className={`reveal-item ${visibilityClass} ${className}`}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({
  displayValue,
  numericTarget,
  prefix = '',
  suffix = '',
}: {
  displayValue: string;
  numericTarget?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [text, setText] = useState(displayValue);

  useEffect(() => {
    setText(displayValue);
    const el = ref.current;
    if (!el || numericTarget === undefined) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frameId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const duration = 1100;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.max(1, Math.round(eased * numericTarget));
          setText(`${prefix}${current}${suffix}`);
          if (progress < 1) {
            frameId = window.requestAnimationFrame(tick);
          } else {
            setText(displayValue);
          }
        };

        frameId = window.requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [displayValue, numericTarget, prefix, suffix]);

  return (
    <dd
      ref={ref}
      className="order-first font-heading text-3xl font-black tabular-nums text-content-primary sm:text-4xl"
    >
      {text}
    </dd>
  );
}

function TiltSpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    el.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
    el.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    el.style.setProperty('--ty', '-4px');
    el.style.setProperty('--spot-x', `${x.toFixed(0)}px`);
    el.style.setProperty('--spot-y', `${y.toFixed(0)}px`);
    el.style.setProperty('--spot-opacity', '1');
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--ty', '0px');
    el.style.setProperty('--spot-opacity', '0');
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`tilt-card ${className}`}
    >
      <div className="tilt-card__spotlight" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </article>
  );
}

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const line1Words = t('hero.line1Words', { returnObjects: true }) as string[];
  const line2Words = t('hero.line2Words', { returnObjects: true }) as string[];
  const stats = t('hero.stats', { returnObjects: true }) as StatItem[];
  const whatsappUrl = t('whatsapp.url');

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div className="hero-grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="animate-float-orb pointer-events-none absolute -top-28 right-1/4 -z-10 h-[28rem] w-[28rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.24) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="animate-float-orb pointer-events-none absolute bottom-0 left-10 -z-10 h-[22rem] w-[22rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.10) 0%, transparent 70%)',
          animationDelay: '-5s',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-container px-6">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-light">
              {t('hero.badge')}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-content-primary sm:text-5xl lg:text-6xl"
          >
            <span className="block">
              {line1Words.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  style={{ '--word-delay': `${idx * 65}ms` } as CSSProperties}
                  className="hero-word mr-[0.26em]"
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="mt-2 block">
              {line2Words.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  style={{ '--word-delay': `${(idx + line1Words.length) * 65}ms` } as CSSProperties}
                  className="hero-word gradient-gold-text mr-[0.26em]"
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-content-secondary sm:text-xl">
            {t('hero.subtitle')}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('whatsapp_click', {
                  location: 'hero',
                  language: i18n.language,
                })
              }
              className="btn-gold-primary inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base shadow-glow"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{t('hero.ctaPrimary')}</span>
            </a>

            <a
              href="#contacto"
              className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-white/15 bg-obsidian-surface px-7 py-3.5 font-heading text-base font-bold text-content-primary transition-transform duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-obsidian-elevated"
            >
              <span>{t('hero.ctaSecondary')}</span>
              <ArrowRightIcon className="h-4 w-4 text-gold transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          <p className="mt-4 text-sm text-content-muted">{t('hero.microcopy')}</p>
        </div>

        <dl
          aria-label={t('hero.statsAria')}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-gold/40 pl-5">
              <dt className="mt-1 text-sm text-content-muted">{stat.label}</dt>
              <AnimatedCounter
                displayValue={stat.displayValue}
                numericTarget={stat.numericTarget}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function TrustBarSection() {
  const { t } = useTranslation();
  const credentials = t('trustBar.items', { returnObjects: true }) as string[];

  return (
    <section
      aria-label={t('trustBar.ariaLabel')}
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
  const { t } = useTranslation();
  const problems = t('problemSolution.problems', { returnObjects: true }) as string[];
  const solutions = t('problemSolution.solutions', { returnObjects: true }) as string[];

  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="scroll-mt-20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              {t('problemSolution.eyebrow')}
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="problema-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            {t('problemSolution.headingPart1')}{' '}
            <span className="gradient-gold-text">{t('problemSolution.headingHighlight')}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            {t('problemSolution.subtitle')}
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <RevealOnScroll delayMs={80}>
            <article className="h-full rounded-2xl border border-white/10 bg-obsidian-surface p-7 sm:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose-300">
                {t('problemSolution.problemBadge')}
              </div>
              <h3 className="mt-4 font-heading text-2xl font-bold text-content-primary">
                {t('problemSolution.problemTitle')}
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
          </RevealOnScroll>

          <RevealOnScroll delayMs={180}>
            <article className="relative h-full overflow-hidden rounded-2xl border border-gold/35 bg-obsidian-elevated p-7 shadow-card sm:p-9">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                aria-hidden="true"
              />
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-light">
                {t('problemSolution.solutionBadge')}
              </div>
              <h3 className="mt-4 font-heading text-2xl font-bold text-content-primary">
                {t('problemSolution.solutionTitle')}
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
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const { t } = useTranslation();
  const serviceItems = t('services.items', { returnObjects: true }) as ServiceItem[];
  const icons = [DesktopIcon, ChartBarIcon, RocketIcon];

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="scroll-mt-20 border-t border-white/10 bg-obsidian-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              {t('services.eyebrow')}
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="servicios-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            {t('services.headingPart1')}{' '}
            <span className="gradient-gold-text">{t('services.headingHighlight')}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            {t('services.subtitle')}
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {serviceItems.map((service, idx) => {
            const IconComponent = icons[idx] ?? DesktopIcon;
            return (
              <RevealOnScroll key={service.title} delayMs={idx * 100}>
                <TiltSpotlightCard className="h-full rounded-2xl border border-white/10 bg-obsidian-surface p-7 shadow-card hover:border-gold/35 sm:p-8">
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
                </TiltSpotlightCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TechMarqueeSection() {
  const { t } = useTranslation();
  const stackItems = t('marquee.items', { returnObjects: true }) as string[];

  return (
    <section
      aria-label={t('marquee.ariaLabel')}
      className="overflow-hidden border-y border-white/10 bg-obsidian-base py-5"
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((copyIdx) => (
          <ul
            key={copyIdx}
            aria-hidden={copyIdx === 1 ? 'true' : undefined}
            className="flex shrink-0 items-center gap-10 pr-10"
          >
            {stackItems.map((item) => (
              <li
                key={`${copyIdx}-${item}`}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-widest text-content-muted"
              >
                <span>{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/60" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection() {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true }) as ProcessStepItem[];
  const icons = [CompassIcon, PenToolIcon, CodeIcon, FlagIcon];

  return (
    <section id="proceso" aria-labelledby="proceso-heading" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-container px-6">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              {t('process.eyebrow')}
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="proceso-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            {t('process.headingPart1')}{' '}
            <span className="gradient-gold-text">{t('process.headingHighlight')}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            {t('process.subtitle')}
          </p>
        </RevealOnScroll>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const IconComponent = icons[idx] ?? CompassIcon;
            return (
              <li key={step.number}>
                <RevealOnScroll delayMs={idx * 90} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-obsidian-surface p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-gold/35 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                        <IconComponent className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-sm font-bold text-gold-light">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-bold text-content-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-content-secondary">
                      {step.description}
                    </p>
                  </div>
                </RevealOnScroll>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function PortfolioSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const projects = t('portfolio.projects', { returnObjects: true }) as PortfolioProjectItem[];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;

    const updateParallax = () => {
      const container = sectionRef.current;
      if (!container) return;
      const images = container.querySelectorAll<HTMLElement>('[data-parallax-img]');
      const viewportHeight = window.innerHeight;

      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) return;
        const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2);
        const shift = Math.max(-12, Math.min(12, progress * -10));
        img.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.06)`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portafolio"
      aria-labelledby="portafolio-heading"
      className="scroll-mt-20 border-t border-white/10 bg-obsidian-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              {t('portfolio.eyebrow')}
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="portafolio-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            {t('portfolio.headingPart1')}{' '}
            <span className="gradient-gold-text">{t('portfolio.headingHighlight')}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            {t('portfolio.subtitle')}
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <RevealOnScroll key={project.id} delayMs={idx * 100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-obsidian-surface shadow-card transition-transform duration-300 hover:-translate-y-1 hover:border-gold/35">
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-obsidian-elevated">
                  <img
                    data-parallax-img
                    src={project.image}
                    alt={project.imageAlt}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full transition-transform duration-300 ${
                      project.isPendingCapture
                        ? 'object-contain p-10 opacity-40'
                        : 'object-cover object-center'
                    }`}
                  />
                  {project.isPendingCapture && (
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-obsidian-base/90 via-obsidian-base/40 to-transparent p-4">
                      <span className="rounded-md border border-dashed border-gold/50 bg-obsidian-base/90 px-3 py-1 font-mono text-xs text-gold-light">
                        {t('portfolio.labels.pendingCapture')}
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
                      <dt className="font-heading font-bold text-content-primary">
                        {t('portfolio.labels.problem')}
                      </dt>
                      <dd className="mt-1 leading-relaxed text-content-secondary">
                        {project.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-heading font-bold text-content-primary">
                        {t('portfolio.labels.solution')}
                      </dt>
                      <dd className="mt-1 leading-relaxed text-content-secondary">
                        {project.solution}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-heading font-bold text-content-primary">
                        {t('portfolio.labels.result')}
                      </dt>
                      <dd className="mt-1">
                        <span className="inline-block rounded-lg border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 font-mono text-xs text-gold-light">
                          {project.result}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-heading font-bold text-content-primary">
                        {t('portfolio.labels.testimonial')}
                      </dt>
                      <dd className="mt-1">
                        <span className="inline-block rounded-lg border border-dashed border-gold/40 bg-gold/5 px-3 py-1.5 font-mono text-xs text-gold-light">
                          {project.testimonial}
                        </span>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-content-muted">
                      {t('portfolio.labels.stack')}
                    </p>
                    <ul
                      className="mt-2.5 flex flex-wrap gap-2"
                      aria-label={`${t('portfolio.labels.stackAriaPrefix')} ${project.title}`}
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
                        onClick={() =>
                          trackEvent('project_click', {
                            project_id: project.id,
                            project_title: project.title,
                            language: i18n.language,
                          })
                        }
                        className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-gold-light hover:text-gold"
                      >
                        <span>{t('portfolio.labels.visitSite')}</span>
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <p className="mt-5 font-mono text-xs text-content-muted">
                        {t('portfolio.labels.pendingUrl')}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUsSection() {
  const { t } = useTranslation();
  const pillars = t('whyUs.pillars', { returnObjects: true }) as WhyUsPillarItem[];
  const icons = [BoltIcon, AcademicCapIcon, GlobeIcon, ShieldCheckIcon];

  return (
    <section
      id="por-que"
      aria-labelledby="por-que-heading"
      className="scroll-mt-20 border-t border-white/10 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <RevealOnScroll className="lg:col-span-5">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
                {t('whyUs.eyebrow')}
              </span>
            </div>
            <h2
              id="por-que-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
            >
              {t('whyUs.headingPart1')}{' '}
              <span className="gradient-gold-text">{t('whyUs.headingHighlight')}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-content-secondary">
              {t('whyUs.paragraph1')}
            </p>
            <p className="mt-4 text-base leading-relaxed text-content-secondary">
              {t('whyUs.paragraph2')}
            </p>
          </RevealOnScroll>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {pillars.map((pillar, idx) => {
              const IconComponent = icons[idx] ?? BoltIcon;
              return (
                <RevealOnScroll key={pillar.title} delayMs={idx * 90}>
                  <article className="h-full rounded-2xl border border-white/10 bg-obsidian-surface p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:border-gold/35">
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
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const { t } = useTranslation();
  const faqs = t('faq.items', { returnObjects: true }) as FaqItem[];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 border-t border-white/10 bg-obsidian-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              {t('faq.eyebrow')}
            </span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
          <h2
            id="faq-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
          >
            {t('faq.headingPart1')}{' '}
            <span className="gradient-gold-text">{t('faq.headingHighlight')}</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100}>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-obsidian-surface">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-bold text-content-primary sm:text-lg">
                  <span>{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-transform duration-200 group-open:rotate-45">
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
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  const { t, i18n } = useTranslation();
  const whatsappUrl = t('whatsapp.url');

  return (
    <section aria-labelledby="final-cta-heading" className="py-20 md:py-24">
      <div className="mx-auto max-w-container px-6">
        <RevealOnScroll>
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
              {t('finalCta.headingPart1')}{' '}
              <span className="gradient-gold-text">{t('finalCta.headingHighlight')}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
              {t('finalCta.subtitle')}
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', {
                    location: 'final_cta',
                    language: i18n.language,
                  })
                }
                className="btn-gold-primary inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base shadow-glow"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{t('finalCta.ctaPrimary')}</span>
              </a>
              <a
                href="#contacto"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-white/15 bg-obsidian-base/80 px-7 py-3.5 font-heading text-base font-bold text-content-primary transition-transform duration-200 hover:-translate-y-0.5 hover:border-gold/40"
              >
                <span>{t('finalCta.ctaSecondary')}</span>
                <ArrowRightIcon className="h-4 w-4 text-gold" />
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
