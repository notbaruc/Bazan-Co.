import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { buildWhatsAppUrl } from '@/features/whatsapp/whatsapp';
import type { Dictionary, Locale } from '@/i18n';
import { track } from '@/lib/analytics';
import {
  CONTACT_FIELDS,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from './validation';

type FormCopy = Dictionary['contact']['form'];

interface Props {
  copy: FormCopy;
  lang: Locale;
  privacyHref: string;
}

/**
 * Estados del formulario. La validación es instantánea en el cliente: tras el primer intento
 * los campos se validan en vivo (`invalid` = hay errores por corregir).
 */
type Status = 'idle' | 'invalid' | 'sending' | 'success' | 'error';

/** Nombre del formulario en Netlify Forms (debe coincidir con el HTML generado en el build). */
const FORM_NAME = 'contacto';
const HONEYPOT = 'bot-field';
const SUBMIT_TIMEOUT_MS = 12000;

const EMPTY: ContactValues = { name: '', email: '', service: '', message: '' };

const inputClass =
  'w-full rounded-xl border border-line-strong bg-bg/70 px-4 py-3 text-base text-ink placeholder:text-ink-muted transition-colors duration-(--dur-fast) hover:border-white/25 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-danger disabled:opacity-60';

export default function ContactForm({ copy, lang, privacyHref }: Props) {
  const formId = useId();
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const fieldRefs = useRef<Partial<Record<ContactField, HTMLElement | null>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Antes de hidratar, el HTML usa la validación nativa y el envío normal a Netlify (mejora
  // progresiva); ya hidratado, la validación accesible y el envío con fetch toman el control.
  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const fieldId = (field: ContactField) => `${formId}-${field}`;
  const errorId = (field: ContactField) => `${formId}-${field}-error`;
  const serviceLabel =
    copy.services.find((service) => service.value === values.service)?.label ?? values.service;

  const whatsappUrl = buildWhatsAppUrl(
    copy.whatsappTemplate
      .replace('{name}', values.name.trim() || '—')
      .replace('{service}', serviceLabel || '—')
      .replace('{message}', values.message.trim())
      .trim(),
  );

  const onChange =
    (field: ContactField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (touched[field]) {
        setErrors((prev) => ({ ...prev, [field]: validateField(field, next, copy.errors) }));
      }
      if (status === 'error') setStatus('idle');
    };

  const onBlur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values, copy.errors) }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const nextErrors = validateContact(values, copy.errors);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, service: true, message: true });
    const firstInvalid = CONTACT_FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus('invalid');
      // Tras el siguiente frame: los errores se pintan primero y el foco no fuerza un layout
      // dentro de la interacción (mejor INP).
      requestAnimationFrame(() => fieldRefs.current[firstInvalid]?.focus());
      return;
    }

    // Se arma el cuerpo antes de deshabilitar el fieldset (los campos deshabilitados no se envían).
    const body = new URLSearchParams();
    new FormData(event.currentTarget).forEach((value, key) => {
      if (typeof value === 'string') body.append(key, value);
    });
    setStatus('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
      track('generate_lead', { form: FORM_NAME, service: values.service });
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
    }
  };

  const describedBy = (field: ContactField) => (errors[field] ? errorId(field) : undefined);
  const sending = status === 'sending';

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl border border-success/40 bg-surface/80 p-6 text-center shadow-card motion-safe:animate-[fade-up_400ms_ease-out] md:p-10"
        role="status"
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/15 text-success">
          <svg
            className="size-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="m4.5 12.75 6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-5 text-h3 font-medium outline-none">
          {copy.successTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-sm">{copy.successText}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot={HONEYPOT}
      onSubmit={onSubmit}
      aria-labelledby={`${formId}-title`}
      aria-busy={sending}
      className="rounded-2xl border border-line bg-surface/80 p-6 shadow-card md:p-8"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="language" value={lang} />
      <p className="sr-only" aria-hidden="true">
        <label>
          {copy.honeypot}
          <input name={HONEYPOT} tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <h3 id={`${formId}-title`} className="text-h3 font-medium">
        {copy.title}
      </h3>
      <p className="mt-2 text-sm text-ink-muted">
        <span className="text-accent" aria-hidden="true">
          *
        </span>{' '}
        {copy.required}
      </p>

      <fieldset disabled={sending} className="mt-6 min-w-0">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={fieldId('name')}
            label={copy.name}
            required
            error={errors.name}
            errorId={errorId('name')}
          >
            <input
              ref={(el) => {
                fieldRefs.current.name = el;
              }}
              id={fieldId('name')}
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder={copy.namePlaceholder}
              value={values.name}
              onChange={onChange('name')}
              onBlur={() => onBlur('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy('name')}
              className={inputClass}
            />
          </Field>

          <Field
            id={fieldId('email')}
            label={copy.email}
            required
            error={errors.email}
            errorId={errorId('email')}
          >
            <input
              ref={(el) => {
                fieldRefs.current.email = el;
              }}
              id={fieldId('email')}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder={copy.emailPlaceholder}
              value={values.email}
              onChange={onChange('email')}
              onBlur={() => onBlur('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email')}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field
            id={fieldId('service')}
            label={copy.service}
            required
            error={errors.service}
            errorId={errorId('service')}
          >
            <select
              ref={(el) => {
                fieldRefs.current.service = el;
              }}
              id={fieldId('service')}
              name="service"
              required
              value={values.service}
              onChange={onChange('service')}
              onBlur={() => onBlur('service')}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={describedBy('service')}
              className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23a9aebb'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-size-[1.1rem] bg-position-[right_1rem_center] bg-no-repeat pr-11`}
            >
              <option value="" disabled>
                {copy.servicePlaceholder}
              </option>
              {copy.services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-5">
          <Field
            id={fieldId('message')}
            label={copy.message}
            hint={copy.optional}
            errorId={errorId('message')}
          >
            <textarea
              id={fieldId('message')}
              name="message"
              rows={4}
              placeholder={copy.messagePlaceholder}
              value={values.message}
              onChange={onChange('message')}
              className={`${inputClass} min-h-32 resize-y`}
            />
          </Field>
        </div>
      </fieldset>

      <div
        role="alert"
        className="mt-5 text-sm text-danger empty:hidden motion-safe:animate-[fade-up_300ms_ease-out]"
      >
        {status === 'invalid' ? copy.errors.summary : null}
        {status === 'error' ? copy.errorText : null}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-ink-inverse shadow-glow transition-[background-color,scale] duration-(--dur-base) hover:bg-accent-hi active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
      >
        {sending ? (
          <>
            <svg
              className="size-5 motion-safe:animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="3"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            {copy.sending}
          </>
        ) : (
          copy.submit
        )}
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-wa-source="form"
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-whatsapp/40 px-6 text-sm font-medium text-ink transition-colors duration-(--dur-base) hover:border-whatsapp hover:bg-whatsapp/10"
      >
        {copy.whatsappAlt}
      </a>

      <p className="mt-4 text-center text-xs text-ink-muted">
        {copy.privacyNote}{' '}
        <a
          href={privacyHref}
          className="text-accent underline underline-offset-2 hover:text-accent-hi"
        >
          {copy.privacyLink}
        </a>
        . {copy.responseTime}
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  errorId: string;
  error?: string | undefined;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

function Field({ id, label, errorId, error, required, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
        {hint ? <span className="font-normal text-ink-muted"> {hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p
          id={errorId}
          className="text-sm text-danger motion-safe:animate-[fade-up_300ms_ease-out]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
