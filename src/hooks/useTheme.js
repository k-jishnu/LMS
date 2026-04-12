import { useState, useEffect } from 'react';

export function useTheme() {
  // Can be 'light', 'dark', or 'system'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lms-theme') || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes to start fresh
    root.classList.remove('light-mode', 'dark-mode');

    let effectiveTheme = theme;
    
    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = systemPrefersDark ? 'dark' : 'light';
      
      // Listen for system theme changes if set to system
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        if (theme === 'system') {
          root.classList.remove('light-mode', 'dark-mode');
          root.classList.add(e.matches ? 'dark-mode' : 'light-mode');
        }
      };
      mediaQuery.addEventListener('change', handleChange);
      
      // Apply initial system theme
      root.classList.add(effectiveTheme === 'light' ? 'light-mode' : 'dark-mode');
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      root.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('lms-theme', newTheme);
  };

  return { theme, changeTheme };
}
