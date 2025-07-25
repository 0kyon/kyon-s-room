import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  try {
    // Stripe商品を取得
    const stripeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store',
    });
    
    if (stripeResponse.ok) {
      const stripeProducts = await stripeResponse.json();
      return stripeProducts;
    } else {
      // APIエラーの詳細を取得
      const errorData = await stripeResponse.json().catch(() => ({ error: 'レスポンスの解析に失敗しました' }));
      throw new Error(errorData.error || `API エラー: ${stripeResponse.status}`);
    }
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
        <div className="max-w-md mx-auto bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-4">商品データの読み込みに失敗しました</h2>
          <p className="text-sm text-red-700 mb-4">
            {error instanceof Error ? error.message : '不明なエラーが発生しました'}
          </p>
          
          <div className="text-left text-sm text-gray-700 space-y-2">
            <p className="font-semibold">解決方法:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Stripe APIキーが正しく設定されているか確認</li>
              <li>Stripeダッシュボードで商品が登録されているか確認</li>
              <li>開発サーバーを再起動</li>
            </ol>
            
            <div className="mt-4 pt-4 border-t border-red-200">
              <p className="font-semibold mb-2">設定手順:</p>
              <p className="text-xs">
                詳細は <code className="bg-red-100 px-1 rounded">stripe-setup.md</code> ファイルを参照してください。
              </p>
            </div>
          </div>
        </div>
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