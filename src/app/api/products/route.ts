import { NextResponse } from 'next/server';
import { stripe } from '@/libs/stripe';
import { Product } from '@/types/product';

export async function GET() {
  try {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
    });

    const productsWithPrices = products.data.map((product) => {
      const price = product.default_price as any;
      
      // Stripeから取得される生データを確認
      console.log('Stripe raw data:', {
        unit_amount: price?.unit_amount,
        currency: price?.currency
      });
      
      // Stripeの設定をそのまま使用（余計な変換はしない）
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price?.unit_amount,
        currency: price?.currency,
        image: product.images[0],
        images: product.images,
        metadata: product.metadata,
        priceId: price?.id,
      } as Product;
    });

    return NextResponse.json(productsWithPrices);
  } catch (error) {
    console.error('商品取得エラー:', error);
    return NextResponse.json(
      { error: '商品データを取得できませんでした' },
      { status: 500 }
    );
  }
} 