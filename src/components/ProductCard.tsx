import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
  isEven?: boolean; // 偶数番目の商品かどうか（左右交互レイアウト用）
};

export default function ProductCard({ product, isEven = false }: ProductCardProps) {
  return (
    <div 
      className="product-card-item"
      style={{
        maxWidth: '45%',
        width: '45%',
        boxSizing: 'border-box',
        margin: isEven ? '20em 0 5em 0' : '0.5em 0 1em 0',
        float: isEven ? 'right' : 'left',
        clear: isEven ? 'right' : 'left',
        marginRight: isEven ? '0' : '2em',
        marginLeft: isEven ? '2em' : '0'
      }}
    >
      <Link
        href={`/products/${product.id}`}
        className="product-card-link group block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 hover:text-gray-900 visited:text-gray-900 focus:text-gray-900 no-underline hover:no-underline visited:no-underline focus:no-underline"
        style={{ display: 'block', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
      >
        {/* 画像エリア */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
              style={{ maxWidth: '100%', height: 'auto', margin: '0', display: 'block' }}
            />
          ) : (
            <div className="bg-gray-200 h-full w-full flex items-center justify-center">
              <span className="text-gray-500">画像なし</span>
            </div>
          )}
        </div>

        {/* テキストエリア */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-gray-900">
            ¥{product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
} 