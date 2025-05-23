'use client';

import Link from 'next/link';
import CartIcon from './CartIcon';

export default function ShopNavbar() {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MyECサイト
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/shop" className="text-gray-700 hover:text-blue-600">
            商品一覧
          </Link>
          <CartIcon />
        </div>
      </div>
    </nav>
  );
} 