// Renders a Mermaid source file (.mmd) to a static SVG next to it, so pages
// ship plain markup: no client-side JS, and RSS/no-JS readers see the diagram.
//   node scripts/render-diagram.mjs src/assets/blog/<post>/<name>.mmd
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const src = process.argv[2];
if (!src?.endsWith('.mmd')) throw new Error('usage: render-diagram.mjs <file.mmd>');
const require = createRequire(import.meta.url);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.addScriptTag({ path: require.resolve('mermaid/dist/mermaid.min.js') });
const svg = await page.evaluate(async (def) => {
	// Site tokens from src/styles/global.css (dark theme).
	window.mermaid.initialize({
		startOnLoad: false,
		theme: 'base',
		darkMode: true,
		fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif",
		htmlLabels: false,
		flowchart: { htmlLabels: false, wrappingWidth: 400, nodeSpacing: 30, rankSpacing: 40 },
		themeCSS: '.edgeLabel rect, .labelBkg { fill: #0f0f0f !important; opacity: 1 !important; }',
		themeVariables: {
			background: '#0f0f0f',
			primaryColor: '#1e1c1a',
			primaryTextColor: '#e8e6e1',
			primaryBorderColor: '#c9a96e',
			lineColor: '#6e6c66',
			secondaryColor: '#0f0f0f',
			tertiaryColor: '#161514',
			edgeLabelBackground: '#0f0f0f',
		},
	});
	const { svg } = await window.mermaid.render('diagram', def);
	// Re-serialize as XML: the file is loaded as <img>, which needs well-formed SVG.
	const host = document.createElement('div');
	host.innerHTML = svg;
	const el = host.firstElementChild;
	// Typographic hierarchy: in each node the first line is the title, the
	// rest is smaller, muted detail. Rows are re-spaced and the label is
	// re-centred in its shape, because Mermaid sized them for uniform 16px text.
	document.body.appendChild(host);
	for (const node of el.querySelectorAll('g.node')) {
		const text = node.querySelector('text');
		const rows = text.querySelectorAll(':scope > tspan.row');
		rows.forEach((row, i) => {
			row.setAttribute('dy', '0');
			row.setAttribute('y', String(i === 0 ? 0 : 6 + i * 17));
			if (i === 0) row.style.fontWeight = '600';
			else Object.assign(row.style, { fontSize: '13px', fill: '#a8a59e' });
		});
		const label = node.querySelector('g.label');
		const [, tx, ty] = label.getAttribute('transform').match(/translate\(([-\d.]+),\s*([-\d.]+)\)/).map(Number);
		// Measure on screen: shapes like cylinders carry their own transforms.
		const shape = node.querySelector('.label-container') ?? node.firstElementChild;
		const scale = el.getBoundingClientRect().width / el.viewBox.baseVal.width;
		const sr = shape.getBoundingClientRect();
		const lr = text.getBoundingClientRect();
		const shift = (sr.top + sr.height / 2 - (lr.top + lr.height / 2)) / scale;
		label.setAttribute('transform', `translate(${tx}, ${ty + shift})`);
	}
	for (const text of el.querySelectorAll('.edgeLabels text, .edgeLabel text')) {
		Object.assign(text.style, { fontSize: '13px', fill: '#a8a59e' });
	}
	// Fixed intrinsic size from the viewBox, so the page can show it at natural width.
	const [, , w, h] = el.getAttribute('viewBox').split(/\s+/).map(Number);
	el.setAttribute('width', String(Math.ceil(w)));
	el.setAttribute('height', String(Math.ceil(h)));
	el.removeAttribute('style');
	return new XMLSerializer().serializeToString(el);
}, readFileSync(src, 'utf8'));
await browser.close();

const out = src.replace(/\.mmd$/, '.svg');
writeFileSync(out, svg);
console.log(`wrote ${out}`);
