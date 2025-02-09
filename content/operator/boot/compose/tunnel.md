+++
title="Cloudflare Tunnelを利用する"
weight=2
+++

このページではCloudflare Tunnelを用いた場合の構築について解説します。

### なぜCloudflare Tunnelが必要なのか？

一般的に、Concrntを含むWebアプリケーションはインターネットからアクセスできる環境で起動する必要があります。

ほとんどの場合、VPSやクラウドを利用するとグローバルIPアドレスが割り当てられます。適切にDNSをセットアップすれば外部からドメイン経由でアクセス可能になります。 しかし、一般家庭のインターネットでは固定IPが利用できなかったり、ポートの解放に制限がある場合が多くあります。この場合、外部からのアクセスを受け入れることができません。

そこで利用可能なのがCloudflare Tunnelです。Concrntを含むWebアプリケーションと一緒に起動することで、インターネットからのアクセスを固定IP・ポート解放不要で受け入れることができるようになります。

<div align="center">
    <img src="/images/compose/graph-tunnel.png">
    <p>Cloudflare Tunnelを用いてサービス公開を行う場合のイメージ</p>
</div>

### 0. 前提条件

- Cloudflareのアカウントが利用可能である
- Concrntを利用予定のドメインがCloudflareに登録されており、Activeになっている。

トンネルの設定はZero Trustページから行います。

### 1. トンネルの作成

Zero Trustページから新規にトンネルを作成し、Docker起動用のコマンドを取得しメモ帳など任意の場所に貼り付けます。下記のようなコマンドが取得できるはずです。

```text
docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run
  --token eyHUAI4ahhjs// ... //tY2Y4YWZkZ
```

**ドメイン起動後にこのページを操作する必要があります。このページを閉じずに作業を進めてください。**

### 2. Composeファイルの編集

`compose.yaml` ファイルの `cloudflared` セクションのコメントアウトを全て外し、トンネルの作成時に取得した文字列の `--token` 以降の部分を `YOUR_TOKEN_HERE` の部分に貼り付け保存します。最終的に下記のような形になるはずです。

```
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: always
    command:
      - 'tunnel'
      - 'run'
      - '--token'
      - 'eyHUAI4ahhjs// ... //tY2Y4YWZkZ'
```

### 3. 設定ファイルの編集

セットアップ方法の解説ページを参考に各種設定を済ませてください。特にドメインの基本設定ファイル内 `concrnt.fqdn` がこれから設定しようとしているドメインになっていることを確認してください。

### 4. ドメインの起動

Cloudflare TunnelとConcrntのサービスを起動します。

```
docker compose up -d
```

しばらくすると、トンネルの作成ページのConnectorsに何かが表示されるようになります。Nextを押して次の画面に進みます。追加されない場合、トークンが間違っていないか、cloudflaredコンテナが正常に動作しているかを確認してください。

### 5. ホストの追加

基本設定ファイル内で指定した `concrnt.fqdn` と同じになるようにホストネームを設定し、サービスには `http://gateway:8080` を設定します。

<div align="center">
    <img src="/images/compose/cf-add-host.png">
    <p>ドメインが `cc.anyfrog.net` の場合の設定</p>
</div>

これで基本設定は完了です。数分待った後、ドメインにアクセスしConcrntドメインのトップページが表示され、CSIDが表示されているか確認してください。

<div align="center">
    <img src="/images/compose/cc-top.png">
    <p>Concrntドメインのトップページ</p>
</div>

## 追加設定

特に `cc-media-server` と `minio` の組み合わせで画像配信を実現しようとした場合など、場合によっては下記のようにサービスを増やす必要があります。

| サービスのURL            | Subdomain                   | 場合                               | 設定ファイルの場所      |
|-------------------------|---------------------------|----------------------------------|-------------------------|
| `http://gateway:8080`  | `cc.example.com`         | 主なConcrntへの通信    | `profile.fqdn`         |
| `http://minio:9000`    | `media.example.com`      | メディア配信サーバーへの通信    | `MINIO_DOMAIN`         |
| `http://minio:9001`    | `media-console.example.com` | MinIOコンソール用(任意)         | なし                    |

## トラブルシューティング

よくある問題と対応策を解説します。

### アクセスしようとしているサイトがないと表示される

Cloudflareとドメインの設定がうまく行っていないかもしれません。ネームサーバーがきちんとCloudflareのものが使われていて、レコードが登録されているか確認してみてください。

### Bad gatewayと表示される / CSIDが表示されない
Cloudflareとドメインの設定はうまく行っていますが、Serviceに指定した宛先にリクエストが送信できていないかもしれません。もう一度ServiceのURLやSchemeを見直してみてください。また、ゲートウェイがなんらかのエラーで起動できていない時もこのエラーが発生します。 `docker compose logs` コマンドを使って、なにかおかしいログがでていないか確認してみてください。

- SchemeはHTTPになっていますか？ポートは8080になっていますか？
- `concrnt.privatekey` は開発者ツールで作成したものが使われていますか？
- dbのパスワード変更を行ったのにも関わらず、DSNの値を変更し忘れていませんか？

