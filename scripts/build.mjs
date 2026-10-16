import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

function runNode(scriptPath, args = []) {
  console.log(`\n> node ${scriptPath} ${args.join(' ')}`);
  execFileSync(process.execPath, [resolve(scriptPath), ...args], {
    stdio: 'inherit',
  });
}

runNode('./node_modules/typescript/bin/tsc', ['--noEmit']);
runNode('./node_modules/vite/bin/vite.js', ['build']);

const prerenderScript = resolve('scripts/prerender.mjs');
if (existsSync(prerenderScript)) {
  runNode('./scripts/prerender.mjs');
}
