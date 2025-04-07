"use client";

import { useRouter, usePathname } from 'next/navigation';
import { CSSProperties, useEffect, useState } from 'react';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // 初期チェック
    checkIfMobile();
    
    // リサイズイベントに対応
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // entranceページ（ルートパス）には表示しない
  if (pathname === '/') return null;
  
  const backButtonStyle: CSSProperties = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 100,
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    padding: 0,
    width: isMobile ? '28px' : '36px',
    height: isMobile ? '28px' : '36px',
  };
  
  const arrowStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    color: '#000',
  };
  
  return (
    <button onClick={() => router.back()} style={backButtonStyle} aria-label="戻る">
      <svg 
        style={arrowStyle}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M22 12H5M5 12L12 5M5 12L12 19" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
      </svg>
    </button>
  );
} 