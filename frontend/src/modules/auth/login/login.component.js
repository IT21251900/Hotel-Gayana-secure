import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth.service'; // Import the hook

const LoginComponent = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({
    display: false,
    type: '',
    message: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Use the hook to get the login function

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setActionMessage({
        display: true,
        type: 'error',
        message: 'Please fill in all fields.',
      });
      return;
    }

    setBtnLoading(true);
    try {
      await login(loginForm); // Call the login function from the hook
      navigate('/adminHome/');
    } catch (e) {
      setActionMessage({
        display: true,
        type: 'error',
        message: e.message || 'Login failed. Please try again.',
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>LOG IN</h1>
      <form onSubmit={onLogin}>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={loginForm.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {passwordVisible ? 'Hide' : 'Show'} Password
          </button>
        </div>
        <button type="submit" disabled={btnLoading}>
          {btnLoading ? 'Logging in...' : 'Sign In'}
        </button>
        {actionMessage.display && (
          <div className={`alert ${actionMessage.type}`}>
            {actionMessage.message}
          </div>
        )}
      </form>
      <button onClick={() => navigate('/forgot-password')}>
        Forgot Your Password?
      </button>
    </div>
  );
};

export default LoginComponent;
