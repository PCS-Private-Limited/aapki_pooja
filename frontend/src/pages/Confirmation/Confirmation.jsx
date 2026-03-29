import styles from './Confirmation.module.css'

export default function Confirmation({ orderId, cartItems, total, address, onShopAgain, onTrackOrder }) {
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 4)
  const fmtDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className={styles.page}>
      <div className={styles.confetti} aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={styles.dot} style={{ '--i': i }} />
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg className={styles.checkSvg} viewBox="0 0 90 90" fill="none">
            <circle cx="45" cy="45" r="42" stroke="url(#grad)" strokeWidth="2.5" className={styles.circle} />
            <path d="M27 46L39 58L63 34" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.check} />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="90" y2="90">
                <stop offset="0%" stopColor="#f43f8e" />
                <stop offset="100%" stopColor="#d4166a" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className={styles.title}>Order Placed! 🎉</h1>
        <p className={styles.subtitle}>Congratulations! Your order has been successfully confirmed</p>

        <div className={styles.orderIdBadge}>
          Order ID: <strong>{orderId}</strong>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineStep}>
            <div className={`${styles.tDot} ${styles.tDone}`}>✓</div>
            <div className={styles.tText}>
              <div className={styles.tLabel}>Order Confirmed</div>
              <div className={styles.tSub}>Just now</div>
            </div>
          </div>
          <div className={styles.tLine} />
          <div className={styles.timelineStep}>
            <div className={`${styles.tDot} ${styles.tPending}`}>📦</div>
            <div className={styles.tText}>
              <div className={styles.tLabel}>Packing</div>
              <div className={styles.tSub}>Within 24 hours</div>
            </div>
          </div>
          <div className={styles.tLine} />
          <div className={styles.timelineStep}>
            <div className={`${styles.tDot} ${styles.tPending}`}>🚚</div>
            <div className={styles.tText}>
              <div className={styles.tLabel}>Shipped</div>
              <div className={styles.tSub}>Within 1–2 days</div>
            </div>
          </div>
          <div className={styles.tLine} />
          <div className={styles.timelineStep}>
            <div className={`${styles.tDot} ${styles.tPending}`}>🏠</div>
            <div className={styles.tText}>
              <div className={styles.tLabel}>Delivered</div>
              <div className={styles.tSub}>{fmtDate}</div>
            </div>
          </div>
        </div>

        <div className={styles.itemsList}>
          <div className={styles.itemsHeader}>Your Items</div>
          {cartItems.map(item => (
            <div key={item.key} className={styles.item}>
              <span className={styles.itemEmoji}>{item.product.emoji}</span>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.product.name}</div>
                <div className={styles.itemMeta}>{item.size} · {item.color} · x{item.qty}</div>
              </div>
              <div className={styles.itemPrice}>₹{(item.product.price * item.qty).toLocaleString('en-IN')}</div>
            </div>
          ))}
        </div>

        <div className={styles.deliveryBox}>
          <div className={styles.deliveryIcon}>📦</div>
          <div>
            <div className={styles.deliveryName}>{address.name}</div>
            <div className={styles.deliveryAddr}>{address.street}, {address.city}, {address.state} — {address.pincode}</div>
          </div>
        </div>

        <div className={styles.totalRow}>
          <span>Total Paid</span>
          <span className={styles.totalAmt}>₹{total.toLocaleString('en-IN')}</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.trackBtn} onClick={onTrackOrder}>
            🚚 Track Order
          </button>
          <button className={styles.primaryBtn} onClick={onShopAgain}>
            ✿ Continue Shopping
          </button>
        </div>

        <p className={styles.footer}>Thank you for choosing Rosé 💗</p>
      </div>
    </div>
  )
}