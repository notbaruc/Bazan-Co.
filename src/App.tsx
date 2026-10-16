export default function App() {
  return (
    <div className="min-h-screen bg-obsidian-base text-content-secondary">
      <header className="border-b border-white/10 py-6">
        <div className="mx-auto flex max-w-container items-center justify-between px-6">
          <span className="font-heading text-xl font-bold text-content-primary">
            Bazan <span className="text-gold">&amp;</span> Co.
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            Ingeniería Web Premium
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-container px-6 py-20">
        <h1 className="font-heading text-4xl font-extrabold text-content-primary sm:text-6xl">
          No construimos páginas web.{' '}
          <span className="gradient-gold-text">Diseñamos máquinas de conversión.</span>
        </h1>
      </main>
    </div>
  );
}
