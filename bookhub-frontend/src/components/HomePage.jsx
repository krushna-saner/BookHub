import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../style/HomePage.module.css";

const HomePage = ({ category, searchQuery, addToCart }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        let url = "https://bookhub-backend-0ne6.onrender.com/books";

        if (category !== "All") {
          url = `https://bookhub-backend-0ne6.onrender.com/books/category/${category}`;
        }

        if (searchQuery) {
          url = `https://bookhub-backend-0ne6.onrender.com/books/search?name=${searchQuery}`;
        }

        const res = await axios.get(url);

        const formattedBooks = res.data.map((book) => ({
          ...book,
          id: book.id || book._id,
        }));

        setBooks(formattedBooks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category, searchQuery]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📚 Explore Books</h2>

      <div className={styles.grid}>
        {loading
          ? Array(8).fill(0).map((_, i) => (
              <div key={i} className={styles.skeletonCard}></div>
            ))
          : books.map((book) => (
              <div key={book.id} className={styles.card}>
                <img
                  src={book.image}
                  alt={book.name}
                  className={styles.image}
                />

                <div className={styles.cardBody}>
                  <h4>{book.name}</h4>
                  <p className={styles.price}>₹ {book.price}</p>

                  <button
                    className={styles.btn}
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default HomePage;