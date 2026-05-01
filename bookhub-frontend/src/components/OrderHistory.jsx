import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../style/OrderHistory.module.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("User not logged in");
        return;
      }

      const res = await axios.get("http://localhost:8080/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📦 Order History</h2>

      {orders.length === 0 ? (
        <p className={styles.empty}>No orders found 😢</p>
      ) : (
        <div className={styles.grid}>
          {orders.map((order) => (
            <div key={order.id} className={styles.card}>

           
              <div className={styles.top}>
                <h5>Order ID</h5>
                <span>{order.id}</span>
              </div>

            
              <div className={`${styles.status} ${styles[order.status]}`}>
                {order.status}
              </div>

            
              <div className={styles.info}>
                <p><b>Payment:</b> {order.paymentId}</p>
                <p><b>Address:</b> {order.address}</p>
              </div>

        
              <div className={styles.books}>
                <h6>Books</h6>
                {order.books.map((book, index) => (
                  <div key={index} className={styles.bookItem}>
                    <span>{book.name} × {book.quantity}</span>
                    <span>₹ {book.price}</span>
                  </div>
                ))}
              </div>

              <div className={styles.total}>
                ₹ {order.totalAmount}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;