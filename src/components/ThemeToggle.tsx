'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { createStore, useStore } from 'zustand';

type Theme = 'light' | 'dark';
type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const themeStore = createStore<ThemeStore>()((set) => ({
  theme: 'light',
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }));
  },
  setTheme: (theme: Theme) => {
    set({ theme });
  },
}));

export default function ThemeToggle() {
  const theme = useStore(themeStore, (state) => state.theme);
  const toggleTheme = useStore(themeStore, (state) => state.toggleTheme);
  const pathname = usePathname();
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const hideTheme = pathname?.includes('/apply') ?? false;

  return (
    <div className="float-right h-0">
      {!hideTheme && (
        <button
          className="btn float-right"
          onClick={() => {
            toggleTheme();
          }}
        >
          Toggle Theme
        </button>
      )}
    </div>
  );
}
