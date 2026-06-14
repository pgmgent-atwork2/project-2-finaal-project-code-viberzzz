import React, { useState } from "react";
import { useEffect } from "react";
import { API } from "../../lib/supabaseClient";
import "../../css/reset.css";
import "../../css/styleLogin.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await API.auth.getSession();

      console.log("SESSION:", data);
      console.log("ERROR:", error);
    }

    checkSession();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
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
            Reset Your
            <br />
            Password
          </h1>

          <p>
            Enter a new password to regain access to the SeaPark Filtration
            platform.
          </p>
        </div>

        <div className="footer">© Seapark Marine Park</div>
      </div>

      <div className="right">
        <div className="login-box">
          <h2>Reset Password</h2>

          <p className="subtitle">Enter and confirm your new password.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span className="error">{errors.confirmPassword}</span>
            </div>

            <div className="form-group">
              <label>New Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className="error">{errors.password}</span>
            </div>

            <button type="submit" className="primary-btn">
              Save Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
