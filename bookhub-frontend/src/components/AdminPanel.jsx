import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../style/AdminPanel.module.css";

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/orders/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/orders/${id}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

 
  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "ALL" || order.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🛠 Admin Dashboard</h2>

    
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by Email or Order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

     
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Address</th>
              <th>Status</th>
              <th>Total</th>
              <th>Books</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>

                <td>{order.id}</td>
                <td>{order.userEmail}</td>
                <td>{order.address}</td>

              
                <td>
                  <span className={`${styles.status} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </td>

                <td>₹ {order.totalAmount}</td>

            
                <td className={styles.books}>
                  {order.books?.map((b, i) => (
                    <div key={i}>{b.name} × {b.quantity}</div>
                  ))}
                </td>

                <td>
                  <div className={styles.actions}>
                    <button
                      disabled={order.status === "DELIVERED" || order.status === "CANCELLED"}
                      onClick={() => updateStatus(order.id, "SHIPPED")}
                      className={styles.ship}
                    >
                      🚚
                    </button>

                    <button
                      disabled={order.status === "DELIVERED" || order.status === "CANCELLED"}
                      onClick={() => updateStatus(order.id, "DELIVERED")}
                      className={styles.deliver}
                    >
                      ✔
                    </button>

                    <button
                      disabled={order.status === "DELIVERED"}
                      onClick={() => updateStatus(order.id, "CANCELLED")}
                      className={styles.cancel}
                    >
                      ✖
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;