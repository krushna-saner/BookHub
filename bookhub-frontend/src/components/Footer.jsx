import React from "react";
import styles from "../style/Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {

  
  const handleDiscount = () => {
    localStorage.setItem("discount", "10");
    alert("🎉 10% discount applied!");
  };

  return (
    <footer className={styles.footer}>

      <div className={styles.section}>
        <h3>CONNECT WITH US</h3>

        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a> 

          
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>

          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>

        <p>Want 10% Off? Click below link !!!</p>

      
        <button className={styles.subscribeBtn} onClick={handleDiscount}>
          Get 10% Off
        </button>

      </div>

      <div className={styles.bottomBar}>
        <p>© 2025 BookHub.com . All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;