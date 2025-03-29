"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function LivingRoom() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // 初期値を1200に設定（デスクトップサイズをデフォルトとする）
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // 画面サイズ変更を検知
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      // 初期値を正確に設定
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

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // ランダムな角度を生成する関数（-30度から30度の範囲）
  const getRandomRotation = () => {
    return `${Math.floor(Math.random() * 61) - 30}deg`;
  };

  // 画面サイズに基づく表示調整
  const isWideScreen = windowWidth > 600;
  const isTablet = windowWidth <= 1024 && windowWidth > 600;
  const isIpad = windowWidth >= 768 && windowWidth <= 1024;

  // タブレットサイズでの左右絵文字の位置調整
  const getEmojiPosition = (position: string) => {
    if (position === 'tektek') {
      if (!isWideScreen) return { top: '46%', left: '8%' }; // スマホ
      if (isIpad) return { top: '50%', left: '6%' }; // iPad特化
      if (isTablet) return { top: '50%', left: '8%' }; // タブレット一般
      return { top: '50%', left: '18%' }; // PC
    } else if (position === 'parapara') {
      if (!isWideScreen) return { top: '54%', right: '1%' }; // スマホ
      if (isIpad) return { top: '50%', right: '2%' }; // iPad特化
      if (isTablet) return { top: '50%', right: '8%' }; // タブレット一般
      return { top: '50%', right: '15%' }; // PC
    }
    return {};
  };

  const tektekPosition = getEmojiPosition('tektek');
  const paraparaPosition = getEmojiPosition('parapara');

  return (
    <div className={styles.wrapper}>
      <div className={styles.glow}></div>

      <div className={styles.buttonContainer}>
        {/* mogmog */}
        <div 
          className={`${styles.emoji} ${activeMenu === 'mogmog' ? styles.active : ''}`}
          style={{ 
            top: isWideScreen ? '15%' : '23%', 
            left: '50%', 
            cursor: 'pointer' 
          }}
          onClick={() => toggleMenu('mogmog')}
        >😋</div>
        <div
          className={`${styles.mainButton} ${styles.top}`}
          onClick={() => toggleMenu('mogmog')}
        >
          <div>mogmog</div>
          <div className={`${styles.subButtons} ${activeMenu === 'mogmog' ? styles.show : ''}`}>
            <Link href="/mogmog/home" className={styles.subStar} style={{ '--x': '-100px', '--y': '10px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>at My Home</div>
                <div className={styles.subKana}>おうちで作ったごはんとおやつ</div>
              </div>
            </Link>
            <Link href="/mogmog/away" className={styles.subStar} style={{ '--x': '100px', '--y': '10px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Away</div>
                <div className={styles.subKana}>お外で食べたおいしいもの</div>
              </div>
            </Link>
          </div>
        </div>

        {/* tektek */}
        <div 
          className={`${styles.emoji} ${activeMenu === 'tektek' ? styles.active : ''}`}
          style={{ 
            top: tektekPosition.top, 
            left: tektekPosition.left, 
            cursor: 'pointer' 
          }}
          onClick={() => toggleMenu('tektek')}
        >🚶‍♂️</div>
        <div
          className={`${styles.mainButton} ${styles.left}`}
          onClick={() => toggleMenu('tektek')}
        >
          <div>tektek</div>
          <div className={`${styles.subButtons} ${activeMenu === 'tektek' ? styles.show : ''}`}>
            <Link href="/tektek/journeys" className={styles.subStar} style={{ '--x': '40px', '--y': '-120px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Journeys</div>
                <div className={styles.subKana}>旅</div>
              </div>
            </Link>
            <Link href="/tektek/strolls" className={styles.subStar} style={{ '--x': '120px', '--y': '-40px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Strolls</div>
                <div className={styles.subKana}>おさんぽ</div>
              </div>
            </Link>
            <Link href="/tektek/citynotes" className={styles.subStar} style={{ '--x': '40px', '--y': '40px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>City Notes</div>
                <div className={styles.subKana}>街歩き</div>
              </div>
            </Link>
          </div>
        </div>

        {/* parapara */}
        <div 
          className={`${styles.emoji} ${activeMenu === 'parapara' ? styles.active : ''}`}
          style={{ 
            top: paraparaPosition.top, 
            right: paraparaPosition.right, 
            cursor: 'pointer' 
          }}
          onClick={() => toggleMenu('parapara')}
        >📚</div>
        <div
          className={`${styles.mainButton} ${styles.right}`}
          onClick={() => toggleMenu('parapara')}
        >
          <div>parapara</div>
          <div className={`${styles.subButtons} ${activeMenu === 'parapara' ? styles.show : ''}`}>
            <Link href="/parapara/readings" className={styles.subStar} style={{ '--x': '-120px', '--y': '-60px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Readings</div>
                <div className={styles.subKana}>読んだ本とか</div>
              </div>
            </Link>
            <Link href="/parapara/zine" className={styles.subStar} style={{ '--x': '-80px', '--y': '60px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Zine</div>
                <div className={styles.subKana}>自作～～</div>
              </div>
            </Link>
          </div>
        </div>

        {/* jiiii */}
        <div 
          className={`${styles.emoji} ${activeMenu === 'jiiii' ? styles.active : ''}`}
          style={{ 
            bottom: isWideScreen ? '10%' : '18%', 
            left: '50%', 
            cursor: 'pointer' 
          }}
          onClick={() => toggleMenu('jiiii')}
        >👀</div>
        <div
          className={`${styles.mainButton} ${styles.bottom}`}
          onClick={() => toggleMenu('jiiii')}
        >
          <div>jiiii</div>
          <div className={`${styles.subButtons} ${activeMenu === 'jiiii' ? styles.show : ''}`}>
            <Link href="/jiiii/exhibits" className={styles.subStar} style={{ '--x': '-100px', '--y': '-80px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Exhibits</div>
                <div className={styles.subKana}>展示</div>
              </div>
            </Link>
            <Link href="/jiiii/music" className={styles.subStar} style={{ '--x': '0px', '--y': '-120px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Music</div>
                <div className={styles.subKana}>ライブとか</div>
              </div>
            </Link>
            <Link href="/jiiii/films" className={styles.subStar} style={{ '--x': '100px', '--y': '-80px' } as React.CSSProperties}>
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Films</div>
                <div className={styles.subKana}>映画</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}