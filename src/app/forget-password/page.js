"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // For Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import styles from "./forgot-password.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Submit forgot password request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        {
          email,
        }
      );
      if (response.status === 200) {
        toast.success(
          "Password recovery email sent successfully. Please check your inbox."
        );
      }
    } catch (error) {
      toast.error("Failed to send password recovery link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Center toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className={styles.content}>
        <h1 className={styles.heading}>Forgot Password?</h1>
        <form className={styles.form} onSubmit={handleForgotPassword}>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.inputField}
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className={styles.center}>
          <p>
            Remember your password?{" "}
            <a href="/signin" className={styles.link}>
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
