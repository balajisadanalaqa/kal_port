import React, { useState } from "react";
import { FaHome, FaGraduationCap, FaBriefcase, FaStar, FaEnvelope } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

const navItems = [
  { href: "#home", label: "Home", icon: <FaHome /> },
  { href: "#education", label: "Education", icon: <FaGraduationCap /> },
  { href: "#experience", label: "Experience", icon: <FaBriefcase /> },
  { href: "#reviews", label: "Reviews", icon: <FaStar /> },
  { href: "#contact", label: "Contact", icon: <FaEnvelope /> },
];

const MobileNavBar = () => {
  const [activeItem, setActiveItem] = useState("#home");

  const handleNavClick = (href) => {
    setActiveItem(href);
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-40 md:hidden">
      <div className="solid-glass-pill flex justify-around items-center py-3 neon-glow">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => handleNavClick(item.href)}
            className={`flex flex-col items-center text-xs transition-all duration-300 relative group ${
              activeItem === item.href
                ? 'text-primary'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            <div className={`relative mb-1 transition-all duration-300 ${
              activeItem === item.href ? 'scale-110' : 'group-hover:scale-105'
            }`}>
              <span className="text-lg">{item.icon}</span>
              {activeItem === item.href && (
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-sm"></div>
              )}
            </div>
            <span className="font-medium text-[10px]">{item.label}</span>

            {/* Active Indicator */}
            {activeItem === item.href && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
            )}
          </a>
        ))}
      </div>

      {/* Theme Switcher and Crypto Status */}
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <ThemeSwitcher />
        <div className="flex items-center gap-2 px-2 py-1 solid-glass-pill">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-[10px] text-text-secondary">Live</span>
          <div className="w-px h-3 bg-glass-border"></div>
          <span className="text-[10px] text-text-secondary">BTC</span>
          <span className="text-[10px] font-semibold text-success">$40,987</span>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavBar;