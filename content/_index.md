+++
title="ConcurrentSquare"
+++

# Concurrent Square
Concurrent Squareは分散型SNS「Concurrent(コンカレント)」の始め方からサーバー運用方法、開発ノウハウまで、様々な情報を集約しているサイトです。
アプリ本体は[concurrent.world](https://concurrent.world)へGo!

## Concurrentとは
ConcurrentはMastodonやmisskeyなどの連合型分散と、Nostrなどの無責任中継分散の中間のような、新しい分散型SNS基盤です。

連合型分散のようにインスタンスごとにアカウントを作る必要はなく、秘密鍵によって証明される単一のアカウントで複数のサーバーと接続できます。

また、自分の投稿のオリジナルはすべてその時設定している「ドメインサーバー」へ保存されるため、自身の発言が他人の都合により消滅することはありません。

自身が所属するドメインサーバーは、データのエクスポート・インポートを行うことで自由に引っ越すことができます。

## 実装戦略
### 暗号技術を使う
アカウントのポータビリティを高めるため、公開鍵認証を行います。 ユーザーのIDはユーザーの公開鍵を用いて作成され、秘密鍵とそれから作られる署名をもって、そのアカウントの発言であることを証明します。

### モジュラリティを重視する
Concurrentは分散型であり、多くの人が同一のバイナリを扱うことを想定しています。 webフロントで必要な要素を追加するために、サーバーのバイナリの更新を毎回行わないといけないとなると、サーバー管理者の負担が増してしまいます。 
ConcurrentはSNSのセマンティクスを「Message」「Association」「Character」「Stream」「Collection」に抽象化することで、バックエンドの変更をできるだけ減らしたまま、フロントに大きな新機能を追加できることを目指します。

## マイルストーン

### Version0 基本機能の実装
- [x] メッセージの投稿
- [x] コミュニティタイムラインの作成
- [x] リプライ・リツイート・リアクション
- [x] フォロー
- [x] リアルタイム配送
- [x] サーバー間リアルタイム通信

### Version1 より充実した機能の実装
- [ ] ミュート
- [ ] プライベートタイムライン
- [ ] メディア欄
- [ ] デッキ表示
- [ ] メディアサーバーを各ドメインでホストできる選択肢を追加
- [ ] ユーザーが自分で簡単に画像サーバーを作成できるように
- [ ] ユーザーが自分のデータをGoogleDrive等に定期バックアップできるように

### Version2 安全性・持続可能性の向上
- [ ] ブラウザ拡張などを用いたオフラインサイナーの作成
- [ ] 無価値トークンの実装 無価値トークンを用いてYoutubeの「スーパーチャット」のように、投げ銭のできるリプライ・リアクションを追加する
- [ ] グローバルエイリアスの導入

## Contributor

- [totegamma](https://github.com/totegamma)
- [rassi0429](https://github.com/rassi0429)
- [naborisk](https://github.com/naborisk)
- [malamutedataro](https://github.com/malamutedataro)
- [oinarisummer](https://github.com/oinarisummer)
- [fono09](https://github.com/fono09)
- [ouroboros723](https://github.com/ouroboros723)
- [Zozokasu](https://github.com/zozokasu)
- [Hennnatori](https://github.com/Hennnatori)

