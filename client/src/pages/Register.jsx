
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage(response.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-info">
        <Link to="/" className="auth-logo">
          Blog<span>Space.</span>
        </Link>

        <div>
          <span className="auth-tag">JOIN OUR COMMUNITY</span>
          <h1>Your voice deserves to be heard.</h1>
          <p>
            Create your account and start sharing your ideas,
            experiences, and stories with the world.
          </p>
        </div>

        <span className="auth-footer-text">
          Share your stories. Inspire the world.
        </span>
      </div>

      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <span className="form-tag">CREATE YOUR ACCOUNT</span>
          <h2>Get Started!</h2>
          <p className="form-description">
            Fill in your details to join BlogSpace.
          </p>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={6}
            required
          />

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="switch-auth">
            Already have an account? <Link to="/login">Log In</Link>
          </p>

          <Link to="/" className="back-home">← Back to Home</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
