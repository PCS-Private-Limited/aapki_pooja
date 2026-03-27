import React from "react";
import styles from "../styles/Home.module.css";
import data from "../data/homeData.json";
import Card from "../components/cards/Card";

function Home() {
    const { categories, products, banner, hero } = data;

    return (
        <div className={styles.container}>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroText}>
                    <h1>{hero.title}</h1>
                    <p>{hero.subtitle}</p>
                    <button>{hero.buttonText}</button>
                </div>
            </section>

            {/* Categories */}
            <section className={styles.categories}>
                <h2>Categories</h2>
                <div className={styles.categoryGrid}>
                    {categories.map((cat) => (
                        <div key={cat.id} className={styles.card}>
                            {cat.icon} {cat.name}
                        </div>
                    ))}
                </div>
            </section>

            {/* Products */}
            <section className={styles.products}>
                <h2>Trending Products</h2>
                <div className={styles.productGrid}>
                    {products.map((p) => (
                        < div className={styles.productCard}>
                            <div className={styles.imageWrapper}>
                                <img src={p.image} alt={p.name} />
                            </div>

                            <h3>{p.name}</h3>
                            <p>{p.price}</p>
                            <button>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Banner */}
            <section className={styles.banner}>
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
            </section>

        </div>
    );
}

export default Home;