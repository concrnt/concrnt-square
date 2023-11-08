---
title: "Migration"
weight: 10 
---

## マイグレーション

データベースについては空のカラムの追加まで自動で行われます[^gorm] [^concurrent]。それ以外の変更については、手動での対応が必要です。基本的には、リリースノートなどを参照し適切にマイグレーションを行う必要があります。

現状、2つのパターンがあり、[クエリ投入]({{% ref "#クエリ投入" %}})と、[全データリロード]({{% ref "#全データリロード" %}})になります。


## クエリ投入
`v0.3` 系から `v0.4` 系のアップデートに必要です。  
この作業は、追加された列に対して更新を行う必要があるパターンです。

https://github.com/totegamma/concurrent/releases/tag/v0.4.0  
リリースノートにある作業をdockerで実施する場合下記のようになります。


### 1. 前処理 
```shell
$ git fetch
$ git checkout v0.4.2 # 最新の差分を取得(自前ブランチの場合はmerge)
$ cd docs
$ vim compose.yml # dockerで取得するタグを変更 ※:latestの場合は必要なし
$ docker compose pull # イメージを取得
$ docker compose down # アクセス停止
$ docker compose up -d api # 自動マイグレーションでカラムを追加(dbも立ち上がる)
$ docker compose exec db psql -Upostgres concurrent # DBのSQLコンソールへログイン
```

### 2. クエリ投入
```sql
update associations set variant = payload->'body'->>'imageUrl' where schema = 'https://raw.githubusercontent.com/totegamma/concurrent-schemas/master/associations/emoji/0.0.1.json';
# => UPDATE 115
exit
```

### 3. 後処理
```shell
$ docker compose up -d # アクセス再開
```

## 全データリロード
`v0.2` 系から `v0.3` 系のアップデートに必要です。  
この作業は、SQLクエリによる更新をせず、全てのデータの再ロードの形で対処するパターンです。

### 1. 前処理

```shell
$ git fetch
$ git checkout v0.3.7 # 最新の差分を取得(自前ブランチの場合はmerge)
$ cd docs
$ vim compose.yml # dockerで取得するタグを変更 ※:latestの場合は必要なし
$ docker compose pull # イメージを取得
$ docker compose down # アクセス停止
$ docker compose up -d api db redis # ダンプに必要なサービス立ち上げ
```

### 2. ダンプ
```shell
$ docker compose exec api ccadmin -H db -r redis:6379 dump_legacy entities all > entities.json
$ docker compose exec api ccadmin -H db -r redis:6379 dump_legacy stream all > streams.json
$ docker compose down # 一旦終了
```

### 3. 過去データ退避

```shell
$ sudo mv _composeData/db _composeData/db_backup # ロールバック可能なようにバックアップ
```

### 4. ロード
```shell
$ docker compose up -d api db redis
$ docker compose exec -T api ccadmin -H db -r redis:6379 load entities < entities.json
$ docker compose exec -T api ccadmin -H db -r redis:6379 load streams < streams.json
```

### 5. 後処理
```shell
$ docker compose up -d # アクセス再開
```

### 6. リカバリ
明らかに失敗した場合、下記の手順で復旧できる。

``` shell
$ docker compose down # アクセス停止
$ sudo rm _composeData/db # 移行に失敗した永続層のデータを削除
$ sudo mv _composeData/db_backup _composeData/db # 以前のデータを復旧
$ docker compose up -d # アクセス再開
```

[^gorm]: [GORM - Auto Migration](https://gorm.io/ja_JP/docs/migration.html)
[^concurrent]: [totegamma/concurrent/develop/api/main.go](https://github.com/totegamma/concurrent/blob/develop/cmd/api/main.go#L120)
