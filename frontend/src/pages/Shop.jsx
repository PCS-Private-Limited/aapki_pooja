import React from "react";
import styles from "../styles/Shop.module.css";
import data from "../data/homeData.json";
import Card from "../components/cards/Card";

function Shop() {
  const { products } = data;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🛍️ Shop</h1>

      <div className={styles.grid}>
        {products.map((p) => (
          <Card
            key={p.id}
            image={p.image}
            title={p.name}
            price={p.price}
            rating="4.5"
            status="Trending"
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;