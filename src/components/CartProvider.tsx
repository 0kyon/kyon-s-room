'use client';

import { CartProvider as ShoppingCartProvider } from 'use-shopping-cart';
import { ReactNode } from 'react';

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <ShoppingCartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      successUrl={process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL as string}
      cancelUrl={process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL as string}
      checkoutSessionUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/checkout`}
      currency="JPY"
      shouldPersist={true}
    >
      {children}
    </ShoppingCartProvider>
  );
} 