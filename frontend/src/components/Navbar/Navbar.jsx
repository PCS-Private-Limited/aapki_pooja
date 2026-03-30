import styles from './Navbar.module.css'

export default function Navbar({ totalItems, wishlistCount, onCartClick, onWishlistClick, onTrackClick, user, onLogout, onLoginClick }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✿</span>
          <span className={styles.logoText}>Aapki Pooja</span>
        </div>

        <div className={styles.tagline}></div>

        <div className={styles.actions}>
          {/* Track Order */}
          <button className={styles.iconBtn} onClick={onTrackClick} title="Track Order">
            <span className={styles.iconEmoji}>🚚</span>
            <span className={styles.iconLabel}>Track Order</span>
          </button>

          {/* Wishlist */}
          <button className={styles.iconBtn} onClick={onWishlistClick} title="Wishlist">
            <span className={styles.iconEmoji}>💗</span>
            <span className={styles.iconLabel}>Wishlist</span>
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </button>

          {/* Cart */}
          <button className={styles.cartBtn} onClick={onCartClick}>
            <span className={styles.cartEmoji}>🛒</span>
            <span className={styles.cartLabel}>Cart</span>
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </button>

          {/* User */}
          {user ? (
            <div className={styles.userMenu}>
              <div className={styles.avatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userDropdown}>
                <div className={styles.userName}>{user.name.split(' ')[0]}!</div>
                <div className={styles.userEmail}>{user.email}</div>
                <hr className={styles.dropDivider} />
                <button className={styles.dropItem} onClick={onTrackClick}>📦 My Orders</button>
                <button className={styles.logoutBtn} onClick={onLogout}>🚪 Logout</button>
              </div>
            </div>
          ) : (
            <button className={styles.loginBtn} onClick={onLoginClick}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
