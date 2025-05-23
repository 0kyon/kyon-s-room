'use client';

import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartDetails, removeItem, setItemQuantity, redirectToCheckout, cartCount, formattedTotalPrice } = useShoppingCart();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.error('Checkout error:', result.error);
        setIsCheckoutLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
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
                      {new Intl.NumberFormat('ja-JP', {
                        style: 'currency',
                        currency: item.currency,
                      }).format((item.price * (item.quantity || 1)) / 100)}
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
          
          <button
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
          >
            {isCheckoutLoading ? '処理中...' : '購入手続きへ'}
          </button>
        </div>
      </div>
    </div>
  );
} 