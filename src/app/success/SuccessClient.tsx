"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useShoppingCart } from 'use-shopping-cart';
import Link from 'next/link';

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(true);

  // clearCart はコンテキストの関数でレンダーごとに参照が変わる可能性があり、
  // 依存配列に含めると無限ループの原因になるため外す。
  useEffect(() => {
    if (sessionId) {
      // 決済が成功したらカートをクリア（1 回だけ実行）
      clearCart();
      setIsLoading(false);
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">処理中...</h1>
          <p>決済結果を確認しています。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-green-500 text-[2rem] leading-none mb-4">☑️</div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">決済完了！</h1>
        <p className="text-gray-600 mb-6">
          ご注文ありがとうございます。<br />
          決済が正常に完了しました。
        </p>
        {/* セッションIDはユーザーには不要なため非表示 */}

        {/* ショップのトップページへ戻るボタン */}
        <Link
          href="/shop"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          とじる
        </Link>
      </div>
    </div>
  );
} 