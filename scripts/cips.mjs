// cips/ (git submodule: concrnt/CIPs-translated) の ja/*.md から
// src/content/docs/protocol/ の Starlight ページを生成する Astro integration。
// 生成物は .gitignore 済み。astro dev / build / sync の起動時に毎回作り直す。
import { readdirSync, readFileSync, writeFileSync, mkdirSync, unlinkSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcDir = join(root, 'cips', 'ja');
const outDir = join(root, 'src', 'content', 'docs', 'protocol');
const repo = 'https://github.com/concrnt/CIPs-translated';

const yamlString = (s) => JSON.stringify(s);

function generate(logger) {
	if (!existsSync(srcDir)) {
		logger.warn(`${srcDir} がありません。git submodule update --init を実行してください。`);
		return;
	}
	mkdirSync(outDir, { recursive: true });
	// 前回の生成物を掃除(手書きの index.mdx は残す)
	for (const f of readdirSync(outDir)) {
		if (/^(cip-\d+|notes)\.md$/.test(f)) unlinkSync(join(outDir, f));
	}
	let count = 0;
	for (const f of readdirSync(srcDir).sort()) {
		if (!f.endsWith('.md')) continue;
		const m = /^(\d+)-[^.]+\.md$/.exec(f);
		const isNote = f === 'notes.md';
		if (!m && !isNote) continue;
		const body = readFileSync(join(srcDir, f), 'utf8');
		const h1 = /^# (.+)$/m.exec(body);
		const title = h1 ? h1[1].trim() : f.replace(/\.md$/, '');
		const content = h1 ? body.replace(h1[0], '').replace(/^\s*\n/, '') : body;
		const order = isNote ? 1000 : Number(m[1]);
		const slug = isNote ? 'notes' : `cip-${m[1]}`;
		const out = [
			'---',
			`title: ${yamlString(title)}`,
			`description: ${yamlString(isNote ? 'CIP本文に含めるとノイズになる補足事項(規範的効力なし)' : `${title} の仕様(日本語訳)`)}`,
			'sidebar:',
			`    order: ${order}`,
			'---',
			'',
			content.trimEnd(),
			'',
			'---',
			'',
			`この文書は [concrnt/CIPs-translated](${repo}) の [\`ja/${f}\`](${repo}/blob/main/ja/${f}) から生成されています。原文(英語)は [concrnt/CIPs](https://github.com/concrnt/CIPs) を参照してください。`,
			'',
		].join('\n');
		writeFileSync(join(outDir, `${slug}.md`), out);
		count++;
	}
	logger.info(`generated ${count} pages from cips/ja`);
}

export default function cips() {
	return {
		name: 'concrnt-cips',
		hooks: {
			'astro:config:setup': ({ logger, addWatchFile }) => {
				generate(logger);
				if (existsSync(srcDir)) for (const f of readdirSync(srcDir)) addWatchFile(join(srcDir, f));
			},
		},
	};
}
