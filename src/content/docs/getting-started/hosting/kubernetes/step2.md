+++
title="Step2 アクセスできるようにする"
weight=2
+++

## Cloudflareのアカウントを作成
[Cloudflare アカウントの新規作成手順](https://dev.classmethod.jp/articles/how-to-create-a-new-cloudflare-account/)を参考にアカウントを作成してください。

## Cloudflareにドメインを登録
cloudflare上で新しいドメインを購入したり、よそから移管したり、事情がある人はNameServerだけCloudflareに向けたりしてください。

## CloudflareTunnelsの設定
[はじめてのCloudflare Tunnel その１ Cloudflare Tunnelを試してみる](https://zenn.dev/kameoncloud/articles/1433b8b26f032c)を参考に無料プランで設定してみてください。

Public hostnamesを以下の内容で設定します。
```
HTTP :// ccgateway.concrnt.svc.cluster.local
```

OverviewのInstall and run a connectorの項目から、トークンっぽい文字列をコピーしておきます。

## Cloudflaredをクラスターにデプロイ

以下の内容を`cloudflared-deployment.yaml`として作成してください。(ファイル中にトークンを設定する箇所があります)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: cloudflared
  name: cloudflared-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      pod: cloudflared
  template:
    metadata:
      creationTimestamp: null
      labels:
        pod: cloudflared
    spec:
      containers:
      - command:
        - cloudflared
        - tunnel
        - --metrics
        - 0.0.0.0:2000
        - run
        args:
        - --token
        - <上で取得したトークン>
        image: cloudflare/cloudflared:latest
        name: cloudflared
        livenessProbe:
          httpGet:
            path: /ready
            port: 2000
          failureThreshold: 1
          initialDelaySeconds: 10
          periodSeconds: 10
```

デプロイ
```
microk8s kubectl apply -f cloudflared-deployment.yaml
```

デプロイの確認
```
microk8s kubectl get pods
```

## ブラウザでアクセスを確認

ブラウザで設定したドメインに対してアクセスができれば成功です！

webクライアント [https://concrnt.world](https://concrnt.world) で新しくユーザーを作成する際いカスタムを選択し、自分のドメインを入力することで自分のサーバーにアカウントを作成することができます。

[https://square.concrnt.net/operator/boot/#連合](https://square.concrnt.net/operator/boot/#連合)を参考に、ほかのサーバーにもアクセスできるか確認してみてください。

