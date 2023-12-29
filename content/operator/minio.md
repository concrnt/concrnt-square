---
title: "domainへのメディア投稿(minio利用)"
---


## これは何

メディア投稿先に domain というものがあり、ドメイン運用者がセットアップをすることで、投稿者がs3やimgurをセットアップせずとも投稿する選択肢を用意できます。

![メディア投稿先の選択](https://imgur.com/aPtuVst.jpg)

ただし、Concurrentを運用しているインフラのストレージが小容量であったり、ストレージ容量に対して従量課金が発生する環境での運用はおすすめしません。
特に、海外のクラウドベンダで意図しない画像を投げ込まれた場合、自動BANに至る可能性があります[^csam]。


## 前提

この資料は MinIO `RELEASE.2023-12-07T04-16-00Z` にて、Webコンソールが利用可能な前提で進めます。

## 構築

MinIOの建て方は4通りのやり方があるため、建て方については公式[^minio]を参照してください。
Node, Driveに各々Single, Multiがあり、4通りがありますが、冗長性を重視しない場合はSNSD(SingleNode-SindleDrive)という構成になります。

k8sのサポートは手厚いためとりわけ言及しませんが、docker compose, docker swarm等での複雑な構成を行う場合、
リンク先の「Linux」の建て方を参考に、構成ファイル(docker-compose.yml等)に起こすことをおすすめします。

この構築はおおまかに下記のステップで進めます。

1. MinIOのWebコンソールにログインして各種設定
1. 個人設定のs3互換ストレージとしてテスト
1. ドメイン用のメディア保存の設定
1. 動作確認

## MinIOのWebコンソールにログインして各種設定

Webコンソールにログインして3つのものを作成します
* バケット
  保存する場所の名前
  詳細はオブジェクトストレージで検索
* ユーザー  
  MinIOのユーザー(今回直接は利用しない)
* サービスアカウント  
  MinIOのユーザーに紐付く、独立した鍵を持つユーザーのようなもの

### コンソールへログイン
1. ユーザー名とパスワードを入力しログインする  
  初期設定のルートユーザーは `root`, パスワードは`minioadmin`[^minioadmin]  
  環境変数等での初期設定変更を強く推奨

### バケットを作成
1. 左のメニューの `Administrator` のセクションの `Buckets` をクリック
1. 右上の `Create Bukect` をクリック
1. `Bucket Name*` を入力しメモ(以降、「バケット名」と呼ぶ)  
  `concurrent-media` 等を推奨。
  その他 `Versioning`, `Object Locking`, `Quota` などは一旦オフ
1. `Create Bucket` をクリック

### バケットの公開アクセスを許可

1. 左のメニューの `Administrator` のセクションの `Buckets` をクリック
1. 右側から作成した「バケット名」をクリック
1. 右側のメニューの `Summary`, `Events`, ..., `Access`, `Anonymous`のうちの `Anonymous` をクリック
1. 右上の `Add Access Rule` をクリック
1. `Prefix` に `/`, `Access` に `readonly` を選択
1. `Save` をクリック

### ユーザーを作成

1. 左のメニューの `Administrator` のセクションの `Identity` をクリック
1. 開いたメニューから `User` をクリック
1. 右上の `Create User` をクリック
1. `User Name` を入力しメモ(以降、「ユーザー名」と呼ぶ)
  `concurrent` 等を推奨。
1. `Password` をメモ(直接は利用しないが紛失しないこと)
1. `Select Policy` で `readwrite` にチェックを入れる
1. `Save` をクリック

### サービスアカウントを作成

1. 左のメニューの `Administrator` のセクションの `Identity` をクリック
1. 開いたメニューから `User` をクリック
1. 右のユーザー一覧から作成した「ユーザー名」をクリック
1. 右画面の左側にある `Groups`, `ServiceAccounts`, `Policies`のうちの `Service Accounts` をクリック
1. 右上の `Create Access Key` をクリック
1. `Expiry` は空で、 `Name`, `Description`, `Comments` は自分で識別できる値を入力
1. `Create` をクリック
1. 表示されるモーダルで `Download for import` をクリック(以降、このJSONを「クレデンシャルJSON」と呼ぶ)

### 確認事項

以上で3つのものが作成できました。  
念のため、下記のチェックリストを確認してください。

- [ ] バケットを作った
- [ ] バケットへの公開アクセスを許可した
- [ ] ユーザーを作成した
- [ ] サービスアカウントを作成した
- [ ] 「クレデンシャルJSON」をダウンロードした


## 個人設定のs3互換ストレージとしてテスト


### 設定
1. Concurrentの左上の `ホーム`, `通知`, ..., `開発者ツール`, `設定` から `設定` をクリック
1. 右側の`一般`, `プロフィール`, ..., `メディア`, `ActivityPub` のうち `メディア` をクリック
1. `使用するストレージプロバイダ` から `s3` を選択
1. `endpoint` に「クレデンシャルJSON」の `url` を入力(例: `https://minio.example.com:9000`)
1. `accessKeyId` に「クレデンシャルJSON」の `accessKey` を入力
1. `secretAccessKey` に 「クレデンシャルJSON」の `secretKey` を入力
1. `bucketName` に「バケット名」を入力
1. `publicUrl` に `「クレデンシャルJSON」のurl / 「バケット名」 /` を入力(例: `https://minio.example:900/concurrent-media/`)
1. `forcePathStyle` にチェックを入れる
1. `SAVE` をクリック

### 投稿テスト

投稿欄に画像をクリップボード等から添付して正常にアップロードされればMinIOは正常に稼働しています。  
アップロードされない場合は、MinIOの構成を見直してみてください。また、アップロードされていても投稿で表示されない場合は `publicUrl` の設定か、公開アクセス許可の設定を今一度確認してみてください。

## ドメイン用のメディア保存設定

### 設定

1. `docs/compose.yml` の `mediaserver` サービス全体のコメントアウトを解除
1. `environment` について直前の[設定](#設定) の各項目4以降の各項目に対応付けて入力  
  対応関係は下記の箇条書きを参照
    * `bucketName` は同名
    * `endpointUrl` は `endpoint`
    * `accessKeySecret` は `secretAccessKey`
    * `publicBaseUrl` は `publicUrl`
    * `forcePathStyle` は `true`
1. 対応しない `environment` に関して下記のように入力
    * `quota` は1ユーザーあたりの累計上限アップロード容量(単位はbyte, 例: 5GBは `5000000000`)
    * `db_dsn` は `docs/compose.yml` 初期のdbを用いているのであれば変更不要  
      **外部DBを利用している場合は適切に変更**
1. `docs/config/gateway.yml` の `mediaserver` のコメントアウトを解除
1. `docker compose pull`
1. 適切なオプションで再デプロイ(例: `docker compose up -d --force-recreate`)

### Webでの設定

1. Concurrentの左上の `ホーム`, `通知`, ..., `開発者ツール`, `設定` から `設定` をクリック
1. 右側の`一般`, `プロフィール`, ..., `メディア`, `ActivityPub` のうち `メディア` をクリック
1. `使用するストレージプロバイダ` から `domain` を選択

### その他設定

手順にない注意すべき設定項目として、ConcurrentのAPやMinIOの直前にあるリバースプロキシ(この例ではnginx)の `max_client_body_size` を上げ忘れていないかは要注意です。

これを忘れてnginxのデフォルト設定の上限である5MB以上のファイルをアップロードすると、`412 Request Entity Too Large` でリクエストが失敗してしまい、Concurrentのmediaserverはもちろん、gatewayにも到達しません。MinIOのリバースプロキシとしてnginxを用いている場合も同様です。

## 動作確認

投稿欄に画像をクリップボード等から添付して正常にアップロードされればmediaserverは正常に稼働しています。おつかれさまでした。

アップロードできない場合は、正常に設定が反映されているか各所のログやエラーを確認してください。
直前のs3の設定でアップロードに成功している場合、mediaserverの前後を疑うことになります。

具体的には、ネットワーク構成のミス(MinIO用のポート開放忘れ等)、リバースプロキシ(Concurrent, MinIOの手前に設置されている場合が多い)の設定ミス、gatewayの設定未反映、等多岐にわたる問題が考えられるため、各所のログの採取など丁寧なトラブルシューティングを行ってください。

[^csam]: [児童性的虐待のオンライン コンテンツ撲滅に対する Google の取り組みに関するよくある質問](https://support.google.com/transparencyreport/answer/10330933?hl=ja)
[^minio]: [Install and Deploy MinIO](https://min.io/docs/minio/linux/operations/installation.html)
[^minioadmin]: [MinIO root User](https://min.io/docs/minio/linux/administration/identity-access-management/minio-user-management.html#minio-root-user)
