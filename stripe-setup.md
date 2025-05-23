# 🔑 Stripe APIキー設定手順

## 1. .env.localファイルの作成

プロジェクトのルートディレクトリ（package.jsonと同じ場所）に `.env.local` ファイルを作成してください。

## 2. 以下の内容をコピーして貼り付け

```
# Stripe環境変数設定
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_ここにあなたの公開キーを貼り付け
STRIPE_SECRET_KEY=sk_test_ここにあなたのシークレットキーを貼り付け
NEXT_PUBLIC_STRIPE_SUCCESS_URL=http://localhost:3000/success
NEXT_PUBLIC_STRIPE_CANCEL_URL=http://localhost:3000/cancel
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 3. APIキーの取得方法

### Stripeダッシュボードでの設定：

1. **Stripeダッシュボードにログイン**
   - https://dashboard.stripe.com/

2. **開発者セクションに移動**
   - 左サイドバーから「開発者」→「APIキー」をクリック

3. **テストキーをコピー**
   - **公開可能キー**（pk_test_で始まる）をコピー
   - **シークレットキー**（sk_test_で始まる）をコピー

4. **`.env.local`ファイルに貼り付け**
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123... ← ここに公開キー
   STRIPE_SECRET_KEY=sk_test_51DEF456... ← ここにシークレットキー
   ```

## 4. 設定完了後

環境変数を設定したら、開発サーバーを再起動してください：

```bash
# サーバーを停止（Ctrl+C）してから再起動
npm run dev
```

## 5. 動作確認

- http://localhost:3000/shop にアクセス
- Stripeに登録した商品が表示されることを確認

## ⚠️ 注意事項

- `.env.local`ファイルはGitにコミットしないでください
- テストキー（test_）のみを使用してください
- 本番環境では本番キー（live_）を使用します 