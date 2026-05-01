import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import BookOrder from "./components/BookOrder";
import Footer from "./components/Footer";
import Login from "./components/Login";
import OrderHistory from "./components/OrderHistory";
import AdminPanel from "./components/AdminPanel";
import Profile from "./components/Profile";
import ScrollToTop from "./components/ScrollToTop";

import styles from "./style/App.module.css";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [cart, setCart] = useState([]);

  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  
  useEffect(() => {
    const email = localStorage.getItem("email")?.toLowerCase();
    if (email) {
      handleLogin(email);
    }
  }, []);

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);

    const savedCart = localStorage.getItem(`cart_${email}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }

    navigate("/");
  };

  
  const handleLogout = () => {
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
    }

    setIsLoggedIn(false);
    setUserEmail(null);
    setCart([]);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    navigate("/");
  };


  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
    }
  };

  const addToCart = (book) => {
    const bookId = book.id || book._id;

    const updatedCart = (() => {
      const existing = cart.find((item) => item.id === bookId);

      if (existing) {
        return cart.map((item) =>
          item.id === bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...cart, { ...book, id: bookId, quantity: 1 }];
    })();

    saveCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const deleteFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    if (userEmail) {
      localStorage.removeItem(`cart_${userEmail}`);
    }
    setCart([]);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={handleLogin} />
      ) : (
        <>
          <Navbar
            onSearch={setSearchQuery}
            setCategory={setCategory}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <div className={`${styles.pageContainer} ${darkMode ? styles.dark : ""}`}>
            <Routes>

              <Route
                path="/"
                element={
                  <HomePage
                    category={category}
                    searchQuery={searchQuery}
                    addToCart={addToCart}
                  />
                }
              />

              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    deleteFromCart={deleteFromCart}
                  />
                }
              />

              <Route
                path="/order"
                element={<BookOrder cart={cart} clearCart={clearCart} />}
              />

              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />

              <Route
                path="/admin"
                element={
                  localStorage.getItem("role") === "ADMIN"
                    ? <AdminPanel />
                    : <h2>Access Denied ❌</h2>
                }
              />

              <Route
                path="/profile"
                element={<Profile setIsLoggedIn={handleLogout} />}
              />

            </Routes>
          </div>

          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default App;