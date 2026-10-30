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
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/concrnt' },
			],
			sidebar: [
                {
					label: 'Concept',
					items: [{ autogenerate: { directory: 'concept' } }],
				},
                {
					label: 'プロトコル',
					items: [{ autogenerate: { directory: 'protocol' } }],
				},
                {
					label: 'Getting-Started',
                    items: [
                        {
                            label: "使ってみる",
                            items: [{ autogenerate: { directory: 'getting-started/world' } }],
                        },
                        {
                            label: "アプリケーションを作る",
                            items: [{ autogenerate: { directory: 'getting-started/app-dev' } }],
                        },
                        {
                            label: "サーバーを建てる",
                            items: [{ autogenerate: { directory: 'getting-started/hosting' } }],
                        },
                        {
                            label: "開発に参加する",
                            items: [{ autogenerate: { directory: 'getting-started/contribute' } }],
                        },
                    ]
				},
                {
					label: 'オペレーター向け',
                    items: [
                        {
                            label: "拡張機能の導入",
                            items: [{ autogenerate: { directory: 'operator/extensions' } }],
                        },
                        { slug: 'operator/robots' },
                        {
                            label: "v1からv2への移行",
                            items: [{ autogenerate: { directory: 'operator/migration' } }],
                        },
                    ]
				},
                {
					label: 'リファレンス',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
                {
					label: 'Archive',
					items: [{ autogenerate: { directory: 'archive' } }],
				},
                {
					label: 'Misc',
					items: [{ autogenerate: { directory: 'misc' } }],
				},
			],
		}),
	],
});
