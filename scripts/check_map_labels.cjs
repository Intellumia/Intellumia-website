#!/usr/bin/env node
// Round 14 release check: every money map label on Home sits on one line, unbroken and inside its cell, at every
// width listed below. Serves docs/ itself and needs Playwright (preinstalled in the build environment; not a site
// dependency). Run: node scripts/check_map_labels.cjs   Exit code 1 if any label fails.
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..', 'docs');
const WIDTHS = [320, 339, 340, 360, 375, 390, 414, 767, 768, 834, 999, 1000, 1024, 1100, 1200, 1279, 1280, 1366, 1440, 1920];
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html';
  const f = path.join(ROOT, u);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r)); const port = server.address().port;
  const b = await chromium.launch(); let bad = 0;
  for (const w of WIDTHS) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    const r = await p.evaluate(() => {
      const fails = []; const cells = [...document.querySelectorAll('.mm li')]; const hs = new Set();
      for (const li of cells) { const cr = li.getBoundingClientRect(), cs = getComputedStyle(li); hs.add(Math.round(cr.height * 10) / 10);
        const pad = parseFloat(cs.paddingLeft); if (pad < 6) fails.push(`padding ${pad}`);
        const tw = document.createTreeWalker(li, NodeFilter.SHOW_TEXT); let n;
        while ((n = tw.nextNode())) { if (!n.textContent.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(n); const rects = [...rg.getClientRects()];
          const lines = new Set(rects.map(x => Math.round(x.top))).size; const right = Math.max(...rects.map(x => x.right)), left = Math.min(...rects.map(x => x.left));
          if (lines !== 1) fails.push(`"${n.textContent.trim()}" on ${lines} lines`);
          if (right > cr.right - 6 + 0.5 || left < cr.left + 6 - 0.5) fails.push(`"${n.textContent.trim()}" overflows its cell by ${Math.max(right - (cr.right - 6), cr.left + 6 - left).toFixed(1)} px`);
          const pcs = getComputedStyle(n.parentElement); if (/anywhere|break-word/.test(pcs.overflowWrap) || pcs.wordBreak !== 'normal' || pcs.hyphens !== 'manual') fails.push(`"${n.textContent.trim()}" may break in a word`); } }
      const fs0 = parseFloat(getComputedStyle(cells[0]).fontSize);
      return { n: cells.length, heights: [...hs], fs: fs0, fails, cell: Math.round(cells[0].getBoundingClientRect().width) }; });
    const ok = r.n === 12 && r.heights.length === 1 && r.fails.length === 0 && (w < 768 ? (r.fs === 12 || r.fs === 13) : r.fs === 16);
    if (!ok) bad++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${String(w).padStart(4)} px: ${r.n} labels, ${r.fs} px, cell ${r.cell} px, cell height ${r.heights.join('/')} px${r.fails.length ? ' | ' + r.fails.join('; ') : ''}`);
    await p.close(); }
  await b.close(); server.close();
  console.log(bad ? `${bad} width(s) failed` : `money map labels: all ${WIDTHS.length} widths pass (one line each, inside the cell, equal cell heights)`);
  process.exit(bad ? 1 : 0);
})();
