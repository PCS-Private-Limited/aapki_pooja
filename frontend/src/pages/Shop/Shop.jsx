import { useState } from 'react'
import { PRODUCTS } from '../../data/products'
import styles from './Shop.module.css'

const CATEGORIES = ['All', 'Kurta', 'Co-ord Set', 'Anarkali', 'Suit Set', 'Saree', 'Western']

function ProductCard({ product, onAddToCart, isWishlisted, onToggleWishlist }) {
  const [selSize, setSelSize]     = useState(product.sizes[product.sizes.length > 1 ? 1 : 0])
  const [selColorIdx, setSelColorIdx] = useState(0)
  const [added, setAdded]         = useState(false)
  const [heartAnim, setHeartAnim] = useState(false)

  const handleAdd = () => {
    onAddToCart(product, selSize, product.colorNames[selColorIdx])
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleWishlist = () => {
    onToggleWishlist(product)
    setHeartAnim(true)
    setTimeout(() => setHeartAnim(false), 400)
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  const wishlisted = isWishlisted(product.id)

  return (
    <div className={styles.card}>
      {product.badge && <div className={styles.badge}>{product.badge}</div>}

      {/* Wishlist heart button */}
      <button
        className={`${styles.heartBtn} ${wishlisted ? styles.heartActive : ''} ${heartAnim ? styles.heartBeat : ''}`}
        onClick={handleWishlist}
        title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>

      <div className={styles.imageBox}>
        <div className={styles.emoji} style={{ background: product.colors[selColorIdx] + '22' }}>
          {product.emoji}
        </div>
        <div className={styles.discount}>-{discount}%</div>
      </div>

      <div className={styles.body}>
        <div className={styles.category}>{product.category}</div>
        <div className={styles.name}>{product.name}</div>

        <div className={styles.ratingRow}>
          <span className={styles.stars}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          <span className={styles.mrp}>₹{product.mrp.toLocaleString('en-IN')}</span>
        </div>

        {/* Colors */}
        <div className={styles.colorRow}>
          {product.colors.map((c, i) => (
            <button
              key={i}
              title={product.colorNames[i]}
              className={`${styles.colorDot} ${selColorIdx === i ? styles.colorActive : ''}`}
              style={{ background: c, borderColor: c }}
              onClick={() => setSelColorIdx(i)}
            />
          ))}
        </div>

        {/* Sizes */}
        <div className={styles.sizeRow}>
          {product.sizes.map(s => (
            <button
              key={s}
              className={`${styles.sizeBtn} ${selSize === s ? styles.sizeActive : ''}`}
              onClick={() => setSelSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <button className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`} onClick={handleAdd}>
          {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default function Shop({ onAddToCart, cartItems, onGoCart, wishlist, isWishlisted, onToggleWishlist }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.heroSub}>New Collection 2025</p>
          <h1 className={styles.heroTitle}>Dress Like<br /><em>You Mean It</em></h1>
          <p className={styles.heroDesc}>Premium women's fashion — kurtas, sarees, co-ords & more</p>
        </div>
        <div className={styles.heroEmojis}>
          <span>👗</span><span>🥻</span><span>👘</span>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search kurtas, sarees, suits..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className={styles.grid}>
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={onAddToCart}
            isWishlisted={isWishlisted}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>No products found 😔</div>
        )}
      </div>

      {/* Floating Cart CTA */}
      {cartItems.length > 0 && (
        <button className={styles.floatingCart} onClick={onGoCart}>
          🛍️ {cartItems.reduce((s, i) => s + i.qty, 0)} items — Order Now →
        </button>
      )}
    </div>
  )
}