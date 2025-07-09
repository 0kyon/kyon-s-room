'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type FontSize = 'small' | 'medium' | 'large';

interface FontSizeContextValue {
  size: FontSize;
  setSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextValue>({
  size: 'small',
  setSize: () => {},
});

function applyHtmlClass(size: FontSize) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('font-small', 'font-medium', 'font-large');
  root.classList.add(`font-${size}`);
}

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [size, setSizeState] = useState<FontSize>('small');

  useEffect(() => {
    // 初期化：localStorage から読み込み
    const stored = typeof window !== 'undefined' ? localStorage.getItem('fontSize') : null;
    if (stored === 'small' || stored === 'medium' || stored === 'large') {
      setSizeState(stored);
      applyHtmlClass(stored);
    } else {
      applyHtmlClass('small');
    }
  }, []);

  const setSize = (newSize: FontSize) => {
    setSizeState(newSize);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fontSize', newSize);
    }
    applyHtmlClass(newSize);
  };

  return (
    <FontSizeContext.Provider value={{ size, setSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext); 