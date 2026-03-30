import styles from './WishlistPage.module.css'

export default function WishlistPage({ wishlist, onRemove, onAddToCart, onBack }) {

  const renderProduct = (product) => {
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)

    return (
      <div key={product.id} className={styles.card}>
        
        {/* ❤️ Remove Button */}
        <button
          className={styles.heartBtn}
          onClick={() => onRemove(product.id)}
          title="Remove from Wishlist"
        >
          ❤️
        </button>

        {/* ✅ IMAGE ADDED */}
        <div className={styles.imageBox}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
          <div className={styles.discountBadge}>-{discount}%</div>
        </div>

        <div className={styles.body}>
          <div className={styles.category}>{product.category}</div>
          <div className={styles.name}>{product.name}</div>

          {/* ⭐ Rating */}
          <div className={styles.ratingRow}>
            <span className={styles.stars}>
              {'★'.repeat(Math.round(product.rating))}
            </span>
            <span className={styles.reviews}>({product.reviews})</span>
          </div>

          {/* 💰 Price */}
          <div className={styles.priceRow}>
            <span className={styles.price}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className={styles.mrp}>
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Actions */}
          <div className={styles.cardActions}>
            <button
              className={styles.addCartBtn}
              onClick={() =>
                onAddToCart(
                  product,
                  product.sizes?.[0],
                  product.colorNames?.[0]
                )
              }
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
  }

  // 🔹 Empty State
  if (wishlist.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyHeart}>🤍</div>
        <h2 className={styles.emptyTitle}>No items in your wishlist</h2>
        <p className={styles.emptyDesc}>
          Save the products you like to your wishlist!
        </p>
        <button className={styles.shopBtn} onClick={onBack}>
          View new Collection →
        </button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      
      {/* Heading */}
      <div className={styles.heading}>
        <h1 className={styles.title}>My Wishlist 💗</h1>
        <p className={styles.sub}>
          {wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved
        </p>
      </div>

      {/* ✅ Optimized map */}
      <div className={styles.grid}>
        {wishlist.map(renderProduct)}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Continue Shopping
        </button>
      </div>
    </div>
  )
}