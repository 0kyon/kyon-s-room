import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/libs/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartDetails } = body;

    if (!cartDetails || Object.keys(cartDetails).length === 0) {
      return NextResponse.json(
        { error: 'カートが空です' },
        { status: 400 }
      );
    }

    // カート商品をStripe line_itemsに変換
    const lineItems = Object.values(cartDetails).map((item: any) => ({
      price_data: {
        currency: item.currency,
        product_data: {
          name: item.name,
          description: item.description,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

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

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Checkout session creation error:', error);
    return NextResponse.json(
      { error: 'チェックアウトセッションの作成に失敗しました' },
      { status: 500 }
    );
  }
} 