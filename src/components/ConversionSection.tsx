import { type FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/analytics';
import {
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  MailIcon,
  MapPinIcon,
  WhatsAppIcon,
} from './ui/Icons';

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
  const { t, i18n } = useTranslation();
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    service: '',
    message: '',
    botField: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const whatsappUrl = t('whatsapp.url');

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      nextErrors.name = t('contact.form.errors.name');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email = t('contact.form.errors.email');
    }
    if (!values.service) {
      nextErrors.service = t('contact.form.errors.service');
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message = t('contact.form.errors.message');
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
        trackEvent('form_submit', {
          service: values.service,
          language: i18n.language,
        });
        setStatus('success');
        setValues({ name: '', email: '', service: '', message: '', botField: '' });
      } else {
        setStatus('error');
      }
    } catch {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        trackEvent('form_submit', {
          service: values.service,
          language: i18n.language,
        });
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
      className="cv-auto scroll-mt-20 border-t border-line bg-bg py-20 md:py-28"
    >
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-accent sm:text-sm">
                {t('contact.eyebrow')}
              </span>
            </div>
            <h2
              id="contacto-heading"
              className="font-serif text-4xl font-normal leading-[1.06] tracking-[-0.015em] text-ink sm:text-5xl"
            >
              {t('contact.headingPart1')}{' '}
              <em className="italic text-accent">{t('contact.headingHighlight')}</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-secondary">
              {t('contact.subtitle')}
            </p>

            <address className="mt-8 space-y-4 not-italic">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', {
                    location: 'contact_section',
                    language: i18n.language,
                  })
                }
                className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-whatsapp/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-whatsapp/15 text-whatsapp">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-heading text-sm font-medium text-ink-secondary">
                    {t('contact.channels.whatsappTitle')}
                  </div>
                  <div className="mt-0.5 text-base font-medium text-ink">
                    {t('contact.channels.whatsappNumber')}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${t('contact.channels.emailAddress')}`}
                className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MailIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-heading text-sm font-medium text-ink-secondary">
                    {t('contact.channels.emailTitle')}
                  </div>
                  <div className="mt-0.5 text-base font-medium text-ink">
                    {t('contact.channels.emailAddress')}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-heading text-sm font-medium text-ink-secondary">
                    {t('contact.channels.locationTitle')}
                  </div>
                  <p className="mt-0.5 text-base font-medium text-ink">
                    {t('contact.channels.locationText')}
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
              className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-9"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="bot-field">
                  {t('contact.form.honeypotLabel')}
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
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                    <CheckIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-normal text-ink">
                    {t('contact.form.successTitle')}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-ink-secondary">
                    {t('contact.form.successText')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-full border border-line-strong bg-elevated/60 px-6 py-2.5 text-sm font-medium text-ink hover:border-accent/40"
                  >
                    {t('contact.form.sendAnother')}
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-ink">
                        {t('contact.form.nameLabel')} <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder={t('contact.form.namePlaceholder')}
                        value={values.name}
                        onChange={(e) => {
                          setValues({ ...values, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className="mt-2 w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
                      />
                      {errors.name && (
                        <p id="error-name" role="alert" className="mt-1.5 text-xs text-danger">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-ink">
                        {t('contact.form.emailLabel')} <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder={t('contact.form.emailPlaceholder')}
                        value={values.email}
                        onChange={(e) => {
                          setValues({ ...values, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className="mt-2 w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
                      />
                      {errors.email && (
                        <p id="error-email" role="alert" className="mt-1.5 text-xs text-danger">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="contact-service" className="block text-sm font-medium text-ink">
                      {t('contact.form.serviceLabel')} <span className="text-accent">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      autoComplete="off"
                      required
                      value={values.service}
                      onChange={(e) => {
                        setValues({ ...values, service: e.target.value });
                        if (errors.service) setErrors({ ...errors, service: undefined });
                      }}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? 'error-service' : undefined}
                      className="mt-2 w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-sm text-ink focus:border-accent"
                    >
                      <option value="" disabled>
                        {t('contact.form.servicePlaceholder')}
                      </option>
                      <option value="diseno-web">{t('contact.form.services.webDesign')}</option>
                      <option value="seo">{t('contact.form.services.seo')}</option>
                      <option value="landing-page">{t('contact.form.services.landing')}</option>
                      <option value="otro">{t('contact.form.services.other')}</option>
                    </select>
                    {errors.service && (
                      <p id="error-service" role="alert" className="mt-1.5 text-xs text-danger">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-ink">
                      {t('contact.form.messageLabel')} <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      autoComplete="off"
                      rows={4}
                      required
                      placeholder={t('contact.form.messagePlaceholder')}
                      value={values.message}
                      onChange={(e) => {
                        setValues({ ...values, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className="mt-2 w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
                    />
                    {errors.message && (
                      <p id="error-message" role="alert" className="mt-1.5 text-xs text-danger">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="mt-4 rounded-xl border border-danger/40 bg-danger/10 p-3 text-xs text-danger"
                    >
                      {t('contact.form.errorBanner')}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-gold-primary mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-body text-[0.9375rem] font-semibold text-ink-inverse shadow-glow hover:bg-accent-hi disabled:opacity-60"
                  >
                    <span>
                      {status === 'submitting'
                        ? t('contact.form.submitSending')
                        : t('contact.form.submitIdle')}
                    </span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>

                  <p className="mt-4 text-center text-xs text-ink-muted">
                    {t('contact.form.privacyPrefix')}{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="font-medium text-accent-hi underline underline-offset-2 hover:text-accent"
                    >
                      {t('contact.form.privacyLink')}
                    </button>
                    {t('contact.form.privacySuffix')}
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
  const { t } = useTranslation();

  return (
    <footer className="border-t border-line bg-surface py-12">
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <a href="#hero" className="inline-flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-hi to-accent-lo font-body text-xs font-extrabold text-ink-inverse"
            aria-hidden="true"
          >
            B
          </span>
          <span className="font-body text-base font-semibold text-ink">
            Bazan <span className="text-accent">&amp;</span> Co.
          </span>
        </a>

        <nav aria-label={t('footer.navAria')}>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-secondary">
            <li>
              <a href="#servicios" className="hover:text-ink">
                {t('nav.items.servicios')}
              </a>
            </li>
            <li>
              <a href="#proceso" className="hover:text-ink">
                {t('nav.items.proceso')}
              </a>
            </li>
            <li>
              <a href="#portafolio" className="hover:text-ink">
                {t('nav.items.portafolio')}
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-ink">
                {t('nav.items.faq')}
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-ink">
                {t('nav.items.contacto')}
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-ink-secondary hover:text-ink"
              >
                {t('footer.privacyLink')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenCookies}
                className="text-ink-secondary hover:text-ink"
              >
                {t('footer.cookiesLink')}
              </button>
            </li>
          </ul>
        </nav>

        <p className="text-xs text-ink-muted">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  const { t, i18n } = useTranslation();

  return (
    <a
      href={t('whatsapp.url')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.fabAria')}
      onClick={() =>
        trackEvent('whatsapp_click', {
          location: 'floating_button',
          language: i18n.language,
        })
      }
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink-inverse shadow-lg transition-transform duration-200 hover:scale-105"
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
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <aside
      aria-label={t('cookieBanner.ariaLabel')}
      className="fixed bottom-4 left-4 right-20 z-50 max-w-md rounded-2xl border border-line-strong bg-surface/95 p-4 shadow-card backdrop-blur-md sm:left-6 sm:right-auto"
    >
      <p className="text-xs leading-relaxed text-ink-secondary sm:text-sm">
        {t('cookieBanner.textPrefix')}{' '}
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="font-semibold text-accent-hi underline underline-offset-2 hover:text-accent"
        >
          {t('cookieBanner.privacyLink')}
        </button>
        .
      </p>
      <div className="mt-3.5 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onAccept}
          className="btn-gold-primary flex-1 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-ink-inverse"
        >
          {t('cookieBanner.accept')}
        </button>
        <button
          type="button"
          onClick={onReject}
          className="flex-1 rounded-full border border-line-strong bg-elevated/60 px-4 py-2 text-xs font-medium text-ink hover:border-accent/40"
        >
          {t('cookieBanner.reject')}
        </button>
      </div>
    </aside>
  );
}

export function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation();

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-line-strong bg-surface p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 id="privacy-modal-title" className="font-serif text-2xl font-normal text-ink">
            {t('privacyModal.title')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('privacyModal.closeAria')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink-secondary hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-secondary">
          <p>
            <strong className="text-ink">{t('privacyModal.controllerLabel')}</strong>{' '}
            {t('privacyModal.controllerText')}{' '}
            <a
              href={`mailto:${t('contact.channels.emailAddress')}`}
              className="text-accent-hi underline"
            >
              {t('contact.channels.emailAddress')}
            </a>
            ).{' '}
          </p>
          <p>
            <strong className="text-ink">{t('privacyModal.section1Title')}</strong>{' '}
            {t('privacyModal.section1Text')}
          </p>
          <p>
            <strong className="text-ink">{t('privacyModal.section2Title')}</strong>{' '}
            {t('privacyModal.section2Text')}
          </p>
          <p>
            <strong className="text-ink">{t('privacyModal.section3Title')}</strong>{' '}
            {t('privacyModal.section3Text')}
          </p>
          <p>
            <strong className="text-ink">{t('privacyModal.section4Title')}</strong>{' '}
            {t('privacyModal.section4Text')}{' '}
            <a
              href={`mailto:${t('contact.channels.emailAddress')}`}
              className="text-accent-hi underline"
            >
              {t('contact.channels.emailAddress')}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
