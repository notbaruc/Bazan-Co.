import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import i18n, { type SupportedLanguage } from './i18n/config';
import App from './App';

export function renderApp(lang: SupportedLanguage = 'es'): string {
  void i18n.changeLanguage(lang);
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
