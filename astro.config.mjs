// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cips from './scripts/cips.mjs';

// https://astro.build/config
export default defineConfig({
	redirects: {
		'/getting-started/hosting/atproto/': '/operator/extensions/atproto/',
		'/getting-started/hosting/robots/': '/operator/robots/',
		// コンセプト配下の仕組み解説はプロトコル仕様(CIP)へ統合
		'/concept/architecture/': '/protocol/',
		'/concept/identity/': '/protocol/cip-0/',
		'/concept/repository/': '/protocol/cip-1/',
		'/concept/objects/': '/protocol/cip-1/',
		'/concept/policy/': '/protocol/cip-12/',
	},
	integrations: [
		cips(),
		starlight({
			title: 'Concrnt Square',
			social: {
				github: 'https://github.com/concrnt',
			},
			sidebar: [
                {
					label: 'Concept',
					autogenerate: { directory: 'concept' },
				},
                {
					label: 'プロトコル',
					autogenerate: { directory: 'protocol' },
				},
                {
					label: 'Getting-Started',
                    items: [
                        {
                            label: "使ってみる",
                            autogenerate: { directory: 'getting-started/world' },
                        },
                        {
                            label: "アプリケーションを作る",
                            autogenerate: { directory: 'getting-started/app-dev' },
                        },
                        {
                            label: "サーバーを建てる",
                            autogenerate: { directory: 'getting-started/hosting' },
                        },
                        {
                            label: "開発に参加する",
                            autogenerate: { directory: 'getting-started/contribute' },
                        },
                    ]
				},
                {
					label: 'オペレーター向け',
                    items: [
                        {
                            label: "拡張機能の導入",
                            autogenerate: { directory: 'operator/extensions' },
                        },
                        { slug: 'operator/robots' },
                        {
                            label: "v1からv2への移行",
                            autogenerate: { directory: 'operator/migration' },
                        },
                    ]
				},
                {
					label: 'リファレンス',
					autogenerate: { directory: 'reference' },
				},
                {
					label: 'Archive',
					autogenerate: { directory: 'archive' },
				},
                {
					label: 'Misc',
					autogenerate: { directory: 'misc' },
				},
			],
		}),
	],
});
