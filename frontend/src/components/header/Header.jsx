import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <span>🛍️ AapkiPooja</span>
      </div>

      {/* Navigation */}
      <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Right Section */}
      <div className={styles.right}>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.search}
        />

        <button className={styles.icon}>❤️</button>
        <button className={styles.icon}>🛒</button>

        {/* Mobile Menu Button */}
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