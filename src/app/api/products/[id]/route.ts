import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/libs/stripe';
import { Product } from '@/types/product';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ['default_price'],
    });

    if (!product) {
      return NextResponse.json(
        { error: '商品が見つかりません' },
        { status: 404 }
      );
    }

    const price = product.default_price as any;
    const productData: Product = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: price?.unit_amount / 100,
      currency: price?.currency,
      image: product.images[0],
      images: product.images,
      metadata: product.metadata,
    };

    return NextResponse.json(productData);
  } catch (error) {
    console.error('商品取得エラー:', error);
    return NextResponse.json(
      { error: '商品データを取得できませんでした' },
      { status: 500 }
    );
  }
} 