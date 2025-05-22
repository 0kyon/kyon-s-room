"use client";

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function LivingRoom() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // クライアントサイドでレンダリングされているかを確認するフラグ
  const [isMounted, setIsMounted] = useState(false);
  // 初期値を1200に設定（デスクトップサイズをデフォルトとする）
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  // クライアントサイドで使用する画面の高さ
  const [windowHeight, setWindowHeight] = useState<number>(800);
  // サブメニューのコンテナへの参照
  const menuContainerRef = useRef<HTMLDivElement>(null);
  // 各メニューへのref
  const mogmogRef = useRef<HTMLDivElement>(null);
  const tektekRef = useRef<HTMLDivElement>(null);
  const paraparaRef = useRef<HTMLDivElement>(null);
  const jiiiRef = useRef<HTMLDivElement>(null);
  // サブメニューへのref
  const mogmogSubRef = useRef<HTMLDivElement>(null);
  const tektekSubRef = useRef<HTMLDivElement>(null);
  const paraparaSubRef = useRef<HTMLDivElement>(null);
  const jiiiSubRef = useRef<HTMLDivElement>(null);

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

  // グローバルクリックイベントによるサブメニュー制御 - useLayoutEffectを使用
  useLayoutEffect(() => {
    if (!isMounted) return;
    
    const closeMenuOnOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      
      // メニューボタン自体またはサブメニューをクリックした場合は何もしない
      if (
        mogmogRef.current?.contains(target) ||
        tektekRef.current?.contains(target) ||
        paraparaRef.current?.contains(target) ||
        jiiiRef.current?.contains(target) ||
        mogmogSubRef.current?.contains(target) ||
        tektekSubRef.current?.contains(target) ||
        paraparaSubRef.current?.contains(target) ||
        jiiiSubRef.current?.contains(target)
      ) {
        return;
      }
      
      // それ以外の場所をクリックした場合は閉じる
      if (activeMenu) {
        console.log('メニュー外をクリック: メニューを閉じます', e.target);
        setActiveMenu(null);
      }
    };

    // イベントリスナーを追加
    window.addEventListener('click', closeMenuOnOutsideClick);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('click', closeMenuOnOutsideClick);
    };
  }, [isMounted, activeMenu]);

  // 特定の要素をクリックしたときのハンドラ - サブメニューのトグル動作専用
  const handleMenuToggle = (e: React.MouseEvent, menu: string) => {
    e.stopPropagation(); // バブリングを防止
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // ランダムな角度を生成する関数（-30度から30度の範囲）
  const getRandomRotation = () => {
    // return `${Math.floor(Math.random() * 61) - 30}deg`;
    return `0deg`;  // 常に0度を返すように変更
  };

  // 画面サイズに基づく表示調整
  const isWideScreen = windowWidth > 600;
  const isTablet = windowWidth <= 1024 && windowWidth > 600;
  const isIpad = windowWidth >= 768 && windowWidth <= 1024;
  // 601~767pxの範囲を検出する変数を追加
  const isMediumTablet = windowWidth >= 601 && windowWidth <= 767;
  // 横長画面を検出する変数を追加（アスペクト比が約1.7以上の場合）
  const isWideFlat = isMounted ? windowWidth / windowHeight >= 1.7 : false;
  // スマホサイズを検出
  const isMobile = windowWidth <= 480;

  // サブスターの位置を画面サイズに基づいて調整する関数
  const getSubStarPosition = (menuType: string, position: string) => {
    if (menuType === 'tektek') {
      // 縦長画面の場合（スマホやタブレットの縦向き）
      if (!isWideScreen) {
        // 縦長画面の配置はそのまま
        if (position === 'journeys') {
          return { x: '-35px', y: '-60px' }; // より左に
        } else if (position === 'strolls') {
          return { x: '15px', y: '10px' }; // より中央側に
        } else if (position === 'citynotes') {
          return { x: '-60px', y: '70px' }; // さらに左側に
        }
      } else {
        // 横長画面の場合（PC、iPadなど）
        if (position === 'journeys') {
          if (isMobile) return { x: '-10px', y: '-50px' }; // モバイルを元に戻す
          if (isTablet) return { x: '-75px', y: '-115px' }; // 指定値に変更
          return { x: '-90px', y: '-150px' }; // より上に配置
        } else if (position === 'strolls') {
          if (isMobile) return { x: '30px', y: '-30px' }; // モバイルを元に戻す
          if (isTablet) return { x: '0px', y: '-35px' }; // より中央側に
          return { x: '0px', y: '-40px' }; // より中央側に
        } else if (position === 'citynotes') {
          if (isMobile) return { x: '-40px', y: '0px' }; // モバイルを元に戻す
          if (isTablet) return { x: '-100px', y: '35px' }; // 指定値のまま
          return { x: '-110px', y: '40px' }; // 指定値に変更
        }
      }
    } else if (menuType === 'mogmog') {
      // mogmogはそのまま
      if (position === 'home') {
        if (isMobile) return { x: '-90px', y: '0px' };
        if (isTablet) return { x: '-110px', y: '0px' };
        return { x: '-130px', y: '0px' };
      } else if (position === 'away') {
        if (isMobile) return { x: '40px', y: '-50px' };
        if (isTablet) return { x: '50px', y: '-60px' };
        return { x: '60px', y: '-70px' };
      }
    } else if (menuType === 'parapara') {
      // 縦長画面の場合（スマホやタブレットの縦向き）
      if (!isWideScreen) {
        if (position === 'readings') {
          if (isMobile) return { x: '-40px', y: '-60px' }; // モバイル用により上に
          return { x: '15px', y: '-60px' }; // タブレット縦向き
        } else if (position === 'zine') {
          if (isMobile) return { x: '-25px', y: '60px' }; // モバイル用により右下に
          return { x: '25px', y: '70px' }; // タブレット縦向き
        }
      } else {
        // 横長画面の場合
        if (position === 'readings') {
          if (isMobile) return { x: '-5px', y: '-40px' }; // モバイルは大幅に中央寄り
          if (isTablet) return { x: '40px', y: '-135px' }; // タブレットはもっと上に
          return { x: '20px', y: '-150px' }; // PCは大幅に中央寄り
        } else if (position === 'zine') {
          if (isMobile) return { x: '-5px', y: '0px' }; // モバイルは大幅に中央寄り
          if (isTablet) return { x: '50px', y: '35px' }; // タブレットも少し中央寄り
          return { x: '60px', y: '40px' }; // デスクトップも少し中央寄り
        }
      }
    } else if (menuType === 'jiiii') {
      // jiiiはそのまま
      if (position === 'exhibits') {
        if (isMobile) return { x: '-110px', y: '-30px' };
        if (isTablet) return { x: '-130px', y: '-40px' };
        return { x: '-160px', y: '-50px' };
      } else if (position === 'music') {
        if (isMobile) return { x: '-35px', y: '-70px' };
        if (isTablet) return { x: '-40px', y: '-90px' };
        return { x: '-50px', y: '-110px' };
      } else if (position === 'films') {
        if (isMobile) return { x: '40px', y: '-30px' };
        if (isTablet) return { x: '45px', y: '-40px' };
        return { x: '60px', y: '-50px' };
      }
    }
    return { x: '0px', y: '0px' }; // デフォルト値
  };

  // タブレットサイズでの左右絵文字の位置調整
  const getEmojiPosition = (position: string) => {
    if (position === 'tektek') {
      if (!isWideScreen) return { top: '46%', left: '8%' }; // スマホ
      if (isWideFlat) return { top: '50%', left: '15%' }; // 横長画面用
      if (isIpad) return { top: '50%', left: '6%' }; // iPad特化
      if (isTablet) return { top: '50%', left: '8%' }; // タブレット一般
      return { top: '50%', left: '18%' }; // PC
    } else if (position === 'parapara') {
      if (!isWideScreen) return { top: '54%', right: '1%' }; // スマホ
      if (isWideFlat) return { top: '50%', right: '15%' }; // 横長画面用
      if (isMediumTablet) return { top: '50%', right: '15%' }; // 601~767pxの範囲専用
      if (isIpad) return { top: '50%', right: '2%' }; // iPad特化
      if (isTablet) return { top: '50%', right: '8%' }; // タブレット一般
      return { top: '50%', right: '15%' }; // PC
    }
    return {};
  };

  const tektekPosition = getEmojiPosition('tektek');
  const paraparaPosition = getEmojiPosition('parapara');

  return (
    <div className={`${styles.wrapper} ${styles.bodyStyles}`}>
      <div className={styles.glow}></div>
      <div className={styles.buttonContainer}>
        {/* mogmog */}
        <div 
          ref={mogmogRef}
          className={`${styles.emoji} ${activeMenu === 'mogmog' ? styles.active : ''}`}
          style={{ 
            top: isWideScreen ? '15%' : '23%', 
            left: '50%', 
            cursor: 'pointer' 
          }}
          onClick={(event) => handleMenuToggle(event, 'mogmog')}
        >😋</div>
        <div
          className={`${styles.mainButton} ${styles.top}`}
          onClick={(event) => handleMenuToggle(event, 'mogmog')}
        >
          <div>mogmog</div>
          <div 
            ref={mogmogSubRef}
            className={`${styles.subButtons} ${activeMenu === 'mogmog' ? styles.show : ''}`}
          >
            <Link 
              href="/tags/at-my-home" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('mogmog', 'home').x, 
                '--y': getSubStarPosition('mogmog', 'home').y 
              } as React.CSSProperties}
            >
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>at My Home</div>
                <div className={styles.subKana}>おうちで作ったごはんとおやつ</div>
              </div>
            </Link>
            <Link 
              href="/tags/away" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('mogmog', 'away').x, 
                '--y': getSubStarPosition('mogmog', 'away').y 
              } as React.CSSProperties}
            >
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
          ref={tektekRef}
          className={`${styles.emoji} ${activeMenu === 'tektek' ? styles.active : ''}`}
          style={{ 
            top: tektekPosition.top, 
            left: tektekPosition.left, 
            cursor: 'pointer' 
          }}
          onClick={(event) => handleMenuToggle(event, 'tektek')}
        >🚶‍♂️</div>
        <div
          className={`${styles.mainButton} ${styles.left}`}
          onClick={(event) => handleMenuToggle(event, 'tektek')}
        >
          <div>tektek</div>
          <div 
            ref={tektekSubRef}
            className={`${styles.subButtons} ${activeMenu === 'tektek' ? styles.show : ''}`}
          >
            <Link 
              href="/tags/journeys" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('tektek', 'journeys').x, 
                '--y': getSubStarPosition('tektek', 'journeys').y 
              } as React.CSSProperties}
            >
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Journeys</div>
                <div className={styles.subKana}>旅</div>
              </div>
            </Link>
            <Link 
              href="/tags/strolls" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('tektek', 'strolls').x, 
                '--y': getSubStarPosition('tektek', 'strolls').y 
              } as React.CSSProperties}
            >
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Strolls</div>
                <div className={styles.subKana}>おさんぽ</div>
              </div>
            </Link>
            <Link 
              href="/tags/city-notes" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('tektek', 'citynotes').x, 
                '--y': getSubStarPosition('tektek', 'citynotes').y 
              } as React.CSSProperties}
            >
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
          ref={paraparaRef}
          className={`${styles.emoji} ${activeMenu === 'parapara' ? styles.active : ''}`}
          style={{ 
            top: paraparaPosition.top, 
            right: paraparaPosition.right, 
            cursor: 'pointer' 
          }}
          onClick={(event) => handleMenuToggle(event, 'parapara')}
        >📚</div>
        <div
          className={`${styles.mainButton} ${styles.right}`}
          onClick={(event) => handleMenuToggle(event, 'parapara')}
        >
          <div>parapara</div>
          <div 
            ref={paraparaSubRef}
            className={`${styles.subButtons} ${activeMenu === 'parapara' ? styles.show : ''}`}
          >
            <Link 
              href="/tags/readings" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('parapara', 'readings').x, 
                '--y': getSubStarPosition('parapara', 'readings').y 
              } as React.CSSProperties}
            >
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Readings</div>
                <div className={styles.subKana}>読んだ本とか</div>
              </div>
            </Link>
            <Link 
              href="/tags/zine" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('parapara', 'zine').x, 
                '--y': getSubStarPosition('parapara', 'zine').y 
              } as React.CSSProperties}
            >
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
          ref={jiiiRef}
          className={`${styles.emoji} ${activeMenu === 'jiiii' ? styles.active : ''}`}
          style={{ 
            bottom: isWideScreen ? '10%' : '18%', 
            left: '50%', 
            cursor: 'pointer' 
          }}
          onClick={(event) => handleMenuToggle(event, 'jiiii')}
        >👀</div>
        <div
          className={`${styles.mainButton} ${styles.bottom}`}
          onClick={(event) => handleMenuToggle(event, 'jiiii')}
        >
          <div>jiiii</div>
          <div 
            ref={jiiiSubRef}
            className={`${styles.subButtons} ${activeMenu === 'jiiii' ? styles.show : ''}`}
          >
            <Link 
              href="/tags/exhibits" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('jiiii', 'exhibits').x, 
                '--y': getSubStarPosition('jiiii', 'exhibits').y 
              } as React.CSSProperties}
            >
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Exhibits</div>
                <div className={styles.subKana}>展示</div>
              </div>
            </Link>
            <Link 
              href="/tags/music" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('jiiii', 'music').x, 
                '--y': getSubStarPosition('jiiii', 'music').y 
              } as React.CSSProperties}
            >
              <div className={styles.starShape} style={{ '--rotate': getRandomRotation() } as React.CSSProperties} />
              <div className={styles.starContent}>
                <div className={styles.subTitle}>Music</div>
                <div className={styles.subKana}>ライブとか</div>
              </div>
            </Link>
            <Link 
              href="/tags/films" 
              className={styles.subStar} 
              style={{ 
                '--x': getSubStarPosition('jiiii', 'films').x, 
                '--y': getSubStarPosition('jiiii', 'films').y 
              } as React.CSSProperties}
            >
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