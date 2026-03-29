import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import StepBar from './components/StepBar/StepBar'
import AuthModal from './components/AuthModal/AuthModal'
import WishlistPage from './components/WishlistPage/WishlistPage'
import TrackOrder from './pages/TrackOrder/TrackOrder'
import Shop from './pages/Shop/Shop'
import Cart from './pages/Cart/Cart'
import Address from './pages/Address/Address'
import Payment from './pages/Payment/Payment'
import Confirmation from './pages/Confirmation/Confirmation'
import styles from './App.module.css'

const STEPS = ['Cart', 'Address', 'Payment']

export default function App() {
  // Auth
  const [user, setUser]           = useState(null)
  const [authModal, setAuthModal] = useState(null)

  // Navigation: 'shop' | 'wishlist' | 'track' | 'checkout'
  const [view, setView]           = useState('shop')
  const [step, setStep]           = useState(0) // only used in checkout
  const [confirmed, setConfirmed] = useState(false)
  const [orderId, setOrderId]     = useState('')

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist]   = useState([])

  // Placed orders (stored for tracking)
  const [myOrders, setMyOrders]   = useState([])

  // Address & Payment
  const [address, setAddress]   = useState({ name: '', phone: '', pincode: '', city: '', state: '', street: '', type: 'Home' })
  const [payMethod, setPayMethod] = useState('upi')

  /* ── Cart ── */
  const addToCart = (product, size, color) => {
    setCartItems(prev => {
      const key = `${product.id}-${size}-${color}`
      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { key, product, size, color, qty: 1 }]
    })
  }
  const updateQty  = (key, delta) => setCartItems(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  const removeItem = (key) => setCartItems(prev => prev.filter(i => i.key !== key))

  /* ── Wishlist ── */
  const toggleWishlist = (product) =>
    setWishlist(prev => prev.find(p => p.id === product.id) ? prev.filter(p => p.id !== product.id) : [...prev, product])
  const isWishlisted = (id) => wishlist.some(p => p.id === id)

  /* ── Prices ── */
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0)
  const subtotal   = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0)
  const delivery   = subtotal > 999 ? 0 : 79
  const discount   = subtotal > 1999 ? Math.round(subtotal * 0.1) : 0
  const total      = subtotal + delivery - discount

  /* ── Auth ── */
  const handleAuth = (userData) => {
    setUser(userData)
    const trigger = authModal
    setAuthModal(null)
    if (trigger === 'cart')  { setView('checkout'); setStep(1) }
    if (trigger === 'order') { setView('checkout'); setStep(2) }
    if (trigger === 'track') { setView('track') }
  }

  const handleLogout = () => {
    setUser(null)
    setView('shop')
    setStep(0)
  }

  /* ── Guards ── */
  const goToCart = () => {
    if (!user) { setAuthModal('cart'); return }
    setView('checkout'); setStep(1)
  }
  const goToOrder = () => {
    if (!user) { setAuthModal('order'); return }
    setView('checkout'); setStep(2)
  }
  const goToTrack = () => {
    if (!user) { setAuthModal('track'); return }
    setView('track')
  }

  /* ── Confirm order ── */
  const handleConfirm = () => {
    const id = 'RSE' + Date.now().toString().slice(-6)
    const now = new Date()
    const placedOn = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    const delivery = new Date(now); delivery.setDate(now.getDate() + 4)
    const estimatedDelivery = delivery.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

    const newOrder = {
      id,
      status: 'confirmed',
      placedOn,
      estimatedDelivery,
      items: cartItems.map(i => ({
        emoji: i.product.emoji,
        name: i.product.name,
        size: i.size,
        color: i.color,
        qty: i.qty,
        price: i.product.price,
      })),
      total,
      address: { ...address },
      courier: 'Delhivery',
      awb: 'DLV' + Math.random().toString().slice(2, 12),
      timeline: [
        { status: 'confirmed', label: 'Order Confirmed', desc: 'Aapka order successfully place ho gaya', time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + placedOn, done: true, active: true },
        { status: 'packed',    label: 'Order Packed',    desc: 'Aapka order pack karke ready hoga', time: 'Expected: kal tak', done: false },
        { status: 'shipped',   label: 'Shipped',         desc: 'Courier ke saath dispatch hoga', time: 'Expected: 1-2 din mein', done: false },
        { status: 'out',       label: 'Out for Delivery', desc: 'Aapke ghar tak aa raha hai', time: 'Expected: ' + estimatedDelivery, done: false },
        { status: 'delivered', label: 'Delivered',        desc: 'Package deliver ho jayega', time: 'Expected: ' + estimatedDelivery, done: false },
      ],
    }

    setMyOrders(prev => [newOrder, ...prev])
    setOrderId(id)
    setConfirmed(true)
  }

  /* ── Confirmation → track flow ── */
  const handleGoTrack = () => {
    setConfirmed(false)
    setCartItems([])
    setView('track')
    setStep(0)
  }

  const handleShopAgain = () => {
    setConfirmed(false)
    setCartItems([])
    setView('shop')
    setStep(0)
  }

  /* ── Render ── */
  if (confirmed) {
    return (
      <Confirmation
        orderId={orderId}
        cartItems={cartItems}
        total={total}
        address={address}
        onShopAgain={handleShopAgain}
        onTrackOrder={handleGoTrack}
      />
    )
  }

  const isCheckout = view === 'checkout'

  return (
    <div className={styles.app}>
      <Navbar
        totalItems={totalItems}
        wishlistCount={wishlist.length}
        onCartClick={goToCart}
        onWishlistClick={() => setView(view === 'wishlist' ? 'shop' : 'wishlist')}
        onTrackClick={goToTrack}
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setAuthModal('manual')}
      />

      {isCheckout && step > 0 && <StepBar steps={STEPS} current={step - 1} />}

      <main className={styles.main}>
        {/* Shop */}
        {!isCheckout && view === 'shop' && (
          <Shop onAddToCart={addToCart} cartItems={cartItems} onGoCart={goToCart} wishlist={wishlist} isWishlisted={isWishlisted} onToggleWishlist={toggleWishlist} />
        )}

        {/* Wishlist */}
        {!isCheckout && view === 'wishlist' && (
          <WishlistPage wishlist={wishlist} onRemove={id => setWishlist(prev => prev.filter(p => p.id !== id))} onAddToCart={addToCart} onBack={() => setView('shop')} />
        )}

        {/* Track Order */}
        {!isCheckout && view === 'track' && (
          <TrackOrder orders={myOrders} onBack={() => setView('shop')} />
        )}

        {/* Checkout steps */}
        {isCheckout && step === 1 && (
          <Cart cartItems={cartItems} updateQty={updateQty} removeItem={removeItem} subtotal={subtotal} delivery={delivery} discount={discount} total={total} onBack={() => { setView('shop'); setStep(0) }} onNext={goToOrder} />
        )}
        {isCheckout && step === 2 && (
          <Address address={address} setAddress={setAddress} onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}
        {isCheckout && step === 3 && (
          <Payment payMethod={payMethod} setPayMethod={setPayMethod} total={total} address={address} onBack={() => setStep(2)} onConfirm={handleConfirm} />
        )}
      </main>

      {authModal && (
        <AuthModal trigger={authModal} onAuth={handleAuth} onClose={() => setAuthModal(null)} />
      )}
    </div>
  )
}
