import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, relative, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const exportDirectory = resolve(projectRoot, 'out');
const pagesDirectory = resolve(projectRoot, 'docs');

await rm(pagesDirectory, { recursive: true, force: true });
await mkdir(pagesDirectory, { recursive: true });

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

for (const filePath of await collectFiles(exportDirectory)) {
  const releasePath = relative(exportDirectory, filePath);
  const isConflictCopy = / \d+(?:\.[^./]+)?$/.test(basename(filePath));
  const isNextRoutePayload =
    extname(filePath) === '.txt' &&
    (basename(filePath) === 'index.txt' || basename(filePath).startsWith('__next.'));
  const isUnusedFrameworkRuntime =
    releasePath.startsWith('_next/') && !releasePath.startsWith('_next/static/css/');
  const isDuplicateNotFoundRoute =
    releasePath.startsWith('_not-found/') || releasePath.startsWith('404/');
  const isUnusedFontSource = [
    'fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf',
    'fonts/InstrumentSans-VariableFont_wdth,wght.ttf',
    'fonts/InstrumentSerif-Italic.ttf',
    'fonts/InstrumentSerif-Regular.ttf',
    'fonts/Recursive-Latin.woff2',
    'fonts/Recursive_VF_1.085.woff2',
  ].includes(releasePath);

  if (
    isConflictCopy ||
    isNextRoutePayload ||
    isUnusedFrameworkRuntime ||
    isDuplicateNotFoundRoute ||
    isUnusedFontSource
  ) {
    continue;
  }

  const destination = resolve(pagesDirectory, releasePath);
  await mkdir(dirname(destination), { recursive: true });

  if (filePath.endsWith('.html')) {
    const source = await readFile(filePath, 'utf8');
    const staticHtml = source
      .replace(/<link(?=[^>]*\bas="script")(?=[^>]*\brel="preload")[^>]*>/g, '')
      .replace(/<script(?![^>]*\bdata-static-script=)[^>]*>[\s\S]*?<\/script>/g, '')
      .replace('<div hidden=""><!--$--><!--/$--></div>', '');

    await writeFile(destination, staticHtml);
  } else {
    await copyFile(filePath, destination);
  }
}

console.log('Prepared the GitHub Pages release in docs/.');
