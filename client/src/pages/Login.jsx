
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Login successful!");
      navigate("/blogs");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-info">
        <Link to="/" className="auth-logo">Blog<span>Space.</span></Link>
        <div>
          <span className="auth-tag">WELCOME BACK</span>
          <h1>Your next great idea starts here.</h1>
          <p>Log in to discover stories, share your thoughts, and connect with writers.</p>
        </div>
        <span className="auth-footer-text">Share your stories. Inspire the world.</span>
      </div>

      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <span className="form-tag">YOUR ACCOUNT</span>
          <h2>Welcome Back!</h2>
          <p className="form-description">Enter your details to access your account.</p>

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="switch-auth">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>

          <Link to="/" className="back-home">← Back to Home</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
