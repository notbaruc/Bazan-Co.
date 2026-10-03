import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import type { Dictionary } from '@/i18n';
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
}

type Status = 'idle' | 'invalid' | 'notConnected';

const EMPTY: ContactValues = { name: '', email: '', service: '', message: '' };

const inputClass =
  'w-full rounded-xl border border-line-strong bg-bg/70 px-4 py-3 text-base text-ink placeholder:text-ink-muted transition-colors duration-(--dur-fast) hover:border-white/25 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-invalid:border-danger';

export default function ContactForm({ copy }: Props) {
  const formId = useId();
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const fieldRefs = useRef<Partial<Record<ContactField, HTMLElement | null>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  // Antes de hidratar, el HTML usa la validación nativa del navegador (mejora progresiva);
  // ya hidratado, la validación accesible de React toma el control.
  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  const fieldId = (field: ContactField) => `${formId}-${field}`;
  const errorId = (field: ContactField) => `${formId}-${field}-error`;

  const onChange =
    (field: ContactField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (touched[field]) {
        setErrors((prev) => ({ ...prev, [field]: validateField(field, next, copy.errors) }));
      }
    };

  const onBlur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values, copy.errors) }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(values, copy.errors);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, service: true, message: true });
    const firstInvalid = CONTACT_FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus('invalid');
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    setStatus('notConnected');
  };

  const describedBy = (field: ContactField) => (errors[field] ? errorId(field) : undefined);

  return (
    <form
      ref={formRef}
      method="post"
      onSubmit={onSubmit}
      aria-labelledby={`${formId}-title`}
      className="rounded-2xl border border-line bg-surface/80 p-6 shadow-card md:p-8"
    >
      <h3 id={`${formId}-title`} className="text-h3 font-medium">
        {copy.title}
      </h3>
      <p className="mt-2 text-sm text-ink-muted">
        <span className="text-accent" aria-hidden="true">
          *
        </span>{' '}
        {copy.required}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
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

      <div
        role="alert"
        className="mt-5 text-sm text-danger empty:hidden motion-safe:animate-[fade-up_300ms_ease-out]"
      >
        {status === 'invalid' ? copy.errors.summary : null}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-ink-inverse shadow-glow transition-colors duration-(--dur-base) hover:bg-accent-hi"
      >
        {copy.submit}
      </button>

      <p role="status" className="mt-4 text-center text-sm text-ink-muted">
        {status === 'notConnected' ? copy.notConnected : copy.responseTime}
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
