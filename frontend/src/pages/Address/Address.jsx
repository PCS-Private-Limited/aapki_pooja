import styles from './Address.module.css'

const STATES = ['Andhra Pradesh','Delhi','Gujarat','Haryana','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal']

export default function Address({ address, setAddress, onBack, onNext }) {
  const upd = (field, val) => setAddress(a => ({ ...a, [field]: val }))

  const canNext = address.name && address.phone && address.pincode && address.city && address.state && address.street

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Delivery Address 📦</h1>
        <p className={styles.sub}>?</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.formCard}>

          {/* Address type */}
          <div className={styles.typeRow}>
            {['Home', 'Work', 'Other'].map(t => (
              <button
                key={t}
                className={`${styles.typeBtn} ${address.type === t ? styles.typeActive : ''}`}
                onClick={() => upd('type', t)}
              >
                {t === 'Home' ? '🏠' : t === 'Work' ? '🏢' : '📍'} {t}
              </button>
            ))}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Full Name <span className={styles.req}>*</span></label>
              <input className={styles.input} placeholder="Priya Sharma" value={address.name} onChange={e => upd('name', e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Mobile Number <span className={styles.req}>*</span></label>
              <input className={styles.input} placeholder="98765 43210" type="tel" value={address.phone} onChange={e => upd('phone', e.target.value)} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Street Address / Society / Building <span className={styles.req}>*</span></label>
            <textarea className={styles.textarea} rows={3} placeholder="House no, street, area, landmark..." value={address.street} onChange={e => upd('street', e.target.value)} />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Pincode <span className={styles.req}>*</span></label>
              <input className={styles.input} placeholder="452001" maxLength={6} value={address.pincode} onChange={e => upd('pincode', e.target.value.replace(/\D/g,''))} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>City <span className={styles.req}>*</span></label>
              <input className={styles.input} placeholder="Indore" value={address.city} onChange={e => upd('city', e.target.value)} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>State <span className={styles.req}>*</span></label>
            <select className={styles.select} value={address.state} onChange={e => upd('state', e.target.value)}>
              <option value="">-- Select State --</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Side tip */}
        <div className={styles.tipCard}>
          <div className={styles.tipIcon}>💝</div>
          <div className={styles.tipTitle}>Delivery Tips</div>
          <ul className={styles.tipList}>
            <li>Standard delivery: 3–5 working days</li>
            <li>Express available at checkout</li>
            <li>Free delivery on ₹999+</li>
            <li>Easy 7-day returns & exchanges</li>
          </ul>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.backBtn} onClick={onBack}>← Back to Cart</button>
        <button className={styles.nextBtn} disabled={!canNext} onClick={onNext}>
          Continue to Payment →
        </button>
      </div>
    </div>
  )
}
