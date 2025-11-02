import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="theme-switcher-container">
        <input
          id="checkbox"
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
        />
        <label htmlFor="checkbox" className="label"></label>
      </div>
      {/* <span className="theme-mode-font transition-colors duration-300">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span> */}
    </div>
  );
};

export default ThemeSwitcher;