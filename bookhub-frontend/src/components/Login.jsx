import React, { useState } from "react";
import axios from "axios";
import styles from "../style/Login.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ setIsLoggedIn }) => {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const normalizedEmail = email.trim().toLowerCase(); 

      const res = await axios.post("http://localhost:8080/auth/login", {
        email: normalizedEmail,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", normalizedEmail); 
      localStorage.setItem("name", res.data.name);

      setIsLoggedIn(normalizedEmail); 

    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  const handleSignup = async () => {
    try {
      const normalizedEmail = email.trim().toLowerCase(); 

      await axios.post("http://localhost:8080/auth/signup", {
        name,
        email: normalizedEmail,
        password,
      });

      alert("Signup successful ✅ Please login");
      setIsSignup(false);
    } catch (err) {
      alert("Signup failed ❌");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>📚 BookHub</h1>
        <p>Your gateway to knowledge & stories.</p>
      </div>

      <div className={styles.right}>
        <div className={styles.box}>
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

          <div className={styles.formGroup}>
            {isSignup && (
              <input
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className={styles.password}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {isSignup ? (
            <button onClick={handleSignup}>Signup</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}

          <p onClick={() => setIsSignup(!isSignup)} className={styles.toggle}>
            {isSignup
              ? "Already have account? Login"
              : "New user? Signup"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;