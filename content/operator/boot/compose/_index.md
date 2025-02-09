+++
title="Docker Compose"
weight=2
+++

このページではDocker Composeを使ったConcrntドメインのセットアップ方法について解説します。

{{< notice info >}}
Concrntでは公式のドメイン動作環境としてKubernetesが推奨されています。Docker Composeを利用した構築も可能ですが、Compose環境特有の問題が発生する可能性があります。コミュニティに質問をするときは、Composeを使っていることを併記してください。
{{< /notice >}}

### 1. リポジトリを取得

Composeの構成ファイルが入ったリポジトリをクローンします。

```
git clone https://github.com/concrnt/compose
```

起動する前に各種設定を完了してください。

### 2. 各種設定

必要に応じてファイルを編集し各種設定を変更してください。

#### **compose/etc/config/config.yaml**

このファイルでConcrntドメインの基本設定を行います。

`concrnt.fqdn`

コンカレントのFQDN≒ドメイン名を指定します。この情報は後で変更することが非常に困難なため、よく考えて定義してください。HTTPSといったスキームは不要です。 `fqdn: cc1gb.anyfrog.net` のように指定してください。

`concrnt.registration`

アカウント作成の制限について設定します。`open`は誰でも登録が可能、 `invite` は招待が必要、 `close` は新規のアカウント作成ができなくなります。広く公開を考えていない場合、 `invite` で作成するのが良いでしょう。

`concrnt.privatekey`

サーバーが内部で利用する暗号鍵の設定を行います。既存のアカウントで公式クライアントのConcrnt Worldにログインし、設定/一般から開発者モードを有効化してください。すると、メニューに開発者ツールが表示されますのでクリックして開いてください。画面上部の `IDENTITYGENERATOR` タブを選択し、 `GENERATE` ボタンを押すと新しい認証情報が生成されますので、その中から `privatekey` をコピーして転記してください。

<div align="center">
    <img src="/images/compose/cw-devtool.png" width="500px" >
    <p>Devtoolで `privatekey` を生成可能</p>
</div>

`profile.*`

サーバープロフィールを設定します。後から変更できます。

| **Key**           | **意味**                    |
|-------------------|---------------------------|
| `nickname`        | サーバー名                     |
| `description`     | サーバーの紹介文                  |
| `logo`            | ロゴの画像                     |
| `wordmark`        | 登録画面に表示される Powered by の画像 |
| `themeColor`      | テーマカラー                    |
| `maintainerName`  | メンテナの名前                   |
| `maintainerEmail` | メンテナのメールアドレス              |

`profile` に設定された値は Concrnt の中で表示され、いわばサーバーの看板のように表示されます。  

<div align="center">
    <img src="/images/compose/cw-profiles.png" width="500px" >
    <p>探索に並ぶサーバー名とアイコン</p>
</div>


#### **compose/etc/config/gateway.yaml**

`cctgateway` の設定ファイルが含まれます。基本的に設定を変更する必要はありません。

#### **compose/etc/static/\*\*.yaml**

アカウント新規作成時に表示される各種注意事項や規約、管理者が収集したいデータについて定義するファイルが含まれます。

#### **compose/compose.yaml**

このファイルでConcrntの各サービスの立ち上げと構成を行います。

`services.cloudflared`

Cloudflare Tunnelを利用する場合、コメントを外してトークンを置き換えてください。

{{< notice warning >}}
固定IPアドレスやポート解放を行えない環境でドメインを起動する場合、この項目の設定は必須です。 「Cloudflare Tunnelを利用する」ページに移動し、各種設定を済ませてください。
{{< /notice >}}

### 3. 起動

下記コマンドで起動します。 `compose.yaml` が存在する場所で下記コマンドを実行してください。

```
docker compose up -d
```

`concrnt.fqdn` にブラウザでアクセスし、下記画面が表示されCSIDが表示されていれば完了です。

<div align="center">
    <img src="/images/compose/cc-top.png">
    <p>Concrntドメインのトップページ</p>
</div>


### 4. アカウント作成と連合の追加

// TODO: 招待コードの作成

Webクライアント [https://concrnt.world](https://concrnt.world) を用いて自身のドメインでアカウントを作成してください。

アカウント作成後は何もないまっさらなタイムラインが表示されますが心配ありません。
下記のようなタイムラインにアクセスし、何か投稿してみましょう！

- [#arrival lounge](https://concrnt.world/timeline/tar69vv26r5s4wk0r067v20bvyw@ariake.concrnt.net)
- [#Concrnt Fun](https://concrnt.world/timeline/ty3b4tc0eamm333pp0683gw1ndg@ariake.concrnt.net)

違うドメインのタイムラインに投稿したとしても、投稿のデータはすべてあなたのドメインだけに保存されます。Concrntを楽しみましょう！
