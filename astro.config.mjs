// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
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
					autogenerate: { directory: 'operator' },
				},
                {
					label: 'リファレンス',
					autogenerate: { directory: 'reference' },
				},
                {
					label: 'Misc',
					autogenerate: { directory: 'misc' },
				},
			],
		}),
	],
});
