+++
title="docker compose(作成中)"
weight=2
+++

compose.ymlや設定ファイル等は[レポジトリ内の\_docsディレクトリ](https://github.com/totegamma/concurrent/tree/develop/_docs)を参照してください。
kustomizeを用いる場合と異なり、設定ファイルが自動生成されないので、注意して`etc/config.yaml`を設定してください。特に、[activitypubモジュール]({{< ref "apbridge" >}})を有効にする場合、重複して設定する箇所があるため、もれのないように設定する必要があります。

## config
サーバーに割り当てる秘密鍵は、conctrlツールを使って生成することができます。
```bash
conctl gen identity
```

## セットアップ
webクライアント https://concrnt.world を通じて自分のサーバーにアカウントを作成することができます。
welcomeページの「アカウントを作成」をクリックし、カスタムセットアップを選択します。
その後、サーバーのアドレスを入力し、アカウントを作成します。

## 連合
作成後のサーバーはどのほかのサーバーともつながっていませんが、クライアントからほかのサーバーのコンテンツを参照することで自動的に連合が成立します。
例えば、[在明インスタンスのarrival lounge](https://concrnt.world/timeline/tar69vv26r5s4wk0r067v20bvyw@ariake.concrnt.net)を開いてみると良いでしょう。

