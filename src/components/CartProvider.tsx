'use client';

import { CartProvider as ShoppingCartProvider } from 'use-shopping-cart';
import { ReactNode } from 'react';

export default function CartProvider({ children }: { children: ReactNode }) {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
  return (
    <ShoppingCartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL as string}
      cancelUrl={process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL as string}
      currency="JPY"
      shouldPersist={true}
    >
      {children}
    </ShoppingCartProvider>
  );
} 