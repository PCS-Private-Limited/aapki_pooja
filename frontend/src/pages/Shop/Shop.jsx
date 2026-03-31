// Shop.jsx
import { useState, useMemo, useRef,useEffect } from 'react'
import { PRODUCTS } from '../../data/products'
import styles from './Shop.module.css'

// Constants
const CATEGORIES = ['All', 'Kurta', 'Co-ord Set', 'Anarkali', 'Suit Set', 'Saree', 'Western']

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular', sortFn: (a, b) => b.reviews - a.reviews },
  { value: 'priceLow', label: 'Price: Low to High', sortFn: (a, b) => a.price - b.price },
  { value: 'priceHigh', label: 'Price: High to Low', sortFn: (a, b) => b.price - a.price },
  { value: 'rating', label: 'Top Rated', sortFn: (a, b) => b.rating - a.rating },
  { value: 'discount', label: 'Best Discount', sortFn: (a, b) => getDiscountPercent(b) - getDiscountPercent(a) }
]

const PRICE_RANGES = [
  { label: 'Under ₹999', min: 0, max: 999 },
  { label: '₹1000 - ₹2499', min: 1000, max: 2499 },
  { label: '₹2500 - ₹4999', min: 2500, max: 4999 },
  { label: '₹5000 & Above', min: 5000, max: Infinity }
]

const SLIDER_IMAGES = [
  'https://img.freepik.com/premium-vector/beauty-care-cosmetic-promotion-carousel-template_578602-262.jpg',
  'https://img.freepik.com/premium-vector/beauty-social-media-post-square-flyer-banner_123371-3.jpg',
  'https://tse2.mm.bing.net/th/id/OIP.DPsgg-4s3mKUWdKKE2VrjgHaDt?rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://digitalrosogulla.com/wp-content/uploads/2023/02/Best-Cafes-in-kolkata-1-1024x576.jpg',
  'https://tse4.mm.bing.net/th/id/OIP.UdJ3YyB7K_AUaXkIr8ZeGwHaEJ?pid=ImgDet&w=187&h=104&c=7&dpr=1.3&o=7&rm=3',
]
// Helper functions
 const BannerSlider = () => {
  const [current, setCurrent] = useState(0)

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDER_IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.bannerSlider}>
      
      {/* Image */}
      <img 
        src={SLIDER_IMAGES[current]} 
        className={styles.bannerImage} 
      />

      {/* Dots */}
      <div className={styles.sliderDots}>
        {SLIDER_IMAGES.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      {/* Arrows */}
      <button 
        className={styles.prevBtn}
        onClick={() => setCurrent(current === 0 ? SLIDER_IMAGES.length - 1 : current - 1)}
      >
        ‹
      </button>

      <button 
        className={styles.nextBtn}
        onClick={() => setCurrent((current + 1) % SLIDER_IMAGES.length)}
      >
        ›
      </button>
    </div>
  )
}
const getDiscountPercent = (product) => Math.round(((product.mrp - product.price) / product.mrp) * 100)

const StarRating = ({ rating }) => (
  <div className={styles.starRating}>
    <span>{rating.toFixed(1)}</span>
    <span className={styles.starIcon}>★</span>
  </div>
)

