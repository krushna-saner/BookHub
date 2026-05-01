import React from "react";
import styles from "../style/AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <h2>About BookHub</h2>

      <p>
        BookHub is a modern online bookstore designed to make discovering,
        exploring, and purchasing books simple and enjoyable.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h4>📚 Wide Collection</h4>
          <p>Explore books across multiple genres and categories.</p>
        </div>

        <div className={styles.card}>
          <h4>⚡ Fast Experience</h4>
          <p>Seamless and smooth user experience.</p>
        </div>

        <div className={styles.card}>
          <h4>🔒 Secure Orders</h4>
          <p>Safe checkout and reliable delivery.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

