'use client';

import CartIcon from './CartIcon';

export default function ShopNavbar() {
  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-end items-center">
        <CartIcon />
      </div>
    </nav>
  );
} 