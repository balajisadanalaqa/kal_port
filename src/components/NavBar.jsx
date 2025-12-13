import React, { useEffect, useRef, useState } from "react";
import { summary } from "../data/summaryData";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionOffsets = navItems.map(item => {
        const el = document.querySelector(item.href);
        return el ? el.offsetTop : 0;
      });
      let current = "#home";
      for (let i = 0; i < sectionOffsets.length; i++) {
        if (scrollPosition + 120 >= sectionOffsets[i]) {
          current = navItems[i].href;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.setActiveSection = setActiveSection;

    return () => {
      window.removeEventListener("scroll", onScroll);
      delete window.setActiveSection;
    };
  }, []);



  const handleNavClick = () => {
    // No-op, only used to prevent default or for future use, it caused glitch as underline goes to the navitem and again back to
    // current untill page scrolls down,the state is updated two times one for this function and one for the scroll event.
  };

  return (
          <nav
          className={`fixed top-0 z-50 w-full hidden md:block`}
        >      <div
        className="solid-glass-nav backdrop-blur-xl backdrop-saturate-150"
        style={{
          WebkitBackdropFilter: 'blur(16px)'
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="lexend-giga-nav-bold  font-bold text-xl gradient-text neon-text align-left">
            {summary.short_name}
          </div>

          <ul className="flex gap-8 font-medium text-text lexend-giga-nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative group transition-all duration-300 hover:text-primary
                    ${activeSection === item.href ? 'text-primary font-bold shadow-lg active-nav-item' : ''}
                  `}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Switcher and Crypto Status */}
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto m-1 neon-glow">
                <FaLinkedin className="w-4 h-4 text-background" />
              </div>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com&su=Subject-%20Enquiry%20about%20Physiotherapy%20Services%20and%20Appointments&body=Content-%20I%20would%20like%20to%20contact%20you%20regarding%20your%20physiotherapy%20services." target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mx-auto m-1 neon-glow">
                <FaEnvelope className="w-4 h-4 text-background" />
              </div>
            </a>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;