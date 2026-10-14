---
title: "はじめに"
sidebar:
    order: 1
---

# Concrntのサーバーを建てよう！

Concrntは環境に合わせてミニマムであれば1GBのメモリでも動作し、また環境が許せば様々なモジュールを追加し画像サーバー・検索・Activitypub連合・Bluesky連携などの機能を追加することができます。

この章では、最新のConcrnt(v2)を新しく構築する方法を解説します。環境としてはKubernetes(Helm)とDocker Composeでの動作を想定し、設定例を公開しています。

- 手軽に始めるなら [Docker Compose](/getting-started/hosting/compose/)
- 本格的に運用するなら [Kubernetes (Helm)](/getting-started/hosting/kubernetes/)

すでにv1系のドメインを運用している場合は、[v1からv2への移行](/operator/migration/)を参照してください。

ドメインを起動した後、Bluesky(AT Protocol)と相互接続したい場合は[Blueskyブリッジ(atproto)を導入する](/getting-started/hosting/atproto/)に進んでください。検索クローラーに索引されたくない場合は[クローラーの索引を拒否する(robots.txt)](/getting-started/hosting/robots/)を参照してください。

