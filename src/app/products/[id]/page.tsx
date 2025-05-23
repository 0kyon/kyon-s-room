import Image from 'next/image';
import { Product } from '@/types/product';
import AddToCartButton from '@/components/AddToCartButton';

async function getProduct(id: string): Promise<Product> {
  try {
    // まずStripe商品から取得を試す
    const stripeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${id}`,
      { cache: 'no-store' }
    );
    
    if (stripeResponse.ok) {
      return stripeResponse.json();
    }
    
    // Stripe商品で見つからない場合、モックデータから取得を試す
    const mockResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/mock-products/${id}`,
      { cache: 'no-store' }
    );
    
    if (mockResponse.ok) {
      return mockResponse.json();
    }
    
    throw new Error('商品データの取得に失敗しました');
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
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
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
        <p className="text-red-500">商品データの読み込みに失敗しました。</p>
        <p className="text-sm text-gray-600 mt-2">商品が存在しないか、サーバーエラーが発生しました。</p>
      </div>
    );
  }
} 