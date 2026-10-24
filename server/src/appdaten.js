// Lädt Kategorien, Techniken, vorhandene Argumente und ein Beispiel aus den App-Inhalten, damit Entwürfe zum Playbook passen.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

export function ladeAppDaten(dir) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of ['techniken.js', 'argumente.js']) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
  const { techniken, argumente } = JSON.parse(JSON.stringify(ctx.window.APP_DATA));
  const beispiel = argumente.argumente.find(a => a.id === 'medien-luegen') || argumente.argumente[0];
  return {
    kategorien: argumente.kategorien.map(k => ({ id: k.id, name: k.name })),
    techniken: techniken.map(t => ({ id: t.id, name: t.name })),
    argumente: argumente.argumente.map(a => ({ id: a.id, titel: a.titel })),
    beispiel
  };
}
