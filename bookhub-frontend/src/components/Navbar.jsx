import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "../style/Navbar.module.css";

const Navbar = ({ onSearch, setCategory, darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const categories = [
    "All","Fiction","Science","Self-Help","Biography","Technology",
    "History","Romance","Mystery","Fantasy","Business","Psychology"
  ];

  const role = localStorage.getItem("role");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${darkMode ? styles.dark : ""} ${
        scrolled ? styles.scrolled : ""
      }`}
    >

     
      <div className={styles.topBar}>
        <h2 className={styles.logo}>📚 BookHub</h2>

        <div className={styles.right}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={styles.darkBtn}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div
            className={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>
      </div>

   
      <div className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Home
        </NavLink>

        <div
          className={styles.category}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          Categories ▾

          {showDropdown && (
            <div className={styles.dropdown}>
              {categories.map((cat, i) => (
                <div key={i} onClick={() => setCategory(cat)}>
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        <NavLink to="/cart" className={({ isActive }) => isActive ? styles.active : ""}>
          Cart
        </NavLink>

        <NavLink to="/order" className={({ isActive }) => isActive ? styles.active : ""}>
          Order
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => isActive ? styles.active : ""}>
          Order History
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ""}>
          About Us
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ""}>
          Contact Us
        </NavLink>

        {role === "ADMIN" && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ""}>
            Admin Panel
          </NavLink>
        )}

        <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : ""}>
          Profile
        </NavLink>

      </div>

    
      <div className={styles.searchBar}>
        <input
          placeholder="Search books..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

    </nav>
  );
};

export default Navbar;