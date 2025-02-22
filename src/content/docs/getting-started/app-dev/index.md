---
title: "nodejs"
sortOrder: 1
---


現在Concrntにはnodeのライブラリが存在しています。webクライアント実装である[concrnt.world](concrnt.world)もこのライブラリを利用して開発されているので、webクライアントでできるような投稿、購読、リアルタイムイベントの受信など、全ての機能をこのライブラリ経由で利用することができます。

## ライブラリのインストール

```bash
pnpm i @concrnt/client @concrnt/worldlib
```

でライブラリをインストールすることができます。


## Examples

ほかに欲しい例があれば、是非[GitHubのリポジトリ](https://github.com/concrnt/concrnt-square)にIssueを立ててください。

### 投稿する

サブキーの持ち主のアカウントで、ホームタイムラインとarrival_loungeタイムラインに投稿する例です。

```js
import { Client } from '@concrnt/worldlib'

const arrival_lounge = 'tar69vv26r5s4wk0r067v20bvyw@ariake.concrnt.net'
const body = 'はろはろ'

const subkey = "concurrent-subkey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2@denken.concrnt.net totegamma"
const client = await Client.createFromSubkey(subkey)

await client.createMarkdownCrnt(
    body,
    [client.user.homeTimeline, arrival_lounge],
);
```


### リアルタイムで投稿を受信する

サブキーの持ち主のアカウントの、ホームタイムラインに投稿されたメッセージをリアルタイムで受信する例です。

```js
import { Client } from '@concrnt/worldlib'

const subkey = "concurrent-subkey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2@denken.concrnt.net totegamma"
const client = await Client.createFromSubkey(subkey)

const subscription = await client.newSubscription()

subscription.on('MessageCreated', (message) => {
    console.log(message)
})

subscription.listen([client.user.homeTimeline])
```

すると、次のようなデータが降ってきます。

```js
{
  timeline: 'world.concrnt.t-home@con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2',
  item: {
    resourceID: 'msn6mfn3xyp2g5ss00683ha87hm',
    timelineID: 'tv2zwpcdbz7m8tc6j067v1wnwtc',
    owner: 'con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2',
    cdate: '2024-06-21T02:38:40.013Z'
  },
  document: {
    signer: 'con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2',
    type: 'message',
    schema: 'https://schema.concrnt.world/m/markdown.json',
    body: {
      body: '雨の中おべんと買いにいくか否か',
      emojis: {},
      mentions: [],
      profileOverride: {}
    },
    meta: { client: 'concrnt.world-concrnt-a01e35d' },
    timelines: [
      'ty3b4tc0eamm333pp0683gw1ndg@ariake.concrnt.net',
      'world.concrnt.t-home@con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2'
    ],
    signedAt: '2024-06-21T02:38:40.013Z',
    keyID: 'cck1x9ee0xf4s7qrjze4n85malrdkreqtujfzq8jqv'
  },
  _document: '{"signer":"con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2","type":"message","schema":"https://schema.concrnt.world/m/markdown.json","body":{"body":"雨の中おべんと買いにいくか否か","emojis":{},"mentions":[],"profileOverride":{}},"meta":{"client":"concrnt.world-concrnt-a01e35d"},"timelines":["ty3b4tc0eamm333pp0683gw1ndg@ariake.concrnt.net","world.concrnt.t-home@con1t0tey8uxhkqkd4wcp4hd4jedt7f0vfhk29xdd2"],"signedAt":"2024-06-21T02:38:40.013Z","keyID":"cck1x9ee0xf4s7qrjze4n85malrdkreqtujfzq8jqv"}',
  signature: 'f97895a336debbd3ac2b5602856d37dcb8f0950cb27e735047534d45a83738005c31a5c44afe3ff9270726d6cbd31758a2e94cdb73a4e1ad9205fa568c30646501',
  resource: undefined
}
```


