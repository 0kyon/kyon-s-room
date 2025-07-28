import { ReactNode } from 'react';

export const metadata = {
  title: 'EC Shop | MyBlog',
  description: 'Our online shop with curated products',
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">{children}</main>
    </div>
  );
} 