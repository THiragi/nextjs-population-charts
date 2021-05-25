

# 都道府県別総人口推移グラフ

[RESAS API](https://opendata.resas-portal.go.jp/)から取得した都道府県別の総人口推移をグラフで表示するアプリです。

（とある企業の選考課題として作成しました）

こちらで実際に動くアプリを操作できます。→　https://nextjs-population-charts.vercel.app/

## ローカル環境で動かす場合

### development環境
```sh
npm run dev
```
### production環境
```sh
npm run build

npm run start
```
### テストコードの実行
```sh
npm run test
```

### 注意

ローカル環境で動かす場合は以下の環境変数を設定してください。

`RESAS_API_ENDPOINT`: RESAS APIのエンドポイント(https://opendata.resas-portal.go.jp/api/);

`RESAS_API_KEY`: RESAS APIのAPIキー(独自に登録して取得したものを使用してください)


# 使用した技術

個人的に使い慣れているものを採用しました。

- Next.js: 一番使い慣れているので採用しました。SSGとSSRをページによって使い分けれるのが便利だと思います。
- Vercel: こちらも使い慣れていて、Next.jsとの相性も良いので採用しました。
- Aspida: REST APIに型を付与できるとても優れたライブラリです。

ボイラープレートとして[THiragi/next-ts](https://github.com/THiragi/next-ts)を使用しました。

