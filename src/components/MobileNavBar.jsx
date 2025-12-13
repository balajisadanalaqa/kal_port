import React, { useEffect, useState } from "react";
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
  const [showHeroControls, setShowHeroControls] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector("#home");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeroControls(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      { threshold: [0.2, 0.35, 0.5] }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setActiveItem(href);
  };

  const triggerHeroScroll = (direction) => {
    const scrollFn =
      direction === "left" ? window.heroScrollLeft : window.heroScrollRight;
    if (typeof scrollFn === "function") {
      scrollFn();
    }
  };

  return (
    <nav className="mobile-nav fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] max-w-sm z-40 md:hidden">
      <div className="mobile-nav-pill solid-glass-pill flex justify-around items-center py-2 neon-glow">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => handleNavClick(item.href)}
            className={`flex flex-col items-center text-[10px] transition-all duration-300 relative group ${
              activeItem === item.href
                ? 'text-primary'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            <div className={`relative mb-0.5 transition-all duration-300 ${
              activeItem === item.href ? 'scale-110' : 'group-hover:scale-105'
            }`}>
              <span className="text-base">{item.icon}</span>
              {activeItem === item.href && (
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-sm"></div>
              )}
            </div>
            <span className="font-medium text-[9px]">{item.label}</span>

            {/* Active Indicator */}
            {activeItem === item.href && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
            )}
          </a>
        ))}
      </div>

      {/* Theme Switcher and Crypto Status */}
      <div className="absolute -top-12 left-1/2 flex -translate-x-1/2 items-center gap-1">
        <ThemeSwitcher />
        {showHeroControls && (
          <div className="ml-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-[10px] font-semibold shadow-md dark:bg-background/60">
            <button
              onClick={() => triggerHeroScroll("left")}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-primary"
            >
              Scroll Left
            </button>
            <button
              onClick={() => triggerHeroScroll("right")}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-primary"
            >
              Scroll Right
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNavBar;