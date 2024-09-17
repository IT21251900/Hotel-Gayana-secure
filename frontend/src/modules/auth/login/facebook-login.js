// FacebookLoginButton.js
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const FacebookLoginButton = () => {
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    if (response.accessToken) {
      // Handle successful login
      // You may want to send the accessToken to your backend for further processing
      console.log('Login successful:', response);
      navigate('/'); // Redirect to home or another page after login
    } else {
      // Handle login failure
      console.log('Login failed:', response);
    }
  };

  return (
    <div>
      <FacebookLogin
        appId="3797704980470064" // Replace with your Facebook App ID
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebook-login-button"
        textButton="Login with Facebook"
      />
    </div>
  );
};

export default FacebookLoginButton;
