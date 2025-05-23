'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-orange-500 text-6xl mb-4">⚠</div>
        <h1 className="text-2xl font-bold text-orange-600 mb-4">決済がキャンセルされました</h1>
        <p className="text-gray-600 mb-6">
          決済処理がキャンセルされました。<br />
          カートの商品はそのまま残っています。
        </p>
        <div className="space-y-4">
          <Link 
            href="/cart" 
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            カートに戻る
          </Link>
          <Link 
            href="/shop" 
            className="block text-blue-600 hover:underline"
          >
            お買い物を続ける
          </Link>
        </div>
      </div>
    </div>
  );
} 