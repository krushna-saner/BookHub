import React from "react";
import styles from "../style/ContactUs.module.css";
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaTelegramPlane, FaFacebook, FaTwitter, FaSnapchatGhost, FaYoutube } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2 className={styles.heading}>📞 Contact Us</h2>
        <p className={styles.sub}>We’d love to hear from you!</p>

      
        <div className={styles.info}>
          <p><FaEnvelope className={styles.icon} /> Krushnasaner4@gmail.com</p>
          <p><FaPhoneAlt className={styles.icon} /> +91 8182838485</p>
          <p>🏙  Pune, Maharashtra - 411057</p>
        </div>

      
        <div className={styles.socials}>
          
          <a
            href="https://www.linkedin.com/in/krushna-saner-214351227"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedin}
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/krushna-saner"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            <FaGithub />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
          >
            <FaInstagram />
          </a>
          <a
  href="https://telegram.org/"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.telegram}
>
  <FaTelegramPlane />
</a>

<a
  href="https://www.facebook.com/"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.facebook}
>
  <FaFacebook />
</a>

<a
  href="https://twitter.com/"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.twitter}
>
  <FaTwitter />
</a>

<a
  href="https://www.snapchat.com/"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.snapchat}
>
  <FaSnapchatGhost />
</a>

<a
  href="https://www.youtube.com/"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.youtube}
>
  <FaYoutube />
</a>

        </div>

      
        <div className={styles.imageBox}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            alt="Books"
          />
        </div>

      </div>

    </div>
  );
};

export default ContactUs;