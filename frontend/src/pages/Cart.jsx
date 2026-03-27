import { useState } from "react";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Pink Dress",
      color: "Magenta",
      price: 120,
      qty: 1,
      img: "https://images.unsplash.com/photo-1520975922203-b03a95d4b98b?w=200"
    },
    {
      id: 2,
      name: "Denim Jacket",
      color: "Sky Blue",
      price: 120,
      qty: 1,
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200"
    }
  ]);

  // 🔁 Quantity update
  const updateQty = (id, type) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1)
            }
          : item
      )
    );
  };

  // ❌ Remove item
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // 💰 Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = 40;
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Shopping Cart</h2>

      <div className={styles.wrapper}>

        {/* LEFT SIDE */}
        <div className={styles.cartItems}>
          {cart.map(item => (
            <div key={item.id} className={styles.card}>

              <img src={item.img} alt={item.name} className={styles.image} />

              <div className={styles.details}>
                <h3>{item.name}</h3>
                <p>{item.color}</p>
              </div>

              <div className={styles.qtyBox}>
                <button onClick={() => updateQty(item.id, "dec")}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, "inc")}>+</button>
              </div>

              <div className={styles.price}>
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button
                className={styles.remove}
                onClick={() => removeItem(item.id)}
              >
                ✕
              </button>

            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.summary}>
          <h3>Order Summary</h3>

          <div className={styles.row}>
            <span>Sub Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className={styles.row}>
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>

          <div className={styles.row}>
            <span>GST 18%</span>
            <span>${gst.toFixed(2)}</span>
          </div>

          <hr />

          <div className={styles.total}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className={styles.checkout}>
            Checkout 💖
          </button>
        </div>

      </div>
    </div>
  );
}