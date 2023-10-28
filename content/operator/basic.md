+++
title="QuickStart"
+++

## 構築

dockerを使う方法と、k8sを使う方法があります。

#### with docker
このディレクトリ内のcompose.ymlがそのまま使える形になっています(ルートのcompose.ymlは開発用です)。

現在利用可能なすべてのサービスが入っているので、適宜使わないサービスをコメントアウトしてください。
サービスを省略した場合、config内のgateway.yamlに記述してあるルーティング設定も取り除くのを忘れないように。

config/config.yamlのxxxの箇所を適宜埋めてください。サーバーのprivatekey等は、concurrent.worldで設定から開発者モードを有効にした際に現れるDevToolページのIdentityGeneratorを使うと便利です。

#### with k8s
helmchartがあります: https://helmcharts.gammalab.net
チャート本体のレポジトリ: https://github.com/totegamma/helmcharts/tree/master/charts/concurrent

valuesに入れる値はdocker composeを使う場合のconfigの生成方法を参考にしてください。

モニタリングを有効にする場合はValues.observabilityにgrafanacloudの各種認証情報を追加すると利用できます。

### アカウントの作成
通常通りconcurrent.worldのアカウント作成画面を進み、ドメイン選択で構築したドメインのアドレスを入力して作成します。
(最初から登録をcloseにしたい場合、後述するコマンドで手動で作成し、アカウントインポートから読み込むという方法もあります。)

<TODO: わかりやすいスクショ>

### 管理者アカウントとして設定
(k8sを使える人はよしなに解釈できると思うので以降はdockerを用いた場合を想定してコマンドを掲載します。)

```
# FYI: アカウントの作成(webから行わない場合)
docker compose exec api ccadmin -H db entity add <CCID>

# アカウントに`_admin`ロールを付与する
docker compose exec api ccadmin -H db entity role <CCID> _admin
```

### 管理者画面にアクセス
concurrent-worldの設定画面にある`go to domain home`からジャンプできます

<TODO: わかりやすいスクショ>
