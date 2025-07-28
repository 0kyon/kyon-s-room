import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/libs/stripe';

export async function POST(request: NextRequest) {
  try {
    // 環境変数チェック
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey === 'sk_test_ここにあなたのシークレットキーを貼り付け') {
      console.error('Stripe secret key is not configured');
      return NextResponse.json(
        { error: 'Stripe設定が正しくありません。STRIPE_SECRET_KEYを確認してください。' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { cartDetails } = body;

    console.log('Received checkout request:', { cartDetails });

    if (!cartDetails || Object.keys(cartDetails).length === 0) {
      console.log('Empty cart detected');
      return NextResponse.json(
        { error: 'カートが空です' },
        { status: 400 }
      );
    }

    // カート商品をStripe line_itemsに変換
    const lineItems = Object.values(cartDetails).map((item: any) => {
      if (item.priceId) {
        // priceIdがあればprice指定
        return {
          price: item.priceId,
          quantity: item.quantity || 1,
        };
      } else {
        // 互換: priceIdがない場合は従来通り
        return {
          price_data: {
            currency: item.currency || 'jpy',
            product_data: {
              name: item.name,
              description: item.description || '',
              images: item.image ? [item.image] : [],
            },
            unit_amount: item.price,
          },
          quantity: item.quantity || 1,
        };
      }
    });

    console.log('Generated line items:', lineItems);

    // Checkout Sessionを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/cancel`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      locale: 'ja',
    });

    console.log('Checkout session created successfully:', session.id);

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error: any) {
    console.error('Checkout session creation error:', error);
    
    // Stripeエラーの詳細分類
    let errorMessage = 'チェックアウトセッションの作成に失敗しました';
    let statusCode = 500;
    
    if (error.type === 'StripeCardError') {
      errorMessage = 'カード情報に問題があります';
      statusCode = 400;
    } else if (error.type === 'StripeRateLimitError') {
      errorMessage = 'リクエストが制限されています。しばらく待ってから再試行してください';
      statusCode = 429;
    } else if (error.type === 'StripeInvalidRequestError') {
      errorMessage = `リクエストが無効です: ${error.message}`;
      statusCode = 400;
    } else if (error.type === 'StripeAPIError') {
      errorMessage = 'Stripe APIでエラーが発生しました';
      statusCode = 500;
    } else if (error.type === 'StripeConnectionError') {
      errorMessage = 'Stripeへの接続でエラーが発生しました';
      statusCode = 500;
    } else if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Stripe認証エラー。APIキーを確認してください';
      statusCode = 401;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message,
        type: error.type || 'UnknownError'
      },
      { status: statusCode }
    );
  }
} 