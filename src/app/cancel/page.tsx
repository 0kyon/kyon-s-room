'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-red-600 mb-4">決済がキャンセルされました</h1>
        <p className="text-gray-600 mb-6">
          決済処理が完了しませんでした。カートの内容は保存されていますので、再度お試しください。
        </p>
        
        <div className="mt-8 space-y-4">
          <Link href="/cart" className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
            カートに戻る
          </Link>
          <Link href="/shop" className="block text-blue-600 hover:underline">
            ショッピングを続ける
          </Link>
        </div>
      </div>
    </div>
  );
} 