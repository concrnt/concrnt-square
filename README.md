# Concrnt Square

分散型SNS基盤 Concrnt の情報サイト ([square.concrnt.net](https://square.concrnt.net))。[Astro](https://astro.build) + [Starlight](https://starlight.astro.build) で構築しています。

## セットアップ

プロトコル仕様(CIP)の日本語訳は [concrnt/CIPs-translated](https://github.com/concrnt/CIPs-translated) を `cips/` に git submodule として取り込んでおり、`src/content/docs/protocol/` のページはそこから自動生成されます(`scripts/cips.mjs`)。クローン時はサブモジュールも取得してください。

```
git clone --recurse-submodules https://github.com/concrnt/concrnt-square
# すでにクローン済みの場合
git submodule update --init
```

```
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # dist/ に静的出力
```

翻訳を最新にするには `git -C cips pull` してサブモジュールの参照をコミットします。

## 構成

| パス | 内容 |
|---|---|
| `src/content/docs/concept/` | コンセプト |
| `src/content/docs/protocol/` | プロトコル仕様 (CIP)。`index.mdx` 以外は生成物 |
| `src/content/docs/getting-started/` | 使ってみる / アプリ開発 / サーバー構築 / 開発参加 |
| `src/content/docs/operator/` | オペレーター向け(拡張機能の導入・robots.txt・v1移行) |
| `src/content/docs/reference/` | APIリファレンス等 |
| `src/content/docs/archive/` | v1系の保管用ドキュメント |
| `cips/` | CIPs-translated サブモジュール |
