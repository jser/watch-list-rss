# [JSer.info Watch List RSS](https://jser.info/watch-list-rss/)

[JSer.info Watch List](https://jser.info/watch-list/)を元にして、サイトの更新を一つのRSSフィードにまとめたものを公開しています。

- サイト: [JSer.info Watch List RSS](https://jser.info/watch-list-rss/)
- RSSフィード: <https://jser.info/watch-list-rss/feeds/rss.xml>

JSer.info Watch Listは、JSer.infoで2年以内に紹介したサイトをまとめたものです。
紹介した回数と共にまとめることで、生きているJavaScript情報源を紹介することが目的のサイトです。

- [jser/watch-list: A collection of items that are explained in JSer.info.](https://github.com/jser/watch-list)

[JSer.info Watch List RSS](https://jser.info/watch-list-rss/)では、JSer.info Watch Listのサイトの更新を一つのRSSフィードにまとめています。一つのRSSフィードを購読するだけで、JSer.infoの情報源の更新を知ることができます。

## 仕組み

1. JSer.infoでサイトを紹介する
2. [jser/dataset](https://github.com/jser/dataset): JSer.infoで紹介したサイトの一覧を扱うデータセットが更新される
3. [jser/watch-list](https://github.com/jser/watch-list): データセットを元にRSSフィードを取得、OPMLを生成
4. [jser/watch-list-rss](https://github.com/jser/watch-list-rss): watch-listのサイトごとのRSSを取得、結果を一つのRSSフィードにまとめる

```mermaid
graph TD
  JSer.info -->|更新| jser/dataset
  jser/dataset -->|更新| jser/watch-list
  jser/watch-list -->|更新| jser/watch-list-rss
  jser/watch-list-rss -->|更新| RSSフィード
```

----

↓ Original README.md ↓

----

# <img src="src/site/images/icon-transparent.png" height=26> 企業テックブログRSS
企業のテックブログの更新をまとめたRSSフィードを配信しています。
記事を読んでその企業の技術・カルチャーを知れることや、質の高い技術情報を得られることを目的としています。

https://yamadashy.github.io/tech-blog-rss-feed/


独自のフィードを作って公開したい場合は自由にフォークしてください。

## サイト追加の方針
企業のテックブログ（技術ブログ、エンジニアブログ）であれば、基本的には追加します。
ただし、以下に該当するものは検討します。

- その企業の取り組みでないものが多く投稿される可能性があるブログ
  - テック系メディア
  - Qiita Organization や Zenn Publication など、組織として投稿しているかの線引が曖昧なものは、投稿内容を見て検討します
- 記事が自社製品の紹介のみ
- 日本語以外の言語で書かれている記事が多いブログ

逆に、以下はテックブログと判断して追加しています。

- [Zenn](https://zenn.dev/), [note](https://note.com/), [Medium](https://medium.com/) などの企業系テックブログ
- 企業系ブログのテクノロジーカテゴリ

## サイトの追加方法
[src/resources/feed-info-list.ts](https://github.com/yamadashy/tech-blog-rss-feed/blob/main/src/resources/feed-info-list.ts) で管理しており、その一覧にない場合 issue を作っていただければ対応します。

### プルリクでの送り方
もしプルリクを送っていただける場合は以下のように作成できます。

1. このリポジトリをフォーク
2. ブランチ作成
   `git checkout -b new-blog-feed-xxx`
3. フィードを追加
   `src/resources/feed-info-list.ts` の `FEED_INFO_LIST` を更新
4. コミット
   `git commit -am 'add: 新規フィード追加`
5. プッシュ
   `git push origin new-blog-feed-xxx`
6. プルリクを作成

## 開発

### 仕組み
GitHub Actions で定期的に更新されており、サイトの生成は [Eleventy](https://www.11ty.dev/) を使用しています。

更新は多少遅延ありますが以下のタイミングで行います。
- 平日 8時-24時の1時間おき
- 休日 8時-24時の2時間おき

### フォークして使う場合
以下を書き換えると独自のサイトが動きます。

- `src/common/constants.js` の URL など
- `src/resources/feed-info-list.ts` のブログ情報

特定のブログに絞ったり、以下のように全く違ったフィードを作るもの良いと思います。

- [MATLAB-blog-rss-feed](https://github.com/minoue-xx/MATLAB-blog-rss-feed) ... MATLAB/Simulink 関連ブログの更新をまとめたRSSフィードを配信

### 開発環境とコマンド
環境
- Node.js >= 20

パッケージのインストール
```bash
$ yarn
```

フィード生成とサイト立ち上げ
```bash
$ # フィードを取得して作成
$ yarn feed-generate

$ # localhost:8080 で確認
$ yarn site-serve
```

コードのチェック
```bash
$ # eslint, tsc --noEmit
$ yarn lint

$ # テスト
$ yarn test
```

## ライセンス
MIT
