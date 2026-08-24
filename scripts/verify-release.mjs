import { access, readFile, readdir } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const pagesRoot = resolve(projectRoot, 'docs');

const requiredFiles = [
  '.nojekyll',
  '404.html',
  'CNAME',
  'apple-touch-icon.png',
  'connect/index.html',
  'connect.js',
  'favicon.svg',
  'index.html',
  'manifest.webmanifest',
  'point-of-view/index.html',
  'privacy.html',
  'privacy/index.html',
  'robots.txt',
  'sitemap.xml',
];

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

async function internalTargetExists(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  const relativePath = cleanPath.replace(/^\/+/, '');

  if (!relativePath) {
    await access(resolve(pagesRoot, 'index.html'));
    return;
  }

  const directPath = resolve(pagesRoot, relativePath);
  if (extname(relativePath)) {
    await access(directPath);
    return;
  }

  try {
    await access(directPath);
  } catch {
    await access(resolve(directPath, 'index.html'));
  }
}

for (const file of requiredFiles) {
  await access(resolve(pagesRoot, file));
}

const cname = (await readFile(resolve(pagesRoot, 'CNAME'), 'utf8')).trim();
if (cname !== 'intellumia.com') {
  throw new Error(`Unexpected CNAME: ${cname}`);
}

const files = await collectFiles(pagesRoot);
if (files.some((file) => / \d+(?:\.[^./]+)?$/.test(basename(file)))) {
  throw new Error('Sync-conflict copy found in the release artifact.');
}

if (files.some((file) => file.includes('/_next/') && !file.includes('/_next/static/css/'))) {
  throw new Error('Unused framework runtime found in the release artifact.');
}

const visitorFiles = files.filter((file) => ['.html', '.css', '.js'].includes(extname(file)));

for (const file of visitorFiles) {
  const source = await readFile(file, 'utf8');

  if (source.includes('—')) {
    throw new Error(`Em dash found in ${file}`);
  }

  if (file.endsWith('.html') && source.includes('_next/static/chunks')) {
    throw new Error(`Framework browser runtime found in ${file}`);
  }

  const internalUrls = [
    ...source.matchAll(/(?:href|src)="(\/[^"#?]*)/g),
    ...source.matchAll(/url\(["']?(\/[^"')?#]*)/g),
  ].map((match) => match[1]);

  for (const internalUrl of internalUrls) {
    await internalTargetExists(internalUrl);
  }
}

for (const page of ['index.html', 'connect/index.html', 'point-of-view/index.html', 'privacy/index.html']) {
  const source = await readFile(resolve(pagesRoot, page), 'utf8');
  const h1Count = (source.match(/<h1(?:\s|>)/g) ?? []).length;

  if (h1Count !== 1 || !source.includes('rel="canonical"') || !source.includes('name="description"')) {
    throw new Error(`Metadata or heading verification failed for ${page}`);
  }
}

console.log(`Verified ${files.length} release files and all internal asset paths.`);
