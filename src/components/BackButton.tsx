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
  
  // entranceページ（ルートパス）および決済完了ページでは表示しない
  if (pathname === '/' || pathname === '/success') return null;
  
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
    fontSize: isMobile ? '28px' : '36px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  return (
    <button onClick={() => router.back()} style={backButtonStyle} aria-label="戻る">
      <span style={arrowStyle} role="img" aria-label="戻る">
        ⬅️
      </span>
    </button>
  );
} 