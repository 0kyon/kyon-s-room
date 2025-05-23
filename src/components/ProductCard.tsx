import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-60 w-full">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <span className="text-gray-500">画像なし</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        )}
        <p className="text-xl font-bold text-blue-600 mb-4">
          ¥{product.price.toLocaleString()}
        </p>
        
        <Link 
          href={`/products/${product.id}`} 
          className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
} 