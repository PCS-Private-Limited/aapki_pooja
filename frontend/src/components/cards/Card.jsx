import React from "react";
import styles from "./Card.module.css";

function Card({
  image,
  title,
  subtitle,
  price,
  oldPrice,
  rating,
  status, // e.g. "Sale", "New", "Out of Stock"
  badgeColor = "#ff4da6",
  onClick,
  children,
  styleType = "default", // "default" | "glass" | "outlined"
}) {
  return (
    <div
      className={`${styles.card} ${styles[styleType]}`}
      onClick={onClick}
    >
      {/* IMAGE */}
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} />

          {/* STATUS BADGE */}
          {status && (
            <span
              className={styles.badge}
              style={{ background: badgeColor }}
            >
              {status}
            </span>
          )}
        </div>
      )}

      {/* CONTENT */}
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {/* PRICE */}
        {(price || oldPrice) && (
          <div className={styles.priceBox}>
            {price && <span className={styles.price}>{price}</span>}
            {oldPrice && (
              <span className={styles.oldPrice}>{oldPrice}</span>
            )}
          </div>
        )}

        {/* RATING */}
        {rating && (
          <div className={styles.rating}>
            ⭐ {rating}
          </div>
        )}

        {/* EXTRA CONTENT */}
        {children && <div className={styles.extra}>{children}</div>}
      </div>
    </div>
  );
}

export default Card;