+++
title="Repository"
weight=4
+++

### リソースモデルとドキュメント
ConcrntはSNSを構成する要素をいくつかのリソースモデルとして分解しています。
ユーザーがプロフィールや投稿などのリソースを作成するためには、「ドキュメント」と呼ばれる署名付きのjsonオブジェクトを作成し、サーバーに対して投稿します。
これが受理されるとサーバーはそのユーザーのコミットログとしてこのドキュメントを内部に保存します。このログをダウンロードし、ほかのサーバーに頭から流し込むことで自分のデータをほかのサーバーに引っ越しすることができます。(バージョン1。バージョン0ではシンプルなAPIのCRUD操作で実装されている。)

ドキュメントの基本の形は次のようになっており、また一部のリソースはこれを拡張して利用しています。
```go
type DocumentBase[T any] struct {
	ID       string    `json:"id,omitempty"`
	Signer   string    `json:"signer"`
	Type     string    `json:"type"`
	Schema   string    `json:"schema,omitempty"`
	KeyID    string    `json:"keyID,omitempty"`
	Body     T         `json:"body,omitempty"`
	Meta     any       `json:"meta,omitempty"`
	SignedAt time.Time `json:"signedAt"`
}
```
