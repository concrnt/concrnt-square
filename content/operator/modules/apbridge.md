+++
title="Activitypubモジュールのセットアップ"
weight=2
+++

Activitypubモジュールは、ConcrntドメインをActivitypubのサーバーとしても認識できるようにし、他のActivitypubサーバーとの連携を可能にします。

{{< notice info >}}
Activitypubはその性質上、フォローしたユーザーの新着投稿などのデータを全て自身のサーバーに保存する必要がある為、ドメイン内のメッセージ数が増加します。
{{< /notice >}}

## Activitypub連携用のBotアカウントの作成
まず、従来通りの方法で、webクライアントから新しいアカウントを作成します。このとき、プロフィール名はActivitypub用のbotであること、アイコンも分かりやすいものを設定しておくと良いでしょう。サブキーを生成する必要はありません。

次に、作成したアカウントの秘密鍵を取得します。
秘密鍵は、設定>一般から開発者モードを有効にすることで確認することができます。

## Activitypubモジュールの有効化
ドメインを建てた際のvalues.yamlからactivitypubの項目を探し、設定します。

```yaml
activitypub:
  enabled: true #ここをtrueに変更
  image: ghcr.io/concrnt/ccworld-ap-bridge:latest
  privatekey: <上の手順で取得した秘密鍵>
```

## モジュールの適用

kubectl applyで設定を反映します。

```bash
$ microk8s kubectl kustomize . --enable-helm | microk8s kubectl apply -f -
```

その後、gatewayを再起動します。

```bash
~/concrnt-kustomize$ microk8s kubectl rollout restart deployment/ccapi -n concrnt
```

