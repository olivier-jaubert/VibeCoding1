import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__branding">
        <img src="/vite.svg" alt="My Gallery Logo" className="header__logo" />
        <span className="header__title">My Gallery</span>
      </div>
      <nav className="header__nav">
        {/* Add navigation links here if needed */}
      </nav>
    </header>
  );
};

export default Header;
