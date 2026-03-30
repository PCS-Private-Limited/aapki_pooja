import styles from './Cart.module.css'

export default function Cart({ cartItems, updateQty, removeItem, subtotal, delivery, discount, total, onBack, onNext }) {
  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛍️</div>
        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
        <p className={styles.emptyDesc}>Add some beautiful outfits to get started!</p>
        <button className={styles.shopBtn} onClick={onBack}>Start Shopping →</button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Your Cart 🛒</h1>
        <p className={styles.sub}>
          {cartItems.reduce((s, i) => s + i.qty, 0)} items selected
        </p>
      </div>

      <div className={styles.layout}>
        {/* Items list */}
        <div className={styles.itemsList}>
          {cartItems.map(item => (
            <div key={item.key} className={styles.itemCard}>
              
              {/* ✅ IMAGE ADDED HERE */}
              <div className={styles.itemImageContainer}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className={styles.itemImage}
                />
              </div>

              <div className={styles.itemInfo}>
                <div className={styles.itemCat}>{item.product.category}</div>
                <div className={styles.itemName}>{item.product.name}</div>

                <div className={styles.itemMeta}>
                  <span className={styles.metaTag}>Size: {item.size}</span>
                  <span className={styles.metaTag}>Color: {item.color}</span>
                </div>

                <div className={styles.itemPrice}>
                  ₹{(item.product.price * item.qty).toLocaleString('en-IN')}
                </div>
              </div>

              <div className={styles.itemRight}>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.key)}
                >
                  ✕
                </button>

                <div className={styles.qtyControl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQty(item.key, -1)}
                  >
                    −
                  </button>
                  <span className={styles.qtyVal}>{item.qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQty(item.key, +1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Coupon */}
          <div className={styles.couponBox}>
            <span className={styles.couponIcon}>🏷️</span>
            <input
              className={styles.couponInput}
              type="text"
              placeholder="Apply coupon code..."
            />
            <button className={styles.couponBtn}>Apply</button>
          </div>
        </div>

        {/* Price summary */}
        <div className={styles.summary}>
          <div className={styles.summaryTitle}>Price Details</div>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          {discount > 0 && (
            <div className={`${styles.summaryRow} ${styles.green}`}>
              <span>Discount (10%)</span>
              <span>−₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className={styles.summaryRow}>
            <span>Delivery</span>
            <span className={delivery === 0 ? styles.green : ''}>
              {delivery === 0 ? 'FREE 🎉' : `₹${delivery}`}
            </span>
          </div>

          {delivery === 0 && (
            <p className={styles.freeDeliveryNote}>
              ✓ Free delivery on orders above ₹999
            </p>
          )}

          {delivery > 0 && (
            <p className={styles.freeDeliveryNote}>
              Add ₹{999 - subtotal} more to get free delivery
            </p>
          )}

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalAmt}>
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>

          {discount > 0 && (
            <div className={styles.savingsBadge}>
              🎊 You saved ₹{discount.toLocaleString('en-IN')}!
            </div>
          )}

          <button className={styles.checkoutBtn} onClick={onNext}>
            Place Order →
          </button>

          <button className={styles.backLink} onClick={onBack}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}