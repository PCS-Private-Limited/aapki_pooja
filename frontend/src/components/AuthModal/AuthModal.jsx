import { useState } from 'react'
import styles from './AuthModal.module.css'

export default function AuthModal({ onClose, onAuth, trigger }) {
  const [tab, setTab]           = useState('login')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone]       = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const triggerMsg = trigger === 'cart'
    ? '🛒 Please login to view cart'
    : trigger === 'order'
    ? '📦 Please login to place order'
    : '✿ Welcome back to Aapki Pooja'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (tab === 'register') {
      if (!name.trim()) return setError('Name Required')
      if (password.length < 6) return setError('Password must be at least 6 characters long')
    }
    if (!email.includes('@')) return setError('Please enter a valid email address')
    if (!password) return setError('Password is required')

    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))

    // Simulate auth — in real app, call API here
    const user = { name: name || email.split('@')[0], email, phone }
    onAuth(user)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>

        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✿</span>
          <span className={styles.logoText}>Aapki Pooja</span>
        </div>

        {/* Trigger message */}
        <div className={styles.triggerMsg}>{triggerMsg}</div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'login' ? styles.tabActive : ''}`}
            onClick={() => { setTab('login'); setError('') }}
          >
            Login
          </button>
          <button
            className={`${styles.tab} ${tab === 'register' ? styles.tabActive : ''}`}
            onClick={() => { setTab('register'); setError('') }}
          >
            Register
          </button>
          <div className={`${styles.tabSlider} ${tab === 'register' ? styles.tabSliderRight : ''}`} />
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>

          {tab === 'register' && (
            <div className={styles.field}>
              <label className={styles.label}>👩 Full Name</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Priya Sharma"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>📧 Email Address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="priya@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus={tab === 'login'}
            />
          </div>

          {tab === 'register' && (
            <div className={styles.field}>
              <label className={styles.label}>📱 Mobile Number</label>
              <input
                className={styles.input}
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>🔒 Password</label>
            <div className={styles.passWrap}>
              <input
                className={styles.input}
                type={showPass ? 'text' : 'password'}
                placeholder={tab === 'register' ? 'Minimum 6 characters' : '••••••••'}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(s => !s)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {tab === 'login' && (
            <div className={styles.forgotRow}>
              <button type="button" className={styles.forgotBtn}> Forgot Password ?</button>
            </div>
          )}

          {error && <div className={styles.errorMsg}>⚠️ {error}</div>}

          <button
            type="submit"
            className={`${styles.submitBtn} ${loading ? styles.submitLoading : ''}`}
            disabled={loading}
          >
            {loading
              ? 'Please wait…'
              : tab === 'login'
              ? '✓ Login'
              : 'Create Account'}
          </button>

          {/* Divider */}
          <div className={styles.divider}><span>OR</span></div>

          {/* Social login */}
          <div className={styles.socialRow}>
            <button type="button" className={styles.socialBtn}>
              <span>G</span> Google
            </button>
            <button type="button" className={styles.socialBtn}>
              <span>📘</span> Facebook
            </button>
          </div>
        </form>

        <p className={styles.switchText}>
          {tab === 'login' ? 'New user? ' : 'Already have an account? '}
          <button
            type="button"
            className={styles.switchBtn}
            onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setError('') }}
          >
            {tab === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}
