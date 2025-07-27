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
      <div className="header__branding" style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <span className="header__title" style={{ textAlign: 'center', width: '100%' }}>🖼️ Personal Gallery - Olivier's Friday Art Journey 🎨</span>
        <nav className="header__nav" style={{ marginTop: 16 }}>
          <a href="#profile-intro">About</a>
          <a href="#gallery-root">Gallery</a>
          <a href="#enhanced-images">Enhanced Images</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
