Lenrn Languages 公式サイト
====

# ディレクトリ構成

- event // イベント概要
- sessions // セッション概要
- site // ll.jus.or.jp アーカイブ

# 使用方法

1. スタッフはこのリポジトリをフォークしてください。
1. ドキュメントをコミットしたらPRを送ってください。マージします。
1. イベント概要、セッション概要はそれぞれのディレクトリに```README.md```としてコミットしてもらえばGitHub上でそのまま表示できます。
1. リポジトリ運営方法についての疑問等はIssueとして書いてください。


# 必要な開発環境

- Node.js 18~ // 必須

# ディレクトリ構成

```
staff
├── README.md             //     このファイル
├── event
│   └── README.md        // (1) Markdownソース
├── md2html.js            // (2) 変換用スクリプト
└── package.json
```

# HTMLの更新手順

1. 記事本文を修正したい場合はMarkdown形式のソースコード```event/README.md```を編集します。ただしこれは記事本文のみのソースであり、HTML全体のソースは```md2html.js```の中に直に書いてあります。記事本文以外のHTMLを編集したい場合は```md2html.js```をコード修正する必要があります
1. ```npm run md2html```コマンドで```md2html.js```を実行します
1. ```site/2023/index.html```が生成されます
