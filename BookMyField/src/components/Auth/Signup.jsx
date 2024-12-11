import React, { useState } from "react";
import "./SignUp.css";
import apiClient from "../../apiClient"; // Import Axios client
import { ToastContainer, toast } from "react-toastify"; // For notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Login from "./login";
import { Footer } from "../../Home";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customerName, setCustomerName] = useState(""); // New customerName state
  const [role, setRole] = useState(""); // Default role can be CUSTOMER
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook to navigate to other routes

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/; // Validates Indian mobile numbers (starting with 6-9 and 10 digits)
    return mobileRegex.test(number);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 && // Minimum 8 characters
      /[A-Z]/.test(password) && // At least one uppercase letter
      /[a-z]/.test(password) && // At least one lowercase letter
      /\d/.test(password) && // At least one digit
      /[!@#$%^&*(),.?":{}|<>]/.test(password) // At least one special character
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validateMobileNumber(number)) {
      setErrorMessage("Please enter a valid mobile number.");
      toast.error("Please enter a valid mobile number.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
      toast.error(
        "Password must meet complexity requirements."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      toast.error("Passwords do not match!");
      return;
    }

    toast.info("Submitting your registration...");

    try {
      const response = await apiClient.post("/auth/signup", {
        username,
        email,
        password,
        mobileNumber: number,
        role,
        customerName, // Send customerName to the backend
      });

      if (response.status === 201) {
        toast.success("Sign Up Successful!"); 

        setErrorMessage("");

        // Clear form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setNumber("");
        setCustomerName(""); 
        setRole("CUSTOMER"); 

        // Navigate to the login page
        navigate("/login"); // Replace '/login' with the actual path for the login page
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Display backend error message
        toast.error(error.response.data.message); // Show error toast with backend message
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
        toast.error("Something went wrong. Please try again later."); // Show generic error toast
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="number">Mobile Number:</label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="ADMIN">Admin</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>
          {errorMessage && <div className="error">{errorMessage}</div>}
          
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignUp;
