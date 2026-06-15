import { useState } from "react";

import "../../css/reset.css";
import "../../css/styleLogin.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
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

        <form>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="primary-btn">
            Send Recovery Email
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;
