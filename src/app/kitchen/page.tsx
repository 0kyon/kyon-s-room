"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function Kitchen() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // クライアントサイドでレンダリングされているかを確認するフラグ
  const [isMounted, setIsMounted] = useState(false);
  // 初期値を1200に設定（デスクトップサイズをデフォルトとする）
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  // クライアントサイドで使用する画面の高さ
  const [windowHeight, setWindowHeight] = useState<number>(800);

  // クライアントサイドへのマウント検知
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 画面サイズ変更を検知
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 初期値を正確に設定
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // トグルメニュー関数
  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // 画面サイズに基づく表示調整
  const isTablet = windowWidth <= 1024 && windowWidth > 600;
  const isMobile = windowWidth <= 600;

  return (
    <div className={`${styles.wrapper} ${styles.bodyStyles}`}>
      <div className={styles.glow}></div>

      <div className={styles.buttonContainer}>
        {/* Cupboard */}
        <div 
          className={`${styles.emojiContainer} ${activeMenu === 'cupboard' ? styles.active : ''}`}
          style={{ 
            top: isMobile || isTablet ? '12%' : '10%',
            left: isMobile || isTablet ? '50%' : '30%',
            transform: isMobile || isTablet ? 'translateX(-50%)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: isMobile || isTablet ? '5px' : '15px'
          }}
          onClick={() => toggleMenu('cupboard')}
        >
          <div className={`${styles.emoji}`}>🍽️</div>
          <div className={`${styles.emoji}`} style={{ 
            marginLeft: isMobile || isTablet ? '1em' : '2em',
            marginTop: isMobile || isTablet ? '0' : '0'
          }}>🍨</div>
          <div className={`${styles.emoji}`} style={{ 
            marginLeft: isMobile || isTablet ? '2em' : '4em',
            marginTop: isMobile || isTablet ? '0' : '0'
          }}>🍸️</div>
        </div>

        <Link 
          href="/tags/cupboard" 
          className={styles.mainButton} 
          style={{ 
            top: isMobile || isTablet ? '25%' : '22%', 
            left: '50%', 
            transform: 'translateX(-50%)' 
          }}
          onClick={() => toggleMenu('cupboard')}
        >
          <div>Cupboard</div>
        </Link>
        
        {/* Recipe Box */}
        <Link 
          href="/tags/recipe-box" 
          className={styles.mainButton} 
          style={{ 
            bottom: '22%', 
            left: '50%', 
            transform: 'translateX(-50%)',
            width: '120px'
          }}
          onClick={() => toggleMenu('recipe-box')}
        >
          <div>Recipe Box</div>
        </Link>
        
        <Link 
          href="/tags/recipe-box"
          onClick={() => toggleMenu('recipe-box')}
        >
          <div 
            className={`${styles.emoji} ${activeMenu === 'recipe-box' ? styles.active : ''}`}
            style={{ 
              position: 'absolute',
              bottom: '15%', 
              left: '50%', 
              fontSize: '2rem',
              cursor: 'pointer'
            }}
          >
            🗃️
          </div>
        </Link>
      </div>
    </div>
  );
}