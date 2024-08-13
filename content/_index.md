+++
title="ConcrntSquare"
+++

# Concrnt Square
Concrnt Squareは分散型SNS「Concrnt(コンカレント)」の始め方からサーバー運用方法、開発ノウハウまで、様々な情報を集約しているサイトです。
主なwebクライアントとして[concrnt.world](https://concrnt.world)が配信されています。

## コンカレントとは

<div align="center">
    <img src="/images/mentalmodel.png" width="500px" >
</div>

コンカレントはMastodonやmisskeyなどの連合型分散と、Nostrなどの無責任中継分散の中間のような、新しい分散型SNS基盤です。その細部にはこれらのプラットフォームとは異なる独自の機能と哲学があります。

例えば、Nostrが複数リレーに書き込むことで耐検閲性や冗長性を実現しているのに対し、コンカレントはよりデータのコントロール性やユーティリティに重きを置いています。
Blueskyのように自分のデータをホストするサーバーを一時的に選択し、「誰にモデレーションされるかをユーザーが選択可能にしよう」「あるサーバーに凍結されても、データを引っ越しして別のサーバーで活動を引き継げるようにしよう」といったことを志向しています。

一方で、BlueskyはXと同様のインターフェースを持ち、個人個人が直接世界とつながるといったトポロジーを持っているのに対して、コンカレントは「ユーザーがまずたくさんのコミュニティとつながり、それらのコミュニティの相互作用から世界が形成される」といったトポロジーを追求しています。
簡単に言うなれば、Xのように世界とつながりすぎているわけでもなく、Discordのように環境が閉じすぎているわけでもない、適度にほかのコミュニティと接続し世界とつながれるSNSを指向しています。

つまり、**世界との過度な直結も、過度な閉鎖性も避け、コミュニティとの健全な接続を通じて世界とつながるバランスを目指すSNS**です。


## マイルストーン

### Step0 基本機能の実装
- [x] メッセージの投稿
- [x] コミュニティタイムラインの作成
- [x] リプライ・リツイート・リアクション
- [x] フォロー
- [x] リアルタイム配送
- [x] サーバー間リアルタイム通信

### Step1 より充実した機能の実装
- [ ] 検索
- [x] プライベートタイムライン
- [ ] メディア欄
- [ ] デッキ表示
- [x] メディアサーバーを各ドメインでホストできる選択肢を追加
- [x] ドメイン名を使ったアカウントエイリアス
- [x] ユーザーが自分で簡単に画像サーバーを作成できるように
- [x] サーバー間での自由な引っ越し
- [ ] ユーザーが自分のデータをGoogleDrive等に定期バックアップできるように

### Version2 安全性・持続可能性の向上
- [ ] ブラウザ拡張などを用いたオフラインサイナーの作成
- [x] 無価値トークンの実装 無価値トークンを用いてYoutubeの「スーパーチャット」のように、投げ銭のできるリプライ・リアクションを追加する
- [ ] グローバルエイリアスの導入

## Contributor

- [totegamma](https://github.com/totegamma)
- [rassi0429](https://github.com/rassi0429)
- [waonme](https://github.com/waonme)
- [naborisk](https://github.com/naborisk)
- [oinarisummer](https://github.com/oinarisummer)
- [fono09](https://github.com/fono09)
- [ouroboros723](https://github.com/ouroboros723)
- [Zozokasu](https://github.com/zozokasu)
- [tigerwall](https://github.com/tigerwall)
- [ryotn](https://github.com/ryotn)
- [7ka-Hiira](https://github.com/7ka-Hiira)
- [Hennnatori](https://github.com/Hennnatori)
- [alternative00](https://github.com/alternative00)
- [kznrluk](https://github.com/kznrluk)

