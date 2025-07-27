/**
 * Header - Site branding and navigation bar.
 *
 * Usage:
 *   <Header />
 *
 * Extend with navigation links as needed.
 */
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__branding">
        <img src="/palette-emoji.svg" alt="🎨" className="header__logo" />
        <span className="header__title">🖼️ Personal Gallery - Olivier's Friday Art Journey 🎨</span>
      </div>
      <nav className="header__nav">
        {/* Add navigation links here if needed */}
      </nav>
    </header>
  );
};

export default Header;
