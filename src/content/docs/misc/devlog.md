+++
title="開発史"
weight=4
+++

<iframe
  width="100%"
  style="aspect-ratio: 16/9"
  src="https://www.youtube.com/embed/_z1keVr6KJ8"
  title="concrnt devlog 09/09"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

### 2023/02/04 First Commit

concrntバックエンドとフロントエンドのレポジトリを作成し、最初のコミットを行いました。

https://github.com/totegamma/concurrent/commit/167f2d21fc026b0f58baf98d9424fb42b1917d09

https://github.com/totegamma/concurrent-world/commit/92c9b7448d495aeba61db642f8a88d53661e077d

この時はまだしっかり作るというよりはPoCを作ってみるという気持ちで、署名もRSAを使っていました。

### 2023/04/30 本格始動

ゴールデンウィーク暇だしなんかやるか～～ということでPoCを掘り出して、本格的に開発を始めました。
このタイミングでRSA署名をやめて、ecdsa + keccak256に変更しました。

https://github.com/totegamma/concurrent/commit/7b85df5aaefa08d99d350a611b51b8cf6da8ef02

フロントエンドも今とは全く違う見た目です。

<img src="/images/museum/23-04-30.png" target="_blank" >


### 2023/05/01 ふぁぼの実装

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">

<img src="/images/museum/23-05-01-1.png" target="_blank" />

<img src="/images/museum/23-05-01-2.png" target="_blank" />

</div>

### 2023/05/02 デザインの刷新

<img src="/images/museum/23-05-02.png" target="_blank" >

### 2023/05/03 markdownが使えるように+テーマの追加


<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">

<img src="/images/museum/23-05-03-1.png" target="_blank" >
<img src="/images/museum/23-05-03-2.png" target="_blank" >

</div>

### 2023/05/05 フォロー機能の追加 + webホスティング開始 + モバイル対応

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">

<img src="/images/museum/23-05-05-1.png" target="_blank" >
<img src="/images/museum/23-05-05-2.png" target="_blank" >

</div>

### 2023/05/06 Emergency画面の追加

<img src="/images/museum/23-05-06.png" target="_blank" >

このころは大体こんな感じ

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">

<img src="/images/museum/23-05-06-1.png" target="_blank" >
<img src="/images/museum/23-05-07.png" target="_blank" >

</div>

### 2023/05/14 PWA対応

<img src="/images/museum/23-05-14.png" target="_blank" >


### 2023/05/25 第一次アポカリプス

<img src="/images/museum/23-05-25.png" target="_blank" >

### 2023/08/18 絵文字パッケージの追加

### 2023/08/26 LPの作成


<img src="/images/museum/23-08-26.png" target="_blank" >

### 2023/09/04 ActivityPub連携の開通


### 2023/09/19 第一次流入

notestockの開発者のosaponさんに発見され、数十人が急にコンカレに訪れる事件が発生
https://mstdn.nere9.help/@osapon/111089070321426200gg

### 2023/09/22 最初の3rd partyサーバーの登場
それまで開発者自身が運用していたサーバーに加え、最初の3rd partyサーバーが登場
<!--con.fono.jp-->

### 2024/01/17 紹介記事の登場
https://spotlight.soy/detail?article_id=a5omlx7qn

### 2024/02/24 サブキーの導入

新しくサブキーの概念が実装されました

### 2024/06/01 v1リリース (第二次アポカリプス)

様々な問題点の修正や改良を加えたバージョン1、通称v1が開発されました。



