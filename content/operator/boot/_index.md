+++
title="サーバー構築"
weight=1
+++

このページではコンカレントサーバーを構築するのに必要な最低限の情報を記載しています。
詳細はこのページ以下の各種チュートリアルを参照してください。

## バージョン選定

現状の慣習として `v1.0.3` のように「最新のタグ付きバージョン」を利用することをおすすめします。
例示したバージョンが最新でなければ、より新しいものを利用してください。

あくまで開発中のため、厳格な[セマンティックバージョニング](https://semver.org/)は現状行われていませんが、
マイグレーションを要するバージョンアップがある場合、少なくともパッチでないバージョンが上がる形での運用になっています。

## 構築
基本的にkubernetesを用いた構築を推奨しています。

helm chartはこちらから配信されています: https://charts.concrnt.net/
また、kustomizeの例としてレポジトリが公開されています: https://github.com/concrnt/concrnt-kustomize
詳細はこの階層にあるチュートリアルを参照してください。


docker-compose当でも立ち上げが可能ですが、例えばバックアップ等の定期ジョブは手動で設定する必要があります。

compose.ymlや設定ファイル等は[レポジトリ内の\_docsディレクトリ](https://github.com/totegamma/concurrent/tree/develop/_docs)を参照してください。
kustomizeを用いる場合と異なり、設定ファイルが自動生成されないので、注意して`etc/config.yaml`を設定してください。特に、[activitypubモジュール]({{< ref "apbridge" >}})を有効にする場合、重複して設定する箇所があるため、もれのないように設定する必要があります。

## config
サーバーに割り当てる秘密鍵は、concrnt.worldの開発者ツールの`Identity Generator`を使うと簡単です。
若しくは、次のワンライナーでも生成することができます。
```bash
openssl ecparam -name secp256k1 -genkey -noout | openssl ec -text -noout 2&>null | grep priv -A 3 | tail -n +2 | tr -d ' :\n'
```


## セットアップ
webクライアント https://concrnt.world を通じて自分のサーバーにアカウントを作成することができます。
welcomeページの「アカウントを作成」をクリックし、カスタムセットアップを選択します。
その後、サーバーのアドレスを入力し、アカウントを作成します。

## 連合
作成後のサーバーはどのほかのサーバーともつながっていませんが、クライアントからほかのサーバーのコンテンツを参照することで自動的に連合が成立します。
例えば、[在明インスタンスのarrival lounge](https://concrnt.world/timeline/tar69vv26r5s4wk0r067v20bvyw@ariake.concrnt.net)を開いてみると良いでしょう。


