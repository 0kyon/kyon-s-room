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
        path: '/livingroom',
        children: [
          {
            name: 'mogmog',
            children: [
              { name: 'at My Home', path: '/tags/at-my-home' },
              { name: 'Away', path: '/tags/away' }
            ]
          },
          {
            name: 'tektek',
            children: [
              { name: 'Journey', path: '/tags/journeys' },
              { name: 'Strolls', path: '/tags/strolls' },
              { name: 'City Notes', path: '/tags/city-notes' }
            ]
          },
          {
            name: 'perapera',
            children: [
              { name: 'Readings', path: '/tags/readings' },
              { name: 'Zine', path: '/tags/zine' }
            ]
          },
          {
            name: 'jiiii',
            children: [
              { name: 'Exhibits', path: '/tags/exhibits' },
              { name: 'Music', path: '/tags/music' },
              { name: 'Films', path: '/tags/films' }
            ]
          }
        ]
      },
      {
        name: 'Kitchen',
        path: '/kitchen',
        children: [
          { name: 'Cupboard', path: '/tags/cupboard' },
          { name: 'Recipe Box', path: '/tags/recipe-box' }
        ]
      },
      {
        name: 'My Room',
        path: '/myroom',
        children: [
          { name: 'Diary', path: '/tags/diary' },
          { name: 'murmur', path: '/tags/murmur' }
        ]
      }
    ]
  }
];

const SubMenu: React.FC<{ 
  items: MenuItem[], 
  level: number, 
  initiallyExpanded?: boolean, 
  closeMenu: () => void,
  isMenuOpen: boolean
}> = ({ 
  items, 
  level, 
  initiallyExpanded = false, 
  closeMenu,
  isMenuOpen
}) => {
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

  // メニューが閉じられたときに状態をリセット
  useEffect(() => {
    if (!isMenuOpen) {
      // メインメニューが閉じられた時、初期状態に戻す
      if (initiallyExpanded && level === 1) {
        const initialState: { [key: string]: boolean } = {};
        items.forEach(item => {
          initialState[item.name] = true;
        });
        setExpandedItems(initialState);
      } else {
        setExpandedItems({});
      }
    }
  }, [isMenuOpen, initiallyExpanded, items, level]);

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
                <SubMenu 
                  items={item.children} 
                  level={level + 1} 
                  closeMenu={closeMenu} 
                  isMenuOpen={isMenuOpen}
                />
              )}
            </>
          ) : (
            <Link 
              href={item.path || '#'} 
              className={`${styles.menuLink} ${styles[`link-level-${level}`]}`} 
              title={item.name}
              onClick={closeMenu}
            >
              <span className={styles.menuText}>{item.name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

const SearchBar: React.FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    // TODO: 検索機能の実装
    console.log('Searching for:', searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <button
          className={styles.searchIcon}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="検索"
        >
          🔍
        </button>
        {isExpanded && (
          <div className={styles.searchInputContainer}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="検索..."
              className={styles.searchInput}
            />
            <button
              className={styles.searchButton}
              onClick={handleSearch}
              aria-label="検索実行"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // メニュー外のクリックを検知するためのハンドラーを追加
  useEffect(() => {
    if (pathname === '/') {
      return;
    }
    
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
  }, [isOpen, pathname]);

  // トップページ（'/'）ではハンバーガーメニューを表示しない
  if (pathname === '/') {
    return null;
  }

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
          <SearchBar closeMenu={closeMenu} />
          <SubMenu 
            items={menuItems} 
            level={1} 
            initiallyExpanded={true} 
            closeMenu={closeMenu} 
            isMenuOpen={isOpen}
          />
        </div>
      </div>
    </div>
  );
} 