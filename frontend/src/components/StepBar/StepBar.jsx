import styles from './StepBar.module.css'

export default function StepBar({ steps, current }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {steps.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <div key={label} className={styles.step}>
              <div className={`${styles.dot} ${done ? styles.done : ''} ${active ? styles.active : ''}`}>
                {done ? '✓' : i + 1}
              </div>
              <span className={`${styles.label} ${active ? styles.activeLabel : ''} ${done ? styles.doneLabel : ''}`}>{label}</span>
              {i < steps.length - 1 && (
                <div className={`${styles.line} ${done ? styles.lineDone : ''}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
