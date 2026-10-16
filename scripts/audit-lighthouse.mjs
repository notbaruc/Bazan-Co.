import { spawn, execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const mode = process.argv[2] || 'mobile';
const outDir = process.argv[3] || 'dist';
const relativeOutFile = `./lighthouse-${mode}.json`;
const outFile = resolve(relativeOutFile);

const previewProc = spawn(
  process.execPath,
  [
    resolve('./node_modules/vite/bin/vite.js'),
    'preview',
    '--outDir',
    outDir,
    '--port',
    '4173',
    '--strictPort',
    '--host',
    '127.0.0.1',
  ],
  { stdio: 'ignore' }
);

await new Promise((r) => setTimeout(r, 2000));

try {
  const args = [
    '--yes',
    'lighthouse',
    'http://127.0.0.1:4173/',
    '--output=json',
    `--output-path=${relativeOutFile}`,
    '--chrome-flags="--headless=new --no-sandbox --disable-gpu"',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--quiet',
  ];

  if (mode === 'desktop') {
    args.push('--preset=desktop');
  }

  console.log(`> Running: npx ${args.join(' ')}`);
  execFileSync('npx.cmd', args, { stdio: 'inherit', shell: true });

  const report = JSON.parse(readFileSync(outFile, 'utf-8'));
  const scores = {
    performance: Math.round((report.categories.performance?.score ?? 0) * 100),
    accessibility: Math.round((report.categories.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((report.categories['best-practices']?.score ?? 0) * 100),
    seo: Math.round((report.categories.seo?.score ?? 0) * 100),
    fcp: report.audits['first-contentful-paint']?.displayValue,
    lcp: report.audits['largest-contentful-paint']?.displayValue,
    lcpNumericMs: Math.round(report.audits['largest-contentful-paint']?.numericValue ?? 0),
    tbt: report.audits['total-blocking-time']?.displayValue,
    tbtNumericMs: Math.round(report.audits['total-blocking-time']?.numericValue ?? 0),
    cls: report.audits['cumulative-layout-shift']?.displayValue,
    clsNumeric: report.audits['cumulative-layout-shift']?.numericValue ?? 0,
    si: report.audits['speed-index']?.displayValue,
  };

  console.log('\n=== LIGHTHOUSE SUMMARY (' + mode.toUpperCase() + ') ===');
  console.log(JSON.stringify(scores, null, 2));

  if (
    scores.performance < 95 ||
    scores.accessibility < 95 ||
    scores.bestPractices < 95 ||
    scores.seo < 100
  ) {
    console.log('\n--- FAILED OR NON-PERFECT AUDITS ---');
    for (const [id, audit] of Object.entries(report.audits)) {
      if (audit.score !== null && audit.score < 0.9) {
        console.log(`- [${id}] (score: ${audit.score}): ${audit.title} (${audit.displayValue ?? ''})`);
      }
    }
  }
} finally {
  previewProc.kill();
}
