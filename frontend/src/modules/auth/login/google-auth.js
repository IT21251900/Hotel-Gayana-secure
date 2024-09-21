import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = (response) => {
    window.open("http://localhost:3000/googleauth/google", "_self"); 
    console.log('Login successful:', response);
    navigate('/adminHome'); 
  };

  return (
    <div>
      <button onClick={handleLogin} className="google-login-button">
        <i className="fa fa-google"></i> Login with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
