'use client';

import Link from 'next/link';
import { useShoppingCart } from 'use-shopping-cart';

export default function CartIcon() {
  const { cartCount } = useShoppingCart();
  
  return (
    <Link 
      href="/cart" 
      className="relative p-3 hover:bg-gray-100 rounded-full transition-colors"
      style={{ display: 'inline-block' }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-8 w-8 text-gray-700" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      
      {cartCount && cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-bold">
          {cartCount}
        </span>
      )}
    </Link>
  );
} 