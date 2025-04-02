"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function MyRoom() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const [windowHeight, setWindowHeight] = useState<number>(800);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const getRandomRotation = () => {
    return `0deg`;
  };

  const isWideScreen = windowWidth > 600;
  const isTablet = windowWidth <= 1024 && windowWidth > 600;
  const isMobile = windowWidth <= 480;

  const getEmojiPosition = (position: string) => {
    if (position === 'diary') {
      if (!isWideScreen) return { top: '46%', left: '8%' };
      if (isTablet) return { top: '50%', left: '8%' };
      return { top: '50%', left: '18%' };
    } else if (position === 'murmur') {
      if (!isWideScreen) return { top: '54%', right: '1%' };
      if (isTablet) return { top: '50%', right: '8%' };
      return { top: '50%', right: '15%' };
    }
    return {};
  };

  const diaryPosition = getEmojiPosition('diary');
  const murmurPosition = getEmojiPosition('murmur');

  return (
    <div className={styles.wrapper}>
      <div className={styles.glow}></div>
      <div className={styles.buttonContainer}>
        {/* Diary */}
        <div 
          className={`${styles.emoji} ${activeMenu === 'diary' ? styles.active : ''}`}
          style={{ 
            top: isWideScreen ? '15%' : '30%',
            left: isWideScreen ? '50%' : '15%',
            cursor: 'pointer' 
          }}
          onClick={() => toggleMenu('diary')}
        >📓</div>
        <div
          className={`${styles.mainButton} ${styles.top}`}
          onClick={() => toggleMenu('diary')}
        >
          <div>diary</div>
        </div>

        {/* murmur */}
        <div 
          className={`${styles.emoji} ${activeMenu === 'murmur' ? styles.active : ''}`}
          style={{ 
            top: isWideScreen ? null : '70%',
            bottom: isWideScreen ? '10%' : null,
            right: isWideScreen ? null : '15%',
            left: isWideScreen ? '50%' : null,
            cursor: 'pointer' 
          }}
          onClick={() => toggleMenu('murmur')}
        >💭</div>
        <div
          className={`${styles.mainButton} ${styles.bottom}`}
          onClick={() => toggleMenu('murmur')}
        >
          <div>murmur</div>
        </div>
      </div>
    </div>
  );
}