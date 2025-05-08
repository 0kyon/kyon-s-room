'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollControl() {
  const pathname = usePathname();
  
  useEffect(() => {
    // スクロールを無効にするページのパスリスト
    const noScrollPaths = ['/', '/livingroom', '/kitchen', '/myroom'];
    
    // 現在のパスがメインパスまたはその直下かどうかをチェック
    const shouldDisableScroll = noScrollPaths.some(path => {
      return pathname === path || pathname === `${path}/`;
    });
    
    // bodyにクラスを追加または削除
    if (shouldDisableScroll) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll'); // htmlタグにも追加
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
    
    // クリーンアップ関数
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, [pathname]);
  
  // このコンポーネントは何も表示しない
  return null;
} 