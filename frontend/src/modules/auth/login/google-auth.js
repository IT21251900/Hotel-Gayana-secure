import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    if (response.profileObj) {
      // Handle successful login here (e.g., save user info, navigate)
      navigate('/adminHome');
    } else {
      console.log('Login failed:', response);
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId="151745723501-4bvv6nh2b8qptpt5noqb5i2sfvv3hq8n.apps.googleusercontent.com" 
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginButton;
