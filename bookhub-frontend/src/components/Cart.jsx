import React from "react";
import styles from "../style/Cart.module.css";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, increaseQuantity, decreaseQuantity, deleteFromCart }) => {
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className={styles.emptyBox}>
          <h3>Your cart is empty 😢</h3>
          <button onClick={() => navigate("/")}>Browse Books</button>
        </div>
      ) : (
        <div className={styles.wrapper}>
          
      
          <div className={styles.cartItems}>
            {cart.map((book) => (
              <div key={book.id} className={styles.card}>
                
                <img src={book.image} alt={book.name} />

                <div className={styles.details}>
                  <h4>{book.name}</h4>
                  <p className={styles.price}>₹ {book.price}</p>

                  <div className={styles.controls}>
                    <button onClick={() => decreaseQuantity(book.id)}>-</button>
                    <span>{book.quantity}</span>
                    <button onClick={() => increaseQuantity(book.id)}>+</button>
                  </div>

                  <button
                    className={styles.remove}
                    onClick={() => deleteFromCart(book.id)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h3>Order Summary</h3>

            <div className={styles.summaryRow}>
              <span>Items:</span>
              <span>{cart.length}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Total Price:</span>
              <span>₹ {totalPrice.toFixed(2)}</span>
            </div>

            <button
              className={styles.orderBtn}
              onClick={() => navigate("/order")}
            >
              Proceed to Checkout →
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;