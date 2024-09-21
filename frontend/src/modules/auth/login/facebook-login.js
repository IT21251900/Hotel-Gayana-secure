// FacebookLoginButton.js
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const FacebookLoginButton = () => {
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    if (response.accessToken) {
      console.log('Login successful:', response);
      navigate('/adminHome'); 
    } else {
      console.log('Login failed:', response);
    }
  };

  return (
    <div>
      <FacebookLogin
        appId="3797704980470064" 
        autoLoad={false}
        fields="name,email,picture"
        icon = "fa-facebook"
        callback={responseFacebook}
        cssClass=" fb-button"
        textButton="Login with Facebook"
      />
    </div>
  );
};

export default FacebookLoginButton;


