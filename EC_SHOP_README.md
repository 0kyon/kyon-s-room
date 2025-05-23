# ECサイト機能 - 実装ガイド

このプロジェクトに統合されたECサイト機能の設定と使用方法について説明します。

## 📦 実装済み機能

### ✅ 完了済み
- 商品一覧表示
- 商品詳細ページ
- カート機能（追加・削除・数量変更）
- Stripe決済連携
- レスポンシブデザイン
- モックデータでのテスト環境

### 🔧 設定が必要
- Stripe APIキーの設定
- Stripe商品データの登録
- Webhook設定（注文完了処理）

## 🚀 セットアップ

### 1. 環境変数設定
プロジェクトルートに `.env.local` ファイルを作成：

```
# Stripe環境変数
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_あなたの公開キー
STRIPE_SECRET_KEY=sk_test_あなたのシークレットキー
NEXT_PUBLIC_STRIPE_SUCCESS_URL=http://localhost:3001/success
NEXT_PUBLIC_STRIPE_CANCEL_URL=http://localhost:3001/cancel
```

### 2. Stripe商品登録
Stripeダッシュボードで以下を設定：
1. 商品を作成
2. 価格を設定（通貨: JPY）
3. 商品画像をアップロード

## 🛒 利用方法

### モックデータでのテスト
環境変数が未設定でも、以下のURLでモックデータを使用してテストできます：
- 商品一覧: `http://localhost:3001/shop`
- カート: `http://localhost:3001/cart`

### 実際のStripe決済
環境変数を設定後、実際のStripe決済フローをテストできます。

## 📁 ファイル構成

```
src/
├── app/
│   ├── api/
│   │   ├── products/          # Stripe商品取得API
│   │   └── mock-products/     # モックデータAPI
│   ├── shop/                  # ショップページ
│   ├── cart/                  # カートページ
│   ├── products/[id]/         # 商品詳細ページ
│   ├── success/               # 決済成功ページ
│   └── cancel/                # 決済キャンセルページ
├── components/
│   ├── ProductCard.tsx        # 商品カード
│   ├── AddToCartButton.tsx    # カート追加ボタン
│   ├── CartIcon.tsx           # カートアイコン
│   ├── CartProvider.tsx       # カートプロバイダー
│   └── ShopNavbar.tsx         # ショップナビゲーション
├── types/
│   └── product.ts             # 商品型定義
└── libs/
    └── stripe.ts              # Stripe設定
```

## 🔧 追加実装推奨項目

1. **注文履歴機能**
2. **在庫管理**
3. **商品検索・フィルタリング**
4. **ユーザー認証**
5. **Webhook処理の強化**

## 📝 注意事項

- 現在はテスト環境用の設定です
- 本番環境では追加のセキュリティ設定が必要です
- Stripe Webhookの設定が必要な場合があります 