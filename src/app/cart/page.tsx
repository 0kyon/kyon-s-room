'use client';

import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartDetails, removeItem, setItemQuantity, cartCount, formattedTotalPrice } = useShoppingCart();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    setCheckoutError(null);
    
    // 環境変数チェック
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const checkoutUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    if (!publishableKey || publishableKey === 'pk_test_ここにあなたの公開キーを貼り付け') {
      setCheckoutError('Stripe APIキーが設定されていません。.env.localファイルを確認してください。');
      setIsCheckoutLoading(false);
      return;
    }
    
    // カート内容チェック
    if (!cartDetails || Object.keys(cartDetails).length === 0) {
      setCheckoutError('カートが空です。商品を追加してから再度お試しください。');
      setIsCheckoutLoading(false);
      return;
    }
    
    try {
      console.log('Starting checkout process...');
      console.log('Cart details:', cartDetails);

      // サーバーにCheckout Session作成を依頼
      const response = await fetch(`${checkoutUrl}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartDetails }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'セッション生成に失敗しました');
      }

      const data = await response.json();
      if (data.url) {
        // Stripe決済ページへリダイレクト
        window.location.href = data.url;
        return;
      } else {
        throw new Error('Stripe決済URLが取得できませんでした');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      
      // エラーの種類に応じた詳細メッセージ
      if (error.message?.includes('fetch')) {
        setCheckoutError('APIサーバーへの接続に失敗しました。開発サーバーが起動しているか確認してください。');
      } else if (error.message?.includes('CORS')) {
        setCheckoutError('CORS エラーが発生しました。サーバー設定を確認してください。');
      } else if (error.name === 'TypeError') {
        setCheckoutError('設定エラーが発生しました。環境変数とAPIキーの設定を確認してください。');
      } else {
        setCheckoutError(`決済処理でエラーが発生しました: ${error.message || '詳細不明'}`);
      }
      setIsCheckoutLoading(false);
    }
  };

  if (!cartCount) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">カート</h1>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">カートに商品がありません</p>
          <Link href="/shop" className="text-blue-600 hover:underline">
            商品一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">カート</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {Object.entries(cartDetails ?? {}).map(([id, item]) => (
            <div key={id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col sm:flex-row">
              {item.image && (
                <div className="w-full sm:w-24 h-24 relative mb-4 sm:mb-0 sm:mr-4">
                  <Image 
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
              
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <button 
                      onClick={() => setItemQuantity(id, Math.max(1, (item.quantity || 1) - 1))}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                      onClick={() => setItemQuantity(id, (item.quantity || 1) + 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  
                  <div>
                    <span className="font-semibold">
                      {item.formattedValue}
                    </span>
                    
                    <button 
                      onClick={() => removeItem(id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4">注文サマリー</h2>
          
          <div className="mb-4 pb-4 border-b">
            <div className="flex justify-between mb-2">
              <span>小計</span>
              <span>{formattedTotalPrice}</span>
            </div>
          </div>
          
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>合計</span>
            <span>{formattedTotalPrice}</span>
          </div>
          
          {checkoutError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold mb-2">エラー詳細:</p>
              <p className="text-sm">{checkoutError}</p>
              
              {checkoutError.includes('APIキーが設定されていません') && (
                <div className="mt-3 text-sm">
                  <p className="font-semibold">解決方法:</p>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>プロジェクトルートに <code className="bg-gray-200 px-1 rounded">.env.local</code> ファイルを作成</li>
                    <li>以下の内容をコピーして貼り付け:</li>
                  </ol>
                  <pre className="mt-2 p-2 bg-gray-100 text-xs rounded overflow-x-auto">
{`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_あなたの公開キー
STRIPE_SECRET_KEY=sk_test_あなたのシークレットキー
NEXT_PUBLIC_STRIPE_SUCCESS_URL=http://localhost:3000/success
NEXT_PUBLIC_STRIPE_CANCEL_URL=http://localhost:3000/cancel
NEXT_PUBLIC_API_URL=http://localhost:3000`}
                  </pre>
                  <p className="mt-2">
                    詳細は <a href="/docs/stripe-setup.md" className="text-blue-600 underline">stripe-setup.md</a> を参照してください。
                  </p>
                </div>
              )}
            </div>
          )}
          
          <button
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
          >
            {isCheckoutLoading ? '決済ページに移動中...' : '購入手続きへ'}
          </button>
        </div>
      </div>
    </div>
  );
} 