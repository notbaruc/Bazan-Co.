import { type FormEvent, useEffect, useState } from 'react';
import {
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  MailIcon,
  MapPinIcon,
  WhatsAppIcon,
} from './ui/Icons';
import { WHATSAPP_URL } from './Sections';

interface FormValues {
  name: string;
  email: string;
  service: string;
  message: string;
  botField: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

export function ContactSection({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    service: '',
    message: '',
    botField: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      nextErrors.name = 'Por favor ingresa tu nombre (mínimo 2 caracteres).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email = 'Ingresa un correo electrónico válido (ej. nombre@empresa.com).';
    }
    if (!values.service) {
      nextErrors.service = 'Selecciona el servicio de tu interés.';
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message = 'Cuéntanos brevemente sobre tu proyecto (mínimo 10 caracteres).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.botField) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'contact');
      formData.append('bot-field', values.botField);
      formData.append('name', values.name.trim());
      formData.append('email', values.email.trim());
      formData.append('service', values.service);
      formData.append('message', values.message.trim());

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (
        response.ok ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      ) {
        setStatus('success');
        setValues({ name: '', email: '', service: '', message: '', botField: '' });
      } else {
        setStatus('error');
      }
    } catch {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="scroll-mt-20 border-t border-white/10 py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold">
                Contacto Directo
              </span>
            </div>
            <h2
              id="contacto-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-content-primary sm:text-4xl"
            >
              Hablemos de tu <span className="gradient-gold-text">próximo proyecto.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-content-secondary">
              Cada proyecto comienza con una conversación clara. Escríbenos por WhatsApp para
              atención inmediata o completa el formulario y te enviaremos una propuesta técnica a la
              medida — sin compromisos ni letra pequeña.
            </p>

            <address className="mt-8 space-y-4 not-italic">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-obsidian-surface p-4 hover:border-gold/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-heading text-sm font-bold text-content-primary">
                    WhatsApp Directo
                  </div>
                  <div className="mt-0.5 text-sm text-content-secondary">+52 1 614 343 6765</div>
                </div>
              </a>

              <a
                href="mailto:contacto@bazanco.com"
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-obsidian-surface p-4 hover:border-gold/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-heading text-sm font-bold text-content-primary">Email</div>
                  <div className="mt-0.5 text-sm text-content-secondary">contacto@bazanco.com</div>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-obsidian-surface p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-heading text-sm font-bold text-content-primary">
                    Ubicación
                  </div>
                  <p className="mt-0.5 text-sm text-content-secondary">
                    Chihuahua, México — Servicio remoto a nivel global
                  </p>
                </div>
              </div>
            </address>
          </div>

          <div className="lg:col-span-7">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              noValidate
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-obsidian-surface p-6 shadow-card sm:p-9"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="bot-field">
                  No llenes este campo si eres humano
                  <input
                    id="bot-field"
                    name="bot-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.botField}
                    onChange={(e) => setValues({ ...values, botField: e.target.value })}
                  />
                </label>
              </div>

              {status === 'success' ? (
                <div role="status" aria-live="polite" className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <CheckIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-content-primary">
                    ¡Solicitud recibida con éxito!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-content-secondary">
                    Revisaremos los detalles de tu proyecto y te responderemos en menos de 24 horas
                    hábiles.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-content-primary hover:border-gold/40"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-content-primary"
                      >
                        Nombre completo <span className="text-gold">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Tu nombre"
                        value={values.name}
                        onChange={(e) => {
                          setValues({ ...values, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-obsidian-base px-4 py-3 text-sm text-content-primary placeholder:text-content-muted focus:border-gold"
                      />
                      {errors.name && (
                        <p id="error-name" role="alert" className="mt-1.5 text-xs text-rose-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-content-primary"
                      >
                        Correo electrónico <span className="text-gold">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="tu@empresa.com"
                        value={values.email}
                        onChange={(e) => {
                          setValues({ ...values, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-obsidian-base px-4 py-3 text-sm text-content-primary placeholder:text-content-muted focus:border-gold"
                      />
                      {errors.email && (
                        <p id="error-email" role="alert" className="mt-1.5 text-xs text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-medium text-content-primary"
                    >
                      Servicio de interés <span className="text-gold">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      required
                      value={values.service}
                      onChange={(e) => {
                        setValues({ ...values, service: e.target.value });
                        if (errors.service) setErrors({ ...errors, service: undefined });
                      }}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? 'error-service' : undefined}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-obsidian-base px-4 py-3 text-sm text-content-primary focus:border-gold"
                    >
                      <option value="" disabled>
                        Selecciona un servicio
                      </option>
                      <option value="diseno-web">Diseño Web Premium</option>
                      <option value="seo">Optimización SEO</option>
                      <option value="landing-page">Landing Page de Alta Conversión</option>
                      <option value="otro">Otro / Diagnóstico General</option>
                    </select>
                    {errors.service && (
                      <p id="error-service" role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-content-primary"
                    >
                      Mensaje o detalles del proyecto <span className="text-gold">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Cuéntanos a qué se dedica tu negocio y qué objetivo buscas..."
                      value={values.message}
                      onChange={(e) => {
                        setValues({ ...values, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-obsidian-base px-4 py-3 text-sm text-content-primary placeholder:text-content-muted focus:border-gold"
                    />
                    {errors.message && (
                      <p id="error-message" role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300"
                    >
                      Ocurrió un inconveniente al enviar el formulario. Por favor intenta de nuevo o
                      escríbenos directamente por WhatsApp.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-gold-primary mt-6 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base disabled:opacity-60"
                  >
                    <span>
                      {status === 'submitting' ? 'Enviando solicitud...' : 'Enviar Solicitud'}
                    </span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>

                  <p className="mt-4 text-center text-xs text-content-muted">
                    Al enviar este formulario aceptas nuestro{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="font-medium text-gold-light underline underline-offset-2 hover:text-gold"
                    >
                      Aviso de Privacidad
                    </button>
                    . Respuesta en menos de 24 horas.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterSection({
  onOpenPrivacy,
  onOpenCookies,
}: {
  onOpenPrivacy: () => void;
  onOpenCookies: () => void;
}) {
  return (
    <footer className="border-t border-white/10 bg-obsidian-surface py-12">
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <a
          href="#hero"
          className="inline-flex items-center gap-2.5"
          aria-label="Bazan & Co. — Volver arriba"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-gold-light to-gold-dark font-heading text-xs font-black text-content-inverse"
            aria-hidden="true"
          >
            B
          </span>
          <span className="font-heading text-base font-bold text-content-primary">
            Bazan <span className="text-gold">&amp;</span> Co.
          </span>
        </a>

        <nav aria-label="Enlaces legales y de navegación del pie de página">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-content-secondary">
            <li>
              <a href="#servicios" className="hover:text-gold-light">
                Servicios
              </a>
            </li>
            <li>
              <a href="#proceso" className="hover:text-gold-light">
                Proceso
              </a>
            </li>
            <li>
              <a href="#portafolio" className="hover:text-gold-light">
                Portafolio
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-gold-light">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-gold-light">
                Contacto
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-content-secondary hover:text-gold-light"
              >
                Aviso de Privacidad
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenCookies}
                className="text-content-secondary hover:text-gold-light"
              >
                Cookies
              </button>
            </li>
          </ul>
        </nav>

        <p className="text-xs text-content-muted">
          &copy; 2026 Bazan &amp; Co. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Bazan & Co. por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#07080C] shadow-lg hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function CookieBanner({
  visible,
  onAccept,
  onReject,
  onOpenPrivacy,
}: {
  visible: boolean;
  onAccept: () => void;
  onReject: () => void;
  onOpenPrivacy: () => void;
}) {
  if (!visible) return null;

  return (
    <aside
      aria-label="Preferencias de privacidad y cookies"
      className="fixed bottom-4 left-4 right-20 z-50 max-w-md rounded-2xl border border-white/15 bg-obsidian-elevated/95 p-4 shadow-card backdrop-blur-md sm:left-6 sm:right-auto"
    >
      <p className="text-xs leading-relaxed text-content-secondary sm:text-sm">
        Utilizamos cookies de analítica (Google Analytics 4) para medir y mejorar el rendimiento de
        nuestro sitio. Puedes consultar nuestro{' '}
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="font-semibold text-gold-light underline underline-offset-2 hover:text-gold"
        >
          Aviso de Privacidad
        </button>
        .
      </p>
      <div className="mt-3 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onAccept}
          className="btn-gold-primary flex-1 rounded-lg px-3.5 py-2 text-xs font-bold"
        >
          Aceptar y cerrar
        </button>
        <button
          type="button"
          onClick={onReject}
          className="flex-1 rounded-lg border border-white/15 bg-obsidian-base px-3.5 py-2 text-xs font-semibold text-content-secondary hover:border-white/30 hover:text-content-primary"
        >
          Solo esenciales
        </button>
      </div>
    </aside>
  );
}

export function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/15 bg-obsidian-surface p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2
            id="privacy-modal-title"
            className="font-heading text-xl font-bold text-content-primary"
          >
            Aviso de Privacidad
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar aviso de privacidad"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-content-secondary hover:text-content-primary"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm leading-relaxed text-content-secondary">
          <p>
            <strong className="text-content-primary">Responsable:</strong> Bazan &amp; Co.
            (Chihuahua, Chihuahua, México · Correo de contacto:{' '}
            <a href="mailto:contacto@bazanco.com" className="text-gold-light underline">
              contacto@bazanco.com
            </a>
            ).{' '}
            <span className="font-mono text-xs text-gold-light">
              [PENDIENTE USUARIO: Razón social o nombre completo del titular legal si desea
              especificarlo]
            </span>
          </p>
          <p>
            <strong className="text-content-primary">
              1. Formulario de Contacto (Netlify Forms):
            </strong>{' '}
            Los datos que nos proporcionas voluntariamente en el formulario de contacto (nombre,
            correo electrónico, servicio de interés y mensaje) se procesan a través de Netlify Forms
            con la única finalidad de responder a tu solicitud de consulta técnica o cotización. No
            vendemos ni cedemos tus datos a terceros.
          </p>
          <p>
            <strong className="text-content-primary">2. Analítica Web (Google Analytics 4):</strong>{' '}
            Utilizamos Google Analytics 4 (ID:{' '}
            <code className="font-mono text-xs">G-CN941SX6Q7</code>) para recopilar estadísticas
            agregadas y anónimas de navegación y eventos de interacción (clics en botones de
            contacto, envío de formulario y selección de idioma) únicamente para mejorar el
            desempeño del sitio. Puedes aceptar o rechazar las cookies analíticas en cualquier
            momento desde el banner de cookies.
          </p>
          <p>
            <strong className="text-content-primary">3. Contacto vía WhatsApp:</strong> Al hacer
            clic en los enlaces hacia WhatsApp (<code className="font-mono text-xs">wa.me</code>),
            la comunicación se realiza directamente en la plataforma externa de WhatsApp bajo sus
            propias políticas de privacidad y cifrado.
          </p>
          <p>
            <strong className="text-content-primary">4. Derechos ARCO:</strong> Puedes solicitar el
            acceso, rectificación, cancelación u oposición sobre tus datos personales enviando un
            correo a{' '}
            <a href="mailto:contacto@bazanco.com" className="text-gold-light underline">
              contacto@bazanco.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
