import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

const FacebookLoginButton = () => {
  const navigate = useNavigate(); // Updated to use navigate hook
  const [isLoading, setIsLoading] = useState(false);

  const responseFacebook = (response) => {
    if (response.status !== 'unknown') {
      setIsLoading(true);
      fetch('/auth/facebook', { // Adjusted endpoint to match your backend route
        method: 'GET', // Use GET as your backend is using passport.authenticate() with GET method
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies with the request
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setIsLoading(false);
          if (data.success) {
            navigate('/auth/facebook/success'); // Updated to use navigate hook
          } else {
            navigate('/auth/facebook/error'); // Updated to use navigate hook
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error logging in with Facebook:', error);
          // Handle the error here, e.g., show an error message to the user
        });
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
