import React, { useState } from "react";
import "../css/reset.css";
import "../css/styleLogin.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
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
      if (!isSignUp) {
        if (email === "test@seapark.com" && password === "test") {
          alert("Login completed 👋");
        } else {
          setErrors({ general: "Wrong login." });
        }
      } else {
        alert("New profile made 🎉");
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
            Life Support Systems<br />
            Operations
          </h1>
          <p>
            Monitor every filtration unit, log measurements on the go,
            and keep the water perfect for our animals.
          </p>
        </div>

        <div className="footer">
          © Seapark Marine Park
        </div>
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
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </button>

            <button
              type="button"
              className={`tab ${isSignUp ? "active" : ""}`}
              onClick={() => setIsSignUp(true)}
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

            <button type="submit" className="primary-btn">
              {isSignUp ? "Create account" : "Sign in"}
            </button>

          </form>

        </div>
      </div>

    </div>
  );
};

export default Login;