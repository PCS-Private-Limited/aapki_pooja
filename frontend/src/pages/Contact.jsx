import React from "react";
 import styles from "../styles/Contact.module.css";

function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📞 Contact Us</h1>

      <form className={styles.form}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required />

        <button type="submit">Send Message 💖</button>
      </form>
    </div>
  );
}

export default Contact;