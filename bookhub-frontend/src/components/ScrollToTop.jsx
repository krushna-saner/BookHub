import React, { useState, useEffect } from "react";
import styles from "../style/ScrollToTop.module.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      setVisible(scrollTop > 300);

      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;

      setIsNearFooter(scrollPosition > pageHeight - 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      className={`${styles.scrollBtn} 
                  ${visible ? styles.show : styles.hide} 
                  ${isNearFooter ? styles.aboveFooter : ""}`}
      onClick={scrollToTop}
    >
  
      <svg className={styles.progressRing} width="50" height="50">
        <circle
          stroke="#444"
          fill="transparent"
          strokeWidth="3"
          r={radius}
          cx="25"
          cy="25"
        />
        <circle
          stroke="#00f2fe"
          fill="transparent"
          strokeWidth="3"
          r={radius}
          cx="25"
          cy="25"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

   
      <span className={styles.icon}>⬆</span>
    </button>
  );
};

export default ScrollToTop;