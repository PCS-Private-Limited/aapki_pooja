import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <span>🛍️ AapkiPooja</span>
      </div>

      {/* Navigation */}
      <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
        
        {/* Mobile Search */}
        {searchOpen && (
          <input
            type="text"
            placeholder="Search products..."
            className={styles.mobileSearch}
          />
        )}

        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/my_oders">My Oder</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Right Section */}
      <div className={styles.right}>
        
        {/* ✅ Desktop Search */}
        <input
          type="text"
          placeholder="Search products..."
          className={styles.desktopSearch}
        />

        {/* ✅ Mobile Search Icon */}
        <button
          className={`${styles.icon} ${styles.searchIcon}`}
          onClick={() => {
            setMenuOpen(true);
            setSearchOpen(!searchOpen);
          }}
        >
          🔍
        </button>

        {/* Wishlist */}
        <button className={styles.icon}>❤️</button>

        {/* Cart */}
        <button
          className={styles.icon}
          onClick={() => navigate("/cart")}
        >
          🛒
        </button>

        {/* Mobile Menu */}
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;