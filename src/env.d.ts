interface ImportMetaEnv {
  /** ID de medición de Google Analytics 4. Vacío = analítica desactivada. */
  readonly PUBLIC_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