const ProductCard = ({ product, onAddToCart, isWishlisted, onToggleWishlist }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const [isHeartAnimating, setIsHeartAnimating] = useState(false)
  const [imgError, setImgError] = useState(false)

  const discount = getDiscountPercent(product)
  const isWishlistedItem = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    onAddToCart(product, selectedSize, product.colorNames[selectedColor])
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }
 

  const handleWishlist = (e) => {
    e.stopPropagation()
    onToggleWishlist(product)
    setIsHeartAnimating(true)
    setTimeout(() => setIsHeartAnimating(false), 300)
  }

  return (
    <div className={styles.productCard}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img
          src={imgError ? product.image : product.image}
          alt={product.name}
          className={styles.productImage}
          onError={() => setImgError(true)}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className={styles.badgeContainer}>
          {product.badge && <span className={styles.badge}>{product.badge}</span>}
          {discount >= 30 && !product.badge && (
            <span className={styles.discountBadge}>{discount}% OFF</span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button
          className={`${styles.wishlistBtn} ${isWishlistedItem ? styles.wishlistActive : ''} ${isHeartAnimating ? styles.heartBeat : ''}`}
          onClick={handleWishlist}
          aria-label={isWishlistedItem ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlistedItem ? '❤️' : '🤍'}
        </button>
        
        {/* Quick Actions - Visible on Hover */}
        <div className={styles.quickActions}>
          <div className={styles.sizeSelector}>
            {product.sizes.slice(0, 4).map(size => (
              <button
                key={size}
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeActive : ''}`}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size) }}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            className={`${styles.addToCartBtn} ${isAdded ? styles.added : ''}`}
            onClick={handleAddToCart}
          >
            {isAdded ? '✓ ADDED' : 'ADD TO CART'}
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className={styles.productInfo}>
        <div className={styles.brand}>{product.brand}</div>
        <div className={styles.productName}>{product.name}</div>
        
        {/* Rating */}
        <div className={styles.ratingContainer}>
          <StarRating rating={product.rating} />
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className={styles.priceContainer}>
          <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          <span className={styles.mrp}>₹{product.mrp.toLocaleString('en-IN')}</span>
          <span className={styles.discount}>{discount}% off</span>
        </div>
        
        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div className={styles.colorsContainer}>
            {product.colors.slice(0, 4).map((color, idx) => (
              <button
                key={idx}
                className={`${styles.colorSwatch} ${selectedColor === idx ? styles.swatchActive : ''}`}
                style={{ backgroundColor: color }}
                onClick={(e) => { e.stopPropagation(); setSelectedColor(idx) }}
                aria-label={`Color ${product.colorNames[idx]}`}
              />
            ))}
            {product.colors.length > 4 && (
              <span className={styles.moreColors}>+{product.colors.length - 4}</span>
            )}
          </div>
        )}
        
        {/* Free Delivery Badge */}
        {product.freeDelivery && (
          <div className={styles.freeDelivery}>FREE DELIVERY</div>
        )}
      </div>
    </div>
  )
}

const FilterSidebar = ({ filters, onFilterChange, onClose }) => {
  const handlePriceRangeChange = (min, max) => {
    onFilterChange('priceRange', { min, max })
  }

  const handleCategoryChange = (category) => {
    onFilterChange('category', category)
  }

  return (
    <div className={styles.filterSidebar}>
      <div className={styles.filterHeader}>
        <h3>FILTERS</h3>
        <button className={styles.closeFilter} onClick={onClose}>✕</button>
      </div>
      
      {/* Price Range Section */}
      <div className={styles.filterSection}>
        <h4>PRICE</h4>
        <div className={styles.priceRangeList}>
          {PRICE_RANGES.map(range => (
            <label key={range.label} className={styles.filterCheckbox}>
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange.min === range.min && filters.priceRange.max === range.max}
                onChange={() => handlePriceRangeChange(range.min, range.max)}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Category Section */}
      <div className={styles.filterSection}>
        <h4>CATEGORY</h4>
        <div className={styles.categoryList}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.filterCategoryBtn} ${filters.category === cat ? styles.active : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Free Delivery Filter */}
      <div className={styles.filterSection}>
        <label className={styles.filterCheckbox}>
          <input
            type="checkbox"
            checked={filters.freeDelivery}
            onChange={(e) => onFilterChange('freeDelivery', e.target.checked)}
          />
          <span>FREE DELIVERY ONLY</span>
        </label>
      </div>
      
      {/* Clear All Filters */}
      {(filters.category !== 'All' || filters.priceRange.min !== 0 || filters.priceRange.max !== Infinity || filters.freeDelivery) && (
        <button 
          className={styles.clearFiltersBtn}
          onClick={() => {
            onFilterChange('category', 'All')
            onFilterChange('priceRange', { min: 0, max: Infinity })
            onFilterChange('freeDelivery', false)
          }}
        >
          CLEAR ALL FILTERS
        </button>
      )}
    </div>
  )
}

export default function Shop({ onAddToCart, cartItems, onGoCart, wishlist, isWishlisted, onToggleWishlist }) {
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: { min: 0, max: Infinity },
    freeDelivery: false
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // Create refs for each category slider
  const sliderRefs = useRef({})

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) return false
      
      // Price filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false
      
      // Free delivery filter
      if (filters.freeDelivery && !product.freeDelivery) return false
      
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false
      
      return true
    })
  }, [filters, searchQuery])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sortOption = SORT_OPTIONS.find(opt => opt.value === sortBy)
    return [...filteredProducts].sort(sortOption.sortFn)
  }, [filteredProducts, sortBy])

  // Group products by category for category-wise sliding view
  const categoriesWithProducts = useMemo(() => {
    const grouped = {}
    // Only include categories that are not 'All'
    const nonAllCategories = CATEGORIES.filter(cat => cat !== 'All')
    
    nonAllCategories.forEach(cat => {
      const products = sortedProducts.filter(p => p.category === cat)
      if (products.length > 0) {
        grouped[cat] = products
      }
    })
    return grouped
  }, [sortedProducts])

  const totalCartQty = cartItems.reduce((sum, item) => sum + item.qty, 0)

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const scrollSlider = (category, direction) => {
    const slider = sliderRefs.current[category]
    if (slider) {
      const scrollAmount = 300
      slider.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      })
    }
  }

  return (
    <div className={styles.shopPage}>
      {/* Myntra-style Banner */}
     
      
      {/* Search and Sort Bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
        
        <div className={styles.sortContainer}>
          <button 
            className={styles.filterBtn}
            onClick={() => setIsFilterOpen(true)}
          >
            ⚙️ FILTERS
          </button>
          <select 
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <BannerSlider />

      {/* Category-wise Product Display with Sliding */}
      {sortedProducts.length > 0 ? (
        <div className={styles.categoriesContainer}>
          {Object.entries(categoriesWithProducts).map(([category, products]) => (
            <div key={category} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>{category}</h2>
                <div className={styles.categoryNav}>
                 
                </div>
              </div>
              <div 
                className={styles.productSlider}
                ref={el => sliderRefs.current[category] = el}
              >
                <div className={styles.sliderTrack}>
                  {products.map(product => (
                    <div key={product.id} className={styles.sliderItem}>
                      <ProductCard
                        product={product}
                        onAddToCart={onAddToCart}
                        isWishlisted={isWishlisted}
                        onToggleWishlist={onToggleWishlist}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>
      )}
      
      {/* Filter Sidebar (Slide-in) */}
      {isFilterOpen && (
        <>
          <div className={styles.filterOverlay} onClick={() => setIsFilterOpen(false)} />
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={() => setIsFilterOpen(false)}
          />
        </>
      )}
     <BannerSlider />
      {/* Floating Cart Button */}
      {totalCartQty > 0 && (
        <button className={styles.floatingCart} onClick={onGoCart}>
          <span className={styles.cartIcon}>🛒</span>
          <span className={styles.cartCount}>{totalCartQty}</span>
          <span className={styles.cartText}>View Cart</span>
          <span className={styles.cartArrow}>→</span>
        </button>
      )}
    </div>
  )
}