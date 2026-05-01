import React from "react";
import styles from "../style/BookCategories.module.css";

const BookCategories = ({ setCategory }) => {
  const categories = [
    "All", "Fiction", "Science", "Self-Help", "Biography", "Technology", 
    "History", "Romance", "Mystery", "Fantasy", "Religious", "Indian Literature","Educational","Marathi",
    "Hindi","Business","Productivity","Finance","Psychology","Non-Fiction","Creativity","Cooking"
  ];

  return (
    <div className={styles.dropdownContainer}>
    </div>
  );
};

export default BookCategories;
