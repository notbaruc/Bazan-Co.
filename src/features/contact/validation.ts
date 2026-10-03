export interface ContactValues {
  name: string;
  email: string;
  service: string;
  message: string;
}

export type ContactField = keyof ContactValues;
export const CONTACT_FIELDS: readonly ContactField[] = ['name', 'email', 'service', 'message'];
export type ContactErrors = Partial<Record<ContactField, string>>;

export interface ValidationMessages {
  name: string;
  emailRequired: string;
  emailInvalid: string;
  service: string;
}

// Suficiente para detectar errores de tecleo; la verificación real la hace la respuesta del usuario.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(
  field: ContactField,
  values: ContactValues,
  messages: ValidationMessages,
): string | undefined {
  const value = values[field].trim();
  switch (field) {
    case 'name':
      return value.length < 2 ? messages.name : undefined;
    case 'email':
      if (!value) return messages.emailRequired;
      return EMAIL_PATTERN.test(value) ? undefined : messages.emailInvalid;
    case 'service':
      return value ? undefined : messages.service;
    case 'message':
      return undefined;
  }
}

export function validateContact(
  values: ContactValues,
  messages: ValidationMessages,
): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, values, messages);
    if (error) errors[field] = error;
  }
  return errors;
}
