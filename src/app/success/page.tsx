'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useShoppingCart } from 'use-shopping-cart';

export default function SuccessPage() {
  const { clearCart } = useShoppingCart();
  
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-green-600 mb-4">ご注文ありがとうございました！</h1>
        <p className="text-gray-600 mb-6">
          決済が完了しました。ご注文の詳細はメールでお送りします。
        </p>
        
        <div className="mt-8">
          <Link href="/shop" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
            ショッピングを続ける
          </Link>
        </div>
      </div>
    </div>
  );
} 