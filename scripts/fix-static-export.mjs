// Work around Next.js 16 Windows static-export segment path mismatch.
// Keep the original files and add the flattened names expected by the router.
import { readdir, copyFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { constants } from 'node:fs';

const root = resolve(process.argv[2] ?? 'out');
if (!(await stat(root)).isDirectory()) throw new Error('Static export folder not found: ' + root);
let copied = 0;

async function flattenSegments(directory, prefix, destination) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    const flattened = prefix + '.' + entry.name;
    if (entry.isDirectory()) {
      await flattenSegments(source, flattened, destination);
    } else if (entry.isFile() && entry.name.endsWith('.txt')) {
      try {
        await copyFile(source, join(destination, flattened), constants.COPYFILE_EXCL);
        copied++;
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
      }
    }
  }
}

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = join(directory, entry.name);
    if (entry.name.startsWith('__next.')) {
      await flattenSegments(child, entry.name, directory);
    } else if (entry.name !== '_next' && entry.name !== 'images' && entry.name !== 'fonts') {
      await visit(child);
    }
  }
}

await visit(root);
console.log('[static export] Added ' + copied + ' flat RSC segment aliases.');
