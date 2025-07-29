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
      <span 
        className="text-gray-700 text-3xl"
        style={{ 
          fontSize: '32px', 
          lineHeight: '32px',
          display: 'inline-block',
          width: '32px',
          height: '32px',
          textAlign: 'center'
        }}
        role="img"
        aria-label="カート"
      >
        🛒
      </span>
      
      {cartCount && cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-bold">
          {cartCount}
        </span>
      )}
    </Link>
  );
} 