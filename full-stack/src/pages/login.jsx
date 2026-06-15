import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { registerUser } from "../api/authApi";

import "../css/reset.css";
import "../css/styleLogin.css";
import { useEffect } from "react";

const Login = () => {
  // Use login from auth context
  const navigate = useNavigate();
  const { login, isInitialized, isLoggedIn } = useAuth();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn && isInitialized) {
      navigate("/");
    }
  }, [isLoggedIn, isInitialized, navigate]);

  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "Invalid email.";
    }

    if (password.length < 4) {
      newErrors.password = "Password has to be min 4 characters.";
    }

    if (isSignUp) {
      if (!username) {
        newErrors.username = "Name is needed.";
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords not matching.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        if (!isSignUp) {
          // Sign in logic

          await login({ email, password });
          navigate("/");
        } else {
          // Sign up logic
          await registerUser({ email, password, name: username });
          navigate("/");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setErrors({
          general: error.message || "Authentication failed. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="brand">
          <span className="waves">≈≈≈</span>
          <span className="brand-name">Seapark LSS</span>
        </div>

        <div className="hero-text">
          <h1>
            Life Support Systems
            <br />
            Operations
          </h1>
          <p>
            Monitor every filtration unit, log measurements on the go, and keep
            the water perfect for our animals.
          </p>
        </div>

        <div className="footer">© Seapark Marine Park</div>
      </div>

      <div className="right">
        <div className="login-box">
          <h2>{isSignUp ? "Create account" : "Welcome back"}</h2>

          <p className="subtitle">
            {isSignUp
              ? "Make a new Seapark LSS account."
              : "Sign in to continue to filtration operations."}
          </p>

          <div className="tabs">
            <div
              className="tab-slider"
              style={{ left: isSignUp ? "50%" : "0%" }}
            />

            <button
              type="button"
              className={`tab ${!isSignUp ? "active" : ""}`}
              onClick={() => {
                setIsSignUp(false);
                setErrors({});
              }}
            >
              Sign in
            </button>

            <button
              type="button"
              className={`tab ${isSignUp ? "active" : ""}`}
              onClick={() => {
                setIsSignUp(true);
                setErrors({});
              }}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* NAME */}
            {isSignUp && (
              <div className="form-group">
                <label>Name</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
                <span className="error">{errors.username}</span>
              </div>
            )}

            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <span className="error">{errors.email}</span>
            </div>

            {!isSignUp && (
              <p
                onClick={() => navigate("/forgot-password")}
                style={{
                  cursor: "pointer",
                  marginBottom: "1rem",
                  textAlign: "right",
                }}
              >
                Forgot Password?
              </p>
            )}

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <span className="error">{errors.password}</span>
            </div>

            {/* CONFIRM PASSWORD */}
            {isSignUp && (
              <div className="form-group">
                <label>Confirm password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
                <span className="error">{errors.confirmPassword}</span>
              </div>
            )}

            <span className="error">{errors.general}</span>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Create account" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
