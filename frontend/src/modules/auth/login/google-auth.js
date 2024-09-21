import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = (response) => {
    if (response.accessToken) {
      console.log('Login successful:', response);
      navigate('/adminHome'); 
    } else {
      console.log('Login failed:', response);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin} className="google-login-button">
        <i className="fa fa-google"></i> Login with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
