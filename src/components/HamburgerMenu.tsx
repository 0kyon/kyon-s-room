'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './HamburgerMenu.module.css';

type MenuItem = {
  name: string;
  path?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    name: 'Entrance',
    children: [
      {
        name: 'Living Room',
        children: [
          {
            name: 'mogmog',
            children: [
              { name: 'at My Home', path: '/mogmog/home' },
              { name: 'Away', path: '/mogmog/away' }
            ]
          },
          {
            name: 'tektek',
            children: [
              { name: 'Journey', path: '/tektek/journey' },
              { name: 'Strolls', path: '/tektek/strolls' },
              { name: 'City Notes', path: '/tektek/city-notes' }
            ]
          },
          {
            name: 'perapera',
            children: [
              { name: 'Readings', path: '/perapera/readings' },
              { name: 'Zine', path: '/perapera/zine' }
            ]
          },
          {
            name: 'jiiii',
            children: [
              { name: 'Exhibits', path: '/jiiii/exhibits' },
              { name: 'Music', path: '/jiiii/music' },
              { name: 'Films', path: '/jiiii/films' }
            ]
          }
        ]
      },
      {
        name: 'Kitchen',
        children: [
          { name: 'Cupboard', path: '/kitchen/cupboard' },
          { name: 'Recipe Box', path: '/kitchen/recipes' }
        ]
      },
      {
        name: 'My Room',
        children: [
          { name: 'Diary', path: '/myroom/diary' },
          { name: 'murmur', path: '/myroom/murmur' }
        ]
      }
    ]
  }
];

const SubMenu: React.FC<{ items: MenuItem[], level: number, initiallyExpanded?: boolean }> = ({ items, level, initiallyExpanded = false }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  // 最初のレンダリング時に、Entranceの下の階層を展開する
  useEffect(() => {
    if (initiallyExpanded && level === 1) {
      const initialState: { [key: string]: boolean } = {};
      items.forEach(item => {
        initialState[item.name] = true;
      });
      setExpandedItems(initialState);
    }
  }, [initiallyExpanded, items, level]);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // 階層レベルに応じた矢印表示の条件分岐
  const renderArrow = (itemName: string, itemLevel: number) => {
    // Entranceの場合は矢印を表示しない
    if (itemLevel === 1 && itemName === 'Entrance') {
      return null;
    }
    
    // 第2階層の場合は大きい矢印を表示
    if (itemLevel === 2) {
      return (
        <span className={`${styles.arrow} ${styles.arrowLarge} ${expandedItems[itemName] ? styles.expanded : ''}`}>
          ▼
        </span>
      );
    }
    
    // それ以外の階層は通常の矢印
    return (
      <span className={`${styles.arrow} ${expandedItems[itemName] ? styles.expanded : ''}`}>
        ▼
      </span>
    );
  };

  return (
    <ul className={`${styles.submenu} ${styles[`level-${level}`]}`}>
      {items.map((item) => (
        <li key={item.name} className={`${styles.menuItem} ${styles[`item-level-${level}`]}`}>
          {item.children ? (
            <>
              <div 
                className={`${styles.menuToggle} ${styles[`toggle-level-${level}`]}`}
                onClick={() => toggleExpand(item.name)}
                title={item.name}
              >
                <span className={styles.menuText}>{item.name}</span>
                {renderArrow(item.name, level)}
              </div>
              {expandedItems[item.name] && item.children && (
                <SubMenu items={item.children} level={level + 1} />
              )}
            </>
          ) : (
            <Link href={item.path || '#'} className={`${styles.menuLink} ${styles[`link-level-${level}`]}`} title={item.name}>
              <span className={styles.menuText}>{item.name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  
  // トップページ（'/'）ではハンバーガーメニューを表示しない
  if (pathname === '/') {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // メニュー外のクリックを検知するためのハンドラーを追加
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // メニュー参照が存在し、かつクリックがメニュー外で発生した場合
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        isOpen
      ) {
        closeMenu();
      }
    };

    // クリックイベントリスナーを追加
    document.addEventListener('mousedown', handleClickOutside);
    
    // クリーンアップ関数
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.hamburgerMenuContainer}>
      <button 
        className={`${styles.hamburgerButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label="メニュー"
      >
        <span className={styles.hamburgerIcon}></span>
        <span className={styles.hamburgerIcon}></span>
        <span className={styles.hamburgerIcon}></span>
      </button>

      <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`} ref={menuRef}>
        <div className={styles.menuContent}>
          <button 
            className={styles.closeButton} 
            onClick={closeMenu}
            aria-label="閉じる"
          >
            ×
          </button>
          <SubMenu items={menuItems} level={1} initiallyExpanded={true} />
        </div>
      </div>
    </div>
  );
} 