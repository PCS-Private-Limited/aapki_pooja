import { useState } from 'react'
import styles from './TrackOrder.module.css'

// Simulated order database
const MOCK_ORDERS = {
  'RSE123456': {
    id: 'RSE123456',
    status: 'shipped',
    placedOn: '25 March 2025',
    estimatedDelivery: '30 March 2025',
    items: [
      { image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=520&fit=crop&q=80', name: 'Floral Wrap Kurta', size: 'M', color: 'Rose Pink', qty: 1, price: 1299 },
      { image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=520&fit=crop&q=80', name: 'Georgette Palazzo Set', size: 'L', color: 'Hot Pink', qty: 1, price: 2199 },
    ],
    total: 3498,
    address: { name: 'Priya Sharma', street: '12, Rose Garden, Vijay Nagar', city: 'Indore', state: 'Madhya Pradesh', pincode: '452001' },
    courier: 'Delhivery',
    awb: 'DLV9876543210',
    timeline: [
      { status: 'confirmed', label: 'Order Confirmed', desc: 'Your order has been successfully placed', time: '25 Mar, 10:32 AM', done: true },
      { status: 'packed', label: 'Order Packed', desc: 'Your order is packed and ready', time: '25 Mar, 4:15 PM', done: true },
      { status: 'shipped', label: 'Shipped', desc: 'Dispatched with Delhivery courier', time: '26 Mar, 9:00 AM', done: true, active: true },
      { status: 'out', label: 'Out for Delivery', desc: 'Will be delivered today', time: 'Expected: 30 Mar', done: false },
      { status: 'delivered', label: 'Delivered', desc: 'Package will be delivered', time: 'Expected: 30 Mar', done: false },
    ],
  },
  'RSE654321': {
    id: 'RSE654321',
    status: 'delivered',
    placedOn: '18 March 2025',
    estimatedDelivery: '22 March 2025',
    items: [
      {
        image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=400&h=520&fit=crop&q=80',
        name: 'Floral Wrap Kurta',
        size: 'M',
        color: 'Rose Pink',
        qty: 1,
        price: 1299
      },
      {
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=520&fit=crop&q=80",
        name: 'Georgette Palazzo Set',
        size: 'L',
        color: 'Hot Pink',
        qty: 1,
        price: 2199
      },
    ],
    total: 3499,
    address: { name: 'Priya Sharma', street: '12, Rose Garden, Vijay Nagar', city: 'Indore', state: 'Madhya Pradesh', pincode: '452001' },
    courier: 'BlueDart',
    awb: 'BD1234567890',
    timeline: [
      { status: 'confirmed', label: 'Order Confirmed', desc: 'Your order has been successfully placed', time: '18 Mar, 2:10 PM', done: true },
      { status: 'packed', label: 'Order Packed', desc: 'Your order is packed and ready', time: '19 Mar, 11:00 AM', done: true },
      { status: 'shipped', label: 'Shipped', desc: 'Dispatched with BlueDart courier', time: '20 Mar, 8:30 AM', done: true },
      { status: 'out', label: 'Out for Delivery', desc: 'Delivery person has picked up', time: '22 Mar, 9:15 AM', done: true },
      { status: 'delivered', label: 'Delivered ✓', desc: 'Package successfully delivered!', time: '22 Mar, 1:45 PM', done: true, active: true },
    ],
  },
}

const STATUS_CONFIG = {
  confirmed: { color: '#f43f8e', bg: '#fce7f3', label: 'Confirmed', icon: '✓' },
  packed: { color: '#f59e0b', bg: '#fef3c7', label: 'Packed', icon: '📦' },
  shipped: { color: '#3b82f6', bg: '#dbeafe', label: 'Shipped', icon: '🚚' },
  out: { color: '#8b5cf6', bg: '#ede9fe', label: 'Out for Delivery', icon: '🛵' },
  delivered: { color: '#22c55e', bg: '#dcfce7', label: 'Delivered', icon: '🏠' },
}

export default function TrackOrder({ orders = [], onBack }) {
  const [inputId, setInputId] = useState('')
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeOrder, setActiveOrder] = useState(orders.length > 0 ? orders[0] : null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!inputId.trim()) return
    setLoading(true)
    setNotFound(false)
    setResult(null)
    await new Promise(r => setTimeout(r, 1000))
    const found = MOCK_ORDERS[inputId.trim().toUpperCase()]
    if (found) {
      setResult(found)
      setActiveOrder(found)
    } else {
      setNotFound(true)
    }
    setSearched(true)
    setLoading(false)
  }

  // Merge real placed orders with mock ones for demo
  const myOrders = orders.length > 0
    ? orders
    : Object.values(MOCK_ORDERS)

  const displayOrder = result || activeOrder || myOrders[0]

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>← Go Back</button>
        <div className={styles.heading}>
          <h1 className={styles.title}>Track Your Order 📦</h1>
          <p className={styles.sub}>Track your parcel using Order ID</p>
        </div>
      </div>

      {/* Search bar */}
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Enter Order ID (e.g. RSE123456)"
            value={inputId}
            onChange={e => setInputId(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn} disabled={loading}>
            {loading ? '⏳' : 'Track'}
          </button>
        </div>
        {notFound && (
          <div className={styles.notFound}>
            ❌ Order ID not found — "<strong>{inputId}</strong>" — please check again
          </div>
        )}
      </form>

      {/* Demo hint */}
      <div className={styles.demoHint}>
        💡 Try demo orders:
        {Object.keys(MOCK_ORDERS).map(id => (
          <button key={id} className={styles.demoId} onClick={() => { setInputId(id); setActiveOrder(MOCK_ORDERS[id]); setResult(MOCK_ORDERS[id]); setNotFound(false) }}>
            {id}
          </button>
        ))}
      </div>

      <div className={styles.layout}>

        {/* Left: Order list */}
        <div className={styles.orderList}>
          <div className={styles.listTitle}>My Orders</div>
          {myOrders.map(order => {
            const sc = STATUS_CONFIG[order.status]
            const isActive = displayOrder?.id === order.id
            return (
              <button
                key={order.id}
                className={`${styles.orderCard} ${isActive ? styles.orderCardActive : ''}`}
                onClick={() => { setActiveOrder(order); setResult(order); setNotFound(false) }}
              >
                <div className={styles.orderCardTop}>
                  <span className={styles.orderCardId}>{order.id}</span>
                  <span className={styles.statusPill} style={{ color: sc.color, background: sc.bg }}>
                    {sc.icon} {sc.label}
                  </span>
                </div>
                <div className={styles.orderCardItems}>
                  {order.items.slice(0, 2).map((item, i) => (
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.orderCardImage}
                    />
                  ))}
                  {order.items.length > 2 && <span className={styles.orderCardMore}>+{order.items.length - 2}</span>}
                </div>
                <div className={styles.orderCardMeta}>
                  <span>{order.placedOn}</span>
                  <span>₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right: Order detail */}
        {displayOrder ? (
          <div className={styles.detail}>
            {/* Header */}
            <div className={styles.detailHeader}>
              <div>
                <div className={styles.detailId}>Order #{displayOrder.id}</div>
                <div className={styles.detailMeta}>Placed on {displayOrder.placedOn}</div>
              </div>
              <span
                className={styles.bigStatusPill}
                style={{
                  color: STATUS_CONFIG[displayOrder.status].color,
                  background: STATUS_CONFIG[displayOrder.status].bg,
                  borderColor: STATUS_CONFIG[displayOrder.status].color + '44'
                }}
              >
                {STATUS_CONFIG[displayOrder.status].icon} {STATUS_CONFIG[displayOrder.status].label}
              </span>
            </div>

            {/* Expected delivery */}
            {displayOrder.status !== 'delivered' && (
              <div className={styles.deliveryBanner}>
                <span className={styles.deliveryBannerIcon}>🚀</span>
                <div>
                  <div className={styles.deliveryBannerLabel}>Expected Delivery</div>
                  <div className={styles.deliveryBannerDate}>{displayOrder.estimatedDelivery}</div>
                </div>
              </div>
            )}

            {displayOrder.status === 'delivered' && (
              <div className={styles.deliveredBanner}>
                <span>🎉</span>
                <div>
                  <div className={styles.deliveryBannerLabel}>Delivered Successfully!</div>
                  <div className={styles.deliveryBannerDate}>Delivered on {displayOrder.estimatedDelivery}</div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className={styles.timelineSection}>
              <div className={styles.sectionTitle}>Delivery Progress</div>
              <div className={styles.timeline}>
                {displayOrder.timeline.map((step, i) => (
                  <div key={i} className={`${styles.timelineItem} ${step.done ? styles.timelineDone : ''} ${step.active ? styles.timelineActive : ''}`}>
                    <div className={styles.timelineLeft}>
                      <div className={styles.timelineDot}>
                        {step.done ? (step.active ? STATUS_CONFIG[step.status]?.icon || '●' : '✓') : <span className={styles.emptyDot} />}
                      </div>
                      {i < displayOrder.timeline.length - 1 && (
                        <div className={`${styles.timelineConnector} ${step.done ? styles.connectorDone : ''}`} />
                      )}
                    </div>
                    <div className={styles.timelineRight}>
                      <div className={styles.timelineLabel}>{step.label}</div>
                      <div className={styles.timelineDesc}>{step.desc}</div>
                      <div className={styles.timelineTime}>{step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier info */}
            <div className={styles.courierBox}>
              <div className={styles.sectionTitle}>Courier Details</div>
              <div className={styles.courierRow}>
                <div className={styles.courierItem}>
                  <span className={styles.courierLabel}>Courier Partner</span>
                  <span className={styles.courierVal}>{displayOrder.courier}</span>
                </div>
                <div className={styles.courierItem}>
                  <span className={styles.courierLabel}>AWB Number</span>
                  <span className={styles.courierVal}>{displayOrder.awb}</span>
                </div>
              </div>
              <button className={styles.courierTrackBtn}>
                🔗 Track on Courier Website
              </button>
            </div>

            {/* Items */}
            <div className={styles.itemsSection}>
              <div className={styles.sectionTitle}>Order Items</div>
              {displayOrder.items.map((item, i) => (
                <div key={i} className={styles.itemRow}>
                  <div className={styles.itemImageBox}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemMeta}>{item.size} · {item.color} · x{item.qty}</div>
                  </div>
                  <div className={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                </div>
              ))}
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalAmt}>₹{displayOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Delivery address */}
            <div className={styles.addressBox}>
              <div className={styles.sectionTitle}>Delivery Address</div>
              <div className={styles.addressContent}>
                <span className={styles.addressIcon}>📍</span>
                <div>
                  <div className={styles.addressName}>{displayOrder.address.name}</div>
                  <div className={styles.addressText}>
                    {displayOrder.address.street}, {displayOrder.address.city}, {displayOrder.address.state} — {displayOrder.address.pincode}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.detailActions}>
              {displayOrder.status === 'delivered' && (
                <button className={styles.reviewBtn}>⭐ Write a Review</button>
              )}
              {displayOrder.status !== 'delivered' && (
                <button className={styles.cancelBtn}>✕ Cancel Order</button>
              )}
              <button className={styles.supportBtn}>💬 Contact Support</button>
            </div>
          </div>
        ) : (
          <div className={styles.emptyDetail}>
            <div className={styles.emptyIcon}>📦</div>
            <p>Search for an Order ID or select one from the left</p>
          </div>
        )}
      </div>
    </div>
  )
}