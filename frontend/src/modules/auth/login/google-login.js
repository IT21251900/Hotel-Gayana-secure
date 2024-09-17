import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log('Google response:', response); // Log the entire response for debugging

    if (response.profileObj) {
      // Assuming profileObj is present if login is successful
      console.log('Login successful:', response);
      navigate('/adminHome'); 
    } else {
      console.log('Login failed:', response);
    }
  };

  const onError = (error) => {
    console.error('Login error:', error); // Log detailed error response
    // You can also show an error message to the user here
  };

  return (
    <div>
      <GoogleLogin
        clientId="911259510627-hpck0jrs9j8qv2ip416duu8n93sqk7em.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onError={onError} // Updated prop for error handling
        cookiePolicy={'single_host_origin'}
        className="google-login-button"
      />
    </div>
  );
};

export default GoogleLoginButton;
