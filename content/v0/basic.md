+++
title="QuickStart"
weight=1
+++

## バージョン選定

現状の慣習として `v0.3.7` のように「最新のタグ付きバージョン」を利用することをおすすめします。
例示したバージョンが最新でなければ、より新しいものを利用してください。

あくまで開発中のため、厳格な[セマンティックバージョニング](https://semver.org/)は現状行われていませんが、
マイグレーションを要するバージョンアップがある場合、少なくともパッチでないバージョンが上がる形での運用になっています。

## 構築

dockerを使う方法と、k8sを使う方法があります。

#### with docker

[totegamma/concurrent](https://github.com/totegamma/concurrent) の `docs/compose.yml` がそのまま使える形になっています。


リポジトリルートの `compose.yml` は開発用です。

現在利用可能なすべてのサービスが入っているので、適宜使わないサービスをコメントアウトしてください。
サービスを省略した場合、`docs/config/gateway.yaml` に記述してあるルーティング設定も取り除くのを忘れないようにしてください。

例: apbridge をコメントアウトした場合、webfingerも一括でコメントアウトする必要がある。これは、webfingerサービスをapbridgeのコンテナが担っていることによる
```diff
--- a/docs/config/gateway.yaml
+++ b/docs/config/gateway.yaml
@@ -13,15 +13,15 @@ services:
     host: summary
     port: 8080
     path: /summary
-  - name: activitypub
-    host: apbridge
-    port: 8000
-    path: /ap
-    preservePath: true
-    injectCors: true
-  - name: webfinger
-    host: apbridge
-    port: 8000
-    path: /.well-known
-    preservePath: true
-    injectCors: true
+#  - name: activitypub
+#    host: apbridge
+#    port: 8000
+#    path: /ap
+#    preservePath: true
+#    injectCors: true
+#  - name: webfinger
+#    host: apbridge
+#    port: 8000
+#    path: /.well-known
+#    preservePath: true
+#    injectCors: true
```

次に、config/config.yamlのxxxの箇所を適宜埋めてください。サーバーのprivatekey等は下記の手順で生成できます。

1. 通常通り https://concurrent.world/ から登録する  
  `hub.conccurrent.world` へアカウントを作成することになりますが、  
  立ち上げるサーバーの検証用途のためにも、ここでのアカウント作成を推奨します
1. 登録済みの状態で https://concurrent.world/settings/general へ行く
1. 「基本」のセクションにある「開発者モード」のトグルを有効にする
1. 左サイドバーの「ホーム」からの並びに「開発者ツール」が現れるのでクリック
1. IdentityGeneratorをで「GENERATE」をクリック

**※ mnemonic(呪文), CCID, publickey(公開鍵), privatekey(秘密鍵)は必ずセットで利用してください。**

`docker compose up -d` で立ち上げて、 `docker compose logs -f` にてログを監視して、問題なければ [アカウントの作成]({{% ref "#アカウントの作成" %}}) へ進んでください。

<TODO: トラブルシューティング>

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
