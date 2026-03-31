import { useState } from 'react'
import styles from './Payment.module.css'

const PAY_METHODS = [
  { id: 'upi',  icon: '📱', label: 'UPI',           desc: 'GPay, PhonePe, Paytm' },
  { id: 'card', icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
  { id: 'cod',  icon: '💵', label: 'Cash on Delivery', desc: 'Pay when you receive' },
  { id: 'emi',  icon: '🏦', label: 'EMI',           desc: 'No-cost EMI on ₹3000+' },
]

export default function Payment({ payMethod, setPayMethod, total, address, onBack, onConfirm }) {
  const [upiId, setUpiId]       = useState('')
  const [cardNo, setCardNo]     = useState('')
  const [expiry, setExpiry]     = useState('')
  const [cvv, setCvv]           = useState('')
  const [cardName, setCardName] = useState('')
  const [loading, setLoading]   = useState(false)

  const canPay =
    payMethod === 'cod' ? true :
    payMethod === 'upi' ? upiId.includes('@') :
    payMethod === 'emi' ? true :
    cardNo.length === 19 && expiry.length === 5 && cvv.length === 3 && cardName

  const handlePay = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    onConfirm()
  }

  const fmtCard = (v) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const fmtExp  = (v) => {
    const d = v.replace(/\D/g,'').slice(0,4)
    return d.length > 2 ? d.slice(0,2) + '/' + d.slice(2) : d
  }

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Payment 💳</h1>
        <p className={styles.sub}>Secure payment — your data is safe 🔒</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.left}>

          {/* Method selector */}
          <div className={styles.methodGrid}>
            {PAY_METHODS.map(m => (
              <button
                key={m.id}
                className={`${styles.methodCard} ${payMethod === m.id ? styles.methodActive : ''}`}
                onClick={() => setPayMethod(m.id)}
              >
                <span className={styles.methodIcon}>{m.icon}</span>
                <div>
                  <div className={styles.methodLabel}>{m.label}</div>
                  <div className={styles.methodDesc}>{m.desc}</div>
                </div>
                {payMethod === m.id && <span className={styles.methodCheck}>✓</span>}
              </button>
            ))}
          </div>

          {/* UPI input */}
          {payMethod === 'upi' && (
            <div className={styles.inputSection}>
              <label className={styles.label}>UPI ID</label>
              <div className={styles.upiRow}>
                <input
                  className={styles.input}
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                />
                <button className={styles.verifyBtn}>Verify</button>
              </div>
              <div className={styles.upiApps}>
                {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                  <div key={app} className={styles.upiApp}>{app}</div>
                ))}
              </div>
            </div>
          )}

          {/* Card input */}
          {payMethod === 'card' && (
            <div className={styles.inputSection}>
              <div className={styles.cardVisual}>
                <div className={styles.cardChip}>▰▰</div>
                <div className={styles.cardNumberDisplay}>{cardNo || '•••• •••• •••• ••••'}</div>
                <div className={styles.cardBottom}>
                  <span>{cardName || 'CARD HOLDER'}</span>
                  <span>{expiry || 'MM/YY'}</span>
                </div>
              </div>
              <div className={styles.cardFields}>
                <div className={styles.field}>
                  <label className={styles.label}>Card Number</label>
                  <input className={styles.input} placeholder="1234 5678 9012 3456" value={cardNo} onChange={e => setCardNo(fmtCard(e.target.value))} maxLength={19} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Name on Card</label>
                  <input className={styles.input} placeholder="PRIYA SHARMA" value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} />
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Expiry</label>
                    <input className={styles.input} placeholder="MM/YY" value={expiry} onChange={e => setExpiry(fmtExp(e.target.value))} maxLength={5} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>CVV</label>
                    <input className={styles.input} placeholder="•••" type="password" value={cvv} onChange={e => setCvv(e.target.value.slice(0,3))} maxLength={3} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COD */}
          {payMethod === 'cod' && (
            <div className={styles.codBox}>
              <div className={styles.codIcon}>🏠</div>
              <p className={styles.codText}>Pay ₹<strong>{total.toLocaleString('en-IN')}</strong> in cash at the time of delivery.</p>
              <p className={styles.codNote}>Note: ₹50 extra COD charge will be applied.</p>
            </div>
          )}

          {/* EMI */}
          {payMethod === 'emi' && (
            <div className={styles.emiGrid}>
              {[3, 6, 9, 12].map(m => (
                <div key={m} className={styles.emiCard}>
                  <div className={styles.emiMonths}>{m} Months</div>
                  <div className={styles.emiAmount}>₹{Math.round(total / m).toLocaleString('en-IN')}/mo</div>
                  <div className={styles.emiTag}>0% Interest</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className={styles.summary}>
          <div className={styles.summaryTitle}>Order Summary</div>

          <div className={styles.addressPreview}>
            <div className={styles.addressLabel}>📦 Deliver to</div>
            <div className={styles.addressName}>{address.name}</div>
            <div className={styles.addressText}>{address.street}, {address.city}</div>
            <div className={styles.addressText}>{address.state} — {address.pincode}</div>
          </div>

          <div className={styles.divider} />

          <div className={styles.totalBlock}>
            <span>Total Amount</span>
            <span className={styles.totalAmt}>₹{total.toLocaleString('en-IN')}</span>
          </div>

          <button
            className={`${styles.payBtn} ${loading ? styles.payLoading : ''}`}
            disabled={!canPay || loading}
            onClick={handlePay}
          >
            {loading ? (
              <span className={styles.loader}>Processing… ✨</span>
            ) : (
              `Pay ₹${total.toLocaleString('en-IN')} →`
            )}
          </button>

          <div className={styles.secureRow}>
            <span>🔒</span>
            <span>256-bit SSL encrypted</span>
          </div>

          <div className={styles.payIcons}>
            {['Visa', 'MC', 'UPI', 'RuPay'].map(p => (
              <span key={p} className={styles.payIcon}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.backRow}>
        <button className={styles.backBtn} onClick={onBack} disabled={loading}>← Change Address</button>
      </div>
    </div>
  )
}