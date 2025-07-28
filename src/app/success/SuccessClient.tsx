"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useShoppingCart } from 'use-shopping-cart';

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // 決済が成功したらカートをクリア
      clearCart();
      setIsLoading(false);
    }
  }, [sessionId, clearCart]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">処理中...</h1>
          <p>決済結果を確認しています。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">決済完了！</h1>
        <p className="text-gray-600 mb-6">
          ご注文ありがとうございます。<br />
          決済が正常に完了しました。
        </p>
        {/* セッションIDはユーザーには不要なため非表示 */}
        <div className="space-y-4">
          <Link 
            href="/shop" 
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            お買い物を続ける
          </Link>
          <Link 
            href="/" 
            className="block text-blue-600 hover:underline"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
} 