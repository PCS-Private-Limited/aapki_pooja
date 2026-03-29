import styles from './WishlistPage.module.css'

export default function WishlistPage({ wishlist, onRemove, onAddToCart, onBack }) {
  if (wishlist.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyHeart}>🤍</div>
        <h2 className={styles.emptyTitle}>No items in your wishlist</h2>
        <p className={styles.emptyDesc}>Save the products you like to your wishlist!</p>
        <button className={styles.shopBtn} onClick={onBack}>View new Collection →</button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>My Wishlist 💗</h1>
        <p className={styles.sub}>{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</p>
      </div>

      <div className={styles.grid}>
        {wishlist.map(product => {
          const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)
          return (
            <div key={product.id} className={styles.card}>
              {/* Remove from wishlist */}
              <button
                className={styles.heartBtn}
                onClick={() => onRemove(product.id)}
                title="Remove from Wishlist"
              >
                ❤️
              </button>

              <div className={styles.imageBox}>
                <div className={styles.emoji}>{product.emoji}</div>
                <div className={styles.discountBadge}>-{discount}%</div>
              </div>

              <div className={styles.body}>
                <div className={styles.category}>{product.category}</div>
                <div className={styles.name}>{product.name}</div>

                <div className={styles.ratingRow}>
                  <span className={styles.stars}>{'★'.repeat(Math.round(product.rating))}</span>
                  <span className={styles.reviews}>({product.reviews})</span>
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                  <span className={styles.mrp}>₹{product.mrp.toLocaleString('en-IN')}</span>
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.addCartBtn}
                    onClick={() => onAddToCart(product, product.sizes[1] || product.sizes[0], product.colorNames[0])}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => onRemove(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.footer}>
        <button className={styles.backBtn} onClick={onBack}>←Continue Shopping </button>
      </div>
    </div>
  )
}
