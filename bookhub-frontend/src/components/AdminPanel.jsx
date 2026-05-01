import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../style/AdminPanel.module.css";

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const [bookForm, setBookForm] = useState({
    name: "",
    author: "",
    price: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    fetchOrders();
    fetchBooks();
  }, []);

  
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://bookhub-backend-0ne6.onrender.com/orders/admin",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://bookhub-backend-0ne6.onrender.com/orders/${id}/status?status=${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };


  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        "https://bookhub-backend-0ne6.onrender.com/books"
      );
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addBook = async () => {
    try {
      await axios.post(
        "https://bookhub-backend-0ne6.onrender.com/books",
        bookForm
      );

      setBookForm({
        name: "",
        author: "",
        price: "",
        category: "",
        image: ""
      });

      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(
        `https://bookhub-backend-0ne6.onrender.com/books/${id}`
      );

      fetchBooks();
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
                  <span
                    className={`${styles.status} ${styles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>₹ {order.totalAmount}</td>

                <td className={styles.books}>
                  {order.books?.map((b, i) => (
                    <div key={i}>
                      {b.name} × {b.quantity}
                    </div>
                  ))}
                </td>

                <td>
                  <div className={styles.actions}>
                    <button
                      disabled={
                        order.status === "DELIVERED" ||
                        order.status === "CANCELLED"
                      }
                      onClick={() => updateStatus(order.id, "SHIPPED")}
                      className={styles.ship}
                    >
                      🚚
                    </button>

                    <button
                      disabled={
                        order.status === "DELIVERED" ||
                        order.status === "CANCELLED"
                      }
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

      
      <h2 className={styles.heading}>📚 Book Management</h2>

      <div className={styles.bookSection}>
        <div className={styles.formGrid}>
          <input
            placeholder="Name"
            value={bookForm.name}
            onChange={(e) =>
              setBookForm({ ...bookForm, name: e.target.value })
            }
          />

          <input
            placeholder="Author"
            value={bookForm.author}
            onChange={(e) =>
              setBookForm({ ...bookForm, author: e.target.value })
            }
          />

          <input
            placeholder="Price"
            value={bookForm.price}
            onChange={(e) =>
              setBookForm({ ...bookForm, price: e.target.value })
            }
          />

          <input
            placeholder="Category"
            value={bookForm.category}
            onChange={(e) =>
              setBookForm({ ...bookForm, category: e.target.value })
            }
          />

          <input
            placeholder="Image URL"
            value={bookForm.image}
            onChange={(e) =>
              setBookForm({ ...bookForm, image: e.target.value })
            }
          />
        </div>

        <button className={styles.addBtn} onClick={addBook}>
          ➕ Add Book
        </button>

        <div className={styles.bookList}>
          {books.map((b) => (
            <div key={b.id} className={styles.bookCard}>
              <h4>{b.name}</h4>
              <p>{b.author}</p>
              <p>₹{b.price}</p>

              <button onClick={() => deleteBook(b.id)}>
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;