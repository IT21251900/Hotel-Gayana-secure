import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ForgotResetPasswordService } from "../../../services/forgot-reset-password-service";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [actionMessage, setActionMessage] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const { id: token } = useParams();
  const navigate = useNavigate();
  const forgotResetPasswordService = new ForgotResetPasswordService();

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const result = await forgotResetPasswordService.validatePWResetToken(token);
      if (!result.done) {
        setActionMessage({ type: "error", message: "Token is invalid or expired." });
      }
    } catch (error) {
      setActionMessage({ type: "error", message: "Token validation failed." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setActionMessage({ type: "error", message: "Passwords do not match!" });
      return;
    }

    setBtnLoading(true);
    try {
      const payload = { token, password: newPassword };
      console.log(payload);
      const response = await forgotResetPasswordService.resetPassword(payload);
      if (response) {
        setActionMessage({ type: "success", message: "Password has been reset successfully." });
        setTimeout(() => navigate("/admin"), 4000);
      } else {
        setActionMessage({ type: "error", message: "Password reset failed. Please try again." });
      }
    } catch (error) {
      setActionMessage({ type: "error", message: "Password reset failed. Please try again." });
    } finally {
      setBtnLoading(false);
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fbff',
    padding: '1rem',
  };
  
  const logoContainerStyles = {
    marginBottom: '1.5rem',
  };
  
  const logoStyles = {
    width: '150px',
    objectFit: 'contain',
  };
  
  const formContainerStyles = {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };
  
  const headingStyles = {
    marginBottom: '1rem',
    fontSize: '1.75rem',
    color: '#0d6efd',
  };
  
  const paragraphStyles = {
    marginBottom: '2rem',
    fontSize: '1rem',
    color: '#64748b',
  };
  
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
  };
  
  const formGroupStyles = {
    marginBottom: '1.5rem',
    textAlign: 'left',
  };
  
  const labelStyles = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '#495057',
  };
  
  const inputStyles = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };
  
  const buttonStyles = {
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0d6efd',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    width: '100%',
  };
  
  const messageStyles = {
    marginTop: '1rem',
    padding: '0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
  };
  

  return (
    <div className="reset-password-container" style={containerStyles}>

  <div className="form-container" style={formContainerStyles}>
    <h1 style={headingStyles}>Reset Password</h1>
    <p style={paragraphStyles}>Enter your new password here</p>
    <form onSubmit={handleSubmit} style={formStyles}>
      <div className="form-group" style={formGroupStyles}>
        <label htmlFor="newPassword" style={labelStyles}>New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength="8"
          placeholder="Enter your new password"
          style={inputStyles}
        />
      </div>
      <div className="form-group" style={formGroupStyles}>
        <label htmlFor="confirmPassword" style={labelStyles}>Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm your new password"
          style={inputStyles}
        />
      </div>
      <button type="submit" disabled={btnLoading} style={buttonStyles}>
        {btnLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
    {actionMessage && (
      <div className={`message ${actionMessage.type}`} style={messageStyles}>
        {actionMessage.message}
      </div>
    )}
  </div>
</div>

  );
};

export default ResetPassword;

