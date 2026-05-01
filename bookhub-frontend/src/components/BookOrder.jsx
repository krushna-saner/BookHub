import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../style/BookOrder.module.css";

const BookOrder = ({ cart, clearCart }) => {

  const [discount, setDiscount] = useState(0);
  
useEffect(() => {
  setDiscount(0); 
}, []);

  const [details, setDetails] = useState({
    name: "",
    address: "",
    upi: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );

  const finalAmount = discount
    ? totalAmount - (totalAmount * discount) / 100
    : totalAmount;

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const applyDiscount = () => {
    localStorage.setItem("discount", 10);
    setDiscount(10);
    alert("🎉 10% Discount Applied!");
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ Please login again");
      return;
    }

    if (!details.name || !details.address) {
      setMessage("Please fill all details ❗");
      return;
    }

    if (cart.length === 0) {
      setMessage("Cart is empty ❗");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        name: details.name,
        email: details.email,
        books: cart,
        totalAmount: finalAmount,
        address: details.address,
        paymentId: "COD",
        status: "PENDING",
      };

      await axios.post("http://localhost:8080/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Order placed successfully (COD)");
      clearCart();
      localStorage.removeItem("discount");

    } catch (error) {
      setMessage("❌ Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🧾 Checkout</h2>

      <div className={styles.wrapper}>

       
        {cart.length > 0 && (
          <div className={styles.form}>
            <h3>Delivery Details</h3>

            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
            <input type="text" name="address" placeholder="Delivery Address" onChange={handleChange} />
            <input type="text" name="upi" placeholder="Mobile Number" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />

            <p className={styles.cod}>
              Payment Method: Cash on Delivery
            </p>

            <button onClick={handleOrder} disabled={loading} className={styles.button}>
              {loading ? "Placing Order..." : "Place Order (COD)"}
            </button>
          </div>
        )}

        {cart.length > 0 ? (
          <div className={styles.summary}>
            <h4>📚 Order Summary</h4>

            {cart.map((book) => (
              <div key={book.id} className={styles.item}>
                <span>{book.name} (x{book.quantity})</span>
                <span>₹ {(book.price * book.quantity).toFixed(2)}</span>
              </div>
            ))}

            <h3 className={styles.total}>
              Total: ₹ {totalAmount.toFixed(2)}
            </h3>

            {discount > 0 && (
              <h4 className={styles.discount}>
                Discount Applied: {discount}%
              </h4>
            )}

            <h2 className={styles.final}>
              Final Price: ₹ {finalAmount.toFixed(2)}
            </h2>

            <button onClick={applyDiscount} className={styles.discountBtn}>
              🎁 Get 10% Discount
            </button>
          </div>
        ) : (
          <p className={styles.empty}>Your cart is empty 😢</p>
        )}

      </div>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default BookOrder;