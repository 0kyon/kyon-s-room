import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  try {
    // まずStripe商品を試す
    const stripeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store',
    });
    
    if (stripeResponse.ok) {
      const stripeProducts = await stripeResponse.json();
      if (stripeProducts.length > 0) {
        return stripeProducts;
      }
    }
    
    // Stripe商品がない場合、モックデータを表示
    const mockResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/mock-products`, {
      cache: 'no-store',
    });
    
    if (mockResponse.ok) {
      return mockResponse.json();
    }
    
    throw new Error('商品データの取得に失敗しました');
  } catch (error) {
    console.error('Products fetch error:', error);
    throw error;
  }
}

async function ProductList() {
  try {
    const products = await getProducts();
    
    if (products.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-600">商品がありません</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">商品データの読み込みに失敗しました。</p>
        <p className="text-sm text-gray-600 mt-2">
          Stripeの設定を確認するか、モックデータをご利用ください。
        </p>
      </div>
    );
  }
}

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">商品一覧</h1>
      
      <Suspense fallback={<div className="text-center py-10">読み込み中...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
} 