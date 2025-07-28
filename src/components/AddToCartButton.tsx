'use client';

import { useShoppingCart } from 'use-shopping-cart';
import { Product } from '@/types/product';
import { useState } from 'react';

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useShoppingCart();
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    // Stripeから取得した価格をそのまま使用（余計な変換はしない）
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      currency: product.currency,
      image: product.image,
      priceId: product.priceId,
    });

    // フィードバック表示
    setShowAdded(true);
    // 1.5 秒後に自動で非表示に
    setTimeout(() => {
      setShowAdded(false);
    }, 1500);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        カートに追加
      </button>
      {showAdded && (
        <div className="mt-2 text-center text-sm text-green-600">
          商品をカートに追加しました
        </div>
      )}
    </div>
  );
} 