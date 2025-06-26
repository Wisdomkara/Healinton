
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      <div className="relative h-5 w-5">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          🌙
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ☀️
        </div>
      </div>
    </Button>
  );
};

export default ThemeToggle;
