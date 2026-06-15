import { forgotPassword } from "../../api/authApi";
import { useState } from "react";

import "../../css/reset.css";
import "../../css/styleLogin.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "Invalid email.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
    }

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
            Forgot Your
            <br />
            Password?
          </h1>

          <p>Enter your email address and we will send you a recovery link.</p>
        </div>

        <div className="footer">© Seapark Marine Park</div>
      </div>

      <div className="right">
        <div className="login-box">
          <h2>Forgot Password</h2>

          <p className="subtitle">Enter your email address below.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="error">{errors.email}</span>
          </div>

          {success && <p>Recovery email sent successfully.</p>}
          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? "Sending..." : "Send Recovery Email"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;
