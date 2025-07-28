import Image from 'next/image';
import { Product } from '@/types/product';
import AddToCartButton from '@/components/AddToCartButton';

async function getProduct(id: string): Promise<Product> {
  try {
    // Stripe商品を取得
    const stripeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${id}`,
      { cache: 'no-store' }
    );
    
    if (stripeResponse.ok) {
      return stripeResponse.json();
    } else {
      // APIエラーの詳細を取得
      const errorData = await stripeResponse.json().catch(() => ({ error: 'レスポンスの解析に失敗しました' }));
      throw new Error(errorData.error || `API エラー: ${stripeResponse.status}`);
    }
  } catch (error) {
    console.error('Product fetch error:', error);
    throw error;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96 md:h-full">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500">画像なし</span>
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="text-2xl font-bold mb-6">
              ¥{product.price.toLocaleString()}
            </div>
            
            {product.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">商品説明</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
            
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-600 mb-4">商品が見つかりません</h2>
          <p className="text-sm text-red-700 mb-4">
            {error instanceof Error ? error.message : '不明なエラーが発生しました'}
          </p>
          
          <div className="text-left text-sm text-gray-700 space-y-2">
            <p className="font-semibold">考えられる原因:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>商品IDが存在しない</li>
              <li>Stripe APIキーが設定されていない</li>
              <li>Stripeで商品が削除された</li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-red-200">
              <a href="/shop" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                商品一覧に戻る
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
} 