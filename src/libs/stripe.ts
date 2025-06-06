import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// 環境変数チェック
const secretKey = process.env.STRIPE_SECRET_KEY;
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// サーバーサイド用のStripeインスタンス
if (!secretKey || secretKey === 'sk_test_ここにあなたのシークレットキーを貼り付け') {
  console.warn('⚠️ Warning: STRIPE_SECRET_KEY is not configured properly');
}

export const stripe = new Stripe(secretKey || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

// クライアントサイド用のStripeインスタンス
let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    if (!publishableKey || publishableKey === 'pk_test_ここにあなたの公開キーを貼り付け') {
      console.warn('⚠️ Warning: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not configured properly');
      stripePromise = Promise.resolve(null);
    } else {
      stripePromise = loadStripe(publishableKey);
    }
  }
  return stripePromise;
}; 