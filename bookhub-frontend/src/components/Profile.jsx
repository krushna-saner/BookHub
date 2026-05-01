import React from "react";
import styles from "../style/Profile.module.css";

const Profile = ({ setIsLoggedIn }) => {

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>👤 Profile</h2>

        <p><b>Name:</b> {name}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Role:</b> {role}</p>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;