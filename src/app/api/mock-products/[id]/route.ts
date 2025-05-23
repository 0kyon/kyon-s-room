import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types/product';

// モック商品データ（同じデータを再利用）
const mockProducts: Product[] = [
  {
    id: 'mock-1',
    name: 'プレミアムTシャツ',
    description: '高品質なコットン100%のTシャツです。快適な着心地で日常使いに最適です。',
    price: 2980,
    currency: 'jpy',
    image: 'https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=T-shirt',
    images: ['https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=T-shirt'],
    metadata: {
      category: 'clothing',
      size: 'M'
    }
  },
  {
    id: 'mock-2',
    name: 'エコバッグ',
    description: '環境に優しい再生素材を使用したエコバッグ。折りたたみ可能で持ち運びに便利です。',
    price: 1580,
    currency: 'jpy',
    image: 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=Eco+Bag',
    images: ['https://via.placeholder.com/300x300/10B981/FFFFFF?text=Eco+Bag'],
    metadata: {
      category: 'accessories',
      material: 'recycled'
    }
  },
  {
    id: 'mock-3',
    name: 'コーヒーマグ',
    description: 'おしゃれなセラミック製のコーヒーマグ。朝のコーヒータイムを特別なものにします。',
    price: 1280,
    currency: 'jpy',
    image: 'https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=Mug',
    images: ['https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=Mug'],
    metadata: {
      category: 'kitchen',
      material: 'ceramic'
    }
  },
  {
    id: 'mock-4',
    name: 'ワイヤレスイヤホン',
    description: '高音質Bluetooth対応ワイヤレスイヤホン。ノイズキャンセリング機能付き。',
    price: 8980,
    currency: 'jpy',
    image: 'https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Earphones',
    images: ['https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Earphones'],
    metadata: {
      category: 'electronics',
      bluetooth: 'true'
    }
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = mockProducts.find(p => p.id === params.id);
  
  if (!product) {
    return NextResponse.json(
      { error: '商品が見つかりません' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(product);
} 