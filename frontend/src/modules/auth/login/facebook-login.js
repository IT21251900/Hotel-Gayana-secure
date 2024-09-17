import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const FacebookLoginButton = () => {
  const navigate = useNavigate(); // Updated to use navigate hook
  const [isLoading, setIsLoading] = useState(false);

  const responseFacebook = (response) => {
    if (response.status !== 'unknown') {
      setIsLoading(true);
      // Redirect to the backend Facebook route which handles authentication
      window.location.href = `/auth/facebook`; // Redirect to backend for authentication
    } else {
      navigate('/auth/facebook/error'); // Updated to use navigate hook
    }
  };

  return (
    <FacebookLogin
      appId="3797704980470064"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
      textButton={isLoading ? 'Logging in...' : 'Login with Facebook'}
    />
  );
};

export default FacebookLoginButton;
