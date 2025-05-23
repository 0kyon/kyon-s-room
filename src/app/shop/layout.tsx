import ShopNavbar from '@/components/ShopNavbar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'EC Shop | MyBlog',
  description: 'Our online shop with curated products',
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopNavbar />
      <main>{children}</main>
    </div>
  );
} 