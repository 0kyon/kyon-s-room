"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1200);

  // クライアントサイドへのマウント検知
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 画面サイズ変更を検知
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const isTablet = windowWidth <= 1024 && windowWidth > 600;
  const isMobile = windowWidth <= 480;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
      <div className="container">
        <Link href="/myroom" className="door-button">
          <div className="label">My Room</div>
          <div className="emoji">🤐</div>
        </Link>

        <Link href="/livingroom" className="door-button center">
          <div className="label">Living Room</div>
          <div className="emoji">🗣️</div>
        </Link>

        <Link href="/kitchen" className="door-button">
          <div className="label">Kitchen</div>
          <div className="emoji">🍲</div>
        </Link>
      </div>
      <div className="welcome">Welcome!</div>
    </div>
  );
}
