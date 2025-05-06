'use client';

import { useState, useEffect } from 'react';
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

  return (
    <ul className={`${styles.submenu} ${styles[`level-${level}`]}`}>
      {items.map((item) => (
        <li key={item.name} className={styles.menuItem}>
          {item.children ? (
            <>
              <div 
                className={styles.menuToggle}
                onClick={() => toggleExpand(item.name)}
              >
                {item.name}
                <span className={`${styles.arrow} ${expandedItems[item.name] ? styles.expanded : ''}`}>
                  ▼
                </span>
              </div>
              {expandedItems[item.name] && item.children && (
                <SubMenu items={item.children} level={level + 1} />
              )}
            </>
          ) : (
            <Link href={item.path || '#'} className={styles.menuLink}>
              {item.name}
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
  
  // トップページ（'/'）ではハンバーガーメニューを表示しない
  if (pathname === '/') {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

      <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`}>
        <div className={styles.menuContent}>
          <SubMenu items={menuItems} level={1} initiallyExpanded={true} />
        </div>
      </div>
    </div>
  );
} 